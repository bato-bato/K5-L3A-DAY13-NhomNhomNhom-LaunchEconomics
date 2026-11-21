# Bảng lỗi và cách khắc phục · Nhiệm vụ C

20 ca lỗi nằm trong `docs/Ngay13_Lab13_De_bai_hoc_vien.docx`. Năm loại theo Google PAIR: **Do người dùng · Hệ thống · Ngữ cảnh · Giới hạn hệ thống · Ngầm**. Gắn nhãn theo nguyên nhân gốc, không theo chỗ cần sửa.

## Hai bộ nhãn độc lập

Người gắn nhãn 1: ... · Người gắn nhãn 2: ... (gắn trong 8 phút, không trao đổi)

| Ca | Nhãn người 1 | Nhãn người 2 | Trùng? | Nhãn thống nhất |
| --: | --- | --- | --- | --- |
| 1 | ... | ... | ... | ... |
| 2 | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... |
| 4 | ... | ... | ... | ... |
| 5 | ... | ... | ... | ... |
| 6 | ... | ... | ... | ... |
| 7 | ... | ... | ... | ... |
| 8 | ... | ... | ... | ... |
| 9 | ... | ... | ... | ... |
| 10 | ... | ... | ... | ... |
| 11 | ... | ... | ... | ... |
| 12 | ... | ... | ... | ... |
| 13 | ... | ... | ... | ... |
| 14 | ... | ... | ... | ... |
| 15 | ... | ... | ... | ... |
| 16 | ... | ... | ... | ... |
| 17 | ... | ... | ... | ... |
| 18 | ... | ... | ... | ... |
| 19 | ... | ... | ... | ... |
| 20 | ... | ... | ... | ... |

**Tỉ lệ đồng thuận:** ... / 20 = ...%

## Quy tắc phân biệt cho các ca không trùng

Mỗi ca không trùng một câu. Đồng thuận dưới 80% thì ghi định nghĩa đã viết lại.

- ...

## Bảng khắc phục cho 5 ca, mỗi loại một ca

Cách phát hiện phải đo được (event, ngưỡng, tần suất). Người phụ trách là một vai trò, không ghi "cả đội".

| Ca | Loại lỗi | Phát hiện bằng gì | Khắc phục thế nào | Ai phụ trách |
| --: | --- | --- | --- | --- |
| ... | Do người dùng | ... | ... | ... |
| ... | Hệ thống | ... | ... | ... |
| ... | Ngữ cảnh | ... | ... | ... |
| ... | Giới hạn hệ thống | ... | ... | ... |
| ... | Ngầm | ... | ... | ... |

## Cách hoàn tất trong buổi lab

1. Mỗi người làm một bản riêng trong 8 phút và lưu bản gốc trước khi so. Điền cột của từng người đúng theo bản đã lưu.
2. Đếm số dòng trùng rồi chia cho 20. Nếu dưới 16 dòng trùng, rà định nghĩa và ghi quy tắc xử lý bất đồng. Lưu riêng nhãn thống nhất.
3. Sau khi thống nhất, dùng bảng dưới để chọn cách phát hiện và khắc phục cho từng ca thực tế.

| Loại | Tín hiệu kiểm tra gợi ý | Biện pháp dự thảo | Người phụ trách |
| --- | --- | --- | --- |
| Do người dùng | Đếm yêu cầu sai định dạng theo lý do trong ngày. Rà nếu vượt 2%. | Kiểm tra kiểu mã khi nhập và đưa ví dụ sửa lỗi ngay tại trường nhập. | PM trợ lý hoàn phí |
| Hệ thống | Đối soát mỗi giờ thông báo hoàn tiền với bản ghi sổ cái cùng request_id. Cảnh báo ngay khi có thông báo thành công thiếu giao dịch hợp lệ. | Chỉ báo hoàn tất sau xác nhận ghi sổ. Dùng khóa chống trùng và chuyển giao khi trạng thái chưa xác định. | Kỹ sư trưởng agent |
| Ngữ cảnh | Theo tuần, lấy mẫu yêu cầu mở lại vì khách không hiểu kết quả rồi đối chiếu chính sách. | Hiển thị công thức tính tiền và lý do áp dụng trong thông báo. | Trưởng nhóm CSKH |
| Giới hạn hệ thống | Đếm lượt chuyển giao do thiếu dữ liệu hoặc ngoài phạm vi theo loại yêu cầu mỗi tuần. | Dừng tự xử lý khi thiếu trường bắt buộc, chuyển giao kèm lý do và thông tin đã kiểm tra. | PM trợ lý hoàn phí |
| Ngầm | Kế toán kiểm 100 giao dịch mỗi tuần, đối chiếu bản giá và số tiền. Rà ngay khi có ít nhất 1 giao dịch lệch. | Ghi phiên bản chính sách bằng trace và vô hiệu hóa bộ nhớ đệm khi đổi bảng giá. | Kế toán trưởng |
