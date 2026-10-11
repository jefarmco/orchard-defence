function legs(s,a,n,col,len,spread){for(let i=0;i<n;i++){const ph=a*2+i*Math.PI,x=(i/(n-1||1)-.5)*spread*s;line(x,s*.2,x+Math.sin(ph)*s*.15,s*.2+len*s,col,s*.11);}}
// ---------- enemy sprites (drawn at origin, facing right, s = radius px) ----------
function batShape(s,a,body,wing,head){const f=Math.sin(a*1.6);
  for(const m of [-1,1]){ctx.fillStyle=C(wing);ctx.beginPath();ctx.moveTo(0,-s*.1);ctx.quadraticCurveTo(m*s*.6,-s*(.75*f+.35),m*s*1.15,-s*.15*f-s*.05);ctx.lineTo(m*s*.85,s*.2);ctx.lineTo(m*s*.62,s*.05);ctx.lineTo(m*s*.4,s*.25);ctx.lineTo(m*s*.2,s*.1);ctx.closePath();ctx.fill();}
  E(0,s*.05,s*.26,s*.4,body);O(0,-s*.32,s*.24,head);poly([-s*.2,-s*.42,-s*.12,-s*.68,-s*.04,-s*.45],head);poly([s*.2,-s*.42,s*.12,-s*.68,s*.04,-s*.45],head);
  O(-s*.09,-s*.34,s*.05,'#fff');O(s*.09,-s*.34,s*.05,'#fff');}
function pigShape(s,a,boss){const b=boss?'#3e2723':'#5d4037',d=boss?'#211510':'#4e342e',h=boss?'#4e342e':'#6d4c41';
  legs(s,a,4,d,.35,1.0);E(0,0,s*.78,s*.5,b);E(-s*.1,-s*.28,s*.6,s*.2,d);
  ctx.strokeStyle=C(d);ctx.lineWidth=s*.07;ctx.beginPath();ctx.arc(-s*.82,-s*.1,s*.12,0,4.5);ctx.stroke();
  O(s*.62,-s*.05,s*.36,h);poly([s*.45,-s*.32,s*.52,-s*.58,s*.66,-s*.34],d);E(s*.95,s*.02,s*.13,s*.16,'#d7a08a');
  O(s*.95,-s*.02,s*.03,'#5d4037');O(s*.95,s*.07,s*.03,'#5d4037');poly([s*.8,s*.12,s*.95,s*.28,s*.86,s*.1],'#fffde7');
  O(s*.7,-s*.17,s*.06,boss?'#ff1744':'#111');
  if(boss){poly([s*.35,-s*.55,s*.42,-s*.85,s*.52,-s*.65,s*.62,-s*.9,s*.7,-s*.65,s*.8,-s*.85,s*.82,-s*.5],'#ffd54f');}}
const SPR={
  fly(s,a){E(-s*.1,-s*.32,s*.48,s*.2,'rgba(220,240,255,.75)',-.5+Math.sin(a*4)*.5);E(-s*.1,-s*.32,s*.45,s*.18,'rgba(200,230,255,.6)',-.9-Math.sin(a*4)*.5);
    E(-s*.05,0,s*.58,s*.32,'#8d3b1f');E(-s*.3,0,s*.07,s*.29,'#fdd835');E(-s*.05,0,s*.07,s*.31,'#fdd835');O(s*.5,0,s*.25,'#6d2c14');O(s*.6,-s*.1,s*.13,'#e53935');},
  hare(s,a){const hop=-Math.abs(Math.sin(a*1.4))*s*.35;ctx.translate(0,hop);
    legs(s,a*1.4,2,'#8d6e4a',.3,.8);E(0,0,s*.58,s*.36,'#b08d57');O(s*.42,-s*.25,s*.26,'#b08d57');
    E(s*.3,-s*.72,s*.08,s*.32,'#a07d47',-.25);E(s*.42,-s*.7,s*.08,s*.3,'#c4a06a',.1);O(-s*.58,-s*.08,s*.15,'#fff');O(s*.52,-s*.3,s*.05,'#111');O(s*.66,-s*.2,s*.04,'#e57373');},
  toad(s,a){const hop=-Math.max(0,Math.sin(a*1.1))*s*.25;ctx.translate(0,hop);
    E(-s*.35,s*.25,s*.32,s*.14,'#6d5a2b');E(s*.35,s*.25,s*.32,s*.14,'#6d5a2b');E(0,0,s*.62,s*.45,'#8a7a3a');
    for(let i=0;i<5;i++)O(-s*.35+i*s*.17,-s*.12+(i%2)*s*.15,s*.06,'#6d5a2b');E(s*.15,-s*.15,s*.25,s*.15,'#a39150');O(s*.38,-s*.32,s*.12,'#c9b26b');O(s*.4,-s*.33,s*.06,'#111');E(s*.48,s*.08,s*.18,s*.05,'#3e3517');},
  cocky(s,a){const w=Math.sin(a*1.6)*.6;ctx.save();ctx.rotate(-.4-w);E(-s*.35,-s*.1,s*.55,s*.2,'#f5f5f5');ctx.restore();
    E(0,0,s*.55,s*.4,'#f5f5f5');O(s*.45,-s*.25,s*.28,'#fafafa');poly([s*.35,-s*.45,s*.2,-s*.95,s*.5,-s*.5,s*.45,-s*1.0,s*.62,-s*.45],'#fdd835');
    poly([s*.68,-s*.28,s*.9,-s*.18,s*.66,-s*.08],'#424242');O(s*.52,-s*.3,s*.05,'#111');ctx.save();ctx.rotate(.3+w);E(-s*.25,s*.05,s*.5,s*.18,'#e0e0e0');ctx.restore();},
  crow(s,a){const w=Math.sin(a*1.8)*.7;ctx.save();ctx.rotate(-.4-w);E(-s*.35,-s*.1,s*.58,s*.2,'#212121');ctx.restore();
    E(0,0,s*.55,s*.36,'#111');poly([-s*.5,0,-s*.95,-s*.15,-s*.9,s*.15],'#111');O(s*.45,-s*.2,s*.26,'#1a1a1a');poly([s*.66,-s*.26,s*.98,-s*.16,s*.66,-s*.06],'#444');
    O(s*.52,-s*.26,s*.06,'#fff');O(s*.53,-s*.26,s*.03,'#111');ctx.save();ctx.rotate(.3+w);E(-s*.25,s*.05,s*.5,s*.17,'#2a2a2a');ctx.restore();
    O(s*.15,s*.35,s*.13,'#ffd54f');},
  bat(s,a){batShape(s,a,'#3e2723','#4e342e','#d1793a');},
  camp(s,a){ctx.save();ctx.translate(-s*.35,s*.15);ctx.scale(.6,.6);batShape(s,a+1,'#3e2723','#4e342e','#d1793a');ctx.restore();
    ctx.save();ctx.translate(s*.38,s*.2);ctx.scale(.6,.6);batShape(s,a+2,'#3e2723','#4e342e','#d1793a');ctx.restore();
    ctx.save();ctx.translate(0,-s*.18);ctx.scale(.75,.75);batShape(s,a,'#3e2723','#5d4037','#e08a45');ctx.restore();},
  beetle(s,a){for(let i=0;i<3;i++){const x=(i-1)*s*.35,o=Math.sin(a*3+i*2)*s*.1;line(x,0,x+o,-s*.62,'#111',s*.08);line(x,0,x-o,s*.62,'#111',s*.08);}
    O(s*.58,0,s*.2,'#111');line(s*.65,0,s*.95,-s*.15,'#222',s*.08);E(0,0,s*.62,s*.46,'#1f5f55');E(0,0,s*.62,s*.46,'rgba(0,0,0,0)');
    line(-s*.62,0,s*.55,0,'#0d3530',s*.05);E(-s*.1,-s*.2,s*.32,s*.1,'rgba(180,255,230,.45)');E(-s*.1,s*.22,s*.25,s*.07,'rgba(180,255,230,.25)');},
  goat(s,a,e){legs(s,a*(e&&e.ramT>0?2:1),4,'#5d5d5d',.42,.9);E(0,0,s*.66,s*.42,'#cfc6b8');E(-s*.1,-s*.15,s*.5,s*.2,'#bdb3a3');
    O(s*.62,-s*.25,s*.27,'#d8d0c3');E(s*.84,-s*.15,s*.14,s*.12,'#bdb3a3');ctx.strokeStyle=C('#6d5f4b');ctx.lineWidth=s*.11;ctx.beginPath();ctx.arc(s*.5,-s*.45,s*.24,3.6,6.4);ctx.stroke();
    poly([s*.7,s*.02,s*.76,s*.25,s*.82,s*.02],'#e8e0d0');O(s*.66,-s*.32,s*.05,'#111');poly([-s*.65,-s*.1,-s*.85,-s*.35,-s*.6,-s*.25],'#bdb3a3');},
  emu(s,a,e){const st=Math.sin(a*(e&&e.sprintT>0?2.2:1.2));line(-s*.05,s*.1,-s*.05+st*s*.3,s*.85,'#5d4a30',s*.1);line(s*.05,s*.1,s*.05-st*s*.3,s*.85,'#5d4a30',s*.1);
    E(-s*.1,0,s*.55,s*.42,'#5c4a3a');for(let i=0;i<6;i++)line(-s*.5+i*s*.15,-s*.15,-s*.6+i*s*.15,s*.3,'#463628',s*.06);
    line(s*.25,-s*.1,s*.45,-s*.75,'#3f6f8f',s*.16);O(s*.5,-s*.82,s*.17,'#2f3a40');poly([s*.62,-s*.86,s*.82,-s*.8,s*.62,-s*.74],'#222');O(s*.54,-s*.86,s*.04,'#ff8f00');},
  brumby(s,a){legs(s,a*1.6,4,'#4e342e',.55,1.1);E(0,0,s*.8,s*.42,'#8d5a3b');poly([s*.5,-s*.2,s*.7,-s*.7,s*.95,-s*.65,s*.95,-s*.45,s*.75,-s*.05],'#8d5a3b');
    E(s*.92,-s*.52,s*.18,s*.13,'#7a4b30');poly([s*.48,-s*.25,s*.62,-s*.82,s*.72,-s*.72,s*.6,-s*.2],'#2b1a10');poly([s*.7,-s*.72,s*.72,-s*.92,s*.8,-s*.74],'#7a4b30');
    poly([-s*.75,-s*.15,-s*1.05,s*.35,-s*.85,s*.4,-s*.7,0],'#2b1a10');O(s*.8,-s*.58,s*.05,'#111');},
  pig(s,a){pigShape(s,a,false);},
  boss(s,a){pigShape(s,a,true);},
  croc(s,a){const sw=Math.sin(a*.9)*.12;ctx.save();ctx.rotate(sw*.3);
    for(const sx of [-.45,.35]){const o=Math.sin(a+sx*5)*s*.1;E(s*sx+o,-s*.4,s*.14,s*.08,'#2e4d1f');E(s*sx-o,s*.4,s*.14,s*.08,'#2e4d1f');}
    poly([-s*.5,-s*.18,-s*1.25,Math.sin(a)*s*.2,-s*.5,s*.18],'#3c6626');E(-s*.05,0,s*.62,s*.32,'#3c6626');
    for(let i=0;i<5;i++)poly([-s*.45+i*s*.2,-s*.05,-s*.35+i*s*.2,-s*.2,-s*.25+i*s*.2,-s*.05],'#25421a');
    poly([s*.45,-s*.2,s*1.2,-s*.08,s*1.2,s*.08,s*.45,s*.2],'#4a7a30');for(let i=0;i<4;i++)poly([s*.6+i*s*.15,s*.08,s*.66+i*s*.15,s*.18,s*.72+i*s*.15,s*.08],'#fff');
    O(s*.6,-s*.17,s*.08,'#c6a700');O(s*.62,-s*.17,s*.035,'#111');ctx.restore();
    poly([-s*.1,-s*.4,-s*.03,-s*.62,s*.06,-s*.47,s*.15,-s*.65,s*.22,-s*.47,s*.3,-s*.62,s*.32,-s*.38],'#ffd54f');}
};
function drawEnemySprite(t,x,y,s,a,face,flash,e){ctx.save();ctx.translate(x,y);if(face<0&&t!=='bat'&&t!=='camp')ctx.scale(-1,1);FL=!!flash;SPR[t](s,a,e);FL=false;ctx.restore();}
// ---------- tower sprites ----------
function base(x,y,s,col,lv){
  E(x,y+s*.3,s*1.02,s*.62,'#6e4126');E(x,y+s*.16,s*.95,s*.56,'#a87445');
  ctx.save();ctx.beginPath();ctx.ellipse(x,y+s*.16,s*.95,s*.56,0,0,TAU);ctx.clip();ctx.strokeStyle='rgba(60,30,10,.4)';ctx.lineWidth=1.5;for(let i=-4;i<=4;i++){ctx.beginPath();ctx.moveTo(x-s,y+s*.16+i*s*.14);ctx.lineTo(x+s,y+s*.16+i*s*.14);ctx.stroke();}ctx.restore();
  ctx.strokeStyle=col;ctx.lineWidth=s*.12;ctx.beginPath();ctx.ellipse(x,y+s*.16,s*.88,s*.5,0,0,TAU);ctx.stroke();
  if(lv>=2){ctx.strokeStyle='#ffd54f';ctx.lineWidth=s*.05;ctx.beginPath();ctx.ellipse(x,y+s*.16,s*.74,s*.4,0,0,TAU);ctx.stroke();}}
function person(x,y,s,shirt,hat,bob){E(x,y+s*.15,s*.34,s*.32,shirt);O(x,y-s*.28+bob,s*.24,'#f1c27d');E(x,y-s*.42+bob,s*.46,s*.12,hat);E(x,y-s*.53+bob,s*.24,s*.17,hat);ctx.fillStyle=C('#3e2723');ctx.fillRect(x-s*.24,y-s*.48+bob,s*.48,s*.05);O(x-s*.08,y-s*.26+bob,s*.035,'#222');O(x+s*.08,y-s*.26+bob,s*.035,'#222');}
function dogSprite(x,y,s,a,run,face,big){ctx.save();ctx.translate(x,y);if(face<0)ctx.scale(-1,1);const k=big?1.15:1;ctx.scale(k,k);
  if(run)legs(s,a*2.2,4,'#c98b4f',.35,.8);else{line(-s*.25,s*.15,-s*.3,s*.45,'#c98b4f',s*.1);line(s*.25,s*.15,s*.3,s*.45,'#c98b4f',s*.1);}
  line(-s*.5,-s*.05,-s*.8,-s*.3+Math.sin(a*3)*s*.1,'#5f7480',s*.1);E(0,0,s*.55,s*.3,big?'#4a6a8c':'#6d8392');O(-s*.15,-s*.05,s*.07,'#3c4c58');O(s*.15,s*.05,s*.06,'#3c4c58');
  O(s*.5,-s*.22,s*.22,big?'#4a6a8c':'#6d8392');E(s*.66,-s*.15,s*.14,s*.09,'#c98b4f');poly([s*.38,-s*.35,s*.42,-s*.62,s*.52,-s*.38],'#3c4c58');poly([s*.52,-s*.36,s*.62,-s*.6,s*.64,-s*.32],'#3c4c58');
  O(s*.56,-s*.27,s*.04,'#111');O(s*.79,-s*.16,s*.05,'#111');ctx.restore();}
function drawTowerSprite(tw,x,y,s,icon){
  const d=TOWERS[tw.type],lv=tw.lv,br=tw.br,bob=tw.anim>0?-2:0;
  base(x,y,s,d.color,lv);
  switch(tw.type){
  case 'farmer':{const sh=lv>=2?(br?'#2e7d32':'#c62828'):'#1e88e5';E(x,y+s*.15,s*.34,s*.32,sh);
    if(!NOGUN){ctx.save();ctx.translate(x,y-s*.02);ctx.rotate(tw.ang);ctx.fillStyle=C('#37474f');const bl=(lv>=2&&br===1)?1.35:1;ctx.fillRect(s*.05,-s*.08,s*bl*(tw.anim>0?.85:1),s*.16);
      if(lv>=2&&br===0)ctx.fillRect(s*.05,s*.06,s*.9,s*.12);ctx.fillStyle=C('#795548');ctx.fillRect(-s*.15,-s*.1,s*.32,s*.2);
      if(tw.anim>.06){O(s*(bl+.15),0,s*.24,'#fff59d');O(s*(bl+.15),0,s*.13,'#fff');}ctx.restore();}
    person(x,y,s,sh,'#795548',bob);break;}
  case 'sprinkler':{if(!NOGUN){ctx.save();ctx.translate(x,y-s*.1);ctx.rotate(tw.spin||0);const n=lv>=2?4:3;
    for(let i=0;i<n;i++){ctx.rotate(TAU/n);line(0,0,s*.65,0,lv>=2&&br===1?'#b3e5fc':'#e1f5fe',s*.16);O(s*.68,0,s*.1,'#0288d1');}ctx.restore();}
    O(x,y-s*.1,s*.26,'#0277bd');O(x-s*.07,y-s*.17,s*.08,'rgba(255,255,255,.6)');if(lv>=2&&br===0){O(x,y-s*.1,s*.12,'#80d8ff');}break;}
  case 'scare':{line(x,y+s*.5,x,y-s*.6,'#5d4037',s*.14);line(x-s*.7,y-s*.15,x+s*.7,y-s*.15,'#5d4037',s*.14);
    ctx.fillStyle=C(lv>=2&&br===1?'#6a1b9a':'#c62828');ctx.fillRect(x-s*.32,y-s*.3,s*.64,s*.55);line(x-s*.32,y-s*.05,x+s*.32,y-s*.05,'#f9a825',s*.06);
    O(x,y-s*.6+bob,s*.27,'#ffe0b2');E(x,y-s*.78+bob,s*.5,s*.11,'#f9a825');E(x,y-s*.9+bob,s*.25,s*.18,'#f9a825');
    ctx.fillStyle=C('#000');ctx.fillRect(x-s*.12,y-s*.64+bob,s*.06,s*.06);ctx.fillRect(x+s*.06,y-s*.64+bob,s*.06,s*.06);
    if(lv>=2&&br===1){const k=Math.sin((tw.spin||0)*2)*s*.1;poly([x+s*.55,y-s*1.0+k,x+s*.9,y-s*.75+k,x+s*.55,y-s*.55+k,x+s*.3,y-s*.78+k],'#8d6e63');line(x+s*.55,y-s*.55+k,x+s*.2,y-s*.1,'#fff',1);}
    if(lv>=2&&br===0){ctx.strokeStyle=C('#fff8e1');ctx.lineWidth=1;for(let i=-2;i<=2;i++){line(x-s*.7,y-s*.15+i*s*.08,x+s*.7,y-s*.15+i*s*.08,'rgba(255,255,255,.5)',1);}}break;}
  case 'spray':{const wl='#212121';O(x-s*.45,y-s*.35,s*.18,wl);O(x+s*.45,y-s*.35,s*.18,wl);O(x-s*.45,y+s*.35,s*.18,wl);O(x+s*.45,y+s*.35,s*.18,wl);
    ctx.fillStyle=C(lv>=2&&br===1?'#558b2f':'#e53935');rr(ctx,x-s*.4,y-s*.45,s*.8,s*.9,s*.2);ctx.fill();O(x,y+s*.12,s*.28,'#fafafa');O(x-s*.08,y+s*.04,s*.08,'rgba(0,0,0,.15)');
    line(x-s*.3,y-s*.42,x+s*.3,y-s*.42,'#333',s*.1);person(x,y-s*.25,s*.7,'#ff8f00','#795548',bob);
    const bw=lv>=2&&br===0?1.05:.8;line(x-s*bw,y+s*.55,x+s*bw,y+s*.55,'#9e9e9e',s*.08);for(let i=-2;i<=2;i++)O(x+i*s*bw*.45,y+s*.6,s*.05,'#4fc3f7');break;}
  case 'dog':{ctx.fillStyle=C('#a1887f');ctx.fillRect(x-s*.55,y-s*.35,s*1.1,s*.75);poly([x-s*.7,y-s*.3,x,y-s*.85,x+s*.7,y-s*.3],lv>=2?'#c62828':'#6d4c41');
    ctx.fillStyle=C('#3e2723');ctx.beginPath();ctx.arc(x,y+s*.12,s*.24,Math.PI,0);ctx.lineTo(x+s*.24,y+s*.4);ctx.lineTo(x-s*.24,y+s*.4);ctx.fill();
    ctx.fillStyle=C('#fff');ctx.font='bold '+(s*.28|0)+'px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(lv>=2&&br===1?'BLUE':'DOG',x,y-s*.47);
    if(icon)dogSprite(x+s*.3,y+s*.35,s*.55,0,false,1,lv>=2&&br===1);break;}
  case 'cannon':{O(x,y,s*.5,'#455a64');O(x,y,s*.38,'#607d8b');if(!NOGUN){ctx.save();ctx.translate(x,y);ctx.rotate(tw.ang);const L=lv>=2&&br===1?1.05:.95,wd=lv>=2&&br===1?.32:.22;
    ctx.fillStyle=C('#0277bd');rr(ctx,0,-s*wd/2,s*L*(tw.anim>0?.8:1),s*wd,s*.06);ctx.fill();ctx.fillStyle=C('#b0bec5');ctx.fillRect(s*L*(tw.anim>0?.8:1)-s*.1,-s*wd/2-s*.04,s*.12,s*wd+s*.08);
    if(lv>=2&&br===0){ctx.fillStyle=C('#01579b');ctx.fillRect(0,s*.12,s*.8,s*.12);}ctx.restore();}O(x,y,s*.2,'#90a4ae');O(x-s*.05,y-s*.05,s*.07,'#fff');break;}
  case 'drone':{O(x,y+s*.1,s*.45,'#37474f');ctx.strokeStyle=C('#ffd54f');ctx.lineWidth=s*.08;ctx.beginPath();ctx.arc(x,y+s*.1,s*.32,0,TAU);ctx.stroke();ctx.fillStyle=C('#ffd54f');ctx.font='bold '+(s*.38|0)+'px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('H',x,y+s*.12);
    if(icon)droneSprite(x,y-s*.35,s*.8,tw.spin||0,lv>=2&&br===1);break;}
  case 'zapper':{line(x,y+s*.4,x,y-s*.3,'#9e9e9e',s*.14);poly([x-s*.75,y-s*.05,x+s*.55,y-s*.25,x+s*.75,y+s*.25,x-s*.55,y+s*.45],'#1a237e');
    ctx.strokeStyle=C('#5c6bc0');ctx.lineWidth=1;for(let i=1;i<4;i++){const t=i/4;ctx.beginPath();ctx.moveTo(x-s*.75+s*.2*t,y-s*.05+s*.5*t);ctx.lineTo(x+s*.55+s*.2*t,y-s*.25+s*.5*t);ctx.stroke();ctx.beginPath();ctx.moveTo(x-s*.75+s*1.3*t,y-s*.05-s*.2*t);ctx.lineTo(x-s*.55+s*1.3*t,y+s*.45-s*.2*t);ctx.stroke();}
    line(x,y-s*.3,x,y-s*.7,'#bdbdbd',s*.1);const hot=tw.heat||0,oc=lv>=2&&br===1?'#ff6d00':'#ffeb3b';O(x,y-s*.75,s*(.3+hot*.12),'rgba(255,235,59,.25)');O(x,y-s*.75,s*.2,oc);O(x,y-s*.75,s*.09,'#fff');break;}
  }
  if(!icon&&lv>=0&&!NOGUN){for(let i=0;i<=lv;i++){const px=x-s*.5+i*s*.5,py=y+s*.74;O(px,py,s*.15,'#5d4037');O(px,py,s*.11,i===2?(br?'#ce93d8':'#ff8a65'):'#ffd54f');}}
}
function droneSprite(x,y,s,spin,big){const k=big?1.2:1;ctx.save();ctx.translate(x,y);ctx.scale(k,k);
  for(const [dx,dy] of [[-1,-1],[1,-1],[-1,1],[1,1]]){line(0,0,dx*s*.42,dy*s*.3,'#263238',s*.08);ctx.save();ctx.translate(dx*s*.42,dy*s*.3);ctx.rotate(spin*20+dx);E(0,0,s*.26,s*.05,'rgba(220,220,220,.8)');ctx.restore();O(dx*s*.42,dy*s*.3,s*.05,'#111');}
  ctx.fillStyle=C(big?'#ef6c00':'#eceff1');rr(ctx,-s*.2,-s*.14,s*.4,s*.28,s*.08);ctx.fill();O(0,s*.02,s*.07,'#e53935');ctx.restore();}
function heroSprite(x,y,s,a,walk,face,ang,shoot){ctx.save();ctx.translate(x,y);
  const st=walk?Math.sin(a*3):0;line(-s*.12,s*.2,-s*.12+st*s*.15,s*.6,'#3e5a78',s*.16);line(s*.12,s*.2,s*.12-st*s*.15,s*.6,'#3e5a78',s*.16);
  E(-s*.12+st*s*.15,s*.62,s*.1,s*.06,'#4e342e');E(s*.12-st*s*.15,s*.62,s*.1,s*.06,'#4e342e');
  ctx.fillStyle=C('#2e7d32');rr(ctx,-s*.3,-s*.25,s*.6,s*.55,s*.15);ctx.fill();ctx.strokeStyle='#1b5e20';ctx.lineWidth=1;for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(i*s*.15,-s*.25);ctx.lineTo(i*s*.15,s*.3);ctx.stroke();}
  if(!NOGUN){ctx.save();ctx.rotate(ang);ctx.fillStyle='#3e2723';ctx.fillRect(0,-s*.05,s*.75,s*.1);ctx.fillStyle='#6d4c41';ctx.fillRect(-s*.1,-s*.07,s*.35,s*.14);if(shoot>0){O(s*.85,0,s*.14,'#fff59d');}ctx.restore();}
  O(0,-s*.45,s*.24,'#e8b48a');E(0,s*-.32,s*.17,s*.08,'#a1887f');E(0,-s*.6,s*.55,s*.13,'#6d4c41');E(0,-s*.72,s*.28,s*.2,'#795548');ctx.fillStyle='#3e2723';ctx.fillRect(-s*.28,-s*.66,s*.56,s*.06);
  O(-s*.08*face-.0,-s*.46,s*.035,'#222');O(s*.08,-s*.46,s*.035,'#222');ctx.restore();}
// ---------- terrain ----------
function uteSprite(x,y,s,face){ctx.save();ctx.translate(x,y);ctx.scale(face,1);ctx.fillStyle='#fafafa';rr(ctx,-s,-s*.2,s*2,s*.5,s*.1);ctx.fill();ctx.fillStyle='#e0e0e0';rr(ctx,-s*.1,-s*.55,s*.75,s*.4,s*.12);ctx.fill();ctx.fillStyle='#4fc3f7';ctx.fillRect(s*.05,-s*.48,s*.5,s*.25);  ctx.fillStyle='#c62828';ctx.fillRect(-s,-s*.05,s*2,s*.08);ctx.fillStyle='#424242';ctx.fillRect(s*.85,-s*.05,s*.2,s*.25);O(-s*.6,s*.32,s*.24,'#212121');O(s*.6,s*.32,s*.24,'#212121');O(-s*.6,s*.32,s*.1,'#9e9e9e');O(s*.6,s*.32,s*.1,'#9e9e9e');O(s*.95,-s*.05,s*.07,'#fff59d');ctx.restore();}
