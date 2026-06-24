// LocalStorage utility functions for data persistence

const STORAGE_KEYS = {
  SUBJECTS: 'edexcel_subjects',
  TASKS: 'edexcel_tasks',
  SCHEDULE: 'edexcel_schedule',
  PROGRESS: 'edexcel_progress',
  SETTINGS: 'edexcel_settings',
  NOTES: 'edexcel_notes'
};

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Subject management
export const saveSubjects = (subjects) => storage.set(STORAGE_KEYS.SUBJECTS, subjects);
export const getSubjects = () => storage.get(STORAGE_KEYS.SUBJECTS) || [];

// Task management
export const saveTasks = (tasks) => storage.set(STORAGE_KEYS.TASKS, tasks);
export const getTasks = () => storage.get(STORAGE_KEYS.TASKS) || [];

// Schedule management
export const saveSchedule = (schedule) => storage.set(STORAGE_KEYS.SCHEDULE, schedule);
export const getSchedule = () => storage.get(STORAGE_KEYS.SCHEDULE) || [];

// Progress tracking
export const saveProgress = (progress) => storage.set(STORAGE_KEYS.PROGRESS, progress);
export const getProgress = () => storage.get(STORAGE_KEYS.PROGRESS) || {};

// Settings
export const saveSettings = (settings) => storage.set(STORAGE_KEYS.SETTINGS, settings);
export const getSettings = () => storage.get(STORAGE_KEYS.SETTINGS) || {};

// Notes
export const saveNotes = (notes) => storage.set(STORAGE_KEYS.NOTES, notes);
export const getNotes = () => storage.get(STORAGE_KEYS.NOTES) || [];
