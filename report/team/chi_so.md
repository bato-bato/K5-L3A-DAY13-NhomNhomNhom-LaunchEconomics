# Đặc tả chỉ số, event và rủi ro kinh tế · Nhiệm vụ E

## E1 · Đặc tả chỉ số

Các tỷ lệ dưới đây mô tả đợt chạy thử trong dữ liệu lab. Mức tác động sẽ được ước lượng bằng so sánh hai nhánh trong pilot.

| Loại | Chỉ số | Công thức | Tính thử |
| --- | --- | --- | ---: |
| Chính | Đóng trong 24 giờ và không mở lại trong 7 ngày | Số yêu cầu thỏa cả hai điều kiện ÷ số yêu cầu đủ thời gian theo dõi | 994/1.200 = 82,83% |
| Dùng | Sửa hoặc bỏ gợi ý | Số yêu cầu được xem lại có quyết định `sua` hoặc `bo` ÷ số yêu cầu được xem lại | 48/177 = 27,12% |
| An toàn | Tỷ lệ yêu cầu mở lại trong 7 ngày sau đóng | Số yêu cầu mở lại trong 7 ngày ÷ tổng yêu cầu của kỳ đo | 51/1.200 = 4,25% |
| Dùng | Độ phủ của trợ lý | Yêu cầu đủ điều kiện có lượt mở trợ lý ÷ tổng yêu cầu đủ điều kiện được phân vào nhánh can thiệp | Theo dõi trong pilot |
| An toàn | Hoàn sai số tiền trong mẫu kiểm toán | Số khoản có tiền ghi sổ khác số tiền đúng theo chính sách ÷ số khoản được kiểm toán | Kiểm toán hằng tuần |

## Danh sách event

Giữ `request_id` ổn định để tổng hợp theo yêu cầu. Ở event theo lượt chạy, `trace_id` nối tới trace của lần chạy. Ở event cấp yêu cầu và đối chứng, cấp `trace_id` khi tiếp nhận và ghi thêm trace của lần chạy nếu có. Mỗi event có thời điểm và ID để loại bản ghi trùng.

| Event | Ai tạo | Thuộc tính chính | Thời điểm |
| --- | --- | --- | --- |
| refund_request_created | Hệ thống ticket | request_id, trace_id, created_at, loai, depot, staff_id, arm, eligible | Khi tiếp nhận |
| assistant_opened | Giao diện CSKH | request_id, trace_id, staff_id | Khi nhân viên mở trợ lý |
| agent_run_completed | Agent | request_id, trace_id, attempt, tokens_in, tokens_out, tool_calls, status, policy_version | Sau mỗi lần chạy |
| staff_review_decision | Giao diện CSKH | request_id, trace_id, staff_id, decision, elapsed_seconds | Khi lưu quyết định xem lại |
| staff_rework_completed | Giao diện CSKH | request_id, trace_id, elapsed_seconds, reason | Khi nhân viên làm lại xong |
| handoff_to_staff | Agent | request_id, trace_id, reason | Khi chuyển giao |
| refund_ledger_write | Dịch vụ sổ cái | request_id, trace_id, refund_id, idempotency_key, amount_vnd, result | Khi ghi sổ, kể cả lỗi |
| ticket_closed | Hệ thống ticket | request_id, trace_id, closed_at, resolution | Khi đóng |
| ticket_reopened | Hệ thống ticket | request_id, trace_id, reopened_at, reason | Khi mở lại |
| audit_sample_checked | Kế toán | request_id, trace_id, refund_id, actual_vnd, expected_vnd, policy_version | Khi kiểm tra mẫu |

- Chỉ số chính nối `refund_request_created`, `ticket_closed` và `ticket_reopened`. So lần đóng đầu tiên với thời điểm tiếp nhận và quan sát thêm 7 ngày sau đóng. Các ca chưa đủ cửa sổ theo dõi chờ kỳ sau.
- Chỉ số sửa/bỏ dùng quyết định xem lại cuối cùng của mỗi yêu cầu từ `staff_review_decision`.
- Chỉ số mở lại nối sự kiện tiếp nhận, đóng và mở lại. Đếm yêu cầu một lần. Chốt kỳ sau khi cửa sổ theo dõi đã đủ và báo riêng ca còn mở hoặc thiếu log.
- Độ phủ nối `refund_request_created` với `assistant_opened`, lọc theo điều kiện đủ và nhánh đã phân.
- Hoàn sai số tiền tính trên `audit_sample_checked`, đối soát khoản ghi sổ qua `refund_ledger_write`.
- Chi phí vận hành nối `agent_run_completed`, `staff_review_decision`, `staff_rework_completed`, `handoff_to_staff` và `ticket_closed` để có chi phí từng ca và kết quả cuối.

## E2 · Rủi ro kinh tế

| Rủi ro | Tác động đã tính | Dấu hiệu theo dõi | Hành động | Người phụ trách |
| --- | --- | --- | --- | --- |
| Làm lại tăng gấp đôi | 6.786,90 đ/việc, tăng 51,77% (simulated) | Tỷ lệ làm lại > 7% trong tuần, so với 48/982 = 4,89% trong phạm vi đợt thử | Rà 20 trace làm lại và kiểm tra xem ca tập trung ở loại nào | PM trợ lý hoàn phí |
| Phải xem lại toàn bộ đề xuất | 11.742,79–12.414,79 đ/việc, tùy phút làm lại (simulated) | Tỷ lệ đề xuất được xem lại > 50% ở cuối bước 25% hoặc thời gian xem lại trung bình vượt 4,80 phút | Giữ mức rollout, đo lại thời gian và xem dữ kiện kiểm toán trước khi thử giảm mức xem lại | Trưởng nhóm CSKH |
| Khối lượng còn một nửa dự kiến | Tăng phần cố định từ 1.185,19 lên 2.370,37 đ/việc thành công | Số việc thành công thấp hơn một nửa kế hoạch trong hai tuần | Tính lại chi phí toàn phần trước quyết định mở rộng | Giám đốc vận hành |
