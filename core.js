export const fullMask=n=>(1<<(n*n))-1;
export function validPuzzle(p){
  if(!p||![3,4].includes(p.n)||!Number.isInteger(p.mask)||p.mask<0||p.mask>fullMask(p.n)||!Array.isArray(p.pairs))return false;
  const used=new Set();
  for(const pair of p.pairs){if(!Array.isArray(pair)||pair.length!==2||pair.some(v=>!Number.isInteger(v)||v<0||v>=p.n*p.n||used.has(v))||pair[0]===pair[1])return false;pair.forEach(v=>used.add(v));}
  return true;
}
export function affected(n,index,pairs=[]){
  if(![3,4].includes(n)||!Number.isInteger(index)||index<0||index>=n*n)throw new RangeError('Invalid lantern');
  const r=Math.floor(index/n),c=index%n,set=new Set([index]);
  if(r>0)set.add(index-n);if(r<n-1)set.add(index+n);if(c>0)set.add(index-1);if(c<n-1)set.add(index+1);
  for(const [a,b] of pairs){if(index===a)set.add(b);if(index===b)set.add(a);}
  return [...set].sort((a,b)=>a-b);
}
export function move(mask,n,index,pairs=[]){return affected(n,index,pairs).reduce((m,i)=>m^(1<<i),mask);}
export function solve(p){
  if(!validPuzzle(p))return null;
  const {n,mask,pairs}=p,N=n*n,target=fullMask(n)^mask;
  const columns=Array.from({length:N},(_,i)=>affected(n,i,pairs).reduce((m,j)=>m|(1<<j),0));
  const rows=Array.from({length:N},(_,j)=>columns.reduce((m,col,i)=>m|(((col>>>j)&1)<<i),((target>>>j)&1)<<N));
  const pivots=[];let rank=0;
  for(let col=0;col<N;col++){let row=rank;while(row<N&&!((rows[row]>>>col)&1))row++;if(row===N)continue;[rows[rank],rows[row]]=[rows[row],rows[rank]];for(let j=0;j<N;j++)if(j!==rank&&((rows[j]>>>col)&1))rows[j]^=rows[rank];pivots.push(col);rank++;}
  const coeff=fullMask(n);for(let j=rank;j<N;j++)if((rows[j]&coeff)===0&&((rows[j]>>>N)&1))return null;
  let solution=0;for(let r=0;r<rank;r++)if((rows[r]>>>N)&1)solution|=1<<pivots[r];
  const free=Array.from({length:N},(_,i)=>i).filter(i=>!pivots.includes(i));
  const basis=free.map(col=>{let v=1<<col;for(let r=0;r<rank;r++)if((rows[r]>>>col)&1)v|=1<<pivots[r];return v;});
  let best=solution,bestCount=popcount(best);
  for(let combination=1;combination<(1<<basis.length);combination++){let v=solution;basis.forEach((b,i)=>{if(combination&(1<<i))v^=b;});const count=popcount(v);if(count<bestCount){best=v;bestCount=count;}}
  return Array.from({length:N},(_,i)=>i).filter(i=>best&(1<<i));
}
export function popcount(mask){let count=0;while(mask){mask&=mask-1;count++;}return count;}
const designs=[
  [3,[],[4],'First light','第一束光'],
  [3,[],[0,8],'Across the courtyard','穿过庭院'],
  [3,[],[1,3,8],'Moonlit footsteps','月下脚步'],
  [3,[],[0,2,4,6],'The crooked path','弯弯小路'],
  [3,[[0,8]],[0,4],'A familiar spirit','相伴的灵魂'],
  [3,[[2,6]],[1,2,7],'Distant friends','远方的朋友'],
  [3,[[0,8],[2,6]],[0,3,5,7],'Two little promises','两个小约定'],
  [3,[[0,8],[2,6]],[0,1,4,6,8],'The midnight waltz','午夜圆舞曲'],
  [4,[],[0,5,10,15],'A larger garden','更大的花园'],
  [4,[[0,15]],[1,4,6,10,13],'The long way home','长长的归途'],
  [4,[[0,15],[3,12]],[0,2,5,8,11,14],'Constellation','星座的约定'],
  [4,[[1,14],[4,11]],[0,1,5,7,9,12,14],'All the lights of home','万家灯火'],
];
export const LEVELS=designs.map(([n,pairs,clicks,name,zh],i)=>{const mask=clicks.reduce((m,k)=>move(m,n,k,pairs),fullMask(n));const p={id:i+1,n,pairs,mask,name,zh};return {...p,par:solve(p).length};});
export function encodePuzzle(p){if(!validPuzzle(p))throw new TypeError('Invalid puzzle');return `v1.${p.n}.${p.mask.toString(36)}.${p.pairs.map(pair=>pair.map(i=>i.toString(36)).join('-')).join('_')||'x'}`;}
export function decodePuzzle(code){
  if(typeof code!=='string'||code.length>80||!/^v1\.[34]\.[0-9a-z]{1,4}\.(x|[0-9a-f]-[0-9a-f](?:_[0-9a-f]-[0-9a-f])*)$/.test(code))return null;
  const [,n,mask,pairs]=code.split('.');const p={n:Number(n),mask:parseInt(mask,36),pairs:pairs==='x'?[]:pairs.split('_').map(s=>s.split('-').map(i=>parseInt(i,36)))};
  return validPuzzle(p)&&solve(p)!==null?p:null;
}
export function dailyPuzzle(date){
  let seed=2166136261;for(const c of date)seed=Math.imul(seed^c.charCodeAt(0),16777619)>>>0;
  const n=seed%2?3:4,pairs=seed%3?[[0,n*n-1]]:[];let mask=fullMask(n);
  for(let i=0;i<7;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;mask=move(mask,n,seed%(n*n),pairs);}
  if(mask===fullMask(n))mask=move(mask,n,0,pairs);const p={n,mask,pairs,id:'daily-'+date,name:'Daily moonlight',zh:'每日月光'};return {...p,par:solve(p).length};
}
