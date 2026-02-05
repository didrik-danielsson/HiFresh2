package org.example.server;

import org.example.shared.HistoryEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface HistoryRepository extends JpaRepository<HistoryEntry, Long> {

    // Hämtar de senaste namnen sorterat på tid
    @Query("SELECT h.recipeName FROM HistoryEntry h ORDER BY h.timestamp DESC")
    List<String> findRecentRecipeNames();
}