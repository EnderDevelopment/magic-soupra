const canvas = document.getElementById('vfx-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let currentPower = 'fire';
const powers = {
  fire: { title:'Fire · Ember', description:'A volatile force born from the first spark. Strike with overwhelming heat and leave only glowing cinders behind.', control:'84%', intensity:'69%', colors:['#ff512f','#ffad42','#fff1b0'] },
  water: { title:'Water · Tide', description:'The patient force of oceans and rain. Bend every current, heal every fracture, and become impossible to hold.', control:'91%', intensity:'63%', colors:['#168cff','#55d8ff','#d5f9ff'] },
  wind: { title:'Wind · Gale', description:'A breath with no boundary. Move unseen, carve through stone, and turn the sky into your weapon.', control:'78%', intensity:'74%', colors:['#65d9bd','#b8fff0','#e9fff8'] },
  spirit: { title:'Spirit · Aura', description:'The resonance of everything living. Read the unseen and let your presence illuminate the darkness within.', control:'88%', intensity:'58%', colors:['#a465ff','#e4b9ff','#fff0ff'] },
  steam: { title:'Steam · Mist', description:'Pressure made visible. Conceal your movement in a scalding veil and release power in a sudden burst.', control:'71%', intensity:'82%', colors:['#b8c4d5','#f4f7ff','#ffffff'] },
  shadow: { title:'Shadow · Void', description:'The silence between heartbeats. Erase your presence, fold distance, and make fear your sharpest edge.', control:'94%', intensity:'76%', colors:['#6541d8','#b29cff','#e0d8ff'] },
  stone: { title:'Stone · Core', description:'The memory of the earth. Stand unshaken, raise ancient walls, and answer every blow with gravity.', control:'89%', intensity:'86%', colors:['#a96c36','#e1ae72','#ffe5b9'] },
  cosmos: { title:'Cosmos · Star', description:'A fragment of infinity in your hands. Pull starlight from the void and rewrite the shape of possibility.', control:'62%', intensity:'98%', colors:['#d34d9e','#ffb2df','#fff0fa'] }
};
function resize(){ canvas.width=innerWidth*devicePixelRatio; canvas.height=innerHeight*devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); }
function spawn(x=innerWidth/2,y=innerHeight*.63){ const p=powers[currentPower]; for(let i=0;i<4;i++) particles.push({x:x+(Math.random()-.5)*35,y:y+(Math.random()-.5)*15,vx:(Math.random()-.5)*1.8,vy:-Math.random()*2.5-.3,size:Math.random()*3+1,life:1,color:p.colors[Math.floor(Math.random()*p.colors.length)]}); }
function animate(){ ctx.clearRect(0,0,innerWidth,innerHeight); if(Math.random()<.7) spawn(); particles=particles.filter(p=>p.life>0); particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.015;p.life-=.012;ctx.globalAlpha=p.life*.65;ctx.fillStyle=p.color;ctx.shadowBlur=12;ctx.shadowColor=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size*p.life,0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;requestAnimationFrame(animate); }
function selectPower(card){ document.querySelectorAll('.power-card').forEach(c=>c.classList.remove('active'));card.classList.add('active');currentPower=card.dataset.power;const power=powers[currentPower];document.getElementById('power-title').innerHTML=power.title.replace(' · ',' <span>·</span> ');document.getElementById('power-description').textContent=power.description;document.getElementById('control-bar').style.width=power.control;document.getElementById('intensity-bar').style.width=power.intensity;document.querySelector('.selection-panel').style.setProperty('--accent',getComputedStyle(card).getPropertyValue('--accent')); for(let i=0;i<22;i++)spawn(innerWidth/2,innerHeight*.63);}
document.querySelectorAll('.power-card').forEach(card=>card.addEventListener('click',()=>selectPower(card)));
document.getElementById('awaken-button').addEventListener('click',()=>{for(let i=0;i<100;i++)spawn(innerWidth/2,innerHeight*.64);const toast=document.getElementById('toast');toast.textContent=`${powers[currentPower].title.split(' · ')[0]} awakened`;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800);});
addEventListener('resize',resize);resize();animate();
for(let i=0;i<80;i++)spawn(Math.random()*innerWidth,Math.random()*innerHeight);
function handlePointer(e){if(e.target.closest('button'))return;spawn(e.clientX,e.clientY);}
addEventListener('pointermove',handlePointer);
