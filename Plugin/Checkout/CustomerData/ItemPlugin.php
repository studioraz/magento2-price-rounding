<?php
/**
 * Copyright © 2026 Studio Raz. All rights reserved.
 * See LICENSE.txt for license details.
 */

declare(strict_types=1);

namespace Faonni\Price\Plugin\Checkout\CustomerData;

use Magento\Checkout\CustomerData\ItemInterface;
use Magento\Checkout\Helper\Data as CheckoutHelper;
use Magento\Quote\Model\Quote\Item;
use Faonni\Price\Helper\Data as PriceHelper;
use Faonni\Price\Model\CalculatorInterface;

class ItemPlugin
{
    public function __construct(
        private readonly PriceHelper $helper,
        private readonly CalculatorInterface $calculator,
        private readonly CheckoutHelper $checkoutHelper
    ) {
    }

    /**
     * Round minicart item prices.
     * Runs after SR\HyvaBaseModule\Plugin (sortOrder=200) so product_price_total is already set.
     */
    public function afterGetItemData(
        ItemInterface $subject,
        array $result,
        Item $item
    ): array {
        if (!$this->helper->isEnabled()) {
            return $result;
        }

        if (!isset($result['product_price_value'])) {
            return $result;
        }

        // Round unit price
        $roundedUnitPrice = $this->calculator->calculate((float)$result['product_price_value']);
        $result['product_price_value'] = $roundedUnitPrice;

        // Recompute and reformat total (mirrors hyva ItemPlugin logic)
        $finalPriceTotal = $roundedUnitPrice * $item->getQty();
        $finalPriceTotal -= $item->getDiscountAmount();
        $result['product_price_total'] = $this->checkoutHelper->formatPrice($finalPriceTotal);

        // Round regular price fields if hyva base module set them
        if (isset($result['product_regular_price'])) {
            $roundedRegular = $this->calculator->calculate((float)$result['product_regular_price']);
            $result['product_regular_price'] = $roundedRegular;
            $result['product_regular_price_total'] = $roundedRegular * $item->getQty();
        }

        return $result;
    }
}
