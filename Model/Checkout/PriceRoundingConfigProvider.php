<?php
/**
 * Copyright © 2025 Studio Raz. All rights reserved.
 * See LICENSE.txt for license details.
 */
namespace Faonni\Price\Model\Checkout;

use Magento\Checkout\Model\ConfigProviderInterface;
use Faonni\Price\Helper\Data as PriceHelper;

class PriceRoundingConfigProvider implements ConfigProviderInterface
{
    public function __construct(
        protected PriceHelper $helper
    ) {}

    public function getConfig(): array
    {
        return [
            'srPriceRounding' => [
                'enabled'          => $this->helper->isEnabled(),
                'type'             => $this->helper->getRoundType(),
                'precision'        => $this->helper->getPrecision(),
                'swedishFraction'  => $this->helper->getSwedishFraction(),
                'subtract'         => $this->helper->isSubtract(),
                'amount'           => $this->helper->getAmount(),
                'showDecimalZero'  => $this->helper->isShowDecimalZero(),
                'replaceZeroPrice' => $this->helper->isReplaceZeroPrice(),
                'zeroPriceText'    => $this->helper->getZeroPriceText(),
            ],
        ];
    }
}

