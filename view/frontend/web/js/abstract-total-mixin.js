define([], function () {
    'use strict';

    return function (Component) {
        return Component.extend({
            getFormattedPrice: function (price) {
                var result = this._super(price);
                if (
                    window.checkoutConfig &&
                    window.checkoutConfig.srPricePrecision &&
                    window.checkoutConfig.srPricePrecision.enabled
                ) {
                    return result.replace(/(\d+)\.00(\D*)$/, '$1$2');
                }
                return result;
            }
        });
    };
});
