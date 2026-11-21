# Phân công Lab 13 – Launch & Economics

Nhóm NhomNhomNhom · K5-L3A · 3 thành viên

Mục tiêu là hoàn thành hồ sơ Gate 2a và đề xuất **Go, Go có điều kiện hoặc No-go** cho pilot trợ lý hoàn phí LogiX-VN. Nhánh hiện có bản nháp A, B, D và E. Nhóm cần đối chiếu số liệu, làm hai lượt gắn nhãn độc lập và ghi kết quả duyệt chéo thực tế. Thay tên hai thành viên còn thiếu trong [TEAM.md](TEAM.md) khi chốt phân công.

## 1. Nguyễn Thị Thanh Bình — Code, chi phí A–B và điều phối duyệt chéo

- **A1–A2:** Chạy `python lab13.py` trong `src/`, kiểm ba đáp án 1,20 · 1,25 · 1,25. Rà chi phí token, tool, xem lại và làm lại. Chi phí lượt chạy lại đã nằm trong token và tool. Chia tổng chi phí cho số yêu cầu thành công và đối chiếu với phép tính tay của thành viên 2.
- **A3–A4:** Kiểm bốn loại yêu cầu và so với mốc làm tay 12.000 đ. Gửi lý do chọn phạm vi `noi_dia` và `hang_nang` cho hai bạn. Kiểm chi phí cố định 40 triệu đồng/tháng ở hai mức 45.000 và 22.500 yêu cầu/tháng.
- **B1–B4:** Kiểm 9 kịch bản đổi từng yếu tố, một kịch bản đổi cặp và thứ hạng ba yếu tố nhạy nhất. So giới hạn 1, 2, 3 lượt chạy theo cả chi phí mỗi việc thành công và tổng chi phí hệ thống. Giữ hai giả định phút làm lại trong kịch bản xem lại toàn bộ. Hoàn thiện phần này trong lúc hai bạn gắn nhãn riêng.
- **Bàn giao:** Chốt [lab13.py](src/lab13.py) và [bảng chi phí](report/team/bang_chi_phi.md), ghi nhãn `simulated` cho kết quả dùng các cột phút giả lập. Khi duyệt chéo, điều phối phần trình bày, ghi điểm, quyết định, câu hỏi và phản hồi thực tế vào [phiếu chấm](report/team/phieu_cham.md).

## 2. Thành viên 2 — Kiểm số, kế hoạch pilot D và gắn nhãn số 1

- **Kiểm độc lập:** Tính tay ít nhất một dòng A2 từ hai CSV và ghi phép tính làm bằng chứng. Chạy lại script trên máy thứ hai, đối chiếu kết quả A–B và ba tỷ lệ chạy thử dùng ở E.
- **D1:** Đối chiếu cỡ mẫu khi chia theo yêu cầu, nhân viên và depot. Với phương án dự thảo, cần 20 nhân viên mỗi nhánh và 299 ca/người, tức 5.980 ca/nhánh để phát hiện mức tăng 6 điểm phần trăm. Nếu mức tăng thật là 5 điểm, khả năng phát hiện khoảng 64%. Ghi rõ đánh đổi khi bàn giao.
- **D2–D3:** Rà giả định 40 nhân viên và lưu lượng trong phạm vi pilot. Chốt đối chứng cùng kỳ, cách ngẫu nhiên theo nhân viên, cách giảm ảnh hưởng giữa hai nhánh và mốc quyết định. Rà ít nhất ba luật dừng về an toàn, chi phí và mức sử dụng theo mẫu NẾU – TRONG – THÌ – KHÔNG THÌ. Mỗi luật có ngưỡng, thời hạn, hành động và vai trò phụ trách. Kiểm [pilot_plan.yaml](report/team/pilot_plan.yaml) bằng `yaml.safe_load` và bàn giao các điều kiện còn cần xác nhận cho thành viên 3.
- **C:** Tự gắn nhãn đủ 20 ca trong 8 phút từ [đề bài gốc](docs/Ngay13_Lab13_De_bai_hoc_vien.docx), lưu bản riêng và gửi cho thành viên 3 sau khi cả hai đã hoàn thành.

## 3. Thành viên 3 — Gắn nhãn số 2, chỉ số E và giữ hồ sơ

- **C:** Tự gắn nhãn đủ 20 ca trong 8 phút và lưu bản gốc. Sau khi cả hai đã lưu, đối chiếu với thành viên 2. Tính số ca trùng chia 20, ghi quy tắc phân biệt cho ca bất đồng và rà lại định nghĩa nếu dưới 16/20. Giữ nguyên hai bộ nhãn gốc, ghi nhãn thống nhất ở cột riêng. Chọn 5 ca đại diện cho 5 loại lỗi, mỗi ca có cách phát hiện đo được, cách khắc phục và vai trò phụ trách. Hoàn tất [bảng lỗi](report/team/bang_loi.md).
- **E1–E2:** Rà công thức và mẫu số của ba chỉ số chạy thử. Giữ thêm một chỉ số sử dụng và một chỉ số an toàn. Kiểm ít nhất 6 event có `trace_id` và đủ thuộc tính để tính chỉ số. Ghi ít nhất hai rủi ro kinh tế có số từ phần B, dấu hiệu theo dõi, hành động và vai trò phụ trách trong [bảng chỉ số](report/team/chi_so.md).
- **E3:** Ghép kết quả A–D vào [hồ sơ launch v0](report/team/ho_so_launch_v0.md) dài một trang, đủ bảy mục, có trạng thái và vai trò phụ trách cho từng mục. Chốt đề xuất với cả nhóm. Nếu chọn *Go có điều kiện*, ghi từng điều kiện, người phụ trách và ngày kiểm tra. Tổng hợp đóng góp thực tế vào [báo cáo nhóm](report/team/group_report.md).

## Bàn giao và nộp

| Mốc theo lịch mẫu | Việc cần chốt |
| --- | --- |
| CP1–CP2 | Thanh Bình và thành viên 2 đối chiếu kết quả. Thành viên 3 mở sẵn hồ sơ và ghi nguồn cho từng số. |
| 15:35 · CP3 | Thành viên 2 và 3 gắn nhãn độc lập trước khi xem đáp án hoặc thảo luận. Thanh Bình hoàn thiện B. |
| 16:08–17:00 · CP4–CP5 | Thành viên 2 bàn giao cỡ mẫu và luật dừng. Thanh Bình bàn giao số chi phí và phạm vi. Thành viên 3 chốt hồ sơ để duyệt lúc 17:00. |
| Sau duyệt chéo | Thanh Bình hoàn tất phiếu chấm. Mỗi người cập nhật `TEAM.md` và báo cáo cá nhân với việc thực tế đã làm, bằng chứng và cách kiểm tra kết quả khi dùng AI. |

Cả nhóm kiểm lại code, sáu file hồ sơ, báo cáo nhóm và ba báo cáo cá nhân. Xác nhận nhánh và commit nộp. Mỗi người nộp cùng link repo GitHub trên LMS trước 23:59 GMT+7 ngày lab theo [hướng dẫn nộp](SUBMISSION.md).
