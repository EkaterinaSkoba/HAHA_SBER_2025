import React from 'react';
import { TaskService } from '../../services';

/**
 * Компонент для отображения детальной информации о задаче
 */
const TaskDetails = ({ task, onClose, onEdit, onDelete }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      await TaskService.updateTaskStatus(task.id, newStatus);
      // Обновляем задачу локально через пропсы, если передан соответствующий обработчик
      if (onEdit) {
        onEdit({ ...task, status: newStatus });
      }
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы действительно хотите удалить эту задачу?')) {
      try {
        await TaskService.deleteTask(task.id);
        if (onDelete) {
          onDelete(task.id);
        }
      } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'COMPLETED': return 'Выполнено';
      case 'IN_PROGRESS': return 'В процессе';
      case 'PENDING': return 'Ожидает';
      case 'CANCELLED': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-medium">Детали задачи</h3>
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
          <h4 className="text-xl font-semibold mb-2">{task.title}</h4>
          <div className="flex items-center">
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusClass(task.status)}`}>
              {getStatusLabel(task.status)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Срок выполнения</p>
            <p className="mt-1">{task.dueDate || 'Не указан'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Ответственный</p>
            <p className="mt-1">{task.assignee ? task.assignee.name : 'Не назначен'}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500">Описание</p>
          <div className="mt-1 p-3 bg-gray-50 rounded-md">
            {task.description ? (
              <p className="whitespace-pre-wrap">{task.description}</p>
            ) : (
              <p className="text-gray-400 italic">Описание отсутствует</p>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Изменить статус</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusChange('PENDING')}
              className={`px-3 py-1 text-xs rounded-md ${task.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' : 'bg-gray-100 text-gray-800 hover:bg-yellow-50'}`}
            >
              Ожидает
            </button>
            <button
              onClick={() => handleStatusChange('IN_PROGRESS')}
              className={`px-3 py-1 text-xs rounded-md ${task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' : 'bg-gray-100 text-gray-800 hover:bg-blue-50'}`}
            >
              В процессе
            </button>
            <button
              onClick={() => handleStatusChange('COMPLETED')}
              className={`px-3 py-1 text-xs rounded-md ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-gray-100 text-gray-800 hover:bg-green-50'}`}
            >
              Выполнено
            </button>
            <button
              onClick={() => handleStatusChange('CANCELLED')}
              className={`px-3 py-1 text-xs rounded-md ${task.status === 'CANCELLED' ? 'bg-red-100 text-red-800 border-2 border-red-300' : 'bg-gray-100 text-gray-800 hover:bg-red-50'}`}
            >
              Отменено
            </button>
          </div>
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

export default TaskDetails; 