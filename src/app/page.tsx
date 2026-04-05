'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [section, setSection] = useState('10');
  const [stream, setStream] = useState('pcmb');
  const [dept, setDept] = useState('cse');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!name || !email) { setError('Please fill in name and email.'); return; }
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      name, email, section, stream, dept, password: 'password123'
    });

    if (res?.error) {
      setError('Login failed. Please try again.');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  const demoLogin = () => {
    setName('Ravi Chavadal');
    setEmail('ravi@example.com');
    setSection('10');
    handleLogin();
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">📚 Study<span>Plan AI</span> Pro</div>
        <div className="login-sub">Personalized study plan · AI tutor · Analytics</div>

        <div className="fg"><label>Full name</label><input className="inp" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Ravi Chavadal"/></div>
        <div className="fg"><label>Student ID / email</label><input className="inp" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="student@school.com"/></div>

        
        <div className="fg">
          <label>Select section</label>
          <div className="sec-grid">
            <div className={`sec-btn ${section === '10' ? 'on' : ''}`} onClick={() => setSection('10')}>Class 10th</div>
            <div className={`sec-btn ${section === '12' ? 'on' : ''}`} onClick={() => setSection('12')}>Class 12th</div>
            <div className={`sec-btn ${section === 'eng' ? 'on' : ''}`} onClick={() => setSection('eng')}>Engineering</div>
            <div className={`sec-btn ${section === 'job' ? 'on' : ''}`} onClick={() => setSection('job')}>Jobs</div>
            <div className={`sec-btn ${section === 'trade' ? 'on' : ''}`} onClick={() => setSection('trade')}>Trading</div>
          </div>
        </div>

        {section === '12' && (
          <div className="sub-sel show">
            <div className="fg"><label>12th stream</label>
            <select className="inp" value={stream} onChange={e => setStream(e.target.value)}>
              <option value="pcmb">PCMB (Physics, Chemistry, Maths, Biology)</option>
              <option value="pcmc">PCMC (Physics, Chemistry, Maths, CS)</option>
            </select></div>
          </div>
        )}

        {section === 'eng' && (
          <div className="sub-sel show">
            <div className="fg"><label>Engineering dept</label>
            <select className="inp" value={dept} onChange={e => setDept(e.target.value)}>
              <option value="cse">CSE — Computer Science</option>
              <option value="ise">ISE — Information Science</option>
              <option value="ece">ECE — Electronics</option>
              <option value="civil">Civil Engineering</option>
              <option value="mech">Mechanical Engineering</option>
              <option value="aids">AIDS — AI & Data Science</option>
              <option value="aiml">AIML — AI & ML</option>
            </select></div>
          </div>
        )}

        {error && <div className="err" style={{display: 'block'}}>{error}</div>}
        <button className="btn-login" onClick={handleLogin} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in & Start Learning →'}
        </button>
        <button className="btn-demo" onClick={demoLogin} disabled={loading}>Quick demo preview</button>
      </div>
    </div>
  );
}
