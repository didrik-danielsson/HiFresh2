package org.example.server;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "org.example.shared")
@EnableJpaRepositories("org.example.server")
public class HiFreshApp {

    public static void main(String[] args) {
        SpringApplication.run(HiFreshApp.class, args);
    }

}
