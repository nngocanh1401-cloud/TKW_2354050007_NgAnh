export function initPricing() {
    const toggle =
        document.querySelector(
            "[data-pricing-switch]"
        );

    if (!toggle) return;

    const prices = [
        ...document.querySelectorAll(
            "[data-price]"
        ),
    ];

    const periods = [
        ...document.querySelectorAll(
            "[data-price-period]"
        ),
    ];

    const dong =
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        });

    function render(yearly) {
        prices.forEach((price) => {
            const value = yearly
                ? price.dataset.yearly
                : price.dataset.monthly;

            price.textContent =
                dong.format(Number(value));
        });

        periods.forEach((period) => {
            period.textContent = yearly
                ? "/ năm"
                : "/ tháng";
        });

        toggle.setAttribute(
            "aria-checked",
            String(yearly)
        );
    }

    toggle.addEventListener("click", () => {
        const yearly =
            toggle.getAttribute(
                "aria-checked"
            ) !== "true";

        render(yearly);
    });

    render(false);
}