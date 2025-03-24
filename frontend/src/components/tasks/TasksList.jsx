import React, { useState, useEffect } from 'react';
import { TaskService } from '../../services';

/**
 * Компонент для отображения списка задач мероприятия
 */
const TasksList = ({ eventId, onAddTask, onEditTask, onDeleteTask }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загрузка задач
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await TaskService.getEventTasks(eventId);
        setTasks(data || []);
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [eventId]);

  const handleDelete = async (taskId) => {
    if (window.confirm('Вы действительно хотите удалить эту задачу?')) {
      try {
        await TaskService.deleteTask(taskId);
        setTasks(tasks.filter(t => t.id !== taskId));
        if (onDeleteTask) {
          onDeleteTask(taskId);
        }
      } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await TaskService.updateTaskStatus(taskId, newStatus);
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Задачи мероприятия</h3>
        <button 
          onClick={onAddTask}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Добавить задачу
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : tasks.length > 0 ? (
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <li key={task.id} className="px-4 py-3 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <p 
                      className="font-medium cursor-pointer hover:text-blue-600"
                      onClick={() => onEditTask(task)}
                    >
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {task.assignee ? `Ответственный: ${task.assignee.name}` : 'Нет ответственного'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusClass(task.status)}`}>
                      {getStatusLabel(task.status)}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">до {task.dueDate}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-end space-x-2">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="PENDING">Ожидает</option>
                    <option value="IN_PROGRESS">В процессе</option>
                    <option value="COMPLETED">Выполнено</option>
                    <option value="CANCELLED">Отменено</option>
                  </select>
                  <button 
                    onClick={() => onEditTask(task)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Редактировать
                  </button>
                  <button 
                    onClick={() => handleDelete(task.id)}
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
          <p className="text-gray-500">Задач пока нет. Добавьте первую задачу!</p>
        </div>
      )}
    </div>
  );
};

export default TasksList;