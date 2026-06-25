import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  Clock, 
  Settings,
  GraduationCap,
  Target,
  TrendingUp,
  Award,
  Plus,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';

// Import data and utilities
import { getAllSubjects } from './data/subjects';
import { getTasks, saveTasks, getSchedule, saveSchedule, getProgress, saveProgress } from './utils/storage';

// Import components
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Schedule from './pages/Schedule';
import Tasks from './pages/Tasks';
import Progress from './pages/Progress';

import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [tasks, setTasks] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [progress, setProgress] = useState({});
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Exam Reminder', message: 'Physics P1 in 30 days', type: 'warning' },
    { id: 2, title: 'Task Completed', message: 'Great job on completing Calculus chapter!', type: 'success' }
  ]);

  useEffect(() => {
    setTasks(getTasks());
    setSchedule(getSchedule());
    setProgress(getProgress());
  }, []);

  const handleAddTask = (task) => {
    const newTasks = [...tasks, { ...task, id: Date.now(), completed: false }];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const handleToggleTask = (taskId) => {
    const newTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const handleDeleteTask = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const handleAddSchedule = (item) => {
    const newSchedule = [...schedule, { ...item, id: Date.now() }];
    setSchedule(newSchedule);
    saveSchedule(newSchedule);
  };

  const handleUpdateProgress = (subjectId, paperId, progressData) => {
    const newProgress = {
      ...progress,
      [subjectId]: {
        ...progress[subjectId],
        [paperId]: progressData
      }
    };
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  return (
    <Router>
      <div className="app">
        {/* Mobile Header */}
        <header className="mobile-header">
          <button 
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1>EDEXCEL Tracker</h1>
          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          mobileOpen={mobileMenuOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
          navItems={navItems}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content */}
        <main className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  tasks={tasks}
                  schedule={schedule}
                  progress={progress}
                  notifications={notifications}
                />
              } 
            />
            <Route 
              path="/subjects" 
              element={
                <Subjects 
                  subjects={getAllSubjects()}
                  progress={progress}
                />
              } 
            />
            <Route 
              path="/schedule" 
              element={
                <Schedule 
                  schedule={schedule}
                  onAddSchedule={handleAddSchedule}
                />
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <Tasks 
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                />
              } 
            />
            <Route 
              path="/progress" 
              element={
                <Progress 
                  progress={progress}
                  onUpdateProgress={handleUpdateProgress}
                  subjects={getAllSubjects()}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
