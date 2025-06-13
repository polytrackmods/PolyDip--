import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";

class pdipMod extends PolyMod {  
  init = function(polyModLoader) {

    //define variables

    this.trackId = null;
    this.heightText = null;
    this.pbText = null;
    this.barDiv = null;
    this.pbArrow = null;
    this.playerArrow = null;
    this.floorHeights = [35, 105, 245, 365, 500, 645, 770, 885, 1025, 1150, 1295, 1425, 1580, 1720, 1855, 1990, 2110, 2395];
    this.popupInfo = [["Cold Beginning", "#5DE2E7"],["xddlent", "#FFECA1"],["Summer Slide", "#FFCC00"],["You're Skewed", "#FFFFFF"],["Thawing Temple", "#E75480"],["The Knot", "#7DDA58"],["The Sponge", "#060270"],["Koopa Troopa", "#b9f2ff"],["Strawberry Cheesecake", "#8b0000"],["Ice Gold", "#FE9900"],["Missing Pieces", "#020202"],["Paarse Ramp", "#CC6CE7"],["Iolites Trace", "#FFB6C1"],["Spider Sense", "#013220"],["Scared of Dragons?", "#CECECE"],["On the Edge", "#FD7C79"]];
    this.greenTimer = null;
    this.timeLength = 0;
    this.stopWatch = null;
    this.playerSimHeight = 35;
    this.polyDipEnabled = false;
    this.trackId = null;

      //SETTINGS BOOLS
    this.barSetting = true;  //Side Bar
    this.popupSetting = true;   //Floor Number Popup
    this.timerSetting = true; //Green timer total time

    //FUNCTIONS

    this.createPolyDipUI = function(pb, player_name, timer_value="0") {
    
        this.polyDipEnabled = true;
    
        
        const uiDiv = document.getElementById("ui");
    
        const leftDiv = document.createElement("div");
        leftDiv.className = "leftDiv"
        leftDiv.id = "leftDiv"
        leftDiv.style.position = "absolute";
        leftDiv.style.left = "0";
        leftDiv.style.height = "100%";
    
        uiDiv.appendChild(leftDiv);
    
        
        createFloorPopupUI(uiDiv);
    
        
        this.barDiv = document.createElement("div");
    
        if (!this.barSetting) {barDiv.style.opacity = "0"};
        
        const bar = document.createElement("div");
        bar.className = "height-bar"
        this.barDiv.className = "height-bar-div"
    
        leftDiv.appendChild(this.barDiv);
        this.barDiv.appendChild(bar);
    
        this.playerArrow = document.createElement("div")
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
    
        this.pbArrow = document.createElement("div")
        this.pbArrow.className = "arrow";
        this.pbArrow.style.background = "#00b8be";
        this.pbArrow.style.bottom = `${roundNumber(pb)}%`;
        this.pbArrow.style.zIndex = "1";
        this.barDiv.appendChild(this.pbArrow);
    
        const pbinnerText = document.createElement("p");
        pbinnerText.textContent = "PB";
        pbinnerText.style.transform = "translateX(-5px)";
    
        this.pbArrow.appendChild(pbinnerText);
    
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
    
        this.greenTimer = document.createElement("div");
        this.greenTimer.className = "green-timer";
        this.greenTimer.id = "green-timer";
    
        if (!this.timerSetting) {this.greenTimer.style.opacity = "0"};
    
        uiDiv.appendChild(this.greenTimer);
    
        this.timeLength = timer_value
    
        const timer = document.createElement("p");
        timer.textContent = formatSeconds(timer_value);
    
        this.stopWatch = new Stopwatch(timer);
    
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
        `
    
        document.head.appendChild(timerDivStyle);
    };


    //MIXINS

    //keep track of what trackid the current track is (check if the track is polydip)
    polyModLoader.registerClassWideMixin("FR.prototype", MixinType.INSERT, "var v;", () => {
      this.trackId = c;
      console.log(c);
    });

    //main ui from here
    polyModLoader.registerClassWideMixin("pk.prototype", MixinType.INSERT, "uk(this, Xx, "f").appendChild(uk(this, Zx, "f"))", () => {
      if (trackId == "8cbcb138be4608cbc2b12f956dfadcf66ebfcf013788f0f34abc2603909fde50") {this.createPolyDipUI("690", "DoraChad", 33)};
    });
  }
}

export let polyMod = new pdipMod();
