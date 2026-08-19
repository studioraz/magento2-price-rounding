define([], function () {
    'use strict';

    return function (PriceComponent) {
        return PriceComponent.extend({
            getFormattedPrice: function (price) {
                var config = window.checkoutConfig && window.checkoutConfig.srPriceRounding;

                if (config && config.enabled) {
                    var precision = config.precision !== undefined ? parseInt(config.precision, 10) : 0;
                    var factor = Math.pow(10, Math.abs(precision));
                    var type = config.type || 'floor';
                    var rounded;

                    switch (type) {
                        case 'ceil': case 'simple_ceil': case 'excel_ceil': case 'swedish_ceil':
                            rounded = precision < 0 ? Math.ceil(price / factor) * factor : Math.ceil(price * factor) / factor;
                            break;
                        case 'floor': case 'simple_floor': case 'excel_floor': case 'swedish_floor':
                            rounded = precision < 0 ? Math.floor(price / factor) * factor : Math.floor(price * factor) / factor;
                            break;
                        case 'swedish_round':
                            var fraction = config.swedishFraction || 0.05;
                            rounded = Math.round(price / fraction) * fraction;
                            break;
                        default:
                            rounded = precision < 0 ? Math.round(price / factor) * factor : Math.round(price * factor) / factor;
                            break;
                    }

                    if (config.subtract && rounded > parseFloat(config.amount || 0)) {
                        rounded = rounded - parseFloat(config.amount);
                    }

                    price = Math.max(0, rounded);
                }

                var result = this._super(price);

                if (config && config.showDecimalZero === false) {
                    var decimalSymbol = (window.checkoutConfig && window.checkoutConfig.priceFormat
                        && window.checkoutConfig.priceFormat.decimalSymbol) || '.';
                    var escapedSymbol = decimalSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    var zeroDecimalPattern = new RegExp('(\\d)' + escapedSymbol + '0+(\\D*)$');
                    return result.replace(zeroDecimalPattern, '$1$2');
                }

                return result;
            }
        });
    };
});
