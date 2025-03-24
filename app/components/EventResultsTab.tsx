'use client';

import { useState, useEffect } from 'react';
import { EventWithDetails, UserBalance, PaymentMessage } from '../models/types';
import { calculateUserBalances, generatePaymentMessages, formatPaymentMessage } from '../utils/eventCalculations';

interface EventResultsTabProps {
  event: EventWithDetails;
}

export default function EventResultsTab({ event }: EventResultsTabProps) {
  const [paymentDetails, setPaymentDetails] = useState('');
  const [userBalances, setUserBalances] = useState<UserBalance[]>([]);
  const [paymentMessages, setPaymentMessages] = useState<PaymentMessage[]>([]);
  const [completedPayments, setCompletedPayments] = useState<Record<string, boolean>>({});
  
  // Рассчитываем балансы при первой загрузке или изменении данных мероприятия
  useEffect(() => {
    const balances = calculateUserBalances(event);
    setUserBalances(balances);
  }, [event]);
  
  // Генерируем сообщения для переводов когда изменяются балансы или детали платежа
  useEffect(() => {
    if (paymentDetails) {
      const messages = generatePaymentMessages(userBalances, event, paymentDetails);
      setPaymentMessages(messages);
    }
  }, [userBalances, paymentDetails, event]);
  
  // Обработчик для изменения деталей платежа
  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPaymentDetails(e.target.value);
  };
  
  // Обработчик для копирования сообщения в буфер обмена
  const handleCopyMessage = (userId: string) => {
    const message = paymentMessages.find(msg => msg.fromUserId === userId);
    if (message) {
      const formattedMessage = formatPaymentMessage(message);
      navigator.clipboard.writeText(formattedMessage)
        .then(() => {
          alert('Сообщение скопировано в буфер обмена');
        })
        .catch(err => {
          console.error('Не удалось скопировать текст: ', err);
        });
    }
  };
  
  // Обработчик для отметки о выполнении платежа
  const handleTogglePaymentCompleted = (userId: string) => {
    setCompletedPayments(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Итоги мероприятия</h2>
      
      <div className="mb-6">
        <label htmlFor="paymentDetails" className="block text-sm font-medium text-gray-700 mb-1">
          Данные для перевода средств
        </label>
        <textarea
          id="paymentDetails"
          value={paymentDetails}
          onChange={handlePaymentDetailsChange}
          rows={3}
          placeholder="Укажите данные для перевода (номер карты, телефон и т.д.)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      {paymentDetails ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Расчет расходов и взносов</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Ниже представлен расчет, кто сколько должен перевести или получить
            </p>
          </div>
          <ul className="divide-y divide-gray-200">
            {userBalances.map((balance) => (
              <li key={balance.userId} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!!completedPayments[balance.userId]}
                      onChange={() => handleTogglePaymentCompleted(balance.userId)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{balance.userName}</p>
                      <p className="text-sm text-gray-500">
                        {`Потратил: ${balance.spent.toFixed(2)} ₽, Доля в расходах: ${balance.shouldPay.toFixed(2)} ₽`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${balance.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {balance.balance >= 0 ? `+${balance.balance.toFixed(2)} ₽` : `${balance.balance.toFixed(2)} ₽`}
                    </span>
                    {balance.balance < 0 && (
                      <button 
                        onClick={() => handleCopyMessage(balance.userId)}
                        className="ml-4 text-blue-600 hover:text-blue-900 text-sm"
                      >
                        Копировать сообщение
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-4 bg-yellow-50 rounded-md">
          <p className="text-yellow-700">
            Пожалуйста, укажите данные для перевода средств, чтобы увидеть расчет
          </p>
        </div>
      )}
    </div>
  );
} 