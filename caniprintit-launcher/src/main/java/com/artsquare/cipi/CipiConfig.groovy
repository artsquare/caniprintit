package com.artsquare.cipi

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("artsquare.cipi")
class CipiConfig {
    String google
    boolean suppressShares
}