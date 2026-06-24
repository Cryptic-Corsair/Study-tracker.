import React, { useState } from 'react';
import { BookOpen, ChevronRight, Star, TrendingUp } from 'lucide-react';

const Subjects = ({ subjects, progress }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const getSubjectProgress = (subjectId) => {
    const subjectProgress = progress[subjectId];
    if (!subjectProgress) return 0;
    
    const papers = Object.keys(subjectProgress);
    if (papers.length === 0) return 0;
    
    const total = papers.reduce((sum, paperId) => sum + (subjectProgress[paperId].progress || 0), 0);
    return Math.round(total / papers.length);
  };

  return (
    <div className="page subjects">
      <div className="page-header">
        <div>
          <h1>Subjects</h1>
          <p className="subtitle">Manage your Edexcel IAL subjects</p>
        </div>
      </div>

      <div className="subjects-grid">
        {subjects.map((subject, index) => {
          const subjectProgress = getSubjectProgress(subject.id);
          
          return (
            <div 
              key={subject.id} 
              className={`subject-card animate-slide-up`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedSubject(selectedSubject === subject.id ? null : subject.id)}
            >
              <div className="subject-header">
                <div 
                  className="subject-icon" 
                  style={{ background: `linear-gradient(135deg, ${subject.color} 0%, ${subject.color}dd 100%)` }}
                >
                  <BookOpen size={24} />
                </div>
                <div className="subject-info">
                  <h3>{subject.name}</h3>
                  <span className="subject-code">{subject.code}</span>
                </div>
                <ChevronRight 
                  size={20} 
                  className={`chevron ${selectedSubject === subject.id ? 'rotated' : ''}`} 
                />
              </div>

              <div className="subject-progress">
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${subjectProgress}%`,
                      background: `linear-gradient(90deg, ${subject.color} 0%, ${subject.color}aa 100%)`
                    }}
                  />
                </div>
                <div className="progress-stats">
                  <span>{subjectProgress}% Complete</span>
                  <span>{subject.papers.length} Papers</span>
                </div>
              </div>

              {selectedSubject === subject.id && (
                <div className="subject-details">
                  <h4>Papers</h4>
                  <div className="papers-list">
                    {subject.papers.map((paper) => {
                      const paperProgress = progress[subject.id]?.[paper.id]?.progress || 0;
                      
                      return (
                        <div key={paper.id} className="paper-item">
                          <div className="paper-info">
                            <span className="paper-id">{paper.id}</span>
                            <span className="paper-name">{paper.name}</span>
                            <span className="paper-code">{paper.code}</span>
                          </div>
                          <div className="paper-progress">
                            <div className="mini-progress-bar">
                              <div 
                                className="mini-progress-fill"
                                style={{ 
                                  width: `${paperProgress}%`,
                                  background: subject.color
                                }}
                              />
                            </div>
                            <span>{paperProgress}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subjects;
