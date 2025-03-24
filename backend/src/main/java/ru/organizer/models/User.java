package ru.organizer.models;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "phone_number")
    private String phoneNumber;
    
    @Column(name = "telegram_id")
    private String telegramId;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.USER;
    
    @ManyToMany(mappedBy = "participants")
    private Set<Event> events = new HashSet<>();
    
    @OneToMany(mappedBy = "organizer", cascade = CascadeType.ALL)
    private Set<Event> organizedEvents = new HashSet<>();
    
    @OneToMany(mappedBy = "buyer", cascade = CascadeType.ALL)
    private Set<Purchase> purchases = new HashSet<>();
    
    public enum UserRole {
        USER, ADMIN
    }
} 