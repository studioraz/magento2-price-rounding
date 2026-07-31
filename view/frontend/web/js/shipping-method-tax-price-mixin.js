define([], function () {
    'use strict';

    return function (PriceComponent) {
        return PriceComponent.extend({
            getFormattedPrice: function (price) {
                var result = this._super(price);
                var config = window.checkoutConfig && window.checkoutConfig.srPriceRounding;

                if (config && config.enabled && config.showDecimalZero === false) {
                    return result.replace(/([0-9]+)[\.,]0+(?=[^\d]|$)/g, '$1');
                }
                return result;
            }
        });
    };
});