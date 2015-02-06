package com.artsquare.cipi;

import javax.servlet.ServletRequest

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/")
class CipiController {
    @RequestMapping
    String index(Model model, ServletRequest request, @RequestHeader(value = 'X-Forwarded-For', required = false) String forwardedIp) {
        model.addAttribute('clientIp', forwardedIp ?: request.remoteAddr)
        "index"
    }
}
