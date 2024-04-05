// vietnameseCurrencyFormatter.ts

import * as accounting from 'accounting';

// Hàm để định dạng số tiền
function formatMoney(amount: number): string {
    // Thiết lập định dạng tiền tệ cho Việt Nam
    accounting.settings.currency.symbol = "VNĐ";   // Ký hiệu tiền tệ
    accounting.settings.currency.format = "%v %s";  // Định dạng: giá trị + ký hiệu tiền tệ
    accounting.settings.currency.decimal = ",";    // Dấu phân cách thập phân
    accounting.settings.currency.thousand = ".";    // Dấu phân cách hàng nghìn
    accounting.settings.currency.precision = 0;     // Số chữ số thập phân

    return accounting.formatMoney(amount);
}

// Xuất module
export { formatMoney };
