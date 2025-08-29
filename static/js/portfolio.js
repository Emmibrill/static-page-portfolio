
particlesJS("particles-js", {
    particles: {
    number: { value: 80 },
    color: { value: "#44d624" },
    shape: { type: "circle" },
    opacity: { value: 0.2 },
    size: { value: 3 },
    line_linked: {
        enable: true,
        distance: 120,
        color: "#0ff",
        opacity: 1,
        width: 1
    },
    move: { enable: true, speed: 1.5 }
    },
    interactivity: {
    events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
    }
    },
    retina_detect: true
});
