'use client';

import { useState } from 'react';

interface Participant {
  id: string;
  name: string;
  role: 'organizer' | 'participant';
}

interface AddItemFormProps {
  eventId: string;
  participants: Participant[];
  currentUserId: string;
  onSubmit: (itemData: any) => void;
  onCancel: () => void;
}

export default function AddItemForm({
  eventId,
  participants,
  currentUserId,
  onSubmit,
  onCancel
}: AddItemFormProps) {
  const [itemData, setItemData] = useState({
    name: '',
    type: 'product', // product или service
    price: '',
    notes: '',
    responsibleId: currentUserId,
    participantIds: [] as string[]
  });
  
  const [isAllParticipants, setIsAllParticipants] = useState(true);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setItemData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setItemData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    
    setItemData(prev => {
      let newParticipantIds = [...prev.participantIds];
      
      if (checked) {
        newParticipantIds.push(value);
      } else {
        newParticipantIds = newParticipantIds.filter(id => id !== value);
      }
      
      return {
        ...prev,
        participantIds: newParticipantIds
      };
    });
  };
  
  const handleAllParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAllParticipants(e.target.checked);
    if (e.target.checked) {
      setItemData(prev => ({
        ...prev,
        participantIds: participants.map(p => p.id)
      }));
    } else {
      setItemData(prev => ({
        ...prev,
        participantIds: []
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedItemData = {
      ...itemData,
      price: itemData.price ? parseFloat(itemData.price) : null,
      eventId,
      completed: false
    };
    
    onSubmit(formattedItemData);
  };
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Добавить новый пункт</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Название*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={itemData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Например: Торт на праздник"
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Тип*
            </label>
            <select
              id="type"
              name="type"
              value={itemData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="product">Продукт</option>
              <option value="service">Услуга</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Стоимость (₽)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={itemData.price}
              onChange={handleNumberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Оставьте пустым, если неизвестно"
            />
          </div>
          
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Примечания
            </label>
            <textarea
              id="notes"
              name="notes"
              value={itemData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Детали, количество и т.д."
            />
          </div>
          
          <div>
            <label htmlFor="responsibleId" className="block text-sm font-medium text-gray-700 mb-1">
              Ответственный*
            </label>
            <select
              id="responsibleId"
              name="responsibleId"
              value={itemData.responsibleId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {participants.map(participant => (
                <option key={participant.id} value={participant.id}>
                  {participant.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-1">
                Кто участвует в расходах*
              </legend>
              <div className="mt-2">
                <div className="flex items-center mb-2">
                  <input
                    id="allParticipants"
                    name="participantType"
                    type="checkbox"
                    checked={isAllParticipants}
                    onChange={handleAllParticipantsChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allParticipants" className="ml-2 block text-sm text-gray-700">
                    Все участники
                  </label>
                </div>
                
                {!isAllParticipants && (
                  <div className="space-y-2 ml-6">
                    {participants.map(participant => (
                      <div key={participant.id} className="flex items-center">
                        <input
                          id={`participant-${participant.id}`}
                          name={`participant-${participant.id}`}
                          type="checkbox"
                          value={participant.id}
                          checked={itemData.participantIds.includes(participant.id)}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`participant-${participant.id}`} className="ml-2 block text-sm text-gray-700">
                          {participant.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </fieldset>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 