import React, { useState } from 'react';
import { PurchaseManager } from '../purchases';
import { TaskManager } from '../tasks';
import { EventParticipantsTab } from './EventParticipantsTab';
import { EventResultsTab } from './EventResultsTab';

/**
 * Компонент кнопки таба для EventTabs
 */
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium rounded-md transition-colors ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
    }`}
  >
    {children}
  </button>
);

/**
 * Компонент вкладок события для навигации между разделами события
 */
const EventTabs = ({ eventId, activeTab = 'purchases' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  const tabs = [
    { id: 'purchases', label: 'Покупки' },
    { id: 'tasks', label: 'Задачи' },
    { id: 'participants', label: 'Участники' },
    { id: 'results', label: 'Итоги' },
  ];
  
  return (
    <div className="mb-6">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={currentTab === tab.id}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>
      
      <div className="pt-4">
        {currentTab === 'purchases' && <PurchaseManager eventId={eventId} />}
        {currentTab === 'tasks' && <TaskManager eventId={eventId} />}
        {currentTab === 'participants' && <EventParticipantsTab eventId={eventId} />}
        {currentTab === 'results' && <EventResultsTab eventId={eventId} />}
      </div>
    </div>
  );
};

export default EventTabs; 