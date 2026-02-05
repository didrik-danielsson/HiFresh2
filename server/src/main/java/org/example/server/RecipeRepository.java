package org.example.server;

import org.example.shared.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;


@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Recipe existsByName(String recipeName);
    // Här får du automatiskt metoder som .save(), .findAll(), .deleteById()

    // I RecipeRepository.java
    List<Recipe> findByNameNotIn(Collection<String> names);
}