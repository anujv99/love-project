class Vec {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  rotate(ang: number) {
    const x = this.x;
    const y = this.y;
    const s = Math.sin(ang);
    const c = Math.cos(ang);
    this.x = c * x - s * y;
    this.y = s * x + c * y;
    return this;
  }

  mult(n: number) {
    this.x *= n;
    this.y *= n;
    return this;
  }

  len() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  sub(n: number) {
    this.x -= n;
    this.y -= n;
    return this;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  clone() {
    return new Vec(this.x, this.y);
  }
}

export default Vec;
