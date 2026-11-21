"use strict";

const dong = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
const requestTypes = ["Nội địa", "Hàng nặng", "Quốc tế", "Đối tác"];
const manualCost = 12000;
// Tổng hợp từ hai CSV theo loại yêu cầu và giới hạn chạy, theo cách lọc của mo_hinh().
// Mỗi dòng gồm số yêu cầu, số thành công, chi phí token gốc (phần nghìn đồng),
// số lượt gọi tool, số phút xem lại và số phút làm lại.
const traceTotals = {
  3: [[824, 783, 130987298, 3180, 471, 495], [158, 117, 34035976, 786, 173, 285], [150, 41, 61346766, 1185, 145, 277], [68, 37, 19215092, 449, 101, 75]],
  2: [[824, 777, 128021478, 3116, 466, 475], [158, 115, 29369912, 684, 162, 240], [150, 41, 43680078, 876, 138, 256], [68, 33, 14698762, 354, 89, 75]],
  1: [[824, 723, 116607842, 2864, 432, 441], [158, 99, 22152546, 537, 150, 205], [150, 32, 25253358, 510, 100, 210], [68, 27, 9621898, 232, 80, 75]],
};
const scenarios = [
  { name: "Mức gốc", note: "Dùng đơn giá giả định ban đầu cho 1.200 yêu cầu." },
  { name: "Giá token gấp đôi", tokenFactor: 2, note: "Giá đầu vào tăng từ 26 lên 52 ₫ và đầu ra từ 130 lên 260 ₫ trên 1.000 token." },
  { name: "Xem lại gấp đôi", reviewFactor: 2, note: "Nhân đôi khoản chi phí xem lại, giữ nguyên các khoản khác." },
  { name: "Làm lại gấp đôi", reworkFactor: 2, note: "Nhân đôi khoản chi phí làm lại, giữ nguyên các khoản khác." },
  { name: "Lương tăng 25%", wage: 2500, note: "Lương tăng từ 2.000 ₫ lên 2.500 ₫ mỗi phút cho cả xem lại và làm lại." },
  { name: "Tối đa 2 lần chạy", limit: 2, note: "Tính tiền token và tool đến lượt 2. Ca cần nhiều lượt hơn được chuyển sang nhân viên." },
  { name: "Chỉ 1 lần chạy", limit: 1, note: "Tính tiền token và tool ở lượt đầu. Ca cần chạy lại được chuyển sang nhân viên." },
];

function calculateScenario(scenario) {
  const { limit = 3, tokenFactor = 1, reviewFactor = 1, reworkFactor = 1, wage = 2000 } = scenario;
  const groups = traceTotals[limit].map(([requests, successes, tokenMillis, calls, reviewMinutes, reworkMinutes], index) => ({
    label: requestTypes[index],
    requests,
    successes,
    token: tokenMillis * tokenFactor / 1000,
    tool: calls * 15,
    review: reviewMinutes * wage * reviewFactor,
    rework: reworkMinutes * wage * reworkFactor,
  }));
  const all = { label: "Tất cả yêu cầu", requests: 0, successes: 0, token: 0, tool: 0, review: 0, rework: 0 };
  const numericKeys = Object.keys(all).filter(key => key !== "label");
  for (const group of groups) {
    for (const key of numericKeys) all[key] += group[key];
  }
  return [all, ...groups].map(row => {
    const total = row.token + row.tool + row.review + row.rework;
    return { ...row, total, cost: total / row.successes };
  });
}

const scenarioResults = scenarios.map(calculateScenario);
const chartMax = Math.ceil(Math.max(manualCost, ...scenarioResults.flatMap(rows => rows.slice(1).map(row => row.cost))) / 5000) * 5000;
const preciseDong = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 3 });
const decimal = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2 });
const integer = new Intl.NumberFormat("vi-VN");

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
  for (const button of document.querySelectorAll("[data-metric]")) {
    button.addEventListener("click", () => {
      document.getElementById(button.dataset.metric).showModal();
    });
  }

  const chart = document.getElementById("cost-chart");
  chart.style.setProperty("--benchmark", `${manualCost / chartMax * 100}%`);
  const picker = document.getElementById("scenario");
  const detail = document.getElementById("scenario-detail");
  const detailTitle = document.getElementById("scenario-detail-title");
  const detailContent = document.getElementById("scenario-detail-content");

  function showScenarioDetail(rowIndex) {
    const index = Number(picker.value);
    const scenario = scenarios[index];
    const row = scenarioResults[index][rowIndex];
    const lines = [
      ["Token đầu vào và đầu ra", row.token],
      ["Gọi tool", row.tool],
      ["Nhân viên xem lại", row.review],
      ["Nhân viên làm lại", row.rework],
    ];
    detailTitle.textContent = `${scenario.name} · ${row.label}`;
    detailContent.innerHTML = `
      <p class="metric-formula">${preciseDong.format(row.total)} ÷ ${integer.format(row.successes)}
        ≈ <strong>${decimal.format(row.cost)} ₫</strong></p>
      <p>${scenario.note}</p>
      <dl class="cost-breakdown">
        ${lines.map(([label, amount]) => `<div><dt>${label}</dt><dd>${preciseDong.format(amount)}</dd></div>`).join("")}
      </dl>
      <p>Mẫu số là ${integer.format(row.successes)} yêu cầu thành công trên ${integer.format(row.requests)}
        yêu cầu của nhóm đang xem. Tổng chi phí trợ lý gồm cả chi phí token và tool của lượt lỗi đã chạy.</p>
      ${scenario.limit ? "<p>Các ca vượt giới hạn không góp vào số việc thành công hoặc chi phí xem lại và làm lại. Chi phí nhân viên xử lý thay được tính riêng trong tổng chi phí hệ thống.</p>" : ""}
    `;
    detail.showModal();
  }

  const chartRows = requestTypes.map((label, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chart-row";
    button.setAttribute("aria-haspopup", "dialog");
    button.innerHTML = `<span class="bar-label"><span>${label}</span><strong></strong></span>
      <span class="track" aria-hidden="true"><span class="bar"></span></span>`;
    button.addEventListener("click", () => showScenarioDetail(index + 1));
    chart.append(button);
    return { amount: button.querySelector("strong"), bar: button.querySelector(".bar") };
  });
  document.getElementById("scenario-explain").addEventListener("click", () => showScenarioDetail(0));
  scenarios.forEach(({ name }, index) => picker.add(new Option(name, index)));

  function updateScenario() {
    const index = Number(picker.value);
    const { name, note } = scenarios[index];
    const [overall, ...groups] = scenarioResults[index];
    const delta = (overall.cost / scenarioResults[0][0].cost - 1) * 100;
    document.getElementById("scenario-cost").textContent = dong.format(overall.cost);
    document.getElementById("scenario-delta").textContent = delta === 0
      ? "Mức gốc"
      : `${delta > 0 ? "+" : ""}${decimal.format(delta)}%`;
    document.getElementById("scenario-note").textContent = note;
    document.getElementById("chart-scenario").textContent = name;
    groups.forEach(({ cost }, groupIndex) => {
      const { amount, bar } = chartRows[groupIndex];
      amount.textContent = dong.format(cost);
      bar.style.width = `${cost / chartMax * 100}%`;
      bar.classList.toggle("over", cost > manualCost);
    });
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
