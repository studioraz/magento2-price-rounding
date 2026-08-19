define([], function () {
    'use strict';

    return function (Component) {
        return Component.extend({

            getFormattedPrice: function (price) {
                var config = window.checkoutConfig && window.checkoutConfig.srPriceRounding;

                if (config && config.enabled) {
                    price = this._srRoundPrice(price, config);
                }

                var superResult = this._super(price);
                var result = String(superResult);

                if (this._shouldHideDecimalZeros(config)) {
                    var decimalSymbol = (window.checkoutConfig && window.checkoutConfig.priceFormat
                        && window.checkoutConfig.priceFormat.decimalSymbol) || '.';
                    var escapedSymbol = decimalSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    var zeroDecimalPattern = new RegExp('(\\d)' + escapedSymbol + '0+(\\D*)$');
                    result = result.replace(zeroDecimalPattern, '$1$2');
                }

                return result;
            },

            _srRoundPrice: function (price, config) {
                var precision = config.precision !== undefined ? parseInt(config.precision, 10) : 0;
                var factor    = Math.pow(10, Math.abs(precision));
                var type      = config.type || 'floor';
                var rounded;

                switch (type) {
                    case 'ceil':
                    case 'simple_ceil':
                    case 'excel_ceil':
                    case 'swedish_ceil':
                        rounded = precision < 0
                            ? Math.ceil(price / factor) * factor
                            : Math.ceil(price * factor) / factor;
                        break;
                    case 'floor':
                    case 'simple_floor':
                    case 'excel_floor':
                    case 'swedish_floor':
                        rounded = precision < 0
                            ? Math.floor(price / factor) * factor
                            : Math.floor(price * factor) / factor;
                        break;
                    case 'swedish_round':
                        var fraction = config.swedishFraction || 0.05;
                        rounded = Math.round(price / fraction) * fraction;
                        break;
                    case 'excel_round':
                    default:
                        rounded = precision < 0
                            ? Math.round(price / factor) * factor
                            : Math.round(price * factor) / factor;
                        break;
                }

                if (config.subtract && rounded > parseFloat(config.amount || 0)) {
                    rounded = rounded - parseFloat(config.amount);
                }

                return Math.max(0, rounded);
            },

            _shouldHideDecimalZeros: function (config) {
                if (config && config.showDecimalZero === false) { return true; }
                if (window.srPricePrecisionConfig && window.srPricePrecisionConfig.enabled) { return true; }
                if (window.checkoutConfig && window.checkoutConfig.srPricePrecision && window.checkoutConfig.srPricePrecision.enabled) { return true; }
                return false;
            }
        });
    };
});