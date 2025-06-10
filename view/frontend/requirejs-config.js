var config = {
    config: {
        mixins: {
            'Magento_Catalog/js/price-box': {
                'Faonni_Price/js/price-box-mixin': true
            },
            'Magento_Checkout/js/view/summary/abstract-total': {
                'Faonni_Price/js/abstract-total-mixin': true
            },
            'Magento_Checkout/js/view/summary/subtotal': {
                'Faonni_Price/js/abstract-total-mixin': true
            },
            'Magento_Checkout/js/view/summary/shipping': {
                'Faonni_Price/js/abstract-total-mixin': true
            },
            'Magento_Checkout/js/view/summary/tax': {
                'Faonni_Price/js/abstract-total-mixin': true
            },
            'Magento_Checkout/js/view/summary/discount': {
                'Faonni_Price/js/abstract-total-mixin': true
            },
            'Magento_Checkout/js/view/summary/grand-total': {
                'Faonni_Price/js/abstract-total-mixin': true
            },
            'Magento_Checkout/js/view/shipping': {
                'Faonni_Price/js/shipping-mixin': true
            },
            'Magento_Tax/js/view/checkout/shipping_method/price': {
                'Faonni_Price/js/shipping-method-tax-price-mixin': true
            }
        }
    }
};
