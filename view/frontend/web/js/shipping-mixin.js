
define([], function () {
    'use strict';

    return function (ShippingComponent) {
        return ShippingComponent.extend({
            getFormattedPrice: function (price) {
                var result = this._super(price);
                if (
                    window.checkoutConfig &&
                    window.checkoutConfig.srPricePrecision &&
                    window.checkoutConfig.srPricePrecision.enabled
                ) {
                    return result.replace(/(\d+)\.00(?!\d)/g, '$1');
                }
                return result;
            }
        });
    };
});
