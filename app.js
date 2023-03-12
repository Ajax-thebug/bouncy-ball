const canvas = document.querySelector(".canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

const frameCount = 179;

let folderName = "balls"; // Default folder name
let currentFrame = (index) => `./${folderName}/${(index + 1).toString()}.jpg`;

// let currentFrame = (index) => `./balls/${(index + 1).toString()}.jpg`;
//
// const hdimages = (index) => `./best-ball/${(index + 1).toString()}.jpg`;

const images= [];

let ball = {frame:0};

for(let i=0; i<frameCount; i++){

    const img = new Image();
    img.src = currentFrame(i);

    images.push(img);

}

gsap.to(ball, {
    frame: frameCount -1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: "true",
        pin: "canvas",
        end: "500%",
    },

    onUpdate: function() {
        requestAnimationFrame(render);
        },

})

gsap.fromTo(".ball-text",{opacity:0},
    {
    opacity: 1,
    scrollTrigger: {
        scrub: true,
        start: "50%",
        end: "60%",
    },
    onComplete: () => {
        gsap.to(".ball-text",{opacity:0})
    }

})


images[0].onload = render;

function render() {
    const image = images[ball.frame];

    // Resize the canvas to match the dimensions of the current image
    canvas.width = image.width;
    canvas.height = image.height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[ball.frame], 0, 0);
}

const toggleButton = document.querySelector("#toggle-button");

toggleButton.addEventListener("click", function() {
    if (folderName === "balls") {
        folderName = "best-ball";
    } else {
        folderName = "balls";
    }

    for (let i = 0; i < frameCount; i++) {
        images[i].src = currentFrame(i);
    }
});



