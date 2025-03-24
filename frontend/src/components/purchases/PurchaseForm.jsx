import React, { useState, useEffect } from 'react';
import { PurchaseService, EventService } from '../../services';

/**
 * Компонент формы для создания или редактирования покупки
 */
const PurchaseForm = ({ eventId, purchase, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // текущая дата в формате YYYY-MM-DD
    buyerId: '',
    description: '',
    participants: []
  });
  
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Загрузка участников мероприятия
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

  // Если передан purchase для редактирования, заполняем форму его данными
  useEffect(() => {
    if (purchase) {
      setFormData({
        name: purchase.name || '',
        amount: purchase.amount || '',
        date: purchase.date || new Date().toISOString().split('T')[0],
        buyerId: purchase.buyer ? purchase.buyer.id : '',
        description: purchase.description || '',
        participants: purchase.participants ? purchase.participants.map(p => p.id) : []
      });
    }
  }, [purchase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Обработчик для чекбоксов участников покупки
  const handleParticipantChange = (participantId) => {
    setFormData(prevData => {
      const isSelected = prevData.participants.includes(participantId);
      
      if (isSelected) {
        return {
          ...prevData,
          participants: prevData.participants.filter(id => id !== participantId)
        };
      } else {
        return {
          ...prevData,
          participants: [...prevData.participants, participantId]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.name.trim()) {
      setError('Название покупки обязательно');
      return;
    }
    
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      setError('Сумма должна быть числом больше нуля');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      const purchaseData = {
        ...formData,
        amount: Number(formData.amount),
        eventId
      };
      
      let savedPurchase;
      
      if (purchase) {
        // Обновление существующей покупки
        savedPurchase = await PurchaseService.updatePurchase(purchase.id, purchaseData);
      } else {
        // Создание новой покупки
        savedPurchase = await PurchaseService.createPurchase(purchaseData);
      }
      
      if (onSave) {
        onSave(savedPurchase);
      }
    } catch (error) {
      console.error('Ошибка при сохранении покупки:', error);
      setError('Не удалось сохранить покупку. Попробуйте снова.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h3 className="text-lg font-medium mb-4">
        {purchase ? 'Редактирование покупки' : 'Новая покупка'}
      </h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Название покупки *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Сумма (руб.) *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Дата покупки
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="buyerId" className="block text-sm font-medium text-gray-700">
              Кто купил
            </label>
            <select
              id="buyerId"
              name="buyerId"
              value={formData.buyerId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Выберите покупателя</option>
              {participants.map(participant => (
                <option key={participant.id} value={participant.id}>
                  {participant.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Участники покупки
            </label>
            <div className="max-h-48 overflow-y-auto p-3 border border-gray-300 rounded-md bg-gray-50">
              {participants.length > 0 ? (
                <div className="space-y-2">
                  <div className="mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (formData.participants.length === participants.length) {
                          setFormData(prev => ({ ...prev, participants: [] }));
                        } else {
                          setFormData(prev => ({ ...prev, participants: participants.map(p => p.id) }));
                        }
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {formData.participants.length === participants.length ? 'Снять все' : 'Выбрать все'}
                    </button>
                  </div>
                  {participants.map(participant => (
                    <div key={participant.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`participant-${participant.id}`}
                        checked={formData.participants.includes(participant.id)}
                        onChange={() => handleParticipantChange(participant.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`participant-${participant.id}`} className="ml-2 block text-sm text-gray-900">
                        {participant.name}
                      </label>
                    </div>
                  ))}
                </div>
              ) : loading ? (
                <p className="text-gray-500 text-center">Загрузка участников...</p>
              ) : (
                <p className="text-gray-500 text-center">Нет доступных участников</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Сохранение...
              </span>
            ) : purchase ? 'Обновить' : 'Создать'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseForm; 