export const edexcelSubjects = {
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    code: 'XMA11',
    color: '#667eea',
    papers: [
      { id: 'P1', name: 'Pure Mathematics P1', code: 'WMA11' },
      { id: 'P2', name: 'Pure Mathematics P2', code: 'WMA12' },
      { id: 'S1', name: 'Statistics S1', code: 'WMA03' },
      { id: 'M1', name: 'Mechanics M1', code: 'WMA04' }
    ]
  },
  furtherMathematics: {
    id: 'furtherMathematics',
    name: 'Further Mathematics',
    code: 'XFM11',
    color: '#764ba2',
    papers: [
      { id: 'FP1', name: 'Further Pure F1', code: 'WMA13' },
      { id: 'FP2', name: 'Further Pure F2', code: 'WMA14' },
      { id: 'D1', name: 'Decision D1', code: 'WMA05' },
      { id: 'S2', name: 'Statistics S2', code: 'WMA06' }
    ]
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    code: 'XPH11',
    color: '#4facfe',
    papers: [
      { id: 'U1', name: 'Unit 1 - Mechanics & Materials', code: 'WPH11' },
      { id: 'U2', name: 'Unit 2 - Waves & Electricity', code: 'WPH12' },
      { id: 'U3', name: 'Unit 3 - Practical Skills', code: 'WPH13' },
      { id: 'U4', name: 'Unit 4 - Fields & Particles', code: 'WPH14' },
      { id: 'U5', name: 'Unit 5 - Thermodynamics & Space', code: 'WPH15' },
      { id: 'U6', name: 'Unit 6 - Practical Investigation', code: 'WPH16' }
    ]
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'XCH11',
    color: '#43e97b',
    papers: [
      { id: 'U1', name: 'Unit 1 - Structure & Bonding', code: 'WCH11' },
      { id: 'U2', name: 'Unit 2 - Energetics & Organic', code: 'WCH12' },
      { id: 'U3', name: 'Unit 3 - Practical Skills I', code: 'WCH13' },
      { id: 'U4', name: 'Unit 4 - Rates & Equilibrium', code: 'WCH14' },
      { id: 'U5', name: 'Unit 5 - Transition Metals', code: 'WCH15' },
      { id: 'U6', name: 'Unit 6 - Practical Skills II', code: 'WCH16' }
    ]
  },
  biology: {
    id: 'biology',
    name: 'Biology',
    code: 'XBI11',
    color: '#fa709a',
    papers: [
      { id: 'U1', name: 'Unit 1 - Molecules & Transport', code: 'WBI11' },
      { id: 'U2', name: 'Unit 2 - Cells & Development', code: 'WBI12' },
      { id: 'U3', name: 'Unit 3 - Practical Skills I', code: 'WBI13' },
      { id: 'U4', name: 'Unit 4 - Energy & Environment', code: 'WBI14' },
      { id: 'U5', name: 'Unit 5 - Respiration & Immunity', code: 'WBI15' },
      { id: 'U6', name: 'Unit 6 - Practical Skills II', code: 'WBI16' }
    ]
  },
  economics: {
    id: 'economics',
    name: 'Economics',
    code: 'XEC11',
    color: '#fee140',
    papers: [
      { id: 'U1', name: 'Unit 1 - Markets in Action', code: 'WEC11' },
      { id: 'U2', name: 'Unit 2 - Consumer Behaviour', code: 'WEC12' },
      { id: 'U3', name: 'Unit 3 - Business Growth', code: 'WEC13' },
      { id: 'U4', name: 'Unit 4 - Global Economy', code: 'WEC14' }
    ]
  },
  accounting: {
    id: 'accounting',
    name: 'Accounting',
    code: 'XAC11',
    color: '#ff6b6b',
    papers: [
      { id: 'U1', name: 'Unit 1 - Introduction to Accounting', code: 'WAC11' },
      { id: 'U2', name: 'Unit 2 - Computerised Accounting', code: 'WAC12' },
      { id: 'U3', name: 'Unit 3 - Management Accounting', code: 'WAC13' },
      { id: 'U4', name: 'Unit 4 - Financial Accounting', code: 'WAC14' }
    ]
  },
  business: {
    id: 'business',
    name: 'Business',
    code: 'XBS11',
    color: '#00f2fe',
    papers: [
      { id: 'U1', name: 'Unit 1 - Marketing & People', code: 'WBS11' },
      { id: 'U2', name: 'Unit 2 - Managing Activities', code: 'WBS12' },
      { id: 'U3', name: 'Unit 3 - Decisions & Strategy', code: 'WBS13' },
      { id: 'U4', name: 'Unit 4 - Global Business', code: 'WBS14' }
    ]
  },
  computerScience: {
    id: 'computerScience',
    name: 'Computer Science',
    code: 'XCS11',
    color: '#c084fc',
    papers: [
      { id: 'U1', name: 'Unit 1 - Computational Thinking', code: 'WCS11' },
      { id: 'U2', name: 'Unit 2 - Programming Paradigms', code: 'WCS12' },
      { id: 'U3', name: 'Unit 3 - Project', code: 'WCS13' }
    ]
  },
  english: {
    id: 'english',
    name: 'English Literature',
    code: 'XEN11',
    color: '#f093fb',
    papers: [
      { id: 'U1', name: 'Unit 1 - Poetry & Prose', code: 'WEN11' },
      { id: 'U2', name: 'Unit 2 - Drama', code: 'WEN12' },
      { id: 'U3', name: 'Unit 3 - Coursework', code: 'WEN13' }
    ]
  }
};

export const gradeBoundaries = {
  A: 80,
  A_star: 90
};

export const getSubjectById = (id) => {
  return Object.values(edexcelSubjects).find(subject => subject.id === id);
};

export const getAllSubjects = () => {
  return Object.values(edexcelSubjects);
};
