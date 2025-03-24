package ru.organizer.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.organizer.models.Event;
import ru.organizer.services.EventService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    
    private final EventService eventService;
    
    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }
    
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventService.getEventById(id);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Event>> getUserEvents(@PathVariable Long userId) {
        List<Event> events = eventService.getUserEvents(userId);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    
    @GetMapping("/organizer/{organizerId}")
    public ResponseEntity<List<Event>> getEventsByOrganizer(@PathVariable Long organizerId) {
        List<Event> events = eventService.getEventsByOrganizer(organizerId);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    
    @GetMapping("/participant/{participantId}")
    public ResponseEntity<List<Event>> getEventsByParticipant(@PathVariable Long participantId) {
        List<Event> events = eventService.getEventsByParticipant(participantId);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event, @RequestParam Long organizerId) {
        Event newEvent = eventService.createEvent(event, organizerId);
        return new ResponseEntity<>(newEvent, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @Valid @RequestBody Event eventDetails) {
        Event updatedEvent = eventService.updateEvent(id, eventDetails);
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @PostMapping("/{eventId}/participants/{userId}")
    public ResponseEntity<Event> addParticipant(@PathVariable Long eventId, @PathVariable Long userId) {
        Event event = eventService.addParticipant(eventId, userId);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }
    
    @DeleteMapping("/{eventId}/participants/{userId}")
    public ResponseEntity<Event> removeParticipant(@PathVariable Long eventId, @PathVariable Long userId) {
        Event event = eventService.removeParticipant(eventId, userId);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }
} 