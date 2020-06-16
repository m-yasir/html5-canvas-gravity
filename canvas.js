const canvas = document.querySelector("canvas");

canvas.height = innerHeight;
canvas.width = innerWidth;

// c = context
const c = canvas.getContext("2d");

const mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Supposed to be called the first time when the script loads up (requires lib/canvas to be loaded in html)
const init = () => {
    /**
     * @type Circle[]
     */
    const circles = []; //
    for (let i = 0; i < 10; i++) {
        let r = 30;
        let x = Math.random() * (innerWidth - r * 2) + r;
        let y = Math.random() * (innerHeight - r * 2) + r;
        circles.push(
            new Circle(x, y, r, 0, Math.PI * 2, Math.random() * 8 + 1)
        );
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
