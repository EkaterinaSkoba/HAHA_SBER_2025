import React from 'react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute right-0 top-0 h-64 w-64 bg-blue-100 rounded-full filter blur-3xl -translate-y-24 translate-x-24"></div>
          <div className="absolute left-0 bottom-0 h-64 w-64 bg-purple-100 rounded-full filter blur-3xl translate-y-24 -translate-x-24"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Организатор мероприятий
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Планируйте вместе, распределяйте задачи и управляйте общим бюджетом легко и удобно
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-lg mx-auto">
            <Link 
              href="/events/new" 
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Создать мероприятие
            </Link>
            <Link 
              href="/events" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 font-medium rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Мои мероприятия
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Ключевые возможности</h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Совместное планирование</h3>
            <p className="text-gray-600">Создавайте мероприятия и приглашайте участников для совместной организации</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Распределение задач</h3>
            <p className="text-gray-600">Назначайте ответственных и следите за выполнением задач в удобном формате</p>
          </div>
          
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Управление бюджетом</h3>
            <p className="text-gray-600">Отслеживайте расходы и автоматически рассчитывайте, кто кому должен</p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Начните пользоваться прямо сейчас</h2>
            <p className="text-blue-100 text-lg mb-8">
              Создайте свое первое мероприятие и оцените, как просто организовывать события вместе
            </p>
            <Link 
              href="/events/new"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Начать бесплатно
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 