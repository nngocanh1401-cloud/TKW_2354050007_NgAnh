export function initSlider() {
    const root =
        document.getElementById(
            "testimonial-slider"
        );

    if (!root) return;

    const track =
        root.querySelector(
            "[data-slider-track]"
        );

    const slides = [
        ...root.querySelectorAll(
            "[data-slide]"
        ),
    ];

    const prev =
        root.querySelector(
            "[data-slider-prev]"
        );

    const next =
        root.querySelector(
            "[data-slider-next]"
        );

    const dots =
        root.querySelector(
            "[data-slider-dots]"
        );

    if (
        !track ||
        !slides.length ||
        !prev ||
        !next ||
        !dots
    ) {
        return;
    }

    let index = 0;
    let timer = null;

    const dotButtons = slides.map(
        (_, slideIndex) => {
            const button =
                document.createElement(
                    "button"
                );

            button.type = "button";

            button.setAttribute(
                "aria-label",
                `Đi tới cảm nhận ${slideIndex + 1}`
            );

            button.className =
                "h-3 w-3 rounded-full bg-line";

            button.addEventListener(
                "click",
                () => {
                    go(slideIndex);
                }
            );

            dots.append(button);

            return button;
        }
    );

    function go(nextIndex) {
        index =
            (nextIndex + slides.length) %
            slides.length;

        track.style.transform =
            `translateX(-${index * 100}%)`;

        slides.forEach(
            (slide, slideIndex) => {
                slide.toggleAttribute(
                    "inert",
                    slideIndex !== index
                );
            }
        );

        dotButtons.forEach(
            (dot, dotIndex) => {
                dot.setAttribute(
                    "aria-current",
                    dotIndex === index
                        ? "true"
                        : "false"
                );
            }
        );
    }

    function stop() {
        clearInterval(timer);
        timer = null;
    }

    function start() {
        stop();

        timer = setInterval(() => {
            go(index + 1);
        }, 5000);
    }

    prev.addEventListener(
        "click",
        () => {
            go(index - 1);
        }
    );

    next.addEventListener(
        "click",
        () => {
            go(index + 1);
        }
    );

    root.addEventListener(
        "mouseenter",
        stop
    );

    root.addEventListener(
        "mouseleave",
        start
    );

    root.addEventListener(
        "focusin",
        stop
    );

    root.addEventListener(
        "focusout",
        start
    );

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        }
    );

    go(0);
    start();
}