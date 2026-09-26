(() => {
"use strict";

const SAVE_KEY = "dawn_of_apra_save_v01";

const INITIAL = {
  date:"1985-07-28",
  end:"1992-12-31",
  inflation:38,
  economy:58,
  popularity:72,
  military:54,
  business:48,
  democracy:78,
  security:42,
  apra:76,
  reserves:55,
  fiscal:45,
  blackMarket:25,
  civilianTrust:65,
  days:0,
  currentEvent:null,
  used:[],
  log:[]
};

let state = structuredClone(INITIAL);

const $ = id => document.getElementById(id);
const clamp = (n,min=0,max=100) => Math.max(min, Math.min(max,n));
const dateObj = s => {
  const [y,m,d] = s.split("-").map(Number);
  return new Date(Date.UTC(y,m-1,d));
};
const iso = d => d.toISOString().slice(0,10);
const formatDate = s => dateObj(s).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"});

function daysBetween(a,b){ return Math.floor((dateObj(b)-dateObj(a))/86400000); }

function applyEffects(effects){
  for(const [key,value] of Object.entries(effects)){
    if(typeof state[key] === "number") state[key] = clamp(state[key] + value);
  }
}

function describeEffects(e){
  return Object.entries(e).map(([k,v]) => {
    const names = {
      inflation:"Inflation", economy:"Economy", popularity:"Popularity",
      military:"Military trust", business:"Business confidence",
      democracy:"Democratic stability", security:"Security",
      apra:"APRA unity", reserves:"Reserves", fiscal:"Fiscal pressure",
      blackMarket:"Black market", civilianTrust:"Civilian trust"
    };
    const n = names[k] || k;
    return `${n} ${v > 0 ? "+" : ""}${v}`;
  }).join(" · ");
}

function eventAvailable(ev){
  const d = dateObj(state.date);
  return d >= dateObj(ev.from) && d <= dateObj(ev.to) && !state.used.includes(ev.id);
}

function chooseEvent(){
  let candidates = APRA_EVENTS.filter(eventAvailable);
  if(!candidates.length) return null;

  // Prefer events whose window is close to the current date.
  candidates.sort((a,b)=>Math.abs(dateObj(a.from)-dateObj(state.date))-Math.abs(dateObj(b.from)-dateObj(state.date)));
  return candidates[0];
}

function advanceTime(){
  // A decision represents roughly 30 days of political time.
  const d = dateObj(state.date);
  d.setUTCDate(d.getUTCDate()+30);
  state.date = iso(d);
  state.days += 30;

  // Background simulation.
  state.inflation = clamp(state.inflation + (state.fiscal-50)/35 + (state.blackMarket-40)/70);
  state.economy = clamp(state.economy - (state.inflation-45)/80 + (state.business-50)/90);
  state.blackMarket = clamp(state.blackMarket + (state.inflation-45)/45);
  state.reserves = clamp(state.reserves - (state.fiscal-50)/70 - (state.inflation-45)/100);
  state.security = clamp(state.security + (state.military-55)/180 - (state.blackMarket-40)/300);
  state.civilianTrust = clamp(state.civilianTrust + (state.democracy-60)/250 - (state.security-60)/350);
}

function checkOutcome(){
  if(state.democracy <= 0) return ["The Institutional Rupture","Democratic stability has collapsed. The simulation ends in an authoritarian branch.", "failure"];
  if(state.economy <= 0 || state.inflation >= 100) return ["Economic Collapse","The government's economic system has reached a terminal crisis.", "failure"];
  if(state.military <= 5) return ["Military Breakdown","Civil-military relations have deteriorated beyond the government's ability to manage them.", "failure"];
  if(state.security <= 0) return ["State Security Crisis","The state can no longer sustain effective security operations.", "failure"];
  if(dateObj(state.date) >= dateObj("1992-12-31")) return ["1992: The End of the Opening","The seven-year simulation has reached its endpoint. Your final state determines the next chapter.", "success"];
  return null;
}

function renderStats(){
  const stats = [
    ["inflation","Inflation",true],["economy","Economic capacity"],["popularity","Presidential popularity"],
    ["military","Military confidence"],["business","Business confidence"],["democracy","Democratic stability"],
    ["security","Security capacity"],["apra","APRA unity"],["reserves","Foreign reserves"],
    ["fiscal","Fiscal pressure",true],["blackMarket","Black market",true],["civilianTrust","Civilian trust"]
  ];
  $("stats").innerHTML = stats.map(([key,label,inverse])=>{
    const v=Math.round(state[key]);
    const fillClass = inverse ? (v>70?"bad":v>45?"warn":"good") : (v<25?"bad":v<45?"warn":"good");
    return `<div class="stat"><div class="stat-top"><span>${label}</span><b>${v}</b></div><div class="bar"><div class="fill ${fillClass}" style="width:${v}%"></div></div></div>`;
  }).join("");
}

function renderFactions(){
  const f = [
    ["APRA organization",state.apra],
    ["Armed forces",state.military],
    ["Business sector",state.business],
    ["Civilian trust",state.civilianTrust]
  ];
  $("factions").innerHTML=f.map(([n,v])=>`<div class="faction"><div class="faction-name"><span>${n}</span><b>${Math.round(v)}</b></div><div class="bar"><div class="fill normal" style="width:${clamp(v)}%"></div></div></div>`).join("");
}

function renderBriefing(){
  let text = "Cabinet is monitoring the economy, party cohesion, security, and institutional stability.";
  if(state.inflation>70) text="Inflation is becoming the central threat. Cabinet must decide how much political pain to accept for stabilization.";
  else if(state.security<30) text="Security conditions are deteriorating. Military and civilian authorities disagree over the appropriate response.";
  else if(state.democracy<45) text="Institutional safeguards are weakening. Further concentration of authority could trigger a major political crisis.";
  else if(state.apra<35) text="APRA's coalition is fracturing. Party discipline is no longer guaranteed.";
  else if(state.business<30) text="Business confidence is very low. Investment and access to resources are under pressure.";
  $("briefing").textContent=text;
}

function renderLog(){
  $("log").innerHTML = state.log.length
    ? state.log.slice().reverse().slice(0,8).map(x=>`<div class="log-item"><span class="log-date">${formatDate(x.date)}</span>${x.text}</div>`).join("")
    : `<div class="muted">No decisions recorded yet.</div>`;
}

function renderEvent(){
  const card=$("eventCard");
  if(state.currentEvent){
    const ev=state.currentEvent;
    card.innerHTML=`
      <div class="event-kicker">${ev.kicker}</div>
      <div class="event-date">${formatDate(state.date)}</div>
      <h2>${ev.title}</h2>
      <p class="event-text">${ev.text}</p>
      <div class="choices">
        ${ev.choices.map((c,i)=>`<button class="choice" data-choice="${i}">
          <strong>${String.fromCharCode(65+i)} — ${c.label}</strong>
          <small>${c.detail}<br><br>${describeEffects(c.effects)}</small>
        </button>`).join("")}
      </div>`;
    card.querySelectorAll("[data-choice]").forEach(btn=>btn.addEventListener("click",()=>makeChoice(Number(btn.dataset.choice))));
  } else {
    card.innerHTML=`<div class="ending"><div class="event-kicker">CABINET OFFICE</div><h2>No active event</h2><p class="event-text">The government is awaiting the next dispatch.</p></div>`;
  }
}

function render(){
  $("date").textContent=formatDate(state.date);
  $("days").textContent=`Day ${state.days.toLocaleString()} of the simulation`;
  renderStats(); renderFactions(); renderBriefing(); renderLog(); renderEvent();
}

function nextEvent(){
  const ev=chooseEvent();
  state.currentEvent=ev;
  if(!ev){
    const outcome=checkOutcome();
    if(outcome) showEnding(outcome);
  }
  render();
}

function makeChoice(index){
  const ev=state.currentEvent;
  if(!ev || !ev.choices[index]) return;
  const choice=ev.choices[index];
  applyEffects(choice.effects);
  state.used.push(ev.id);
  state.log.push({date:state.date,text:`${ev.title}: ${choice.label}. ${describeEffects(choice.effects)}.`});
  state.currentEvent=null;
  advanceTime();

  const outcome=checkOutcome();
  if(outcome) showEnding(outcome);
  else {
    nextEvent();
    flash(`Decision recorded: ${choice.label}`);
  }
  save(false);
  render();
}

function showEnding(outcome){
  const [title,body,type]=outcome;
  state.currentEvent=null;
  $("eventCard").innerHTML=`<div class="ending"><div class="event-kicker">${type==="success"?"SIMULATION COMPLETE":"GOVERNMENT CRISIS"}</div><h2>${title}</h2><p class="event-text">${body}</p><p class="muted">Final indicators remain visible at left. Start a new game to explore another path.</p></div>`;
  $("alert").className="alert show";
  $("alert").textContent=type==="success"?"The Dawn of APRA has reached its 1992 endpoint.":"The simulation has reached a terminal crisis.";
}

function flash(message){
  $("alert").className="alert show";
  $("alert").textContent=message;
  setTimeout(()=>{$("alert").className="alert"; $("alert").textContent="";},3500);
}

function save(show=true){
  try {
    localStorage.setItem(SAVE_KEY,JSON.stringify(state));
    if(show) flash("Game saved in this browser.");
  } catch(e) { flash("Save unavailable in this browser."); }
}

function load(){
  try {
    const raw=localStorage.getItem(SAVE_KEY);
    if(!raw){ flash("No save found."); return; }
    const parsed=JSON.parse(raw);
    state=Object.assign(structuredClone(INITIAL),parsed);
    render();
    flash("Saved game loaded.");
  } catch(e){ flash("Save could not be loaded."); }
}

function newGame(){
  if(!confirm("Start a new Dawn of APRA campaign?")) return;
  state=structuredClone(INITIAL);
  nextEvent();
  render();
}

$("saveBtn").addEventListener("click",()=>save());
$("loadBtn").addEventListener("click",load);
$("newBtn").addEventListener("click",newGame);

nextEvent();
render();
})();