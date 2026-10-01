// File: lernx-project/frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, Search, Edit3, Trash2, Eye, X, CheckCircle2, 
  BookOpen, Award, BarChart3, LayoutGrid, List, AlertCircle,
  Database, Code2, Layers, Home
} from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science',
  'Electrical Eng',
  'Business Admin',
  'Physics',
  'Mathematics',
  'Arts & Design'
];

const API_URL = 'http://localhost:5000/api/students';

export default function App() {
  const [students, setStudents] = useState([
    { _id: '1', name: 'Alexander Wright', email: 'alex.w@university.edu', phone: '+1 555-0192', department: 'Computer Science', createdAt: '2026-09-15' },
    { _id: '2', name: 'Sophia Chen', email: 'sophia.c@university.edu', phone: '+1 555-0148', department: 'Electrical Eng', createdAt: '2026-09-18' },
    { _id: '3', name: 'Marcus Vance', email: 'm.vance@university.edu', phone: '+1 555-0177', department: 'Business Admin', createdAt: '2026-09-20' },
    { _id: '4', name: 'Elena Rostova', email: 'elena.r@university.edu', phone: '+1 555-0123', department: 'Physics', createdAt: '2026-09-22' },
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [viewMode, setViewMode] = useState('table');
  const [toast, setToast] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isApiDocsOpen, setIsApiDocsOpen] = useState(false);
  
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', department: 'Computer Science' });

  const fetchStudents = async () => {
    try {
      let url = `${API_URL}?search=${searchTerm}`;
      if (selectedDept !== 'All Departments') {
        url += `&department=${selectedDept}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setStudents(data.data);
      }
    } catch (error) {
      console.log("Using local state persistence mode");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedDept]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setIsAddOpen(false);
        setFormData({ name: '', email: '', phone: '', department: 'Computer Science' });
        showToast('Student added to database!');
        fetchStudents();
        return;
      }
    } catch (err) {}

    const newStudent = { _id: Date.now().toString(), ...formData, createdAt: '2026-10-01' };
    setStudents([newStudent, ...students]);
    setIsAddOpen(false);
    setFormData({ name: '', email: '', phone: '', department: 'Computer Science' });
    showToast('Student added successfully!');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStudents(students.map(s => s._id === currentStudent._id ? { ...s, ...formData } : s));
    setIsEditOpen(false);
    showToast('Student record updated!');
  };

  const handleDelete = async () => {
    setStudents(students.filter(s => s._id !== currentStudent._id));
    setIsDeleteOpen(false);
    showToast('Student removed!', 'error');
  };

  const openEdit = (student) => {
    setCurrentStudent(student);
    setFormData({ name: student.name, email: student.email, phone: student.phone, department: student.department });
    setIsEditOpen(true);
  };

  const openView = (student) => {
    setCurrentStudent(student);
    setIsViewOpen(true);
  };

  const openDelete = (student) => {
    setCurrentStudent(student);
    setIsDeleteOpen(true);
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.phone.includes(searchTerm);
    const matchesDept = selectedDept === 'All Departments' || s.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-[#F8F6FE] text-brand-900 font-sans relative overflow-x-hidden">
      
    {/* Soft & Visible Math/Stationery Watermark Background */}
<div 
  className="fixed inset-0 pointer-events-none z-0 opacity-[0.12]"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%236D28D9' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3C!-- Ruler --%3E%3Cpath d='M10 20 h60 v15 H10 z M20 20 v5 M30 20 v8 M40 20 v5 M50 20 v8 M60 20 v5'/%3E%3C!-- Calculator --%3E%3Crect x='100' y='10' width='35' height='50' rx='4'/%3E%3Crect x='106' y='16' width='23' height='10' rx='1'/%3E%3Ccircle cx='110' cy='34' r='2'/%3E%3Ccircle cx='118' cy='34' r='2'/%3E%3Ccircle cx='125' cy='34' r='2'/%3E%3Ccircle cx='110' cy='42' r='2'/%3E%3Ccircle cx='118' cy='42' r='2'/%3E%3Ccircle cx='125' cy='42' r='2'/%3E%3Ccircle cx='110' cy='50' r='2'/%3E%3Ccircle cx='118' cy='50' r='2'/%3E%3Ccircle cx='125' cy='50' r='2'/%3E%3C!-- Set Square Triangle --%3E%3Cpath d='M15 80 L60 80 L15 125 Z'/%3E%3Cpath d='M22 88 L45 88 L22 110 Z'/%3E%3C!-- Compass --%3E%3Cpath d='M115 80 L100 120 M115 80 L130 120 M110 98 h10'/%3E%3Ccircle cx='115' cy='78' r='3'/%3E%3C!-- Pencil --%3E%3Cpath d='M75 100 L110 65 L120 75 L85 110 Z M75 100 L70 115 L85 110'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'fixed'
    
  }}
/>

{/* Optimized & Elegant Watermark Background */}
<div 
  className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%236D28D9' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3C!-- Ruler --%3E%3Cpath d='M10 20 h60 v15 H10 z M20 20 v5 M30 20 v8 M40 20 v5 M50 20 v8 M60 20 v5'/%3E%3C!-- Calculator --%3E%3Crect x='100' y='10' width='35' height='50' rx='4'/%3E%3Crect x='106' y='16' width='23' height='10' rx='1'/%3E%3Ccircle cx='110' cy='34' r='2'/%3E%3Ccircle cx='118' cy='34' r='2'/%3E%3Ccircle cx='125' cy='34' r='2'/%3E%3Ccircle cx='110' cy='42' r='2'/%3E%3Ccircle cx='118' cy='42' r='2'/%3E%3Ccircle cx='125' cy='42' r='2'/%3E%3Ccircle cx='110' cy='50' r='2'/%3E%3Ccircle cx='118' cy='50' r='2'/%3E%3Ccircle cx='125' cy='50' r='2'/%3E%3C!-- Set Square Triangle --%3E%3Cpath d='M15 80 L60 80 L15 125 Z'/%3E%3Cpath d='M22 88 L45 88 L22 110 Z'/%3E%3C!-- Compass --%3E%3Cpath d='M115 80 L100 120 M115 80 L130 120 M110 98 h10'/%3E%3Ccircle cx='115' cy='78' r='3'/%3E%3C!-- Pencil --%3E%3Cpath d='M75 100 L110 65 L120 75 L85 110 Z M75 100 L70 115 L85 110'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundAttachment: 'fixed'
  }}
/>

{/* Soft Gradient Glow Behind Hero Section */}
<div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-300/30 blur-[120px] pointer-events-none -z-10 rounded-full" />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl text-white font-medium animate-bounce ${toast.type === 'error' ? 'bg-red-600' : 'bg-brand-600'}`}>
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-10 backdrop-blur-md bg-white/70 border-b border-brand-200 sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('dashboard'); setSelectedDept('All Departments'); setSearchTerm(''); }}>
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-900 via-brand-600 to-purple-800">
              LernX
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-brand-100/60 p-1.5 rounded-2xl border border-brand-200/60">
            <button 
              onClick={() => { setActiveTab('dashboard'); setSelectedDept('All Departments'); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'dashboard' ? 'bg-white text-brand-600 shadow-sm' : 'text-brand-900/70 hover:text-brand-900 hover:bg-white/50'}`}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button 
              onClick={() => { setActiveTab('students'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'students' ? 'bg-white text-brand-600 shadow-sm' : 'text-brand-900/70 hover:text-brand-900 hover:bg-white/50'}`}
            >
              <Users className="w-4 h-4" />
              <span>Students List</span>
            </button>

            <button 
              onClick={() => { setSelectedDept(selectedDept === 'Computer Science' ? 'All Departments' : 'Computer Science'); setActiveTab('departments'); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'departments' ? 'bg-white text-brand-600 shadow-sm' : 'text-brand-900/70 hover:text-brand-900 hover:bg-white/50'}`}
            >
              <Layers className="w-4 h-4" />
              <span>Departments</span>
            </button>

            <button 
              onClick={() => setIsApiDocsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-brand-900/70 hover:text-brand-900 hover:bg-white/50 transition-all"
            >
              <Code2 className="w-4 h-4" />
              <span>API Sandbox</span>
            </button>
          </div>

          <button 
            onClick={() => { setFormData({ name: '', email: '', phone: '', department: 'Computer Science' }); setIsAddOpen(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium shadow-md transition-all active:scale-95 text-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </nav>

    {/* Hero Section inside a Clean White Container */}
<header className="relative z-10 max-w-5xl mx-auto px-6 pt-10 pb-12 mt-6 text-center">
  <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-brand-200/80 shadow-xl shadow-brand-900/5">
    
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-600 text-xs font-bold mb-4 border border-brand-200">
      <Award className="w-4 h-4" /> Enterprise Management Engine
    </span>

    <h1 className="text-3xl md:text-5xl font-extrabold text-brand-900 tracking-tight leading-tight max-w-3xl mx-auto">
      Modern Student Records Management System
    </h1>

    <p className="mt-4 text-brand-900/70 text-base md:text-lg max-w-2xl mx-auto mb-8">
      Manage academic records, departments, contact info, and analytics seamlessly with real-time REST API integration.
    </p>

    {/* Stat Cards Inside Hero */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
      <div 
        onClick={() => { setActiveTab('students'); setSelectedDept('All Departments'); }}
        className="p-5 rounded-2xl bg-white border border-brand-200/70 shadow-sm flex items-center justify-between cursor-pointer hover:border-brand-500 hover:shadow-md transition-all"
      >
        <div>
          <p className="text-xs font-semibold text-brand-900/60 uppercase tracking-wider">Total Enrolled</p>
          <h3 className="text-2xl font-extrabold text-brand-900 mt-1">{students.length}</h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
      </div>

      <div 
        onClick={() => setActiveTab('departments')}
        className="p-5 rounded-2xl bg-white border border-brand-200/70 shadow-sm flex items-center justify-between cursor-pointer hover:border-brand-500 hover:shadow-md transition-all"
      >
        <div>
          <p className="text-xs font-semibold text-brand-900/60 uppercase tracking-wider">Active Departments</p>
          <h3 className="text-2xl font-extrabold text-brand-900 mt-1">{DEPARTMENTS.length}</h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
          <Award className="w-5 h-5" />
        </div>
      </div>

      <div 
        onClick={() => setIsApiDocsOpen(true)}
        className="p-5 rounded-2xl bg-white border border-brand-200/70 shadow-sm flex items-center justify-between cursor-pointer hover:border-brand-500 hover:shadow-md transition-all"
      >
        <div>
          <p className="text-xs font-semibold text-brand-900/60 uppercase tracking-wider">System Status</p>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">Operational</h3>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <BarChart3 className="w-5 h-5" />
        </div>
      </div>
    </div>

  </div>
</header>

      {/* Main Interactive Dashboard */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-brand-200 shadow-xl overflow-hidden">
          
          <div className="p-6 border-b border-brand-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-900/40" />
                <input 
                  type="text" 
                  placeholder="Search by name, email or phone..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-200 bg-brand-50/50 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
              </div>

              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-brand-200 bg-brand-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="All Departments">All Departments</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2.5 rounded-xl border ${viewMode === 'table' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-brand-200 text-brand-900/70 hover:bg-brand-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl border ${viewMode === 'grid' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white border-brand-200 text-brand-900/70 hover:bg-brand-50'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>

          {viewMode === 'table' ? (
            <div className="overflow-x-auto min-h-[300px]">
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-100/50 text-brand-900 font-semibold border-b border-brand-200">
                  <tr>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Phone Number</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-brand-50/60 transition-colors">
                        <td className="px-6 py-4 font-semibold text-brand-900">{student.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-600">
                            {student.department}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-brand-900/80">{student.email}</td>
                        <td className="px-6 py-4 text-brand-900/80">{student.phone}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button title="View" onClick={() => openView(student)} className="p-2 rounded-lg hover:bg-brand-100 text-brand-600"><Eye className="w-4 h-4" /></button>
                            <button title="Edit" onClick={() => openEdit(student)} className="p-2 rounded-lg hover:bg-brand-100 text-brand-600"><Edit3 className="w-4 h-4" /></button>
                            <button title="Delete" onClick={() => openDelete(student)} className="p-2 rounded-lg hover:bg-red-100 text-red-600"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-brand-900/50">
                        No students found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <div key={student._id} className="p-5 rounded-xl bg-brand-50/50 border border-brand-200 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-600 mb-2 inline-block">
                      {student.department}
                    </span>
                    <h4 className="text-lg font-bold text-brand-900">{student.name}</h4>
                    <p className="text-sm text-brand-900/70 mt-1">{student.email}</p>
                    <p className="text-sm text-brand-900/70">{student.phone}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-brand-200">
                    <button onClick={() => openView(student)} className="flex-1 py-1.5 rounded-lg bg-white border border-brand-200 text-xs font-semibold text-brand-900 hover:bg-brand-100">View</button>
                    <button onClick={() => openEdit(student)} className="flex-1 py-1.5 rounded-lg bg-brand-600 text-xs font-semibold text-white hover:bg-brand-500">Edit</button>
                    <button onClick={() => openDelete(student)} className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* Add / Edit Form Modal */}
      {(isAddOpen || isEditOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-brand-200">
            <div className="flex items-center justify-between pb-4 border-b border-brand-100">
              <h3 className="text-lg font-bold text-brand-900">
                {isAddOpen ? 'Add New Student' : 'Edit Student Record'}
              </h3>
              <button onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }} className="text-brand-900/40 hover:text-brand-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={isAddOpen ? handleCreate : handleUpdate} className="mt-4 space-y-4">
              <div><label className="block text-xs font-semibold text-brand-900/70 mb-1">Full Name</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-3.5 py-2 rounded-xl border border-brand-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
              <div><label className="block text-xs font-semibold text-brand-900/70 mb-1">Email Address</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-3.5 py-2 rounded-xl border border-brand-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
              <div><label className="block text-xs font-semibold text-brand-900/70 mb-1">Phone Number</label><input type="text" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-3.5 py-2 rounded-xl border border-brand-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
              <div>
                <label className="block text-xs font-semibold text-brand-900/70 mb-1">Department</label>
                <select name="department" value={formData.department} onChange={handleInputChange} className="w-full px-3.5 py-2 rounded-xl border border-brand-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }} className="flex-1 py-2.5 rounded-xl border border-brand-200 text-sm font-semibold text-brand-900">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-500 shadow-md">
                  {isAddOpen ? 'Save Student' : 'Update Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* API Sandbox Modal */}
      {isApiDocsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-brand-200">
            <div className="flex items-center justify-between pb-4 border-b border-brand-100">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-brand-600" />
                <h3 className="text-lg font-bold text-brand-900">REST API Endpoints</h3>
              </div>
              <button onClick={() => setIsApiDocsOpen(false)} className="text-brand-900/40 hover:text-brand-900"><X className="w-5 h-5" /></button>
            </div>
            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-between">
                <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 font-bold">GET</span>
                <span className="text-brand-900/80">/api/students</span>
                <span className="text-brand-900/40">Fetch All Students</span>
              </div>
              <div className="p-3 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-between">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-bold">POST</span>
                <span className="text-brand-900/80">/api/students</span>
                <span className="text-brand-900/40">Create Student</span>
              </div>
              <div className="p-3 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-between">
                <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 font-bold">PUT</span>
                <span className="text-brand-900/80">/api/students/:id</span>
                <span className="text-brand-900/40">Update Student</span>
              </div>
              <div className="p-3 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-between">
                <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-bold">DELETE</span>
                <span className="text-brand-900/80">/api/students/:id</span>
                <span className="text-brand-900/40">Delete Record</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && currentStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-brand-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-4"><AlertCircle className="w-6 h-6" /></div>
            <h3 className="text-lg font-bold text-brand-900">Delete Student?</h3>
            <p className="text-sm text-brand-900/60 mt-1">Are you sure you want to remove <b>{currentStudent.name}</b>?</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-2 rounded-xl border border-brand-200 text-sm font-semibold">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-500">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewOpen && currentStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-brand-200">
            <div className="flex items-center justify-between pb-4 border-b border-brand-100">
              <h3 className="text-lg font-bold text-brand-900">Student Profile Details</h3>
              <button onClick={() => setIsViewOpen(false)} className="text-brand-900/40 hover:text-brand-900"><X className="w-5 h-5" /></button>
            </div>
            <div className="mt-4 space-y-3">
              <div><span className="text-xs font-semibold text-brand-900/50 block">Student ID</span><span className="font-mono text-sm">{currentStudent._id}</span></div>
              <div><span className="text-xs font-semibold text-brand-900/50 block">Name</span><span className="font-semibold text-brand-900">{currentStudent.name}</span></div>
              <div><span className="text-xs font-semibold text-brand-900/50 block">Email</span><span>{currentStudent.email}</span></div>
              <div><span className="text-xs font-semibold text-brand-900/50 block">Phone</span><span>{currentStudent.phone}</span></div>
              <div><span className="text-xs font-semibold text-brand-900/50 block">Department</span><span className="px-2.5 py-1 rounded-full bg-brand-100 text-brand-600 text-xs font-bold">{currentStudent.department}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 bg-white/80 border-t border-brand-200 py-6 text-center text-sm text-brand-900/60">
        <p>© 2026 LernX Enterprise Platform. Built with React & Tailwind CSS.</p>
      </footer>

    </div>
  );
}