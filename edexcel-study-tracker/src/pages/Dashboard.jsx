import React from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  Bell,
  ChevronRight
} from 'lucide-react';

const Dashboard = ({ tasks, schedule, progress, notifications }) => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const upcomingSessions = schedule.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  // Calculate overall progress
  const subjectProgress = Object.keys(progress).map(subjectId => {
    const papers = progress[subjectId];
    const paperIds = Object.keys(papers);
    if (paperIds.length === 0) return 0;
    const avgProgress = paperIds.reduce((sum, id) => sum + (papers[id].progress || 0), 0) / paperIds.length;
    return avgProgress;
  });
  
  const overallProgress = subjectProgress.length > 0 
    ? Math.round(subjectProgress.reduce((a, b) => a + b, 0) / subjectProgress.length) 
    : 0;

  const statCards = [
    {
      title: 'Subjects',
      value: Object.keys(progress).length,
      icon: BookOpen,
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Tasks Done',
      value: `${completedTasks}/${totalTasks}`,
      icon: CheckCircle,
      color: '#43e97b',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      title: 'Study Hours',
      value: '24.5h',
      icon: Clock,
      color: '#4facfe',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Progress',
      value: `${overallProgress}%`,
      icon: TrendingUp,
      color: '#fa709a',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  ];

  return (
    <div className="page dashboard">
      <div className="page-header">
        <div>
          <h1>Welcome back!</h1>
          <p className="subtitle">Track your Edexcel IAL journey</p>
        </div>
        <button className="btn-primary">
          <Target size={18} />
          Set Goal
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="stat-icon" style={{ background: stat.gradient }}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Progress Overview */}
        <div className="card progress-card animate-slide-up">
          <div className="card-header">
            <h2>Overall Progress</h2>
            <Award size={20} className="icon-muted" />
          </div>
          <div className="progress-overview">
            <div className="circular-progress">
              <svg viewBox="0 0 120 120">
                <circle
                  className="progress-bg"
                  cx="60"
                  cy="60"
                  r="52"
                />
                <circle
                  className="progress-bar"
                  cx="60"
                  cy="60"
                  r="52"
                  style={{
                    strokeDashoffset: 326.73 - (326.73 * overallProgress) / 100
                  }}
                />
              </svg>
              <div className="progress-text">
                <span className="percentage">{overallProgress}%</span>
                <span className="label">Complete</span>
              </div>
            </div>
            <div className="progress-details">
              <p>Keep up the great work!</p>
              <p className="text-muted">You're making steady progress towards your goals.</p>
            </div>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="card schedule-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="card-header">
            <h2>Upcoming Sessions</h2>
            <Calendar size={20} className="icon-muted" />
          </div>
          <div className="schedule-list">
            {upcomingSessions.length > 0 ? (
              upcomingSessions.map((session, index) => (
                <div key={index} className="schedule-item">
                  <div className="schedule-time">
                    <span className="day">{session.day}</span>
                    <span className="time">{session.time}</span>
                  </div>
                  <div className="schedule-info">
                    <span className="subject" style={{ color: session.color }}>{session.subject}</span>
                    <span className="topic">{session.topic}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <Calendar size={48} className="icon-muted" />
                <p>No sessions scheduled</p>
                <button className="btn-text">Add Session</button>
              </div>
            )}
          </div>
        </div>

        {/* Task Completion */}
        <div className="card tasks-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="card-header">
            <h2>Task Completion</h2>
            <CheckCircle size={20} className="icon-muted" />
          </div>
          <div className="task-stats">
            <div className="completion-bar">
              <div 
                className="completion-fill" 
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <div className="completion-stats">
              <div className="stat-item">
                <span className="value">{completedTasks}</span>
                <span className="label">Completed</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="value">{totalTasks - completedTasks}</span>
                <span className="label">Pending</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="value">{completionRate}%</span>
                <span className="label">Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card notifications-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="card-header">
            <h2>Notifications</h2>
            <Bell size={20} className="icon-muted" />
          </div>
          <div className="notifications-list">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className={`notification-item ${notification.type}`}>
                <div className={`notification-dot ${notification.type}`} />
                <div className="notification-content">
                  <span className="notification-title">{notification.title}</span>
                  <span className="notification-message">{notification.message}</span>
                </div>
                <ChevronRight size={16} className="icon-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
