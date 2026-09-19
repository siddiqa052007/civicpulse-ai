import React, { useState, useEffect } from 'react';
import {
  Building2,
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  LogIn,
  UserPlus
} from 'lucide-react';
import { User, UserRole, DepartmentType } from '../types';
import { initialUsers } from '../data/mockData';
import confetti from 'canvas-confetti';

interface RegisteredAccount extends User {
  passwordHash?: string;
}

interface LoginViewProps {
  onLogin: (user: User) => void;
}

const STORAGE_KEY = 'civicpulse_registered_users_v2';
const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/;
const NUMBER_REGEX = /[0-9]/;
const UPPERCASE_REGEX = /[A-Z]/;

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('authority');
  const [department, setDepartment] = useState<DepartmentType>('Road Department');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Real-time password requirement metrics
  const hasMinLength = password.length >= 8;
  const hasUppercase = UPPERCASE_REGEX.test(password);
  const hasNumber = NUMBER_REGEX.test(password);
  const hasSpecialChar = SPECIAL_CHAR_REGEX.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasNumber && hasSpecialChar;

  // Load existing registered accounts from localStorage
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (_) {}
    // Seed with initial municipal test accounts with default compliant password 'Admin@123'
    return initialUsers.map((u) => ({
      ...u,
      passwordHash: 'Admin@123',
    }));
  });

  // Save registered users whenever modified
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registeredUsers));
    } catch (_) {}
  }, [registeredUsers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    // STRICT PASSWORD POLICY ENFORCEMENT (REQUIRED FOR BOTH LOGIN & REGISTRATION)
    if (cleanPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (!UPPERCASE_REGEX.test(cleanPassword)) {
      setErrorMessage('Password must contain at least one uppercase letter (A-Z).');
      return;
    }

    if (!NUMBER_REGEX.test(cleanPassword)) {
      setErrorMessage('Password must contain at least one number (0-9).');
      return;
    }

    if (!SPECIAL_CHAR_REGEX.test(cleanPassword)) {
      setErrorMessage('Password must contain at least one special character / symbol (e.g. @, #, $, %, !, *, &, _).');
      return;
    }

    if (isRegistering) {
      // REGISTRATION FLOW
      if (!name.trim()) {
        setErrorMessage('Please provide your full name.');
        return;
      }

      // Check if user already exists
      const existingUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === cleanEmail
      );

      if (existingUser) {
        setErrorMessage(
          `An account with email "${cleanEmail}" already exists. Please log in instead.`
        );
        return;
      }

      // Create new registered user with strictly validated password
      const newUser: RegisteredAccount = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: cleanEmail,
        role,
        department: role === 'citizen' ? undefined : department,
        employeeId:
          role === 'citizen'
            ? undefined
            : `CP-${role.toUpperCase().slice(0, 3)}-${Math.floor(100 + Math.random() * 900)}`,
        avatar:
          role === 'engineer'
            ? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
            : role === 'field_worker'
            ? 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
            : role === 'authority'
            ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        passwordHash: cleanPassword,
      };

      const updatedList = [newUser, ...registeredUsers];
      setRegisteredUsers(updatedList);
      setSuccessMessage('Registration successful! Logging into dashboard now...');

      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch (_) {}

      setTimeout(() => {
        onLogin(newUser);
      }, 600);
    } else {
      // LOGIN FLOW - STRICT AUTHENTICATION
      const matchedUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === cleanEmail
      );

      if (!matchedUser) {
        setErrorMessage(
          `Account not found for "${cleanEmail}". If not registered, please register using the link below.`
        );
        return;
      }

      // Strictly verify password match
      const expectedPassword = matchedUser.passwordHash || 'Admin@123';
      if (cleanPassword !== expectedPassword) {
        setErrorMessage('Incorrect password. Please verify and try again.');
        return;
      }

      setSuccessMessage(`Welcome back, ${matchedUser.name}! Logging into dashboard...`);
      setTimeout(() => {
        onLogin(matchedUser);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Subtle Blue & Cyan Glow Spheres */}
      <div className="absolute top-[-15%] left-[-15%] w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card - Enriched, spacious, and attractive */}
      <div className="w-full max-w-lg lg:max-w-xl bg-slate-900/95 border border-slate-800 rounded-3xl p-7 sm:p-10 shadow-2xl shadow-slate-950/90 backdrop-blur-xl relative z-10 ring-1 ring-slate-800/60">
        
        {/* Brand Header with centered logo and larger CivicPulse title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-22 h-22 rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 shadow-2xl shadow-blue-500/30 ring-4 ring-blue-500/20 mb-4 transition-transform hover:scale-105">
            <Building2 className="w-12 h-12 text-white stroke-[2.2]" />
          </div>
          <div className="flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              CivicPulse
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
            Municipal Infrastructure &amp; Structural Safety Management Portal
          </p>
        </div>

        {/* Form Title - Centered, Enlarged, without symbol beside text */}
        <div className="mb-6 pb-3 border-b border-slate-800 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {isRegistering ? 'Register' : 'Login'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
            {isRegistering
              ? 'Create your municipal credentials to access the system'
              : 'Enter your credentials to access the municipal dashboard'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-950/80 border border-red-800 text-red-300 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{errorMessage}</p>
              {!isRegistering && (
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(true);
                    setErrorMessage('');
                  }}
                  className="mt-2 text-xs text-cyan-400 underline font-semibold hover:text-cyan-300 block cursor-pointer"
                >
                  if not register please register &rarr;
                </button>
              )}
            </div>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                Full Name / Official Designation
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eng. Sarah Jenkins"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@civicpulse.gov"
                className="w-full pl-10 pr-3.5 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs sm:text-sm font-medium text-slate-300">
                Password
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                Min 8 chars &bull; 1 uppercase &bull; 1 number &bull; 1 symbol
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g. Admin@123"
                className="w-full pl-10 pr-11 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Live Password Validation Requirements Status Chips (4 Rules) */}
            {(isRegistering || password.length > 0) && (
              <div className="mt-2.5 grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div
                  className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                    hasMinLength ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      hasMinLength ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                  />
                  <span>8+ chars ({password.length}/8)</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                    hasUppercase ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      hasUppercase ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                  />
                  <span>1+ uppercase (A-Z)</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                    hasNumber ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      hasNumber ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                  />
                  <span>1+ number (0-9)</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                    hasSpecialChar ? 'text-emerald-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 flex-shrink-0 ${
                      hasSpecialChar ? 'text-emerald-400' : 'text-slate-600'
                    }`}
                  />
                  <span>1+ special symbol</span>
                </div>
              </div>
            )}
          </div>

          {isRegistering && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Role Type
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="authority">Authority / Admin</option>
                  <option value="engineer">Structural Engineer</option>
                  <option value="field_worker">Field Inspector</option>
                  <option value="citizen">Citizen Reporter</option>
                </select>
              </div>

              {role !== 'citizen' && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as DepartmentType)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Road Department">Road Department</option>
                    <option value="Forest Department">Forest Department</option>
                    <option value="Electricity Department">Electricity Department</option>
                    <option value="Traffic Department">Traffic Department</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Action Button in Blue theme */}
          <button
            type="submit"
            id="btn-auth-submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm sm:text-base font-bold rounded-xl transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 mt-4 cursor-pointer"
          >
            <span>{isRegistering ? 'Register' : 'Login'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        {/* Centered 'if not register please register' at the bottom of the card */}
        <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-center text-center">
          {!isRegistering ? (
            <p className="text-sm text-slate-400 font-medium">
              if not register{' '}
              <button
                type="button"
                id="link-register-down"
                onClick={() => {
                  setIsRegistering(true);
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 ml-1 cursor-pointer transition-colors"
              >
                please register
              </button>
            </p>
          ) : (
            <p className="text-sm text-slate-400 font-medium">
              Already registered?{' '}
              <button
                type="button"
                id="link-login-down"
                onClick={() => {
                  setIsRegistering(false);
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4 ml-1 cursor-pointer transition-colors"
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
