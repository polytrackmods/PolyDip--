import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";

class pdipMod extends PolyMod {  
  init = function(polyModLoader) {

    //define variables

    this.trackId;

    //keep track of what trackid the current track is (check if the track is polydip)
    polyModLoader.registerFuncMixin("FR.prototype", MixinType.INSERT, 'constructor(e, t, n, i, r, a, s, o, l, c, h, d, u, p, f, m, g) {', () => {
      this.trackId = c;
      console.log(c);
  }
}

export let polyMod = new pdipMod();
