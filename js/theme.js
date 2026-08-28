export function initTheme() {
    const toggle =
        document.querySelector("[data-theme-toggle]");

    if (!toggle) return;

    function isDark() {
        return document.documentElement.classList.contains(
            "dark"
        );
    }

    function updateButton() {
        const dark = isDark();

        toggle.setAttribute(
            "aria-label",
            dark
                ? "Bật chế độ sáng"
                : "Bật chế độ tối"
        );

        toggle.textContent = dark
            ? "☀️"
            : "🌙";
    }

    updateButton();

    toggle.addEventListener("click", () => {
        const dark = !isDark();

        document.documentElement.classList.toggle(
            "dark",
            dark
        );

        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );

        updateButton();
    });
}