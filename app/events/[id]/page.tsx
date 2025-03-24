'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Заглушка для демонстрации
const mockEvent = {
  id: '1',
  title: 'День рождения Ивана',
  date: '2025-04-15',
  place: 'Ресторан "Причал"',
  description: 'Празднуем день рождения Ивана! Приходите все!',
  role: 'organizer',
  participants: [
    { id: '1', name: 'Иван Иванов', role: 'organizer' },
    { id: '2', name: 'Петр Петров', role: 'participant' },
    { id: '3', name: 'Анна Сидорова', role: 'participant' },
  ],
  items: [
    { 
      id: '1', 
      name: 'Торт', 
      type: 'product', 
      price: 3000, 
      notes: 'Шоколадный, 2кг', 
      responsible: { id: '1', name: 'Иван Иванов' },
      participants: ['1', '2', '3'],
      completed: false
    },
    { 
      id: '2', 
      name: 'Аренда зала', 
      type: 'service', 
      price: 15000, 
      notes: '', 
      responsible: { id: '1', name: 'Иван Иванов' },
      participants: ['1', '2', '3'],
      completed: true
    },
    { 
      id: '3', 
      name: 'Напитки', 
      type: 'product', 
      price: null, 
      notes: 'Вода, сок, газировка', 
      responsible: { id: '2', name: 'Петр Петров' },
      participants: ['1', '2'],
      completed: false
    },
  ]
};

export default function EventPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [activeTab, setActiveTab] = useState('purchases');
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Здесь будет API запрос для получения данных мероприятия
    // Сейчас используем заглушку
    setTimeout(() => {
      setEvent(mockEvent);
      setLoading(false);
    }, 500);
  }, [eventId]);
  
  if (loading) {
    return <div className="container mx-auto p-4 text-center">Загрузка...</div>;
  }
  
  if (!event) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl text-red-500">Мероприятие не найдено</p>
        <Link href="/events" className="mt-4 inline-block text-blue-500 hover:text-blue-700">
          Вернуться к списку мероприятий
        </Link>
      </div>
    );
  }
  
  const isOrganizer = event.role === 'organizer';
  
  return (
    <div className="container mx-auto p-4">
      {/* Шапка мероприятия */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <span className={`text-sm px-3 py-1 rounded-full ${isOrganizer ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {isOrganizer ? 'Организатор' : 'Участник'}
          </span>
        </div>
        <div className="mt-2 text-gray-600">
          <p>Дата: {new Date(event.date).toLocaleDateString('ru-RU')}</p>
          <p>Место: {event.place}</p>
          {event.description && <p className="mt-2">{event.description}</p>}
        </div>
      </div>
      
      {/* Табы */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('purchases')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'purchases'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Закупки
          </button>
          <button
            onClick={() => setActiveTab('myContributions')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'myContributions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Мои взносы
          </button>
          <button
            onClick={() => setActiveTab('myTasks')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'myTasks'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Мои задачи
          </button>
          <button
            onClick={() => setActiveTab('participants')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'participants'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Участники
          </button>
          {isOrganizer && (
            <button
              onClick={() => setActiveTab('results')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'results'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Итоги
            </button>
          )}
        </nav>
      </div>
      
      {/* Содержимое активного таба */}
      <div className="mt-6">
        {activeTab === 'purchases' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Список закупок и трат</h2>
              <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Добавить новый пункт
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тип
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Стоимость
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Примечания
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ответственный
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {event.items.map((item: any) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.type === 'product' ? 'Продукт' : 'Услуга'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.price ? `${item.price} ₽` : 'Не указана'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {item.notes || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.responsible.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.completed ? 'Выполнено' : 'В процессе'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">Изменить</button>
                        <button className="text-red-600 hover:text-red-900">Удалить</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'myContributions' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Мои взносы</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {event.items
                  .filter((item: any) => item.participants.includes('1')) // Фильтруем по текущему пользователю
                  .map((item: any) => (
                    <li key={item.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.notes}</p>
                        </div>
                        <div className="text-sm text-gray-900">
                          {item.price 
                            ? `${(item.price / item.participants.length).toFixed(2)} ₽` 
                            : 'Цена не указана'}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="px-4 py-4 sm:px-6 bg-gray-50">
                <p className="text-sm font-medium text-gray-900">
                  Итого: {event.items
                    .filter((item: any) => item.participants.includes('1') && item.price)
                    .reduce((sum: number, item: any) => sum + (item.price / item.participants.length), 0)
                    .toFixed(2)} ₽
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'myTasks' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Мои задачи</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {event.items
                  .filter((item: any) => item.responsible.id === '1') // Фильтруем по ответственному
                  .map((item: any) => (
                    <li key={item.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3 flex-1">
                          <p className={`text-sm font-medium ${item.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {item.name}
                          </p>
                          {item.notes && <p className="text-sm text-gray-500">{item.notes}</p>}
                        </div>
                        {!item.price && !item.completed && (
                          <button className="ml-4 px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50">
                            Указать цену
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'participants' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Участники мероприятия</h2>
              <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Скопировать ссылку-приглашение
              </button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {event.participants.map((participant: any) => (
                  <li key={participant.id} className="px-4 py-4 sm:px-6 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                      <p className="text-sm text-gray-500">
                        {participant.role === 'organizer' ? 'Организатор' : 'Участник'}
                      </p>
                    </div>
                    {isOrganizer && participant.role !== 'organizer' && (
                      <button className="text-red-600 hover:text-red-900 text-sm">
                        Удалить
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'results' && isOrganizer && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Итоги мероприятия</h2>
            <div className="mb-6">
              <label htmlFor="paymentDetails" className="block text-sm font-medium text-gray-700 mb-1">
                Данные для перевода средств
              </label>
              <textarea
                id="paymentDetails"
                rows={3}
                placeholder="Укажите данные для перевода (номер карты, телефон и т.д.)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Расчет расходов и взносов</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Ниже представлен расчет, кто сколько должен перевести или получить
                </p>
              </div>
              <ul className="divide-y divide-gray-200">
                {event.participants.map((participant: any) => {
                  // Рассчитаем, сколько потратил участник
                  const spent = event.items
                    .filter((item: any) => item.responsible.id === participant.id && item.price)
                    .reduce((sum: number, item: any) => sum + item.price, 0);
                  
                  // Рассчитаем, сколько должен заплатить участник
                  const shouldPay = event.items
                    .filter((item: any) => item.participants.includes(participant.id) && item.price)
                    .reduce((sum: number, item: any) => sum + (item.price / item.participants.length), 0);
                  
                  // Разница
                  const balance = spent - shouldPay;
                  
                  return (
                    <li key={participant.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                            <p className="text-sm text-gray-500">
                              {`Потратил: ${spent} ₽, Доля в расходах: ${shouldPay.toFixed(2)} ₽`}
                            </p>
                          </div>
                        </div>
                        <div className={`text-sm font-medium ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {balance >= 0 ? `+${balance.toFixed(2)} ₽` : `${balance.toFixed(2)} ₽`}
                          {balance < 0 && (
                            <button className="ml-2 text-blue-600 hover:text-blue-900">
                              Копировать сообщение
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 