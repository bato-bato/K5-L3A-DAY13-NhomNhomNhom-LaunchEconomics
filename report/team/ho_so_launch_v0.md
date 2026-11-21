# Hồ sơ launch v0 · Trợ lý hoàn phí LogiX-VN · Gate 2a

Nhóm NhomNhomNhom · K5-L3A · Dự thảo để nhóm đối chiếu trước phiên duyệt

| Mục | Con số chính | Trạng thái | Người phụ trách |
| --- | --- | --- | --- |
| 1 · Chi phí mỗi việc thành công | 4.471,97 đ trên 978 việc thành công, gấp 16,28× hóa đơn trung bình (simulated) | Giả lập | Người kiểm số |
| 2 · Ba yếu tố nhạy nhất | Làm lại +51,77%, xem lại +40,70%, lương +23,12% theo B1 (simulated) | Giả lập | Người viết code |
| 3 · So với nhân viên tự làm | Mốc 12.000 đ. Phạm vi noi_dia + hang_nang: 4.599,09 đ/việc thành công gồm cố định ở 45.000 yêu cầu toàn hệ thống/tháng. Giới hạn 2 lần có tổng chi phí hệ thống thấp nhất ở mẫu 1.200 yêu cầu (simulated). | Giả lập | PM trợ lý hoàn phí |
| 4 · Chỉ số | Thử nghiệm: chính 82,83%, sửa/bỏ 27,12%, mở lại 4,25%. Các tỷ lệ mô tả mẫu thử. | Xong, có bằng chứng | Trưởng nhóm CSKH |
| 5 · Bảng lỗi và cách khắc phục | Đồng thuận 20/20 ca (100%). Có 5 biện pháp khắc phục đủ 5 loại; chi tiết tại bang_loi.md. | Xong, có bằng chứng | Người giữ hồ sơ |
| 6 · Pilot | 20 nhân viên và 5.980 ca mỗi nhánh. MDE 6 điểm, power khoảng 0,64 ở hiệu ứng 5 điểm. Mốc quyết định 05/01/2027 nếu đủ mẫu và đủ thời gian theo dõi. | Chưa | Giám đốc vận hành |
| 7 · Rủi ro kinh tế | Xem lại toàn bộ có thể lên 12.414,79 đ/việc với 15,3 phút làm lại/ca (simulated). | Giả lập | Trưởng nhóm CSKH |

Điều kiện trước khi bật pilot (mốc đề xuất để nhóm xác nhận):

- **27/11/2026 · Người giữ hồ sơ** đối chiếu đủ hai bộ nhãn và năm biện pháp. **Kỹ sư trưởng agent** trình kiểm tra chống hoàn trùng và đối soát sổ cái.
- **27/11/2026 · Thiên Bảo và Giám đốc vận hành** rà danh sách 40 nhân viên, phạm vi `noi_dia` + `hang_nang` và dự báo thu ít nhất 5.980 ca mỗi nhánh ở bước 50%. Giám đốc vận hành xác nhận trước khi bật. Muốn giữ mốc quyết định **05/01/2027**, hoàn tất thu mẫu chính hết **27/12/2026** và kiểm đủ mẫu sau theo dõi.
- **27/11/2026 · Trưởng nhóm CSKH** kiểm luồng event từ tiếp nhận tới ghi sổ, chốt cách ghi phút thực tế và vận hành ngưỡng an toàn trước khi giảm xem lại.

**Đề xuất:** Go có điều kiện cho pilot giới hạn ở `noi_dia` và `hang_nang`.
