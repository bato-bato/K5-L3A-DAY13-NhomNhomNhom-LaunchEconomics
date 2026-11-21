# Bảng lỗi và cách khắc phục · Nhiệm vụ C

20 ca lỗi nằm trong `docs/Ngay13_Lab13_De_bai_hoc_vien.docx`. Năm loại theo Google PAIR: **Do người dùng · Hệ thống · Ngữ cảnh · Giới hạn hệ thống · Ngầm**. Gắn nhãn theo nguyên nhân gốc, không theo chỗ cần sửa.

## Đối chiếu nhãn CP3

**Người gắn nhãn 1 là Thiên Bảo. Người gắn nhãn 2 là Nguyễn Quỳnh Trang.** Thiên Bảo đã rà nhãn tham khảo theo hướng dẫn lab và ghi lý do trong [bản kiểm số](kiem_so_thanh_vien_2.md#c--bảng-đối-chiếu-20-ca). Trang đã đưa bộ nhãn đề xuất và lý do vào bảng.

| Ca | Nhãn tham khảo của Thiên Bảo (1) | Nhãn đề xuất của Trang (2) | Trùng? | Nhãn thống nhất |
| ---: | --- | --- | --- | --- |
| 1 | Do người dùng | Do người dùng | Có | Do người dùng |
| 2 | Hệ thống | Hệ thống | Có | Hệ thống |
| 3 | Ngữ cảnh | Ngữ cảnh | Có | Ngữ cảnh |
| 4 | Giới hạn hệ thống | Giới hạn hệ thống | Có | Giới hạn hệ thống |
| 5 | Ngầm | Ngầm | Có | Ngầm |
| 6 | Do người dùng | Do người dùng | Có | Do người dùng |
| 7 | Hệ thống | Hệ thống | Có | Hệ thống |
| 8 | Hệ thống | Hệ thống | Có | Hệ thống |
| 9 | Do người dùng | Do người dùng | Có | Do người dùng |
| 10 | Ngữ cảnh | Ngữ cảnh | Có | Ngữ cảnh |
| 11 | Giới hạn hệ thống | Giới hạn hệ thống | Có | Giới hạn hệ thống |
| 12 | Ngầm | Ngầm | Có | Ngầm |
| 13 | Giới hạn hệ thống | Giới hạn hệ thống | Có | Giới hạn hệ thống |
| 14 | Do người dùng | Do người dùng | Có | Do người dùng |
| 15 | Hệ thống | Hệ thống | Có | Hệ thống |
| 16 | Ngữ cảnh | Ngữ cảnh | Có | Ngữ cảnh |
| 17 | Ngầm | Ngầm | Có | Ngầm |
| 18 | Ngữ cảnh | Ngữ cảnh | Có | Ngữ cảnh |
| 19 | Giới hạn hệ thống | Giới hạn hệ thống | Có | Giới hạn hệ thống |
| 20 | Hệ thống | Hệ thống | Có | Hệ thống |

**Kết quả đối chiếu:** 20/20 ca trùng (100%). Đây là tỷ lệ khớp giữa nhãn tham khảo và nhãn đề xuất. Hồ sơ chưa có bằng chứng để tính đồng thuận độc lập theo yêu cầu của lab.

## Căn cứ cho bộ nhãn đề xuất số 2

| Ca | Lý do |
| --: | --- |
| 1 | Khách nhập tài khoản thiếu 2 chữ số, tạo đầu vào sai. |
| 2 | Kiện 28 kg nhưng gọi tool theo hàng thường, hoàn thiếu 45.000 đ. |
| 3 | Hoàn về ví đúng thiết kế trong 5 phút nhưng khách chờ tiền về ngân hàng. |
| 4 | Không có dữ liệu chặng nước ngoài để xác định trạng thái. |
| 5 | Kiểm tra cuối tuần mới thấy 14 đơn hoàn thừa, không khách hoặc cảnh báo nào phát hiện trước đó. |
| 6 | Khách chọn nhầm luồng giao trễ dù mô tả hàng vỡ. |
| 7 | Ghi sổ lỗi 503 sau 3 lần thử nhưng vẫn báo thành công. |
| 8 | Căn cứ hiển thị dẫn điều 7.2 không tồn tại, dù số tiền đúng. |
| 9 | Khách nhập mã sàn thay mã vận đơn; thiếu hướng dẫn là điểm cần sửa. |
| 10 | Từ chối đúng điều khoản bão nhưng không khớp kỳ vọng từ cam kết 24 giờ. |
| 11 | Chưa hỗ trợ đầu vào âm thanh 40 giây. |
| 12 | Chi phí token gấp 3 trong 3 tuần mà không ai nhận ra, dù kết quả đúng. |
| 13 | Bảo hiểm đối tác nằm ngoài phạm vi; cách thông báo giới hạn chưa rõ. |
| 14 | Khách bấm nhầm xác nhận đã nhận tiền. |
| 15 | Trễ 26 giờ phải hoàn 50% nhưng tính 100%; nhân viên đã bắt lỗi. |
| 16 | Gửi lúc 2:14 sáng đúng thiết kế gửi ngay nhưng không phù hợp hoàn cảnh khách. |
| 17 | Dùng bảng giá cũ cho 212 đơn trong 9 ngày mà không ai mở lại. |
| 18 | Đúng 30.000 đ × 50% = 15.000 đ nhưng thiếu giải thích nên khách hiểu sai. |
| 19 | Đơn 14 tháng vượt cửa sổ dữ liệu 12 tháng. |
| 20 | Thiếu khóa chống trùng dẫn tới hoàn 2 lần cho cùng đơn. |

## Quy tắc phân biệt cho các ca không trùng

Mỗi ca không trùng một câu. Đồng thuận dưới 80% thì ghi định nghĩa đã viết lại.

Hai cột hiện tại khớp ở cả 20 ca. Các quy tắc dưới đây dùng để rà các ca dễ nhầm:

- Ca 6, 9: đầu vào sai thuộc Do người dùng; thiếu hướng dẫn là phần cần khắc phục.
- Ca 8, 15: lỗi hiển thị hoặc đã được nhân viên bắt thuộc Hệ thống. Ca 5, 12, 17 chỉ lộ qua kiểm tra thuộc Ngầm; lỗi ngầm có thể là chi phí.
- Ca 13: ngoài phạm vi thuộc Giới hạn hệ thống dù cách phản hồi chưa tốt.
- Ca 3, 10, 16, 18: đúng thiết kế/chính sách nhưng không khớp kỳ vọng hoặc hoàn cảnh thuộc Ngữ cảnh.

## Bảng khắc phục cho 5 ca, mỗi loại một ca

Cách phát hiện phải đo được (event, ngưỡng, tần suất). Người phụ trách là một vai trò, không ghi "cả đội".

### Cách hoàn tất trong buổi lab

1. Mỗi người làm một bản riêng trong 8 phút và lưu bản gốc trước khi so. Giữ hai bản đã lưu làm bằng chứng khi báo cáo đồng thuận độc lập.
2. Đếm số dòng trùng rồi chia cho 20. Nếu dưới 16 dòng trùng, rà định nghĩa và ghi quy tắc xử lý bất đồng. Lưu riêng nhãn thống nhất.
3. Sau khi thống nhất, chọn một ca thật cho mỗi loại và điền mã ca vào bảng khắc phục. Điều chỉnh tín hiệu và biện pháp dự thảo theo nội dung của ca đã chọn.

Các ca dưới đây được chọn theo nhãn đề xuất và nhãn tham khảo để nhóm xác nhận. Event và ngưỡng là đề xuất cho pilot, chưa phải kết quả đo hay biện pháp đã triển khai. Mỗi event có request_id, trace_id, thời điểm và ID để loại trùng.

| Ca đề xuất | Loại | Phát hiện đo được | Biện pháp | Người phụ trách |
| ---: | --- | --- | --- | --- |
| 9 | Do người dùng | Event input_validation_failed, reason=wrong_identifier_type; mỗi ngày tính số yêu cầu sai kiểu mã / số yêu cầu nhập mã, cảnh báo khi >2%. | Nhận diện mã sàn, tra ánh xạ sang mã vận đơn nếu có; nếu không, hiển thị ví dụ và vị trí lấy mã để khách nhập lại. | PM trợ lý hoàn phí |
| 7 | Hệ thống | Bổ sung customer_notification_sent; đối soát mỗi giờ thông báo đã hoàn với refund_ledger_write.result=ok theo yêu cầu và giao dịch; ≥1 ca thiếu xác nhận thì cảnh báo ngay. | Chỉ báo đã hoàn sau xác nhận sổ cái; sau 3 lần lỗi 503, báo đang xử lý và chuyển nhân viên kèm mã yêu cầu và trạng thái đối soát giao dịch. | Kỹ sư trưởng agent |
| 18 | Ngữ cảnh | Mỗi tuần rà ticket_reopened.reason=amount_dispute với audit_sample_checked và customer_notification_sent; ≥1 ca tiền đúng nhưng thiếu cách tính thì sửa mẫu tin nhắn. | Ghi rõ phí gốc, tỷ lệ, kết quả và căn cứ: 30.000 đ × 50% = 15.000 đ. | Trưởng nhóm CSKH |
| 4 | Giới hạn hệ thống | Tổng hợp handoff_to_staff.reason=missing_foreign_leg_data hàng tuần; ≥1 ca thiếu dữ liệu vẫn tự hoàn hoặc thiếu chuyển giao thì cảnh báo. | Loại quoc_te khỏi pilot; kiểm dữ liệu bắt buộc trước tính tiền, chuyển giao kèm thông tin đã tra và phần còn thiếu. | PM trợ lý hoàn phí |
| 17 | Ngầm | Kiểm 100 giao dịch/tuần bằng audit_sample_checked, đối chiếu tiền và policy_version với bảng giá hiệu lực; ≥1 ca lệch thì điều tra và mở rộng kiểm tra. | Vô hiệu hóa cache khi đổi giá, ghi phiên bản chính sách vào trace; chặn bản hết hiệu lực và đối soát giao dịch bị ảnh hưởng. | Kế toán trưởng |

Thiên Bảo đề xuất ca 13 làm phương án thay thế cho ca 4. Kiểm tra hằng tuần các yêu cầu bảo hiểm và rà nếu có ít nhất một ca ngoài phạm vi bị áp nhầm chính sách vận chuyển. PM trợ lý hoàn phí phụ trách cập nhật hướng dẫn đến kênh bảo hiểm của đối tác hoặc chuyển giao kèm tóm tắt.
