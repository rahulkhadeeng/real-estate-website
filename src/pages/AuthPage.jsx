import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import BrandLogo from '../components/common/BrandLogo';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const AuthPage = ({ mode: initialMode = 'login' }) => {
  const [activeTab, setActiveTab] = useState(initialMode);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  const redirectPath = location.state?.from || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      await auth.login(loginEmail, loginPassword);
      navigate(redirectPath);
    } catch (err) {
      setLoginError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    setRegisterLoading(true);

    try {
      await auth.register(registerEmail, registerPassword, registerName);
      setRegisterSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate(redirectPath);
      }, 1000);
    } catch (err) {
      setRegisterError(err.message || 'Unable to create account.');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Top Header */}
      <header className="auth-header">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <BrandLogo height={42} isWhite={false} />
        </Link>
        <Link to="/" className="auth-header-home-link">
          <ArrowLeft size={16} />
          Back to website
        </Link>
      </header>

      {/* Main Split Layout */}
      <main className="auth-split-layout">
        {/* Sign In Card */}
        <section
          className={`auth-card ${activeTab === 'login' ? 'active-mode' : ''}`}
          onClick={() => setActiveTab('login')}
          style={{ cursor: 'pointer' }}
        >
          <span className="eyebrow">WELCOME BACK</span>
          <h1>Sign in to Keylo Realty</h1>
          <p className="auth-intro">Access your saved properties, exclusive inquiries, and portfolio.</p>

          <form onSubmit={handleLogin} onClick={(e) => e.stopPropagation()}>
            <label>
              Email address
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="has-icon"
                />
              </div>
            </label>

            <label>
              Password
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  type={showLoginPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="has-icon"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  tabIndex={-1}
                >
                  {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {loginError && (
              <p className="auth-form-error">
                <AlertCircle size={16} />
                {loginError}
              </p>
            )}

            <button type="submit" className="auth-submit-btn" disabled={loginLoading}>
              {loginLoading ? (
                'Signing in…'
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="auth-mobile-switch">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
              >
                Create account
              </button>
            </div>
          </form>
        </section>

        {/* Register Card */}
        <section
          className={`auth-card ${activeTab === 'register' ? 'active-mode' : ''}`}
          onClick={() => setActiveTab('register')}
          style={{ cursor: 'pointer' }}
        >
          <span className="eyebrow">WELCOME TO KEYLO REALTY</span>
          <h1>Create your account</h1>
          <p className="auth-intro">Save luxury estates, schedule private viewings, and get expert consultation.</p>

          <form onSubmit={handleRegister} onClick={(e) => e.stopPropagation()}>
            <label>
              Full name
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  className="has-icon"
                />
              </div>
            </label>

            <label>
              Email address
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="has-icon"
                />
              </div>
            </label>

            <label>
              Password
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  minLength={6}
                  type={showRegisterPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  className="has-icon"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  tabIndex={-1}
                >
                  {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {registerError && (
              <p className="auth-form-error">
                <AlertCircle size={16} />
                {registerError}
              </p>
            )}

            {registerSuccess && (
              <p className="auth-form-success">
                <CheckCircle2 size={16} />
                {registerSuccess}
              </p>
            )}

            <button type="submit" className="auth-submit-btn" disabled={registerLoading}>
              {registerLoading ? (
                'Creating account…'
              ) : (
                <>
                  <span>Create account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="auth-mobile-switch">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Sign in
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AuthPage;
