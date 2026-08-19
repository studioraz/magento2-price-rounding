define([], function () {
    'use strict';

    return function (Component) {
        var originalReloadPrice = Component.prototype.reloadPrice;
        if (typeof window.srPricePrecisionConfig !== 'undefined' &&
            window.srPricePrecisionConfig.enabled) {
            Component.prototype.reloadPrice = function () {
                var result = originalReloadPrice.call(this);
                var priceEl = this.element.find('.price');

                const decimalSymbol = (window.checkoutConfig && window.checkoutConfig.priceFormat
                    && window.checkoutConfig.priceFormat.decimalSymbol) || '.';
                const escapedSymbol = decimalSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const zeroDecimalPattern = new RegExp(`(\\d)${escapedSymbol}0+(\\D*)$`);

                priceEl.each(function () {
                    const el = jQuery(this);
                    const originalText = el.text();
                    const updatedText = originalText.replace(zeroDecimalPattern, '$1$2');
                    el.text(updatedText);
                });
                return result;
            };
        }
        return Component;
    };
});
