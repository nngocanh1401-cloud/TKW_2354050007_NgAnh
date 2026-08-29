export function initValidation() {
    const form =
        document.getElementById(
            "contact-form"
        );

    if (!form) return;

    const summary =
        document.getElementById(
            "form-error-summary"
        );

    const fields = [
        ...form.querySelectorAll(
            "input, select, textarea"
        ),
    ];


    function getMessage(field) {
        const validity =
            field.validity;

        if (validity.valueMissing) {
            if (field.id === "dong-y") {
                return "Vui lòng đồng ý trước khi gửi yêu cầu.";
            }

            return "Vui lòng điền thông tin này.";
        }

        if (validity.typeMismatch) {
            return "Email chưa đúng định dạng. Ví dụ: example@gmail.com";
        }

        if (validity.patternMismatch) {
            return "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.";
        }

        if (validity.tooShort) {
            return `Vui lòng nhập ít nhất ${field.minLength} ký tự.`;
        }

        return "Thông tin chưa hợp lệ.";
    }


    function showError(field) {
        const errorBox =
            document.querySelector(
                `[data-error-for="${field.id}"]`
            );

        field.setAttribute(
            "aria-invalid",
            "true"
        );

        if (!errorBox) return;

        errorBox.textContent =
            getMessage(field);

        errorBox.classList.remove(
            "hidden"
        );
    }


    function clearError(field) {
        const errorBox =
            document.querySelector(
                `[data-error-for="${field.id}"]`
            );

        field.removeAttribute(
            "aria-invalid"
        );

        if (!errorBox) return;

        errorBox.textContent = "";

        errorBox.classList.add(
            "hidden"
        );
    }


    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            fields.forEach(
                clearError
            );

            const invalidFields =
                fields.filter(
                    (field) =>
                        !field.checkValidity()
                );

            if (invalidFields.length) {

                invalidFields.forEach(
                    showError
                );

                if (summary) {
                    summary.textContent =
                        `Có ${invalidFields.length} mục cần kiểm tra lại.`;

                    summary.classList.remove(
                        "hidden"
                    );
                }

                invalidFields[0].focus();

                return;
            }


            if (summary) {
                summary.textContent = "";

                summary.classList.add(
                    "hidden"
                );
            }

            alert(
                "Gửi yêu cầu thành công!"
            );

            form.reset();
        }
    );


    fields.forEach((field) => {

        const eventName =
            field.type === "checkbox" ||
            field.tagName === "SELECT"
                ? "change"
                : "input";

        field.addEventListener(
            eventName,
            () => {
                if (
                    field.checkValidity()
                ) {
                    clearError(field);
                }
            }
        );

    });
}