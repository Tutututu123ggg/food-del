# Hướng Dẫn Cài Đặt Dự Án Giao Hàng Đồ Ăn

## Yêu Cầu Hệ Thống
- **Node.js** (Tải tại: https://nodejs.org)
- **npm** (đi kèm với Node.js, kiểm tra phiên bản với `npm -v`)
- **Git** (tùy chọn, để clone repository)

## Cài Đặt
1. Clone repository:
   git clone https://github.com/Tutututu123ggg/food-del
   cd food-del
   
2. Cài đặt các thư viện cần thiết cho từng phần của dự án:
   cd frontend && npm install
   cd ../backend && npm install
   cd ../admin && npm install

## Chạy Dự Án
### Chạy Backend
cd backend
npm run server

### Chạy Frontend
cd frontend
npm run dev

### Chạy Trang Quản Trị (Admin Panel)
cd admin
npm run dev

## Cấu Hình
- Cập nhật các biến môi trường trong file `.env` nếu cần.
- Đảm bảo backend chạy trước khi khởi động frontend hoặc trang quản trị.

## Xử Lý Lỗi
- Nếu gặp lỗi liên quan đến module, thử chạy:
   npm install
- Kiểm tra log lỗi và đảm bảo các cổng không bị xung đột.

