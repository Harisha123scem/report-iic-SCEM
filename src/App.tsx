import iicLogo from "./assets/IIC_logo.jpeg";
import collegeLogo from "./assets/sahyadri.png";
import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  Info, 
  Users, 
  CheckCircle2, 
  Video, 
  Camera, 
  Calendar,
  Clock,
  MapPin,
  Lightbulb,
  Briefcase,
  TrendingUp,
  UserCheck,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDropzone } from 'react-dropzone';
import { QRCodeCanvas } from 'qrcode.react';
import { IICReportData, INITIAL_REPORT_DATA } from './types';

// Utility for merging classes
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default function App() {
  const [data, setData] = useState<IICReportData>(INITIAL_REPORT_DATA);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handleListChange = (index: number, value: string, field: 'highlights' | 'feedback') => {
    const newList = [...data[field]];
    newList[index] = value;
    setData(prev => ({ ...prev, [field]: newList }));
  };

  const handleCheckboxChange = (name: 'poMapped' | 'psoMapped', value: string) => {
    setData(prev => {
      const current = prev[name];
      const next = current.includes(value)
        ? current.filter(i => i !== value)
        : [...current, value];
      return { ...prev, [name]: next.sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, '')) || 0;
        const numB = parseInt(b.replace(/\D/g, '')) || 0;
        return numA - numB;
      }) };
    });
  };

  const addListItem = (field: 'highlights' | 'feedback') => {
    setData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeListItem = (index: number, field: 'highlights' | 'feedback') => {
    if (data[field].length <= 1) return;
    const newList = [...data[field]];
    newList.splice(index, 1);
    setData(prev => ({ ...prev, [field]: newList }));
  };

  const onDrop = async (acceptedFiles: File[], field: 'photos' | 'mediaScreenshots' | 'attendanceProof') => {
    const readers = acceptedFiles.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    const base64s = await Promise.all(readers);
    if (field === 'attendanceProof') {
      setData(prev => ({ ...prev, [field]: base64s[0] }));
    } else {
      setData(prev => ({ ...prev, [field]: [...prev[field], ...base64s] }));
    }
  };

  const { getRootProps: getPhotoRootProps, getInputProps: getPhotoInputProps } = useDropzone({
    onDrop: (f) => onDrop(f, 'photos'),
    accept: { 'image/*': [] }
  } as any);

  const ReportHeader = () => (
  <div className="text-center border-b-[2pt] border-black pb-2 mb-4 flex items-center justify-between gap-4 bg-white">
    
    {/* College Logo */}
    <div className="w-[85px] h-[85px] flex items-center justify-center overflow-hidden shrink-0 bg-white border border-slate-100">
      <img
        src={collegeLogo}
        className="w-full h-full object-contain p-1"
        alt="College Logo"
      />
    </div>

    {/* Center Content */}
    <div className="flex-1 bg-white overflow-hidden">
      <p className="text-[16pt] font-extrabold uppercase leading-tight mb-0 text-black">SAHYADRI</p>
      <p className="text-[9pt] font-bold uppercase leading-tight mb-1 text-black">
        COLLEGE OF ENGINEERING & MANAGEMENT, MANGALORE
      </p>
      <p className="text-[11pt] font-black uppercase leading-tight mb-1 text-[#1e3a8a]">
        Institution's Innovation Council (IIC) -IC201810844
      </p>
      <p className="text-[10pt] font-bold leading-tight underline uppercase text-black mb-2">
        IIC ACTIVITY REPORT
      </p>
      <div className="flex justify-center gap-8 text-[9pt] font-bold text-slate-700">
        <span>Academic Year: <span className="text-blue-900">{data.academicYear}</span></span>
        <span>Quarter: <span className="text-blue-900">{data.quarter}</span></span>
      </div>
    </div>

    {/* IIC Logo */}
    <div className="w-[85px] h-[85px] flex items-center justify-center overflow-hidden shrink-0 bg-white border border-slate-100">
      <img
        src={iicLogo}
        className="w-full h-full object-contain p-1"
        alt="IIC Logo"
      />
    </div>

  </div>
);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 no-print">
        <div>
          <h1 className="text-base font-bold text-slate-900 m-0">Sahyadri IIC Activity Report</h1>
          <p className="text-[11px] text-slate-500 m-0">Institution's Innovation Council • Ministry of Education Initiative</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="flex flex-col">
            <label className="text-[9px] font-bold text-slate-400 uppercase mb-1">Academic Year</label>
            <select name="academicYear" value={data.academicYear} onChange={handleInputChange} className="px-2 py-1 bg-slate-50 text-slate-700 rounded text-[11px] font-semibold border border-slate-200 outline-none focus:border-blue-500">
              <option value="2024-25">2024-25</option>
              <option value="2025-26">2025-26</option>
              <option value="2026-27">2026-27</option>
              <option value="2027-28">2027-28</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[9px] font-bold text-slate-400 uppercase mb-1">Quarter</label>
            <select name="quarter" value={data.quarter} onChange={handleInputChange} className="px-2 py-1 bg-slate-50 text-slate-700 rounded text-[11px] font-semibold border border-slate-200 outline-none focus:border-blue-500">
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-[1700px] mx-auto p-4 lg:p-6 pb-24">
        <div className="grid grid-cols-1 xl:grid-cols-[4fr_6fr] gap-8 items-start">
          {/* Form Section */}
          <div className="space-y-10 no-print pr-4 overflow-y-auto h-[calc(100vh-140px)] custom-scrollbar scroll-smooth pb-24 font-inter">
                {/* Card 1: Session Details */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                <h2 className="text-[13px] font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-md flex items-center justify-center text-[11px]">1</div>
                  Session & Speaker Details
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Title Of The Session</label>
                  <input type="text" name="title" value={data.title} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-300 shadow-sm" placeholder="e.g. National Workshop on Startup Ecosystem" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Academic Year</label>
                    <select name="academicYear" value={data.academicYear} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white shadow-sm">
                      <option value="2024-25">2024-25</option>
                      <option value="2025-26">2025-26</option>
                      <option value="2026-27">2026-27</option>
                      <option value="2027-28">2027-28</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Quarter</label>
                    <select name="quarter" value={data.quarter} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white shadow-sm">
                      <option value="Q1">Q1</option>
                      <option value="Q2">Q2</option>
                      <option value="Q3">Q3</option>
                      <option value="Q4">Q4</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Date</label>
                    <input type="date" name="date" value={data.date} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Duration (Hours)</label>
                    <input type="text" name="duration" value={data.duration} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none shadow-sm" placeholder="3" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Mode</label>
                    <select name="mode" value={data.mode} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white shadow-sm">
                      <option value="Offline">Offline</option>
                      <option value="Online">Online</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Theme</label>
                    <select name="theme" value={data.theme} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white shadow-sm">
                      <option value="Innovation">Innovation</option>
                      <option value="Entrepreneurship">Entrepreneurship</option>
                      <option value="IPR">IPR</option>
                      <option value="Startup">Startup</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Organizing Department</label>
                    <input type="text" name="organizingDept" value={data.organizingDept} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 shadow-sm" placeholder="e.g., Computer Science & Engineering" />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Venue / Platform</label>
                    <input type="text" name="venue" value={data.venue} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none shadow-sm" placeholder="e.g. Netravathi Auditorium" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Category</label>
                    <select name="category" value={data.category} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white shadow-sm">
                      <option value="IIC Calendar Activity">IIC Calendar Activity</option>
                      <option value="MIC Driven Activity">MIC Driven Activity</option>
                      <option value="Self Driven Activity">Self Driven Activity</option>
                      <option value="Celebration Activity">Celebration Activity</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Activity Led by</label>
                  <select name="ledBy" value={data.ledBy} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white shadow-sm">
                    <option value="Institute Council">Institute Council</option>
                    <option value="Student Council">Student Council</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Expert Name</label>
                    <input type="text" name="expertName" value={data.expertName} onChange={handleInputChange} placeholder="Name of speaker" className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Expert Designation</label>
                    <input type="text" name="expertDesignation" value={data.expertDesignation} onChange={handleInputChange} placeholder="Designation" className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Organization/Institution</label>
                  <input type="text" name="expertOrg" value={data.expertOrg} onChange={handleInputChange} placeholder="Organization name" className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm" />
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight flex justify-between">
                    Brief bio of Speaker
                    <span className="text-[10px] text-slate-400 font-normal">Max 500 characters</span>
                  </label>
                  <textarea name="expertBrief" value={data.expertBrief} onChange={handleInputChange} rows={3} maxLength={400} placeholder="Speaker bio..." className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none shadow-sm" />
                </div>
              </div>
            </div>

            {/* Card 2: Description & Highlights */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                <h2 className="text-[13px] font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-md flex items-center justify-center text-[11px]">2</div>
                  Activity Description & Highlights
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight flex justify-between">
                    Objective of Activity
                    <span className={cn("text-[10px]", data.objective.length >= 150 ? "text-red-500 font-bold" : "text-slate-400")}>
                      {data.objective.length}/150
                    </span>
                  </label>
                  <textarea name="objective" value={data.objective} onChange={handleInputChange} maxLength={150} rows={3} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none shadow-sm" placeholder="Purpose and core goal..." />
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight flex justify-between">
                    Brief Description (Activity Details)
                    <span className="text-[10px] text-slate-400 font-normal">600 - 1000 characters</span>
                  </label>
                  <textarea name="description" value={data.description} onChange={handleInputChange} rows={8} maxLength={1000} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none shadow-sm" placeholder="Elaborate on session proceedings, discussion points, etc..." />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Key Highlights</label>
                    <button onClick={() => addListItem('highlights')} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg border border-blue-100 shadow-sm transition-all"><Plus className="w-5 h-5" /></button>
                  </div>
                  <div className="space-y-3">
                    {data.highlights.map((h, i) => (
                      <div key={i} className="flex gap-3">
                        <input value={h} onChange={(e) => handleListChange(i, e.target.value, 'highlights')} className="flex-1 px-4 py-2.5 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 shadow-sm" placeholder={`Highlight Point ${i+1}`} />
                        <button onClick={() => removeListItem(i, 'highlights')} className="text-red-400 hover:text-red-500 hover:bg-red-50 px-2 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight flex justify-between">
                    Outcome of Activity
                    <span className={cn("text-[10px]", data.outcome.length >= 150 ? "text-red-500 font-bold" : "text-slate-400")}>
                      {data.outcome.length}/150
                    </span>
                  </label>
                  <textarea name="outcome" value={data.outcome} onChange={handleInputChange} maxLength={150} rows={3} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none shadow-sm" placeholder="What participants gained..." />
                </div>
              </div>
            </div>

            {/* Card 3: Participants & Media */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                <h2 className="text-[13px] font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-md flex items-center justify-center text-[11px]">3</div>
                  Participants & Media
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-6">
                   {['studentCount', 'staffCount', 'externalCount'].map((field) => (
                     <div key={field} className="space-y-2">
                       <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">{field.replace('Count', '')}</label>
                       <input type="number" name={field} value={(data as any)[field]} onChange={handleNumberChange} className="w-full px-4 py-2.5 text-[16px] font-bold border border-slate-300 rounded-lg outline-none text-center shadow-sm" />
                     </div>
                   ))}
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase flex items-center gap-2 tracking-tight">
                    <FileText className="w-4 h-4 text-blue-600" /> Attendance Sheet Link (Drive/Cloud Link)
                  </label>
                  <input 
                    type="url" 
                    name="attendanceLink" 
                    value={data.attendanceLink} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 transition-all shadow-sm bg-slate-50/50" 
                    placeholder="Enter URL to Google Drive or other cloud storage" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Event Coordinator Name</label>
                  <input type="text" name="coordinatorName" value={data.coordinatorName} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 transition-all shadow-sm" placeholder="Enter Coordinator Name" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Dept. IIC Coordinator</label>
                    <input type="text" name="deptIicCoordinator" value={data.deptIicCoordinator} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 shadow-sm" placeholder="Name of Dept IIC Coordinator" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">HoD of Department</label>
                    <input type="text" name="hodName" value={data.hodName} onChange={handleInputChange} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 shadow-sm" placeholder="Name of HoD" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">PO Mapped (Multiple Selection)</label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2">
                      {Array.from({ length: 11 }, (_, i) => `PO${i + 1}`).map(po => (
                        <label key={po} className={cn(
                          "cursor-pointer flex items-center justify-center py-2 border rounded-md text-[13px] font-bold transition-all",
                          data.poMapped.includes(po) 
                            ? "bg-blue-600 border-blue-600 text-white shadow-sm ring-2 ring-blue-100" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                        )}>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={data.poMapped.includes(po)} 
                            onChange={() => handleCheckboxChange('poMapped', po)} 
                          />
                          {po}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">PSO Mapped (Multiple Selection)</label>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 3 }, (_, i) => `PSO${i + 1}`).map(pso => (
                        <label key={pso} className={cn(
                          "cursor-pointer flex items-center justify-center px-6 py-2 border rounded-md text-[13px] font-bold transition-all min-w-[80px]",
                          data.psoMapped.includes(pso) 
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-sm ring-2 ring-indigo-100" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300"
                        )}>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={data.psoMapped.includes(pso)} 
                            onChange={() => handleCheckboxChange('psoMapped', pso)} 
                          />
                          {pso}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Organizing Team Details</label>
                  <textarea name="teamDetails" value={data.teamDetails} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 transition-all resize-none shadow-sm" placeholder="Enter organizing team members in new name press enter maximum 6 name can be added..." />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase italic">Event Poster (Vertical Form)</label>
                    <div 
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e: any) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => setData(prev => ({ ...prev, bannerImage: reader.result as string }));
                            reader.readAsDataURL(file);
                          }
                        };
                        input.click();
                      }}
                      className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 relative aspect-[2/1] md:aspect-[3/1] flex flex-col justify-center overflow-hidden"
                    >
                      {data.bannerImage ? (
                        <img src={data.bannerImage} className="absolute inset-0 w-full h-full object-contain" />
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                          <p className="text-[10px] text-slate-400 uppercase font-bold">Upload Poster</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase">Event Photos (4 Required)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e: any) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                const newPhotos = [...data.photos];
                                newPhotos[idx] = reader.result as string;
                                setData(prev => ({ ...prev, photos: newPhotos }));
                              };
                              reader.readAsDataURL(file);
                            }
                          };
                          input.click();
                        }}
                        className="border-2 border-dashed border-slate-200 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden"
                      >
                        {data.photos[idx] ? (
                          <div className="relative w-full h-full group">
                            <img src={data.photos[idx]} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                              <span className="text-[10px] text-white font-bold uppercase">Change</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Camera className="w-5 h-5 text-slate-300 mb-1" />
                            <span className="text-[9px] text-slate-400 font-bold">PHOTO {idx + 1}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                   <label className="block text-[11px] font-bold text-slate-500 uppercase italic">Multimedia Content Link (G-Drive - Photos, Poster, Video)</label>
                   <div className="relative">
                      <Video className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input type="text" name="multimediaLink" value={data.multimediaLink} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 text-[13px] border border-slate-300 rounded outline-none focus:border-blue-500 shadow-sm" placeholder="https://drive.google.com/..." />
                   </div>
                </div>
              </div>
            </div>

            {/* Card 4: Feedback & Social Media */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                <h2 className="text-[13px] font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-md flex items-center justify-center text-[11px]">4</div>
                  Feedback & Social Media
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Feedback Summary / Details</label>
                  <textarea name="feedbackSummary" value={data.feedbackSummary} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg outline-none focus:border-blue-500 transition-all resize-none shadow-sm" placeholder="Summary of participant feedback..." />
                </div>

                <div className="space-y-4">
                  <label className="block text-[12px] font-bold text-slate-600 uppercase tracking-tight">Social Media Links</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">LinkedIn</span>
                      <input type="text" name="linkedin" value={data.socialLinks.linkedin} onChange={handleSocialLinkChange} className="w-full pl-20 pr-4 py-3 text-[14px] border border-slate-200 rounded-lg outline-none focus:border-blue-500 shadow-sm" placeholder="Paste link here" />
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Instagram</span>
                      <input type="text" name="instagram" value={data.socialLinks.instagram} onChange={handleSocialLinkChange} className="w-full pl-20 pr-4 py-3 text-[14px] border border-slate-200 rounded-lg outline-none focus:border-blue-500 shadow-sm" placeholder="Paste link here" />
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Twitter</span>
                      <input type="text" name="x" value={data.socialLinks.x} onChange={handleSocialLinkChange} className="w-full pl-20 pr-4 py-3 text-[14px] border border-slate-200 rounded-lg outline-none focus:border-blue-500 shadow-sm" placeholder="Paste link here" />
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Facebook</span>
                      <input type="text" name="facebook" value={data.socialLinks.facebook} onChange={handleSocialLinkChange} className="w-full pl-20 pr-4 py-3 text-[14px] border border-slate-200 rounded-lg outline-none focus:border-blue-500 shadow-sm" placeholder="Paste link here" />
                    </div>
                    <div className="relative md:col-span-2">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Other</span>
                      <input type="text" name="other" value={data.socialLinks.other} onChange={handleSocialLinkChange} className="w-full pl-20 pr-4 py-3 text-[14px] border border-slate-200 rounded-lg outline-none focus:border-blue-500 shadow-sm" placeholder="Other relevant links" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Report Preview */}
          <div className="report-preview-container xl:sticky xl:top-[88px] flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2 px-1">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">A4 Document Blueprint</span>
               <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
               </div>
            </div>
            
            <div className="w-full shadow-2xl rounded-sm border border-slate-200 overflow-hidden scale-[0.98] origin-top bg-white">
              <div 
                ref={reportRef} 
                className="report-content w-full bg-white text-black p-[10mm] print:p-0" 
                style={{ 
                  fontFamily: 'Times New Roman, serif', 
                  minHeight: '297mm',
                }}
              >
                <div className="report-pages-container flex flex-col gap-[10mm] print:gap-0">
                  {/* Page 1: General Info */}
                  <div className="report-page bg-white border-double border-[4.5pt] border-black p-[10mm] h-[265mm] flex flex-col shadow-sm print:shadow-none print:page-break-after-always overflow-hidden">
                    <ReportHeader />
                    
                    <div className="flex-1">
                      <div className="mb-6">
                        <h4 className="text-[11pt] font-bold uppercase mb-1">Session Details:</h4>
                        <table className="w-full border-collapse border border-black text-[10pt] table-fixed">
                          <tbody>
                            {[
                              ['1', 'Academic Year', data.academicYear],
                              ['2', 'Quarter', data.quarter],
                              ['3', 'Title of the session', data.title],
                              ['4', 'Date with Month & Year', data.date],
                              ['5', 'Duration (in hours)', data.duration],
                              ['6', 'Mode', data.mode],
                              ['7', 'Venue / Platform', data.venue],
                              ['8', 'Activity Category', data.category],
                              ['9', 'Session Objectives', data.objective],
                              ['10', 'Attendance Link', data.attendanceLink],
                              ['11', 'Activity Led by', data.ledBy],
                              ['12', 'Organizing Department', data.organizingDept],
                              ['13', 'Theme', data.theme],
                            ].map(([sn, label, val]) => (
                              <tr key={sn}>
                                <td className="border border-black px-2 py-1 w-[8%] text-center font-bold">{sn}</td>
                                <td className="border border-black px-2 py-1 w-[35%] font-bold">{label}:</td>
                                <td className="border border-black px-2 py-1 w-[57%] break-words whitespace-pre-wrap text-justify">{val || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-[11pt] font-bold uppercase mb-1">Expert/Speaker Details:</h4>
                        <table className="w-full border-collapse border border-black text-[10pt] table-fixed">
                          <tbody>
                            {[
                              ['1', 'Name', data.expertName],
                              ['2', 'Designation', data.expertDesignation],
                              ['3', 'Organization/Institution', data.expertOrg],
                              ['4', 'Brief about Expert', data.expertBrief],
                            ].map(([sn, label, val]) => (
                              <tr key={sn}>
                                <td className="border border-black px-2 py-1 w-[8%] text-center font-bold">{sn}</td>
                                <td className="border border-black px-2 py-1 w-[35%] font-bold">{label}:</td>
                                <td className="border border-black px-2 py-1 w-[57%] break-words whitespace-pre-wrap text-justify">{val || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Page 2: Team & Description */}
                  <div className="report-page bg-white p-[10mm] h-[265mm] flex flex-col shadow-sm print:shadow-none print:page-break-after-always overflow-hidden">
                    <ReportHeader />

                    {/* Organizing Team (Approx 25%) */}
                    <div className="mb-6 h-[60mm] flex flex-col">
                      <h4 className="text-[11pt] font-bold uppercase mb-1">Organizing Team Details:</h4>
                      <div className="border border-black p-4 text-[10pt] flex-1 text-justify leading-relaxed bg-white overflow-hidden">
                        <ul className="list-disc pl-5 space-y-1">
  {data.teamDetails
    ? data.teamDetails.split("\n").filter(line => line.trim() !== "").map((line, i) => (
        <li key={i}>{line}</li>
      ))
    : <li className="italic text-slate-400">Details of the organizing team...</li>
  }
</ul>
                      </div>
                    </div>

                    {/* Brief Description (Approx 50%) */}
                    <div className="h-[125mm] flex flex-col mb-8 p-4 border border-black bg-white">
                      <h4 className="text-[11pt] font-bold uppercase mb-3 underline">Brief description of the Activity (600-1000 characters):</h4>
                      <div className="text-[10pt] text-justify leading-[1.8] flex-1 whitespace-pre-wrap overflow-hidden italic">
                        {data.description || 'Session description will appear here...'}
                      </div>
                    </div>
                    
                    <div className="flex-1"></div>
                  </div>

                  {/* Page 3: Metrics & Outcomes */}
                  <div className="report-page bg-white p-[10mm] h-[285mm] flex flex-col shadow-sm print:shadow-none print:page-break-after-always overflow-hidden">
                    <ReportHeader />

                    <div className="flex gap-6 mb-6">
                      <div className="flex-1">
                        <h4 className="text-[11pt] font-bold uppercase mb-2">Participant Metrics:</h4>
                        <table className="w-full border-collapse border border-black text-[10pt]">
                          <tbody>
                            <tr><td className="border border-black p-2 font-bold bg-[#f1f5f9]/50">Students</td><td className="border border-black p-2 text-center">{data.studentCount}</td></tr>
                            <tr><td className="border border-black p-2 font-bold bg-[#f1f5f9]/50">Staff</td><td className="border border-black p-2 text-center">{data.staffCount}</td></tr>
                            <tr><td className="border border-black p-2 font-bold bg-[#f1f5f9]/50">External</td><td className="border border-black p-2 text-center">{data.externalCount}</td></tr>
                          </tbody>
                        </table>
                        <div className="mt-4">
                           <h5 className="text-[10pt] font-bold uppercase mb-1">Mapping:</h5>
                           <table className="w-full border-collapse border border-black text-[9pt]">
                              <tbody>
                                <tr>
                                  <td className="border border-black px-2 py-1 font-bold bg-slate-50">PO Mapped</td>
                                  <td className="border border-black px-2 py-1 text-center font-bold text-blue-900">{data.poMapped.join(', ') || '—'}</td>
                                </tr>
                                <tr>
                                  <td className="border border-black px-2 py-1 font-bold bg-slate-50">PSO Mapped</td>
                                  <td className="border border-black px-2 py-1 text-center font-bold text-blue-900">{data.psoMapped.join(', ') || '—'}</td>
                                </tr>
                              </tbody>
                           </table>
                        </div>
                        {data.attendanceLink && (
                          <div className="mt-2 text-[8pt] text-slate-600">
                            <span className="font-bold uppercase">Attendance Link: </span>
                            <span className="text-blue-800 break-all">{data.attendanceLink}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[11pt] font-bold uppercase mb-2">Key Highlights:</h4>
                        <div className="border border-black p-3 text-[9.5pt] min-h-[102px]">
                          <ul className="list-disc pl-5 space-y-1">
                              {data.highlights.filter(h => h.trim()).slice(0, 6).map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                              {data.highlights.filter(h => h.trim()).length === 0 && (
                                <li className="italic text-slate-400">No highlights recorded...</li>
                              )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-[11pt] font-bold uppercase mb-2">Outcome of the Activity (Max 150 chars):</h4>
                      <div className="border border-black p-3 text-[10pt] min-h-[70px] text-justify leading-relaxed bg-white">
                        {data.outcome || 'Describe the main takeaways and achievements of the session here...'}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-[11pt] font-bold uppercase mb-2">Feedback Summary:</h4>
                      <div className="border border-black p-3 text-[10pt] min-h-[60px] text-justify leading-relaxed">
                        {data.feedbackSummary || 'No feedback summary provided.'}
                      </div>
                    </div>

                    <div className="flex gap-6 mb-6">
                      <div className="flex-[1.2]">
                        <h4 className="text-[11pt] font-bold uppercase mb-2">Social Media Coverage:</h4>
                        <table className="w-full border-collapse border border-black text-[8pt]">
                          <tbody>
                            {[
                              ['LinkedIn', data.socialLinks.linkedin],
                              ['Instagram', data.socialLinks.instagram],
                              ['X (Twitter)', data.socialLinks.x],
                              ['Facebook', data.socialLinks.facebook],
                              ['Other', data.socialLinks.other],
                            ].filter(([_, link]) => link).map(([label, link]) => (
                              <tr key={label}>
                                <td className="border border-black px-2 py-1 w-[25%] font-bold bg-[#f1f5f9]/50">{label}</td>
                                <td className="border border-black px-2 py-1 w-[75%] break-all text-blue-800">{link}</td>
                              </tr>
                            ))}
                            {Object.values(data.socialLinks).every(l => !l) && (
                              <tr>
                                <td colSpan={2} className="border border-black p-2 text-center text-slate-400 italic">No social media links provided.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[11pt] font-bold uppercase mb-2">Event Poster:</h4>
                        <div className="border border-black w-full aspect-[4/3] flex items-center justify-center overflow-hidden bg-white">
                          {data.bannerImage ? (
                            <img src={data.bannerImage} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="text-[8pt] text-slate-300 italic">No Poster</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Page 4: Visual Evidence & Signatures */}
                  <div className="report-page bg-white p-[10mm] h-[265mm] flex flex-col shadow-sm print:shadow-none overflow-hidden">
                    <ReportHeader />
                    
                    <h4 className="text-[11pt] font-bold uppercase mb-4 text-center border-b-[1pt] border-black pb-1">Session Visual Proofs</h4>
                    
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-6">
                        {[0, 1, 2, 3].map((idx) => (
                          <div key={idx} className="border-[1.5pt] border-black p-2 bg-white flex flex-col">
                            <p className="text-[9pt] font-bold uppercase mb-1 text-center bg-slate-50 py-1">Action Photo {idx + 1}</p>
                            <div className="w-full h-[45mm] flex items-center justify-center overflow-hidden border border-black/10">
                              {data.photos[idx] ? (
                                <img src={data.photos[idx]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <div className="text-[8pt] text-slate-200">No Photo Uploaded</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {data.multimediaLink && (
                      <div className="mt-4 flex items-center gap-6 border border-black p-4 bg-white">
                        <div className="shrink-0 bg-white p-1 border border-black/20">
                          <QRCodeCanvas value={data.multimediaLink} size={80} level="H" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10pt] font-bold uppercase mb-1 underline">Multimedia Content Link (G-Drive):</p>
                          <p className="text-[9pt] text-blue-800 break-all leading-tight">{data.multimediaLink}</p>
                          <p className="text-[7pt] text-slate-500 mt-1 italic">Scan the QR code to access photos, posters, and recorded videos of the event.</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 pb-6 border-t border-black pt-6">
                      <div className="flex justify-between items-end gap-x-8">
                        <div className="text-center flex-1">
                            <p className="text-[10pt] font-bold mb-10 min-h-[20px]">{data.coordinatorName || ' '}</p>
                            <div className="h-[1pt] w-full bg-black mb-1" />
                            <p className="text-[9pt] font-bold uppercase leading-tight">Event Coordinator</p>
                        </div>
                        <div className="text-center flex-1">
                            <p className="text-[10pt] font-bold mb-10 min-h-[20px]">{data.deptIicCoordinator || ' '}</p>
                            <div className="h-[1pt] w-full bg-black mb-1" />
                            <p className="text-[9pt] font-bold uppercase leading-tight text-center">Dept. IIC Coordinator</p>
                        </div>
                        <div className="text-center flex-1">
                            <p className="text-[10pt] font-bold mb-10 min-h-[20px]">{data.hodName || ' '}</p>
                            <div className="h-[1pt] w-full bg-black mb-1" />
                            <p className="text-[9pt] font-bold uppercase leading-tight">HoD</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 px-6 flex items-center justify-between z-50 no-print">
        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-bold">Ctrl + P</kbd>
            <span className="opacity-60 hidden sm:inline">to manually print</span>
          </div>
          <div className="w-[1px] h-4 bg-slate-200 hidden sm:block" />
          <a 
            href={window.location.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 font-bold hover:underline flex items-center gap-1"
          >
            Open in Full Window
          </a>
        </div>
        <button
          onClick={(e) => {
            const btn = e.currentTarget;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Opening Print...</span>';
            btn.classList.add('opacity-70');
            
            setTimeout(() => {
              window.focus();
              try {
                window.print();
              } catch (err) {
                console.error("Auto print failed:", err);
                alert("Auto-print blocked by browser. Please use Ctrl+P or the 'Open in Full Window' link.");
              }
              btn.innerHTML = originalText;
              btn.classList.remove('opacity-70');
            }, 300);
          }}
          type="button"
          className="px-12 py-3 rounded-full text-[14px] font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xl hover:shadow-blue-200/50 tracking-wide transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <Printer className="w-5 h-5" /> Print Report
        </button>
      </footer>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
