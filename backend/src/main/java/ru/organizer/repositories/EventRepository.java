package ru.organizer.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.organizer.models.Event;
import ru.organizer.models.User;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    List<Event> findByOrganizer(User organizer);
    
    @Query("SELECT e FROM Event e WHERE e.organizer = :user OR :user MEMBER OF e.participants")
    List<Event> findAllUserEvents(@Param("user") User user);
    
    @Query("SELECT e FROM Event e WHERE :user MEMBER OF e.participants")
    List<Event> findByParticipant(@Param("user") User user);
} 