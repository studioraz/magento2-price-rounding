<?php
/**
 * Copyright © 2025 Studio Raz. All rights reserved.
 * See LICENSE.txt for license details.
 */
namespace Faonni\Price\Block;

use Magento\Framework\View\Element\Template;
use Faonni\Price\Helper\Data as PriceHelper;

class ConfigProvider extends Template
{

    public function __construct(
        Template\Context $context,
        protected PriceHelper $helper,
        array $data = []
    ) {
        parent::__construct($context, $data);
    }

    public function getJsConfig(): array
    {
        return [
            'enabled' => ($this->helper->isEnabled() == true && $this->helper->getPrecision() <= 0) ? true : false,
        ];
    }
}
