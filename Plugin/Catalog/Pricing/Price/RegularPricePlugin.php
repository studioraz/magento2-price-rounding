<?php
/**
 * Copyright © 2025 Studio Raz. All rights reserved.
 * See LICENSE.txt for license details.
 */
namespace Faonni\Price\Plugin\Catalog\Pricing\Price;

use Magento\Catalog\Pricing\Price\RegularPrice;
use Faonni\Price\Helper\Data as PriceHelper;
use Faonni\Price\Model\CalculatorInterface;

/**
 * Plugin on RegularPrice::getValue() to round the original/crossed-out price.
 *
 * Without this, the regular (non-discounted) price shown as strikethrough on PDP,
 * PLP, minicart and cart is never rounded — only FinalPrice goes through rounding.
 */
class RegularPricePlugin
{
    public function __construct(
        private readonly PriceHelper $helper,
        private readonly CalculatorInterface $calculator
    ) {
    }

    /**
     * Round the regular price value after it has been resolved.
     *
     * @param RegularPrice $subject
     * @param float|bool $result
     * @return float|bool
     */
    public function afterGetValue(RegularPrice $subject, $result)
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

