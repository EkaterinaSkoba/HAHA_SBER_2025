package ru.organizer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.organizer.models.Event;
import ru.organizer.models.User;
import ru.organizer.repositories.EventRepository;
import ru.organizer.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class EventService {
    
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    
    @Autowired
    public EventService(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }
    
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Мероприятие с ID " + id + " не найдено"));
    }
    
    public List<Event> getUserEvents(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Пользователь с ID " + userId + " не найден"));
        return eventRepository.findAllUserEvents(user);
    }
    
    public List<Event> getEventsByOrganizer(Long organizerId) {
        User organizer = userRepository.findById(organizerId)
                .orElseThrow(() -> new EntityNotFoundException("Пользователь с ID " + organizerId + " не найден"));
        return eventRepository.findByOrganizer(organizer);
    }
    
    public List<Event> getEventsByParticipant(Long participantId) {
        User participant = userRepository.findById(participantId)
                .orElseThrow(() -> new EntityNotFoundException("Пользователь с ID " + participantId + " не найден"));
        return eventRepository.findByParticipant(participant);
    }
    
    @Transactional
    public Event createEvent(Event event, Long organizerId) {
        User organizer = userRepository.findById(organizerId)
                .orElseThrow(() -> new EntityNotFoundException("Пользователь с ID " + organizerId + " не найден"));
        
        event.setOrganizer(organizer);
        event.addParticipant(organizer); // Организатор автоматически становится участником
        
        return eventRepository.save(event);
    }
    
    @Transactional
    public Event updateEvent(Long id, Event eventDetails) {
        Event event = getEventById(id);
        
        event.setTitle(eventDetails.getTitle());
        event.setDescription(eventDetails.getDescription());
        event.setDate(eventDetails.getDate());
        event.setPlace(eventDetails.getPlace());
        event.setImageUrl(eventDetails.getImageUrl());
        
        return eventRepository.save(event);
    }
    
    @Transactional
    public void deleteEvent(Long id) {
        Event event = getEventById(id);
        eventRepository.delete(event);
    }
    
    @Transactional
    public Event addParticipant(Long eventId, Long userId) {
        Event event = getEventById(eventId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Пользователь с ID " + userId + " не найден"));
        
        event.addParticipant(user);
        return eventRepository.save(event);
    }
    
    @Transactional
    public Event removeParticipant(Long eventId, Long userId) {
        Event event = getEventById(eventId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Пользователь с ID " + userId + " не найден"));
        
        event.removeParticipant(user);
        return eventRepository.save(event);
    }
} 