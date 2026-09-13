// ============================================================
// THE STREETS — missions.js
// ALL story content: intro chapters, mission cutscene pages, and
// the MISSIONS data table. Safe to edit without touching the
// engine. Loaded after the engine script in index.html.
//
// ENGINE CONTRACT (usable at runtime from pages/steps):
//   sp(html), pname, GANGS, fmtMoney()
//   Step verbs: cine{pages} | place{key?,label,minDist,warn,icon,
//     slot,enemyTurf,toast} | goto{at,clearHeat,needClean,chase} |
//     kill{name,hp,wep,intro,pull | targets:[...]} | hunt{+ambush} |
//     ram{name,hp,speed,radius,dps} | boost | gotoAll{stops} |
//     give{item,ammo} | pay{money,xp} | claimHouse
//   Any step: banner/toast. Mission-level: freebie{at,item,ammo,
//     toast}, next:"mX" (hard chain), giver:{letter,at,after,who}.
// Do not define names that shadow engine internals.
// ============================================================

// ---- the story ----
const N = () => `<b>${pname || "Kid"}</b>`;
function ch1(){ return [
  {html:`<div class="titleCard">THE STREETS</div>`, minMs:2200},
  {html:sp(`Three years of small moves built up to one big one. Meridian Savings &amp; Loan, 9:04 on a gray Tuesday. ${N()} on the wheel — that was the whole job. Drive. Wait. Don't think too hard.`)},
  {html:sp(`You were still rolling up when the alarm started screaming. Through the glass you watched Vera and Dane come out the front doors — bags heavy, guns loose in their hands — and neither one of them so much as looked for your car. Then they turned and went back inside, headed for the rear.`)},
  {html:sp(`You went in after them. Through the marble lobby, past the tellers face-down on the tile, out the service door and into the alley behind the bank.`)},
  {html:sp(`Vera was waiting for you. Two pistols, both of them steady, both of them on you.<br><br>"Nothing personal, ${pname||"kid"}. I'm going somewhere bigger — and you were never coming."<br><br>Moss was already on the ground by the dumpsters. He'd heard the same speech.`)},
  {html:sp(`You saw the flash before you heard the sound. The alley tilted sideways. Somewhere far away, sirens.<br><br>Her footsteps didn't even hurry.`), minMs:900},
  {html:`<div class="paper"><div class="mast">THE CITY LEDGER</div>
    <div class="head">GETAWAY MAN TAKES THE FALL IN $340K MERIDIAN HEIST</div>
    <div class="body">${(pname||"An unidentified man")}, found shot at the scene of Tuesday's robbery, was the only arrest. Two suspects remain at large; a third was found dead behind the bank. The defendant refused to name a single accomplice.<br><br>The sentence: <b>twelve years</b>.</div></div>`, minMs:1200},
]; }
function ch2(){ return [
  {html:sp(`<i>Six years in.</i><br><br>They moved you upstate on a Thursday. Two vans, four cruisers, a bridge over the Wade River. The man shackled across from you had road-map hands and a broken grin.<br><br>"Ray," he said, like it was an apology.`)},
  {html:sp(`The convoy stopped hard enough to throw you off the bench. Through the slit window: masked men, rifles, spike strips across both lanes. They wanted one prisoner — a gray-haired man from the lead van — and they said everybody else could live.`)},
  {html:sp(`The cops handed him over like a parcel. And in that long, stupid minute where every gun was pointed somewhere else, Ray got his chains around an officer's throat.<br><br>You broke the other one's nose before you'd decided to. Keys. Cuffs. Door.`)},
  {html:sp(`You were twenty feet clear when you both saw it at the same time — a duffel wedged under the lead van. Blinking.<br><br>The blast threw you flat, ate the convoy whole, and dropped half the bridge into the river.`), minMs:800},
  {html:sp(`When the ringing finally stopped, nothing was standing but the two of you, ash coming down like gray snow.<br><br>"Well," Ray said, coughing. "That's my ride cancelled."`)},
  {html:sp(`His hands were torn up bad from the cuffs and the blast. He nodded at a sedan idling on the far bank, door hanging open, driver long gone.<br><br>"I know how we go dark. But you're driving, ${pname||"kid"}. Consider it your job interview."`)},
]; }
function ch3(){ return [
  {html:sp(`You killed the engine and sat in the quiet for a moment — the first quiet in six years.<br><br>Inside: dust, a couch, running water. It would do.`)},
  {html:sp(`You burned the prison grays in the sink and dressed out of a stranger's closet. When you came back outside, Ray was already in the passenger seat.<br><br>"Now," he said, "let's talk about money. I know a guy. Owes me. Drive."`)},
]; }
function ch4(){ return [
  {html:sp(`You parked a block short, the way you always used to. The building was a club — <b>Static</b>, by the dead neon over the front — and Ray led you around the side to the service door: steel, no handle, one dim bulb, the bass rolling through the brick like weather.`)},
  {html:sp(`"Whatever he offers," Ray said quietly, and knocked twice, "say yes."<br><br>The bulb went out. The door cracked open and swallowed him whole.`), minMs:800},
]; }

// ---- mission 2: NO TROUBLE ----
function m2open(){ return [
  {html:sp(`You waited with the engine ticking, watching the doorway, and the doorway watched back — a bodyguard came out first, a man built like a vending machine. He looked left. Looked right. Looked at you long enough to memorize you. Went back inside.`)},
  {html:sp(`Then the owner. Silk shirt, reading glasses, a voice like he'd never once needed to raise it.<br><br>"Ray vouches for you. Ray's an idiot — but he's an honest idiot. So here's a small thing."`)},
  {html:sp(`"One of my people — <b>Nyla</b> — needs picking up. No fuss, no cops, no dents in my night. You bring her here in one piece and <i>clean</i>, and maybe there's real work for you at Static."`)},
  {html:sp(`"Where is she?" you asked.<br><br>Sal smiled like the question was cute.<br><br>"You tell me, driver. You know this town better than I do now."`)},
]; }
function m2pick(){ return [
  {html:sp(`She was exactly where she said she'd be — arms crossed, dressed for a shift that started an hour ago. Nyla looked you over through the glass before she got in.<br><br>"You're new. Sal must be desperate."`)},
  {html:sp(`"Drive nice," she said, buckling in. "I've had a night."`)},
]; }
function m2end(){ return [
  {html:sp(`Nyla was out of the car before it fully stopped — heels on gravel, past the bodyguard without a word. Sal watched from the doorway and nodded once. The kind of nod that's worth more than a handshake.`)},
  {html:sp(`"Clean," he said, and pressed folded bills into your hand. "I remember clean. Come back around — there's a bigger thing brewing, and it needs a driver nobody knows yet."`)},
]; }

// ---- mission steps ----
// ---- mission 3 story pages ----
function m3open(){ return [
  {html:sp(`You rolled back around to Static's service door, looking for the work Sal promised. The bulb was lit. Before you could knock, the vending machine stepped out, pressed an envelope into your hand, and went back inside without a word.`)},
  {html:`<div class="letter">Driver —<br><br>There's new product on the street. <b>Fentanyl</b> — "fent," if you're buying. Some corner dealer has been pushing it to my girls, and two of them can't work and one of them can't stand up.<br><br>His name is Deuce. Find him. Bring a baseball bat. Use the bat.<br><br>He drives a hatchback he's very proud of. Take it, get it painted, and bring it to my garage. Consider it his apology.<br><br>Burn this.<br>— S</div>`, minMs:1200},
  {html:sp(`You read it twice, then held the corner to the car's lighter until it caught.<br><br>First: a bat. You knew a spot where one wouldn't be missed.`)},
]; }
function m3bat(){ return [
  {html:sp(`It was right where you figured — wrapped in a trash bag, wood grain gone gray from weather, tape on the handle from somebody else's bad night.<br><br>It had a good weight to it.`)},
]; }
function m3found(){ return [
  {html:sp(`Deuce worked out in the open like a man who'd never been hit. Little blue pills in little plastic bags, a line of gray-faced customers, and a hatchback at the curb polished like a trophy.<br><br>He saw the bat before he saw your face. "Whoa whoa whoa— who sent—"`)},
]; }
function m3car(){ return [
  {html:sp(`It was done. You stood over him breathing hard, the street suddenly very quiet, the little blue pills scattered across the pavement like teeth.<br><br>His keys were in his jacket. The hatchback started on the first turn — he really did take care of it.`)},
  {html:sp(`Sal's letter said painted. You knew a spot that did no-questions work — first visit's always a courtesy in this business.`)},
]; }
function m3sprayed(){ return [
  {html:sp(`The guy at the booth looked at the car, looked at you, and didn't ask a single question. Twenty minutes later the hatchback came out a different animal entirely.<br><br>"First one's a courtesy," he said. "Next time it costs. Everything costs."`)},
]; }
function m3done(){ return [
  {html:sp(`Sal's garage swallowed the hatchback and a man in coveralls was already peeling the plates before you were out of the seat.<br><br>Sal appeared with an envelope — thicker than the last one.`)},
  {html:sp(`"Two of my girls are back at work," he said. "And a certain chemist is learning to eat soup. You're useful, driver. That's rare."<br><br>He didn't say <i>come back</i>. He didn't have to.`), minMs:800},
  {html:`<div class="titleCard" style="font-size:32px">MISSION PASSED</div>`, minMs:1400},
]; }

// ---- mission 4 story pages ----
function m4open(){ return [
  {html:sp(`You came around the back of Static again. The bulb was lit, and Sal was outside mid-conversation with a man in a gray suit — the kind of suit that doesn't dance. The suit looked at you once, filed you somewhere, and left without a goodbye.`)},
  {html:sp(`"Good timing, driver," Sal said, watching the suit go. "You know who Mr. Brava is? Doesn't matter. His son <b>Vinnie</b> runs an honest business fixing dishonest cars, and tonight Vinnie wants to see his girl. <b>Carmen</b>. You're picking her up from her apartment."`)},
  {html:sp(`"One thing." Sal's voice dropped. "Her building sits deep in the wrong colors. That block belongs to people who do not love visitors. Roll in quiet. Roll out quicker."`)},
  {html:sp(`"Straight to Vinnie's garage — and <i>move</i>. The Bravas don't like waiting, it's a family trait." He tapped the roof of the car twice.<br><br>"And driver? Eyes on the road. Not on her. Jealousy runs in that family too."`)},
]; }
function m4pick(){ return [
  {html:sp(`Her block wore somebody else's colors on every pole and every jacket. You rolled in slow and gave the horn two polite taps — the kind that say <i>taxi</i>, not <i>trouble</i>. On the corner, heads turned anyway.`)},
  {html:sp(`Carmen came out fast — she'd clearly done this before. Heels, gym bag, sunglasses at night. She crossed the sidewalk like it owed her money and got in without a word.<br><br>Then: "You're not the usual guy. Drive like the usual guy."`)},
]; }
function m4end(){ return [
  {html:sp(`Vinnie's garage smelled like fresh paint over old stories. Carmen was out of the car before the handbrake clicked — she crossed the floor at a run and hit him like a wave.`)},
  {html:sp(`He held up one finger over her shoulder. "Gimme a moment, gimme a moment—" Then he untangled himself, wiped his palm on his coveralls, and offered you his hand.<br><br>"Vinnie. Sal says you're reliable." A beat. "Sal doesn't say that."`)},
  {html:sp(`"Come back around sometime. A reliable man's hard to find, and I might have work for one." He was already turning back to Carmen before he finished the sentence.<br><br>You saw yourself out.`)},
  {html:`<div class="titleCard" style="font-size:32px">MISSION PASSED</div>`, minMs:1400},
]; }

// ---- mission 5 story pages ----
function m5open(){ return [
  {html:sp(`You knocked on Static's service door and it flew open before your second knuckle landed. Sal — but not silk-shirt Sal. This was a man with a vein working in his temple.`)},
  {html:sp(`"You know what I found out tonight?" He didn't wait. "The Norte side has been sending a <b>pimp</b> into MY blocks. Man named <b>Silk</b>. Purple coat, gold tooth, drives like the street's named after him. He's been running business out of a parked car — using MY girls, on MY corners, and mailing the money north."`)},
  {html:sp(`"I'm past talking. Him and the muscle he rolls with — <b>off my streets</b>. Permanently."<br><br>He pressed a folded paper into your hand. "There's a piece arranged for you. Behind the gun store by the subway — man there owes me. Package is out back."`)},
  {html:sp(`"Do it clean, do it tonight." The door was already closing. "And driver — after this one, you and that store are gonna be good friends."`)},
]; }
function m5gun(){ return [
  {html:sp(`Around the back of the store, wedged behind the dumpster where the paper said: a package wrapped in oilcloth, heavier than it looked.<br><br>A Glock, cleaned and oiled, and three full magazines. Somebody wanted this done properly.`)},
]; }
function m5found(){ return [
  {html:sp(`The car was right where the girls said it would be — engine running, music low. Silk leaned on the hood in a purple coat that glowed under the streetlight, gold tooth flashing while he counted somebody else's money. Reno stood off his shoulder, watching the street the way muscle does.<br><br>Reno saw you first.`)},
]; }
function m5end(){ return [
  {html:sp(`It got loud, and then it got very, very quiet. The engine was still running. The music was still playing — something slow, almost polite.<br><br>You reached in and turned the key. The block exhaled.`)},
  {html:sp(`Word would reach Sal before you did. That's how his streets worked — bad news traveled north tonight, and it traveled fast.`)},
  {html:`<div class="titleCard" style="font-size:32px">MISSION PASSED</div>`, minMs:1400},
]; }

// ---- mission 6 story pages ----
function m6open(){ return [
  {html:sp(`The service door opened before you knocked — but it wasn't Sal. The vending machine stepped out first, looked left, looked right, looked at the roofline, and only then held the door.<br><br>Sal came out adjusting his cuffs like a man about to enjoy himself.`)},
  {html:sp(`"Driver. You'll appreciate this one." He couldn't keep the grin down. "There's a <b>police charity ball</b> tonight. Six blocks of parked cruisers and off-duty officers with open bars in their hands and paychecks burning holes in their dress uniforms."`)},
  {html:sp(`"And what does a hard-working officer look for after his fourth scotch at a charity function?" Sal spread his hands. "<i>Company.</i> I've got girls working every corner around that venue right now. You're the shuttle service."`)},
  {html:sp(`"Round them up — all of them, fast — and deliver them to the ball. Every minute you waste, some cop spends his money somewhere that isn't mine." He tapped the roof twice, the old signal.<br><br>"Chop chop, driver. Charity waits for no one."`)},
]; }
function m6full(){ return [
  {html:sp(`Three stops later the car was full — perfume, gossip, and somebody's heels on the back of your seat. They all knew each other. They all talked at once.<br><br>From the back: "A cop ball. Sal's a genius or the devil." A pause. "Same thing."`)},
]; }
function m6end(){ return [
  {html:sp(`You could hear the venue before you saw it — a band playing something brassy, and a valet line of cruisers parked nose to tail. The girls were out and working the sidewalk before you'd fully stopped, scattering into the light like they owned it.`)},
  {html:sp(`Your phone buzzed. Sal.<br><br>"I'm watching the donations roll in from here, driver. Beautiful thing." A pause, and his voice went almost warm. "That's the last errand I got. You're past this kind of work now — Vinnie's expecting you, and Vinnie's world is bigger than mine."`)},
  {html:sp(`"Static's door stays open. First drink's always on the house for the man who kept my streets mine."<br><br>The line went quiet. Behind you, a cop in dress blues was already counting his cash.`), minMs:800},
  {html:`<div class="titleCard" style="font-size:32px">MISSION PASSED</div>`, minMs:1400},
]; }

// ---- mission 7 story pages ----
function m7open(){ return [
  {html:sp(`Vinnie's garage, mid-argument. Carmen sat on a workbench swinging one heel, and she did not lower her voice for your benefit.<br><br>"I'm asking a simple question, Vincenzo. When exactly do <i>I</i> get on your schedule?"<br><br>"Baby. Business first. Money buys time, time buys us—" She was already walking to the office. The door didn't slam, which somehow felt worse.`)},
  {html:sp(`Vinnie wiped his hands on a rag like nothing happened.<br><br>"The <b>Northsiders</b> owe me money. Real money. Lately they've developed amnesia about it. One of their capos — fat man named <b>Gordo</b> — is sitting in a restaurant right now, having a long lunch that I'm effectively paying for."`)},
  {html:sp(`"So here's the play." He held up a finger for each step. "His car's parked outside the place. You boost it. You take it to a friend of mine — they call him <b>Fuse</b> — and Fuse fits it with a persuasive accessory. Then you put it back <b>exactly</b> where you found it. Same spot. Same angle."`)},
  {html:sp(`"Gordo eats slow." Vinnie checked his watch. "But nobody eats forever. <i>Move.</i>"`)},
]; }
function m7bomb(){ return [
  {html:sp(`Fuse's door rattled down behind the car and the room went workshop-quiet. Fuse turned out to be a small man with steady hands and eyes that had seen too many bright flashes. He circled the car once, nodded to himself, and disappeared under the dash, humming.`)},
  {html:sp(`Twenty minutes. Then he rolled out, patted the fender like a good dog, and hit the door switch.<br><br>"Ignition trigger. A classic — the classics work." Daylight poured back in. "Drive gentle, friend. Like you're carrying soup."`)},
]; }
function m7end(){ return [
  {html:sp(`Same spot. Same angle. You lined the wheels up with the same oil stain and armed it the way Fuse showed you — two switches, one breath. Then you got out and walked. Not fast. Just gone.<br><br>You found shade across the street and a wall worth leaning on.`)},
  {html:sp(`Gordo came out picking his teeth, said something that made the valet laugh the way employees laugh, and crossed to his car with the unhurried walk of a man who's never once been wrong about anything.<br><br>Door. Seat. Key.`)},
  {html:sp(`The ignition turned and the street turned white. Windows sang for two blocks. The car jumped its own length and came down burning, and every alarm in the district started singing backup.<br><br>Your phone buzzed once.<br><br>"Debt's settled. — V"`), minMs:900},
  {html:`<div class="titleCard" style="font-size:32px">MISSION PASSED</div>`, minMs:1400},
]; }

// ---- mission 8 story pages ----
function m8open(){ return [
  {html:sp(`You found Vinnie on a creeper under a sedan, only his boots and his opinions visible.<br><br>"You know what moves more money than cars, driver?" He rolled out, wiping his hands. "<b>Fent</b>. Sal had you crack down on the retail. Me? I'm interested in the <i>wholesale</i>."`)},
  {html:sp(`"Problem is, there's an independent operator in my way. Runs a noodle stand — good noodles, allegedly — but the stand's a front. The real menu's pressed blue pills under the counter. They call him <b>Noodles</b>, because the streets are not creative."`)},
  {html:sp(`"He's done. Permanently done." Vinnie's voice was flat as a feeler gauge. "If you're light on iron, there's a package behind the gun store — piece and rounds, on me. Take it or don't."`)},
  {html:sp(`"One more thing." He pointed a wrench at you. "His corner sits deep in hostile colors, and those boys consider Noodles a paying tenant. They will <b>not</b> like you visiting. In, done, out."`)},
]; }
function m8run(){ return [
  {html:sp(`You made the stand from half a block out — steam, a line of customers, and a man behind the counter whose eyes were doing math the moment they landed on you. Whatever number he got, he didn't like it.`)},
  {html:sp(`He dropped the ladle mid-order, ducked under the counter flap, and came up running — surprisingly light on his feet for a man built like a soup dumpling — heading for one of several cars he definitely kept for exactly this.<br><br>Behind you, jackets in hostile colors started peeling off walls.`)},
]; }
function m8end(){ return [
  {html:sp(`Wherever it ended, it ended. Noodles ran out of blocks before you ran out of patience, and the little blue pills scattered from his jacket like confetti at a very bad parade.`)},
  {html:sp(`Your phone buzzed while you were still catching your breath.<br><br>"Wholesale's open. Come by the garage sometime — Carmen says you're the only employee I got with manners. — V"`), minMs:800},
  {html:`<div class="titleCard" style="font-size:32px">MISSION PASSED</div>`, minMs:1400},
]; }

// ---- mission 9 story pages ----
function m9open(){ return [
  {html:sp(`Vinnie had a map spread across a hood and the look of a man who'd been thinking about money in motion.<br><br>"Payroll van. <b>Armored</b>. Makes its rounds every week, fat with cash, driven by two guards who get paid to be brave right up until they don't."`)},
  {html:sp(`"Now listen — shooting an armored van is donating ammo. Won't scratch it." He knocked twice on the hood under the map. "You want it open, you <b>hit it</b>. Something heavy, again and again. Steel folds before nerve does — those guards will bail the moment the ride stops feeling bulletproof."`)},
  {html:sp(`"When they run, the van's yours. Take it to a warehouse down at the docks — my people are waiting there, and they are <i>very</i> good at opening things."`)},
  {html:sp(`"One more thing, driver." He folded the map. "That van has a route and a schedule. It will not wait around for you. Find it, hit it, take it. <b>Go.</b>"`)},
]; }
function m9chase(){ return [
  {html:sp(`You heard it before you saw it — a diesel note with money inside. The van rolled through the intersection ahead, boxy and gray and riding low on its springs, and the driver's mirror caught you sitting there a beat too long.<br><br>It didn't stop at the next sign.`)},
]; }
function m9guards(){ return [
  {html:sp(`One more hit did it. The van shuddered, ground half a block on a dead axle, and quit.<br><br>Both doors burst at once — two guards out and sprinting in two directions, helmets bouncing, done being brave for this pay grade. One of them was already on his radio.`)},
]; }
function m9end(){ return [
  {html:sp(`The warehouse door was rolling up before you'd finished the turn. Vinnie's people moved like a pit crew — the van swallowed whole, chains and crowbars already singing against the back doors.`)},
  {html:sp(`A man in a dockworker's coat handed you an envelope and nodded at the street behind you.<br><br>"Cops? Handled. Around here, nobody saw a van. Nobody's seen a van in years."`), minMs:800},
  {html:`<div class="titleCard" style="font-size:32px">MISSION PASSED</div>`, minMs:1400},
]; }

// ---- mission 10 story pages ----
function m10open(){ return [
  {html:sp(`A black four-door sat on the lift with its wheels off, and Vinnie was talking to its owner — a heavyset man in a good coat who stood like the floor belonged to him.<br><br>"Driver — this is <b>Enzo</b>. Enzo, this is the one I told you about."<br><br>Enzo looked you over the way men like him look over tools. Apparently you passed.`)},
  {html:sp(`"My friend here needs a ride while his car's up," Vinnie said. "Straight home, nothing fancy." He caught your eye over Enzo's shoulder. "And come back after — I might have another wheel job for you."`)},
  {html:sp(`Enzo settled into the loaner — a black four-door, of course — and waited until you'd pulled out of the lot.<br><br>"Change of plans." He said it like weather. "There's a laundry across town. The owners have developed a memory problem about their <i>protection</i> payments. We'll stop there first."`)},
  {html:sp(`"Drive," Enzo said, and unbuttoned his coat.`)},
]; }
function m10ambush(){ return [
  {html:sp(`Enzo went in alone, unhurried, a man collecting what's his.<br><br>Then the front window blew OUT — muzzle flashes strobing inside, glass on the sidewalk like ice — and Enzo came back through the door at a speed that did not match his build.`)},
  {html:sp(`He hit the seat and the door in one motion.<br><br>"<b>AMBUSH.</b> They knew. They KNEW I was coming—" A round starred the rear glass. "DRIVE. <i>Now.</i> GO GO GO!"`)},
]; }
function m10end(){ return [
  {html:sp(`Enzo got out slow, straightening his coat, breathing through his nose like a bull deciding something.<br><br>"An ambush. For <i>me</i>." He said it twice, quieter the second time, which was worse. "They bought something today. We're going to make sure they pay full price."`)},
  {html:sp(`He nodded at the restaurant behind him — warm light, white tablecloths, a name in script over the door.<br><br>"You drive well under fire. Come back around, there's more work for a man who doesn't panic." He walked toward the doors, and two men you hadn't noticed opened them for him.`), minMs:800},
  {html:`<div class="titleCard" style="font-size:32px">MISSION PASSED</div>`, minMs:1400},
]; }


const MISSIONS = {
  m1: {name:"FIRST DAY OUT", next:"m2", steps:[
    {type:"claimHouse", banner:"claim your free safehouse (\ud83c\udfe0 button)"},
    {type:"cine", pages:ch3},
    {type:"place", key:"contact", label:"Club Static (back door)", icon:"\ud83d\udeaa", minDist:300,
      banner:"tap the map to place the meet",
      warn:"Heads up: you're choosing where Club Static sits. This spot is PERMANENT — the next missions keep coming back here, so pick a real place you can actually walk or drive to."},
    {type:"goto", at:"contact", banner:"get to Club Static",
      toast:'Ray settles into the seat. "Don\'t get pulled over."'},
    {type:"cine", pages:ch4},
    {type:"pay", money:150, xp:200, toast:"Ray palms you a fold of bills before the door takes him."},
  ]},
  m2: {name:"NO TROUBLE", next:null, steps:[
    {type:"cine", pages:m2open},
    {type:"place", key:"nyla", label:"Nyla's Place", icon:"\ud83d\udeaa", minDist:300,
      banner:"tap the map: where's she waiting?",
      warn:"You're choosing where Nyla's waiting. This spot is PERMANENT too — she lives there, and the story remembers. Somewhere you can really get to."},
    {type:"goto", at:"nyla", banner:"go get Nyla",
      toast:'Sal, from the doorway: "Careful with my night, driver."'},
    {type:"cine", pages:m2pick},
    {type:"goto", at:"contact", banner:"bring her back to Club Static",
      toast:'Nyla, from the passenger seat: "The club. And take the smooth roads."'},
    {type:"cine", pages:m2end},
    {type:"pay", money:250, xp:300, toast:"Sal's money is crisp. The streets are yours — for now."},
  ]},
  m3: {name:"BAD MEDICINE", next:null,
    giver:{letter:"S", at:"contact", after:"m2", who:"Sal"},
    steps:[
    {type:"cine", pages:m3open},
    {type:"place", label:"The Bat", minDist:200,
      banner:"tap the map: where's a bat?",
      warn:"Where's a bat lying around? One-time spot — this one is NOT saved."},
    {type:"goto", at:"t", banner:"go grab the bat"},
    {type:"give", item:"bat"},
    {type:"cine", pages:m3bat},
    {type:"place", label:"Deuce's Corner", minDist:300,
      banner:"tap the map: where does Deuce deal?",
      warn:"Where does Deuce deal? One-time spot — this one is NOT saved either.",
      toast:"Bat on the seat. Time to make a house call."},
    {type:"kill", name:"Deuce", hp:120, wep:"knife", intro:m3found,
      banner:"deal with Deuce", pull:'Deuce pulls a blade. "Wrong corner, friend."'},
    {type:"cine", pages:m3car},
    {type:"place", key:"paynspray", label:"Clean Slate Customs", icon:"\ud83c\udfa8", minDist:300,
      banner:"place Clean Slate Customs",
      warn:"You're choosing where Clean Slate Customs operates. PERMANENT and important — it clears police heat and resprays boosted cars from now on."},
    {type:"goto", at:"paynspray", banner:"get the car painted",
      toast:"The hatchback hums along. Deuce kept it nice."},
    {type:"cine", pages:m3sprayed},
    {type:"place", key:"salgarage", label:"Sal's Garage", icon:"\ud83d\udd27", minDist:300,
      banner:"place Sal's garage",
      warn:"You're choosing where Sal's garage sits. PERMANENT — future work runs through here."},
    {type:"goto", at:"salgarage", banner:"deliver the car to Sal",
      toast:"One delivery left. Keep it clean."},
    {type:"cine", pages:m3done},
    {type:"pay", money:400, xp:400, toast:"Sal's envelope has real weight to it."},
  ]},
  m4: {name:"DRIVE HER, DON'T LOOK", next:null,
    giver:{letter:"S", at:"contact", after:"m3", who:"Sal"},
    steps:[
    {type:"cine", pages:m4open},
    {type:"place", key:"carmen", label:"Carmen's Apartment", icon:"🚪", minDist:300, enemyTurf:true,
      banner:"tap the map: Carmen's building — MUST be on rival turf",
      warn:"You're choosing where Carmen lives. PERMANENT — and her block MUST sit inside another gang's territory. That's the whole problem with this pickup. In and out before they care, and nobody has to bleed."},
    {type:"goto", at:"carmen", banner:"pick up Carmen — quick and quiet",
      toast:'Sal: "In and out, driver. That block has eyes."'},
    {type:"cine", pages:m4pick},
    {type:"place", key:"vinnies", label:"Vinnie's Garage", icon:"🏁", minDist:300,
      banner:"tap the map: where's Vinnie's garage?",
      warn:"You're choosing where Vinnie's garage sits. PERMANENT and important — Vinnie's a man worth knowing, and this place matters later."},
    {type:"goto", at:"vinnies", banner:"get her to Vinnie — he hates waiting",
      toast:'Carmen checks the time. "He\'s counting minutes. He does that."'},
    {type:"cine", pages:m4end},
    {type:"pay", money:350, xp:350, toast:"Nothing from Vinnie yet — but Sal's word got you in the door."},
  ]},
  m5: {name:"OFF THE CORNER", next:null,
    giver:{letter:"S", at:"contact", after:"m4", who:"Sal"},
    steps:[
    {type:"cine", pages:m5open},
    {type:"place", key:"gunstore", label:"Subway Guns & Ammo", icon:"🏪", minDist:300,
      banner:"tap the map: where's the gun store?",
      warn:"You're choosing where the gun store sits. PERMANENT — after tonight it's a legit shop that sells you iron and ammo whenever you need it."},
    {type:"goto", at:"gunstore", banner:"grab the package out back",
      toast:'The paper just says: "Behind the dumpster. Burn this too. — S"'},
    {type:"cine", pages:m5gun},
    {type:"give", item:"g19", ammo:{pist:60},
      toast:"Glock 19 + 60 rounds. Somebody wants this done right."},
    {type:"place", label:"Silk's Parking Spot", minDist:300,
      banner:"tap the map: where's Silk parked?",
      warn:"Where does Silk run his business from? One-time spot — NOT saved."},
    {type:"kill", banner:"take out Silk and Reno — both of them",
      intro:m5found,
      targets:[
        {name:"Silk", hp:110, wep:"snub",  pull:'Silk drops the cash and pulls a snub. "Wrong side of town, baby."'},
        {name:"Reno", hp:100, wep:"knife", pull:'Reno flicks a blade open without a word.'},
      ]},
    {type:"cine", pages:m5end},
    {type:"pay", money:500, xp:450, toast:"Sal's streets are Sal's again. He'll remember who did that."},
  ]},
  m6: {name:"THE CHARITY BALL", next:null,
    giver:{letter:"S", at:"contact", after:"m5", who:"Sal"},
    steps:[
    {type:"cine", pages:m6open},
    {type:"place", slot:"g1", label:"Dee's Corner", minDist:150,
      banner:"tap the map: where's Dee working? (1 of 3)",
      warn:"Where's Dee posted up? The girls work close tonight — one-time spot, NOT saved."},
    {type:"place", slot:"g2", label:"Rosa's Corner", minDist:150,
      banner:"tap the map: where's Rosa working? (2 of 3)",
      warn:"Where's Rosa at? Close by, quick grab — one-time spot, NOT saved."},
    {type:"place", slot:"g3", label:"Peaches' Corner", minDist:150,
      banner:"tap the map: where's Peaches working? (3 of 3)",
      warn:"And Peaches? Last one — one-time spot, NOT saved."},
    {type:"place", label:"The Charity Ball", minDist:300,
      banner:"tap the map: where's the police ball?",
      warn:"Where's the venue? One-time spot — the party's over by morning. NOT saved.",
      toast:'Sal: "Clock\'s running, driver. Those wallets won\'t empty themselves."'},
    {type:"gotoAll", banner:"round up the girls — any order",
      stops:[{slot:"g1", name:"Dee"}, {slot:"g2", name:"Rosa"}, {slot:"g3", name:"Peaches"}]},
    {type:"cine", pages:m6full},
    {type:"goto", at:"t", banner:"deliver them to the ball — move!",
      toast:'From the back seat: "Step on it, sweetheart. Cops tip better before midnight."'},
    {type:"cine", pages:m6end},
    {type:"pay", money:600, xp:500, toast:"Sal's last envelope. Fattest one yet."},
  ]},
  m7: {name:"LONG LUNCH", next:null,
    giver:{letter:"V", at:"vinnies", after:"m6", who:"Vinnie"},
    steps:[
    {type:"cine", pages:m7open},
    {type:"place", label:"Gordo's Parked Car", minDist:300,
      banner:"tap the map: where's Gordo parked?",
      warn:"Where's the restaurant parking? One-time spot — NOT saved. You'll be coming back to this exact spot with the car, so remember it."},
    {type:"boost", banner:"boost Gordo's car — quick and quiet",
      toast:'Vinnie: "Eyes open. Capos park where people watch."'},
    {type:"place", key:"bombshop", label:"Fuse's Bomb Shop", icon:"💣", minDist:300,
      banner:"tap the map: where's Fuse's shop?",
      warn:"You're choosing where Fuse operates. PERMANENT — a man who wires cars is worth keeping around."},
    {type:"goto", at:"bombshop", banner:"get the car to Fuse — drive like you're carrying soup"},
    {type:"cine", pages:m7bomb},
    {type:"goto", at:"t", banner:"put it back EXACTLY where it was — Gordo's still eating",
      toast:"Gentle on the brakes. Gentle on everything."},
    {type:"cine", pages:m7end},
    {type:"pay", money:800, xp:600, toast:"Vinnie pays like a man who just got paid. Because he did."},
  ]},
  m8: {name:"OUT OF THE SOUP", next:null,
    giver:{letter:"V", at:"vinnies", after:"m7", who:"Vinnie"},
    freebie:{at:"gunstore", item:"g19", ammo:{pist:30},
      toast:"Fuse-taped package behind the store: Glock + 30 rounds, courtesy of V."},
    steps:[
    {type:"cine", pages:m8open},
    {type:"place", label:"The Noodle Stand", minDist:300,
      banner:"tap the map: where's Noodles set up?",
      warn:"Where's the stand? One-time spot — NOT saved. His corner runs hostile colors, and remember: there's a FREE piece + ammo waiting behind your gun store if you swing by on the way.",
      toast:"Free package behind the gun store if you need iron. Your call."},
    {type:"hunt", name:"Noodles", hp:90, ambush:3,
      banner:"run down Noodles — he can't run forever",
      intro:m8run,
      pull:null},
    {type:"cine", pages:m8end},
    {type:"pay", money:750, xp:650, toast:"Vinnie's envelope smells faintly of motor oil and victory."},
  ]},
  m9: {name:"MONEY IN MOTION", next:null,
    giver:{letter:"V", at:"vinnies", after:"m8", who:"Vinnie"},
    steps:[
    {type:"cine", pages:m9open},
    {type:"place", label:"The Van's Route", minDist:400,
      banner:"tap the map: where do you cut off the van?",
      warn:"Where do you intercept the route? One-time spot — NOT saved. The van runs, so pick ground you can chase across."},
    {type:"ram", name:"Armored Van", hp:130, speed:6.5, radius:35, dps:6,
      banner:"ram the van — stay on its bumper until it dies",
      intro:m9chase},
    {type:"cine", pages:m9guards},
    {type:"place", key:"docks", label:"Dockside Warehouse", icon:"⚓", minDist:300,
      banner:"tap the map: where's the dock warehouse?",
      warn:"You're choosing where Vinnie's dock crew operates. PERMANENT — people who make things disappear are worth keeping."},
    {type:"goto", at:"docks", clearHeat:"The dock crew makes some calls. Nobody saw a van.",
      banner:"deliver the van to the docks — shake what heat you can",
      toast:"The van pulls left and drinks fuel — but it drives."},
    {type:"cine", pages:m9end},
    {type:"pay", money:900, xp:700, toast:"Heaviest envelope yet. Payroll money spends beautifully."},
  ]},
  m10: {name:"THE PASSENGER", next:null,
    giver:{letter:"V", at:"vinnies", after:"m9", who:"Vinnie"},
    steps:[
    {type:"cine", pages:m10open},
    {type:"place", label:"The Laundry", minDist:300,
      banner:"tap the map: where's the laundry?",
      warn:"Where's the laundry that stopped paying? One-time spot — NOT saved."},
    {type:"goto", at:"t", banner:"take Enzo to the laundry",
      toast:'Enzo, from the back seat: "Smooth and legal, driver. I like arriving calm."'},
    {type:"cine", pages:m10ambush},
    {type:"place", key:"enzos", label:"Enzo's Restaurant", icon:"🍝", minDist:300,
      banner:"tap the map: where's Enzo's restaurant?",
      warn:"You're choosing where Enzo holds court. PERMANENT and important — this man clearly has more work."},
    {type:"goto", at:"enzos", chase:4, needClean:true,
      banner:"get Enzo to his restaurant — lose ALL the heat first",
      toast:'Enzo reloads without looking down. "They will regret the window. And driver — I do not walk past police."'},
    {type:"cine", pages:m10end},
    {type:"pay", money:850, xp:700, toast:"Enzo tips like a man who plans to use you again."},
  ]},
};
