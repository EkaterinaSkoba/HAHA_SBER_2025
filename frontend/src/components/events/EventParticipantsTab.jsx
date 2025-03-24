import React, { useState, useEffect } from 'react';
import { EventService } from '../../services';

/**
 * Компонент для отображения списка участников события
 */
export const EventParticipantsTab = ({ eventId }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных об участниках
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const data = await EventService.getEventParticipants(eventId);
        setParticipants(data || []);
      } catch (error) {
        console.error('Ошибка при загрузке участников:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Участники мероприятия</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
          Пригласить участника
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : participants.length > 0 ? (
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {participants.map((participant) => (
              <li key={participant.id} className="px-4 py-3 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {participant.avatar ? (
                        <img src={participant.avatar} alt={participant.name} className="w-10 h-10 rounded-full" />
                      ) : (
                        <span className="text-gray-500 font-medium">{participant.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-gray-500">{participant.email}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      participant.isOrganizer ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {participant.isOrganizer ? 'Организатор' : 'Участник'}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-md p-6 text-center">
          <p className="text-gray-500">Участников пока нет. Пригласите кого-нибудь!</p>
        </div>
      )}
    </div>
  );
};