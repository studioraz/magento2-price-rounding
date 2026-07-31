define(['jquery'], function (jQuery) {
    'use strict';

    return function (Component) {
        var originalReloadPrice = Component.prototype.reloadPrice;

        if (typeof window.srPricePrecisionConfig !== 'undefined' && window.srPricePrecisionConfig.enabled) {
            Component.prototype.reloadPrice = function () {
                var result = originalReloadPrice.call(this);
                var priceEl = this.element.find('.price');

                priceEl.each(function () {
                    const el = jQuery(this);
                    const originalText = el.text();

                    // Safely remove .00 while ignoring HTML/currency symbols
                    const updatedText = originalText.replace(/([0-9]+)[\.,]0+(?=[^\d]|$)/g, '$1');
                    el.text(updatedText);
                });
                return result;
            };
        }
        return Component;
    };
});