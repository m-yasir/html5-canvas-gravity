const colors = ["#5C4B51", "#8CBEB2", "#F2EBBF", "#F3B562", "#F06060"];

function randomColor() {
    // return `#${Math.floor(Math.random() * 25542195).toString(16)}`;
    return colors[Math.floor(Math.random() * colors.length)];
}

class Circle {
    antiClockwise;
    color;
    endAngle;
    radius;
    defaultRadius;
    maxSpeed;
    fillColor = randomColor();
    isFill;
    startAngle;
    x;
    y;
    xVel;
    yVel;

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} startAngle
     * @param {number} endAngle
     * @param {number} maxSpeed
     * @param {boolean} isFill
     * @param {string} color
     * @param {boolean} antiClockwise
     */

    constructor(
        x,
        y,
        radius,
        startAngle,
        endAngle,
        maxSpeed = 5,
        isFill = true,
        color = randomColor(),
        antiClockwise = false
    ) {
        this.antiClockwise = antiClockwise;
        this.color = color;
        this.endAngle = endAngle;
        this.isFill = isFill;
        this.maxSpeed = maxSpeed;
        this.radius = radius;
        this.defaultRadius = radius;
        this.startAngle = startAngle;
        this.x = x;
        this.y = y;
        this.xVel = (Math.random() - 0.5) * maxSpeed;
        this.yVel = (Math.random() - 0.5) * maxSpeed;
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} startAngle
     * @param {number} endAngle
     * @param {string} color
     * @param {string} fillColor
     * @param {boolean} antiClockwise
     */
    createArc(
        x,
        y,
        radius,
        startAngle,
        endAngle,
        color,
        fillColor,
        antiClockwise = false
    ) {
        c.beginPath();
        c.arc(x, y, radius, startAngle, endAngle, antiClockwise);
        c.strokeStyle = color;
        c.stroke();
        c.fillStyle = fillColor;
        if (this.isFill) c.fill();
    }

    draw() {
        this.createArc(
            this.x,
            this.y,
            this.radius,
            this.startAngle,
            this.endAngle,
            this.color,
            this.fillColor,
            this.antiClockwise
        );
    }

    // calculates and calls draw method to draw circle on newer position.
    update() {
        if (this.x + 30 >= innerWidth || this.x - 30 <= 0) {
            c.fillStyle = this.xVel = -this.xVel;
        }
        if (this.y + 30 >= innerHeight || this.y - 30 <= 0) {
            this.yVel = -this.yVel;
        }
        this.x += this.xVel;
        this.y += this.yVel;
        if (mouse) {
            if (
                mouse.x !== undefined &&
                mouse.y !== undefined &&
                Math.abs(mouse.x - this.x) < 50 &&
                Math.abs(mouse.y - this.y) < 50 &&
                this.radius <= 100 // can set max radius here
            ) {
                this.radius += 4;
            } else if (this.radius > this.defaultRadius) {
                // can set min radius here
                this.radius -= 1;
            }
        }
        this.draw();
    }
}
