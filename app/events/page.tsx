'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Временные данные для демонстрации (с уменьшенными URL изображений)
const mockEvents = [
  { 
    id: '1', 
    title: 'День рождения Ивана', 
    date: '2025-04-15', 
    place: 'Ресторан "Причал"', 
    role: 'organizer',
    imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=300&q=60' 
  },
  { 
    id: '2', 
    title: 'Поход в горы', 
    date: '2025-05-20', 
    place: 'Горы Кавказа', 
    role: 'participant',
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=300&q=60' 
  },
  { 
    id: '3', 
    title: 'Корпоратив', 
    date: '2025-06-10', 
    place: 'Офис компании', 
    role: 'participant',
    imageUrl: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&w=300&q=60'
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // В будущем здесь будет API запрос
    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
    }, 300); // Сокращаем время загрузки
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Мои мероприятия</h1>
          <p className="text-sm text-gray-600">Управляйте своими мероприятиями или создайте новое</p>
        </div>
        <Link 
          href="/events/new" 
          className="mt-4 md:mt-0 inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Новое мероприятие
        </Link>
      </header>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">У вас пока нет мероприятий</h2>
          <p className="text-gray-600 mb-5">Создайте своё первое мероприятие и начните планировать вместе с друзьями!</p>
          <Link 
            href="/events/new" 
            className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Создать мероприятие
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link 
              href={`/events/${event.id}`} 
              key={event.id} 
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-full object-cover no-animation-on-load"
                  width={300}
                  height={200}
                  loading="lazy"
                />
                <span className={`absolute top-3 right-3 z-20 px-2 py-1 rounded-full text-xs font-semibold ${
                  event.role === 'organizer' 
                    ? 'bg-green-500/90 text-white' 
                    : 'bg-blue-500/90 text-white'
                }`}>
                  {event.role === 'organizer' ? 'Организатор' : 'Участник'}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{event.title}</h2>
                <div className="space-y-2 mb-3 flex-1">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm text-gray-600">{event.place}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-end">
                  <span className="text-blue-600 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform text-sm">
                    Перейти 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 