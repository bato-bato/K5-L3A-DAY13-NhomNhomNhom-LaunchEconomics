# Day 13 · Việc Thanh Bình cần làm

**Nhóm NhomNhomNhom · K5-L3A · 3 thành viên · Nhánh `Thanh-Binh`**

Mục tiêu là trình hồ sơ Gate 2a cho pilot trợ lý hoàn phí LogiX-VN. Bản chuẩn bị đã có mã tính A, B, D1 và E1, bảng chi phí, kế hoạch pilot và dự thảo hồ sơ. Các ô gắn nhãn độc lập, kết quả duyệt chéo và phân công lấy từ buổi làm việc thật của nhóm.

## Thứ tự làm trong buổi lab

| Giờ mẫu | Việc cần làm | Tiêu chí xong |
| --- | --- | --- |
| 14:00 | Điền thông tin hai bạn cùng nhóm và xác nhận cách chia vai cho ba người trong [TEAM.md](TEAM.md). | Mỗi người biết phần phải làm và bằng chứng phải ghi. |
| 14:10–14:53 · CP1 | Chạy script, tự tính một dòng A2, đối chiếu A1–A4 trong [bảng chi phí](report/team/bang_chi_phi.md). | Ba test ĐẠT, 9 dòng A2, 4 loại A3, A4 đủ hai mức khối lượng. |
| 14:53–15:20 · CP2 | So 9 kịch bản B1, kiểm B2, giải thích 1 lần và 2 lần trong B3, so hai giả định phút làm lại của B4. | Nêu được tác động lớn nhất và thứ pilot cần đo. |
| 15:35–16:08 · CP3 | Hai bạn gắn nhãn mở mục “Hai mươi ca lỗi” trong [đề bài](docs/Ngay13_Lab13_De_bai_hoc_vien.docx), làm riêng trong 8 phút. Thanh Bình hoàn thiện CP2. Khi đã lưu cả hai bản thì mới so và điền [bảng lỗi](report/team/bang_loi.md). | Ghi số ca trùng trên 20, quy tắc cho từng ca bất đồng, năm biện pháp cho năm loại lỗi. Rà định nghĩa nếu dưới 16/20. |
| 16:08–16:36 · CP4 | Đối chiếu năm câu D1, xác nhận depot, 40 nhân viên, lưu lượng và thời gian trong [pilot plan](report/team/pilot_plan.yaml). | Hai nhánh đồng thời, mỗi nhánh 20 nhân viên và mục tiêu 5.980 yêu cầu, có ngưỡng dừng và người có quyền rollback. |
| 16:36–17:00 · CP5 | Rà [chỉ số](report/team/chi_so.md) và [hồ sơ launch v0](report/team/ho_so_launch_v0.md), xác nhận điều kiện và ngày kiểm tra. | Đủ 7 mục, mỗi chỉ số có event để tính, hồ sơ ghi rõ phần nào còn chờ bằng chứng. |
| 17:00–18:00 | Nhóm gửi hồ sơ cho hội đồng, chấm nhóm kế tiếp, ghi điểm, quyết định, câu hỏi và phản hồi vào [phiếu chấm](report/team/phieu_cham.md). Cập nhật [báo cáo nhóm](report/team/group_report.md) và [báo cáo cá nhân](report/team/2A202603497_NguyenThiThanhBinh.md). | Có bằng chứng duyệt chéo, đóng góp thực tế, commit chốt và link nhóm xác nhận để từng người nộp LMS. |

## Việc cần ghi trước khi nộp

- Điền họ tên, MSSV và đóng góp thực tế của cả ba người trong [TEAM.md](TEAM.md). Hai bạn còn lại sao chép [mẫu báo cáo cá nhân](report/team/MSSV_HoTen.md) và đổi tên theo MSSV.
- Ghi hai danh sách nhãn theo thứ tự ca 1–20, số ca trùng và quy tắc xử lý từng ca bất đồng. Sau khi nhóm chốt nhãn, gắn mã ca thực tế cho năm biện pháp trong bảng lỗi.
- Điền nhóm bạn được giao chấm, ba điểm thành phần, bằng chứng, quyết định, câu hỏi và phản hồi vào phiếu chấm. Ghi riêng phản hồi nhóm mình nhận được vào báo cáo nhóm.
- Xác nhận các mốc pilot và cập nhật trạng thái trong hồ sơ launch theo bằng chứng. Con số **40 nhân viên** phục vụ thiết kế pilot của LogiX-VN. Nhóm làm bài có **3 thành viên**.

## Chạy để tự kiểm tra

Từ thư mục repo Day 13, dùng Python 3.10 trở lên.

```sh
cd src
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python lab13.py
python -c "import yaml; from pathlib import Path; p = Path('../report/team/pilot_plan.yaml'); assert isinstance(yaml.safe_load(p.read_text()), dict)"
```

Dòng đầu của script phải là `Ba phép thử đáp án biết trước: ĐẠT`. Một phép tính tay để tự kiểm là **(245.585,132 + 84.000 + 890 × 2.000 + 1.132 × 2.000) ÷ 978 ≈ 4.471,97 đ/việc thành công** (`simulated`). Tiền của lần chạy lỗi vẫn phát sinh, còn số việc thành công đếm theo kết quả cuối của yêu cầu.

## Những con số cần giải thích khi trình

- **A · Phạm vi.** `quoc_te` có 41/150 việc thành công, chi phí 22.515,17 đ/việc (`simulated`). Ở lần chạy thứ ba chỉ 2/93 lần `ok`. Phạm vi đề xuất gồm `noi_dia` và `hang_nang`.
- **B · Kinh tế.** Làm lại gấp đôi tăng chi phí 51,77%. Hai lần chạy cho tổng hệ thống thấp nhất ở mẫu 1.200 yêu cầu. Khi xem lại toàn bộ, chi phí có thể lên 12.414,79 đ/việc (`simulated`). Đo phút thực tế trước khi giảm xem lại.
- **C · Đồng thuận.** Tính số nhãn giống nhau trước khi thảo luận chia 20. Một biện pháp khắc phục cần event hoặc phép kiểm, ngưỡng, tần suất và người phụ trách.
- **D · Cỡ mẫu.** Với 20 nhân viên/nhánh và ICC 0,02, cỡ mẫu hiệu dụng mỗi nhánh có trần 1.000. Thiết kế 299 ca/người đủ cho mục tiêu +6 điểm (859 hiệu dụng) và có power khoảng 0,64 nếu tác động thật là +5 điểm.
- **E · Bằng chứng.** Chỉ số chính 82,83%, sửa/bỏ 27,12%, mở lại 4,25% là kết quả mô tả đợt chạy thử. Ước lượng tác động dùng hai nhánh đồng thời. Đề xuất dự thảo là `Go có điều kiện`.

## Tiếp tục trên nhánh của Thanh Bình

Khi bổ sung bằng chứng, kiểm tra nhánh và review tệp trước khi commit.

```sh
git switch Thanh-Binh
git status --short --branch
git diff
git add TEAM.md report.md report/team src/lab13.py
git diff --cached --stat
git commit -m "Complete Day 13 team evidence"
git push origin Thanh-Binh
```

Nhóm xác nhận nhánh nộp và commit chốt. Mỗi thành viên nộp chung link repo nhóm bằng tài khoản LMS cá nhân theo mốc Coach thông báo. [Hướng dẫn nộp](SUBMISSION.md)

## Demo và nhập phiếu Gate 2a

Mở [demo/index.html](demo/index.html) trong trình duyệt. Trang dùng số liệu lab, có biểu đồ chi phí theo loại và bộ chọn kịch bản để trình bày. Các giá trị là ảnh chụp kết quả từ `src/lab13.py` và bảng chi phí.

Khi nhận được hồ sơ nhóm kia, vào **Phiếu chấm**, nhập tên nhóm, điểm 0/5/10 và bằng chứng cho từng tiêu chí, rồi ghi quyết định và câu hỏi. Bản nháp lưu trên trình duyệt đang dùng nếu trình duyệt cho phép. Có thể điền câu trả lời sau phiên duyệt. Bấm **Tải phiếu Markdown**, xem lại tệp đã tải rồi cập nhật `report/team/phieu_cham.md` từ tệp đó.
