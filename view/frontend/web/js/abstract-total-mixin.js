define([], function () {
    'use strict';

    return function (Component) {
        return Component.extend({

            /**
             * Override getBaseValue() to apply rounding and decimal stripping
             */
            getBaseValue: function () {
                var config = window.checkoutConfig && window.checkoutConfig.srPriceRounding;
                var result = this._super();

                if (!config || !config.enabled) {
                    return result;
                }

                var self = this;
                result = String(result);

                result = result.replace(/[\d,]+(\.\d+)?/, function (match) {
                    var num = parseFloat(match.replace(/,/g, ''));

                    if (isNaN(num)) {
                        return match;
                    }

                    var rounded = self._srRoundPrice(num, config);
                    var str = rounded.toFixed(2); // Ensure consistent 2 decimals before stripping
                    var parts = str.split('.');

                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                    return parts.join('.');
                });

                if (self._shouldHideDecimalZeros(config)) {
                    result = result.replace(/([0-9]+)[\.,]0+(?=[^\d]|$)/g, '$1');
                }

                return result;
            },

            /**
             * Round and format a price value for checkout display.
             */
            getFormattedPrice: function (price) {
                var config = window.checkoutConfig && window.checkoutConfig.srPriceRounding;

                if (config && config.enabled) {
                    price = this._srRoundPrice(price, config);
                }

                var result = String(this._super(price));

                // Strip decimal zeroes (.00)
                if (config && config.enabled && this._shouldHideDecimalZeros(config)) {
                    result = result.replace(/([0-9]+)[\.,]0+(?=[^\d]|$)/g, '$1');
                }

                return result;
            },

            /**
             * Apply JS rounding
             */
            _srRoundPrice: function (price, config) {
                var precision = config.precision !== undefined ? parseInt(config.precision, 10) : 0;
                var factor = Math.pow(10, Math.abs(precision));
                var type = config.type || 'floor';

                switch (type) {
                    case 'ceil':
                    case 'simple_ceil':
                    case 'excel_ceil':
                    case 'swedish_ceil':
                        return precision < 0
                            ? Math.ceil(price / factor) * factor
                            : Math.ceil(price * factor) / factor;

                    case 'floor':
                    case 'simple_floor':
                    case 'excel_floor':
                    case 'swedish_floor':
                        return precision < 0
                            ? Math.floor(price / factor) * factor
                            : Math.floor(price * factor) / factor;

                    case 'swedish_round':
                        var fraction = config.swedishFraction || 0.05;
                        return Math.round(price / fraction) * fraction;

                    case 'excel_round':
                    default:
                        return precision < 0
                            ? Math.round(price / factor) * factor
                            : Math.round(price * factor) / factor;
                }
            },

            /**
             * Determine if .00 should be hidden based on all possible configs
             */
            _shouldHideDecimalZeros: function (config) {
                if (config.showDecimalZero === false) {
                    return true;
                }
                if (window.srPricePrecisionConfig && window.srPricePrecisionConfig.enabled) {
                    return true;
                }
                if (window.checkoutConfig && window.checkoutConfig.srPricePrecision && window.checkoutConfig.srPricePrecision.enabled) {
                    return true;
                }
                return false;
            }
        });
    };
});
