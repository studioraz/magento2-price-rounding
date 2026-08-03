define([], function () {
    'use strict';

    return function (Component) {
        var originalReloadPrice = Component.prototype.reloadPrice;
        if (typeof window.srPricePrecisionConfig !== 'undefined' &&
            window.srPricePrecisionConfig.enabled) {
            Component.prototype.reloadPrice = function () {
                var result = originalReloadPrice.call(this);
                var priceEl = this.element.find('.price');

                priceEl.each(function () {
                    const el = jQuery(this);
                    const originalText = el.text();
                    // Remove .00 only if it appears after a number and no digits follow
                    const updatedText = originalText.replace(/(\d+)\.00(?!\d)/g, '$1');
                    el.text(updatedText);
                });
                return result;
            };
        }
        return Component;
    };
});
