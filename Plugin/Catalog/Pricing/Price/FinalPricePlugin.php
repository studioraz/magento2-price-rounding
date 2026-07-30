<?php
/**
 * Copyright © 2025 Studio Raz. All rights reserved.
 * See LICENSE.txt for license details.
 */
namespace Faonni\Price\Plugin\Catalog\Pricing\Price;

use Magento\Catalog\Pricing\Price\FinalPrice;
use Faonni\Price\Helper\Data as PriceHelper;
use Faonni\Price\Model\CalculatorInterface;

/**
 * Plugin on FinalPrice::getValue() to ensure rounding is applied on both PDP and PLP.
 *
 * The existing PricePlugin on Type\Price::getBasePrice() is bypassed on PLP because
 * collection-loaded products get prices directly from catalog_product_index_price,
 * skipping getBasePrice() entirely. This plugin fixes that gap.
 */
class FinalPricePlugin
{
    public function __construct(
        private readonly PriceHelper $helper,
        private readonly CalculatorInterface $calculator
    ) {
    }

    /**
     * Round the final price value after it has been resolved.
     *
     * @param FinalPrice $subject
     * @param float|bool $result
     * @return float|bool
     */
    public function afterGetValue(FinalPrice $subject, $result)
    {
        if (!$this->helper->isEnabled() || !$this->helper->isRoundingBasePrice()) {
            return $result;
        }

        if ($result === false || $result === null) {
            return $result;
        }

        return $this->calculator->calculate((float)$result);
    }
}

