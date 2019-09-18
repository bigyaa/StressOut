(function () {
    let canvas = document.getElementById("canvas");

    let Engine = Matter.Engine,
        Render = Matter.Render,
        Bodies = Matter.Bodies,
        World = Matter.World,
        Composites = Matter.Composites,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;

    let engine = Engine.create();

    let render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: canvas.width,
            height: canvas.height,
            wireframes: false,
        }
    });

    let particleOptions = {
        friction: 1,
        frictionStatic: 1,
        frictionAir: 2,
        // density: 1,
        render: {
            visible: true,
        },
        isStatic: false
    };

    let wall = (x, y, width, height) => {
        return Bodies.rectangle(x, y, width, height, {
            isStatic: true, render: {
                fillStyle: 'black'
            }
        });
    };

    let softbody = Composites.softBody(250, 100, 5, 5, 0, 0, true, 12, particleOptions);
    console.log(softbody);

    World.add(engine.world, [
        Composites.softBody(250, 100, 1, 5, 0, 0, true, 12, particleOptions),
        Composites.softBody(400, 300, 8, 3, 0, 0, true, 15, particleOptions),

        wall(canvas.width / 2, 0, canvas.width, 1), //top
        wall(canvas.width / 2, canvas.height, canvas.width, 1), //bottom
        wall(canvas.width, canvas.height / 2, 1, canvas.height), //right
        wall(0, canvas.height / 2, 1, canvas.height) //left
    ]);

    // add mouse control
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.3,
                render: {
                    visible: false
                }
            }
        });

    World.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    Engine.run(engine);
    Render.run(render);
})();