import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, Calendar, BookOpen, Tag } from 'lucide-react';

const Tasks = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState({
    title: '',
    subject: '',
    priority: 'medium',
    dueDate: ''
  });

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', color: '#667eea' },
    { id: 'physics', name: 'Physics', color: '#4facfe' },
    { id: 'chemistry', name: 'Chemistry', color: '#43e97b' },
    { id: 'biology', name: 'Biology', color: '#fa709a' },
    { id: 'economics', name: 'Economics', color: '#fee140' }
  ];

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title) {
      onAddTask(newTask);
      setShowModal(false);
      setNewTask({ title: '', subject: '', priority: 'medium', dueDate: '' });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#fee140';
      case 'low': return '#43e97b';
      default: return '#a0a0b0';
    }
  };

  return (
    <div className="page tasks">
      <div className="page-header">
        <div>
          <h1>Tasks</h1>
          <p className="subtitle">Manage your study tasks</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={`tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({tasks.length})
        </button>
        <button 
          className={`tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({tasks.filter(t => !t.completed).length})
        </button>
        <button 
          className={`tab ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({tasks.filter(t => t.completed).length})
        </button>
      </div>

      {/* Tasks List */}
      <div className="tasks-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => {
            const subject = subjects.find(s => s.id === task.subject);
            
            return (
              <div 
                key={task.id} 
                className={`task-card animate-slide-up ${task.completed ? 'completed' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button 
                  className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                  onClick={() => onToggleTask(task.id)}
                >
                  {task.completed && <CheckSquare size={18} />}
                </button>
                <div className="task-content">
                  <h3 className={task.completed ? 'strikethrough' : ''}>{task.title}</h3>
                  <div className="task-meta">
                    {subject && (
                      <span className="task-subject" style={{ color: subject.color }}>
                        <BookOpen size={14} />
                        {subject.name}
                      </span>
                    )}
                    {task.dueDate && (
                      <span className="task-due">
                        <Calendar size={14} />
                        {task.dueDate}
                      </span>
                    )}
                    <span 
                      className="task-priority"
                      style={{ background: getPriorityColor(task.priority) }}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
                <button 
                  className="task-delete"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })
        ) : (
          <div className="empty-state large">
            <CheckSquare size={64} className="icon-muted" />
            <h3>No tasks found</h3>
            <p>Create a new task to get started</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Task</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Task Title</label>
                <input 
                  type="text" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g., Complete Physics P1 Past Paper"
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select 
                  value={newTask.subject}
                  onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input 
                    type="date" 
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary full-width">
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
