"use strict";

const dong = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
const costs = [
  ["Nội địa", 2695.64],
  ["Hàng nặng", 8220.73],
  ["Quốc tế", 22515.17],
  ["Đối tác", 10214.87],
];
const scenarios = [
  ["Mức gốc", 4471.97, "Tính trên 978 việc thành công trong 1.200 yêu cầu."],
  ["Giá token gấp đôi", 4723.08, "Giữ nguyên chi phí gọi tool và thời gian nhân viên."],
  ["Xem lại gấp đôi", 6292.01, "Xem lại là yếu tố có tác động lớn thứ hai trong các kịch bản đã thử."],
  ["Làm lại gấp đôi", 6786.90, "Làm lại là yếu tố có tác động lớn nhất trong các kịch bản đã thử."],
  ["Lương tăng 25%", 5505.71, "Lương tăng từ 2.000 đ lên 2.500 đ mỗi phút."],
  ["Tối đa 2 lần chạy", 4237.29, "Tổng chi phí hệ thống thấp nhất trong ba giới hạn chạy đã thử."],
  ["Chỉ 1 lần chạy", 4110.99, "Chi phí mỗi việc thành công thấp nhất, với 85 ca chuyển sang nhân viên nhiều hơn so với giới hạn 2 lần."],
];

const rubric = [
  {
    title: "Đề xuất khớp bằng chứng",
    levels: [
      "Mâu thuẫn với số của chính nhóm",
      "Khớp nhưng bỏ qua một con số bất lợi",
      "Khớp, nêu cả con số bất lợi và cách xử lý",
    ],
  },
  {
    title: "Số giả lập và phạm vi",
    levels: [
      "Không nhãn; phạm vi mọi yêu cầu",
      "Có nhãn hoặc có thu hẹp phạm vi",
      "Nhãn ở mọi số giả lập; phạm vi thu hẹp có lý do bằng số",
    ],
  },
  {
    title: "Pilot ra được quyết định",
    levels: [
      "Không đối chứng hoặc thiếu cỡ mẫu",
      "Đủ cỡ mẫu, luật dừng chung chung",
      "Tách được tác động, đủ mẫu, luật dừng có ngưỡng, thời hạn, người có quyền dừng",
    ],
  },
];

const points = [0, 5, 10];
const storageKey = "day13.gate2a.review.v1";

function scoreReview(values) {
  const scores = rubric.map((_, index) => String(values[`score${index}`] ?? ""));
  const chosen = scores.filter(score => points.map(String).includes(score));
  return { count: chosen.length, total: chosen.reduce((sum, score) => sum + Number(score), 0) };
}

function markdownText(value, separator = " ") {
  return String(value ?? "").trim()
    .replace(/[\\`*_{}\[\]()#+.!|>~-]/g, "\\$&")
    .replaceAll("<", "&lt;").replace(/\r?\n/g, separator);
}

function makeReview(values) {
  const { count, total } = scoreReview(values);
  const required = ["reviewer", "team", "decision", "reason", "question", ...rubric.map((_, i) => `evidence${i}`)];
  if (count !== rubric.length || required.some(key => !String(values[key] ?? "").trim())) {
    throw new Error("Điền tên nhóm, đủ ba điểm, bằng chứng, quyết định và câu hỏi trước khi tải.");
  }

  const rows = rubric.map(({ title, levels }, index) =>
    `| ${title} | ${levels.join(" | ")} | ${values[`score${index}`]} | ${markdownText(values[`evidence${index}`], "<br>")} |`);
  return [
    "# Phiếu chấm hội đồng Gate 2a", "",
    `- Nhóm chấm (hội đồng): ${markdownText(values.reviewer)}`,
    `- Nhóm được chấm: ${markdownText(values.team)}`, "",
    "| Tiêu chí | 0 điểm | 5 điểm | 10 điểm | Điểm | Lý do (có số) |",
    "| --- | --- | --- | --- | ---: | --- |",
    ...rows, `| **Tổng** | | | | **${total} / 30** | |`, "",
    `**Quyết định của hội đồng:** ${markdownText(values.decision)}`, "",
    `**Lý do:** ${markdownText(values.reason)}`, "",
    `**Một câu hỏi cho đội trình:** ${markdownText(values.question)}`, "",
    `**Câu trả lời của đội trình:** ${markdownText(values.answer) || "Chờ phiên duyệt."}`, "",
  ].join("\n");
}

function mountDemo() {
  const chart = document.getElementById("cost-chart");
  for (const [label, cost] of costs) {
    const row = document.createElement("div");
    row.innerHTML = `<div class="bar-label"><span>${label}</span><strong>${dong.format(cost)}</strong></div>
      <span class="track" aria-hidden="true"><span class="bar${cost > 12000 ? " over" : ""}" style="width:${cost / 230}%"></span></span>`;
    chart.append(row);
  }

  const picker = document.getElementById("scenario");
  scenarios.forEach(([name], index) => picker.add(new Option(name, index)));
  function updateScenario() {
    const [, cost, note] = scenarios[Number(picker.value)];
    const delta = (cost / scenarios[0][1] - 1) * 100;
    document.getElementById("scenario-cost").textContent = dong.format(cost);
    document.getElementById("scenario-delta").textContent = delta === 0
      ? "Mức gốc"
      : `${delta > 0 ? "+" : ""}${delta.toLocaleString("vi-VN", { maximumFractionDigits: 2 })}%`;
    document.getElementById("scenario-note").textContent = note;
  }
  picker.addEventListener("change", updateScenario);
  updateScenario();

  document.getElementById("criteria").innerHTML = rubric.map(({ title, levels }, index) => `
    <fieldset>
      <legend>${title}</legend>
      <ul class="rubric">${levels.map((text, i) => `<li><strong>${points[i]} điểm</strong><span>${text}</span></li>`).join("")}</ul>
      <div class="fields score-fields">
        <label>Điểm
          <select name="score${index}" required>
            <option value="">Chọn điểm</option>
            ${points.map(point => `<option value="${point}">${point} điểm</option>`).join("")}
          </select>
        </label>
        <label>Bằng chứng hoặc số liệu<textarea name="evidence${index}" required rows="2"></textarea></label>
      </div>
    </fieldset>`).join("");

  const form = document.getElementById("review-form");
  const status = document.getElementById("save-status");
  const readForm = () => Object.fromEntries(new FormData(form));
  try {
    const draft = JSON.parse(localStorage.getItem(storageKey) || "{}");
    for (const field of form.elements) {
      if (field.name && typeof draft?.[field.name] === "string") field.value = draft[field.name];
    }
    status.textContent = Object.keys(draft ?? {}).length ? "Đã mở bản nháp trên trình duyệt này." : "";
  } catch {
    status.textContent = "Trình duyệt không mở được bản nháp.";
  }

  function updateTotal() {
    const { count, total } = scoreReview(readForm());
    document.getElementById("total").textContent = count ? `${total} / 30 · ${count}/3 mục` : "Chưa chấm";
  }
  updateTotal();
  form.addEventListener("input", () => {
    updateTotal();
    try {
      localStorage.setItem(storageKey, JSON.stringify(readForm()));
      status.textContent = "Đã lưu nháp trên trình duyệt này.";
    } catch {
      status.textContent = "Trình duyệt không lưu được nháp. Tải phiếu để giữ nội dung.";
    }
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    try {
      const markdown = makeReview(readForm());
      const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "phieu_cham.md";
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      status.textContent = "Đã tạo phiếu Markdown.";
    } catch (error) {
      status.textContent = error.message;
    }
  });
}

if (typeof document !== "undefined") mountDemo();
