import React, { useState, useEffect } from 'react';
import { PurchaseService } from '../../services';

/**
 * Компонент для отображения списка покупок мероприятия
 */
const PurchasesList = ({ eventId, onAddPurchase, onEditPurchase, onDeletePurchase }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка покупок
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const data = await PurchaseService.getEventPurchases(eventId);
        setPurchases(data || []);
      } catch (error) {
        console.error('Ошибка при загрузке покупок:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [eventId]);

  const handleDelete = async (purchaseId) => {
    if (window.confirm('Вы действительно хотите удалить эту покупку?')) {
      try {
        await PurchaseService.deletePurchase(purchaseId);
        setPurchases(purchases.filter(p => p.id !== purchaseId));
        if (onDeletePurchase) {
          onDeletePurchase(purchaseId);
        }
      } catch (error) {
        console.error('Ошибка при удалении покупки:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Покупки мероприятия</h3>
        <button 
          onClick={onAddPurchase}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Добавить покупку
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : purchases.length > 0 ? (
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <li key={purchase.id} className="px-4 py-3 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <p 
                      className="font-medium cursor-pointer hover:text-blue-600"
                      onClick={() => onEditPurchase(purchase)}
                    >
                      {purchase.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {purchase.buyer ? purchase.buyer.name : 'Нет покупателя'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{purchase.amount} ₽</p>
                    <p className="text-sm text-gray-500">{purchase.date}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-end space-x-2">
                  <button 
                    onClick={() => onEditPurchase(purchase)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Редактировать
                  </button>
                  <button 
                    onClick={() => handleDelete(purchase.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-md p-6 text-center">
          <p className="text-gray-500">Покупок пока нет. Добавьте первую покупку!</p>
        </div>
      )}
    </div>
  );
};

export default PurchasesList; 