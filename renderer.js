// Small dependency-free WebGL renderer. Geometry, lighting and projection are real 3D.
const VERT=`attribute vec3 aPosition;attribute vec3 aNormal;uniform mat4 uVP;uniform vec3 uPosition;uniform vec3 uScale;varying vec3 vNormal;varying vec3 vWorld;void main(){vWorld=aPosition*uScale+uPosition;vNormal=normalize(aNormal/uScale);gl_Position=uVP*vec4(vWorld,1.0);}`;
const FRAG=`precision mediump float;uniform vec3 uColor;uniform float uGlow;varying vec3 vNormal;varying vec3 vWorld;void main(){vec3 n=normalize(vNormal);float sun=max(dot(n,normalize(vec3(-0.45,0.9,0.65))),0.0);float rim=max(dot(n,normalize(vec3(0.6,0.4,-0.8))),0.0);vec3 lit=uColor*(0.40+sun*0.64)+vec3(0.18,0.16,0.28)*rim*0.32;lit=mix(lit,uColor,uGlow);gl_FragColor=vec4(lit,1.0);}`;
function normalize(a){const d=Math.hypot(...a)||1;return a.map(v=>v/d);}function cross(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}function dot(a,b){return a.reduce((s,v,i)=>s+v*b[i],0);}
function lookAt(eye,target){const z=normalize(eye.map((v,i)=>v-target[i])),x=normalize(cross([0,1,0],z)),y=cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]);}
function ortho(l,r,b,t,n,f){return new Float32Array([2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1]);}
function multiply(a,b){const c=new Float32Array(16);for(let col=0;col<4;col++)for(let row=0;row<4;row++)for(let k=0;k<4;k++)c[col*4+row]+=a[k*4+row]*b[col*4+k];return c;}
function addTriangle(out,a,b,c,na=null,nb=null,nc=null){const norm=normalize(cross(b.map((v,i)=>v-a[i]),c.map((v,i)=>v-a[i])));[a,b,c].forEach((v,i)=>out.push(...v,...([na,nb,nc][i]??norm)));}
function pumpkin(rings=12,slices=40){const out=[];const vertex=(r,s)=>{const p=r/rings*Math.PI,t=s/slices*Math.PI*2,lobe=1+.075*Math.cos(t*10);return[Math.sin(p)*Math.cos(t)*lobe,Math.cos(p),Math.sin(p)*Math.sin(t)*lobe];};for(let r=0;r<rings;r++)for(let s=0;s<slices;s++){const a=vertex(r,s),b=vertex(r+1,s),c=vertex(r+1,s+1),d=vertex(r,s+1);addTriangle(out,a,b,c,normalize(a),normalize(b),normalize(c));addTriangle(out,a,c,d,normalize(a),normalize(c),normalize(d));}return out;}
function cube(){const out=[];for(const [a,b,c,d] of [[[1,-1,-1],[1,1,-1],[1,1,1],[1,-1,1]],[[-1,-1,1],[-1,1,1],[-1,1,-1],[-1,-1,-1]],[[-1,1,-1],[-1,1,1],[1,1,1],[1,1,-1]],[[-1,-1,1],[-1,-1,-1],[1,-1,-1],[1,-1,1]],[[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],[[1,-1,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1]]]){addTriangle(out,a,b,c);addTriangle(out,a,c,d);}return out;}
function cylinder(){const out=[];for(let i=0;i<12;i++){const a=i/12*Math.PI*2,b=(i+1)/12*Math.PI*2,pa=[Math.cos(a),-1,Math.sin(a)],pb=[Math.cos(b),-1,Math.sin(b)],pc=[Math.cos(b),1,Math.sin(b)],pd=[Math.cos(a),1,Math.sin(a)];addTriangle(out,pa,pb,pc);addTriangle(out,pa,pc,pd);addTriangle(out,[0,1,0],pd,pc);addTriangle(out,[0,-1,0],pb,pa);}return out;}
function face(){const out=[];addTriangle(out,[-.53,.12,.90],[-.13,.10,.98],[-.34,.46,.91],[0,0,1],[0,0,1],[0,0,1]);addTriangle(out,[.13,.10,.98],[.53,.12,.90],[.34,.46,.91],[0,0,1],[0,0,1],[0,0,1]);addTriangle(out,[-.42,-.28,.91],[.42,-.28,.91],[.24,-.52,.88],[0,0,1],[0,0,1],[0,0,1]);addTriangle(out,[-.42,-.28,.91],[.24,-.52,.88],[-.24,-.52,.88],[0,0,1],[0,0,1],[0,0,1]);// Keep the carved face just outside the foremost pumpkin lobe. This also
// avoids near-coplanar triangles in the low-poly software renderer.
for(let i=2;i<out.length;i+=6)out[i]+=.20;
return out;}
function diamond(){const out=[];const p=[[0,1,0],[1,0,0],[0,0,1],[-1,0,0],[0,0,-1],[0,-1,0]];for(let i=1;i<=4;i++){const next=i===4?1:i+1;addTriangle(out,p[0],p[i],p[next]);addTriangle(out,p[5],p[next],p[i]);}return out;}
export function projectPoint(m,x,y,z,width,height){const q=[m[0]*x+m[4]*y+m[8]*z+m[12],m[1]*x+m[5]*y+m[9]*z+m[13],m[2]*x+m[6]*y+m[10]*z+m[14],m[3]*x+m[7]*y+m[11]*z+m[15]];return{x:(q[0]/q[3]+1)*width/2,y:(1-q[1]/q[3])*height/2,z:q[2]/q[3]};}
export function projectionFor(n,width,height,angle){
  const view=lookAt([Math.sin(angle)*15,13,Math.cos(angle)*15],[0,.15,0]),points=[];
  for(const x of [-n*1.04,n*1.04])for(const z of [-n*1.04,n*1.04])points.push([x,-.99,z],[x,-.5,z]);
  const extent=n-1+.82;for(const x of [-extent,extent])for(const z of [-extent,extent])points.push([x,-.35,z],[x,1.58,z]);
  const xs=points.map(([x,y,z])=>view[0]*x+view[4]*y+view[8]*z+view[12]),ys=points.map(([x,y,z])=>view[1]*x+view[5]*y+view[9]*z+view[13]);
  const left=Math.min(...xs),right=Math.max(...xs),bottom=Math.min(...ys),top=Math.max(...ys),cx=(left+right)/2,cy=(bottom+top)/2,aspect=width/height,ry=Math.max((top-bottom)/2,(right-left)/(2*aspect))*1.06,rx=ry*aspect;
  return multiply(ortho(cx-rx,cx+rx,cy-ry,cy+ry,.1,80),view);
}
export class LanternRenderer {
  constructor(canvas,onPositions,onLost){
    this.canvas=canvas;this.onPositions=onPositions;this.onLost=onLost;this.angle=.55;this.n=3;this.mask=0;this.pairs=[];this.pulses=new Map();this.running=false;
    const gl=this.gl=canvas.getContext('webgl',{alpha:true,antialias:true,powerPreference:'low-power'});
    this.backend=gl?'webgl':'canvas-3d';
    if(!gl){
      this.context=canvas.getContext('2d');if(!this.context){const error=new Error('The browser did not provide a WebGL or Canvas 2D context');error.code='WEBGL_UNAVAILABLE';throw error;}
      this.meshes={pumpkin:pumpkin(6,20),cube:cube(),cylinder:cylinder(),face:face(),diamond:diamond()};
      this.resizeObserver=new ResizeObserver(()=>this.request());this.resizeObserver.observe(canvas);this.request();return;
    }
    const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error('Shader compilation failed: '+gl.getShaderInfoLog(s));return s;};
    this.program=gl.createProgram();gl.attachShader(this.program,compile(gl.VERTEX_SHADER,VERT));gl.attachShader(this.program,compile(gl.FRAGMENT_SHADER,FRAG));gl.linkProgram(this.program);if(!gl.getProgramParameter(this.program,gl.LINK_STATUS))throw new Error('Shader link failed: '+gl.getProgramInfoLog(this.program));gl.useProgram(this.program);
    this.loc={p:gl.getAttribLocation(this.program,'aPosition'),n:gl.getAttribLocation(this.program,'aNormal'),vp:gl.getUniformLocation(this.program,'uVP'),pos:gl.getUniformLocation(this.program,'uPosition'),scale:gl.getUniformLocation(this.program,'uScale'),color:gl.getUniformLocation(this.program,'uColor'),glow:gl.getUniformLocation(this.program,'uGlow')};
    this.meshes={};for(const [name,data] of Object.entries({pumpkin:pumpkin(),cube:cube(),cylinder:cylinder(),face:face(),diamond:diamond()})){const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);this.meshes[name]={buffer,count:data.length/6};}
    gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.clearColor(0,0,0,0);
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();this.lost=true;onLost?.();});
    this.resizeObserver=new ResizeObserver(()=>this.request());this.resizeObserver.observe(canvas);this.request();
  }
  setPuzzle(p,mask){this.n=p.n;this.pairs=p.pairs;this.mask=mask;this.request();}
  rotate(direction){this.angle+=direction*.45;this.request();}
  pulse(indices){const now=performance.now();indices.forEach(i=>this.pulses.set(i,now));this.until=now+500;this.request();}
  request(){if(this.running||this.lost)return;this.running=true;requestAnimationFrame(time=>{this.running=false;this.draw(time);if(time<this.until)this.request();});}
  drawMesh(name,pos,scale,color,glow=0){if(!this.gl){this.drawSoftwareMesh(name,pos,scale,color,glow);return;}const gl=this.gl,m=this.meshes[name];gl.bindBuffer(gl.ARRAY_BUFFER,m.buffer);gl.enableVertexAttribArray(this.loc.p);gl.enableVertexAttribArray(this.loc.n);gl.vertexAttribPointer(this.loc.p,3,gl.FLOAT,false,24,0);gl.vertexAttribPointer(this.loc.n,3,gl.FLOAT,false,24,12);gl.uniform3fv(this.loc.pos,pos);gl.uniform3fv(this.loc.scale,scale);gl.uniform3fv(this.loc.color,color);gl.uniform1f(this.loc.glow,glow);gl.drawArrays(gl.TRIANGLES,0,m.count);}
  drawSoftwareMesh(name,pos,scale,color,glow){
    const layer=name==='cube'?(scale[0]>1?0:1):(name==='pumpkin'&&scale[1]<.1?2:3);
    const data=this.meshes[name],sun=normalize([-.45,.9,.65]),rim=normalize([.6,.4,-.8]);
    for(let k=0;k<data.length;k+=18){
      const points=[],normal=[0,0,0];for(let vertex=0;vertex<3;vertex++){const j=k+vertex*6;points.push(this.project(data[j]*scale[0]+pos[0],data[j+1]*scale[1]+pos[1],data[j+2]*scale[2]+pos[2]));for(let axis=0;axis<3;axis++)normal[axis]+=data[j+3+axis]/scale[axis];}
      const n=normalize(normal),light=.4+Math.max(0,dot(n,sun))*.64,edge=Math.max(0,dot(n,rim))*.32;
      const rgb=color.map((value,i)=>Math.round(Math.min(1,Math.max(0,(value*light+[.18,.16,.28][i]*edge)*(1-glow)+value*glow))*255));
      this.triangles.push({points,layer,depth:points.reduce((a,p)=>a+p.z,0)/3,fill:`rgb(${rgb.join(',')})`});
    }
  }
  project(x,y,z){return projectPoint(this.vp,x,y,z,this.width,this.height);}
  draw(time){
    if(this.lost)return;const gl=this.gl,rect=this.canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;this.width=rect.width;this.height=rect.height;const dpr=Math.min(window.devicePixelRatio||1,2),w=Math.round(rect.width*dpr),h=Math.round(rect.height*dpr);if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}
    this.vp=projectionFor(this.n,rect.width,rect.height,this.angle);
    if(gl){gl.viewport(0,0,w,h);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(this.program);gl.uniformMatrix4fv(this.loc.vp,false,this.vp);}
    else{this.context.setTransform(dpr,0,0,dpr,0,0);this.context.clearRect(0,0,rect.width,rect.height);this.triangles=[];}
    const size=this.n*1.04;this.drawMesh('cube',[0,-.75,0],[size,.2,size],[.13,.20,.22]);this.drawMesh('cube',[0,-.54,0],[size*.99,.025,size*.99],[.25,.31,.30]);this.drawMesh('cube',[0,-.96,0],[size*.92,.03,size*.92],[.065,.12,.15]);
    const twinSet=new Set(this.pairs.flat()),positions=[];
    for(let i=0;i<this.n*this.n;i++){
      const x=(i%this.n-(this.n-1)/2)*2,z=(Math.floor(i/this.n)-(this.n-1)/2)*2,on=!!(this.mask&(1<<i));
      const age=(time-(this.pulses.get(i)??-1000))/500,bounce=age<1?Math.sin(age*Math.PI)*.10:0;
      this.drawMesh('cube',[x,-.47,z],[.88,.055,.88],on?[.28,.32,.27]:[.21,.27,.29]);
      this.drawMesh('pumpkin',[x,-.33,z],[.73,.035,.67],[.07,.12,.15]);
      this.drawMesh('pumpkin',[x,.26+bounce,z],[.75,.58,.75],on?[.97,.55,.19]:[.32,.28,.27],on?.12:0);
      this.drawMesh('face',[x,.26+bounce,z],[.75,.58,.75],on?[1,.87,.45]:[.10,.14,.16],on?1:0);
      this.drawMesh('cylinder',[x+.015,.94+bounce,z],[.105,.17,.09],on?[.36,.40,.21]:[.21,.29,.22]);
      if(twinSet.has(i))this.drawMesh('diamond',[x,1.28+bounce,z],[.12,.18,.12],[.75,.62,.94],.8);
      const center=this.project(x,.30,z),extent=this.project(x+.75,.3,z);positions.push({...center,width:Math.max(38,Math.abs(extent.x-center.x)*2+15),top:this.project(x,1.35,z)});
    }
    for(const x of [-size+.22,size-.22])for(const z of [-size+.22,size-.22]){this.drawMesh('cylinder',[x,-.24,z],[.06,.3,.06],[.70,.53,.30]);this.drawMesh('diamond',[x,.09,z],[.10,.14,.10],[.99,.76,.37],.8);}
    if(!gl){const context=this.context;this.triangles.sort((a,b)=>a.layer-b.layer||b.depth-a.depth);context.lineJoin='round';context.lineWidth=.45;for(const {points,fill} of this.triangles){context.beginPath();context.moveTo(points[0].x,points[0].y);context.lineTo(points[1].x,points[1].y);context.lineTo(points[2].x,points[2].y);context.closePath();context.fillStyle=fill;context.strokeStyle=fill;context.fill();context.stroke();}}
    this.onPositions(positions,{width:this.width,height:this.height});
  }
}
