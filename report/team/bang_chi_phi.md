# Bảng chi phí · Nhiệm vụ A và B

Kết quả đối chiếu từ `src/lab13.py`, chạy trên 1.200 yêu cầu và 1.624 lần chạy. Các giá trị tiền được làm tròn khi trình bày.

## A1 · Ba phép thử đáp án biết trước

| Phép thử (p = 0,8) | Kết quả |
| --- | ---: |
| Số lần chạy trung bình, tối đa 2 lần | 1,20 |
| Số lần chạy trung bình, chạy đến khi đúng | 1,25 |
| Hệ số chi phí mỗi việc thành công, tối đa 3 lần | 1,25 |

Với xác suất đúng mỗi lần cố định và độc lập, cả số lần chạy kỳ vọng và xác suất thành công đều chứa thừa số `1 − (1 − p)^k`. Hệ số chi phí là `1/p`.

## A2 · Mô hình chi phí từ trace

| Khoản | Giá trị | Nguồn | Nhãn |
| --- | ---: | --- | --- |
| Token | 245.585 đ | Token vào × 26 đ/1.000 + token ra × 130 đ/1.000 | Trace |
| Tool | 84.000 đ | 5.600 lượt × 15 đ | Trace |
| Trong đó, token và tool cho lần 2 và 3 | 93.804 đ | `attempt > 1`, đã nằm trong hai dòng trên | Trace |
| Xem lại | 1.780.000 đ | 890 phút × 2.000 đ | simulated |
| Làm lại | 2.264.000 đ | 1.132 phút × 2.000 đ | simulated |
| Tổng chi phí | 4.373.585 đ | Token + tool + xem lại + làm lại | simulated |
| Số việc thành công | 978 | `ket_qua == 'thanh_cong'` | Yêu cầu |
| Chi phí mỗi việc thành công | 4.471,97 đ | Tổng chi phí ÷ 978 | simulated |
| Hóa đơn token và tool chia cho số yêu cầu | 274,65 đ | (Token + tool) ÷ 1.200 | Trace |

- Chi phí mỗi việc thành công gấp **16,28 lần** hóa đơn trung bình (`simulated`). Tính mọi lần chạy vào tử số vì lần lỗi vẫn tốn tài nguyên. Mẫu số đếm 978 yêu cầu thực sự thành công.
- Làm lại chiếm nhiều nhất, **51,77%** tổng chi phí (`simulated`).
- Với phép so sánh cấp hệ thống, cộng 222 ca × 12.000 đ rồi chia 1.200, được khoảng **5.865 đ/yêu cầu** (`simulated`), chưa cộng chi phí cố định.

## A3 · Tách theo loại yêu cầu

| Loại | Số yêu cầu | Tỉ lệ thành công | Lần chạy/yêu cầu | Chi phí/thành công (simulated) | So với 12.000 đ (simulated) |
| --- | ---: | ---: | ---: | ---: | ---: |
| noi_dia | 824 | 95,02% | 1,11 | 2.695,64 đ | 0,22× |
| hang_nang | 158 | 74,05% | 1,47 | 8.220,73 đ | 0,69× |
| quoc_te | 150 | 27,33% | 2,32 | 22.515,17 đ | 1,88× |
| doi_tac | 68 | 54,41% | 1,88 | 10.214,87 đ | 0,85× |

- Loại `quoc_te` khỏi pilot. Chỉ 41/150 yêu cầu thành công và chi phí đạt **1,88×** (`simulated`). Tỷ lệ lần chạy `ok` giảm từ **45/150** xuống **12/105** rồi **2/93**. Chạy đến lần 3 tạo ít lượt `ok` trong mẫu.
- Giữ phạm vi `noi_dia` và `hang_nang`. `doi_tac` có biên chi phí hẹp hơn và tỷ lệ thành công **54,41%**.

## A4 · Chi phí cố định (phạm vi noi_dia + hang_nang)

Nhân khối lượng toàn hệ thống với **900/1.200** để dự báo số việc thành công trong phạm vi. Chi phí biến đổi trong phạm vi là **3.413,90 đ/việc thành công** (`simulated`).

| Khối lượng toàn hệ thống | Việc thành công mỗi tháng trong phạm vi | Cố định/việc | Tổng/việc (simulated) | So với 12.000 đ (simulated) |
| --- | ---: | ---: | ---: | ---: |
| 45.000 yêu cầu/tháng | 33.750 | 1.185,19 đ | 4.599,09 đ | 0,38× |
| 22.500 yêu cầu/tháng | 16.875 | 2.370,37 đ | 5.784,27 đ | 0,48× |

- Ở cả hai mức, chi phí mỗi việc thành công vẫn dưới mốc 12.000 đ. Giảm một nửa khối lượng làm phần cố định mỗi việc tăng gấp đôi.

## B1 · Đổi từng yếu tố

Mốc so sánh là **4.471,97 đ/việc thành công** (`simulated`). Mỗi dòng dùng một lần gọi `mo_hinh`.

| Kịch bản | Thay đổi đầu vào | Chi phí/thành công (simulated) | Thay đổi (simulated) |
| --- | --- | ---: | ---: |
| Giá token gấp đôi | 52 đ và 260 đ/1.000 token | 4.723,08 đ | +5,62% |
| Giá token giảm một nửa | 13 đ và 65 đ/1.000 token | 4.346,41 đ | −2,81% |
| Tỉ lệ xem lại gấp đôi | Chi phí xem lại × 2 | 6.292,01 đ | +40,70% |
| Tỉ lệ xem lại giảm một nửa | Chi phí xem lại × 0,5 | 3.561,95 đ | −20,35% |
| Số ca làm lại gấp đôi | Chi phí làm lại × 2 | 6.786,90 đ | +51,77% |
| Số ca làm lại giảm một nửa | Chi phí làm lại × 0,5 | 3.314,50 đ | −25,88% |
| Lương nhân viên tăng 25% | 2.500 đ/phút | 5.505,71 đ | +23,12% |
| Tối đa 2 lần chạy | Giữ attempt ≤ 2, chuyển giao ca vượt giới hạn | 4.237,29 đ | −5,25% |
| Chỉ 1 lần chạy | Giữ attempt = 1, chuyển giao ca vượt giới hạn | 4.110,99 đ | −8,07% |

## B2 · Đổi một cặp và xếp hạng

- Token và xem lại cùng gấp đôi cho **6.543,12 đ (+46,31%)** (`simulated`). Mức tăng bằng tổng hai hiệu ứng riêng trước khi làm tròn vì các khoản chi cộng trực tiếp và số việc thành công giữ nguyên.
- Theo các mức thay đổi đã thử, ba yếu tố mạnh nhất là làm lại (**+51,77%**), xem lại (**+40,70%**), lương (**+23,12%**) (`simulated`).

## B3 · Giới hạn chạy lại

Tổng hệ thống bằng tổng trợ lý cộng **12.000 đ × số yêu cầu không thành công**.

| Giới hạn | Tổng trợ lý (simulated) | Không thành công | Tổng hệ thống (simulated) | Chi phí/thành công (simulated) |
| --- | ---: | ---: | ---: | ---: |
| 1 lần | 3.621.781 đ | 319 | 7.449.781 đ | 4.110,99 đ |
| 2 lần | 4.093.220 đ | 234 | 6.901.220 đ | 4.237,29 đ |
| 3 lần | 4.373.585 đ | 222 | 7.037.585 đ | 4.471,97 đ |

- **2 lần** cho tổng chi phí hệ thống thấp nhất, **6.901.220 đ**. **1 lần** có chi phí/thành công thấp nhất, **4.110,99 đ**, và để lại thêm **85** ca cần nhân viên so với 2 lần (`simulated` cho chi phí).

## B4 · Xem lại tất cả đề xuất

- Có **948/982** yêu cầu với ít nhất một lần chạy `ok`. Nếu xem lại 5 phút mỗi đề xuất và làm lại 48 ca × 9 phút, chi phí là **11.742,79 đ/việc**. Tại **15,3 phút làm lại/ca** (trung bình toàn mẫu, làm tròn 1 chữ số), chi phí lên **12.414,79 đ/việc** (`simulated`).
- Pilot cần đo phút làm lại và phút xem lại thực tế. Nếu phải xem lại toàn bộ, điểm hòa vốn xấp xỉ **5,12 phút** hoặc **4,80 phút** xem lại/ca tương ứng với hai giả định làm lại trên (`simulated`).
