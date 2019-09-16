(function () {
    console.log("HELLO", Matter);

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
        friction: 0.05,
        frictionStatic: 0.1,
        render: {
            visible: true,
            sprite: {
                texture: './images/box.png',
            }
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

    World.add(engine.world, [
        Composites.softBody(250, 100, 5, 5, 0, 0, true, 18, particleOptions),
        Composites.softBody(400, 300, 8, 3, 0, 0, true, 15, particleOptions),
        Composites.softBody(250, 400, 4, 4, 0, 0, true, 15, particleOptions),

        Bodies.circle(200, 100, 30, {
            isStatic: false,
            restitution: 0.7,
        }),
        wall(390, 10, 800, 20),
        wall(390, 470, 800, 20),
        wall(790, 300, 20, 600),
        wall(10, 290, 20, 600)
    ]);

    // add mouse control
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.9,
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