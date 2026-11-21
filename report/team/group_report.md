# Báo cáo nhóm · Day 13 Launch Economics

## 1. Thông tin nhóm

NhomNhomNhom · K5-L3A · 3 thành viên. Phân công và đóng góp cập nhật trong [TEAM.md](../../TEAM.md).

## 2. Mục tiêu và cách tiếp cận

Tính chi phí trợ lý hoàn phí từ mọi lần chạy và thời gian nhân viên, sau đó dùng phân tích độ nhạy, bảng lỗi và cỡ mẫu để thiết kế pilot có đối chứng.

## 3. Giải pháp

- **A và B** Tính lại từ hai CSV bằng [lab13.py](../../src/lab13.py). Bảng [chi phí](bang_chi_phi.md) ghi giả định cố định, giới hạn lần chạy và xem lại toàn bộ đề xuất.
- **C** [Bảng lỗi](bang_loi.md) chờ hai lượt gắn nhãn độc lập, tính đồng thuận và chọn năm ca đã thống nhất.
- **D** [Kế hoạch pilot](pilot_plan.yaml) dự thảo chia ngẫu nhiên theo nhân viên, phân tầng theo depot, dùng nhóm đối chứng đồng thời.
- **E** [Đặc tả chỉ số](chi_so.md) ghép event cấp yêu cầu và trace. [Hồ sơ launch v0](ho_so_launch_v0.md) đưa ra đề xuất có điều kiện.

## 4. Kết quả

Chi phí trung bình **4.471,97 đ/việc thành công** (simulated). Giới hạn hai lần chạy cho tổng hệ thống **6.901.220 đ** (simulated), thấp nhất trong ba kịch bản. Đề xuất **Go có điều kiện** cho phạm vi `noi_dia` và `hang_nang`, sau khi có bằng chứng về kiểm soát hoàn trùng, theo dõi chi phí thật và đủ cỡ mẫu. Kết quả duyệt chéo sẽ bổ sung sau phiên Gate 2a.

## 5. Khó khăn và cách xử lý

Python mặc định trên máy chuẩn bị bản nháp thiếu pandas. Mã đã được chạy bằng Python đi kèm môi trường Codex có pandas. Nhóm chạy lại trong môi trường của mình theo hướng dẫn ở [report.md](../../report.md).

## 6. Tổng hợp đóng góp

Cập nhật [TEAM.md](../../TEAM.md) sau khi nhóm xác nhận vai và đóng góp thực tế.

## 7. Hạn chế

Phút nhân viên đang lấy từ cột `_simulated`. Chỉ số chạy thử chưa thể tách tác động. Cỡ mẫu thiết kế phụ thuộc vào khả năng thu đủ ca theo nhân viên và ICC giả định. Khi phải xem lại toàn bộ, chi phí có thể vượt benchmark ở kịch bản 15,3 phút làm lại/ca.

## 8. Nguồn

- [Hướng dẫn buổi lab](../../docs/Lab13_Huong_dan_chi_tiet_buoi_chieu.md)
- [Dữ liệu và công thức](../../docs/du_lieu_va_cong_thuc.md)
- Codex hỗ trợ chuẩn bị bản dự thảo. Đối chiếu số bằng script và hai CSV gốc.
