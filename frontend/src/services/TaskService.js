import api from './api';

/**
 * Сервис для работы с задачами
 */
const TaskService = {
  /**
   * Получить задачу по ID
   * @param {number} taskId ID задачи
   */
  async getTaskById(taskId) {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении задачи с ID ${taskId}:`, error);
      throw error;
    }
  },

  /**
   * Создать новую задачу
   * @param {Object} taskData данные задачи
   */
  async createTask(taskData) {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
      throw error;
    }
  },

  /**
   * Обновить существующую задачу
   * @param {number} taskId ID задачи
   * @param {Object} taskData данные для обновления
   */
  async updateTask(taskId, taskData) {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении задачи с ID ${taskId}:`, error);
      throw error;
    }
  },

  /**
   * Удалить задачу
   * @param {number} taskId ID задачи
   */
  async deleteTask(taskId) {
    try {
      await api.delete(`/tasks/${taskId}`);
      return true;
    } catch (error) {
      console.error(`Ошибка при удалении задачи с ID ${taskId}:`, error);
      throw error;
    }
  },

  /**
   * Изменить статус задачи
   * @param {number} taskId ID задачи
   * @param {string} status новый статус
   */
  async updateTaskStatus(taskId, status) {
    try {
      const response = await api.patch(`/tasks/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при обновлении статуса задачи с ID ${taskId}:`, error);
      throw error;
    }
  },

  /**
   * Назначить задачу пользователю
   * @param {number} taskId ID задачи
   * @param {number} userId ID пользователя
   */
  async assignTask(taskId, userId) {
    try {
      const response = await api.post(`/tasks/${taskId}/assign/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при назначении задачи пользователю:`, error);
      throw error;
    }
  }
};

export default TaskService; 