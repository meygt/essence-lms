package com.essenceqa.lms

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.scheduling.annotation.EnableAsync
import org.springframework.transaction.annotation.EnableTransactionManagement

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableTransactionManagement
class LmsApplication

fun main(args: Array<String>) {
    runApplication<LmsApplication>(*args)
}