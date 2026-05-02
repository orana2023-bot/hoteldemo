import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Search, 
  Filter, 
  X, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  MoreVertical,
  Mail,
  Phone,
  Globe,
  DoorOpen
} from 'lucide-react';

const StatCard = ({ label, value, subtext, icon: Icon, color, bgClass }) => (
  <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-[24px] sm:rounded-[32px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full min-h-[140px] group hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 animate-fade-in-up">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 sm:p-4 ${bgClass} rounded-2xl border border-white shadow-inner ${color} group-hover:scale-105 transition-transform`}>
        <Icon size={20} strokeWidth={1.5} className="sm:w-6 sm:h-6" />
      </div>
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-200 group-hover:bg-[var(--color-luxury-steel)] transition-colors"></div>
    </div>
    <div>
      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
      <div className="flex items-baseline gap-1 sm:gap-2">
        <p className="text-2xl sm:text-3xl font-black text-[var(--color-luxury-steel)] tracking-tight">{value}</p>
        <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subtext}</p>
      </div>
    </div>
  </div>
);

const AddGuestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in overflow-hidden bg-[var(--color-luxury-steel)]/20 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-2xl w-full sm:max-w-4xl max-h-[90vh] rounded-[24px] sm:rounded-[40px] border border-white shadow-2xl overflow-hidden flex flex-col animate-slide-up relative">
        
        <div className="p-6 sm:p-10 border-b border-slate-100/50 flex items-center justify-between shrink-0 bg-transparent">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-luxury-steel)] tracking-tighter">Register New Guest</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Complete the onboarding form below</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-50/80 rounded-xl transition-all">
            <X size={20} className="text-slate-400 hover:text-[var(--color-luxury-steel)]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12 no-scrollbar bg-transparent">
          
          {/* Section: Guest Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Users size={18} strokeWidth={1.5} className="text-[var(--color-luxury-steel)]" />
              <h3 className="text-[10px] font-bold text-[var(--color-luxury-steel)] uppercase tracking-[0.2em]">Guest Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Guest Name *</label>
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number *</label>
                <input type="tel" placeholder="+91 00000 00000" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nationality</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                  <option>Indian</option>
                  <option>International</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ID Type *</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                  <option>Aadhar Card</option>
                  <option>Passport</option>
                  <option>Driving License</option>
                  <option>Voter ID</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ID Number *</label>
                <input type="text" placeholder="Enter ID Number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Number of Guests</label>
                <input type="number" defaultValue={1} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
            </div>
          </div>

          {/* Section: Booking Details */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-slate-300" />
              <h3 className="text-[12px] font-black text-[#2d3436] uppercase tracking-[0.25em]">Booking Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Check-in Date *</label>
                <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Check-out Date *</label>
                <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Booking Type</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                  <option>Walk-in</option>
                  <option>Online</option>
                  <option>OTA</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Room * (Showing Availability)</label>
              <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                <option disabled>-- Select a Room --</option>
                <optgroup label="Floor 1">
                  <option>Room 101 - Deluxe (Available)</option>
                  <option>Room 102 - Suite (Available)</option>
                </optgroup>
                <optgroup label="Floor 2">
                  <option>Room 205 - Single (Available)</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12 bg-slate-50 border-t border-slate-100 flex gap-4 shrink-0">
          <button onClick={onClose} className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#2d3436]">Cancel</button>
          <button className="flex-[2] py-5 bg-[#2d3436] text-white rounded-[32px] text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl">Confirm Registration</button>
        </div>
      </div>
    </div>
  );
};

const GuestManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const guests = [
    { name: 'John Doe', phone: '+91 98765 43210', email: 'john@example.com', room: '101', type: 'Deluxe', status: 'Checked In', payment: 'Paid', checkIn: 'Oct 24', checkOut: 'Oct 26' },
    { name: 'Ellen Ripley', phone: '+91 88888 77777', email: 'ripley@weyland.com', room: '203', type: 'Suite', status: 'Confirmed', payment: 'Pending', checkIn: 'Oct 25', checkOut: 'Oct 30' },
  ];

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-luxury-steel)] tracking-tighter">Guest Registry</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Onboarding & Occupancy Control</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-luxury-steel)] text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 shadow-lg shadow-slate-200 transition-all active:scale-[0.98] border border-transparent"
        >
          <UserPlus size={16} strokeWidth={1.5} /> New Reservation
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
        <StatCard label="Total Bookings" value="15" subtext="Units" icon={Users} color="text-[var(--color-luxury-steel)]" bgClass="bg-[var(--color-brand-silver-light)]" />
        <StatCard label="Upcoming" value="08" subtext="Arrivals" icon={Clock} color="text-indigo-600" bgClass="bg-indigo-50" />
        <StatCard label="In-House" value="05" subtext="Occupied" icon={DoorOpen} color="text-emerald-600" bgClass="bg-emerald-50" />
        <StatCard label="Confirmed" value="05" subtext="Booked" icon={CheckCircle2} color="text-[var(--color-brand-blue)]" bgClass="bg-[var(--color-brand-blue-light)]" />
      </div>

      {/* Registry List */}
      <div className="space-y-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[var(--color-brand-silver-light)] rounded-2xl w-full lg:w-auto border border-white shadow-inner">
            {['All', 'Upcoming', 'Confirmed', 'Checked In'].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeFilter === filter ? 'bg-white text-[var(--color-luxury-steel)] shadow-sm border border-slate-100' : 'text-slate-400 hover:text-[var(--color-luxury-steel)]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="relative group w-full lg:w-96">
            <Search size={18} strokeWidth={1.5} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-luxury-steel)] transition-colors" />
            <input 
              type="text" 
              placeholder="Search Name, Phone, Room..." 
              className="w-full pl-14 pr-6 py-4 bg-white/50 border border-white shadow-sm rounded-3xl text-[12px] font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 focus:shadow-md transition-all text-[var(--color-luxury-steel)] placeholder-slate-400" 
            />
          </div>
        </div>

        {guests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {guests.map((guest, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-lg p-4 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between animate-fade-in-up">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-brand-silver-light)] to-[var(--color-brand-silver)] border border-white shadow-inner rounded-2xl flex items-center justify-center text-[var(--color-luxury-steel)] group-hover:scale-105 transition-transform">
                      <span className="text-sm font-black">{guest.room}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[var(--color-luxury-steel)] tracking-tight leading-tight">{guest.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{guest.type} • {guest.phone}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border ${
                      guest.status === 'Checked In' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                    }`}>
                      {guest.status}
                    </span>
                    <span className={`px-3 py-1.5 rounded-lg text-[8px] font-bold uppercase tracking-widest border ${
                      guest.payment === 'Paid' ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {guest.payment}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 border-t border-white/50 pt-6 mt-2">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Check-in</p>
                    <p className="text-[12px] font-black text-[var(--color-luxury-steel)]">{guest.checkIn}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Check-out</p>
                    <p className="text-[12px] font-black text-[var(--color-luxury-steel)]">{guest.checkOut}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <button className="flex-1 min-w-[120px] py-3 bg-white/50 border border-white shadow-sm text-[var(--color-luxury-steel)] rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                    <Mail size={14} strokeWidth={1.5} /> Send PDF
                  </button>
                  {guest.status === 'Checked In' && (
                    <button className="flex-1 min-w-[120px] py-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-rose-100 transition-all flex items-center justify-center gap-2">
                      Check-Out
                    </button>
                  )}
                  <button className="flex-1 min-w-[120px] py-3 bg-[var(--color-luxury-steel)] text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md">
                    Manage <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[56px] border border-slate-100 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users size={40} className="text-slate-200" />
            </div>
            <h3 className="text-2xl font-black text-[#2d3436]">No reservations found</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-3">Create a new reservation to get started</p>
          </div>
        )}
      </div>

      <AddGuestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};

export default GuestManagement;
