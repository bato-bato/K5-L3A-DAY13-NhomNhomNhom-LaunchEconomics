# Báo cáo cá nhân — Nguyễn Quỳnh Trang — 2A202603477

## 1. Thông tin thành viên

- Họ tên: Nguyễn Quỳnh Trang
- MSSV: 2A202603477
- Email: nguyenquynhtrang7092005@gmail.com
- Vai trong nhóm: Thành viên 3 — Gắn nhãn số 2, chỉ số E và giữ hồ sơ.

## 2. Phần việc phụ trách

- C: Gắn nhãn số 2 cho 20 ca, phối hợp với Thiên Bảo đối chiếu nhãn và hoàn thiện bảng khắc phục đủ 5 loại lỗi.
- E1–E2: Rà công thức, mẫu số, đặc tả event và rủi ro kinh tế; kiểm chứng ba tỷ lệ chạy thử với dữ liệu và kết quả code.
- E3: Tổng hợp kết quả vào hồ sơ launch v0, cập nhật trạng thái CP3 và tiếp nhận phần pilot do Thiên Bảo bàn giao.

## 3. Đóng góp cụ thể

- Phần C: Xác nhận đã gắn nhãn độc lập với Thiên Bảo trước khi đối chiếu; bảng tổng hợp khớp 20/20 ca (100%). Hoàn thiện lý do phân loại, quy tắc cho ca dễ nhầm và 5 biện pháp khắc phục cho ca 9, 7, 18, 4, 17, có tín hiệu đo được và vai trò phụ trách.
- Phần E: Chạy lại script và tính trực tiếp từ CSV để xác nhận 994/1.200 = 82,83%; 48/177 = 27,12%; 51/1.200 = 4,25%. Làm rõ mẫu số sửa/bỏ chỉ gồm các yêu cầu được xem lại.
- Rà 5 chỉ số và 12 event có trace_id; bổ sung input_validation_failed và customer_notification_sent để hỗ trợ phát hiện lỗi. Ghi rõ đây là đặc tả pilot, chưa phải log đã triển khai.
- Đối chiếu 3 rủi ro với B1, B4 và A4; tách phạm vi toàn mẫu khỏi phạm vi noi_dia + hang_nang, ghi giả định phút làm lại và nhãn simulated cho chi phí có dùng phút giả lập.
- Cập nhật mục 5 của hồ sơ launch khi nhận cập nhật từ thien-bao, giữ kết quả CP3 và nhận thiết kế pilot mới. Mục pilot vẫn “Chưa” vì còn chờ xác nhận nhân sự và lưu lượng.

## 4. Bằng chứng

- Commit chính: `10c12f6` — Verify E metrics and update CP3 launch evidence; cập nhật 3 file bảng lỗi, chỉ số và hồ sơ launch.
- [Bảng lỗi](bang_loi.md): hai cột nhãn, kết quả đối chiếu 20/20, căn cứ phân loại và 5 biện pháp khắc phục. Hai bản nhãn riêng trước đối chiếu cần được giữ cùng bằng chứng của nhóm.
- [Chỉ số và rủi ro](chi_so.md): ba tỷ lệ tính thử, 12 event, nguồn số liệu B1/B4/A4 và giới hạn của dữ liệu.
- [Hồ sơ launch v0](ho_so_launch_v0.md): mục 5 cập nhật kết quả CP3; mục 6 tiếp nhận thông tin pilot từ Thiên Bảo.
- Kiểm tra trong phiên làm việc: `python -X utf8 lab13.py` chạy hết từ src/, ba phép thử A1 đạt; tính lại trực tiếp trên 1.200 request_id duy nhất cho đúng ba tử số 994, 48, 51 và các mẫu số 1.200, 177, 1.200.

## 5. Công cụ AI đã dùng

- Công cụ: ChatGPT/Codex, hỗ trợ đọc đề, đề xuất nhãn và lý do, soạn bảng khắc phục, chạy kiểm chứng số liệu và chỉnh báo cáo.
- Cách kiểm tra số liệu trong phiên: Chạy code và một phép tính trực tiếp từ CSV với keep_default_na=False, so sánh tử số/mẫu số với bảng E, rồi đối chiếu các số rủi ro với bảng chi phí.
- Cách rà nội dung: dùng mô tả nguyên nhân gốc trong đề để giải thích nhãn; đối chiếu mỗi chỉ số với event cần ghi. Những kiểm tra chưa có dữ liệu, như timestamp theo dõi 7 ngày và log pilot thực tế, được ghi rõ giới hạn.

## 6. Tự đánh giá

- Đã hoàn thiện phần C và kiểm chứng E1–E2 trong phạm vi dữ liệu lab; hồ sơ launch phản ánh kết quả hiện có và các điều kiện còn chờ xác nhận.
- Cần giải thích được mẫu số 177 của tỷ lệ sửa/bỏ và lý do không suy ra tác động nhân quả từ tỷ lệ 82,83% khi đợt chạy thử chưa có đối chứng.
- Việc tiếp theo: giữ bằng chứng nhãn gốc, phối hợp nhóm chốt điều kiện pilot, cập nhật báo cáo nhóm và kết quả duyệt chéo thực tế trước khi nộp.
