document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    return `./images/male${String(index).padStart(4, "0")}.png`; // Adjust file naming
  }

  const frameCount = 300;
  const images = [];
  const imageSeq = { frame: 1 };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.15,
      trigger: "#page>canvas",
      start: "top top",
      end: "600% top",
      scroller: "#main",
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    if (images[imageSeq.frame]) {
      scaleImage(images[imageSeq.frame], context);
    }
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  ScrollTrigger.create({
    trigger: "#page>canvas",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "600% top",
  });
});
