package ru.organizer.models;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@Entity
@Table(name = "purchases")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Purchase {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private String description;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;
    
    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;
    
    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
    
    @ManyToMany
    @JoinTable(
        name = "purchase_participants",
        joinColumns = @JoinColumn(name = "purchase_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants = new HashSet<>();
    
    @Column(name = "purchase_date")
    private LocalDateTime purchaseDate;
    
    @PrePersist
    protected void onCreate() {
        purchaseDate = LocalDateTime.now();
    }
    
    // Методы для добавления и удаления участников покупки
    public void addParticipant(User user) {
        participants.add(user);
    }
    
    public void removeParticipant(User user) {
        participants.remove(user);
    }
    
    // Расчет доли каждого участника
    public BigDecimal getSharePerParticipant() {
        if (participants.isEmpty()) {
            return BigDecimal.ZERO;
        }
        return amount.divide(BigDecimal.valueOf(participants.size()), 2, BigDecimal.ROUND_HALF_UP);
    }
} 