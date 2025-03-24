export type UserRole = 'organizer' | 'participant';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  telegramId?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  place: string;
  description?: string;
  organizerId: string;
  inviteCode: string;
}

export interface EventParticipant {
  eventId: string;
  userId: string;
  role: UserRole;
}

export interface Item {
  id: string;
  eventId: string;
  name: string;
  type: 'product' | 'service';
  price: number | null;
  notes?: string;
  responsibleId: string;
  completed: boolean;
}

export interface ItemParticipant {
  itemId: string;
  userId: string;
}

export interface Expense {
  id: string;
  itemId: string;
  amount: number;
  paidByUserId: string;
  date: string;
}

export interface UserEventView {
  id: string;
  title: string;
  date: string;
  place: string;
  description?: string;
  role: UserRole;
}

export interface ItemWithDetails extends Item {
  responsible: {
    id: string;
    name: string;
  };
  participants: string[];
}

export interface EventWithDetails extends Event {
  participants: User[];
  items: ItemWithDetails[];
  role: UserRole; // роль текущего пользователя в мероприятии
}

export interface UserContribution {
  userId: string;
  itemId: string;
  itemName: string;
  amount: number;
}

export interface UserBalance {
  userId: string;
  userName: string;
  spent: number;
  shouldPay: number;
  balance: number;
}

export interface PaymentMessage {
  toUserId: string;
  toUserName: string;
  fromUserId: string;
  fromUserName: string;
  amount: number;
  items: {
    id: string;
    name: string;
    amount: number;
  }[];
  paymentDetails: string;
} 