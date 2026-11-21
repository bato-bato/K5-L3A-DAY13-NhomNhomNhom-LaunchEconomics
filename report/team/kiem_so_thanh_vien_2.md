# Kiểm số và bàn giao pilot · Thành viên 2

## A2 · Đối chiếu độc lập từ CSV

Đọc trực tiếp hai CSV bằng thư viện chuẩn Python và cộng tất cả 1.624 lượt chạy, gồm lượt lỗi. Dùng kết quả cuối của 1.200 yêu cầu để đếm 978 việc thành công.

| Khoản | Phép tính | Kết quả |
| --- | --- | ---: |
| Token đầu vào | 5.771.712 × 26 / 1.000 | 150.064,512 đ |
| Token đầu ra | 734.774 × 130 / 1.000 | 95.520,620 đ |
| Tool | 5.600 × 15 | 84.000 đ |
| Xem lại | 890 × 2.000 | 1.780.000 đ (simulated) |
| Làm lại | 1.132 × 2.000 | 2.264.000 đ (simulated) |
| Chi phí mỗi việc thành công | 4.373.585,132 ÷ 978 | **4.471,97 đ (simulated)** |

Kết quả A2 khớp với [bảng chi phí](bang_chi_phi.md). Ba chỉ số E1 đối chiếu từ CSV gồm **994/1.200 = 82,83%** đóng trong 24 giờ và không mở lại, **48/177 = 27,12%** sửa hoặc bỏ gợi ý trong các ca đã xem lại, **51/1.200 = 4,25%** mở lại trong 7 ngày. Trong phạm vi pilot, tỷ lệ mở lại là **39/982 = 3,97%**.

## D · Cỡ mẫu và điều kiện bàn giao

| Cách chia | Kết quả đối chiếu |
| --- | --- |
| Theo yêu cầu, phát hiện +5 điểm | 1.251 ca mỗi nhánh |
| Theo nhân viên, 75 ca/người | Hệ số thiết kế 2,48. Cần 3.103 ca và 42 người mỗi nhánh |
| Theo nhân viên, 20 người/nhánh | Trần hiệu dụng 1.000 mỗi nhánh |
| Theo depot, 6 depot/nhánh | Trần hiệu dụng 300 mỗi nhánh |
| Theo nhân viên, phát hiện +6 điểm | 20 × 299 = 5.980 ca/nhánh, hệ số thiết kế 6,96, tương đương 859,20 ca hiệu dụng |

- Thiết kế +6 điểm có power khoảng 64% khi mức tăng thật là +5 điểm. Mức +5 điểm vẫn là ngưỡng cải thiện ước lượng đề xuất để cân nhắc mở rộng. Xác nhận quy tắc quyết định với nhóm trước khi bật pilot.
- CSV chỉ quan sát được **20 nhân viên và 6 depot** trong phạm vi. Trước khi bật cần xác nhận danh sách **40 người**, mỗi nhánh 20 người, và kiểm lưu lượng theo từng nhân viên. Nếu tải lệch, kiểm cỡ mẫu hiệu dụng theo số ca thực tế của từng cụm.
- Với 1.500 ca/ngày toàn hệ thống và tỷ trọng 982/1.200 trong mẫu, cần khoảng **10 ngày thu ca** ở bước 50% nếu thu được toàn bộ lưu lượng ước tính và chia cân bằng. Lịch thực tế còn phải tính hai bước mở đầu, thời gian theo dõi đủ hạn và chênh lệch lưu lượng giữa nhân viên.
- Bàn giao cho người giữ hồ sơ các điều kiện chưa xác nhận gồm danh sách nhân viên, lưu lượng theo nhánh, mốc quyết định và các luật dừng trong [kế hoạch pilot](pilot_plan.yaml).

## C · Bảng đối chiếu 20 ca

Nhãn tham khảo đã đối chiếu với [hướng dẫn Lab 13](../../docs/Lab13_Huong_dan_chi_tiet_buoi_chieu.md#nhãn-tham-khảo-cho-20-ca). Tỷ lệ đồng thuận trong [bảng lỗi](bang_loi.md) lấy từ hai bản nhãn được lưu độc lập trước khi xem đáp án.

| Ca | Nhãn tham khảo | Lý do |
| ---: | --- | --- |
| 01 | Do người dùng | Nhập số tài khoản thiếu hai chữ số. |
| 02 | Hệ thống | Tra bảng giá hàng thường cho kiện hàng nặng. |
| 03 | Ngữ cảnh | Hệ thống hoàn vào ví, khách chờ tiền về ngân hàng. |
| 04 | Giới hạn hệ thống | Thiếu dữ liệu chặng giao của hãng nước ngoài. |
| 05 | Ngầm | Hoàn theo giá trước giảm, chỉ phát hiện khi kiểm tra mẫu. |
| 06 | Do người dùng | Chọn mục giao trễ cho yêu cầu về hàng bị vỡ. |
| 07 | Hệ thống | Ghi sổ thất bại nhưng trợ lý vẫn báo thành công. |
| 08 | Hệ thống | Trích dẫn điều khoản không tồn tại. |
| 09 | Do người dùng | Nhập mã đơn của sàn thay cho mã vận đơn. |
| 10 | Ngữ cảnh | Chính sách bất khả kháng và cam kết 24 giờ tạo hai kỳ vọng khác nhau. |
| 11 | Giới hạn hệ thống | Trợ lý chưa xử lý được tin nhắn thoại. |
| 12 | Ngầm | Chi phí token tăng gấp ba trong ba tuần mà không ai phát hiện. |
| 13 | Giới hạn hệ thống | Hoàn phí bảo hiểm của đối tác ngoài phạm vi hỗ trợ. |
| 14 | Do người dùng | Bấm nhầm xác nhận đã nhận tiền. |
| 15 | Hệ thống | Tính hoàn 100% thay vì 50%, nhân viên phát hiện khi xem lại. |
| 16 | Ngữ cảnh | Thông báo gửi ngay theo thiết kế nhưng đến lúc 2:14 sáng. |
| 17 | Ngầm | Bảng giá cũ gây sai lệch trên 212 đơn mà không có ca mở lại. |
| 18 | Ngữ cảnh | Số tiền đúng, nhưng khách thiếu thông tin về cách tính. |
| 19 | Giới hạn hệ thống | Đơn đã 14 tháng, dữ liệu truy cập chỉ có 12 tháng. |
| 20 | Hệ thống | Thiếu khóa chống trùng nên hoàn hai lần cho cùng một đơn. |

## Bằng chứng nhóm cần bổ sung

1. Trên máy thứ hai của nhóm, vào `src/`, chạy `python lab13.py`, lưu dòng A1 và kết quả A–B, D1, E1 để đối chiếu.
2. Đối với [20 ca lỗi](../../docs/Ngay13_Lab13_De_bai_hoc_vien.docx), bàn giao hai bản nhãn gốc đã lưu trước khi xem đáp án nếu có. Nếu chưa có bản gốc, ghi rõ tình trạng khi tổng hợp. Ghi phần việc đã trực tiếp kiểm và cách dùng AI vào báo cáo cá nhân.
