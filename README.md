# VietTrip

VietTrip là website hỗ trợ người dùng khám phá các điểm đến nổi bật tại Việt Nam, lên kế hoạch và quản lý hành trình du lịch.

## Demo

https://nngocanh1401-cloud.github.io/TKW_2354050007_NgAnh/

## Figma

Dán link Figma tại đây.

## Tính năng

- Responsive navigation
- Dark mode
- FAQ accordion
- Pricing switch
- Testimonial slider
- Scroll reveal
- Back to top
- Tải dữ liệu hành trình từ JSON
- Tìm kiếm hành trình với debounce
- Lọc hành trình theo loại hình và trạng thái
- Sắp xếp hành trình theo ngày, ngân sách và số ngày
- Phân trang danh sách hành trình
- Thêm hành trình mới
- Xóa hành trình
- Lưu dữ liệu bằng LocalStorage
- Khôi phục dữ liệu mẫu
- Hiển thị các trạng thái Loading, Data, Empty và Error
- Validation form liên hệ bằng tiếng Việt
- Hỗ trợ giao diện responsive trên desktop và mobile

## Các trang

- `index.html` - Trang chủ
- `pricing.html` - Bảng giá
- `contact.html` - Liên hệ
- `trips.html` - Quản lý hành trình

## Công nghệ sử dụng

- HTML5
- Tailwind CSS
- JavaScript ES Modules
- JSON
- LocalStorage
- Constraint Validation API

## Chạy dự án

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Build CSS

```bash
npm run build
```

### 3. Khởi chạy local server

```bash

Sử dụng **Live Server** trong Visual Studio Code để chạy dự án.
```

## Dữ liệu hành trình

Dữ liệu mẫu của trang Hành trình được lưu tại:

```text
data/records.json
```

Sau khi người dùng thêm hoặc xóa hành trình, dữ liệu được lưu vào `localStorage` của trình duyệt.

Nút **Khôi phục dữ liệu mẫu** cho phép xóa dữ liệu đã thay đổi trong `localStorage` và tải lại dữ liệu ban đầu từ `records.json`.

## Chức năng trang Hành trình

Trang `trips.html` hỗ trợ:

- Đọc dữ liệu từ `data/records.json`
- Hiển thị danh sách hành trình
- Tìm kiếm theo điểm đến
- Debounce khi tìm kiếm
- Lọc theo loại hình
- Lọc theo trạng thái
- Sắp xếp theo ngày
- Sắp xếp theo ngân sách
- Sắp xếp theo số ngày
- Phân trang
- Thêm hành trình
- Xóa hành trình
- Lưu thay đổi bằng LocalStorage
- Khôi phục dữ liệu mẫu

Trang có đầy đủ 4 trạng thái:

- **Loading** - Đang tải dữ liệu
- **Data** - Có dữ liệu
- **Empty** - Không tìm thấy dữ liệu
- **Error** - Không thể tải dữ liệu

## Validation form liên hệ

Trang `contact.html` sử dụng Constraint Validation API để kiểm tra dữ liệu người dùng.

Các trường bắt buộc được kiểm tra gồm:

- Họ và tên
- Email
- Số điện thoại
- Nội dung
- Đồng ý sử dụng thông tin

Thông báo lỗi được hiển thị bằng tiếng Việt.

Khi biểu mẫu có nhiều trường không hợp lệ, hệ thống sẽ focus vào trường lỗi đầu tiên để người dùng dễ dàng sửa thông tin.

## Responsive

Website được thiết kế responsive và hỗ trợ:

- Desktop
- Tablet
- Mobile

Navbar có menu riêng dành cho thiết bị mobile.

## Dark Mode

Website hỗ trợ giao diện sáng và tối.

Lựa chọn giao diện của người dùng được lưu lại trên trình duyệt để giữ nguyên theme khi tải lại trang.

## Kiểm thử

Website đã được kiểm tra các chức năng:

- Responsive navigation
- Mobile menu
- Dark mode
- FAQ accordion
- Pricing switch
- Testimonial slider
- Scroll reveal
- Back to top
- Search hành trình
- Filter hành trình
- Sort hành trình
- Pagination
- Thêm hành trình
- Xóa hành trình
- LocalStorage
- Khôi phục dữ liệu mẫu
- Validation form
- Loading state
- Data state
- Empty state
- Error state
- Chrome DevTools
- Lighthouse

## Lighthouse

Website được kiểm tra bằng Chrome Lighthouse để đánh giá:

- Performance
- Accessibility
- Best Practices
- SEO

## Screenshot

### Trang chủ

![Trang chủ VietTrip](./assets/img/home.png)

### Trang Hành trình

![Trang Hành trình](./assets/img/trips.png)

### Trang Bảng giá

![Trang Bảng giá](./assets/img/pricing.png)

### Trang Liên hệ

![Trang Liên hệ](./assets/img/contact.png)

## Cấu trúc dự án

```text
VietTrip/
├── assets/
│   ├── img/
│   ├── logo/
│   └── screenshots/
├── data/
│   └── records.json
├── dist/
│   └── output.css
├── js/
│   ├── main.js
│   ├── nav.js
│   ├── theme.js
│   ├── faq.js
│   ├── pricing.js
│   ├── reveal.js
│   ├── slider.js
│   ├── trips.js
│   └── validation.js
├── src/
│   └── input.css
├── index.html
├── pricing.html
├── contact.html
├── trips.html
├── package.json
└── README.md
```

## 3 điều tôi sẽ làm lại nếu có thêm thời gian

1. Bổ sung chức năng chỉnh sửa hành trình thay vì chỉ thêm và xóa.
2. Thêm biểu đồ thống kê ngân sách và số lượng chuyến đi.
3. Tách phần quản lý hành trình thành nhiều module nhỏ hơn để code dễ bảo trì và mở rộng.