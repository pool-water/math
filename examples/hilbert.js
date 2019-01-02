let AXIOM = "L";

let PRODUCTION = {
  "L": "+RF-LFL-FR+",
  "R": "-LF+RFR+FL-",
}

function hilbert(n) {
  return svv.lsystem("L", PRODUCTION, n);
}

class Hilbert {
  constructor(el, n) {
    this.el = el;
    this.context = this.el.getContext("2d");
    this.iterations = n;
  }

  setup() {
    this.instructions = hilbert(this.iterations);
    this.points = this.getPoints();
  }

  rotateRight([x, y]) {
    return [-y, x]; }

  rotateLeft([x, y]) {
    return [y, -x];
  }

  getBounds() {
    let ul = {x: Infinity, y: -Infinity};
    let lr = {x: -Infinity, y: Infinity};

    this.points.forEach(p => {
      let [x, y] = p;

      if (x < ul.x) {
        ul.x = x;
      }

      if (x > lr.x) {
        lr.x = x;
      }

      if (y > ul.y) {
        ul.y = y;
      }

      if (y < lr.y) {
        lr.y = y;
      }
    });

    return [[ul.x, ul.y], [lr.x, lr.y]];
  }

  draw() {
    console.log(this.points);
    console.log(this.points.length);

    let bounds = this.getBounds();
    let width = bounds[1][0] - bounds[0][0];
    let height = bounds[0][1] - bounds[1][1];

    let w = this.el.width-8;
    let h = this.el.height-8;

    this.context.save();

      this.context.lineWidth = 3;
      this.context.scale(w/width, h/height);
      this.context.translate(2, 2);

      this.context.moveTo(this.points[0][0], this.points[0][1]);

      this.points.forEach(p => {
        let [x, y] = p;
        this.context.lineTo(x, y);
      });

      this.context.stroke();

    this.context.restore();
  }

  getPoints() {
    let p = [0, 0];
    let d = [8, 0];

    let points = [p];


    for (let i=0; i < this.instructions.length; i++) {
      let ch = this.instructions[i];

      switch (ch) {
      case '-':
        d = this.rotateLeft(d);
        break;

      case '+':
        d = this.rotateRight(d);
        break;

      case 'F':
        p = [p[0]+d[0], p[1]+d[1]];
        points.push(p);

      default:
        break;
      }
    }

    return points;
  }
}

let app = new Hilbert(document.getElementById("you-know"), 7);
app.setup();
app.draw();
