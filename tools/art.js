const TOWERS={farmer:{color:'#8d6e63'},sprinkler:{color:'#29b6f6'},scare:{color:'#d4a017'},spray:{color:'#e53935'},dog:{color:'#78909c'},cannon:{color:'#0288d1'},drone:{color:'#546e7a'},zapper:{color:'#3949ab'}};
// ===== map data (mirrors game) =====
const MAPS=[
 {paths:[[[4,-1.2],[4,1],[1,1],[1,4],[7,4],[7,7],[1,7],[1,10],[7,10],[7,13],[4,13],[4,14.35]]],decor:[[8,0,'palm'],[0,6,'rock'],[8,12,'tree'],[5,2,'tree'],[0,13,'rock'],[4,8,'flowers'],[5,11,'flowers']],tree:'gum',pal:{dry:'#cdaa58',green:'#929245',dirt:'#b4532a',lush:.22}},
 {paths:[[[-1.2,2],[6,2],[6,5],[2,5],[2,8],[7,8],[7,11],[1,11],[1,13],[5,13],[5,14.35]]],decor:[[8,1,'tree'],[0,4,'tree'],[4,7,'shed'],[8,6,'rock'],[0,9,'tree'],[4,10,'rock'],[8,13,'tree'],[3,0,'tree']],tree:'lychee',pal:{dry:'#d1ae5d',green:'#8a9442',dirt:'#ba5a2b',lush:.3}},
 {paths:[[[1,-1.2],[1,3],[4,3],[4,6],[7,6],[7,9],[2,9],[2,12],[4,12],[4,14.35]],[[7,-1.2],[7,3],[4,3],[4,6],[7,6],[7,9],[2,9],[2,12],[4,12],[4,14.35]]],decor:[[0,7,'water'],[1,7,'water'],[2,7,'water'],[3,7,'water'],[0,8,'water'],[4,0,'tree'],[8,11,'tree'],[0,12,'rock'],[6,11,'rock'],[4,1,'palm']],tree:'gum',pal:{dry:'#c6a65a',green:'#80913f',dirt:'#ae5230',lush:.4}}];
const TS=64,COLS=9,ROWS=16,MARG=1;
// ===== decor painters (use global ctx) =====
function shadowBlob(x,y,rx,ry,a){const g=ctx.createRadialGradient(x,y,0,x,y,rx);g.addColorStop(0,'rgba(40,20,5,'+a+')');g.addColorStop(1,'rgba(40,20,5,0)');ctx.save();ctx.translate(x,y);ctx.scale(1,ry/rx);ctx.translate(-x,-y);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,rx,0,TAU);ctx.fill();ctx.restore();}
function gumTree(x,y,t,R,big){const k=big?1.25:1;shadowBlob(x+t*.35*k,y+t*.3*k,t*.62*k,t*.38*k,.45);
  ctx.strokeStyle='#d9d2c3';ctx.lineCap='round';const tr=(x1,y1,x2,y2,w)=>{const g=ctx.createLinearGradient(x1-w,0,x1+w,0);g.addColorStop(0,'#f1ece2');g.addColorStop(1,'#a99f8c');ctx.strokeStyle=g;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x1,y1);ctx.quadraticCurveTo((x1+x2)/2+(R()-.5)*8,(y1+y2)/2,x2,y2);ctx.stroke();};
  tr(x,y+t*.2*k,x-t*.05,y-t*.1*k,t*.14*k);tr(x-t*.05,y-t*.15*k,x-t*.3*k,y-t*.45*k,t*.07*k);tr(x-t*.03,y-t*.2*k,x+t*.28*k,y-t*.42*k,t*.07*k);
  const cols=['#5f7560','#6d8466','#7d9470','#4f6550','#8aa07a','#738a5a'];for(let i=0;i<34;i++){const a=R()*TAU,r=Math.sqrt(R())*t*.5*k;const cx=x+Math.cos(a)*r*1.15,cy=y-t*.4*k+Math.sin(a)*r*.7;E(cx,cy,t*(.12+R()*.1)*k,t*(.08+R()*.06)*k,cols[(R()*6)|0],R()*3);}
  for(let i=0;i<10;i++){const a=R()*TAU,r=R()*t*.3*k;O(x-t*.08+Math.cos(a)*r,y-t*.5*k+Math.sin(a)*r*.6,t*.05,'rgba(220,235,180,.35)');}}
function lycheeTree(x,y,t,R){shadowBlob(x+t*.3,y+t*.28,t*.55,t*.32,.45);ctx.fillStyle='#5d4037';ctx.fillRect(x-t*.05,y-t*.05,t*.1,t*.32);
  O(x,y-t*.2,t*.4,'#2f5d2a');for(let i=0;i<12;i++){const a=R()*TAU,r=R()*t*.3;O(x+Math.cos(a)*r,y-t*.22+Math.sin(a)*r*.8,t*(.1+R()*.08),['#3e7a35','#2e6a2a','#4c8a3e'][(R()*3)|0]);}
  for(let i=0;i<12;i++){const a=R()*TAU,r=R()*t*.32;O(x+Math.cos(a)*r,y-t*.2+Math.sin(a)*r*.8,t*.04,R()<.5?'#d8433a':'#b8302b');}}
function palmTree(x,y,t,R){shadowBlob(x+t*.35,y+t*.25,t*.5,t*.25,.4);ctx.strokeStyle='#8d6e4f';ctx.lineWidth=t*.1;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-t*.12,y+t*.35);ctx.quadraticCurveTo(x+t*.08,y,x,y-t*.3);ctx.stroke();
  for(let i=0;i<8;i++){const a=i/8*TAU+R()*.3;ctx.strokeStyle=i%2?'#4f7f34':'#6a9a45';ctx.lineWidth=t*.07;ctx.beginPath();ctx.moveTo(x,y-t*.3);ctx.quadraticCurveTo(x+Math.cos(a)*t*.28,y-t*.48+Math.sin(a)*t*.1,x+Math.cos(a)*t*.5,y-t*.22+Math.sin(a)*t*.24);ctx.stroke();}O(x,y-t*.3,t*.06,'#6d5232');}
function rock(x,y,t,R,sc){sc=sc||1;shadowBlob(x+t*.15*sc,y+t*.18*sc,t*.4*sc,t*.16*sc,.4);const pts=[];const n=8;for(let i=0;i<n;i++){const a=i/n*TAU;const r=t*(.26+R()*.1)*sc;pts.push(x+Math.cos(a)*r*1.15,y+Math.sin(a)*r*.75);}poly(pts,'#a3633e');
  poly([x-t*.2*sc,y-t*.08*sc,x,y-t*.2*sc,x+t*.15*sc,y-t*.12*sc,x+t*.02*sc,y],'#c98a5c');ctx.strokeStyle='rgba(60,25,10,.45)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x-t*.05*sc,y-t*.05*sc);ctx.lineTo(x+t*.12*sc,y+t*.1*sc);ctx.stroke();}
function termite(x,y,t,R){shadowBlob(x+t*.2,y+t*.15,t*.3,t*.12,.4);poly([x-t*.18,y+t*.12,x-t*.1,y-t*.3,x-t*.02,y-t*.45,x+t*.06,y-t*.32,x+t*.16,y+t*.12],'#b4602f');poly([x-t*.04,y-t*.35,x+t*.02,y-t*.45,x+t*.05,y-t*.2],'#d08048');}
function shed(x,y,t,R){shadowBlob(x+t*.25,y+t*.25,t*.55,t*.25,.45);ctx.fillStyle='#8d6e55';ctx.fillRect(x-t*.42,y-t*.12,t*.84,t*.44);
  const g=ctx.createLinearGradient(x-t*.5,0,x+t*.5,0);for(let i=0;i<=10;i++)g.addColorStop(i/10,i%2?'#9fa9ad':'#c9d1d4');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-t*.5,y-t*.05);ctx.lineTo(x-t*.42,y-t*.45);ctx.lineTo(x+t*.42,y-t*.45);ctx.lineTo(x+t*.5,y-t*.05);ctx.fill();
  for(let i=0;i<5;i++)O(x-t*.3+R()*t*.6,y-t*.35+R()*t*.25,t*.04,'rgba(150,70,30,.5)');ctx.fillStyle='#3e2a1c';ctx.fillRect(x-t*.12,y+t*.02,t*.24,t*.3);}
function flowers(x,y,t,R){for(let i=0;i<14;i++){O(x+(R()-.5)*t*.9,y+(R()-.5)*t*.9,t*.03,['#f6d54a','#fff6e0','#e98fb0','#f2a33a'][(R()*4)|0]);}}
// ===== terrain =====
function terrain(mi){
  const K=1.5,M=MAPS[mi],W=(COLS+2*MARG)*TS,H=(ROWS+2*MARG)*TS,c=document.createElement('canvas');c.width=W*K;c.height=H*K;ctx=c.getContext('2d');
  const n1=mkNoise(11+mi),n2=mkNoise(23+mi),n3=mkNoise(37+mi),R=rng(101+mi*7);const P=M.pal;
  const dry=hex2rgb(P.dry),grn=hex2rgb(P.green),dirt=hex2rgb(P.dirt);
  const img=ctx.createImageData(W*K,H*K),d=img.data;
  for(let yy=0;yy<H*K;yy++)for(let xx=0;xx<W*K;xx++){const x=xx/K,y=yy/K;const a=fbm(n1,x/170,y/170,4),b=fbm(n2,x/22,y/22,3),e=fbm(n3,x/260+5,y/260,4);
    let k=Math.min(1,Math.max(0,(a-.5)*2.2+P.lush));if(y>(14+MARG)*TS-20)k=Math.min(1,k+.45);
    let col=dry.map((v,i)=>v+(grn[i]-v)*k);const bare=Math.max(0,Math.min(1,(e-.57)*5));col=col.map((v,i)=>v+(dirt[i]-v)*bare*.75);
    const sh=.82+b*.36;const i=(yy*W*K+xx)*4;d[i]=col[0]*sh;d[i+1]=col[1]*sh;d[i+2]=col[2]*sh;d[i+3]=255;}
  ctx.putImageData(img,0,0);ctx.scale(K,K);
  // brush strokes (dry grass)
  for(let i=0;i<16000;i++){const x=R()*W,y=R()*H,l=3+R()*6,a=-1.3+(R()-.5)*.8;const k=R();ctx.strokeStyle=k<.4?'rgba(225,205,130,.35)':k<.7?'rgba(110,125,55,.35)':'rgba(80,70,30,.3)';ctx.lineWidth=1+R()*.8;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l);ctx.stroke();}
  const toPx=(gx,gy)=>[(gx+.5+MARG)*TS,(gy+.5+MARG)*TS];
  // water (creek) under path
  const water=M.decor.filter(q=>q[2]==='water');
  if(water.length){const pts=water.map(q=>toPx(q[0],q[1]));const cr=[[-1.6,7.25],[0,7],[1,7.12],[2,6.9],[3.05,7]].map(q=>toPx(q[0],q[1])),br=[[0,7],[-.05,8.4]].map(q=>toPx(q[0],q[1]));
    const st=(w,col)=>{ctx.strokeStyle=col;ctx.lineWidth=TS*w;ctx.lineCap='round';ctx.lineJoin='round';for(const L of [cr,br]){ctx.beginPath();L.forEach(([x,y],i)=>{const j=(fbm(n2,x/40,y/40,2)-.5)*10;i?ctx.lineTo(x,y+j):ctx.moveTo(x,y);});ctx.stroke();}};
    st(1.0,'rgba(196,160,100,1)');st(.88,'#8a9a6a');st(.74,'#4f8f99');st(.42,'#3a7088');
    for(let i=0;i<50;i++){const p=pts[(R()*pts.length)|0];ctx.strokeStyle='rgba(220,240,240,.45)';ctx.lineWidth=1.5;const x=p[0]+(R()-.5)*TS*.7,y=p[1]+(R()-.5)*TS*.4;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+6,y-3,x+12,y);ctx.stroke();}
    for(let i=0;i<40;i++){const p=pts[(R()*pts.length)|0];const x=p[0]+(R()-.5)*TS*1.1,y=p[1]+(R()<.5?-1:1)*TS*.46;ctx.strokeStyle='#56702e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(R()-.5)*4,y-8-R()*6);ctx.stroke();}}
  // path
  const samples=[];for(const [pi,pts] of M.paths.entries()){for(let i=0;i<pts.length-1;i++){const [x1,y1]=pts[i],[x2,y2]=pts[i+1],L=Math.hypot(x2-x1,y2-y1),n=Math.ceil(L*TS/2);for(let j=0;j<=n;j++){const t=j/n,gx=x1+(x2-x1)*t,gy=y1+(y2-y1)*t;samples.push([...toPx(gx,gy),(x2-x1)/L,(y2-y1)/L,pi]);}}}
  const pass=(r,col,jit,al)=>{ctx.fillStyle=col;ctx.globalAlpha=al||1;for(const [x,y] of samples){const j=(fbm(n2,x/55,y/55,2)-.5)*jit*.7;ctx.beginPath();ctx.arc(x,y,TS*r+j,0,TAU);ctx.fill();}ctx.globalAlpha=1;};
  pass(.52,'rgba(70,40,15,.18)',16);pass(.47,'#7a3c1c',14);pass(.43,'#a54e27',12);pass(.38,'#b65a2c',10);pass(.24,'#c36a3a',8,.5);
  // ruts
  for(const off of [-.17,.17]){ctx.strokeStyle='rgba(110,48,20,.55)';ctx.lineWidth=5;ctx.beginPath();let first=true,lp=-1;for(const [x,y,dx,dy,pi] of samples){if(pi!==lp)first=true;lp=pi;const px=x-dy*TS*off,py=y+dx*TS*off;first?ctx.moveTo(px,py):ctx.lineTo(px,py);first=false;}ctx.stroke();
    ctx.strokeStyle='rgba(225,150,95,.35)';ctx.lineWidth=1.5;ctx.beginPath();first=true;lp=-1;for(const [x,y,dx,dy,pi] of samples){if(pi!==lp)first=true;lp=pi;const px=x-dy*TS*(off*1.25),py=y+dx*TS*(off*1.25);first?ctx.moveTo(px,py):ctx.lineTo(px,py);first=false;}ctx.stroke();}
  for(let i=0;i<1400;i++){const s=samples[(R()*samples.length)|0];const x=s[0]+(R()-.5)*TS*.75,y=s[1]+(R()-.5)*TS*.75;ctx.fillStyle=R()<.5?'rgba(80,35,12,.5)':'rgba(240,180,120,.5)';ctx.beginPath();ctx.ellipse(x,y,1+R()*2,1+R()*1.4,R()*3,0,TAU);ctx.fill();}
  // grass overhang on path edges
  for(let i=0;i<1800;i++){const s=samples[(R()*samples.length)|0],side=R()<.5?-1:1,off=(.42+R()*.08)*side;const x=s[0]-s[3]*TS*off,y=s[1]+s[2]*TS*off;ctx.strokeStyle=R()<.5?'rgba(205,185,110,.7)':'rgba(120,130,60,.7)';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(R()-.5)*6,y-4-R()*5);ctx.stroke();}
  // orchard strip
  const oy=(14+MARG)*TS;const og=ctx.createLinearGradient(0,oy-10,0,H);og.addColorStop(0,'rgba(60,110,30,.0)');og.addColorStop(.15,'rgba(60,110,30,.35)');og.addColorStop(1,'rgba(40,80,20,.5)');ctx.fillStyle=og;ctx.fillRect(0,oy-10,W,H-oy+10);
  for(let i=0;i<5;i++){const tx=(.9+i*1.8+MARG)*TS,ty=(14.95+(i%2)*.35+MARG)*TS;ctx.fillStyle='rgba(70,40,20,.55)';ctx.beginPath();ctx.ellipse(tx,ty+TS*.42,TS*.55,TS*.22,0,0,TAU);ctx.fill();}
  // fence
  const fy=oy-TS*.08;for(let x=TS*.3;x<W;x+=TS*.72){const pp=M.paths.some(p=>{const l=p[p.length-1];return Math.abs((l[0]+.5+MARG)*TS-x)<TS*.5;});if(pp)continue;ctx.fillStyle='#6d4c33';ctx.fillRect(x-2.5,fy-14,5,22);ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(x+2.5,fy-10,3,18);}
  ctx.strokeStyle='rgba(200,200,190,.8)';ctx.lineWidth=1.2;for(const dy of [-9,-2]){ctx.beginPath();let on=false;for(let x=0;x<=W;x+=4){const gap=M.paths.some(p=>{const l=p[p.length-1];return Math.abs((l[0]+.5+MARG)*TS-x)<TS*.5;});if(gap){on=false;continue;}on?ctx.lineTo(x,fy+dy+Math.sin(x/30)):ctx.moveTo(x,fy+dy);on=true;}ctx.stroke();}
  // build spot corner ticks
  const grid=[];for(let r=0;r<ROWS;r++)grid.push(new Array(COLS).fill(0));
  for(const pts of M.paths)for(let i=0;i<pts.length-1;i++){const [x1,y1]=pts[i],[x2,y2]=pts[i+1],n=Math.ceil(Math.hypot(x2-x1,y2-y1)*4);for(let j=0;j<=n;j++){const x=Math.round(x1+(x2-x1)*j/n),y=Math.round(y1+(y2-y1)*j/n);if(y>=0&&y<ROWS&&x>=0&&x<COLS)grid[y][x]=1;}}
  for(const q of M.decor)if(q[2]!=='flowers')grid[q[1]][q[0]]=2;
  ctx.strokeStyle='rgba(255,245,215,.2)';ctx.lineWidth=2;ctx.lineCap='round';
  for(let r=0;r<14;r++)for(let cc=0;cc<COLS;cc++)if(grid[r][cc]===0){const x=(cc+MARG)*TS+6,y=(r+MARG)*TS+6,s=TS-12,k=8;ctx.beginPath();ctx.moveTo(x,y+k);ctx.lineTo(x,y);ctx.lineTo(x+k,y);ctx.moveTo(x+s-k,y);ctx.lineTo(x+s,y);ctx.lineTo(x+s,y+k);ctx.moveTo(x+s,y+s-k);ctx.lineTo(x+s,y+s);ctx.lineTo(x+s-k,y+s);ctx.moveTo(x+k,y+s);ctx.lineTo(x,y+s);ctx.lineTo(x,y+s-k);ctx.stroke();}
  // decor + margin decor (sorted by y)
  const items=[];for(const q of M.decor){if(q[2]==='water')continue;items.push([...toPx(q[0],q[1]),q[2]==='tree'?M.tree:q[2]]);}
  for(let r=-1;r<=14;r+=1){if(R()<.55)items.push([...toPx(-1,r+R()*.6),R()<.7?'gum':(R()<.5?'rock':'termite'),1]);if(R()<.55)items.push([...toPx(COLS,r+R()*.6),R()<.7?'gum':(R()<.5?'rock':'termite'),1]);}
  for(let cc=-1;cc<=COLS;cc++)if(R()<.5&&!M.paths.some(p=>Math.abs(p[0][0]-cc)<1&&p[0][1]<0))items.push([...toPx(cc,-1+R()*.3),'gum',1]);
  items.sort((a,b)=>a[1]-b[1]);
  for(const [x,y,k,m] of items){if(k==='gum')gumTree(x,y+TS*.2,TS,R,m&&R()<.5);else if(k==='lychee')lycheeTree(x,y+TS*.1,TS,R);else if(k==='palm')palmTree(x,y,TS,R);else if(k==='rock')rock(x,y,TS,R);else if(k==='termite')termite(x,y,TS,R);else if(k==='shed')shed(x,y,TS,R);else if(k==='flowers')flowers(x,y,TS,R);}
  // entry dust sign
  // warm light + vignette
  const g=ctx.createRadialGradient(W*.2,H*.1,0,W*.2,H*.1,H*.9);g.addColorStop(0,'rgba(255,215,140,.18)');g.addColorStop(1,'rgba(255,215,140,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const v=ctx.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*.75);v.addColorStop(0,'rgba(60,25,5,0)');v.addColorStop(1,'rgba(60,25,5,.35)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
  return c;}
// ===== mango trees =====
function mangoTree(bare){return cell(176,176,()=>{const R=rng(bare?5:3),s=64;
  ctx.strokeStyle='#6b4a2e';ctx.lineWidth=s*.16;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,s*.75);ctx.lineTo(0,s*.05);ctx.stroke();ctx.lineWidth=s*.08;ctx.beginPath();ctx.moveTo(0,s*.25);ctx.lineTo(-s*.35,-s*.1);ctx.moveTo(0,s*.2);ctx.lineTo(s*.35,-s*.05);ctx.stroke();
  const cols=bare?['#7d7a44','#8c8650','#6c6a3a']:['#2f6b2a','#3d7f33','#4e9440','#285e25'];
  O(0,-s*.15,s*.95,cols[0]);for(let i=0;i<22;i++){const a=R()*TAU,r=R()*s*.7;O(Math.cos(a)*r,-s*.2+Math.sin(a)*r*.8,s*(.22+R()*.18),cols[(R()*cols.length)|0]);}
  for(let i=0;i<14;i++){const a=R()*TAU,r=R()*s*.6;E(Math.cos(a)*r-s*.15,-s*.4+Math.sin(a)*r*.6,s*.12,s*.05,bare?'rgba(200,190,120,.35)':'rgba(190,230,140,.35)',a);}},{ow:2.5});}
function mangoFruit(){return cell(40,40,()=>{E(0,0,11,14,'#ffb300',.4);E(4,5,7,8,'#ef6c00',.4);E(-3,-5,3,2,'rgba(255,255,255,.7)',.4);poly([2,-14,6,-19,9,-16],'#3d7f33');},{ow:1.5});}
// ===== title art & icon =====
function titleArt(){const W=720,H=400,c=document.createElement('canvas');c.width=W;c.height=H;ctx=c.getContext('2d');const R=rng(77);
  const sky=ctx.createLinearGradient(0,0,0,H*.6);sky.addColorStop(0,'#f6b55a');sky.addColorStop(.6,'#f8d48a');sky.addColorStop(1,'#fbe7b4');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  O(W*.72,H*.32,46,'#fff3c4');const sg=ctx.createRadialGradient(W*.72,H*.32,40,W*.72,H*.32,200);sg.addColorStop(0,'rgba(255,240,190,.6)');sg.addColorStop(1,'rgba(255,240,190,0)');ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);
  const hills=(y,col,amp,seed)=>{const n=mkNoise(seed);ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=6)ctx.lineTo(x,y-fbm(n,x/140,0,3)*amp);ctx.lineTo(W,H);ctx.fill();};
  hills(H*.55,'#c98a5a',70,1);hills(H*.62,'#a8673f',50,2);hills(H*.72,'#b9a35c',30,3);
  const g=ctx.createLinearGradient(0,H*.68,0,H);g.addColorStop(0,'#b8a25a');g.addColorStop(1,'#8a7c3e');ctx.fillStyle=g;ctx.fillRect(0,H*.7,W,H*.3);
  for(let i=0;i<5000;i++){const x=R()*W,y=H*.68+R()*H*.32;ctx.strokeStyle=R()<.5?'rgba(230,205,130,.4)':'rgba(100,95,40,.35)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(R()-.5)*3,y-3-R()*5);ctx.stroke();}
  ctx.fillStyle='#b65a2c';ctx.beginPath();ctx.moveTo(W*.42,H);ctx.quadraticCurveTo(W*.55,H*.82,W*.62,H*.7);ctx.lineTo(W*.66,H*.7);ctx.quadraticCurveTo(W*.65,H*.85,W*.62,H);ctx.fill();
  ctx.save();for(let i=0;i<4;i++){gumTree(40+i*60+R()*20,H*.72+R()*10,60+R()*20,R,true);}ctx.restore();
  const mt=mangoTree(false);for(let i=0;i<3;i++){ctx.drawImage(mt,W*.74+i*58-88,H*.58+(i%2)*14,176*.9,176*.9);}
  const mf=mangoFruit();for(let i=0;i<9;i++)ctx.drawImage(mf,W*.74+R()*150-60,H*.62+R()*60,22,22);
  return c;}
function iconArt(S){const c=document.createElement('canvas');c.width=c.height=S;ctx=c.getContext('2d');const g=ctx.createLinearGradient(0,0,0,S);g.addColorStop(0,'#f2b25a');g.addColorStop(.55,'#d27a3c');g.addColorStop(1,'#8a4a22');ctx.fillStyle=g;ctx.fillRect(0,0,S,S);
  ctx.save();ctx.scale(S/512,S/512);ctx.fillStyle='#b65a2c';ctx.beginPath();ctx.moveTo(150,512);ctx.quadraticCurveTo(250,380,270,300);ctx.lineTo(320,300);ctx.quadraticCurveTo(320,420,380,512);ctx.fill();
  const mf=mangoFruit();ctx.drawImage(mf,110,90,300,300);ctx.restore();return c;}
// ===== UI textures =====
function woodTex(W,H,base,seed){const c=document.createElement('canvas');c.width=W;c.height=H;ctx=c.getContext('2d');const n=mkNoise(seed),R=rng(seed);const b=hex2rgb(base);const img=ctx.createImageData(W,H),d=img.data;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const plank=Math.floor(y/(H/4));const g=fbm(n,x/90+plank*13,y/6+plank*7,3);const s=.78+.3*Math.sin(g*18)*.5+.25*g;const i=(y*W+x)*4;const seam=(y%(H/4))<2?.55:1;d[i]=b[0]*s*seam;d[i+1]=b[1]*s*seam;d[i+2]=b[2]*s*seam;d[i+3]=255;}
  ctx.putImageData(img,0,0);for(let i=0;i<40;i++){ctx.strokeStyle='rgba(255,240,210,.08)';ctx.lineWidth=1;const x=R()*W,y=R()*H;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+20+R()*40,y+(R()-.5)*2);ctx.stroke();}
  for(let p=0;p<4;p++)for(const x of [12,W-12]){O(x,p*(H/4)+H/8,2.6,'#3a2a1c');O(x-.7,p*(H/4)+H/8-.7,1,'rgba(255,255,255,.4)');}return c;}
function ironTex(W,H){const c=document.createElement('canvas');c.width=W;c.height=H;ctx=c.getContext('2d');const g=ctx.createLinearGradient(0,0,W,0);const n=16;for(let i=0;i<=n;i++){g.addColorStop(i/n,i%2?'#7f8c8d':'#b9c3c5');}ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const nz=mkNoise(5),img=ctx.getImageData(0,0,W,H),d=img.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const r=fbm(nz,x/40,y/40,4);const k=Math.max(0,(r-.55)*3.2);const i=(y*W+x)*4;d[i]=d[i]*(1-k)+150*k;d[i+1]=d[i+1]*(1-k)+70*k;d[i+2]=d[i+2]*(1-k)+30*k;}ctx.putImageData(img,0,0);return c;}
// ===== sprite catalogue =====
const ENEMY_FRAMES={fly:[.39,1.18],hare:[0,1.12],toad:[0,1.43],cocky:[.98,2.95],crow:[.87,2.62],bat:[.98,2.95],camp:[.98,2.95],beetle:[0,1.05],goat:[.39,1.96],emu:[.65,3.27],brumby:[.25,1.23],pig:[.39,1.96],boss:[.39,1.96],croc:[0,1.75]};
function buildSprites(){const out={};
  for(const k in ENEMY_FRAMES){const big=k==='boss'||k==='croc';const S=big?256:128,s=big?80:40;ENEMY_FRAMES[k].forEach((a,i)=>{out['e_'+k+'_'+i]={c:cell(S,S,()=>SPR[k](s,a,null)),s};});}
  const TT=['farmer','sprinkler','scare','spray','dog','cannon','drone','zapper'];
  for(const t of TT){for(const [lv,br,nm] of [[0,0,'0'],[1,0,'1'],[2,0,'a'],[2,1,'b']]){NOGUN=true;out['t_'+t+'_'+nm]={c:cell(144,144,()=>drawTowerSprite({type:t,lv,br,ang:-.7,anim:0,spin:.4,heat:0},0,4,56,false)),s:56};}
    NOGUN=false;out['i_'+t]={c:cell(144,144,()=>drawTowerSprite({type:t,lv:0,br:0,ang:-.7,anim:0,spin:.4,heat:0},0,4,56,true)),s:56};NOGUN=true;}
  out.hero_idle={c:cell(128,128,()=>heroSprite(0,0,50,0,false,1,0,0)),s:50};out.hero_0={c:cell(128,128,()=>heroSprite(0,0,50,.52,true,1,0,0)),s:50};out.hero_1={c:cell(128,128,()=>heroSprite(0,0,50,1.57,true,1,0,0)),s:50};
  NOGUN=false;out.hero_icon={c:cell(128,128,()=>heroSprite(0,8,56,0,false,1,-.4,0)),s:56};NOGUN=true;
  for(const big of [0,1]){out['dog'+big+'_sit']={c:cell(96,96,()=>dogSprite(0,0,34,0,false,1,!!big)),s:34};out['dog'+big+'_0']={c:cell(96,96,()=>dogSprite(0,0,34,.36,true,1,!!big)),s:34};out['dog'+big+'_1']={c:cell(96,96,()=>dogSprite(0,0,34,1.07,true,1,!!big)),s:34};}
  out.drone0={c:cell(96,96,()=>droneSprite(0,0,36,.3,false)),s:36};out.drone1={c:cell(96,96,()=>droneSprite(0,0,36,.3,true)),s:36};
  out.ute={c:cell(128,96,()=>uteSprite(0,0,44,1)),s:44};
  out.mango_tree={c:mangoTree(false),s:64};out.mango_bare={c:mangoTree(true),s:64};out.mango={c:mangoFruit(),s:14};
  return out;}
