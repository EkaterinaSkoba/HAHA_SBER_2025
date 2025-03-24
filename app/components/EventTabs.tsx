'use client';

import { useState } from 'react';
import { UserRole } from '../models/types';

interface EventTabsProps {
  activeTab: string;
  isOrganizer: boolean;
  onTabChange: (tab: string) => void;
}

export default function EventTabs({
  activeTab,
  isOrganizer,
  onTabChange
}: EventTabsProps) {
  const tabs = [
    { id: 'purchases', label: 'Закупки' },
    { id: 'myContributions', label: 'Мои взносы' },
    { id: 'myTasks', label: 'Мои задачи' },
    { id: 'participants', label: 'Участники' },
  ];
  
  // Добавляем вкладку "Итоги" только для организаторов
  if (isOrganizer) {
    tabs.push({ id: 'results', label: 'Итоги' });
  }
  
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex -mb-px overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
} 