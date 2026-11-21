"""Lab 13 · Định giá agent và lập kế hoạch pilot (Gate 2a) — bài làm của nhóm (file nộp).
Chạy trong thư mục src/: python3 lab13.py (cần pandas).
Không cần khoá API. Dữ liệu trong hai file CSV là giả lập.
Bản gốc chưa sửa nằm ở lab13_starter.py.
"""
import math
from statistics import NormalDist

import pandas as pd

# Bảng giá GIẢ ĐỊNH của lab (không phải giá thật của nhà cung cấp nào)
GIA_VAO = 26        # đồng cho 1.000 token đầu vào
GIA_RA = 130        # đồng cho 1.000 token đầu ra
GIA_TOOL = 15       # đồng cho 1 lần gọi tool
LUONG_PHUT = 2000   # đồng cho 1 phút của nhân viên (đã gồm bảo hiểm, văn phòng)
PHAM_VI_PILOT = ("noi_dia", "hang_nang")
BASELINE = 12000    # đồng cho 1 yêu cầu khi nhân viên tự làm (6 phút)


# ---------- Nhiệm vụ A1 · Kinh tế của việc chạy lại ----------
def so_lan_chay_ky_vong(p, k=None):
    """Số lần chạy trung bình cho 1 yêu cầu khi mỗi lần đúng với xác suất p.
    k = số lần chạy tối đa; k=None nghĩa là chạy lại đến khi đúng."""
    if k is None:
        return 1 / p if p else math.inf
    return sum((1 - p) ** i for i in range(k))


def ti_le_thanh_cong(p, k=None):
    """Xác suất yêu cầu thành công sau tối đa k lần chạy."""
    if k is None:
        return 1.0 if p > 0 else 0.0
    return 1 - (1 - p) ** k


def he_so_chi_phi_moi_viec_thanh_cong(p, k=None):
    """Chi phí mỗi việc thành công, tính bằng bội số của giá một lần chạy."""
    ti_le = ti_le_thanh_cong(p, k)
    return so_lan_chay_ky_vong(p, k) / ti_le if ti_le else math.inf


def kiem_tra_dap_an_biet_truoc():
    """Ba phép thử bắt buộc đạt 100% trước khi tính trên dữ liệu."""
    assert abs(so_lan_chay_ky_vong(0.8, 2) - 1.20) < 1e-9, 'p=0,8, tối đa 2 lần → 1,20 lần chạy'
    assert abs(so_lan_chay_ky_vong(0.8) - 1.25) < 1e-9, 'p=0,8, chạy đến khi đúng → 1,25 lần chạy'
    assert abs(he_so_chi_phi_moi_viec_thanh_cong(0.8, 3) - 1.25) < 1e-9, 'p=0,8, tối đa 3 lần → 1,25 lần giá một lần chạy'
    print('Ba phép thử đáp án biết trước: ĐẠT')


# ---------- Nhiệm vụ A2 · Mô hình chi phí từ trace ----------
def mo_hinh(runs, reqs, gia_vao=GIA_VAO, gia_ra=GIA_RA, gia_tool=GIA_TOOL,
            luong_phut=LUONG_PHUT, he_so_xem_lai=1.0, he_so_lam_lai=1.0,
            max_lan_chay=None):
    """Tính chi phí và số việc thành công trong phạm vi request_id của reqs."""
    runs = runs[runs['request_id'].isin(reqs['request_id'])]
    if max_lan_chay is not None:
        runs = runs[runs['attempt'] <= max_lan_chay]
        # Ca vượt giới hạn chuyển thẳng cho nhân viên, tính tiền xử lý ở B3.
        reqs_tro_ly = reqs[reqs['so_lan_chay'] <= max_lan_chay]
    else:
        reqs_tro_ly = reqs

    token_moi_lan = (runs['tokens_in'] * gia_vao + runs['tokens_out'] * gia_ra) / 1000
    tool_moi_lan = runs['tool_calls'] * gia_tool
    token = token_moi_lan.sum()
    tool = tool_moi_lan.sum()
    chay_lai = (token_moi_lan + tool_moi_lan)[runs['attempt'] > 1].sum()
    xem_lai = reqs_tro_ly['phut_xem_lai_simulated'].sum() * luong_phut * he_so_xem_lai
    lam_lai = reqs_tro_ly['phut_lam_lai_simulated'].sum() * luong_phut * he_so_lam_lai
    tong = token + tool + xem_lai + lam_lai
    thanh_cong = (reqs_tro_ly['ket_qua'] == 'thanh_cong').sum()
    return dict(
        token=token, tool=tool, chay_lai=chay_lai, xem_lai=xem_lai, lam_lai=lam_lai,
        tong=tong, thanh_cong=thanh_cong, cps=tong / thanh_cong if thanh_cong else math.inf,
        hoa_don_moi_yc=(token + tool) / len(reqs) if len(reqs) else math.nan,
    )


def in_chi_phi(runs, reqs, pilot):
    goc = mo_hinh(runs, reqs)
    print('\nA2 · Chi phí từ trace và phút simulated')
    for ten, gia_tri in goc.items():
        print(f'{ten:18s} {gia_tri:>14,.2f}')
    print(f"Hệ số so với hóa đơn/yêu cầu: {goc['cps'] / goc['hoa_don_moi_yc']:.2f}")
    print(f"Tỷ trọng làm lại: {goc['lam_lai'] / goc['tong']:.2%}")

    print('\nA3 · Loại | Yêu cầu | Thành công | Lần chạy/yêu cầu | Chi phí/thành công (simulated) | Bội số baseline')
    for loai, nhom in reqs.groupby('loai', sort=False):
        kq = mo_hinh(runs, nhom)
        print(f"{loai:12s} {len(nhom):4d} {kq['thanh_cong'] / len(nhom):7.2%} "
              f"{nhom['so_lan_chay'].mean():.2f} {kq['cps']:10,.2f} {kq['cps'] / BASELINE:.2f}")
    quoc_te = runs[runs['request_id'].isin(reqs.loc[reqs['loai'] == 'quoc_te', 'request_id'])]
    print('Quốc tế · số lần ok / số lần chạy theo attempt')
    print(quoc_te['status'].eq('ok').groupby(quoc_te['attempt']).agg(['sum', 'size', 'mean']))

    print('\nA4 · Yêu cầu/tháng toàn hệ thống | Thành công trong phạm vi | Cố định/việc | Tổng/việc (simulated)')
    kq_pilot = mo_hinh(runs, pilot)
    for khoi_luong in (45000, 22500):
        thanh_cong_thang = khoi_luong * kq_pilot['thanh_cong'] / len(reqs)
        co_dinh_moi_viec = 40_000_000 / thanh_cong_thang
        tong = kq_pilot['cps'] + co_dinh_moi_viec
        print(f'{khoi_luong:6,d} {thanh_cong_thang:10,.0f} {co_dinh_moi_viec:10,.2f} {tong:10,.2f}')


def in_do_nhay(runs, reqs, pilot):
    goc = mo_hinh(runs, reqs)['cps']
    kich_ban = {
        'Giá token gấp đôi': dict(gia_vao=52, gia_ra=260),
        'Giá token giảm một nửa': dict(gia_vao=13, gia_ra=65),
        'Xem lại gấp đôi': dict(he_so_xem_lai=2),
        'Xem lại giảm một nửa': dict(he_so_xem_lai=0.5),
        'Làm lại gấp đôi': dict(he_so_lam_lai=2),
        'Làm lại giảm một nửa': dict(he_so_lam_lai=0.5),
        'Lương tăng 25%': dict(luong_phut=2500),
        'Tối đa 2 lần chạy': dict(max_lan_chay=2),
        'Chỉ 1 lần chạy': dict(max_lan_chay=1),
        'Token và xem lại gấp đôi': dict(gia_vao=52, gia_ra=260, he_so_xem_lai=2),
    }
    print('\nB1–B2 · Kịch bản | Chi phí/thành công (simulated) | Thay đổi')
    for ten, tham_so in kich_ban.items():
        cps = mo_hinh(runs, reqs, **tham_so)['cps']
        print(f'{ten:28s} {cps:10,.2f} {(cps / goc - 1):+7.2%}')

    print('\nB3 (chi phí simulated) · Giới hạn | Tổng trợ lý | Không thành công | Tổng hệ thống | Chi phí/thành công')
    for gioi_han in (1, 2, 3):
        kq = mo_hinh(runs, reqs, max_lan_chay=gioi_han)
        that_bai = len(reqs) - kq['thanh_cong']
        tong_he_thong = kq['tong'] + BASELINE * that_bai
        print(f"{gioi_han} {kq['tong']:14,.2f} {that_bai:4d} {tong_he_thong:14,.2f} {kq['cps']:10,.2f}")

    print('\nB4 (chi phí simulated) · Xem lại toàn bộ đề xuất có ít nhất một lần chạy ok trong phạm vi')
    pilot_ok = runs[runs['request_id'].isin(pilot['request_id']) & runs['status'].eq('ok')]
    so_xem_lai = pilot_ok['request_id'].nunique()
    ca_lam_lai = reqs[reqs['ket_qua'] == 'lam_lai']
    so_lam_lai = pilot['ket_qua'].eq('lam_lai').sum()
    phut_trung_binh = ca_lam_lai['phut_lam_lai_simulated'].mean()
    kq_pilot = mo_hinh(runs, pilot)
    hoa_don = kq_pilot['token'] + kq_pilot['tool']
    print(f'Xem lại {so_xem_lai} ca, 5 phút/ca. Làm lại {so_lam_lai} ca.')
    for phut in (9, round(phut_trung_binh, 1)):
        lam_lai = so_lam_lai * phut * LUONG_PHUT
        cps = (hoa_don + lam_lai + so_xem_lai * 5 * LUONG_PHUT) / kq_pilot['thanh_cong']
        hoa_von = (BASELINE * kq_pilot['thanh_cong'] - hoa_don - lam_lai) / (so_xem_lai * LUONG_PHUT)
        print(f'Làm lại {phut} phút/ca: {cps:,.2f} đ/việc ({cps / BASELINE:.2%}); '
              f'hòa vốn ở {hoa_von:.2f} phút xem lại/ca.')


def co_mau(p1, p2, alpha=0.05, power=0.80):
    phan_phoi = NormalDist()
    z_alpha = phan_phoi.inv_cdf(1 - alpha / 2)
    z_beta = phan_phoi.inv_cdf(power)
    p_tb = (p1 + p2) / 2
    sai_so_h0 = math.sqrt(2 * p_tb * (1 - p_tb))
    sai_so_h1 = math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))
    return math.ceil(((z_alpha * sai_so_h0 + z_beta * sai_so_h1) / (p2 - p1)) ** 2)


def in_co_mau():
    n_5 = co_mau(0.70, 0.75)
    n_6 = co_mau(0.70, 0.76)
    icc = 0.02
    so_nhan_vien_moi_nhom = 20
    de_75 = 1 + (75 - 1) * icc
    n_75 = math.ceil(n_5 * de_75)
    m_6 = math.ceil(n_6 * (1 - icc) / (so_nhan_vien_moi_nhom - n_6 * icc))
    de_6 = 1 + (m_6 - 1) * icc
    print(f'\nD1a · Theo yêu cầu, +5 điểm: {n_5}/nhóm')
    print(f'D1b · Theo nhân viên, 75 ca/người: DE={de_75:.2f}, {n_75} ca/nhóm, '
          f'{math.ceil(n_75 / 75)} nhân viên/nhóm')
    print(f'D1c · 20 nhân viên/nhóm: trần hiệu dụng {so_nhan_vien_moi_nhom / icc:.0f}')
    print(f'D1d · 6 depot/nhóm: trần hiệu dụng {6 / icc:.0f}')
    print(f'D1e · +6 điểm: {n_6} hiệu dụng/nhóm, {m_6} ca/nhân viên, '
          f'DE={de_6:.2f}, {so_nhan_vien_moi_nhom * m_6} ca/nhóm')


def in_chi_so(reqs, pilot):
    mo_lai = reqs['mo_lai_trong_7_ngay'].eq(1)
    dong_som = reqs['dong_trong_24h'].eq(1) & ~mo_lai
    da_xem = reqs[reqs['duoc_xem_lai'] == 1]
    sua_hoac_bo = da_xem['quyet_dinh_xem_lai'].isin(['sua', 'bo'])
    print('\nD3 và E1 · Các chỉ số trong đợt chạy thử')
    print(f'Đóng sớm và không mở lại: {dong_som.sum()}/{len(reqs)} ({dong_som.mean():.2%})')
    print(f'Sửa hoặc bỏ gợi ý: {sua_hoac_bo.sum()}/{len(da_xem)} ({sua_hoac_bo.mean():.2%})')
    print(f'Mở lại 7 ngày: {mo_lai.sum()}/{len(reqs)} ({mo_lai.mean():.2%})')
    print(f"Mở lại 7 ngày trong phạm vi: {pilot['mo_lai_trong_7_ngay'].sum()}/{len(pilot)} "
          f"({pilot['mo_lai_trong_7_ngay'].mean():.2%})")


if __name__ == '__main__':
    runs = pd.read_csv('logix_runs.csv')
    reqs = pd.read_csv('logix_requests.csv', keep_default_na=False)
    pilot = reqs[reqs['loai'].isin(PHAM_VI_PILOT)]
    kiem_tra_dap_an_biet_truoc()
    in_chi_phi(runs, reqs, pilot)
    in_do_nhay(runs, reqs, pilot)
    in_co_mau()
    in_chi_so(reqs, pilot)
