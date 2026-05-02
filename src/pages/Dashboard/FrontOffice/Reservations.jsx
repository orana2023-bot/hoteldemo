import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Calendar, 
  User, 
  Phone, 
  Clock, 
  MoreHorizontal,
  X,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock4
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, bgClass }) => (
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
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: 'bg-green-50 text-green-700',
    Pending: 'bg-orange-50 text-orange-700',
    Cancelled: 'bg-slate-100 text-slate-500'
  };
  return (
    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

const PreReservationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in bg-[var(--color-luxury-steel)]/20 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-2xl w-full sm:max-w-3xl max-h-[90vh] rounded-[24px] sm:rounded-[40px] border border-white shadow-2xl overflow-hidden flex flex-col animate-slide-up">
        
        {/* Mobile close button (Top Right) */}
        <div className="sm:hidden flex justify-end p-4 bg-transparent">
          <button onClick={onClose} className="p-2 bg-slate-50/80 rounded-xl">
            <X size={20} className="text-[var(--color-luxury-steel)]" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="p-6 sm:p-10 border-b border-slate-100/50 flex items-center justify-between shrink-0 bg-transparent">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--color-luxury-steel)] tracking-tight">New Pre-Reservation</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Hold accommodation without immediate payment</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-50/80 rounded-xl transition-all hidden sm:block">
            <X size={20} className="text-slate-400 hover:text-[var(--color-luxury-steel)]" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10 no-scrollbar bg-white">
          
          {/* Section: Guest Details */}
          <div>
            <h3 className="text-[10px] font-black text-[#2d3436] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-slate-200"></span> Guest Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
                  <input type="text" placeholder="John Doe" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Number</label>
                <div className="relative group">
                  <Phone size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
                  <input type="tel" placeholder="+1 234 567 890" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Stay Parameters */}
          <div>
            <h3 className="text-[10px] font-black text-[#2d3436] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-slate-200"></span> Stay Parameters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Check-in Date</label>
                <div className="relative group">
                  <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
                  <input type="date" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Check-out Date</label>
                <div className="relative group">
                  <Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2d3436] transition-colors" />
                  <input type="date" className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Accommodation */}
          <div>
            <h3 className="text-[10px] font-black text-[#2d3436] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-6 h-px bg-slate-200"></span> Accommodation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Room Preference</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                  <option>Any Available</option>
                  <option>Deluxe Suite</option>
                  <option>Premium Double</option>
                  <option>Executive Single</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Total Guests</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all">
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>2 Adults, 1 Child</option>
                  <option>Group (3+)</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-6 sm:p-10 bg-slate-50 border-t border-slate-100 flex flex-row gap-4 shrink-0">
          <button onClick={onClose} className="flex-1 py-4 sm:py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#2d3436] transition-colors rounded-3xl border border-transparent hover:border-slate-200">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-4 sm:py-5 bg-[#2d3436] text-white text-[10px] font-black uppercase tracking-widest rounded-3xl hover:opacity-90 shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            Create Pre-Reservation <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};

const Reservations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data for reservations
  const [reservations, setReservations] = useState([
    { id: 'RES-1042', guest: 'Michael Chen', dates: 'Oct 24 - Oct 28', type: 'Deluxe Suite', status: 'Confirmed', added: '2 hours ago' },
    { id: 'RES-1043', guest: 'Emma Watson', dates: 'Oct 25 - Oct 27', type: 'Premium Double', status: 'Pending', added: '5 hours ago' },
    { id: 'RES-1044', guest: 'Robert Davis', dates: 'Oct 26 - Oct 30', type: 'Executive Single', status: 'Confirmed', added: '1 day ago' },
    { id: 'RES-1045', guest: 'Sophia Taylor', dates: 'Oct 28 - Nov 02', type: 'Any Available', status: 'Pending', added: '1 day ago' },
    { id: 'RES-1046', guest: 'James Wilson', dates: 'Oct 22 - Oct 24', type: 'Deluxe Suite', status: 'Cancelled', added: '2 days ago' },
  ]);

  const filteredReservations = reservations.filter(res => 
    res.guest.toLowerCase().includes(searchQuery.toLowerCase()) || 
    res.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    // Logic to add reservation would go here
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 sm:space-y-10 lg:space-y-16">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-luxury-steel)] tracking-tighter">Reservations</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Manage Bookings & Pre-Reservations</p>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-luxury-steel)] text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 shadow-lg shadow-slate-200 transition-all active:scale-[0.98] border border-transparent"
          >
            <Plus size={16} /> New Pre-Reservation
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
        <StatCard label="Total Upcoming" value="142" icon={Calendar} color="text-[var(--color-luxury-steel)]" bgClass="bg-[var(--color-brand-silver-light)]" />
        <StatCard label="Pending" value="18" icon={Clock4} color="text-amber-600" bgClass="bg-amber-50" />
        <StatCard label="Confirmed" value="121" icon={CheckCircle2} color="text-emerald-600" bgClass="bg-emerald-50" />
        <StatCard label="Cancelled" value="3" icon={XCircle} color="text-slate-400" bgClass="bg-slate-50" />
      </div>

      {/* Main Content Area */}
      <div className="bg-white/60 backdrop-blur-lg rounded-[24px] sm:rounded-[40px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden animate-fade-in-up">
        
        {/* Table Toolbar */}
        <div className="p-6 sm:p-10 border-b border-white/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative group w-full sm:w-96">
            <Search size={18} strokeWidth={1.5} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-luxury-steel)] transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/50 border border-white shadow-sm rounded-3xl text-[12px] font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 focus:shadow-md transition-all text-[var(--color-luxury-steel)] placeholder-slate-400" 
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            <button className="flex-1 sm:flex-none px-6 py-4 bg-white/50 border border-white shadow-sm text-[var(--color-luxury-steel)] rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all whitespace-nowrap">
              Filter
            </button>
            <button className="flex-1 sm:flex-none px-6 py-4 bg-white/50 border border-white shadow-sm text-[var(--color-luxury-steel)] rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all whitespace-nowrap">
              Export
            </button>
          </div>
        </div>

        {/* Responsive List/Table */}
        <div className="p-6 sm:p-10">
          
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-6 gap-6 px-6 pb-6 border-b border-slate-100 mb-6">
            <p className="col-span-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Guest Details</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stay Dates</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Room Type</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
            <p className="text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</p>
          </div>

          {/* List Content */}
          {filteredReservations.length > 0 ? (
            <div className="space-y-4">
              {filteredReservations.map((res, index) => (
                <div key={index} className="flex flex-col md:grid md:grid-cols-6 gap-4 md:gap-6 p-6 rounded-[24px] border border-white shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all items-start md:items-center group bg-white/80 backdrop-blur-sm">
                  
                  {/* Guest & ID */}
                  <div className="col-span-2 flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-brand-silver-light)] to-[var(--color-brand-silver)] border border-white shadow-inner flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="text-sm font-black text-[var(--color-luxury-steel)]">{res.guest.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-[var(--color-luxury-steel)] tracking-tight truncate">{res.guest}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{res.id}</p>
                    </div>
                  </div>

                  {/* Dates (Mobile Layout Label included) */}
                  <div className="w-full md:w-auto grid grid-cols-2 md:block">
                    <p className="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 self-center">Dates</p>
                    <p className="text-xs font-bold text-[var(--color-luxury-steel)] text-right md:text-left">{res.dates}</p>
                  </div>

                  {/* Room Type */}
                  <div className="w-full md:w-auto grid grid-cols-2 md:block">
                    <p className="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 self-center">Room Type</p>
                    <p className="text-xs font-bold text-[var(--color-luxury-steel)] text-right md:text-left truncate">{res.type}</p>
                  </div>

                  {/* Status */}
                  <div className="w-full md:w-auto grid grid-cols-2 md:block items-center">
                    <p className="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <div className="text-right md:text-left">
                      <StatusBadge status={res.status} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="w-full md:w-auto flex justify-end md:justify-end mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/50">
                    <button className="p-3 text-slate-400 hover:text-[var(--color-luxury-steel)] hover:bg-white/50 rounded-xl transition-all">
                      <MoreHorizontal size={20} strokeWidth={1.5} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-white/50 border border-white shadow-sm rounded-full flex items-center justify-center mb-6">
                <Search size={32} strokeWidth={1.5} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-luxury-steel)] mb-2 tracking-tight">No Reservations Found</h3>
              <p className="text-[11px] font-bold text-slate-400 max-w-sm">We couldn't find any reservations matching your search criteria. Try adjusting your filters.</p>
            </div>
          )}

        </div>
      </div>

      <PreReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleConfirm}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUpMobile {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up-mobile {
          animation: slideUpMobile 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default Reservations;
