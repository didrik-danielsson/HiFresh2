package org.example.server;

import org.example.shared.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;


@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Recipe findByName(String recipeName);

    boolean existsByNameIgnoreCase(String recipeName);

    List<Recipe> findByNameNotIn(Collection<String> names);
}