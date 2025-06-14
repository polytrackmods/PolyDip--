import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";


let timeLength = 0;
class Stopwatch {
        constructor() {
            this.interval = null;
            this.running = false;
        }
        setTimer(q) {
            this.ui = q;
        }
        start() {
            console.log("startnig")
            if (this.running) return;
            this.running = true;
            
            this.interval = setInterval(() => {
                timeLength++;
                this.ui ? this.ui.textContent = polyMod.formatSeconds(timeLength) : null;
            }, 1000);
        }
    
        stop() {
            clearInterval(this.interval);
            this.running = false;
        }
        clear() {
            this.stop();
            this.ui ? this.ui.textContent = polyMod.formatSeconds(timeLength) : null;
            timeLength = 0;
        }
    }

class pdipMod extends PolyMod { 
    addPlayer = function(player_id, player_name, player_height="36") {
        const arrow = document.createElement("div")
        arrow.className = "player-arrow";
        arrow.id = player_id;
        arrow.style.bottom = `${this.roundNumber(player_height)}%`;
        this.barDiv.appendChild(arrow);
    
        const playerName = document.createElement("p");
        playerName.textContent = player_name;
    
        arrow.appendChild(playerName); 
    };
    
    editPlayer = function(player_id, player_height) {
        const arrow = document.getElementById(`${player_id}`);
        arrow.style.bottom = `${this.roundNumber(player_height)}%`;
    }
    
    removePlayer = function(player_id) {
        const arrow = document.getElementById(`${player_id}`);
        arrow.remove();
    }
    
    floorPopup = function(floor_num) {
        if (this.pml.getSetting("popupSetting") === "true") {
            const color = popupInfo[floor_num - 1][1]
            const desc = popupInfo[floor_num -1][0]
            
            const bar = document.getElementById("slide-bar");
            const bar2 = document.getElementById("slide-bar2");
            const bg = document.getElementById("slide-bg");
            const text = document.getElementById("slide-text");
        
            bar.classList.remove("slide-bar-anim"); 
            bar2.classList.remove("slide-bar-anim2"); 
            bg.classList.remove("slide-bg-anim");
            text.classList.remove("text-anim");     
        
            void bar.offsetWidth;
            void bar2.offsetWidth;
            void bg.offsetWidth;
            void text.offsetWidth;
            
            bar.style.setProperty("--first-color", color);
            bar.classList.add("slide-bar-anim"); 
        
            bar2.classList.add("slide-bar-anim2");
        
            bg.style.setProperty("--first-color", color);
            bg.classList.add("slide-bg-anim");
        
            text.innerHTML = `Floor${String(floor_num).padStart(2, '0')}<br>- ${desc} -`;
            text.classList.add("text-anim");   
        };
    }

    roundNumber = function(value) {
      return (Math.round((value / 2395) * 1000) / 10).toFixed(1)
    }
    
    createFloorMarkers = function() {
      this.floorHeights.forEach((height, i) => {
          const isLast = i === this.floorHeights.length - 1;
      
          if (isLast) {
              this.createArrow("gold", `${this.roundNumber(height)}%`, `Fin`);
          } else {
              this.createArrow("gray", `${this.roundNumber(height)}%`, `${i}`);
          }
      });
    };

    createFloorPopupUI = function(uiDiv) {
      
      const topDiv = document.createElement("div");
      topDiv.className = "popup-div"
      topDiv.id = "popupDiv"
  
      uiDiv.appendChild(topDiv); 
  
      const topDivStyle = document.createElement("style");
      topDivStyle.textContent = `
      .popup-div {
          position: absolute;
          top: 0px;
          height: 80px;
          width: 500px;
          left: calc(50% - 250px);
          overflow: hidden; 
          color: white;
          display: flex;
          justify-content: center;
          text-align: center;
          align-items: center;
          font-size: 32px;
      }
  
      @keyframes floorSlide1 {
          0% {
              transform: translateX(-100%);
              background: var(--first-color);
              opacity: 1;
              z-index: 1;
          }
          33.2% {
              transform: translateX(0%);
              background: var(--first-color);
              opacity: 1;
              z-index: 1;
          }
          66.6% {
              transform: translateX(0%);
              background: var(--first-color);
              opacity: 1;
              z-index: 1;
          }
          66.7% {
              transform: translateX(0%);
              background: var(--first-color);
              opacity: 0;
              z-index: 1;
          }
          100% {
              transform: translateX(-100%);
              background: var(--first-color);
              opacity: 0;
              z-index: 1;
          }
      }
  
      @keyframes floorSlide2 {
          0% {
              transform: translateX(-100%);
              background: white;
              opacity: 0;
              z-index: 2;
          }
          33.3% {
              transform: translateX(-100%);
              background: white;
              opacity: 1;
              z-index: 2;
          }
          66.6% {
              transform: translateX(0%);
              background: white;
              opacity: 1;
              z-index: 2;
          }
          99.9% {
              transform: translateX(100%);
              background: white;
              opacity: 1;
              z-index: 2;
          }
          100% {
              transform: translateX(-100%);
              opacity: 0;
              z-index: 2;
          }
      }
  
      @keyframes bgSlide {
          0% {
              opacity: 0;
          }
          11% {
              opacity: 0;
          }
          11.1% {
              background: var(--first-color);
              opacity: 0.5;
          }
          90% {
              background: var(--first-color);
              opacity: 0.5;
          }
          100% {
              background: var(--first-color);
              opacity: 0;
          }
      }
      @keyframes text {
          0% {
              opacity: 0;
          }
          11% {
              opacity: 0;
          }
          11.1% {
              opacity: 1;
          }
          90% {
              opacity: 1;
          }
          100% {
              opacity: 0;
          }
      }
  
      .slide-bar {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: translateX(-100%); 
      }
  
      .slide-bar-anim {
          animation: floorSlide1 1s forwards;
      }
      .slide-bar-anim2 {
          animation: floorSlide2 1s forwards;
      }
      .slide-bg-anim {
          animation: bgSlide 6s forwards;
      }
      .text-anim {
          animation: text 6s forwards;
      }
  
      .slide-bg {
          position: absolute;
          width: 100%;
          height: 100%;
      }
      `;
  
      document.head.appendChild(topDivStyle);
  
      const bar1 = document.createElement("div");
      bar1.className = "slide-bar";
      bar1.id = "slide-bar"
  
      topDiv.appendChild(bar1);
  
      const bar2 = document.createElement("div");
      bar2.className = "slide-bar";
      bar2.id = "slide-bar2";
  
      topDiv.appendChild(bar2);
  
      const bg = document.createElement("div");
      bg.className = "slide-bg";
      bg.id = "slide-bg";
  
      topDiv.appendChild(bg);
  
      const text = document.createElement("p");
      text.style.position = "absolute";
      text.style.zIndex = "1";
      text.style.opacity = "0";
      text.id = "slide-text";
      
      topDiv.appendChild(text);
  };

    createPolyDipUI = function(pb, player_name, timer_value="0") {
    
        this.polyDipEnabled = true;
    
        
        const uiDiv = document.getElementById("ui");
    
        const leftDiv = document.createElement("div");
        leftDiv.className = "leftDiv";
        leftDiv.id = "leftDiv";
        leftDiv.style.position = "absolute";
        leftDiv.style.left = "0";
        leftDiv.style.height = "100%";
    
        uiDiv.appendChild(leftDiv);
    
        
        this.createFloorPopupUI(uiDiv);
    
        
        this.barDiv = document.createElement("div");
    
        if (!this.pml.getSetting("barSetting") === "true") {this.barDiv.style.opacity = "0"};
        
        const bar = document.createElement("div");
        bar.className = "height-bar";
        this.barDiv.className = "height-bar-div";
    
        leftDiv.appendChild(this.barDiv);
        this.barDiv.appendChild(bar);
    
        this.playerArrow = document.createElement("div");
        this.playerArrow.className = "player-arrow";
        this.playerArrow.style.bottom = "1.5%";
        this.barDiv.appendChild(this.playerArrow);
    
        const playerName = document.createElement("p");
        playerName.textContent = player_name;
    
        this.playerArrow.appendChild(playerName);
    
        const textDiv = document.createElement("div");
        textDiv.className = "pd-text-div";
    
        leftDiv.appendChild(textDiv);
    
        this.heightText = document.createElement("p");
        this.heightText.textContent = "Height: 35m (1.5%)";
        this.heightText.style.textShadow = "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, 0px 0px 5px black";
        
        this.pbText = document.createElement("p");
        this.pbText.textContent = `PB: ${pb}m`;
        this.pbText.style.textShadow = "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, 0px 0px 5px black";
    
        textDiv.appendChild(this.heightText);
        textDiv.appendChild(this.pbText);
    
        let pbArrow = document.createElement("div");
        pbArrow.className = "arrow";
        pbArrow.style.background = "#00b8be";
        pbArrow.style.bottom = `${this.roundNumber(pb)}%`;
        pbArrow.style.zIndex = "1";
        this.barDiv.appendChild(pbArrow);
    
        const pbinnerText = document.createElement("p");
        pbinnerText.textContent = "PB";
        pbinnerText.style.transform = "translateX(-5px)";
    
        pbArrow.appendChild(pbinnerText);
    
        const barStyle = document.createElement('style');
        barStyle.textContent = `
        .height-bar {
            background: white;
            height: 100%;
            margin: 20px 50px;
            width: 10px;
            bottom: 0;
            position: absolute;
            outline: solid;
            outline-width: 4px;
        }`;
    
        const barDivStyle = document.createElement("style");
        barDivStyle.textContent = `
        .height-bar-div {
            position: absolute;
            bottom: 0;
            height: 80%;
            width: 100%;
        }
        `;
    
        const textDivStyle = document.createElement("style");
        textDivStyle.textContent = `
        .pd-text-div {
    
            color: white;
            margin: 90px 120px;
            font-size: 32px;
        }
        `;
    
        document.head.appendChild(barStyle);
        document.head.appendChild(barDivStyle);
        document.head.appendChild(textDivStyle);
    
        this.createFloorMarkers();
    
        this.greenTimer = document.createElement("div");
        this.greenTimer.className = "green-timer";
        this.greenTimer.id = "green-timer";
    
        if (!this.pml.getSetting("timerSetting") === "true") {this.greenTimer.style.opacity = "0"};
    
        uiDiv.appendChild(this.greenTimer);

        const timer = document.createElement("p");
        timer.textContent = this.formatSeconds(timer_value);
        this.stopWatch.setTimer(timer);

        this.greenTimer.appendChild(timer);   
    
        const timerDivStyle = document.createElement("style");
        timerDivStyle.textContent = `
        .green-timer {
            opacity: 0.5;
            background: black;
            height: 100px;
            width: 220px;
            position: absolute;
            right: 0;
            bottom: 50%;
            color: #00ff00;
            text-align: right;
            font-size: 80px;
            display: flex;
            align-items: center;
            justify-content: right;
            padding: 0 70px;
        }
        `;
    
        document.head.appendChild(timerDivStyle);
    };

    updateHeight = function(value) {
        const heightPercent = this.roundNumber(value);
        this.heightText.textContent = `Height: ${Math.round(value)}m (${heightPercent}%)`;
        this.playerArrow.style.bottom = `${heightPercent}%`;    
    };
    
    updatePbHeight = function(value) {
        this.pbText.textContent = `PB: ${Math.round(value)}m`;
        this.pbArrow.style.bottom = `${this.roundNumber(value)}%`;
    };
    
    createArrow = function(bg_color, height, inner_text, z_index="auto") {
        const arrow = document.createElement("div");
        arrow.className = "arrow";
        arrow.style.background = bg_color;
        arrow.style.bottom = height;
        arrow.style.zIndex = z_index;
        this.barDiv.appendChild(arrow);
    
        const innerText = document.createElement("p");
        innerText.textContent = inner_text;
        innerText.style.transform = "translateX(-5px)";
    
        arrow.appendChild(innerText);
    };
    formatSeconds(seconds) {
        const d = Math.floor(seconds / 86400);
        const h = Math.floor((seconds % 86400) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
    
        if (d > 0) return `${d}:${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        if (m > 0) return `${m}:${String(s).padStart(2, '0')}`;
        return `${s}`;
    };
    removePolyDipUI = function() {
        const leftDiv = document.getElementById("leftDiv");
        leftDiv.remove();
        const topDiv = document.getElementById("popupDiv");
        topDiv.remove();
        const timerGr = document.getElementById("green-timer");
        timerGr.remove();
    };
  init = function(polyModLoader) {
    this.pml = polyModLoader;
    //define variables
    this.heightText;
    this.pbText;
    this.barDiv;
    this.pbArrow;
    this.playerArrow;
    this.floorHeights = [35, 105, 245, 365, 500, 645, 770, 885, 1025, 1150, 1295, 1425, 1580, 1720, 1855, 1990, 2110, 2395];
    this.popupInfo = [["Cold Beginning", "#5DE2E7"],["xddlent", "#FFECA1"],["Summer Slide", "#FFCC00"],["You're Skewed", "#FFFFFF"],["Thawing Temple", "#E75480"],["The Knot", "#7DDA58"],["The Sponge", "#060270"],["Koopa Troopa", "#b9f2ff"],["Strawberry Cheesecake", "#8b0000"],["Ice Gold", "#FE9900"],["Missing Pieces", "#020202"],["Paarse Ramp", "#CC6CE7"],["Iolites Trace", "#FFB6C1"],["Spider Sense", "#013220"],["Scared of Dragons?", "#CECECE"],["On the Edge", "#FD7C79"]];
    this.greenTimer;
    this.stopWatch = new Stopwatch();
    this.playerSimHeight = 35;
    this.polyDipEnabled = false;
    this.trackId;
    this.playerName;

      //SETTINGS BOOLS

    polyModLoader.registerSettingCategory("PolyDip Mod");
    polyModLoader.registerSetting("Show Side Bar", "barSetting", "boolean", true);
    polyModLoader.registerSetting("Show Floor Number Popup", "popupSetting", "boolean", true);
    polyModLoader.registerSetting("Green timer", "timerSetting", "boolean", true);

    polyModLoader.registerBindCategory("PolyDip Mod Green Timer");
    polyModLoader.registerKeybind("Start/stop timer", "pDipStartTimer", "keydown","KeyU", null, (e) => {if(this.polyDipEnabled) {e.preventDefault();this.stopWatch.running ? this.stopWatch.stop() : this.stopWatch.start()}})
    polyModLoader.registerKeybind("Reset timer", "pDipResetTimer", "keydown","Digit0", null, (e) => {if(this.polyDipEnabled) {e.preventDefault();this.stopWatch.clear();}})

    //FUNCTIONS
    const fadeOut = document.createElement("style");
    fadeOut.textContent = `
       @keyframes fade {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    
        .fade-text {
            animation: fade 1s forwards;
        }
    `
    document.head.appendChild(fadeOut);
    
    const rainbowPB = function(height) {
        const pbText = `NEW PB ${height} m`
        const uicont = document.getElementById("ui");
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.top = "25%";
        container.style.left = "calc(50% - 275px)";
        container.style.fontSize = "80px";
        container.style.fontWeight = "bold";
        container.style.width = "550px";
        container.style.gap = "2px";
        container.style.letterSpacing = "2px";
        uicont.appendChild(container);
    
        const letters = pbText.split("").map((char, i) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.display = "inline-block";
            container.appendChild(span);
            return span;
        });
    
        let t = 0;
    let animationId;
    
    function animate() {
      t += 0.1;
      letters.forEach((letter, i) => {
        const offset = Math.sin(t + i * 0.3) * 20;
        letter.style.transform = `translateY(${offset}px)`;
    
        const hue = (t * 40 + i * 20) % 360;
        letter.style.color = `hsl(${hue}, 100%, 50%)`;
      });
    
      animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // 7 sec
    setTimeout(() => {
        container.classList.add("fade-text")
    }, 6500);
    
    setTimeout(() => {
        cancelAnimationFrame(animationId);
        container.remove()
    }, 8000);
    }
    
    
    const hideUI = function(id) {
        document.getElementById(id).style.opacity = "0";
    }
    const showUI = function(id, opacity="1") {
        document.getElementById(id).style.opacity = opacity;
    }

    const arrowStyle = document.createElement("style");
    arrowStyle.textContent = `
    .arrow {
        background: #192042;
        width: 50px;
        height: 30px;
        margin: 5px 0;
        position: absolute;
        bottom: 0%;
        clip-path: polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, 0px 0px 2px black;
    }`;
    
    const playerArrowStyle = document.createElement("style");
    playerArrowStyle.textContent = `
    .player-arrow {
        display: flex;
        bottom: 0%;
        margin: 5px 60px;
        clip-path: polygon(100% 0%, 20px 0%, 0% 50%, 20px 100%, 100% 100%);
        color: white;
        align-items: center;
        justify-content: center;
        padding: 0 25px 0 40px;
        background: #192042;
        height: 30px;
        position: absolute;
        text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black, 0px 0px 2px black;
    }
    `;
    
    document.head.appendChild(playerArrowStyle);
    document.head.appendChild(arrowStyle);

    //MIXINS

    //keep track of what trackid the current track is (check if the track is polydip)
    polyModLoader.registerFuncMixin("UR", MixinType.INSERT, `{`, `ActivePolyModLoader.getMod("${this.modID}").trackId = OR(this, TR, "f");console.log(OR(this, TR, "f"));ActivePolyModLoader.getMod("${this.modID}").playerName = JSON.parse(localStorage.getItem(polytrack_v4_prod_user_${OR(this, MR, "f").profileSlot})).nickname;`)

    //main ui from here
    polyModLoader.registerFuncMixin("dP", MixinType.INSERT, 'if (e) {', `
        if(ActivePolyModLoader.getMod("pdip").trackId == "8cbcb138be4608cbc2b12f956dfadcf66ebfcf013788f0f34abc2603909fde50"){ActivePolyModLoader.getMod("pdip").createPolyDipUI("690", ActivePolyModLoader.getMod("pdip").playerName, 0};
    `);

    this.car = null;
    this.spectator = null;
    polyModLoader.registerFuncMixin("pP", MixinType.INSERT, `yP(this, eP, "f").setColors(n.carColors),`, `ActivePolyModLoader.getMod("${this.modID}").car = yP(this, eP, "f"),`)
    polyModLoader.registerClassMixin("s_.prototype", "addToggleListener", MixinType.INSERT, `a_(this, QT, "f").push(e)`, `,ActivePolyModLoader.getMod("${this.modID}").spectator = this;`);
    polyModLoader.registerFuncMixin("polyInitFunction", MixinType.INSERT, `y.setAnimationLoop((function(e) {`, `ActivePolyModLoader.getMod("pdip").update();`)
    polyModLoader.registerClassMixin("pk.prototype", "dispose", MixinType.INSERT, `{`, `ActivePolyModLoader.getMod("pdip").removePolyDipUI();`)

    }
    update = function() {
        if(this.car) {
            this.updateHeight(this.car ? this.car.getPosition().y : 35);
        }
    }
}

export let polyMod = new pdipMod();
