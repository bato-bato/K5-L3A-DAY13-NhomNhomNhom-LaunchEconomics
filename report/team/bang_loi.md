# Bảng lỗi và cách khắc phục · Nhiệm vụ C

20 ca lỗi nằm trong `docs/Ngay13_Lab13_De_bai_hoc_vien.docx`. Năm loại theo Google PAIR: **Do người dùng · Hệ thống · Ngữ cảnh · Giới hạn hệ thống · Ngầm**. Gắn nhãn theo nguyên nhân gốc, không theo chỗ cần sửa.

## Nhãn tham khảo và đối chiếu độc lập

Nhãn tham khảo do thành viên kiểm số rà theo [hướng dẫn Lab 13](../../docs/Lab13_Huong_dan_chi_tiet_buoi_chieu.md#nhãn-tham-khảo-cho-20-ca). [Bản kiểm số](kiem_so_thanh_vien_2.md#c--bảng-đối-chiếu-20-ca) ghi lý do từng ca.

Người gắn nhãn 1 là thành viên kiểm số. Người gắn nhãn 2 là thành viên giữ hồ sơ. Dấu **—** biểu thị chưa có dữ liệu gốc để điền.

| Ca | Nhãn tham khảo | Nhãn gốc người 1 | Nhãn gốc người 2 | Trùng? | Nhãn thống nhất |
| ---: | --- | --- | --- | --- | --- |
| 1 | Do người dùng | — | — | — | — |
| 2 | Hệ thống | — | — | — | — |
| 3 | Ngữ cảnh | — | — | — | — |
| 4 | Giới hạn hệ thống | — | — | — | — |
| 5 | Ngầm | — | — | — | — |
| 6 | Do người dùng | — | — | — | — |
| 7 | Hệ thống | — | — | — | — |
| 8 | Hệ thống | — | — | — | — |
| 9 | Do người dùng | — | — | — | — |
| 10 | Ngữ cảnh | — | — | — | — |
| 11 | Giới hạn hệ thống | — | — | — | — |
| 12 | Ngầm | — | — | — | — |
| 13 | Giới hạn hệ thống | — | — | — | — |
| 14 | Do người dùng | — | — | — | — |
| 15 | Hệ thống | — | — | — | — |
| 16 | Ngữ cảnh | — | — | — | — |
| 17 | Ngầm | — | — | — | — |
| 18 | Ngữ cảnh | — | — | — | — |
| 19 | Giới hạn hệ thống | — | — | — | — |
| 20 | Hệ thống | — | — | — | — |

**Tỉ lệ đồng thuận** chưa tính vì hồ sơ chưa có hai bản nhãn gốc. Khi có đủ, đếm số ca trùng và chia cho 20. Ngưỡng của bài là 16/20 (80%).

## Quy tắc phân biệt khi đối chiếu

- **Ca 6 và 9:** Xét thao tác gây lỗi ban đầu. Chọn sai mục hoặc nhập sai mã là lỗi do người dùng. Gợi ý sửa là biện pháp khắc phục.
- **Ca 8 và 15:** Căn cứ sai hoặc phép tính sai xuất hiện ngay trong kết quả hay lúc nhân viên xem lại. Gắn nhãn hệ thống.
- **Ca 12:** Kết quả vẫn đúng, nhưng chi phí token cao gấp ba trong ba tuần mà không ai phát hiện. Gắn nhãn ngầm.
- **Ca 13:** Yêu cầu bảo hiểm ngoài phạm vi hỗ trợ. Gắn nhãn giới hạn hệ thống, đồng thời sửa cách giải thích và chuyển giao.
- **Ca 18:** Số tiền đúng theo chính sách, khách thiếu thông tin để hiểu cách tính. Gắn nhãn ngữ cảnh.

## Bảng khắc phục cho 5 ca, mỗi loại một ca

Năm ca dưới đây được chọn theo nhãn tham khảo. Các ngưỡng là đề xuất cho pilot.

| Ca | Loại | Phát hiện | Khắc phục | Người phụ trách |
| ---: | --- | --- | --- | --- |
| 9 | Do người dùng | Đếm lượt nhập sai loại mã hằng ngày. Rà nếu vượt 2% lượt nhập. | Kiểm tra định dạng tại trường nhập, chỉ rõ cần mã vận đơn và hướng dẫn nơi tìm mã. | PM trợ lý hoàn phí |
| 7 | Hệ thống | Đối soát mỗi giờ thông báo thành công với giao dịch sổ cái cùng `request_id`. Cảnh báo nếu có ít nhất 1 thông báo thiếu giao dịch xác nhận. | Chỉ báo hoàn tất sau xác nhận ghi sổ. Khi API trả 503 và chưa xác định trạng thái, chuyển giao kèm mã yêu cầu và trạng thái đối soát. | Kỹ sư trưởng agent |
| 18 | Ngữ cảnh | Rà yêu cầu mở lại hằng tuần. Mở kiểm tra mẫu thông báo nếu có ít nhất 1 ca khách báo hoàn thiếu trong khi số tiền đúng. | Thông báo rõ phí gốc, tỷ lệ hoàn và phép tính, ví dụ 30.000 đ × 50% = 15.000 đ. | Trưởng nhóm CSKH |
| 13 | Giới hạn hệ thống | Kiểm tra hằng tuần các yêu cầu hoàn phí bảo hiểm. Rà nếu có ít nhất 1 ca ngoài phạm vi được trả lời theo chính sách vận chuyển. | Nêu rõ phạm vi hỗ trợ, hướng khách đến kênh bảo hiểm của đối tác hoặc chuyển giao kèm tóm tắt. | PM trợ lý hoàn phí |
| 17 | Ngầm | Khi đổi bảng giá, đối chiếu giao dịch dưới 2 kg với bảng đang có hiệu lực. Trong tuần đầu kiểm tra hằng ngày và cảnh báo từ 1 ca chênh lệch. | Ghi phiên bản bảng giá vào trace, làm mới bộ nhớ đệm khi đổi giá, rà và điều chỉnh các giao dịch bị ảnh hưởng. | Kế toán trưởng |
