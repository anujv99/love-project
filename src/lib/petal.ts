import Bloom from "./bloom";
import Vec from "./vec";

class Petal {
  stretchA: number;
  stretchB: number;
  startAngle: number;
  angle: number;
  bloom: Bloom;
  growFactor: number;
  r = 1;
  isfinished = false;

  constructor(
    stretchA: number,
    stretchB: number,
    startAngle: number,
    angle: number,
    growFactor: number,
    bloom: Bloom,
  ) {
    this.stretchA = stretchA;
    this.stretchB = stretchB;
    this.startAngle = startAngle;
    this.angle = angle;
    this.bloom = bloom;
    this.growFactor = growFactor;
  }

  draw() {
    const ctx = this.bloom.garden.ctx;
    const v1 = new Vec(0, this.r).rotate(
      this.bloom.garden.degrad(this.startAngle),
    );
    const v2 = v1.clone().rotate(this.bloom.garden.degrad(this.angle));
    const v3 = v1.clone().mult(this.stretchA); //.rotate(this.tanAngleA);
    const v4 = v2.clone().mult(this.stretchB); //.rotate(this.tanAngleB);
    ctx.strokeStyle = this.bloom.c;
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
    ctx.stroke();
  }

  render() {
    if (this.r <= this.bloom.r) {
      this.r += this.growFactor; // / 10;
      this.draw();
    } else {
      this.isfinished = true;
    }
  }
}

export default Petal;
