<?php

namespace App;

use App\Trait\EnumToArray;

enum PaymentType: string
{
    use EnumToArray;
    
    case MOBILE = "mobile";
    case BANKING = "banking";
}
