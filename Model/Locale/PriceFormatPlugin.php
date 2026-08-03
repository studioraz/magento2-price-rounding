<?php
/**
 * Copyright © 2026 Studio Raz. All rights reserved.
 * See LICENSE.txt for license details.
 */
namespace Faonni\Price\Model\Locale;

use Magento\Framework\Locale\Format;
use Magento\Store\Model\StoreManagerInterface;

class PriceFormatPlugin
{
    public function __construct(
        private StoreManagerInterface $storeManager
    ) {}

    /**
     * Add currency symbol to pattern when Magento returns bare "%s".
     * Fixes stores where the locale produces a symbol-less pattern.
     */
    public function afterGetPriceFormat(Format $subject, array $result): array
    {
        if (isset($result['pattern']) && $result['pattern'] === '%s') {
            try {
                $symbol = $this->storeManager->getStore()->getCurrentCurrency()->getCurrencySymbol();
                if ($symbol) {
                    $result['symbol'] = $symbol;
                    $result['pattern'] = $symbol . '%s';
                }
            } catch (\Exception $e) {
                // fail silently
            }
        }

        return $result;
    }
}