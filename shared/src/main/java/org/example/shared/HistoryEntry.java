package org.example.shared;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recipe_history")
public class HistoryEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String recipeName;

    private LocalDateTime timestamp;

    public HistoryEntry() {}

    public HistoryEntry(String recipeName) {
        this.recipeName = recipeName;
        this.timestamp = LocalDateTime.now();
    }

    // Getters och Setters
    public String getRecipeName() { return recipeName; }
}