// js/nav.js

export function initNav() {
    const toggle = document.querySelector(
        '[aria-controls="nav-mobile"]'
    );
    const menu = document.getElementById("nav-mobile");

    if (!toggle || !menu) return;

    function setOpen(open) {
        menu.classList.toggle("hidden", !open);

        toggle.setAttribute(
            "aria-expanded",
            String(open)
        );

        toggle.setAttribute(
            "aria-label",
            open ? "Đóng menu" : "Mở menu"
        );

        document.body.classList.toggle(
            "overflow-hidden",
            open
        );
    }

    const isOpen = () =>
        toggle.getAttribute("aria-expanded") === "true";

    toggle.addEventListener("click", () => {
        setOpen(!isOpen());
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (isOpen() && !event.target.closest("header")) {
            setOpen(false);
        }
    });

    const desktop = window.matchMedia(
        "(min-width: 1024px)"
    );

    desktop.addEventListener("change", (event) => {
        if (event.matches && isOpen()) {
            setOpen(false);
        }
    });
}

export function initHeaderOnScroll() {
    const header = document.querySelector("header");
    const sentinel =
        document.getElementById("nav-sentinel");

    if (!header || !sentinel) return;

    const observer =
        new IntersectionObserver(([entry]) => {
            const scrolled = !entry.isIntersecting;

            header.classList.toggle(
                "shadow-sm",
                scrolled
            );

            header.classList.toggle(
                "is-scrolled",
                scrolled
            );
        });

    observer.observe(sentinel);
}

export function initToTop() {
    const btn =
        document.getElementById("nut-len-dau");

    const sentinel =
        document.getElementById("nav-sentinel");

    if (!btn || !sentinel) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            btn.classList.toggle(
                "is-visible",
                !entry.isIntersecting
            );
        },
        {
            rootMargin: "400px 0px 0px 0px",
        }
    );

    observer.observe(sentinel);

    btn.addEventListener("click", () => {
        const reduceMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion
                ? "auto"
                : "smooth",
        });

        const target =
            document.querySelector("header a");

        if (target) {
            target.focus();
        }
    });
}