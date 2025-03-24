import React, { useState } from 'react';
import TasksList from './TasksList';
import TaskForm from './TaskForm';
import TaskDetails from './TaskDetails';

/**
 * Компонент для управления представлениями задач (список, форма, детали)
 */
export const TaskManager = ({ eventId }) => {
  const [view, setView] = useState('list'); // 'list', 'form', 'details'
  const [selectedTask, setSelectedTask] = useState(null);

  // Обработчик для добавления новой задачи
  const handleAddTask = () => {
    setSelectedTask(null);
    setView('form');
  };

  // Обработчик для редактирования задачи
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setView('form');
  };

  // Обработчик для просмотра деталей задачи
  const handleViewTaskDetails = (task) => {
    setSelectedTask(task);
    setView('details');
  };

  // Обработчик для удаления задачи
  const handleDeleteTask = (taskId) => {
    setView('list');
  };

  // Обработчик для возврата к списку задач
  const handleReturnToList = () => {
    setView('list');
    setSelectedTask(null);
  };

  // Обработчик для сохранения задачи
  const handleSaveTask = (task) => {
    setView('list');
    setSelectedTask(null);
  };

  // Обработчик для закрытия деталей задачи
  const handleCloseDetails = () => {
    setView('list');
    setSelectedTask(null);
  };

  // Обработчик для обновления задачи из представления деталей
  const handleUpdateTaskFromDetails = (updatedTask) => {
    setSelectedTask(updatedTask);
  };

  return (
    <div className="space-y-4">
      {view === 'list' && (
        <TasksList
          eventId={eventId}
          onAddTask={handleAddTask}
          onEditTask={handleViewTaskDetails}
          onDeleteTask={handleDeleteTask}
        />
      )}
      
      {view === 'form' && (
        <TaskForm
          eventId={eventId}
          task={selectedTask}
          onCancel={handleReturnToList}
          onSave={handleSaveTask}
        />
      )}
      
      {view === 'details' && selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={handleCloseDetails}
          onEdit={() => handleEditTask(selectedTask)}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default TaskManager; 