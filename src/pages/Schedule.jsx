import React, { useState } from 'react';
import { Calendar, Plus, Clock, BookOpen, Trash2 } from 'lucide-react';

const Schedule = ({ schedule, onAddSchedule }) => {
  const [showModal, setShowModal] = useState(false);
  const [newSession, setNewSession] = useState({
    subject: '',
    topic: '',
    day: 'Monday',
    time: '09:00',
    duration: '1',
    color: '#667eea'
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const subjects = [
    { id: 'mathematics', name: 'Mathematics', color: '#667eea' },
    { id: 'physics', name: 'Physics', color: '#4facfe' },
    { id: 'chemistry', name: 'Chemistry', color: '#43e97b' },
    { id: 'biology', name: 'Biology', color: '#fa709a' },
    { id: 'economics', name: 'Economics', color: '#fee140' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSession.subject && newSession.topic) {
      onAddSchedule(newSession);
      setShowModal(false);
      setNewSession({
        subject: '',
        topic: '',
        day: 'Monday',
        time: '09:00',
        duration: '1',
        color: '#667eea'
      });
    }
  };

  const groupedSchedule = daysOfWeek.reduce((acc, day) => {
    acc[day] = schedule.filter(s => s.day === day).sort((a, b) => a.time.localeCompare(b.time));
    return acc;
  }, {});

  return (
    <div className="page schedule">
      <div className="page-header">
        <div>
          <h1>Study Schedule</h1>
          <p className="subtitle">Plan your study sessions</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={18} />
          Add Session
        </button>
      </div>

      <div className="schedule-week">
        {daysOfWeek.map((day, index) => (
          <div key={day} className="schedule-day animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="day-header">
              <span className="day-name">{day}</span>
              <span className="session-count">{groupedSchedule[day].length} sessions</span>
            </div>
            <div className="day-sessions">
              {groupedSchedule[day].length > 0 ? (
                groupedSchedule[day].map((session, idx) => (
                  <div 
                    key={idx} 
                    className="session-card"
                    style={{ borderLeftColor: session.color }}
                  >
                    <div className="session-time">
                      <Clock size={14} />
                      <span>{session.time}</span>
                      <span className="duration">{session.duration}h</span>
                    </div>
                    <div className="session-info">
                      <span className="session-subject" style={{ color: session.color }}>
                        {session.subject}
                      </span>
                      <span className="session-topic">{session.topic}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-sessions">
                  <span>No sessions</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Study Session</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Subject</label>
                <select 
                  value={newSession.subject} 
                  onChange={(e) => {
                    const selected = subjects.find(s => s.id === e.target.value);
                    setNewSession({ ...newSession, subject: selected?.name || '', color: selected?.color || '#667eea' });
                  }}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Topic</label>
                <input 
                  type="text" 
                  value={newSession.topic}
                  onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
                  placeholder="e.g., Calculus Chapter 1"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Day</label>
                  <select 
                    value={newSession.day}
                    onChange={(e) => setNewSession({ ...newSession, day: e.target.value })}
                  >
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input 
                    type="time" 
                    value={newSession.time}
                    onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Duration (hours)</label>
                <input 
                  type="number" 
                  min="0.5" 
                  max="8" 
                  step="0.5"
                  value={newSession.duration}
                  onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-primary full-width">
                Add Session
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
