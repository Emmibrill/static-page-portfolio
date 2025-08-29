
import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

const canvasElements = document.querySelectorAll(".lottie");

canvasElements.forEach(canvas => {
    const src = canvas.dataset.src;
    new DotLottie({
        autoplay: true,
        loop: true,
        canvas: canvas,
        src: src
    });
});
