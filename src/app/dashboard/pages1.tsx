'use client';
import { GRADE_MAP, FORMULAS, YT_RESOURCES, ACHIEVEMENTS, LEADERBOARD, TRADECOURSES } from '@/lib/secmap';
import { useState, useEffect } from 'react';

// ── PROGRESS CHARTS ──
export function ProgressView({ data }: any) {
  const SUB_COLORS = ['#6C8EF5', '#F472B6', '#4ADE80', '#FB923C', '#A78BFA', '#2DD4BF'];

  return (
    <>
      <div className="hero"><div className="hero-title">📈 Analytics Intelligence</div><div className="hero-sub">Data-driven performance insights & momentum tracking</div></div>
      
      <div className="two-col" style={{gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
        <div className="card" style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          <div className="card-title" style={{display:'flex', justifyContent:'space-between'}}>
            <span>Goal Convergence</span>
            <span style={{fontSize:'10px', color:'var(--text3)'}}>Current vs Target</span>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'16px', flex:1, padding:'10px 0'}}>
            {data.subjects.map((s: string, i: number) => {
              const cur = GRADE_MAP[data.grades[i]] || 7;
              const tgt = GRADE_MAP[data.targets[i]] || 9;
              const clr = SUB_COLORS[i % SUB_COLORS.length];
              return (
                <div key={i}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', marginBottom:'6px'}}>
                    <span style={{fontWeight:600}}>{s}</span>
                    <span style={{fontSize:'10px', color:'var(--text3)'}}>{data.grades[i]} <span style={{color:clr}}>→</span> {data.targets[i]}</span>
                  </div>
                  <div style={{height:'12px', background:'var(--bg3)', borderRadius:'6px', overflow:'hidden', position:'relative'}}>
                    <div style={{position:'absolute', left:0, top:0, height:'100%', width:`${tgt * 10}%`, background:clr, opacity:0.15, borderRadius:'6px'}}></div>
                    <div style={{position:'absolute', left:0, top:0, height:'100%', width:`${cur * 10}%`, background:`linear-gradient(90deg, ${clr}, ${clr}aa)`, borderRadius:'6px', boxShadow:`0 0 10px ${clr}44`}}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card" style={{display:'flex', flexDirection:'column'}}>
          <div className="card-title">Weekly Momentum</div>
          <div style={{display:'flex', alignItems:'flex-end', gap:'10px', height:'160px', padding:'20px 10px', background:'var(--bg2)', borderRadius:'12px', marginTop:'10px', border:'1px solid var(--border)'}}>
            {[18, 22, 25, 20, 28, 34, 31].map((h, i) => (
              <div key={i} style={{flex:1, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center', gap:'8px'}}>
                <div style={{position:'relative', width:'100%', height:`${(h/40)*100}%`, background:i===5?'var(--accent)':'var(--bg4)', borderRadius:'4px', transition:'all 0.3s'}}>
                  {i===5 && <div style={{position:'absolute', top:'-25px', left:'50%', transform:'translateX(-50%)', fontSize:'10px', fontWeight:700, color:'var(--accent)'}}>{h}h</div>}
                </div>
                <div style={{fontSize:'10px', color:'var(--text3)', fontWeight:500}}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:'auto', padding:'15px 0 0'}}>
             <div style={{fontSize:'12px', fontWeight:600}}>Learning Velocity</div>
             <div style={{fontSize:'10px', color:'var(--text3)'}}>Your study consistency has increased by <span style={{color:'var(--green)'}}>12.4%</span> this week.</div>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:'20px'}}>
        <div className="card-title">Subject Mastery Matrix</div>
        <div className="four-col" style={{gap:'12px', marginTop:'10px'}}>
          {data.subjects.slice(0,4).map((s: string, i: number) => {
            const clr = SUB_COLORS[i % SUB_COLORS.length];
            return (
              <div key={i} style={{background:'var(--bg2)', padding:'15px', borderRadius:'12px', border:`1px solid ${clr}33`, textAlign:'center', borderTop:`3px solid ${clr}`}}>
                 <div style={{fontSize:'11px', color:clr, fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'10px'}}>{s}</div>
                 <div style={{fontSize:'24px', fontWeight:800, color:'var(--text)'}}>{Math.round(65 + Math.random()*30)}%</div>
                 <div style={{fontSize:'10px', marginTop:'5px', color:'var(--green)', fontWeight:600}}>+2.4% this month</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}



// ── REVISION PLANNER ──
export function RevisionView({ data }: any) {
  const today = new Date();
  const stages = [1, 3, 7, 14, 21];
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (si: number, stageIdx: number) => {
    const key = `${si}-${stageIdx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <div className="hero" style={{padding:'24px', background:'#ffffff', borderRadius:'24px', border:'1px solid #f0f4ff', boxShadow:'0 10px 30px rgba(108, 142, 245, 0.05)', marginBottom:'15px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div className="hero-title" style={{fontSize:'22px', fontWeight:800, color:'#1e1b4b'}}>🧠 Revision Strategist</div>
            <div className="hero-sub" style={{fontSize:'12px', color:'#7c7e96'}}>AI-optimized Spaced Repetition Timeline</div>
          </div>
          <div style={{display:'flex', gap:'12px'}}>
             <button className="btn" style={{padding:'8px 16px', fontSize:'11px', background:'#f8faff', border:'1px solid #eef2ff', color:'#6366f1', fontWeight:700}} onClick={()=>setChecked({})}>Reset Progress</button>
             <div className="badge" style={{background:'#eef2ff', color:'#6366f1', border:'none', padding:'6px 12px', fontWeight:700, borderRadius:'8px'}}>Adaptive Cycle</div>
          </div>
        </div>
      </div>

      <div className="card" style={{padding:'12px', marginTop:'15px'}}>
        <div style={{display:'grid', gridTemplateColumns:'120px 1fr', gap:'20px', alignItems:'center', borderBottom:'1px solid var(--border)', paddingBottom:'8px', marginBottom:'8px'}}>
           <div style={{fontSize:'10px', color:'var(--text3)', fontWeight:800}}>SUBJECT</div>
           <div style={{display:'flex', justifyContent:'space-between', padding:'0 15px'}}>
              {stages.map(d=><div key={d} style={{fontSize:'10px', color:'var(--text3)', fontWeight:800, width:'60px', textAlign:'center'}}>DAY {d}</div>)}
           </div>
        </div>

        {data.subjects.map((s: string, si: number) => (
          <div key={si} style={{display:'grid', gridTemplateColumns:'120px 1fr', gap:'20px', alignItems:'center', padding:'12px 0', borderBottom:si<data.subjects.length-1?'1px solid var(--border)':'none'}}>
             <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <div style={{width:'24px', height:'24px', borderRadius:'6px', background:'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px'}}>📚</div>
                <div style={{fontSize:'13px', fontWeight:600}}>{s}</div>
             </div>
             
             <div style={{display:'flex', justifyContent:'space-between', position:'relative', padding:'0 15px'}}>
                <div style={{position:'absolute', top:'50%', left:'30px', right:'30px', height:'2px', background:'var(--bg4)', zIndex:0}}></div>
                {stages.map((d, i) => {
                  const date = new Date(today.getTime() + d * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
                  const isDone = checked[`${si}-${i}`];
                  return (
                    <div key={i} onClick={() => toggle(si, i)} style={{zIndex:1, textAlign:'center', width:'60px', cursor:'pointer'}}>
                       <div style={{
                         width:'14px', height:'14px', borderRadius:'50%', 
                         background: isDone ? 'var(--accent)' : 'var(--bg4)',
                         border: isDone ? '3px solid var(--bg)' : '1px solid var(--border)',
                         margin: '0 auto 6px', 
                         boxShadow: isDone ? '0 0 12px var(--accent)' : 'none',
                         transition:'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                         transform: isDone ? 'scale(1.2)' : 'scale(1)'
                       }}></div>
                       <div style={{fontSize:'9px', color:isDone ? 'var(--text)' : 'var(--text3)', fontWeight:isDone ? 700 : 400, transition:'color 0.3s'}}>{date}</div>
                    </div>
                  );
                })}
             </div>
          </div>
        ))}
      </div>

      <div style={{textAlign:'center', marginTop:'15px', color:'var(--text3)', fontSize:'10px'}}>
         👆 <strong>Click any dot</strong> to mark a revision stage as complete. The AI will recalculate mastery in real-time.
      </div>
    </>
  );
}




// ── FORMULA SHEET ──
export function FormulasView({ data }: any) {
  const subjects = Object.keys(FORMULAS);
  const [activeSub, setActiveSub] = useState(subjects[0] || '');
  
  // Get chapters for current sub
  const chapters = activeSub ? Object.keys(FORMULAS[activeSub] || {}) : [];
  const [activeChap, setActiveChap] = useState(chapters[0] || '');

  // Safety sync when subjects change (e.g. on mount or state change)
  useEffect(() => {
    if (subjects.length > 0 && !activeSub) {
      setActiveSub(subjects[0]);
    }
  }, [subjects]);

  // Sync chapters when subject changes
  useEffect(() => {
    const newChaps = activeSub ? Object.keys(FORMULAS[activeSub] || {}) : [];
    if (newChaps.length > 0) {
      if (!newChaps.includes(activeChap)) setActiveChap(newChaps[0]);
    } else {
      setActiveChap('');
    }
  }, [activeSub]);

  const currentData = activeSub && activeChap ? FORMULAS[activeSub]?.[activeChap] : null;

  if (subjects.length === 0) return <div className="card">No formula data found.</div>;

  return (
    <>
      <div className="hero" style={{padding:'24px', background:'#ffffff', borderRadius:'24px', border:'1px solid #f0f4ff', boxShadow:'0 10px 30px rgba(108, 142, 245, 0.05)', marginBottom:'15px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div className="hero-title" style={{fontSize:'22px', fontWeight:800, color:'#1e1b4b'}}>🚀 Quick Revision Center</div>
            <div className="hero-sub" style={{fontSize:'12px', color:'#7c7e96'}}>Master key Class 10 formulas in seconds.</div>
          </div>
          <div style={{display:'flex', gap:'8px'}}>
             <select className="inp" style={{width:'150px', height:'38px', fontSize:'12px', border:'1px solid #eef2ff', borderRadius:'10px'}} value={activeSub} onChange={e=>setActiveSub(e.target.value)}>
                {subjects.map(s=><option key={s}>{s}</option>)}
             </select>
             <select className="inp" style={{width:'150px', height:'38px', fontSize:'12px', border:'1px solid #eef2ff', borderRadius:'10px'}} value={activeChap} onChange={e=>setActiveChap(e.target.value)}>
                {chapters.map(c=><option key={c}>{c}</option>)}
             </select>
          </div>
        </div>
      </div>

      {currentData && (
        <div className="fade-in">
          <div style={{padding:'12px 16px', background:'linear-gradient(to right, #f8faff, #ffffff)', borderLeft:'4px solid #6366f1', borderRadius:'12px', marginBottom:'20px', border:'1px solid #eef2ff', boxShadow:'0 2px 8px rgba(99, 102, 241, 0.03)'}}>
             <div style={{fontSize:'12px', color:'#4b5563', fontWeight:500, display:'flex', alignItems:'center', gap:'8px'}}>
               <span style={{fontSize:'16px'}}>💡</span>
               <span><strong>Strategy:</strong> {currentData.note}</span>
             </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'12px'}}>
            {currentData.items.map((f, i) => (
              <div key={i} className="card" style={{padding:'20px', border:'1px solid var(--border)', background:'var(--bg2)', transition:'transform 0.2s'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
                   <div style={{fontSize:'10px', color:'var(--text3)', fontWeight:800, textTransform:'uppercase'}}>{f.name}</div>
                   <div className="badge badge-blue" style={{fontSize:'9px', padding:'2px 6px'}}>Class 10</div>
                </div>
                
                <div style={{
                  fontSize:'20px', fontWeight:700, padding:'16px', 
                  background:'var(--bg3)', borderRadius:'12px', border:'1px solid var(--border)', 
                  textAlign:'center', margin:'8px 0', fontFamily:'monospace', 
                  color:'var(--accent)', boxShadow:'0 4px 15px rgba(99, 102, 241, 0.08)'
                }}>{f.eq}</div>
                
                    <div style={{marginTop:'12px', padding:'10px', background:'var(--bg4)', borderRadius:'8px'}}>
                   <div style={{fontSize:'10px', color:'var(--text2)', lineHeight:'1.4'}}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}




// ── VIDEO RESOURCES ──
export function VideosView({ data }: any) {
  const [selVid, setSelVid] = useState<any>(null);
  const [aiNotes, setAiNotes] = useState('');
  const [loadingNotes, setLoadingNotes] = useState(false);

  const generateNotes = async () => {
    if (!selVid) return;
    setLoadingNotes(true);
    setAiNotes('');
    try {
      const res = await fetch('/api/ai/video-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: selVid.title, channel: selVid.channel })
      });
      const generated = await res.json();
      if (!res.ok) throw new Error(generated.error || 'Prediction Engine Failed');
      setAiNotes(generated.notes);
    } catch (err: any) {
      alert("AI Notes Error: " + err.message);
    } finally {
      setLoadingNotes(false);
    }
  };

  return (
    <>
      <div className="hero">
        <div className="hero-title">▶️ Expert Resource Library</div>
        <div className="hero-sub">Full chapter-wise curated classes for Class 10th</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(360px, 1fr))', gap:'20px', marginTop:'24px'}}>
        {data.subjects.map((s: string, i: number) => {
          const vtKey = Object.keys(YT_RESOURCES).find(k => k === s || (s.includes('Mathematics') && k.includes('Mathematics'))) || s;
          const vids = YT_RESOURCES[vtKey] || [];
          return (
            <div className="card" key={i} style={{padding:'20px', display:'flex', flexDirection:'column', height:'fit-content'}}>
              <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'18px', paddingBottom:'12px', borderBottom:'1px solid var(--border)'}}>
                 <div style={{fontSize:'22px'}}>📚</div>
                 <div style={{fontSize:'15px', fontWeight:800, color:'var(--accent)'}}>{s}</div>
              </div>
              
              <div style={{display:'flex', flexDirection:'column', gap:'8px', maxHeight:'400px', overflowY:'auto', paddingRight:'5px'}}>
                {vids.map((v: any, j: number) => (
                  <div key={j} className="card" onClick={() => { setSelVid(v); setAiNotes(''); }} style={{
                    padding:'10px 14px', background:'var(--bg3)', borderRadius:'10px', cursor:'pointer',
                    display:'flex', alignItems:'center', gap:'12px', border:'1px solid transparent',
                    transition:'all 0.2s', position:'relative'
                  }} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'} onMouseLeave={e=>e.currentTarget.style.borderColor='transparent'}>
                    <div style={{fontSize:'12px', color:'var(--red)', fontWeight:800}}>▶</div>
                    <div style={{flex: 1}}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color:'var(--text)' }}>Chapter {j+1}: {v.title}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text3)', textTransform:'uppercase', opacity:0.7 }}>{v.channel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selVid && (
        <div style={{
          position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.85)', 
          display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px',
          backdropFilter:'blur(8px)', animation:'fadeIn 0.3s'
        }} onClick={() => setSelVid(null)}>
           <div style={{
             width:'100%', maxWidth:'800px', maxHeight:'90vh', background:'var(--bg1)', borderRadius:'24px', 
             overflowY:'auto', boxShadow:'0 20px 50px rgba(0,0,0,0.5)', border:'1px solid var(--border)'
           }} onClick={e => e.stopPropagation()}>
              <div style={{padding:'15px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                 <div style={{fontSize:'14px', fontWeight:800}}>Chapter Masterclass: {selVid.title}</div>
                 <button style={{background:'none', border:'none', color:'var(--text)', cursor:'pointer', fontSize:'18px'}} onClick={() => setSelVid(null)}>✕</button>
              </div>
              <div style={{position:'relative', paddingBottom:'56.25%', height:0, overflow:'hidden', background:'#000'}}>
                 <iframe 
                   style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', border:0}}
                   src={`https://www.youtube.com/embed/${selVid.id}?autoplay=1`}
                   title="YouTube video player"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                 />
              </div>
              <div style={{padding:'15px 20px', background:'var(--bg2)', fontSize:'10px', color:'var(--text3)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                 <span>Instructor: {selVid.channel} • Class 10 Syllabus</span>
                 <button className="btn btn-primary" onClick={generateNotes} disabled={loadingNotes} style={{padding: '6px 12px', fontSize: '11px'}}>
                   {loadingNotes ? '🧠 Generating Notes...' : '📝 Generate AI Notes'}
                 </button>
              </div>
              {aiNotes && (
                <div style={{padding:'20px', fontSize:'13px', lineHeight:1.5, borderTop:'1px solid var(--border)'}}>
                  <div style={{fontSize:'12px', fontWeight:700, color:'var(--accent)', marginBottom:'8px'}}>✨ AI Generated Summary</div>
                  <div dangerouslySetInnerHTML={{ __html: aiNotes.replace(/\n/g, '<br/>') }} style={{whiteSpace: 'pre-wrap', color: 'var(--text2)'}} />
                </div>
              )}
           </div>
        </div>
      )}
    </>
  );
}




// ── LEADERBOARD ──
export function LeaderboardView() {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([
    { name: 'Physics Warrior', members: 4, activity: 'High', color: '#6C8EF5' },
    { name: 'SST Masterclass', members: 12, activity: 'Medium', color: '#4ADE80' }
  ]);
  const [newGroupName, setNewGroupName] = useState('');

  const createGroup = () => {
    if (!newGroupName) return;
    setGroups([...groups, { name: newGroupName, members: 1, activity: 'New', color: '#A78BFA' }]);
    setNewGroupName('');
    setShowModal(false);
  };

  return (
    <>
      <div className="hero">
        <div className="hero-title">🏆 Scholar Leaderboard</div>
        <div className="hero-sub">Global ranking based on study intensity and mock performance</div>
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <div className="card-title" style={{ marginBottom: '20px' }}>Top Performers — Weekly Sprint</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {LEADERBOARD.map((s, i) => {
            const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
            return (
              <div key={i} className="lb-row" style={{ 
                padding: '12px 16px', background: 'var(--bg2)', borderRadius: '12px', 
                border: i === 0 ? '1px solid var(--accent)' : '1px solid transparent'
              }}>
                <div style={{ width: '32px', fontSize: '14px', fontWeight: 800, color: i < 3 ? 'inherit' : 'var(--text3)' }}>{medal}</div>
                <div className="lb-av" style={{ 
                  background: s.color + '22', color: s.color, width: '36px', height: '36px', 
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '12px', fontWeight: 800, border: `1.5px solid ${s.color}44` 
                }}>
                  {s.name.split(' ').map((w: string) => w[0]).join('')}
                </div>
                <div style={{ flex: 1, marginLeft: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
                    {s.name} {i === 0 && <span className="badge badge-blue" style={{ fontSize: '9px', verticalAlign: 'middle' }}>Top AI Predictor</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <div style={{ flex: 1, height: '4px', background: 'var(--bg4)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.round(s.hrs / 50 * 100)}%`, background: s.color, borderRadius: '99px' }}></div>
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text3)', minWidth: '60px' }}>{s.hrs} hrs Logged</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', minWidth: '50px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)' }}>{s.score}%</div>
                  <div style={{ fontSize: '9px', color: 'var(--green)', fontWeight: 600 }}>↑ Momentum</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="two-col" style={{ marginTop: '24px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-title">🚀 Active Study Groups</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0' }}>
            {groups.map((g, idx) => (
              <div key={idx} style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', 
                background: 'var(--bg3)', borderRadius: '10px', border: '1px solid var(--border)' 
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: g.color }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700 }}>{g.name}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{g.members} Members • {g.activity} Activity</div>
                </div>
                <button className="btn" style={{ fontSize: '10px', padding: '4px 8px' }}>Join</button>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ width: '100%' }}>+ Create New Group</button>
        </div>

        <div className="card">
          <div className="card-title">🔥 Trending Subjects</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
            {['Mathematics (Class 10)', 'Science', 'Social Science'].map((sub, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{sub}</span>
                  <span style={{ color: 'var(--accent)' }}>{85 - i * 10}% Intensity</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg3)', borderRadius: '3px' }}>
                  <div style={{ height: '100%', width: `${85 - i * 10}%`, background: 'var(--accent)', borderRadius: '3px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', 
          alignItems: 'center', justifyContent: 'center', padding: '20px',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="card" style={{ maxWidth: '400px', width: '100%', animation: 'slideUp 0.3s' }}>
            <div className="card-title">Create Study Circle</div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', display: 'block', marginBottom: '8px', color: 'var(--text2)' }}>Group Name</label>
              <input 
                className="inp" 
                autoFocus
                value={newGroupName} 
                onChange={e => setNewGroupName(e.target.value)} 
                placeholder="e.g. Board Exam Warriors" 
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={createGroup}>Create Group</button>
              <button className="btn" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── ACHIEVEMENTS ──
// ── ACHIEVEMENTS ──
export function AchievementsView() {
  const currentXP = 2450;
  const nextLevelXP = 3000;
  const level = 14;

  return (
    <>
      <div className="hero" style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '30px', borderRadius: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
           <div style={{ 
             width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(255,255,255,0.1)', 
             display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px',
             boxShadow: '0 8px 32px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)'
           }}>🎖️</div>
           <div style={{ flex: 1 }}>
              <div style={{ fontSize: '24px', fontWeight: 800 }}>Master Scholar — Level {level}</div>
              <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '16px' }}>You are in the top 5% of active learners this month!</div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ 
                   height: '100%', width: `${(currentXP / nextLevelXP) * 100}%`, 
                   background: 'linear-gradient(90deg, #6C8EF5, #A78BFA)', borderRadius: '4px',
                   boxShadow: '0 0 15px #6C8EF5'
                 }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, marginTop: '8px' }}>
                 <span>{currentXP} XP</span>
                 <span style={{ opacity: 0.6 }}>{nextLevelXP} XP for Level {level + 1}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <div className="card-title">Prestige Badges</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px', marginTop: '16px' }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} style={{ 
              padding: '16px', background: a.unlocked ? 'var(--bg3)' : 'var(--bg2)', 
              borderRadius: '16px', textAlign: 'center', border: a.unlocked ? '1px solid var(--accent)' : '1px solid var(--border)',
              transition: 'transform 0.2s', cursor: 'pointer', opacity: a.unlocked ? 1 : 0.4
            }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ 
                fontSize: '28px', marginBottom: '10px', filter: a.unlocked ? 'none' : 'grayscale(100%)' 
              }}>{a.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: 800, marginBottom: '4px' }}>{a.name}</div>
              <div style={{ fontSize: '9px', color: 'var(--text3)', lineHeight: 1.3 }}>{a.desc}</div>
              {a.unlocked && <div style={{ fontSize: '8px', color: 'var(--accent)', fontWeight: 800, marginTop: '8px', textTransform: 'uppercase' }}>Unlocked</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="two-col" style={{ marginTop: '24px' }}>
        <div className="card">
          <div className="card-title">💎 Daily Bonus Multiplier</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '12px' }}>
             <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--orange)' }}>x1.5</div>
             <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>Streak Bonus Active!</div>
                <div style={{ fontSize: '11px', color: 'var(--text3)' }}>Complete 2 more chapters today to reach x2.0 bonus XP.</div>
             </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">🚀 Upcoming Milestones</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            {[{ name: '30 Day Streak', cur: 18, max: 30, icon: '🔥' }, { name: 'Chapter Master', cur: 47, max: 100, icon: '📚' }].map((b, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                   <span style={{ fontWeight: 600 }}>{b.icon} {b.name}</span>
                   <span style={{ opacity: 0.6 }}>{Math.round((b.cur / b.max) * 100)}%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--bg4)', borderRadius: '2px' }}>
                   <div style={{ height: '100%', width: `${(b.cur / b.max) * 100}%`, background: 'var(--accent)', borderRadius: '2px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
