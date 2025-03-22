import Garden from "./garden";
import Petal from "./petal";
import Vec from "./vec";

class Bloom {
  p: Vec;
  r: number;
  c: string;
  pc: number;
  petals: Petal[];
  garden: Garden;

  constructor(p: Vec, r: number, c: string, pc: number, garden: Garden) {
    this.p = p;
    this.r = r;
    this.c = c;
    this.pc = pc;
    this.petals = [];
    this.garden = garden;
    this.init();
    this.garden.addBloom(this);
  }

  init() {
    const angle = 360 / this.pc;
    const startAngle = this.garden.randomInt(0, 90);
    for (let i = 0; i < this.pc; i++) {
      this.petals.push(
        new Petal(
          this.garden.random(
            this.garden.options.petalStretch.min,
            this.garden.options.petalStretch.max,
          ),
          this.garden.random(
            this.garden.options.petalStretch.min,
            this.garden.options.petalStretch.max,
          ),
          startAngle + i * angle,
          angle,
          this.garden.random(
            this.garden.options.growFactor.min,
            this.garden.options.growFactor.max,
          ),
          this,
        ),
      );
    }
  }

  draw() {
    let p: Petal;
    let isfinished = true;
    this.garden.ctx.save();
    this.garden.ctx.translate(this.p.x, this.p.y);
    for (let i = 0; i < this.petals.length; i++) {
      p = this.petals[i];
      p.render();
      isfinished &&= p.isfinished;
    }
    this.garden.ctx.restore();
    if (isfinished == true) {
      this.garden.removeBloom(this);
    }
  }
}

export default Bloom;
