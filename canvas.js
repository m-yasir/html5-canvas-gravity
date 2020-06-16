const canvas = document.querySelector("canvas");

canvas.height = innerHeight;
canvas.width = innerWidth;

// c = context
const c = canvas.getContext("2d");

// Supposed to be called the first time when the script loads up (requires lib/canvas to be loaded in html)
const init = () => {
    /**
     * @type Circle[]
     */
    const circles = [];
    for (let i = 0; i < 25; i++) {
        const r = 40;
        const x = randIntRange(r, innerWidth - r);
        const y = randIntRange(r, innerHeight / 1.3 - r);
        circles.push(new Circle(x, y, 2, 2, r, 0, Math.PI * 2));
    }

    // recursive animate function that animates circles and calls update for each circle to update calculate and update its position
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);
        circles.forEach((circle) => {
            circle.update();
        });
    }

    animate();
};

// Resize event to resize canvas and refresh circles positions on canvas.
window.addEventListener("resize", () => {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    init();
});

// Calls init first time to draw circles when script loads.
init();
