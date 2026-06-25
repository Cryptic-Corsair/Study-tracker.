import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, Target, BookOpen } from 'lucide-react';

const Progress = ({ progress, onUpdateProgress, subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);

  const getSubjectProgress = (subjectId) => {
    const subjectProgress = progress[subjectId];
    if (!subjectProgress) return 0;
    
    const papers = Object.keys(subjectProgress);
    if (papers.length === 0) return 0;
    
    const total = papers.reduce((sum, paperId) => sum + (subjectProgress[paperId].progress || 0), 0);
    return Math.round(total / papers.length);
  };

  const handleProgressChange = (subjectId, paperId, value) => {
    const currentProgress = progress[subjectId]?.[paperId] || {};
    onUpdateProgress(subjectId, paperId, {
      ...currentProgress,
      progress: parseInt(value)
    });
  };

  const handleGradeChange = (subjectId, paperId, grade) => {
    const currentProgress = progress[subjectId]?.[paperId] || {};
    onUpdateProgress(subjectId, paperId, {
      ...currentProgress,
      grade
    });
  };

  return (
    <div className="page progress">
      <div className="page-header">
        <div>
          <h1>Progress Tracking</h1>
          <p className="subtitle">Monitor your syllabus completion</p>
        </div>
      </div>

      {/* Subject Selection */}
      <div className="subject-selector">
        {subjects.map((subject) => {
          const subjectProgress = getSubjectProgress(subject.id);
          
          return (
            <button
              key={subject.id}
              className={`subject-btn ${selectedSubject === subject.id ? 'active' : ''}`}
              onClick={() => setSelectedSubject(selectedSubject === subject.id ? null : subject.id)}
              style={{ 
                '--subject-color': subject.color,
                '--progress': subjectProgress
              }}
            >
              <div className="subject-btn-icon" style={{ background: subject.color }}>
                <BookOpen size={18} />
              </div>
              <span>{subject.name}</span>
              <div className="subject-btn-progress">
                <div className="progress-indicator" style={{ width: `${subjectProgress}%` }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Papers Grid */}
      {selectedSubject && (
        <div className="papers-section animate-slide-up">
          <h2>Papers Progress</h2>
          <div className="papers-grid">
            {subjects.find(s => s.id === selectedSubject)?.papers.map((paper) => {
              const paperProgress = progress[selectedSubject]?.[paper.id]?.progress || 0;
              const grade = progress[selectedSubject]?.[paper.id]?.grade || '';
              
              return (
                <div key={paper.id} className="paper-card">
                  <div className="paper-header">
                    <div>
                      <h3>{paper.id}</h3>
                      <p>{paper.name}</p>
                      <span className="paper-code">{paper.code}</span>
                    </div>
                    <select 
                      className="grade-select"
                      value={grade}
                      onChange={(e) => handleGradeChange(selectedSubject, paper.id, e.target.value)}
                    >
                      <option value="">Grade</option>
                      <option value="A*">A*</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="E">E</option>
                      <option value="U">U</option>
                    </select>
                  </div>
                  
                  <div className="paper-progress-section">
                    <div className="progress-input">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={paperProgress}
                        onChange={(e) => handleProgressChange(selectedSubject, paper.id, e.target.value)}
                        style={{ '--progress': paperProgress }}
                      />
                      <span className="progress-value">{paperProgress}%</span>
                    </div>
                    
                    <div className="progress-stats-mini">
                      <span>Topics: {Math.floor(paperProgress / 25)}/4</span>
                      <span>Past Papers: {Math.floor(paperProgress / 20)}/5</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Overall Statistics */}
      <div className="stats-section">
        <h2>Overall Statistics</h2>
        <div className="stats-cards">
          <div className="stat-card-large">
            <div className="stat-icon-large" style={{ background: 'var(--primary-gradient)' }}>
              <TrendingUp size={28} />
            </div>
            <div className="stat-info-large">
              <span className="stat-value-large">
                {Object.keys(progress).length > 0 
                  ? Math.round(Object.keys(progress).reduce((sum, id) => sum + getSubjectProgress(id), 0) / Object.keys(progress).length)
                  : 0}%
              </span>
              <span className="stat-label-large">Average Completion</span>
            </div>
          </div>
          
          <div className="stat-card-large">
            <div className="stat-icon-large" style={{ background: 'var(--success-gradient)' }}>
              <Award size={28} />
            </div>
            <div className="stat-info-large">
              <span className="stat-value-large">
                {Object.values(progress).reduce((sum, subject) => 
                  sum + Object.values(subject).filter(p => p.grade === 'A*' || p.grade === 'A').length, 0)
                }
              </span>
              <span className="stat-label-large">A/A* Grades</span>
            </div>
          </div>
          
          <div className="stat-card-large">
            <div className="stat-icon-large" style={{ background: 'var(--accent-gradient)' }}>
              <Target size={28} />
            </div>
            <div className="stat-info-large">
              <span className="stat-value-large">
                {Object.keys(progress).length}/{subjects.length}
              </span>
              <span className="stat-label-large">Subjects Tracked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
