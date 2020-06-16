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
    const circles = [];
    for (let i = 0; i < 200; i++) {
        const r = 25;
        const x = randIntRange(r, innerWidth - r);
        const y = randIntRange(r, innerHeight / 1.3 - r);
        circles.push(new Circle(x, y, 2, 2, 20, 0, Math.PI * 2));
    }
    /**
     * @type Circle
     */
    // const circle = new Circle(
    //     canvas.width / 2,
    //     canvas.height / 2,
    //     2,
    //     2,
    //     20,
    //     0,
    //     Math.PI * 2,
    //     true,
    //     colors[4],
    //     colors[4]
    // );

    // recursive animate function that animates circles and calls update for each circle to update calculate and update its position
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, innerWidth, innerHeight);
        circles.forEach((circle) => {
            circle.update();
        });
        // circle.update();
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
