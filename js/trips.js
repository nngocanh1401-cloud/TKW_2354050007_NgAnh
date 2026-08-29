const STORAGE_KEY = "viettrip-trips";

const state = {
    records: [],
    query: "",
    category: "all",
    status: "all",
    sort: "date-desc",
    loading: true,
    error: null,

    page: 1,
    pageSize: 5,
};


// =========================
// LABEL
// =========================

const categoryLabels = {
    "bien-dao": "Biển đảo",
    "nui": "Núi",
    "van-hoa": "Văn hóa",
    "thien-nhien": "Thiên nhiên",
    "nghi-duong": "Nghỉ dưỡng",
};

const statusLabels = {
    "dang-len-ke-hoach": "Đang lên kế hoạch",
    "sap-di": "Sắp đi",
    "da-di": "Đã đi",
};


// =========================
// FORMAT
// =========================

const moneyFormatter = new Intl.NumberFormat(
    "vi-VN",
    {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }
);

function formatDate(value) {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
}


// =========================
// SORT
// =========================

const sorters = {
    "date-desc": (a, b) =>
        b.date.localeCompare(a.date),

    "date-asc": (a, b) =>
        a.date.localeCompare(b.date),

    "budget-desc": (a, b) =>
        b.budget - a.budget,

    "budget-asc": (a, b) =>
        a.budget - b.budget,

    "days-desc": (a, b) =>
        b.days - a.days,
};


// =========================
// LOCAL STORAGE + FETCH
// =========================

async function loadRecords() {
    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (saved) {
        return JSON.parse(saved);
    }

    const response =
        await fetch("./data/records.json");

    if (!response.ok) {
        throw new Error(
            `Máy chủ trả về ${response.status}`
        );
    }

    const records =
        await response.json();

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(records)
    );

    return records;
}

function saveRecords() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.records)
    );
}


// =========================
// FILTER
// =========================

function visibleRecords() {
    const q =
        state.query.trim().toLowerCase();

    return [...state.records]
        .filter((record) => {
            return (
                state.category === "all" ||
                record.category === state.category
            );
        })

        .filter((record) => {
            return (
                state.status === "all" ||
                record.status === state.status
            );
        })

        .filter((record) => {
            return (
                !q ||
                record.destination
                    .toLowerCase()
                    .includes(q)
            );
        })

        .sort(sorters[state.sort]);
}


// =========================
// PAGINATION
// =========================

function paginatedRecords(records) {
    const start =
        (state.page - 1) * state.pageSize;

    const end =
        start + state.pageSize;

    return records.slice(start, end);
}


function renderPagination(totalRecords) {
    const pagination =
        document.getElementById(
            "trip-pagination"
        );

    const pageInfo =
        document.getElementById(
            "trip-page-info"
        );

    const pageButtons =
        document.getElementById(
            "trip-page-buttons"
        );

    const prev =
        document.getElementById(
            "trip-prev"
        );

    const next =
        document.getElementById(
            "trip-next"
        );

    if (
        !pagination ||
        !pageInfo ||
        !pageButtons ||
        !prev ||
        !next
    ) {
        return;
    }

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalRecords /
                state.pageSize
            )
        );

    if (state.page > totalPages) {
        state.page = totalPages;
    }

    pagination.classList.toggle(
        "hidden",
        totalRecords === 0
    );

    pageInfo.textContent =
        `Trang ${state.page} / ${totalPages}`;

    prev.disabled =
        state.page === 1;

    next.disabled =
        state.page === totalPages;

    pageButtons.replaceChildren();

    for (
        let page = 1;
        page <= totalPages;
        page += 1
    ) {
        const button =
            document.createElement("button");

        button.type = "button";

        button.textContent =
            String(page);

        button.className =
            page === state.page
                ? "btn btn-primary"
                : "btn btn-secondary";

        button.dataset.page =
            String(page);

        button.setAttribute(
            "aria-label",
            `Đi tới trang ${page}`
        );

        if (page === state.page) {
            button.setAttribute(
                "aria-current",
                "page"
            );
        }

        pageButtons.append(button);
    }
}


// =========================
// BUILD TABLE ROW
// =========================

function buildRow(record, template) {
    const row =
        template.content
            .firstElementChild
            .cloneNode(true);

    row.querySelector(
        "[data-cell='id']"
    ).textContent = record.id;

    row.querySelector(
        "[data-cell='destination']"
    ).textContent = record.destination;

    row.querySelector(
        "[data-cell='category']"
    ).textContent =
        categoryLabels[record.category] ??
        record.category;

    row.querySelector(
        "[data-cell='status']"
    ).textContent =
        statusLabels[record.status] ??
        record.status;

    row.querySelector(
        "[data-cell='days']"
    ).textContent =
        `${record.days} ngày`;

    row.querySelector(
        "[data-cell='budget']"
    ).textContent =
        moneyFormatter.format(
            record.budget
        );

    row.querySelector(
        "[data-cell='date']"
    ).textContent =
        formatDate(record.date);

    const deleteButton =
        row.querySelector(
            "[data-action='delete']"
        );

    deleteButton.dataset.id =
        record.id;

    deleteButton.setAttribute(
        "aria-label",
        `Xóa hành trình ${record.destination}`
    );

    return row;
}


// =========================
// RENDER
// =========================

function render() {
    const loading =
        document.getElementById(
            "trip-loading"
        );

    const errorBox =
        document.getElementById(
            "trip-error"
        );

    const empty =
        document.getElementById(
            "trip-empty"
        );

    const tableWrapper =
        document.getElementById(
            "trip-table-wrapper"
        );

    const tbody =
        document.getElementById(
            "trip-table-body"
        );

    const template =
        document.getElementById(
            "trip-row-template"
        );

    if (
        !loading ||
        !errorBox ||
        !empty ||
        !tableWrapper ||
        !tbody ||
        !template
    ) {
        return;
    }

    // Reset trạng thái
    loading.classList.toggle(
        "hidden",
        !state.loading
    );

    errorBox.classList.add("hidden");
    empty.classList.add("hidden");
    tableWrapper.classList.add("hidden");


    // Loading
    if (state.loading) {
        return;
    }


    // Error
    if (state.error) {
        errorBox.textContent =
            state.error;

        errorBox.classList.remove(
            "hidden"
        );

        renderPagination(0);

        return;
    }


    // Dữ liệu sau search/filter/sort
    const records =
        visibleRecords();


    // Empty
    if (!records.length) {
        tbody.replaceChildren();

        empty.classList.remove(
            "hidden"
        );

        renderPagination(0);

        return;
    }


    // Pagination
    renderPagination(
        records.length
    );

    const pageRecords =
        paginatedRecords(records);


    // Render dữ liệu trang hiện tại
    const rows =
        pageRecords.map((record) =>
            buildRow(record, template)
        );

    tbody.replaceChildren(...rows);

    tableWrapper.classList.remove(
        "hidden"
    );
}


// =========================
// DEBOUNCE
// =========================

function debounce(fn, delay = 300) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(
            () => fn(...args),
            delay
        );
    };
}


// =========================
// INIT
// =========================

export async function initTrips() {
    const root =
        document.getElementById(
            "trip-app"
        );

    if (!root) return;


    const search =
        document.getElementById(
            "trip-search"
        );

    const category =
        document.getElementById(
            "trip-category"
        );

    const status =
        document.getElementById(
            "trip-status"
        );

    const sort =
        document.getElementById(
            "trip-sort"
        );

    const form =
        document.getElementById(
            "trip-form"
        );

    const showFormButton =
        document.getElementById(
            "show-add-trip"
        );

    const cancelButton =
        document.getElementById(
            "cancel-add-trip"
        );

    const resetButton =
        document.getElementById(
            "reset-records"
        );

    const tbody =
        document.getElementById(
            "trip-table-body"
        );

    const prev =
        document.getElementById(
            "trip-prev"
        );

    const next =
        document.getElementById(
            "trip-next"
        );

    const pageButtons =
        document.getElementById(
            "trip-page-buttons"
        );


    if (
        !search ||
        !category ||
        !status ||
        !sort ||
        !form ||
        !showFormButton ||
        !cancelButton ||
        !resetButton ||
        !tbody ||
        !prev ||
        !next ||
        !pageButtons
    ) {
        return;
    }



    // SEARCH


    search.addEventListener(
        "input",
        debounce((event) => {
            state.query =
                event.target.value;

            state.page = 1;

            render();
        })
    );



    // CATEGORY


    category.addEventListener(
        "change",
        (event) => {
            state.category =
                event.target.value;

            state.page = 1;

            render();
        }
    );



    // STATUS


    status.addEventListener(
        "change",
        (event) => {
            state.status =
                event.target.value;

            state.page = 1;

            render();
        }
    );



    // SORT


    sort.addEventListener(
        "change",
        (event) => {
            state.sort =
                event.target.value;

            state.page = 1;

            render();
        }
    );



    // PAGINATION - PREV


    prev.addEventListener(
        "click",
        () => {
            if (state.page <= 1) {
                return;
            }

            state.page -= 1;

            render();
        }
    );



    // PAGINATION - NEXT


    next.addEventListener(
        "click",
        () => {
            const totalPages =
                Math.ceil(
                    visibleRecords().length /
                    state.pageSize
                );

            if (
                state.page >= totalPages
            ) {
                return;
            }

            state.page += 1;

            render();
        }
    );



    // PAGINATION - PAGE NUMBER


    pageButtons.addEventListener(
        "click",
        (event) => {
            const button =
                event.target.closest(
                    "[data-page]"
                );

            if (!button) return;

            state.page =
                Number(
                    button.dataset.page
                );

            render();
        }
    );



    // SHOW FORM


    showFormButton.addEventListener(
        "click",
        () => {
            form.classList.remove(
                "hidden"
            );

            document
                .getElementById(
                    "trip-destination"
                )
                ?.focus();
        }
    );



    // CANCEL FORM


    cancelButton.addEventListener(
        "click",
        () => {
            form.reset();

            form.classList.add(
                "hidden"
            );

            showFormButton.focus();
        }
    );



    // ADD TRIP


    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const data =
                new FormData(form);

            const record = {
                id: `VT-${Date.now()}`,

                destination:
                    data
                        .get("destination")
                        .trim(),

                category:
                    data.get("category"),

                status:
                    data.get("status"),

                days:
                    Number(
                        data.get("days")
                    ),

                budget:
                    Number(
                        data.get("budget")
                    ),

                date:
                    data.get("date"),
            };

            state.records.unshift(
                record
            );

            // Sau khi thêm, quay về trang đầu
            state.page = 1;

            saveRecords();

            render();

            form.reset();

            form.classList.add(
                "hidden"
            );

            showFormButton.focus();
        }
    );



    // DELETE


    tbody.addEventListener(
        "click",
        (event) => {
            const button =
                event.target.closest(
                    "[data-action='delete']"
                );

            if (!button) return;

            const id =
                button.dataset.id;

            state.records =
                state.records.filter(
                    (record) =>
                        record.id !== id
                );

            saveRecords();

            render();
        }
    );



    // RESET SAMPLE DATA


    resetButton.addEventListener(
        "click",
        async () => {
            localStorage.removeItem(
                STORAGE_KEY
            );

            state.loading = true;
            state.error = null;
            state.page = 1;

            render();

            try {
                const response =
                    await fetch(
                        "./data/records.json"
                    );

                if (!response.ok) {
                    throw new Error(
                        `Máy chủ trả về ${response.status}`
                    );
                }

                state.records =
                    await response.json();

                saveRecords();

            } catch (error) {

                state.error =
                    `Không tải được dữ liệu: ${error.message}`;

            } finally {

                state.loading = false;

                render();
            }
        }
    );



    // INITIAL LOAD


    render();

    try {
        state.records =
            await loadRecords();

    } catch (error) {

        state.error =
            `Không tải được dữ liệu: ${error.message}`;

    } finally {

        state.loading = false;

        render();
    }
}