const blk_pitn = {
        block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
        block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
        block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
        block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
        block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
        block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
        block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]], /* 3 */
        block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
        block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
        block11: [[2, 0], [0, 0], [-1, 0], [1, 0]], /* — */
        block12: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
        block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]], /* 7 */
        block17: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block19: [[0, -1], [0, 0], [-1, 0], [1, 0]], /* 9 */
        block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block22: [[1, 1], [0, 0], [-1, 0], [1, 0]], /* 14 */
        block23: [[0, 2], [0, 0], [0, -1], [0, 1]]      /* | */
    },
    offset_pitn = {
        block1: [5, 3],
        block2: [5, 1],
        block3: [3, 4],
        block4: [3, 2],
        block5: [3, -1],
        block6: [2, 5],
        block7: [2, 1],
        block8: [1, -1],
        block9: [1, -3],
        block10: [1, 2],
        block11: [0, 3],
        block12: [0, 0], 
        block13: [-1, -4],
        block14: [0, -2],
        block15: [-2, 4],
        block16: [-2, 2],
        block17: [-2, 0],
        block18: [-3, -2],
        block19: [-4, 0],
        block20: [-3, 5],
        block21: [-5, 3],
        block22: [-4, 1],
        block23: [-6, 1]   
    };

let blocks = document.getElementsByClassName("block"),
    block = blocks[0],
    love = document.getElementsByClassName("love")[0],
    timer = null,
    index = 0, 
    clone_block;    

block.style.top = "50%";
block.style.left = "50%";
block.style.margin = "-20px 0 0 -20px";

const block_left = parseFloat(window.getComputedStyle(block, null).left.slice(0, -2)),
    block_top = parseFloat(window.getComputedStyle(block, null).top.slice(0, -2));

function Next() {
    if (++index >= 24) {
        clearInterval(timer);

        Rise();
        return;
    }

    block.style.visibility = "visible"; 

    block.style.left = block_left + 40 * offset_pitn["block" + index][0] + "px";
    block.style.top = block_top - 40 * offset_pitn["block" + index][1] + "px";
    for (let i = 0; i < block.children.length; i++) {
        block.children[i].style.left = blk_pitn["block" + index][i][0] * -40 + "px";
        block.children[i].style.top = blk_pitn["block" + index][i][1] * -40 + "px";
    }

    clone_block = block.cloneNode(true);
    love.appendChild(clone_block);

    if (love.children.length >= 24) {
        blocks[blocks.length - 1].children[2].style.display = "none";
        block.style.display = "none";   
    }
}

function Rise() {
    console.log("开始升空");
    let timer2 = null,
        distance = 0;
    const target = 120, 
        speed = 1;

    let love_top = parseFloat(window.getComputedStyle(love, null).top.slice(0, -2));


    timer2 = setInterval(() => {
        distance += speed;
        // console.log(distance);
        if (distance >= target) {
            clearInterval(timer2);

            console.log("升空完毕");

        }

        love.style.top = (love_top - distance) + "px";

    }, 22);

    startFireworks();
    showProposalBanner();
}

window.onload = function () {
    setTimeout(() => {

        timer = setInterval(() => {
            Next();
        }, 300);


    }, 12000);
};

function startFireworks() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworksCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * (canvas.height / 2);
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.radius = 2;
            this.exploded = false;
            this.particles = [];
        }

        update() {
            if (!this.exploded) {
                this.y -= 5;
                if (this.y <= this.targetY) {
                    this.exploded = true;
                    for (let i = 0; i < 30; i++) {
                        const angle = Math.random() * 2 * Math.PI;
                        const speed = Math.random() * 4 + 1;
                        this.particles.push({
                            x: this.x,
                            y: this.y,
                            dx: Math.cos(angle) * speed,
                            dy: Math.sin(angle) * speed,
                            alpha: 1
                        });
                    }
                }
            } else {
                this.particles.forEach(p => {
                    p.x += p.dx;
                    p.y += p.dy;
                    p.dy += 0.05; // gravity
                    p.alpha -= 0.02;
                });
                this.particles = this.particles.filter(p => p.alpha > 0);
            }
        }

        draw(ctx) {
            if (!this.exploded) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                ctx.fillStyle = this.color;
                ctx.fill();
            } else {
                this.particles.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = p.alpha;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                });
            }
        }

        isDone() {
            return this.exploded && this.particles.length === 0;
        }
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05) {
            fireworks.push(new Firework());
        }

        fireworks.forEach(f => {
            f.update();
            f.draw(ctx);
        });

        for (let i = fireworks.length - 1; i >= 0; i--) {
            if (fireworks[i].isDone()) {
                fireworks.splice(i, 1);
            }
        }

        requestAnimationFrame(animateFireworks);
    }

    animateFireworks();
}

function showProposalBanner() {
    const banner = document.createElement('div');
    banner.innerText = '🥰 Namora comigo? 🥰';
    banner.style.position = 'fixed';
    banner.style.top = '50%';
    banner.style.left = '50%';
    banner.style.transform = 'translate(-50%, -50%)';
    banner.style.fontSize = '4rem';
    banner.style.fontWeight = 'bold';
    banner.style.fontFamily = 'Arial, sans-serif';
    banner.style.color = 'white';
    banner.style.textShadow = `
        2px 2px 0 #ff0080,
        -2px 2px 0 #00ffff,
        2px -2px 0 #ffff00,
        -2px -2px 0 #ff0000
    `;
    banner.style.zIndex = '99999';
    banner.style.animation = 'pulse 1.5s infinite';
    document.body.appendChild(banner);

    // Adiciona animação via CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}
