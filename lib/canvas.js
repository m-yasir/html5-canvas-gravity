const colors = ["#5C4B51", "#8CBEB2", "#F2EBBF", "#F3B562", "#F06060"];

/**
 * @description Takes a range and returns a random number between the range (inclusive)
 * @param {number} min - minimum number for range
 * @param {number} max - maximum number for range
 * @returns {number}
 */
function randIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

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
    fillColor;
    isFill;
    startAngle;
    x;
    y;
    xVel;
    yVel;
    gravity = 1;
    friction = 0.99;

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} xVel
     * @param {number} yVel
     * @param {number} radius
     * @param {number} startAngle
     * @param {number} endAngle
     * @param {boolean} isFill
     * @param {string} color
     * @param {string} fillColor
     * @param {boolean} antiClockwise
     */

    constructor(
        x,
        y,
        xVel,
        yVel,
        radius,
        startAngle,
        endAngle,
        isFill = true,
        color = randomColor(),
        fillColor = randomColor(),
        antiClockwise = false
    ) {
        this.antiClockwise = antiClockwise;
        this.color = color;
        this.endAngle = endAngle;
        this.fillColor = fillColor;
        this.isFill = isFill;
        this.radius = radius;
        this.defaultRadius = radius;
        this.startAngle = startAngle;
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
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
        if (
            this.y + this.radius > innerHeight - this.radius &&
            Math.round(this.yVel) > 0
        ) {
            this.yVel = -this.yVel * this.friction; // Adds friction to ball each time it hits bottom of canvas (ground).
        } else {
            this.yVel += this.gravity; // Adds gravity to ball if it position is -ve i.e. returning to air for bounce or if position is positive i.e. move towards bottom of canvas (ground).
        }
        this.y += this.yVel;
        this.draw();
    }
}
