import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Компонент-карточка события для отображения в списке
 */
const EventCard = ({ event, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
      <div className="h-36 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (window.confirm('Вы уверены, что хотите удалить это мероприятие?')) {
                onDelete(event.id);
              }
            }}
            className="p-1 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">{event.title}</h3>
        <p className="mt-1 text-sm text-gray-500 h-8 overflow-hidden">
          {event.description || 'Нет описания'}
        </p>
        <div className="mt-2 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {event.date}
          </div>
          <div className="text-sm font-medium text-blue-600">
            {event.place || 'Место не указано'}
          </div>
        </div>
        <div className="mt-3">
          <Link 
            to={`/events/${event.id}`}
            className="block w-full text-center py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard; 