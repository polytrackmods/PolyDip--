import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";

class pdipMod extends PolyMod {  
  init = function(polyModLoader) {

    //define variables

    this.trackId = null;

    //keep track of what trackid the current track is (check if the track is polydip)
    polyModLoader.registerClassWideMixin("FR.prototype", MixinType.INSERT, "var v;", () => {
      this.trackId = c;
      console.log(c);
    });
  }
}

export let polyMod = new pdipMod();
