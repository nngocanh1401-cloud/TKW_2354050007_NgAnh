// js/nav.js — Tính năng 1 (menu mobile), Tính năng 2 (navbar khi cuộn),
//             và bài khởi động (nút lên đầu trang).
//
// Phần tử có sẵn trong HTML, ĐÚNG TÊN NÀY, đừng đổi:
//   nút mở menu   : <button aria-expanded="false" aria-controls="nav-mobile">
//   khối menu     : #nav-mobile        (đang có class "hidden")
//   mốc cuộn      : #nav-sentinel      (thẻ rỗng cao 1px, đầu <body>)
//   nút lên đầu   : #nut-len-dau       (CSS hiện nó khi có class "is-visible")

/* ------------------------------------------------------------------ */
/* Tính năng 1 — Menu mobile                        (tiết 2)          */
/* ------------------------------------------------------------------ */
export function initNav() {
  const toggle = document.querySelector('[aria-controls="nav-mobile"]');
  const menu = document.getElementById("nav-mobile");

  if (!toggle || !menu) return;

  // TODO 1 — Hàm duy nhất chịu trách nhiệm thay đổi trạng thái menu
  function setOpen(open) {
    // Menu đóng thì có class hidden
    menu.classList.toggle("hidden", !open);

    // Cập nhật trạng thái cho trình đọc màn hình
    toggle.setAttribute("aria-expanded", String(open));

    // Cập nhật nhãn nút
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");

    // Khi menu mở thì khóa cuộn phần nền
    document.body.classList.toggle("overflow-hidden", open);
  }

  const isOpen = () =>
    toggle.getAttribute("aria-expanded") === "true";

  // TODO 2 — Bấm nút thì đảo trạng thái menu
  toggle.addEventListener("click", () => {
    setOpen(!isOpen());
  });

  // TODO 3a — Nhấn ESC để đóng menu
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);

      // Trả tiêu điểm về nút mở menu
      toggle.focus();
    }
  });

  // TODO 3b — Bấm ra ngoài vùng header thì đóng menu
  document.addEventListener("click", (event) => {
    if (isOpen() && !event.target.closest("header")) {
      setOpen(false);
    }
  });

  // TODO 3c — Chuyển sang màn hình desktop thì đóng menu
  const desktopMedia = window.matchMedia("(min-width: 1024px)");

  desktopMedia.addEventListener("change", (event) => {
    if (event.matches && isOpen()) {
      setOpen(false);
    }
  });
}

/* ------------------------------------------------------------------ */
/* Tính năng 2 — Navbar đổi trạng thái khi cuộn      (tiết 2)         */
/* ------------------------------------------------------------------ */
export function initHeaderOnScroll() {
  const header = document.querySelector("header");
  const sentinel = document.getElementById("nav-sentinel");

  if (!header || !sentinel) return;

  // TODO 4 — Theo dõi sentinel bằng IntersectionObserver
  const observer = new IntersectionObserver(([entry]) => {
    // Sentinel không còn trong màn hình => đã cuộn xuống
    const scrolled = !entry.isIntersecting;

    header.classList.toggle("shadow-sm", scrolled);
    header.classList.toggle("is-scrolled", scrolled);
  });

  observer.observe(sentinel);
}

/* ------------------------------------------------------------------ */
/* Bài khởi động — nút "Lên đầu trang"               (tiết 1)         */
/* ------------------------------------------------------------------ */
export function initToTop() {
  const btn = document.getElementById("nut-len-dau");
  const sentinel = document.getElementById("nav-sentinel");

  if (!btn || !sentinel) return;

  // Sentinel chỉ được coi là ra khỏi vùng quan sát
  // sau khi cuộn quá khoảng 400px
  const observer = new IntersectionObserver(
    ([entry]) => {
      // TODO 5 — Sentinel không còn trong vùng quan sát thì hiện nút
      btn.classList.toggle("is-visible", !entry.isIntersecting);
    },
    {
      rootMargin: "400px 0px 0px 0px",
    }
  );

  observer.observe(sentinel);

  // TODO 6 — Bấm nút thì cuộn lên đầu trang
  btn.addEventListener("click", () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    // Trả tiêu điểm về đầu trang cho người dùng bàn phím
    const firstFocusable = document.querySelector(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (firstFocusable) {
      firstFocusable.focus();
    }
  });
}