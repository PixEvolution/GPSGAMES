// ============================================================
// THE STREETS — ai.js
// AUTO MODE brain: spectator lockdown, objective list, task
// executors, AI movement/pace, watchdog. Safe to edit without
// touching the engine. Loaded last.
//
// ENGINE CONTRACT (globals this file drives at runtime):
//   playerPos,setPlayerPos,gt,toast,stars,lkp,money,inv,ammo,
//   equipped,onDrugs,stash,DRUGS,drugById,dOrigin,sellPrice,
//   houses,garage,bizzes,bizSale,BIZ_PATHS,jobs,nearestJob,
//   channel,missionBoost,cargo,places,territory,cellKey,cellDist,
//   CELL,territoryAt,npcs,cops,shops,mission,curStep,startMission,
//   offeredMission,resolveLoc,placing,placementTap,
//   placementConfirm,buySafehouseHere,sellCooled,toggleFollow,
//   followerCount,roadG,roadRoute,nearestRoadNode,destOnRoad,
//   roadSpot,routeAnchor,ensureRoads,currentWeapon,weaponById,
//   AMMO_TYPES,GUNSTORE_STOCK,drawn,$,AUTO_SESSION,metaSet,
//   saveMoney,renderMoney,showGain,addXp,saveDrugs,saveInv,
//   saveAmmo,renderInvBtn,refreshGunstore,saveBiz,drawBiz,bizIcon,
//   bizSeq,map,haversine,offsetPoint,bearingBetween,applyHeat,
//   snitchFactor,fmtMoney,payMult,NPC_TRADE_RANGE,NPC_ROB_RANGE,
//   BIZ_RANGE,housePrice,totalCapacity,saveCargo,renderCargo,
//   removeDestMarker,addDestMarker,attachNpc? (no—spawns are engine)
// ============================================================

// ---------- AUTO MODE: the game plays itself, you watch ----------
// spectator lockdown: capture-phase interceptor kills every control the AI owns.
// You keep: cutscene taps, speed presets, log, freecam, the exit badge, and menus.
let lastSpectToast = 0;
function spectAllowed(t){
  return t.closest && (
       t.closest("#cine") || t.closest("#speeds") || t.closest("#logPanel")
    || t.closest("#splash") || t.closest("#nameOv") || t.closest("#gangPanel")
    || t.closest("#safety") || t.closest("#busted")
    || t.id === "logBtn" || t.id === "camBtn" || t.id === "autoBadge");
}
function spectBlock(e){
  e.stopPropagation();
  e.preventDefault();
  if (gt() - lastSpectToast > 5000){
    lastSpectToast = gt();
    toast("🤖 Auto's driving. You've got cutscenes, 📜 and 🎥.");
  }
}
// clicks: block everything not allowlisted — but the AI's synthetic clicks pass
document.addEventListener("click", e => {
  if (!autoOn || !started || !e.isTrusted) return;
  if (spectAllowed(e.target)) return;
  spectBlock(e);
}, true);
// touch/pointer: kill buttons, popups, and the D-pad — but leave the map draggable for freecam
for (const ev of ["pointerdown", "touchstart", "mousedown"]){
  document.addEventListener(ev, e => {
    if (!autoOn || !started || !e.isTrusted) return;
    const t = e.target;
    if (spectAllowed(t)) return;
    if (t.closest && (t.closest("#dpad") || t.closest("button")
        || t.closest(".leaflet-popup") || t.closest("input"))) spectBlock(e);
  }, true);
}
let autoOn = false, aiDest = null, aiWait = 0, aiNextWep = 0;

function setAuto(on){
  autoOn = on;
  $("autoBadge").style.display = on ? "block" : "none";
}
function aiSay(t){ $("autoBadge").textContent = "🤖 " + t; }

let autoOffArm = 0;
$("autoBadge").addEventListener("click", () => {
  if (gt() - autoOffArm > 3000){
    autoOffArm = gt();
    aiSay("tap again to exit — your real save is waiting");
    return;
  }
  metaSet("meta_auto", null);
  location.reload(); // back to the real world, real save untouched
});

// home-screen toggle: flips into (or out of) the sandbox namespace and reboots
$("autoHome").addEventListener("click", () => {
  metaSet("meta_auto", AUTO_SESSION ? null : "1");
  location.reload();
});


let aiRoute = null, aiRouteCd = 0;
let aiPace = {road: 20, off: 3, at: 0};
function rollAiPace(){
  aiPace = {road:(1 + Math.random()*99)*0.447, off:(1 + Math.random()*9)*0.447,
    at: gt() + (1 + Math.random()*99)*1000};
}
function aiMoveToward(dest, stopAt){
  const d = haversine(playerPos, dest);
  if (d < (stopAt || 8)){ aiDest = null; aiRoute = null; return; }
  ensureRoads();
  if (gt() >= aiPace.at) rollAiPace();
  let wp = dest, onRoad = false, routeDone = false, noRoute = false;
  if (roadG && d > 60){
    const key = Math.round(dest.lat * 1e4) + "," + Math.round(dest.lng * 1e4);
    if ((!aiRoute || aiRoute.key !== key) && (!aiRoute || gt() >= aiRouteCd)){
      const pts = roadRoute(playerPos, dest);
      if (pts !== undefined){
        aiRoute = {key, pts, i: pts ? routeAnchor(playerPos, pts) : 0};
        aiRouteCd = gt() + 2500;
      }
    }
    if (aiRoute.pts){
      while (aiRoute.i < aiRoute.pts.length
        && haversine(playerPos, aiRoute.pts[aiRoute.i]) < 12) aiRoute.i++;
      if (aiRoute.i < aiRoute.pts.length){ wp = aiRoute.pts[aiRoute.i]; onRoad = true; }
      else routeDone = true;
    } else noRoute = true;
  }
  if (!onRoad){
    if (noRoute){
      // stranded off the network: trudge to the nearest pavement FIRST, then route
      const nid = nearestRoadNode(playerPos, 700);
      if (nid){
        const rn = roadG.nodes.get(nid);
        if (haversine(playerPos, rn) < 15) aiRoute = null; // reached it — reroute
        else wp = rn;
      }
    } else if ((routeDone || d <= 60) && destOnRoad(dest)){
      onRoad = true; // curbside finish — the ONLY drive-up case
    }
  }
  if (!roadG) onRoad = true; // no map data: benefit of the doubt
  const spd = onRoad ? aiPace.road : Math.min(aiPace.off, aiPace.road);
  const step = Math.min(spd * 0.4, haversine(playerPos, wp));
  setPlayerPos(offsetPoint(playerPos.lat, playerPos.lng, step, bearingBetween(playerPos, wp)));
}
let aiFlee = null;
function aiFleeHeat(){
  const from = lkp || playerPos;
  aiSay("shaking the heat (" + stars + "★)");
  // the task SURVIVES the chase — lose the cops, get back to business
  // ONE escape point, driven all the way — pick the next only on arrival
  if (!aiFlee || haversine(playerPos, aiFlee.at) < 40){
    aiFlee = {at: roadSpot(offsetPoint(playerPos.lat, playerPos.lng, 700,
      bearingBetween(from, playerPos) + (Math.random() - 0.5) * 0.5), 0, 220)};
  }
  aiMoveToward(aiFlee.at, 6);
}

// ===== the full life: shops, product, property =====
function aiBestGun(){ return inv.ak47 ? "ak47" : inv.ar15 ? "ar15" : inv.mp5 ? "mp5"
  : inv.m500 ? "m500" : inv.g19 ? "g19" : inv.snub ? "snub" : null; }
function aiNeedsIron(){
  const g = aiBestGun();
  if (!g) return money > 900;
  return (ammo[weaponById(g).cal] || 0) < 12 && money > 400;
}
function aiSetDrawn(want){
  if (drawn !== want) $("fightBtn").click();
}
function nearestEnemyCell(){
  let best = null, bd = Infinity;
  for (const k of Object.keys(territory)){
    if (territory[k] === myGang) continue;
    const d = cellDist(k);
    if (d < bd && d < 900){ bd = d; best = k; }
  }
  if (!best) return null;
  const [a, b] = best.split("_").map(Number);
  return {lat: (a + 0.5) * CELL, lng: (b + 0.5) * CELL};
}

setInterval(() => {
  if (!autoOn || !started || cineOpen || logOpen || document.visibilityState !== "visible" || !playerPos) return;
  if (aiWait > 0){ aiWait--; return; }

  // placement: pick a sane spot and lock it
  if (placing){
    if (!placing.pend){
      aiSay("picking a spot: " + placing.label);
      if (placing.enemyTurf){
        // hunt for a rival-colored block far enough out
        const cells = Object.keys(territory).filter(k =>
          territory[k] !== null && territory[k] !== myGang);
        const fits = cells.filter(k => cellDist(k) >= placing.minDist && cellDist(k) < placing.minDist + 2500);
        const pick = (fits.length ? fits : cells)[Math.floor(Math.random() * Math.max(1, (fits.length ? fits : cells).length))];
        if (pick){
          const [a, b] = pick.split("_").map(Number);
          placementTap(roadSpot({lat:(a+0.5)*CELL, lng:(b+0.5)*CELL}, 0, 60));
        }
        // no rival turf on the map yet: wait — ambient growth will paint some
      } else {
        placementTap(roadSpot(playerPos, placing.minDist + 120, placing.minDist + 420));
      }
      aiWait = 3; // a beat, so you can see the pin
    } else placementConfirm();
    return;
  }

  // WANTED and not on a mission: drop whatever you're doing and RUN.
  // (fleeing moves you out of the job radius, which cancels the channel itself)
  if (stars > 0 && !curStep()){ aiFleeHeat(); return; }
  // mid-heist wiring or job channel: hold still
  if (missionBoost){ aiSay("hotwiring…"); return; }
  if (typeof channel !== "undefined" && channel){ aiSay("working the job…"); return; }

  // mood-based loadout: a random owned weapon (or fists) every 1–100s
  if (gt() >= aiNextWep){
    aiNextWep = gt() + (1 + Math.random() * 99) * 1000;
    const pool = Object.keys(inv).filter(id => inv[id] > 0);
    pool.push(""); // bare knuckles are always on the menu
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (equipped !== pick){
      equipped = pick;
      store.setItem("sc_equipped", pick);
      renderInvBtn();
    }
  }
  // fights: iron out when trouble's close
  const trouble = cops.length > 0
    || npcs.some(n => (n.kind === "gang" && n.aggro && n.gang !== myGang)
      || (n.kind === "target" && n.aggro && !n.van && haversine(n, playerPos) < 80));
  // wanted? holster and RUN — shooting back is how chases become funerals
  aiSetDrawn(stars > 0 ? false : trouble);

  // free-roam firefight: CLOSE THE DISTANCE — no more statue routine
  const sNow = curStep();
  if (!sNow && trouble && stars === 0){
    let h = null, hd = Infinity;
    for (const n of npcs){
      const hostile = (n.kind === "gang" && n.aggro && n.gang !== myGang)
        || (n.kind === "target" && n.aggro && !n.van);
      if (!hostile) continue;
      const d = haversine(playerPos, n);
      if (d < hd && d < 120){ hd = d; h = n; } // fights are local, not manhunts
    }
    // taking a block? DO NOT get baited off it — defenders come to you
    if (h && aiTask && aiTask.kind === "turf"
      && cellKey(h.lat, h.lng) !== cellKey(aiTask.at.lat, aiTask.at.lng)){
      h = null;
    }
    if (h && hd > Math.max(2, currentWeapon().range * 0.7)){
      aiSay("closing on the fight");
      aiMoveToward({lat:h.lat, lng:h.lng}, Math.max(2, currentWeapon().range * 0.7));
      return;
    }
    if (h) return; // in range — let the trigger work
  }

  const s = curStep();
  if (s){
    if (s.type === "claimHouse"){
      aiSay("claiming a safehouse");
      if (houses.length === 0) buySafehouseHere();
      return;
    }
    if (s.type === "goto"){
      if (s.needClean && stars > 0){ aiFleeHeat(); return; }
      aiSay("driving: " + (s.banner || "objective"));
      aiMoveToward(resolveLoc(s.at || "t"));
      return;
    }
    if (s.type === "gotoAll"){
      const st = s.stops.find(x => mission.ts[x.slot]);
      if (st){ aiSay("picking up " + st.name); aiMoveToward(mission.ts[st.slot]); }
      return;
    }
    if (s.type === "boost"){ aiSay("heading to the car"); aiMoveToward(resolveLoc("t")); return; }
    if (s.type === "kill" || s.type === "hunt" || s.type === "ram"){
      const tgt = npcs.find(n => n.kind === "target");
      if (!tgt){ aiSay("closing on the mark"); aiMoveToward(resolveLoc("t")); }
      else {
        aiSay(s.type === "ram" ? "ramming the van" : "on " + (tgt.label || "the target"));
        // get INSIDE weapon range: fists mean nose-to-nose, a rifle means standoff
        const reach = s.type === "ram" ? 4 : Math.max(2, currentWeapon().range * 0.7);
        aiMoveToward({lat: tgt.lat, lng: tgt.lng}, reach);
      }
      return;
    }
    return; // cine/pay/give resolve themselves
  }

  aiFlee = null; // clean again — next flee picks fresh
  // carrying a package? deliver it NOW — simple, like the man said
  if ((!aiTask || aiTask.kind !== "deliver") && cargo && cargo.kind === "package" && cargo.dest)
    aiTask = {kind:"deliver", at: cargo.dest, say: "running delivery #" + (cargo.n || "")};
  if (!aiTask) aiTask = aiPickTask();
  if (aiTask) aiRunTask();

  // WATCHDOG: 12s of stillness on a task that should be moving = something's
  // wedged. Drop it and re-think. (Posting up / holding a block are legit stillness.)
  if (aiTask && aiTask.kind !== "hang" && aiTask.kind !== "turf"){
    if (!aiStuck || haversine(playerPos, aiStuck.at) > 5){
      aiStuck = {at:{lat:playerPos.lat, lng:playerPos.lng}, since: gt()};
    } else if (gt() - aiStuck.since > 12000){
      aiTask = null; aiRoute = null; aiStuck = null;
      aiSay("re-thinking…");
    }
  } else aiStuck = null;
}, 400);
let aiStuck = null;
