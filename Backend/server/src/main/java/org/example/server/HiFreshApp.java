package org.example.server;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("org.example.shared") // VIKTIGT: Hittar Ingredient och Recipe
@EnableJpaRepositories("org.example.server") // Hittar dina Repository-interfaces
public class HiFreshApp {

    public static void main(String[] args) {
        SpringApplication.run(HiFreshApp.class, args);
    }

}
