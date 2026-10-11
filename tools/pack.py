import json,glob,os
from PIL import Image
OUT='/workspace/orchard-defence/assets/'
meta=json.load(open('out/meta.json'))
items=[]
for k,s in meta.items():
    im=Image.open('out/s_%s.png'%k).convert('RGBA')
    W,H=im.size;bb=im.getbbox()
    sc=1.0
    if k.startswith('e_') and W==128: sc=.8
    if k.startswith('e_') and W==256: sc=.75
    if k.startswith('i_'): sc=.5   # UI icons
    if k=='hero_icon': sc=.6
    c=im.crop(bb)
    if sc!=1.0: c=c.resize((max(1,round(c.width*sc)),max(1,round(c.height*sc))),Image.LANCZOS)
    ax=(W/2-bb[0])*sc; ay=(H/2-bb[1])*sc
    items.append([k,c,ax,ay,s*sc])
items.sort(key=lambda t:-t[1].height)
AW=1024;x=y=rowh=0;pos={}
for k,c,ax,ay,s in items:
    if x+c.width+2>AW: x=0;y+=rowh+2;rowh=0
    pos[k]=(x,y);x+=c.width+2;rowh=max(rowh,c.height)
AH=y+rowh
atlas=Image.new('RGBA',(AW,AH),(0,0,0,0));frames={}
for k,c,ax,ay,s in items:
    px,py=pos[k];atlas.paste(c,(px,py));frames[k]=[px,py,c.width,c.height,round(ax,1),round(ay,1),round(s,2)]
atlas.save(OUT+'atlas.webp','WEBP',quality=88,method=6)
json.dump(frames,open('frames.json','w'),separators=(',',':'))
for i in range(3):
    Image.open('out/map%d.png'%i).convert('RGB').save(OUT+'map%d.webp'%i,'WEBP',quality=80,method=6)
Image.open('out/title.png').convert('RGB').save(OUT+'title.webp','WEBP',quality=82,method=6)
for n in ['wood','board','iron']:
    Image.open('out/%s.png'%n).convert('RGB').save(OUT+n+'.webp','WEBP',quality=80,method=6)
for s in [192,512]:
    Image.open('out/icon%d.png'%s).convert('RGB').quantize(128).save('/workspace/orchard-defence/icon-%d.png'%s,optimize=True)
print('atlas',AW,AH,len(frames))
tot=0
for f in sorted(glob.glob(OUT+'*'))+['/workspace/orchard-defence/icon-192.png','/workspace/orchard-defence/icon-512.png']:
    sz=os.path.getsize(f);tot+=sz;print(os.path.basename(f),sz//1024,'KB')
print('total',tot//1024,'KB')
