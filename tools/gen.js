const p=require('puppeteer-core'),fs=require('fs');const OUT='/workspace/tdtest/art/out/';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await p.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});const pg=await b.newPage();await pg.setCacheEnabled(false);const errs=[];pg.on('pageerror',e=>errs.push(e.message));pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await pg.goto('file:///workspace/tdtest/art/gen.html');await new Promise(r=>setTimeout(r,300));
const save=(n,u)=>fs.writeFileSync(OUT+n+'.png',Buffer.from(u.split(',')[1],'base64'));
const what=process.argv[2]||'all';
if(what==='all'||what==='sprites'){const sp=await pg.evaluate(()=>{const o=buildSprites(),r={};for(const k in o)r[k]={u:o[k].c.toDataURL(),s:o[k].s};return r;});const meta={};for(const k in sp){save('s_'+k,sp[k].u);meta[k]=sp[k].s;}fs.writeFileSync(OUT+'meta.json',JSON.stringify(meta));console.log('sprites',Object.keys(sp).length);}
if(what==='all'||what==='terrain'){for(let i=0;i<3;i++){const u=await pg.evaluate(i=>terrain(i).toDataURL(),i);save('map'+i,u);}console.log('terrain ok');}
if(what==='all'||what==='misc'){save('title',await pg.evaluate(()=>titleArt().toDataURL()));save('icon512',await pg.evaluate(()=>iconArt(512).toDataURL()));save('icon192',await pg.evaluate(()=>iconArt(192).toDataURL()));
  save('wood',await pg.evaluate(()=>woodTex(256,128,'#6b4527',3).toDataURL()));save('board',await pg.evaluate(()=>woodTex(256,256,'#c9a06a',8).toDataURL()));save('iron',await pg.evaluate(()=>ironTex(256,96).toDataURL()));console.log('misc ok');}
console.log('errors',errs);await b.close();})();
