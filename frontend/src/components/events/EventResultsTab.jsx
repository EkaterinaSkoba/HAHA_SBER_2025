import React, { useState, useEffect } from 'react';
import { EventService } from '../../services';

/**
 * Компонент для отображения итогов события (расчеты и долги)
 */
export const EventResultsTab = ({ eventId }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загрузка данных об итогах
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await EventService.getEventResults(eventId);
        setResults(data);
      } catch (error) {
        console.error('Ошибка при загрузке итогов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [eventId]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Финансовые итоги</h3>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : results ? (
        <>
          <div className="bg-white shadow overflow-hidden rounded-md">
            <div className="px-4 py-4 sm:px-6 border-b border-gray-200">
              <h4 className="text-md font-medium">Общая информация</h4>
            </div>
            <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Всего потрачено</p>
                <p className="text-xl font-semibold">{results.totalAmount} ₽</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Количество покупок</p>
                <p className="text-xl font-semibold">{results.purchasesCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Участников</p>
                <p className="text-xl font-semibold">{results.participantsCount}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Кто кому должен</h4>
            {results.debts && results.debts.length > 0 ? (
              <div className="bg-white shadow overflow-hidden rounded-md">
                <ul className="divide-y divide-gray-200">
                  {results.debts.map((debt, index) => (
                    <li key={index} className="px-4 py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="font-medium">{debt.from}</span>
                          <span className="mx-2 text-gray-400">→</span>
                          <span className="font-medium">{debt.to}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-red-600">{debt.amount} ₽</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-md p-6 text-center">
                <p className="text-gray-500">Все расходы распределены равномерно. Никто никому не должен.</p>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Баланс участников</h4>
            <div className="bg-white shadow overflow-hidden rounded-md">
              <ul className="divide-y divide-gray-200">
                {results.balances && Object.entries(results.balances).map(([name, balance]) => (
                  <li key={name} className="px-4 py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{name}</span>
                      </div>
                      <div>
                        <span className={`font-semibold ${
                          balance > 0 ? 'text-green-600' : 
                          balance < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {balance > 0 ? '+' : ''}{balance} ₽
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-gray-50 rounded-md p-6 text-center">
          <p className="text-gray-500">Нет данных для отображения. Добавьте покупки, чтобы увидеть итоги.</p>
        </div>
      )}
    </div>
  );
}; 