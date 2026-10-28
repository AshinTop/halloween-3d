import test from 'node:test';
import assert from 'node:assert/strict';
import {projectionFor,projectPoint} from '../renderer.js';

test('3D framing retains platform corners and lantern markers in every host size and orbit',()=>{
  for(const n of [3,4])for(const [w,h] of [[1152,420],[960,380],[390,270],[390,120],[700,200],[300,520]])for(let k=0;k<16;k++){
    const m=projectionFor(n,w,h,k*Math.PI/8);
    for(const x of [-n*1.04,n*1.04])for(const z of [-n*1.04,n*1.04]){
      const p=projectPoint(m,x,-.99,z,w,h);assert.ok(p.x>0&&p.x<w&&p.y>0&&p.y<h);assert.ok(p.z>-1&&p.z<1);
    }
    for(let i=0;i<n*n;i++){
      const x=(i%n-(n-1)/2)*2,z=(Math.floor(i/n)-(n-1)/2)*2;
      for(const y of [.3,1.5]){const p=projectPoint(m,x,y,z,w,h);assert.ok(p.x>0&&p.x<w&&p.y>0&&p.y<h);}
    }
  }
});
test('software and GPU use one projection with correct resize scaling and depth ordering',()=>{
  const a=projectionFor(3,600,400,.55),b=projectionFor(3,1200,800,.55);
  const p=projectPoint(a,2,.3,2,600,400),q=projectPoint(b,2,.3,2,1200,800);
  assert.ok(Math.abs(q.x-2*p.x)<.001&&Math.abs(q.y-2*p.y)<.001);
  const front=projectPoint(a,2,.3,2,600,400),back=projectPoint(a,-2,.3,-2,600,400);
  assert.ok(front.z<back.z,'painter algorithm draws larger depth first');
  const rotated=projectPoint(projectionFor(3,600,400,2),2,.3,2,600,400);
  assert.ok(Math.abs(rotated.x-front.x)>100,'orbit changes the real projected position');
});
