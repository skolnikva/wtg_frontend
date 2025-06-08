import axios from 'axios';
import Cookies from 'js-cookie';

// const API_URL = 'http://192.168.208.1:8000';
// const API_URL = 'http://172.20.10.4:8000';
const API_URL = 'http://192.168.2.56:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        Cookies.remove('Token');
        Cookies.remove('UserId');
      } else if (status === 404 && navigate) {
        navigate('/404');
      }

      const serverError = error.response.data;
      return Promise.reject({
        message: serverError.message || serverError.detail || 'Произошла ошибка',
        status,
        data: serverError
      });
    } else if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      if (navigate) {
        navigate('/404');
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  // ======================
  // Серверные утилиты
  // ======================
  async checkServerAvailability() {
    try {
      const response = await apiClient.get('/category/', { timeout: 2000 });
      return response.status >= 200 && response.status < 300;
    } catch (error) {
      return false;
    }
  },

  getFullMediaUrl(path) {
    if (!path) return null;
    return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  },

  // ======================
  // Аутентификация
  // ======================
  async register({ username, email, password }) {
    const response = await apiClient.post('/users/register', { username, email, password });
    return response.data;
  },

  async login({ username, password }) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await apiClient.post('/users/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);

    if (response.data.Authorization) {
      Cookies.set('Token', response.data.Authorization, {
        expires: oneHourFromNow,
        path: '/',
        sameSite: 'Lax',
      });
    }
    if (response.data.id) {
      Cookies.set('UserId', response.data.id, {
        expires: oneHourFromNow,
        path: '/',
        sameSite: 'Lax',
      });
    }

    return response.data;
  },

  async logout() {
    const token = Cookies.get('Token');
    const response = await apiClient.delete('/users/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  },

  // ======================
  // Профиль пользователя
  // ======================
  async getUserData(userId) {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  },

  async updateUser(userId, userData) {
    const token = Cookies.get('Token');
    try {
      const response = await apiClient.put(`/users/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      if (error.status === 400 && error.data) {
        const validationErrors = {};
        for (const [field, messages] of Object.entries(error.data)) {
          validationErrors[field] = Array.isArray(messages) ? messages.join(', ') : messages;
        }
        error.validationErrors = validationErrors;
      }
      throw error;
    }
  },

  async changePassword(userId, lastPassword, newPassword) {
    const token = Cookies.get('Token');
    const response = await apiClient.put(
      `/users/${userId}/change-password`,
      {
        last_password: lastPassword,
        password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  async deleteUser(userId) {
    const token = Cookies.get('Token');
    const response = await apiClient.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  },

  // ======================
  // Аватар пользователя
  // ======================
  async uploadAvatar(userId, file) {
    const token = Cookies.get('Token');
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.put(`/users/${userId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data.avatar_path;
  },

  async deleteAvatar(userId) {
    const token = Cookies.get('Token');
    const response = await apiClient.delete(`/users/${userId}/avatar`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  },

  // ======================
  // Избранные мероприятия
  // ======================
  async addToFavorites(eventId) {
    const token = Cookies.get('Token');
    const response = await apiClient.post(`/users/favorites/${eventId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  },

  async removeFromFavorites(eventId) {
    const token = Cookies.get('Token');
    const response = await apiClient.delete(`/users/favorites/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  },

  // ======================
  // Категории
  // ======================
  async getAllCategories() {
    const response = await apiClient.get('/category/');
    return response.data;
  },

  async getCategoryById(categoryId) {
    const response = await apiClient.get(`/category/${categoryId}`);
    return response.data;
  },

  async getEventsByCategory(categoryId, limit, offset) {
    const response = await apiClient.get(`/category/${categoryId}/events`, {
      params: { 
        limit, 
        offset,
        count: true
      },
    });
    
    if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
      return {
        items: response.data.items || [],
        total: response.data.total || 0
      };
    }
    
    return {
      items: Array.isArray(response.data) ? response.data : [],
      total: 0
    };
  },

  // ======================
  // Локации
  // ======================
  async getAllLocations() {
    const response = await apiClient.get('/locations/');
    return response.data;
  },

  async getLocationById(locationId) {
    const response = await apiClient.get(`/locations/${locationId}`);
    return response.data;
  },

  async getEventsByLocation(locationId, limit, offset) {
    const response = await apiClient.get(`/locations/${locationId}/events`, {
      params: {
        limit,
        offset,
        count: true,
      },
    });

    if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
      return {
        items: response.data.items || [],
        total: response.data.total || 0,
      };
    }

    return {
      items: Array.isArray(response.data) ? response.data : [],
      total: 0,
    };
  },

  // ======================
  // Мероприятия
  // ======================
  async getAllEvents(limit, offset) {
    const response = await apiClient.get('/events/', {
      params: { limit, offset, count: true },
    });

    if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
      return {
        items: response.data.items || [],
        total: response.data.total || 0
      };
    }

    return {
      items: Array.isArray(response.data) ? response.data : [],
      total: 0
    };
  },

  async getEventById(eventId) {
    const response = await apiClient.get(`/events/${eventId}`);
    return response.data;
  },

  async getEventsByDate(date, limit = 100, offset = 0) {
    const response = await apiClient.get('/events/', {
      params: { date, limit, offset }
    });
    return response.data;
  },

  async getEventsByDateAndTimeRange(date, hour, limit = 100, offset = 0) {
    const response = await apiClient.get('/events/', {
      params: { date, time: hour, limit, offset }
    });
    return response.data;
  },

  async getEventsByDateRange(dateFrom, dateTo) {
    const response = await apiClient.get('/events/', {
      params: { date_from: dateFrom, date_to: dateTo, limit: 100 }
    });
    return response.data;
  },

  async searchEvents(query) {
    const response = await apiClient.get('/events/search', {
      params: { query },
    });
    return response.data;
  },
};

export default api;