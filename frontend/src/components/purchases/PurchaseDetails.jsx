import React from 'react';
import { PurchaseService } from '../../services';

/**
 * Компонент для отображения детальной информации о покупке
 */
const PurchaseDetails = ({ purchase, onClose, onEdit, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Вы действительно хотите удалить эту покупку?')) {
      try {
        await PurchaseService.deletePurchase(purchase.id);
        if (onDelete) {
          onDelete(purchase.id);
        }
      } catch (error) {
        console.error('Ошибка при удалении покупки:', error);
      }
    }
  };

  // Функция для форматирования суммы
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-medium">Детали покупки</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-xl font-semibold mb-2">{purchase.name}</h4>
          <div className="text-lg font-bold text-green-600">
            {formatAmount(purchase.amount)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Дата покупки</p>
            <p className="mt-1">{purchase.date || 'Не указана'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Покупатель</p>
            <p className="mt-1">{purchase.buyer ? purchase.buyer.name : 'Не указан'}</p>
          </div>
        </div>
        
        {purchase.description && (
          <div>
            <p className="text-sm font-medium text-gray-500">Описание</p>
            <div className="mt-1 p-3 bg-gray-50 rounded-md">
              <p className="whitespace-pre-wrap">{purchase.description}</p>
            </div>
          </div>
        )}
        
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Участники ({purchase.participants?.length || 0})</p>
          {purchase.participants && purchase.participants.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {purchase.participants.map(participant => (
                <div key={participant.id} className="flex items-center bg-gray-50 rounded-md p-2">
                  <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-800 mr-2">
                    {participant.name.charAt(0)}
                  </div>
                  <span className="text-sm truncate">{participant.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Нет участников</p>
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Расчет на участника</p>
          {purchase.participants && purchase.participants.length > 0 ? (
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-lg font-semibold">
                {formatAmount(purchase.amount / purchase.participants.length)}
              </p>
              <p className="text-sm text-gray-500">
                {purchase.amount} ₽ / {purchase.participants.length} {purchase.participants.length > 1 
                  ? 'участников' 
                  : 'участник'}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic">Нет участников для расчета</p>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 border-t border-gray-200">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Редактировать
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default PurchaseDetails; 