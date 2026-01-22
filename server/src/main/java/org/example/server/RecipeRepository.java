package org.example.server;

import org.example.shared.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Recipe existsByName(String recipeName);
    // Här får du automatiskt metoder som .save(), .findAll(), .deleteById()
}