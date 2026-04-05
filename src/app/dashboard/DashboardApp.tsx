'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import useSWR from 'swr';
import { SECMAP, getKey, GRADE_MAP, FORMULAS, YT_RESOURCES, ACHIEVEMENTS, LEADERBOARD, TRADECOURSES, CHAPTERS } from '@/lib/secmap';
import { ProgressView, RevisionView, FormulasView, VideosView, LeaderboardView, AchievementsView } from './pages1';
import { GradesView, GoalsViewFull, MLView, ResourcesView, AssessmentView, CourseView, ProfileViewFull, SettingsViewFull } from './pages2';

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function DashboardApp({ session }: { session: any }) {
  const user = session?.user;
  const k = getKey(user?.section, user?.stream, user?.dept);
  const data = SECMAP[k] || SECMAP['10'];

  const [activePage, setActivePage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState('en');
  const [notifOpen, setNotifOpen] = useState(false);

  // Toggle Theme
  useEffect(() => {
    if (darkMode) document.body.classList.remove('light');
    else document.body.classList.add('light');
  }, [darkMode]);

  const toggleLang = () => {
    const langs = ['en', 'kn', 'hi'];
    setLang(langs[(langs.indexOf(lang) + 1) % langs.length]);
    alert(lang === 'kn' ? 'ಕನ್ನಡ (Kannada)' : lang === 'hi' ? 'हिन्दी (Hindi)' : 'English');
  };

  const navGroups = [
    { sec: 'Overview', items: [{ id: 'dashboard', icon: '🏠', lbl: 'Dashboard' }, { id: 'weekly', icon: '📅', lbl: 'Weekly Plan' }] },
    { sec: 'AI Features', items: [{ id: 'ai-tutor', icon: '🤖', lbl: 'AI Chat Tutor' }, { id: 'smart-plan', icon: '✨', lbl: 'Smart Plan Generator' }, { id: 'adaptive-quiz', icon: '🧠', lbl: 'Adaptive Quiz' }] },
    { sec: 'Analytics', items: [{ id: 'pomodoro', icon: '⏱️', lbl: 'Study Timer' }, { id: 'streak', icon: '🔥', lbl: 'Streak Calendar' }, { id: 'study-log', icon: '📊', lbl: 'Study Log' }, { id: 'progress', icon: '📈', lbl: 'Progress Charts' }] },
    { sec: 'Planning', items: [{ id: 'exams', icon: '📆', lbl: 'Exam Countdown' }, { id: 'timetable', icon: '🗓️', lbl: 'Timetable Builder' }, { id: 'revision', icon: '🔄', lbl: 'Revision Planner' }] },
    { sec: 'Content', items: [{ id: 'notes', icon: '📝', lbl: 'Notes & Flashcards' }, { id: 'formulas', icon: '➗', lbl: 'Formula Sheet' }, { id: 'chapters', icon: '✅', lbl: 'Chapter Checklist' }, { id: 'videos', icon: '▶️', lbl: 'Video Resources' }] },
    { sec: 'Social', items: [{ id: 'leaderboard', icon: '🏆', lbl: 'Leaderboard' }, { id: 'achievements', icon: '🎖️', lbl: 'Achievements' }] },
    { sec: 'Study', items: [{ id: 'grades', icon: '📋', lbl: 'Grades' }, { id: 'goals', icon: '🎯', lbl: 'Goals' }, { id: 'ml', icon: '⚙️', lbl: 'ML Insights' }, { id: 'resources', icon: '📚', lbl: 'Resources' }, { id: 'assessment', icon: '📝', lbl: 'Assessment' }] },
    ...(user?.section === 'trade' ? [{ sec: 'Course', items: [{ id: 'course', icon: '🎓', lbl: 'Demo Course' }] }] : []),
    { sec: 'Settings', items: [{ id: 'profile', icon: '👤', lbl: 'Profile' }, { id: 'settings', icon: '⚙️', lbl: 'Settings' }] }
  ];

  return (
    <div className="app-shell">
      {/* TOPBAR */}
      <div className="topbar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '52px' }}>
        <div className="topbar-logo">📚 Study<span>Plan AI</span> Pro</div>
        <span className="topbar-badge">{data.label}</span>
        <span style={{ fontSize: '12px', color: 'var(--text2)' }}>{user?.name}</span>
        <div className="spacer"></div>
        <div className="tb-controls">
          <div className="tb-icon-btn" onClick={toggleLang} data-tip="Language">🌐</div>
          <div className="tb-icon-btn" onClick={() => setNotifOpen(!notifOpen)} data-tip="Notifications">
            🔔<span className="notif-dot"></span>
          </div>
          <div className="tb-icon-btn" onClick={() => setDarkMode(!darkMode)} data-tip="Toggle theme">{darkMode ? '🌙' : '☀️'}</div>
          <div className="av" onClick={() => setActivePage('profile')}>{user?.name?.substring(0,2).toUpperCase()}</div>
          <button className="logout-btn" onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
        </div>
      </div>

      {notifOpen && (
        <div className="notif-panel open">
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Notifications</div>
          <div className="notif-item"><span className="notif-icon" style={{marginRight: '5px'}}>⏰</span><div><div style={{ color: 'var(--text)', fontWeight: 500 }}>Study reminder</div>Time to study!</div></div>
        </div>
      )}

      {/* BODY */}
      <div className="body-layout" style={{ marginTop: '52px', height: 'calc(100vh - 52px)' }}>
        <div className="sidebar">
          {navGroups.map((g, idx) => (
            <div key={idx}>
              <div className="ns">{g.sec}</div>
              {g.items.map(item => (
                <div key={item.id} className={`ni ${activePage === item.id ? 'act' : ''}`} onClick={() => setActivePage(item.id)}>
                  <span className="ni-icon">{item.icon}</span>{item.lbl}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="main-content">
          <div className="fade-in">
            <PageContent activePage={activePage} setActivePage={setActivePage} data={data} user={user} darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PageContent({ activePage, setActivePage, data, user, darkMode, setDarkMode, lang, setLang }: any) {
  // SWR Hooks for data (used deeply by pages below)
  const { data: logs, mutate: mutateLogs } = useSWR('/api/study-log', fetcher);
  const { data: exams, mutate: mutateExams } = useSWR('/api/exams', fetcher);
  const { data: goals, mutate: mutateGoals } = useSWR('/api/goals', fetcher);

  // Mini components to render each specific page
  switch (activePage) {
    case 'dashboard': return <DashboardView data={data} user={user} exams={exams || []} setActivePage={setActivePage} />;
    case 'weekly': return <WeeklyView data={data} setActivePage={setActivePage} />;
    case 'ai-tutor': return <AITutorView data={data} />;
    case 'smart-plan': return <SmartPlanView data={data} />;
    case 'adaptive-quiz': return <QuizView data={data} />;
    case 'pomodoro': return <PomodoroView data={data} logs={logs || []} mutateLogs={mutateLogs} />;
    case 'study-log': return <StudyLogView data={data} logs={logs || []} mutateLogs={mutateLogs} />;
    case 'exams': return <ExamsView data={data} exams={exams || []} mutateExams={mutateExams} />;
    case 'notes': return <NotesView data={data} section={user.section} />;
    case 'chapters': return <ChaptersView data={data} />;
    case 'timetable': return <TimetableView data={data} />;

    case 'streak': return <StreakCalendarView logs={logs || []} />;
    case 'progress': return <ProgressView data={data} />;
    case 'revision': return <RevisionView data={data} />;
    case 'formulas': return <FormulasView data={data} />;
    case 'videos': return <VideosView data={data} />;
    case 'leaderboard': return <LeaderboardView />;
    case 'achievements': return <AchievementsView />;
    case 'grades': return <GradesView data={data} />;
    case 'goals': return <GoalsViewFull data={data} goals={goals || []} mutateGoals={mutateGoals} />;
    case 'ml': return <MLView data={data} />;
    case 'resources': return <ResourcesView data={data} />;
    case 'assessment': return <AssessmentView data={data} />;
    case 'course': return <CourseView />;
    case 'profile': return <ProfileViewFull data={data} user={user} logs={logs || []} />;
    case 'settings': return <SettingsViewFull darkMode={darkMode} setDarkMode={setDarkMode} data={data} user={user} />;
    
    default: return <DashboardView data={data} user={user} exams={exams || []} setActivePage={setActivePage} />;
  }
}

// ---------------------------------------------------------------------------
// VIEW COMPONENTS
// ---------------------------------------------------------------------------

function DashboardView({ data, user, exams, setActivePage }: any) {
  const mlScore = data.analysis?.[0]?.score || 88;
  const [taskStatus, setTaskStatus] = useState<Record<number, boolean>>({});

  const [customTasks, setCustomTasks] = useState<{name: string; done: boolean}[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const toggleTask = (idx: number) => {
    setTaskStatus(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleCustomTask = (idx: number) => {
    setCustomTasks(prev => prev.map((t, i) => i === idx ? { ...t, done: !t.done } : t));
  };

  const removeCustomTask = (idx: number) => {
    setCustomTasks(prev => prev.filter((_, i) => i !== idx));
  };

  const addCustomTask = () => {
    if (!newTaskText.trim()) return;
    setCustomTasks(prev => [...prev, { name: newTaskText.trim(), done: false }]);
    setNewTaskText('');
    setShowAddTask(false);
  };

  // Compute ML-based subject scores and find the most-needing-attention core subject
  const subjectScores = data.subjects.map((s: string, i: number) => {
    const trueGrade = data.grades[i] || 'B';
    const gradeVal = trueGrade === 'A+' ? 96 : trueGrade === 'A' ? 90 : trueGrade === 'A-' ? 84 : trueGrade === 'B+' ? 78 : trueGrade === 'B' ? 70 : 60;
    const val = Math.max(0, Math.min(100, Math.round(gradeVal + (Math.sin(i * 2) * 3))));
    return { name: s, val };
  });

  // Exclude language subjects from the AI recommendation
  const excludeKeywords = ['kannada', 'hindi', 'english', 'language'];
  const coreSubjects = subjectScores.filter((s: {name: string, val: number}) =>
    !excludeKeywords.some(kw => s.name.toLowerCase().includes(kw))
  );
  // Pick the core subject with the LOWEST ML score (needs most focus)
  const focusedSub = coreSubjects.length > 0
    ? coreSubjects.reduce((min: {name: string, val: number}, s: {name: string, val: number}) => s.val < min.val ? s : min, coreSubjects[0]).name
    : data.subjects[0];

  // Premium Bento Box Card Style
  const bentoCard = {
    background: 'rgba(30, 30, 45, 0.5)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <div style={{ margin: '-1.25rem', padding: '2rem 3rem', minHeight: '100vh', background: 'linear-gradient(135deg, #f6f8fd 0%, #ffffff 100%)', color: '#313a5a', fontFamily: '"Inter", sans-serif', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px'}}>
        <h1 style={{fontSize:'32px', fontWeight:800, letterSpacing:'-0.5px', margin:0, color: '#313a5a'}}>
          Study Planner AI
        </h1>
        <div className="badge" style={{background:'#f0f2fa', color:'#78829d', padding:'8px 16px', borderRadius:'12px', fontWeight:600, border:'1px solid #eef0fa'}}>
          ⚡ Live Sync Active
        </div>
      </div>

      {/* Main Bento Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto auto', gap: '24px' }}>
        
        {/* HERO CARD (Spans 2 columns) */}
        <div style={{...bentoCard, gridColumn: 'span 2', background: '#ffffff', backdropFilter: 'none', borderColor: '#f0f3ff', borderRadius: '24px', boxShadow: '0 12px 30px rgba(133, 145, 178, 0.1), inset 0 0 0 1px #fff'}}>
          <div style={{position:'absolute', top:0, right:0, width:'300px', height:'300px', background:'radial-gradient(circle, rgba(155, 139, 244, 0.1) 0%, transparent 70%)', transform:'translate(30%, -30%)', zIndex:0}}></div>
          <div style={{zIndex:1, padding: '10px'}}>
            <h2 style={{fontSize:'28px', fontWeight:800, marginBottom:'8px', color:'#313a5a'}}>Welcome back, {user?.name.split(' ')[0]}.</h2>
            <p style={{fontSize:'15px', color:'#78829d', maxWidth:'90%', lineHeight:1.6}}>
              You are in the top <strong style={{color:'#9b8bf4'}}>5%</strong> of students in {data.label}. The AI Engine recommends prioritizing <strong style={{color:'#9b8bf4'}}>{focusedSub}</strong> today.
            </p>
            <div style={{display:'flex', gap:'12px', marginTop:'24px'}}>
              <button onClick={() => setActivePage('ai-tutor')} style={{background:'linear-gradient(to right, #6cdbdc, #64a6f7)', color:'#ffffff', border:'none', padding:'12px 24px', borderRadius:'99px', fontWeight:700, fontSize:'14px', cursor:'pointer', boxShadow:'0 8px 20px rgba(100, 166, 247, 0.3)', transition:'transform 0.2s'}}>
                Start AI Session
              </button>
              <button onClick={() => setActivePage('weekly')} style={{background:'linear-gradient(to right, #9da2f9, #c4a9eb)', color:'#ffffff', border:'none', padding:'12px 24px', borderRadius:'99px', fontWeight:700, fontSize:'14px', cursor:'pointer', boxShadow:'0 8px 20px rgba(157, 162, 249, 0.3)', transition:'transform 0.2s'}}>
                View Detailed Planner
              </button>
            </div>
          </div>
        </div>

        {/* ML PERFORMANCE (Spans 1 column) */}
        <div style={{...bentoCard, alignItems:'center', justifyContent:'center', background: '#ffffff', backdropFilter: 'none', borderColor: '#f0f3ff', borderRadius: '24px', boxShadow: '0 12px 30px rgba(133, 145, 178, 0.1)'}}>
           <div style={{fontSize:'14px', fontWeight:700, color:'#313a5a', position:'absolute', left:'24px', top:'24px'}}>AI Study Insights</div>
           <div style={{position:'relative', width:'130px', height:'130px', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'14px'}}>
             <svg width="130" height="130" viewBox="0 0 140 140" style={{transform:'rotate(-90deg)'}}>
               <circle cx="70" cy="70" r="60" fill="none" stroke="#f2f5fd" strokeWidth="14" />
               <circle cx="70" cy="70" r="60" fill="none" stroke="url(#gradient)" strokeWidth="14" strokeDasharray="377" strokeDashoffset={377 - (377 * mlScore) / 100} strokeLinecap="round" style={{transition:'stroke-dashoffset 1s ease-out'}}/>
               <defs>
                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#79bcf7" />
                   <stop offset="100%" stopColor="#c4a9eb" />
                 </linearGradient>
               </defs>
             </svg>
             <div style={{position:'absolute', display:'flex', flexDirection:'column', alignItems:'center'}}>
               <span style={{fontSize:'32px', fontWeight:800, color:'#313a5a'}}>{mlScore}%</span>
               <span style={{fontSize:'10px', color:'#78829d', fontWeight:600}}>Productivity</span>
             </div>
           </div>
           <div style={{fontSize:'13px', color:'#78829d', fontWeight:600, marginTop:'16px', display:'flex', alignItems:'center', gap:'8px'}}>
             <span style={{fontSize:'18px'}}>⭐</span> 8/10 Goals Completed
           </div>
        </div>

        {/* STREAK & FOCUS (Spans 1 column) */}
        <div style={{...bentoCard, justifyContent:'space-between', background: '#ffffff', backdropFilter: 'none', borderColor: '#f0f3ff', borderRadius: '24px', boxShadow: '0 12px 30px rgba(133, 145, 178, 0.1)'}}>
           <div>
             <div style={{fontSize:'14px', fontWeight:700, color:'#313a5a'}}>Focus Timer</div>
             <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'16px'}}>
               <span style={{fontSize:'42px', fontWeight:800, color:'#313a5a'}}>4h 30m</span>
               <span style={{fontSize:'13px', color:'#78829d', fontWeight:500}}>Total Study Time</span>
             </div>
           </div>
           <div>
             <div style={{fontSize:'13px', color:'#78829d', marginBottom:'8px', fontWeight:600}}>Weekly Consistency</div>
             <div style={{display:'flex', gap:'6px'}}>
               {['M','T','W','T','F','S','S'].map((d, i) => (
                 <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px'}}>
                   <div style={{width:'100%', height:'28px', background: i < 5 ? '#a8cbfb' : '#f0f3ff', borderRadius:'8px', opacity: i===4? 1 : i<4? 0.8 : 1, boxShadow: i===4 ? '0 4px 10px rgba(168, 203, 251, 0.5)' : 'none'}}></div>
                   <span style={{fontSize:'10px', color:'#78829d', fontWeight:600}}>{d}</span>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* BOTTOM ROW: Subject Mastery Bars (Spans 2 columns) */}
        <div style={{...bentoCard, gridColumn: 'span 2', background: '#ffffff', backdropFilter: 'none', borderColor: '#f0f3ff', borderRadius: '24px', boxShadow: '0 12px 30px rgba(133, 145, 178, 0.1)'}}>
           <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px'}}>
             <div style={{fontSize:'16px', fontWeight:800, color:'#313a5a'}}>Subject Overview</div>
             <div style={{display:'flex', gap:'4px'}}>
               <div style={{width:'6px',height:'6px', borderRadius:'50%', background:'#dde3f3'}}></div>
               <div style={{width:'6px',height:'6px', borderRadius:'50%', background:'#dde3f3'}}></div>
               <div style={{width:'6px',height:'6px', borderRadius:'50%', background:'#dde3f3'}}></div>
             </div>
           </div>
           <div style={{display:'flex', flexDirection:'column', gap:'20px', maxHeight:'280px', overflowY:'auto', paddingRight:'8px'}} className="no-scrollbar">
             {data.subjects.map((s: string, i: number) => {
               // Use ACTUAL grades from the secmap to anchor the ML prediction value
               const trueGrade = data.grades[i] || 'B';
               const gradeVal = trueGrade === 'A+' ? 96 : trueGrade === 'A' ? 90 : trueGrade === 'A-' ? 84 : trueGrade === 'B+' ? 78 : trueGrade === 'B' ? 70 : 60;
               // Simulate ML inference variance on their baseline performance
               const val = Math.max(0, Math.min(100, Math.round(gradeVal + (Math.sin(i*2) * 3)))); 
               const insight = val >= 90 ? 'Excellent' : val >= 80 ? 'On Track' : 'Needs Focus';
               const insightColor = val >= 90 ? '#10b981' : val >= 80 ? '#3b82f6' : '#f59e0b';
               
               // Cycle through beautiful pastel gradients
               const bgGrad = i % 3 === 0 
                  ? 'linear-gradient(to right, #9da2f9, #fdbfcd)' 
                  : i % 3 === 1 
                  ? 'linear-gradient(to right, #a8cbfb, #d9a7f3)' 
                  : 'linear-gradient(to right, #6cdbdc, #9da2f9)';
               
               return (
                 <div key={i} style={{display:'flex', alignItems:'center', gap:'16px'}}>
                   <div style={{width:'120px'}}>
                     <div style={{fontSize:'14px', fontWeight:600, color:'#78829d', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}} title={s}>{s.split(' ')[0]}</div>
                     <div style={{fontSize:'10px', fontWeight:700, color: insightColor, marginTop:'2px'}}>{insight}</div>
                   </div>
                   <div style={{flex:1, height:'14px', background:'#f0f3ff', borderRadius:'99px', position:'relative', overflow:'hidden'}}>
                     <div style={{position:'absolute', top:0, left:0, height:'100%', width:`${val}%`, background: bgGrad, borderRadius:'99px', transition:'width 1s ease-out'}}></div>
                   </div>
                   <div style={{width:'45px', textAlign:'right'}}>
                     <div style={{fontSize:'14px', fontWeight:700, color:'#313a5a'}}>{val}%</div>
                     <div style={{fontSize:'9px', fontWeight:600, color:'#94a3b8'}}>{trueGrade} Grade</div>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* BOTTOM ROW: Upcoming Exams/Tasks (Spans 2 columns) */}
        <div style={{...bentoCard, gridColumn: 'span 2', background: '#ffffff', backdropFilter: 'none', borderColor: '#f0f3ff', borderRadius: '24px', boxShadow: '0 12px 30px rgba(133, 145, 178, 0.1)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
            <div style={{fontSize:'16px', fontWeight:800, color:'#313a5a'}}>Today's Tasks</div>
            <div style={{fontSize:'12px', color:'#78829d', fontWeight:600}}>{Object.values(taskStatus).filter(Boolean).length + customTasks.filter(t => t.done).length}/{(exams?.length || 0) + customTasks.length} done</div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'10px', flex:1, overflowY:'auto', paddingRight:'4px'}} className="no-scrollbar">
            {/* Exam-based tasks */}
            {exams && exams.length > 0 && exams.slice(0, 3).map((e: any, i: number) => {
              const days = Math.max(0, Math.round((new Date(e.date).getTime() - Date.now()) / 86400000));
              const checked = taskStatus[i] || false;
              return (
                <div key={`exam-${i}`} onClick={() => toggleTask(i)} style={{cursor: 'pointer', display:'flex', alignItems:'center', gap:'12px', padding:'10px 12px', background: checked ? '#f8f7ff' : '#fafafa', borderRadius:'14px', border: '1px solid #f0f3ff', transition:'all 0.2s'}} className="hover-card-lavender">
                  <div style={{width:'22px', height:'22px', borderRadius:'6px', border: checked ? 'none' : '1.5px solid #c8d3ed', background: checked ? '#9b8bf4' : '#ffffff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s'}}>
                    {checked && <span style={{color:'#fff', fontSize:'11px', fontWeight:900}}>✓</span>}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:'13px', fontWeight:600, color: checked ? '#b0abf5' : '#313a5a', textDecoration: checked ? 'line-through' : 'none', transition:'all 0.3s'}}>{e.name}</div>
                  </div>
                  <div style={{fontSize:'11px', color:'#78829d', fontWeight:600, background:'#f0f2fa', padding:'3px 8px', borderRadius:'99px', flexShrink:0}}>{days}d</div>
                </div>
              );
            })}

            {/* Custom user-added tasks */}
            {customTasks.map((t, i) => (
              <div key={`custom-${i}`} style={{display:'flex', alignItems:'center', gap:'12px', padding:'10px 12px', background: t.done ? '#f8f7ff' : '#fafafa', borderRadius:'14px', border: '1px solid #f0f3ff', transition:'all 0.2s'}} className="hover-card-lavender">
                <div onClick={() => toggleCustomTask(i)} style={{cursor:'pointer', width:'22px', height:'22px', borderRadius:'6px', border: t.done ? 'none' : '1.5px solid #c8d3ed', background: t.done ? '#9b8bf4' : '#ffffff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s'}}>
                  {t.done && <span style={{color:'#fff', fontSize:'11px', fontWeight:900}}>✓</span>}
                </div>
                <div style={{flex:1}} onClick={() => toggleCustomTask(i)}>
                  <div style={{fontSize:'13px', fontWeight:600, color: t.done ? '#b0abf5' : '#313a5a', textDecoration: t.done ? 'line-through' : 'none', cursor:'pointer', transition:'all 0.3s'}}>{t.name}</div>
                </div>
                <div style={{fontSize:'11px', color:'#9da2f9', fontWeight:600, background:'#eef0ff', padding:'3px 8px', borderRadius:'99px', flexShrink:0}}>Custom</div>
                <button onClick={() => removeCustomTask(i)} style={{background:'none', border:'none', color:'#c8d3ed', cursor:'pointer', fontSize:'16px', padding:'0 2px', lineHeight:1}} title="Remove task">×</button>
              </div>
            ))}

            {/* Inline Add Task Form */}
            {showAddTask ? (
              <div style={{display:'flex', gap:'8px', alignItems:'center', padding:'8px', background:'#f8f9ff', borderRadius:'14px', border:'1px solid #e8ebff'}}>
                <input
                  autoFocus
                  value={newTaskText}
                  onChange={e => setNewTaskText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addCustomTask(); if (e.key === 'Escape') { setShowAddTask(false); setNewTaskText(''); } }}
                  placeholder="What do you need to do today?"
                  style={{flex:1, border:'none', background:'transparent', fontSize:'13px', color:'#313a5a', fontFamily:'inherit', outline:'none', padding:'4px 8px'}}
                />
                <button onClick={addCustomTask} style={{background:'#9b8bf4', color:'#fff', border:'none', padding:'6px 14px', borderRadius:'8px', fontSize:'12px', fontWeight:700, cursor:'pointer'}}>Add</button>
                <button onClick={() => { setShowAddTask(false); setNewTaskText(''); }} style={{background:'none', border:'1px solid #e2e8f0', color:'#78829d', padding:'6px 10px', borderRadius:'8px', fontSize:'12px', fontWeight:600, cursor:'pointer'}}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setShowAddTask(true)} style={{background:'linear-gradient(to right, #f0f2fa, #eef0ff)', color:'#9b8bf4', border:'1px dashed #c7cbf9', padding:'10px 16px', borderRadius:'12px', fontSize:'13px', fontWeight:700, cursor:'pointer', textAlign:'left', transition:'all 0.2s', display:'flex', alignItems:'center', gap:'8px'}} className="add-task-btn-hover">
                <span style={{fontSize:'16px'}}>＋</span> Add Task
              </button>
            )}
          </div>
        </div>

      </div>
      
      {/* Global Style Injection for specifically this aesthetic (Hover effects) */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-card-lavender:hover {
          background: #f8f9fe !important;
          transform: translateX(4px);
        }
      `}} />
    </div>
  );
}

function WeeklyView({ data, setActivePage }: any) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  // Setup functional local state for the Kanban board
  const [weekData, setWeekData] = useState(data.week);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [syncStatus, setSyncStatus] = useState('sync');
  
  const toggle = (dayIdx: number, taskIdx: number) => {
    const key = `${dayIdx}-${taskIdx}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getSubjIcon = (name: string) => {
    if (name.includes('Math') || name.includes('Calc')) return '📐';
    if (name.includes('Phy')) return '⚛️';
    if (name.includes('Chem')) return '🧪';
    if (name.includes('Sci')) return '🔬';
    if (name.includes('Bio')) return '🧬';
    if (name.includes('Eng')) return '📚';
    if (name.includes('Hist')) return '🏛️';
    if (name.includes('Geo')) return '🌍';
    if (name.includes('Comp') || name.includes('Data')) return '💻';
    if (name.includes('Trade') || name.includes('Stock')) return '📈';
    return '📝';
  };

  const today = new Date();
  const getDayDateText = (offset: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - d.getDay() + 1 + offset);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleAIReschedule = () => {
    setIsRescheduling(true);
    
    // Simulate ML Engine Processing
    setTimeout(() => {
      let currentDayIdx = today.getDay() - 1; 
      if (today.getDay() === 0) currentDayIdx = 6; // Handle Sunday edge case

      // If today is Sunday, we'll just push to next week (or arbitrarily distribute for demo)
      const isEndOfWeek = currentDayIdx === 6;

      const newWeekData = JSON.parse(JSON.stringify(weekData)); // Deep copy
      const tasksToMove: string[] = [];
      const newCheckedItems: Record<string, boolean> = {};

      // 1. Traverse and collect all INCOMPLETE tasks from PAST and CURRENT days
      for (let idx = 0; idx <= currentDayIdx; idx++) {
        const subs = newWeekData[idx][1];
        const remainingSubs: string[] = [];
        
        subs.forEach((sub: string, i: number) => {
           const key = `${idx}-${i}`;
           if (!checkedItems[key]) {
              // Task is incomplete! Extract it.
              // Remove any existing (Auto-Rescheduled) tag to prevent stacking
              tasksToMove.push(sub.replace(' (Auto-Rescheduled)', ''));
           } else {
              // Task completed, keep it where it is
              remainingSubs.push(sub);
              newCheckedItems[`${idx}-${remainingSubs.length - 1}`] = true;
           }
        });
        // Update the day's tasks to ONLY include the tasks that were completed
        newWeekData[idx][1] = remainingSubs;
      }
      
      // Preserve checked state for FUTURE days that weren't touched
      for (let idx = currentDayIdx + 1; idx <= 6; idx++) {
         const subs = newWeekData[idx][1];
         subs.forEach((_: any, i: number) => {
            const oldKey = `${idx}-${i}`;
            if (checkedItems[oldKey]) newCheckedItems[oldKey] = true;
         });
      }

      // 2. Distribute all incomplete tasks fairly to FUTURE days
      if (tasksToMove.length > 0) {
          let distributeIdx = currentDayIdx === 6 ? 0 : currentDayIdx + 1;
          tasksToMove.forEach(task => {
             newWeekData[distributeIdx][1].push(task + ' (Auto-Rescheduled)');
             distributeIdx++;
             if (distributeIdx > 6) distributeIdx = isEndOfWeek ? 0 : currentDayIdx + 1; // Cycle
          });
      }

      setWeekData(newWeekData);
      setCheckedItems(newCheckedItems);
      setIsRescheduling(false);
    }, 1500);
  };

  const handleCalSync = () => {
     setSyncStatus('syncing');
     
     // Simulate Google Calendar OAuth Bridge and API Push
     setTimeout(() => {
        setSyncStatus('synced');
        
        // Reset back to normal after 3 seconds
        setTimeout(() => {
           setSyncStatus('sync');
        }, 3000);
     }, 2000);
  };

  // Calculate generic progress based on current weekData state
  const totalTasks = weekData.reduce((acc: number, val: any) => acc + val[1].length, 0);
  const completedTasks = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div style={{ margin: '-1.25rem', padding: '2rem 3rem', minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: '"Inter", sans-serif', overflowX: 'hidden', boxSizing: 'border-box' }}>
      
      {/* Premium Header */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'24px'}}>
        <div>
           <div style={{fontSize:'10px', fontWeight:800, color:'#4f46e5', textTransform:'uppercase', letterSpacing:'2px', marginBottom:'4px'}}>AI Optimized Flow</div>
           <h1 style={{fontSize:'28px', fontWeight:900, letterSpacing:'-1px', margin:0, color: '#0f172a', lineHeight:1}}>
             {getDayDateText(0)} - {getDayDateText(6)}
           </h1>
        </div>
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
           {/* Weekly Progress Ring */}
           <div style={{display:'flex', alignItems:'center', gap:'10px', background:'#ffffff', padding:'8px 14px', borderRadius:'99px', border:'1px solid #e2e8f0', boxShadow:'0 1px 2px 0 rgba(0,0,0,0.05)'}}>
              <span style={{fontSize:'11px', fontWeight:700, color:'#64748b'}}>Weekly Completion</span>
              <div style={{position:'relative', width:'30px', height:'30px', borderRadius:'50%', background:`conic-gradient(#4f46e5 ${progressPercent}%, #f1f5f9 0)`, display:'flex', alignItems:'center', justifyContent:'center'}}>
                 <div style={{width:'22px', height:'22px', background:'#ffffff', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <span style={{fontSize:'9px', fontWeight:800, color:'#0f172a'}}>{progressPercent}%</span>
                 </div>
              </div>
           </div>
           
           {/* Action Buttons */}
           <button onClick={handleCalSync} disabled={syncStatus !== 'sync'} style={{background: syncStatus === 'synced' ? '#10b981' : '#ffffff', color: syncStatus === 'synced' ? '#ffffff' : '#334155', border: syncStatus === 'synced' ? '1px solid #10b981' : '1px solid #cbd5e1', padding:'8px 14px', borderRadius:'10px', fontSize:'12px', fontWeight:700, cursor: syncStatus !== 'sync' ? 'default' : 'pointer', display:'flex', alignItems:'center', gap:'6px', transition:'all 0.2s', boxShadow:'0 1px 2px 0 rgba(0,0,0,0.05)'}} className={syncStatus === 'sync' ? "premium-hover-light" : ""}>
              {syncStatus === 'syncing' ? (
                <><span className="spin-icon" style={{display:'inline-block'}}>🔄</span> OAuth Bridge...</>
              ) : syncStatus === 'synced' ? (
                <><span>✅</span> Pushed Active Blocks</>
              ) : (
                <><span>📅</span> Sync to GCal</>
              )}
           </button>
           <button onClick={handleAIReschedule} disabled={isRescheduling} style={{background:'#4f46e5', color:'#fff', border:'none', padding:'8px 14px', borderRadius:'10px', fontSize:'12px', fontWeight:700, cursor: isRescheduling ? 'not-allowed' : 'pointer', display:'flex', alignItems:'center', gap:'6px', boxShadow: isRescheduling ? 'none' : '0 4px 6px -1px rgba(79, 70, 229, 0.4)', transition:'all 0.2s', opacity: isRescheduling ? 0.7 : 1}} className="premium-hover-glow-light">
              {isRescheduling ? (
                <>
                  <span className="spin-icon" style={{display:'inline-block'}}>⚙️</span> Optimizing...
                </>
              ) : (
                <>
                  <span>✨</span> Auto-Reschedule
                </>
              )}
           </button>
        </div>
      </div>
      
      {/* Horizontal Kanban Scroller */}
      <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '20px', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="no-scrollbar">
        {weekData.map(([day, subs, cls]: any, idx: number) => {
           const isToday = idx === today.getDay() - 1 || (today.getDay() === 0 && idx === 6);

           return (
             <div key={idx} style={{ flex: '0 0 auto', width: '220px', display: 'flex', flexDirection: 'column', padding: '16px', border: isToday ? '1px solid #c7d2fe' : '1px solid #e2e8f0', background: isToday ? '#eef2ff' : '#ffffff', backdropFilter: 'none', borderRadius: '16px', position: 'relative', boxShadow: isToday ? '0 10px 15px -3px rgba(79, 70, 229, 0.1)' : '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
               
               {/* Day Header */}
               <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
                 <div>
                   <div style={{ fontSize: '18px', marginBottom: '2px', color: '#0f172a', fontWeight:900, letterSpacing:'-0.5px' }}>{day}</div>
                   <div style={{ fontSize: '11px', color: '#64748b', fontWeight:600 }}>{getDayDateText(idx)}</div>
                 </div>
                 {isToday && <div style={{background:'#4f46e5', color:'#fff', fontSize:'9px', fontWeight:800, padding:'3px 6px', borderRadius:'4px', textTransform:'uppercase'}}>Today</div>}
               </div>

               {/* Task Blocks */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                 {subs.map((s: string, i: number) => {
                   const key = `${idx}-${i}`;
                   const isDone = checkedItems[key];
                   
                   // Dynamic Colors (Light Mode)
                   const baseHue = (idx * 30 + i * 45) % 360;
                   const hslColor = `hsl(${baseHue}, 80%, 40%)`;
                   const hslBg = `hsl(${baseHue}, 80%, 94%)`;
                   const hslBorder = `hsl(${baseHue}, 80%, 85%)`;
                   
                   const energyLevel = (idx + i) % 3 === 0 ? 'High Focus' : (idx + i) % 3 === 1 ? 'Deep Work' : 'Light Review';
                   
                   return (
                     <div 
                       key={i} 
                       draggable
                       onClick={() => toggle(idx, i)}
                       style={{ 
                          padding: '10px', 
                          borderRadius: '12px', 
                          cursor: 'grab',
                          opacity: isDone ? 0.4 : 1,
                          textDecoration: isDone ? 'line-through' : 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                          border: isDone ? '1px solid #e2e8f0' : `1px solid ${hslBorder}`,
                          background: isDone ? '#f1f5f9' : '#ffffff',
                          boxShadow: isDone ? 'none' : '0 1px 3px 0 rgba(0,0,0,0.1)'
                       }}
                       className="task-block-hover-light"
                     >
                       {/* Top Row: Icon, Subject, Drag */}
                       <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '4px', border: `2px solid ${isDone ? '#cbd5e1' : hslColor}`, background: isDone ? '#e2e8f0' : hslBg, flexShrink: 0, transition:'all 0.2s' }}>
                             {isDone && <span style={{ color: '#0f172a', fontSize: '10px', fontWeight: 900 }}>✓</span>}
                          </div>
                          <span style={{ fontSize: '14px', flexShrink: 0 }}>{getSubjIcon(s)}</span>
                          <span style={{ flex: 1, textAlign: 'left', lineHeight: 1.2, fontWeight:800, fontSize:'12px', color:'#0f172a', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s}</span>
                          <span style={{opacity:0.2, cursor:'grab', fontSize:'14px', color:'#334155'}}>⋮⋮</span>
                       </div>
                       
                       {/* Expanded Actions Hub */}
                       <div style={{maxHeight: isDone ? '0px' : '100px', overflow:'hidden', transition:'all 0.3s ease', opacity: isDone ? 0 : 1}}>
                          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px'}}>
                             <div style={{fontSize:'8px', padding:'3px 6px', borderRadius:'4px', color:hslColor, background:hslBg, border:`1px solid ${hslBorder}`, fontWeight:800, display:'inline-block'}}>
                               ⚡ {energyLevel}
                             </div>
                             <div style={{fontSize:'9px', color:'#94a3b8', fontWeight:600}}>~1.5h</div>
                          </div>

                          <div style={{display:'flex', gap:'6px'}}>
                             <button onClick={(e) => { e.stopPropagation(); setActivePage('resources'); }} style={{flex:1, background:'#ffffff', border:'1px solid #e2e8f0', borderRadius:'6px', padding:'4px', fontSize:'9px', fontWeight:700, cursor:'pointer', color:'#334155', transition:'all 0.2s', boxShadow:'0 1px 2px 0 rgba(0,0,0,0.05)'}} className="action-btn-light">
                                📚 Notes
                             </button>
                             <button onClick={(e) => { e.stopPropagation(); setActivePage('pomodoro'); }} style={{flex:1, background:hslBg, border:`1px solid ${hslBorder}`, borderRadius:'6px', padding:'4px', fontSize:'9px', fontWeight:700, cursor:'pointer', color:hslColor, transition:'all 0.2s'}} className="action-btn-primary-light">
                                🍅 Timer
                             </button>
                          </div>
                       </div>
                     </div>
                   );
                 })}
                 
                 {/* Add Task Button */}
                 <div style={{padding:'8px', borderRadius:'12px', border:'1px dashed #cbd5e1', color:'#64748b', fontSize:'11px', fontWeight:700, textAlign:'center', cursor:'pointer', transition:'all 0.2s', background:'#ffffff'}} className="add-task-hover-light">
                   + Add Block
                 </div>
               </div>
             </div>
           );
         })}
      </div>
      
      {/* Universal CSS Injection for this page scope */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .premium-hover-light:hover { background: #f8fafc !important; transform: translateY(-2px); }
        .premium-hover-glow-light:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4) !important; }
        .task-block-hover-light:hover { transform: scale(1.02); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05) !important; z-index: 10; position: relative; }
        .action-btn-light:hover { background: #f1f5f9 !important; }
        .action-btn-primary-light:hover { filter: brightness(0.95); }
        .add-task-hover-light:hover { background: #f8fafc !important; color: #0f172a; border-color: #94a3b8; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin-icon { animation: spin 2s linear infinite; }
      `}} />
    </div>
  );
}

function AITutorView({ data }: any) {
  const [subject, setSubject] = useState(data.subjects[0]);
  const [history, setHistory] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput('');
    const newHist = [...history, { role: 'user', content: msg }];
    setHistory(newHist);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, subject, history: newHist.slice(-6) })
      });
      const aiResponse = await res.json();
      if (!res.ok) {
        setHistory(prev => [...prev, { role: 'assistant', content: aiResponse.error || 'API Error. Try again.' }]);
      } else {
        setHistory(prev => [...prev, { role: 'assistant', content: aiResponse.text || 'Empty response.' }]);
      }
    } catch {
      setHistory(prev => [...prev, { role: 'assistant', content: 'Connection error. Try again.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="hero">
        <div className="hero-title">🤖 AI Chat Tutor</div>
        <div className="hero-sub">Ask questions naturally. Context-aware AI for your stream.</div>
      </div>
      <div className="card">
        <div style={{display:'flex',gap:'5px',flexWrap:'wrap',marginBottom:'10px',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
            {data.subjects.map((s: string) => <span key={s} className={`chip ${s===subject?'on':''}`} onClick={()=>setSubject(s)}>{s}</span>)}
          </div>
          <button className="btn" style={{fontSize: '10px', padding: '4px 8px'}} onClick={() => setHistory([])}>Clear Chat</button>
        </div>
      </div>
      <div className="card chat-wrap">
        <div className="chat-messages" style={{paddingRight: '4px'}}>
          {history.length===0 && <div className="msg msg-ai">Hi! I am your AI {subject} tutor. Ask me anything!</div>}
          {history.map((h, i) => (
            <div key={i} className={`msg ${h.role==='user'?'msg-user':'msg-ai'}`}>
              <div dangerouslySetInnerHTML={{__html: (h.content || '').replace(/\n/g, '<br/>')}} />
            </div>
          ))}
          {loading && <div className="msg msg-ai"><div className="typing-indicator"><div className="typing-dot"></div><div className="typing-dot"></div><div className="typing-dot"></div></div></div>}
        </div>
        <div className="chat-input-row" style={{marginTop:'auto'}}>
          <input className="inp" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder={`Ask about ${subject}...`}/>
          <button className="btn btn-primary" onClick={send} disabled={loading}>Send</button>
        </div>
      </div>
    </>
  );
}

function SmartPlanView({ data }: any) {
  const [date, setDate] = useState('');
  const [hrs, setHrs] = useState(3);
  const [weak, setWeak] = useState<string[]>([]);
  const [intensity, setIntensity] = useState('Balanced');
  const [technique, setTechnique] = useState('Spaced Repetition');
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const toggleWeak = (s: string) => {
    if (weak.includes(s)) setWeak(weak.filter(w => w !== s));
    else setWeak([...weak, s]);
  };

  const getBurnoutRisk = () => {
    if (hrs >= 8) return { label: 'High Burnout Risk', color: 'var(--red)' };
    if (hrs >= 5) return { label: 'Moderate Risk', color: 'var(--orange)' };
    return { label: 'Optimal Load', color: 'var(--green)' };
  };

  const burnout = getBurnoutRisk();

  const generate = async () => {
    if (!date) { alert('Please select an exam date first!'); return; }
    setLoading(true);
    setPlan(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const res = await fetch('/api/ai/smart-plan', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ examDate: date, hoursPerDay: hrs, weakSubjects: weak, sectionLabel: data.label, allSubjects: data.subjects, intensity, technique }),
        signal: controller.signal
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Server Error');
      if (result.error) throw new Error(result.error);
      
      setPlan(Array.isArray(result) ? result : []);
    } catch (err: any) {
      console.error("Smart Plan Error:", err);
      if (err.name === 'AbortError') {
        alert("AI is taking too long to think. Please try again or select fewer weak subjects.");
      } else {
        alert("AI Error: " + err.message);
      }
      setPlan([]);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="hero" style={{ flexShrink: 0 }}>
        <div className="hero-title">✨ ML Smart Plan Generator</div>
        <div className="hero-sub">Leverage AI to create a hyper-personalized, dynamically optimized study schedule.</div>
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="two-col" style={{gap: '16px'}}>
          <div className="fg"><label>Exam Date</label><input type="date" className="inp" value={date} onChange={e=>setDate(e.target.value)} /></div>
          <div className="fg">
            <label>Hours/Day: {hrs}</label>
            <input type="range" min="1" max="14" className="inp" style={{padding:0}} value={hrs} onChange={e=>setHrs(Number(e.target.value))} />
            <div style={{fontSize:'11px', marginTop:'6px', color: burnout.color, fontWeight: 700}}>🤖 ML Analysis: {burnout.label}</div>
          </div>
        </div>
        <div className="two-col" style={{gap: '16px'}}>
          <div className="fg">
            <label>ML Optimizer Focus</label>
            <select className="inp" value={intensity} onChange={e=>setIntensity(e.target.value)}>
               <option>Light & Steady</option>
               <option>Balanced</option>
               <option>Deep Focus</option>
               <option>Cram Mode</option>
            </select>
          </div>
          <div className="fg">
            <label>Cognitive Technique</label>
            <select className="inp" value={technique} onChange={e=>setTechnique(e.target.value)}>
               <option>Spaced Repetition</option>
               <option>Pomodoro Technique</option>
               <option>Feynman Technique</option>
               <option>Active Recall</option>
            </select>
          </div>
        </div>
        <div>
          <label style={{fontSize:'12px',color:'var(--text2)', marginBottom:'8px', display:'block'}}>Weak Subjects (AI will prioritize these)</label>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {data.subjects.map((s: string) => <span key={s} className={`chip ${weak.includes(s)?'on':''}`} style={{fontSize:'12px', padding:'6px 12px'}} onClick={()=>toggleWeak(s)}>{s}</span>)}
          </div>
        </div>
        <button className="btn btn-primary" style={{marginTop:'8px', fontSize:'14px', padding:'12px'}} onClick={generate} disabled={loading}>{loading ? 'Generating ML Schedule...' : '✨ Generate AI Plan'}</button>
      </div>

      {plan && plan.length > 0 && (
        <div className="card">
          <div className="card-title" style={{marginBottom:'16px'}}>Generated Study Matrix</div>
          <div style={{display:'grid', gap:'12px'}}>
            {plan.map((d: any, i: number) => (
              <div key={i} className="plan-day-card" style={{ background:'var(--bg2)', padding:'16px', borderRadius:'10px', border:'1px solid var(--border)' }}>
                <div className="plan-day-head" style={{ marginBottom:'12px', fontWeight:700, fontSize:'14px', color:'var(--accent)' }}><span>{d.date || `Day ${d.day}`}</span></div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                  {d.tasks && d.tasks.map((t: any, j: number) => (
                    <div key={j} className="plan-task" style={{ display:'flex', alignItems:'center', gap:'12px', background:'var(--bg)', padding:'10px', borderRadius:'8px' }}>
                      <span className="badge badge-purple" style={{ fontSize:'11px', padding:'4px 8px' }}>{t.subject}</span>
                      <span style={{ fontSize:'13px', flex:1 }}>{t.topic}</span>
                      <span style={{ fontSize:'11px', fontWeight:600, color:'var(--text2)' }}>{t.hours}h</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function QuizView({ data }: any) {
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currIdx, setCurrIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
// Inside QuizView
  const startQuiz = async (sub: string) => {
    try {
      setSubject(sub);
      setLoading(true);
      setQuestions([]);
      setCurrIdx(0);
      setScore(0);
      setFinished(false);
      setSelected(null);
      
      // Aggregate contextual syllabus resources for the LLM
      const contextData = {
        youtube: YT_RESOURCES[sub] || [],
        formulas: FORMULAS[sub] || []
      };

      const res = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ subject: sub, difficulty: 2, contextData })
      });
      
      if (!res.ok) throw new Error('API request failed');
      
      const fetched = await res.json();
      if (fetched.error) throw new Error(fetched.error);
      
      setQuestions(Array.isArray(fetched) ? fetched : []);
    } catch (err) {
      console.error("Quiz Fetch Error:", err);
      alert("AI failed to generate questions. Please try again.");
      setQuestions([]);
      setSubject('');
    } finally {
      setLoading(false);
    }
  };


  const handleSelect = (i: number) => {
    setSelected(i);
    if (i === questions[currIdx].correct) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currIdx + 1 < questions.length) {
      setCurrIdx(prev => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <>
      <div className="hero"><div className="hero-title">🧠 Adaptive Quiz</div><div className="hero-sub">Master your subjects with AI-generated test batches.</div></div>
      <div className="card">
        {!questions.length && !loading && (
          <>
            <div style={{marginBottom:'16px', fontSize:'15px'}}>Select a subject to begin a 5-question test:</div>
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'10px'}}>
              {data.subjects.map((s: string) => <button key={s} className="btn" onClick={()=>startQuiz(s)}>{s}</button>)}
            </div>
          </>
        )}
        
        {loading && <div style={{padding:'40px', textAlign:'center'}}>
           <div className="typing-indicator" style={{display:'inline-flex'}}><div className="typing-dot"></div><div className="typing-dot"></div><div className="typing-dot"></div></div>
           <div style={{marginTop:'16px', fontSize:'13px', color:'var(--text2)'}}>Generating questions from Groq AI...</div>
        </div>}
        
        {questions.length > 0 && !finished && !loading && (() => {
          const quiz = questions[currIdx];
          return (
            <div>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px', color:'var(--text2)', fontSize:'12px'}}>
                <span>Question {currIdx + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>
              <div style={{fontSize:'14px',fontWeight:600,marginBottom:'16px'}}>{quiz.question}</div>
              <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              {quiz.options.map((opt: string, i: number) => {
                let cls = 'quiz-option';
                if (selected !== null) {
                  if (i === quiz.correct) cls += ' correct';
                  else if (i === selected) cls += ' wrong';
                }
                return <button key={i} disabled={selected !== null} className={cls} style={{textAlign:'left', padding:'12px', fontSize:'13px', borderRadius:'6px'}} onClick={() => handleSelect(i)}>{opt}</button>
              })}
              </div>
              {selected !== null && (
                <div style={{marginTop:'16px', padding:'12px', borderRadius:'6px', background:'var(--bg3)', fontSize:'13px', borderLeft:`4px solid ${selected===quiz.correct?'var(--green)':'var(--red)'}`}}>
                  <div style={{fontWeight:700, marginBottom:'6px', color:selected===quiz.correct?'var(--green)':'var(--red)'}}>{selected===quiz.correct?'✅ Correct!':'❌ Incorrect.'}</div>
                  <div style={{color:'var(--text2)', lineHeight:1.3}}>{quiz.explanation}</div>
                  <button className="btn btn-primary" style={{marginTop:'12px', padding:'6px 12px', fontSize:'12px'}} onClick={handleNext}>{currIdx + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}</button>
                </div>
              )}
            </div>
          );
        })()}

        {finished && (() => {
          const wrong = questions.length - score;
          const total = questions.length;
          const greenPercent = (score / total) * 100;
          const dash = (greenPercent * 251) / 100; // 2*PI*40

          return (
            <div style={{textAlign:'center', padding:'20px 0'}}>
              <div style={{position:'relative', width:'160px', height:'160px', margin:'0 auto 24px'}}>
                <svg width="160" height="160" transform="rotate(-90)">
                  <circle cx="80" cy="80" r="40" fill="transparent" stroke="var(--red)" strokeWidth="40" />
                  <circle cx="80" cy="80" r="40" fill="transparent" stroke="var(--green)" strokeWidth="40" 
                    strokeDasharray={`${dash} 251.2`} />
                </svg>
                <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', background:'var(--bg)', width:'60px', height:'60px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', fontWeight:800}}>
                   {Math.round(greenPercent)}%
                </div>
              </div>

              <div style={{fontSize:'22px', fontWeight:700, marginBottom:'8px'}}>Quiz Analysis</div>
              <div style={{fontSize:'14px', color:'var(--text2)', marginBottom:'24px', display:'flex', justifyContent:'center', gap:'20px'}}>
                 <span style={{display:'flex', alignItems:'center', gap:'6px'}}><div style={{width:'10px', height:'10px', borderRadius:'50%', background:'var(--green)'}}></div> {score} Correct</span>
                 <span style={{display:'flex', alignItems:'center', gap:'6px'}}><div style={{width:'10px', height:'10px', borderRadius:'50%', background:'var(--red)'}}></div> {wrong} Incorrect</span>
              </div>
              
              <div style={{background:'var(--bg2)', padding:'12px', borderRadius:'8px', display:'inline-block', marginBottom:'32px', border:'1px solid var(--border)'}}>
                 <span style={{fontSize:'12px', color:'var(--text3)'}}>Performance: </span>
                 <span style={{fontSize:'13px', fontWeight:700, color:greenPercent >= 80 ? 'var(--green)' : greenPercent >= 50 ? 'var(--orange)' : 'var(--red)'}}>
                    {greenPercent >= 80 ? 'Mastery Level' : greenPercent >= 50 ? 'Developing' : 'Review Required'}
                 </span>
              </div>

              <div style={{display:'flex', gap:'12px', justifyContent:'center'}}>
                <button className="btn btn-primary" onClick={() => startQuiz(subject)}>Retake {subject}</button>
                <button className="btn" onClick={() => { setQuestions([]); setFinished(false); }}>Choose Another Subject</button>
              </div>
           </div>
          );
        })()}
      </div>

    </>
  );
}

function PomodoroView({ data, logs, mutateLogs }: any) {
  const [mode, setMode] = useState<'WORK' | 'SHORT' | 'LONG'>('WORK');
  const durations = { WORK: 25 * 60, SHORT: 5 * 60, LONG: 15 * 60 };
  const [timeLeft, setTimeLeft] = useState(durations.WORK);
  const [running, setRunning] = useState(false);
  const [subject, setSubject] = useState(data.subjects[0]);

  useEffect(() => {
    let int: any;
    if (running && timeLeft > 0) {
      int = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && running) {
      setRunning(false);
      const mins = Math.round(durations[mode] / 60);
      fetch('/api/timer', { 
        method: 'POST', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({ subject, durationMinutes: mins, mode }) 
      }).then(() => mutateLogs());
      
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(() => {});
      alert(`${mode} session complete!`);
    }
    return () => clearInterval(int);
  }, [running, timeLeft, mode, subject, mutateLogs]);

  const switchMode = (m: 'WORK' | 'SHORT' | 'LONG') => {
    setMode(m);
    setRunning(false);
    setTimeLeft(durations[m]);
  };

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const progress = (timeLeft / durations[mode]) * 100;

  return (
    <>
      <div className="hero"><div className="hero-title">⏱️ Smart Timer</div><div className="hero-sub">Focus blocks with automated break tracking</div></div>
      <div className="two-col">
        <div className="card" style={{textAlign:'center', position:'relative', overflow:'hidden'}}>
          <div style={{display:'flex', gap:'8px', justifyContent:'center', marginBottom:'24px'}}>
            {(['WORK', 'SHORT', 'LONG'] as const).map(m => (
              <button key={m} className={`btn ${mode === m ? 'btn-primary' : ''}`} style={{fontSize:'10px', padding:'4px 10px'}} onClick={() => switchMode(m)}>
                {m === 'WORK' ? 'Focus' : m === 'SHORT' ? 'Short Break' : 'Long Break'}
              </button>
            ))}
          </div>
          
          <div style={{display:'flex',gap:'5px',flexWrap:'wrap',justifyContent:'center',marginBottom:'24px'}}>
            {data.subjects.map((s: string) => <span key={s} className={`chip ${s===subject?'on':''}`} style={{fontSize:'10px', cursor:'pointer'}} onClick={()=>setSubject(s)}>{s}</span>)}
          </div>

          <div style={{position:'relative', width:'200px', height:'200px', margin:'0 auto 24px'}}>
            <svg width="200" height="200" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="45" fill="none" stroke="var(--bg4)" strokeWidth="4" />
               <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent)" strokeWidth="4" 
                 strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * (100 - progress)) / 100}
                 strokeLinecap="round" transform="rotate(-90 50 50)" style={{transition:'stroke-dashoffset 0.3s ease'}} />
            </svg>
            <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
               <div style={{fontSize:'36px', fontWeight:800, fontFamily:'monospace'}}>{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}</div>
               <div style={{fontSize:'10px', color:'var(--text3)', textTransform:'uppercase', letterSpacing:'1px'}}>{mode}</div>
            </div>
          </div>

          <div className="timer-controls" style={{display:'flex',gap:'12px',justifyContent:'center', position:'relative', zIndex:2}}>
            <button className="btn btn-primary" style={{padding:'10px 30px', borderRadius:'12px'}} onClick={() => setRunning(!running)}>
               {running ? '⏸ Pause' : '▶ Start Focus'}
            </button>
            <button className="btn" style={{padding:'10px 20px', borderRadius:'12px'}} onClick={() => {setRunning(false); setTimeLeft(durations[mode]);}}>
               Reset
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Recent Logs (DB)</div>
          {logs?.slice(0,5).map((l: any) => (
            <div key={l.id} className="log-row">
              <span style={{fontSize:'10px',color:'var(--text2)',minWidth:'70px'}}>{l.date}</span>
              <span style={{flex:1,fontSize:'12px'}}>{l.subject}</span>
              <span className="badge badge-blue">{l.hours}h</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function StudyLogView({ data, logs, mutateLogs }: any) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sub, setSub] = useState(data.subjects[0]);
  const [hrs, setHrs] = useState(2);
  const [loading, setLoading] = useState(false);

  const add = async () => {
    setLoading(true);
    await fetch('/api/study-log', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ date, subject: sub, hours: hrs }) });
    mutateLogs();
    setLoading(false);
  };

  const del = async (id: string) => {
    if (!confirm('Permanently remove this study session?')) return;
    await fetch(`/api/study-log?id=${id}`, { method: 'DELETE' });
    mutateLogs();
  };

  const sessions = logs?.length || 0;
  const totalHrs = logs?.reduce((a:number, l:any)=>a+l.hours, 0) || 0;
  
  // Calculate average hours per day to show student "Consistency"
  const distinctDays = new Set(logs?.map((l:any) => l.date)).size || 1;
  const consistency = (totalHrs / distinctDays).toFixed(1);

  return (
    <>
      <div className="hero" style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '16px', marginBottom: '16px', border: '1px solid #f0f4ff', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="hero-title" style={{ fontSize: '18px', fontWeight: 800, color: '#1e1b4b' }}>📊 Study Momentum</div>
            <div className="hero-sub" style={{ fontSize: '11px', color: '#64748b' }}>Chronological tracking of academic effort.</div>
          </div>
          <div className="badge" style={{ background: '#eef2ff', color: '#6366f1', fontSize: '11px', padding: '4px 10px', fontWeight: 700 }}>Total {totalHrs.toFixed(1)}h</div>
        </div>
      </div>

      <div className="four-col" style={{ marginBottom: '16px', gap: '12px' }}>
        {[
          { label: 'Volume', value: `${totalHrs.toFixed(1)}h`, icon: '📈' },
          { label: 'Sessions', value: sessions, icon: '🔥' },
          { label: 'Efficiency', value: `${consistency}h`, icon: '⚡' },
          { label: 'Sync', value: 'Live', icon: '📡' }
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: '12px', border: '1px solid #f0f4ff', background: '#ffffff', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>{s.icon}</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e1b4b' }}>{s.value}</div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="two-col" style={{ gridTemplateColumns: '300px 1fr', gap: '16px', alignItems: 'flex-start' }}>
        
        {/* ADD LOG FORM */}
        <div className="card" style={{ padding: '16px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div className="card-title" style={{ fontSize: '13px', color: '#1e1b4b', marginBottom: '12px' }}>Log New Session</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="fg">
              <label style={{ fontSize: '10px' }}>Study Date</label>
              <input type="date" className="inp" style={{ height: '32px', fontSize: '12px' }} value={date} onChange={e => setDate(e.target.value)} />
            </div>

            <div className="fg">
              <label style={{ fontSize: '10px' }}>Focus Area</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {data.subjects.map((s: string) => (
                  <div key={s} 
                    onClick={() => setSub(s)}
                    className={`chip ${sub === s ? 'on' : ''}`}
                    style={{ fontSize: '10px', cursor: 'pointer', padding: '4px 8px' }}
                  >
                    {s.split(' ')[0]}
                  </div>
                ))}
              </div>
            </div>

            <div className="fg">
              <label style={{ fontSize: '10px' }}>Duration: <strong>{hrs}h</strong></label>
              <input type="range" min={0.5} max={8} step={0.5} value={hrs} onChange={e => setHrs(parseFloat(e.target.value))} style={{ accentColor: '#6366f1', height: '3px' }} />
            </div>

            <button className="btn btn-primary" onClick={add} disabled={loading} style={{ width: '100%', padding: '10px', borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}>
              {loading ? 'Logging...' : 'Submit Focus Log'}
            </button>
          </div>
        </div>

        {/* LOG HISTORY */}
        <div className="card" style={{ padding: '16px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div className="card-title" style={{ fontSize: '13px' }}>Recent Activity</div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>{logs?.length || 0} sessions total</div>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }} className="no-scrollbar">
             {logs?.length === 0 && <div style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#94a3b8' }}>No logs yet.</div>}
             {logs?.map((l: any) => (
               <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f8faff', borderRadius: '12px', border: '1px solid #edf2f7' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', border: '1px solid #e2e8f0' }}>
                    {l.hours >= 4 ? '💎' : l.hours >= 2 ? '⏳' : '📝'}
                  </div>
                  <div style={{ flex: 1 }}>
                     <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e1b4b' }}>{l.subject}</div>
                     <div style={{ fontSize: '10px', color: '#64748b' }}>{new Date(l.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <div style={{ fontSize: '13px', fontWeight: 800, color: '#1e1b4b' }}>+{l.hours}h</div>
                     <button onClick={() => del(l.id)} style={{ fontSize: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', opacity: 0.3 }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.3'}>×</button>
                  </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </>
  );
}

function ExamsView({ data, exams, mutateExams }: any) {
  const [name, setName] = useState('');
  const [sub, setSub] = useState('Mathematics');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const add = async () => {
    if(!name || !date) return;
    setLoading(true);
    await fetch('/api/exams', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, subject: sub, date }) });
    mutateExams();
    setLoading(false);
  };

  const sorted = [...(exams || [])].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const next = sorted[0];

  const getDays = (d: string) => {
    const diff = new Date(d).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      <div className="hero">
        <div className="hero-title">📆 Exam Command Center</div>
        <div className="hero-sub">Mission-critical deadlines and countdown tracking</div>
      </div>

      {next && (
        <div className="card" style={{background:'linear-gradient(135deg, var(--bg3), var(--bg2))', border:'1px solid var(--accent)', position:'relative', overflow:'hidden'}}>
           <div style={{position:'absolute', top:'-20px', right:'-20px', fontSize:'120px', opacity:0.05, pointerEvents:'none'}}>⏱️</div>
           <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                 <div style={{fontSize:'12px', color:'var(--accent)', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px'}}>Up Next</div>
                 <div style={{fontSize:'28px', fontWeight:800}}>{next.name}</div>
                 <div style={{fontSize:'14px', color:'var(--text3)'}}>{next.subject} • {next.date}</div>
              </div>
              <div style={{textAlign:'right'}}>
                 <div style={{fontSize:'32px', fontWeight:900, color:'var(--orange)'}}>{getDays(next.date)}</div>
                 <div style={{fontSize:'10px', color:'var(--text3)', textTransform:'uppercase'}}>Days Remaining</div>
              </div>
           </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">Schedule New Deadline</div>
        <div style={{display:'flex', gap:'10px', flexWrap:'wrap'}}>
          <div className="fg" style={{flex:1, minWidth:'180px'}}><input type="text" className="inp" placeholder="Exam Name (e.g. Unit Test 1)" value={name} onChange={e=>setName(e.target.value)}/></div>
          <div className="fg" style={{flex:1, minWidth:'140px'}}>
             <select className="inp" value={sub} onChange={e=>setSub(e.target.value)}>
                {data.subjects.map((s:string)=><option key={s}>{s}</option>)}
             </select>
          </div>
          <div className="fg" style={{flex:1, minWidth:'140px'}}><input type="date" className="inp" value={date} onChange={e=>setDate(e.target.value)}/></div>
          <button className="btn btn-primary" style={{padding:'0 25px'}} onClick={add} disabled={loading}>{loading ? '...' : '+ Add'}</button>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Deadline Board</div>
        {(!exams || exams.length === 0) && <div style={{padding:'20px', textAlign:'center', color:'var(--text3)', fontSize:'12px'}}>No exams scheduled yet. Add one to start the countdown!</div>}
        <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          {sorted.map((e: any) => {
            const days = getDays(e.date);
            const urgent = days < 5;
            const critical = days < 2;
            const color = critical ? 'var(--red)' : urgent ? 'var(--orange)' : 'var(--green)';
            
            return (
              <div key={e.id} style={{padding:'16px', background:'var(--bg2)', borderRadius:'12px', border:`1px solid ${urgent ? color : 'var(--border)'}`, display:'flex', alignItems:'center', gap:'15px'}}>
                <div style={{width:'42px', height:'42px', borderRadius:'10px', background:color, opacity:0.1, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px'}}>
                  {critical ? '🚨' : urgent ? '⚠️' : '📅'}
                </div>
                <div style={{flex:1}}>
                   <div style={{fontSize:'15px', fontWeight:700}}>{e.name}</div>
                   <div style={{fontSize:'12px', color:'var(--text3)'}}>{e.subject} • {e.date}</div>
                </div>
                <div style={{textAlign:'right'}}>
                   <div style={{fontSize:'18px', fontWeight:800, color:color}}>{days}d</div>
                   <div style={{fontSize:'9px', color:'var(--text3)', textTransform:'uppercase'}}>{critical ? 'Critical' : urgent ? 'Urgent' : 'Safe'}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}


function NotesView({ data, section }: any) {
  const { data: cards, mutate } = useSWR(`/api/flashcards?section=${section}`, fetcher);
  const [q, setQ] = useState('');
  const [a, setA] = useState('');

  const add = async () => {
    if(!q||!a) return;
    await fetch('/api/flashcards', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ question: q, answer: a, section }) });
    setQ(''); setA(''); mutate();
  };

  return (
    <>
      <div className="hero"><div className="hero-title">📝 Flashcards</div></div>
      <div className="card">
        <input className="inp" placeholder="Question..." value={q} onChange={e=>setQ(e.target.value)} style={{marginBottom:6}}/>
        <input className="inp" placeholder="Answer..." value={a} onChange={e=>setA(e.target.value)}/>
        <button className="btn btn-primary" style={{marginTop:8}} onClick={add}>Add Card</button>
      </div>
      <div className="card" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
        {cards?.map((c: any) => (
          <div key={c.id} className="flashcard" onClick={(e) => {
            const el = e.currentTarget;
            if(el.style.transform === 'rotateY(180deg)') el.style.transform = 'rotateY(0deg)';
            else el.style.transform = 'rotateY(180deg)';
          }} style={{transition:'transform 0.4s',transformStyle:'preserve-3d',cursor:'pointer'}}>
            <div style={{position:'absolute',backfaceVisibility:'hidden',width:'100%',textAlign:'center',padding:'15px'}}>{c.question}</div>
            <div style={{position:'absolute',backfaceVisibility:'hidden',width:'100%',textAlign:'center',padding:'15px',transform:'rotateY(180deg)',color:'var(--accent)'}}>{c.answer}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ChaptersView({ data }: any) {
  const { data: chaps, mutate } = useSWR('/api/chapters', fetcher);
  const { data: tt } = useSWR('/api/timetable', fetcher);
  
  const cycle = async (sub: string, num: number, currentStatus: string) => {
    const next = currentStatus === 'DONE' ? 'NOT_STARTED' : currentStatus === 'IN_PROGRESS' ? 'DONE' : 'IN_PROGRESS';
    await fetch('/api/chapters', { method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ subject: sub, chapterNumber: num, status: next }) });
    mutate();
  };

  return (
    <>
      <div className="hero" style={{padding:'16px 20px', background:'linear-gradient(135deg, #1e1b4b, #111827)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div className="hero-title" style={{fontSize:'18px'}}>✅ Smart Checklist</div>
            <div className="hero-sub" style={{fontSize:'11px'}}>Syllabus tracking synchronized with your AI Timetable.</div>
          </div>
          <div className="badge badge-blue">Auto-Sync Active</div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'12px', marginTop:'20px'}}>
        {data.subjects.map((sub: string) => {
          const subChapters = CHAPTERS[sub] || ['Introduction', 'Concepts', 'Summary'];
          const doneCount = chaps?.filter((c:any)=>c.subject===sub && c.status==='DONE').length || 0;
          return (
            <div className="card" key={sub} style={{padding:'15px', display:'flex', flexDirection:'column'}}>
               <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px', paddingBottom:'8px', borderBottom:'1px solid var(--border)'}}>
                  <div style={{fontSize:'13px', fontWeight:800, color:'var(--accent)'}}>{sub}</div>
                  <div style={{fontSize:'10px', fontWeight:700, opacity:0.6}}>{doneCount}/{subChapters.length}</div>
               </div>

               <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                  {subChapters.map((name, i) => {
                    const num = i + 1;
                    const dbEntry = chaps?.find((c:any)=>c.subject===sub && c.chapterNumber===num);
                    const dbStatus = dbEntry?.status || 'NOT_STARTED';
                    
                    const isInTimetable = tt?.some((t:any) => t.subject === sub);
                    const finalStatus = (dbStatus === 'NOT_STARTED' && isInTimetable) ? 'IN_PROGRESS' : dbStatus;

                    return (
                      <div key={num} onClick={()=>cycle(sub, num, finalStatus)} style={{
                        display:'flex', alignItems:'center', gap:'8px', padding:'6px 10px', 
                        borderRadius:'6px', background: finalStatus==='DONE' ? 'var(--bg3)' : 'var(--bg2)',
                        transition:'all 0.2s', border:'1px solid transparent', cursor:'pointer',
                        borderColor: finalStatus==='IN_PROGRESS' ? 'var(--accent)33' : 'transparent'
                      }}>
                        <div style={{
                          width:'18px', height:'18px', borderRadius:'4px', 
                          border:'1.5px solid', borderColor: finalStatus==='DONE' ? 'var(--green)' : finalStatus==='IN_PROGRESS' ? 'var(--accent)' : 'var(--border)',
                          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px',
                          background: finalStatus==='DONE' ? 'var(--green)22' : 'transparent'
                        }}>
                          {finalStatus==='DONE' ? '✓' : finalStatus==='IN_PROGRESS' ? '⏳' : ''}
                        </div>
                        
                        <div style={{
                          fontSize:'11px', fontWeight: finalStatus==='DONE' ? 500 : 600, flex: 1,
                          color: finalStatus==='DONE' ? 'var(--text3)' : 'var(--text)',
                          textDecoration: finalStatus==='DONE' ? 'line-through' : 'none'
                        }}>{name}</div>
                      </div>
                    );
                  })}
               </div>
            </div>
          );
        })}
      </div>
    </>
  );
}




function TimetableView({ data }: any) {
  const { data: tt, mutate } = useSWR('/api/timetable', fetcher);
  const [sel, setSel] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const assign = async (subj: string) => {
    if(!sel) return;
    await fetch('/api/timetable', { method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ dayIndex: sel.d, slotIndex: sel.s, subject: subj }) });
    mutate();
    setSel(null);
  }

  const aiFill = async () => {
    setLoading(true);
    try {
      const gRes = await fetch('/api/ai/timetable-gen', { 
        method: 'POST', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({ subjects: data.subjects, slotsCount: 5 }) 
      });
      const entries = await gRes.json();
      if (entries.error) throw new Error(entries.error);

      await fetch('/api/timetable', { 
        method: 'POST', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({ entries, clearAll: true }) 
      });
      mutate();
    } catch (e: any) {
      alert("AI Failed: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  const clear = async () => {
    if(!confirm("Clear full timetable?")) return;
    await fetch('/api/timetable', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ clearAll: true }) });
    mutate();
  }

  return (
    <>
      <div className="hero">
        <div className="hero-title">🗓️ Timetable Builder</div>
        <div className="hero-sub">Construct your weekly routine with AI optimization</div>
      </div>

      <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
        <button className="btn btn-primary" onClick={aiFill} disabled={loading}>{loading ? '🤖 AI Thinking...' : '✨ AI Auto-Fill'}</button>
        <button className="btn" style={{borderColor:'var(--red)', color:'var(--red)'}} onClick={clear}>🗑️ Clear All</button>
      </div>

      <div className="card" style={{overflowX:'auto', padding:'24px'}}>
        <div className="tt-grid" style={{minWidth:'700px'}}>
          <div className="tt-head">TIME</div>
          {['Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div key={d} className="tt-head">{d}</div>)}
          
          {['8 AM','10 AM','12 PM','2 PM','4 PM'].map((slot, s) => (
            <React.Fragment key={slot}>
              <div className="tt-time">{slot}</div>
              {[0,1,2,3,4,5].map(d => {
                const cell = tt?.find((c:any) => c.dayIndex===d && c.slotIndex===s);
                const isSel = sel?.d===d && sel?.s===s;
                const clr = cell?.subject ? '#6C8EF5' : 'transparent';
                return (
                  <div key={d} className="tt-cell" 
                    style={{
                      outline:isSel?'2px solid var(--accent)':'',
                      background: cell?.subject ? 'var(--bg3)' : 'transparent',
                      border: '1px solid var(--border)',
                      fontSize: '11px', fontWeight: 600,
                      height: '50px', display: 'flex', alignItems:'center', justifyContent:'center',
                      borderRadius: '4px', cursor:'pointer'
                    }} 
                    onClick={()=>setSel({d,s})}>
                    {cell?.subject || '+'}
                  </div>
                )
               })}
            </React.Fragment>
          ))}
        </div>
      </div>
      {sel && (
        <div className="card" style={{marginTop:'20px', animation:'slideIn 0.3s'}}>
          <div className="card-title">Assign Subject to Slot</div>
          <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
            {data.subjects.map((sub:string)=><button key={sub} className="chip on" onClick={()=>assign(sub)}>{sub}</button>)}
            <button className="chip" style={{background:'var(--red)'}} onClick={()=>assign('')}>Remove</button>
            <button className="chip" onClick={()=>setSel(null)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}



function StreakCalendarView({ logs }: { logs: any[] }) {
  const hoursMap: Record<string, number> = {};
  for (const log of logs) {
    hoursMap[log.date] = (hoursMap[log.date] || 0) + (log.hours || 0);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days: Date[] = [];
  // Use 1 year of data (365 days)
  for (let i = 364; i >= 0; i--) {
     const d = new Date(today);
     d.setDate(today.getDate() - i);
     days.push(d);
  }

  const fmt = (d: Date) => d.toISOString().split('T')[0];
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Group by week (Sunday start)
  const grid: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = [];
  
  // Align first day to its weekday (0=Sun, 1=Mon...)
  const firstDay = days[0];
  for (let i = 0; i < firstDay.getDay(); i++) currentWeek.push(null);

  days.forEach(d => {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      grid.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    grid.push(currentWeek);
  }

  const getLevel = (date: Date | null) => {
    if (!date) return -1;
    const h = hoursMap[fmt(date)] || 0;
    if (h === 0) return 0;
    if (h < 1) return 1;
    if (h < 2) return 2;
    if (h < 4) return 3;
    return 4;
  };

  const getLevelColor = (lvl: number) => {
    if (lvl === -1) return 'transparent';
    if (lvl === 0) return 'var(--bg4)';
    if (lvl === 1) return '#9be9a8';
    if (lvl === 2) return '#40c463';
    if (lvl === 3) return '#30a14e';
    return '#216e39';
  };

  const totalHours = logs.reduce((a, l) => a + (l.hours || 0), 0);
  const activeDays = new Set(logs.map(l => l.date)).size;

  return (
    <>
      <div className="hero">
        <div className="hero-title">🔥 Consistency Map</div>
        <div className="hero-sub">Visualizing your study contributions over the last year</div>
      </div>

      <div className="four-col" style={{gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', marginBottom:'20px'}}>
        <div className="stat-card">
          <div className="stat-label">Total Volume</div>
          <div className="stat-value">{totalHours}h</div>
          <div style={{fontSize:'10px', color:'var(--text3)'}}>Learning hours logged</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Days</div>
          <div className="stat-value">{activeDays}</div>
          <div style={{fontSize:'10px', color:'var(--text3)'}}>Days with focus sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Max Streak</div>
          <div className="stat-value" style={{color:'var(--orange)'}}>14 Days</div>
          <div style={{fontSize:'10px', color:'var(--text3)'}}>Consistency record</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg/Week</div>
          <div className="stat-value" style={{color:'var(--accent)'}}>{(totalHours/52).toFixed(1)}h</div>
          <div style={{fontSize:'10px', color:'var(--text3)'}}>Weekly intensity balance</div>
        </div>
      </div>

      <div className="card" style={{overflowX: 'auto', padding: '32px 24px'}}>
        <div style={{minWidth: '780px', margin: '0 auto'}}>
          <div style={{display:'flex', gap:'3px', justifyContent:'center'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'3px', justifyContent:'space-around', fontSize:'9px', color:'var(--text3)', marginRight:'8px', paddingTop:'20px'}}>
               <span>Mon</span><span>Wed</span><span>Fri</span>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
              {/* Month Labels */}
              <div style={{display:'flex', fontSize:'10px', color:'var(--text3)', marginBottom:'4px'}}>
                 {grid.map((week, wi) => {
                   const first = week.find(d => d !== null);
                   if (first && first.getDate() <= 7) {
                     return <div key={wi} style={{width:'11px', marginRight:'3px'}}>{MONTHS[first.getMonth()]}</div>
                   }
                   return <div key={wi} style={{width:'11px', marginRight:'3px'}}></div>
                 })}
              </div>
              {/* The Grid */}
              <div style={{display:'flex', gap:'3px'}}>
                {grid.map((week, wi) => (
                  <div key={wi} style={{display:'flex', flexDirection:'column', gap:'3px'}}>
                    {week.map((day, di) => {
                      const lvl = getLevel(day);
                      return (
                        <div 
                          key={di} 
                          title={day ? `${fmt(day)}: ${hoursMap[fmt(day)] || 0}h study` : ''}
                          className="contribution-cell"
                          style={{
                            width:'11px', height:'11px', borderRadius:'2px',
                            background: getLevelColor(lvl),
                            transition: 'all 0.2s',
                            cursor: day ? 'pointer' : 'default'
                          }}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{display:'flex', justifyContent:'flex-end', marginTop:'16px', alignItems:'center', gap:'8px', fontSize:'10px', color:'var(--text3)'}}>
            <span>Less</span>
            {[0,1,2,3,4].map(l => <div key={l} style={{width:'10px', height:'10px', borderRadius:'2px', background:getLevelColor(l)}}></div>)}
            <span>More</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Activity Feed</div>
        {logs.length === 0 && <div style={{fontSize:'12px',color:'var(--text2)', padding:'10px'}}>No study sessions logged yet. Start studying to build your streak! 🚀</div>}
        <div style={{maxHeight:'300px', overflowY:'auto'}}>
          {logs.slice().reverse().map((l: any, i: number) => (
            <div key={i} className="log-row" style={{borderBottom:'1px solid var(--border)', padding:'12px 0'}}>
              <div style={{display:'flex', alignItems:'center', gap:'12px', width:'100%'}}>
                <div style={{width:'32px', height:'32px', borderRadius:'50%', background:'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px'}}>🔥</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:'13px', fontWeight:600}}>{l.subject} Session</div>
                  <div style={{fontSize:'11px', color:'var(--text3)'}}>{l.date}</div>
                </div>
                <div style={{textAlign:'right'}}>
                   <div className="badge badge-blue" style={{fontSize:'12px'}}>+{l.hours}h</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Adding missing React namespace for React.Fragment mapping
import React from 'react';
