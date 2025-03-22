import Bloom from "./bloom";
import Vec from "./vec";

class Garden {
  blooms: Bloom[];
  element: HTMLElement;
  ctx: CanvasRenderingContext2D;

  options = {
    petalCount: {
      min: 8,
      max: 15,
    },
    petalStretch: {
      min: 0.1,
      max: 3,
    },
    growFactor: {
      min: 0.1,
      max: 1,
    },
    bloomRadius: {
      min: 8,
      max: 10,
    },
    density: 10,
    growSpeed: 1000 / 60,
    color: {
      rmin: 128,
      rmax: 255,
      gmin: 0,
      gmax: 128,
      bmin: 0,
      bmax: 128,
      opacity: 0.1,
    },
    tanAngle: 60,
  };

  circle = 2 * Math.PI;

  constructor(ctx: CanvasRenderingContext2D, el: HTMLElement) {
    this.blooms = [];
    this.ctx = ctx;
    this.element = el;
  }

  render() {
    this.blooms.forEach((b) => {
      b.draw();
    });
  }

  addBloom(b: Bloom) {
    this.blooms.push(b);
  }

  removeBloom(b: Bloom) {
    let bloom: Bloom;
    for (let i = 0; i < this.blooms.length; i++) {
      bloom = this.blooms[i];
      if (bloom === b) {
        this.blooms.splice(i, 1);
        return this;
      }
    }
  }

  createRandomBloom(x: number, y: number) {
    this.createBloom(
      x,
      y,
      this.randomInt(
        this.options.bloomRadius.min,
        this.options.bloomRadius.max,
      ),
      this.randomrgba(
        this.options.color.rmin,
        this.options.color.rmax,
        this.options.color.gmin,
        this.options.color.gmax,
        this.options.color.bmin,
        this.options.color.bmax,
        this.options.color.opacity,
      ),
      this.randomInt(this.options.petalCount.min, this.options.petalCount.max),
    );
  }

  createBloom(x: number, y: number, r: number, c: string, pc: number) {
    new Bloom(new Vec(x, y), r, c, pc, this);
  }

  clear() {
    this.blooms = [];
    const { width, height } = this.element.getBoundingClientRect();
    this.ctx.clearRect(0, 0, width, height);
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  degrad(angle: number) {
    return (this.circle / 360) * angle;
  }

  raddeg(angle: number) {
    return (angle / this.circle) * 360;
  }

  rgba(r: number, g: number, b: number, a: number) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  randomrgba(
    rmin: number,
    rmax: number,
    gmin: number,
    gmax: number,
    bmin: number,
    bmax: number,
    a: number,
  ) {
    const r = Math.round(this.random(rmin, rmax));
    const g = Math.round(this.random(gmin, gmax));
    const b = Math.round(this.random(bmin, bmax));
    const limit = 5;
    if (
      Math.abs(r - g) <= limit &&
      Math.abs(g - b) <= limit &&
      Math.abs(b - r) <= limit
    ) {
      return this.rgba(rmin, rmax, gmin, gmax);
    } else {
      return this.rgba(r, g, b, a);
    }
  }
}

export default Garden;
