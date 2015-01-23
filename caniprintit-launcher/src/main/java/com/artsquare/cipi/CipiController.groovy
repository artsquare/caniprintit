package com.artsquare.cipi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
class CipiController {
    @RequestMapping
    String index() {
        "index"
    }
}
