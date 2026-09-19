const COUPONS = {
  SAVE10: { type: 'percent', value: 10 },
  BULK25: { type: 'percent', value: 25, minAmount: 1000 },
};

export function calculateDiscount(orderAmount, couponCode) {
  if (!Number.isFinite(orderAmount) || orderAmount < 0) {
    throw new TypeError('orderAmount must be a non-negative number');
  }
  const coupon = COUPONS[couponCode];
  if (!coupon) return 0;
  if (coupon.type === 'percent') {
    if (coupon.minAmount !== undefined && orderAmount < coupon.minAmount) return 0;
    return roundMoney(orderAmount * coupon.value / 100);
  }
  return 0;
}

export function calculatePayable(orderAmount, couponCode) {
  return roundMoney(orderAmount - calculateDiscount(orderAmount, couponCode));
}

function roundMoney(value) {
  return Math.round(value * 100) / 100;
}
