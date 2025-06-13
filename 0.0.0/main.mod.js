import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";

class pdipMod extends PolyMod {  
  init = function(polyModLoader) {

    //define variables
    let heightText;
    let pbText;
    let barDiv;
    let pbArrow;
    let playerArrow;
    const floorHeights = [35, 105, 245, 365, 500, 645, 770, 885, 1025, 1150, 1295, 1425, 1580, 1720, 1855, 1990, 2110, 2395];
    const popupInfo = [["Cold Beginning", "#5DE2E7"],["xddlent", "#FFECA1"],["Summer Slide", "#FFCC00"],["You're Skewed", "#FFFFFF"],["Thawing Temple", "#E75480"],["The Knot", "#7DDA58"],["The Sponge", "#060270"],["Koopa Troopa", "#b9f2ff"],["Strawberry Cheesecake", "#8b0000"],["Ice Gold", "#FE9900"],["Missing Pieces", "#020202"],["Paarse Ramp", "#CC6CE7"],["Iolites Trace", "#FFB6C1"],["Spider Sense", "#013220"],["Scared of Dragons?", "#CECECE"],["On the Edge", "#FD7C79"]];
    let greenTimer;
    let timeLength = 0;
    let stopWatch;
    let playerSimHeight = 35;
    let polyDipEnabled = false;
    let trackId;
    let trackId = null;

      //SETTINGS BOOLS
    let barSetting = true;  //Side Bar
    let popupSetting = true;   //Floor Number Popup
    let timerSetting = true; //Green timer total time

    //FUNCTIONS

    const createFloorPopupUI = function(uiDiv) {
      
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

    const createPolyDipUI = function(pb, player_name, timer_value="0") {
    
        polyDipEnabled = true;
    
        
        const uiDiv = document.getElementById("ui");
    
        const leftDiv = document.createElement("div");
        leftDiv.className = "leftDiv"
        leftDiv.id = "leftDiv"
        leftDiv.style.position = "absolute";
        leftDiv.style.left = "0";
        leftDiv.style.height = "100%";
    
        uiDiv.appendChild(leftDiv);
    
        
        createFloorPopupUI(uiDiv);
    
        
        barDiv = document.createElement("div");
    
        if (!barSetting) {barDiv.style.opacity = "0"};
        
        const bar = document.createElement("div");
        bar.className = "height-bar"
        barDiv.className = "height-bar-div"
    
        leftDiv.appendChild(barDiv);
        barDiv.appendChild(bar);
    
        playerArrow = document.createElement("div")
        playerArrow.className = "player-arrow";
        playerArrow.style.bottom = "1.5%";
        barDiv.appendChild(playerArrow);
    
        const playerName = document.createElement("p");
        playerName.textContent = player_name;
    
        playerArrow.appendChild(playerName);
    
        const textDiv = document.createElement("div");
        textDiv.className = "pd-text-div";
    
        leftDiv.appendChild(textDiv);
    
        heightText = document.createElement("p");
        heightText.textContent = "Height: 35m (1.5%)";
        heightText.style.textShadow = "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, 0px 0px 5px black";
        
        pbText = document.createElement("p");
        pbText.textContent = `PB: ${pb}m`;
        pbText.style.textShadow = "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, 0px 0px 5px black";
    
        textDiv.appendChild(heightText);
        textDiv.appendChild(pbText);
    
        pbArrow = document.createElement("div")
        pbArrow.className = "arrow";
        pbArrow.style.background = "#00b8be";
        pbArrow.style.bottom = `${roundNumber(pb)}%`;
        pbArrow.style.zIndex = "1";
        barDiv.appendChild(pbArrow);
    
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
    
        createFloorMarkers();
    
        greenTimer = document.createElement("div");
        greenTimer.className = "green-timer";
        greenTimer.id = "green-timer";
    
        if (!timerSetting) {greenTimer.style.opacity = "0"};
    
        uiDiv.appendChild(greenTimer);
    
        timeLength = timer_value
    
        const timer = document.createElement("p");
        timer.textContent = formatSeconds(timer_value);
    
        stopWatch = new Stopwatch(timer);
    
        greenTimer.appendChild(timer);   
    
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
        `
    
        document.head.appendChild(timerDivStyle);
    };


    //MIXINS

    //keep track of what trackid the current track is (check if the track is polydip)
    polyModLoader.registerClassWideMixin("FR.prototype", MixinType.INSERT, "var v;", () => {
      trackId = c;
      console.log(c);
    });

    //main ui from here
    polyModLoader.registerClassWideMixin("pk.prototype", MixinType.INSERT, 'uk(this, Xx, "f").appendChild(uk(this, Zx, "f"))', () => {
      if (trackId == "8cbcb138be4608cbc2b12f956dfadcf66ebfcf013788f0f34abc2603909fde50") {createPolyDipUI("690", "DoraChad", 33)};
    });
  }
}

export let polyMod = new pdipMod();
