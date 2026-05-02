import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wifi, 
  Droplets, 
  Zap, 
  FileText, 
  AlertCircle, 
  Calendar, 
  CreditCard, 
  Plus, 
  Search, 
  ChevronRight,
  MoreVertical,
  X,
  ArrowRight
} from 'lucide-react';

const StatCard = ({ label, value, subtext, icon: Icon, color, bgClass }) => (
  <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-[24px] sm:rounded-[32px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full min-h-[140px] group hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 animate-fade-in-up">
    <div className="flex justify-between items-start">
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

const AddEntryModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in bg-[#2d3436]/40 backdrop-blur-sm overflow-hidden">
      <div className="bg-white/95 border border-white w-full sm:max-w-2xl max-h-[90vh] rounded-[32px] sm:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col animate-slide-up relative">
        
        <div className="sm:hidden flex justify-end p-4 bg-transparent">
          <button onClick={onClose} className="p-2 bg-slate-50/80 rounded-xl">
            <X size={20} className="text-[var(--color-luxury-steel)]" />
          </button>
        </div>

        <div className="p-6 sm:p-10 border-b border-slate-100/50 flex items-center justify-between shrink-0 bg-transparent">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--color-luxury-steel)] tracking-tight">Add New Registry</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Track a service or legal document</p>
          </div>
          <button onClick={onClose} className="hidden sm:block p-3 hover:bg-slate-50/80 rounded-xl transition-all">
            <X size={20} className="text-slate-400 hover:text-[var(--color-luxury-steel)]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 sm:space-y-8 no-scrollbar bg-white">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Registry Type</label>
            <div className="grid grid-cols-2 gap-4 p-1.5 bg-slate-50 border border-slate-100 rounded-3xl">
              <button className="py-4 bg-white text-[var(--color-luxury-steel)] shadow-sm border border-slate-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">Service</button>
              <button className="py-4 text-slate-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:text-[var(--color-luxury-steel)] transition-all">Legal Paper</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
              <input type="text" placeholder="e.g. WiFi Fiber Optic" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all text-[var(--color-luxury-steel)]" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Provider/Authority</label>
              <input type="text" placeholder="e.g. Fire Dept / ISP" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all text-[var(--color-luxury-steel)]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Renewal/Expiry Date</label>
              <div className="relative">
                <Calendar size={18} strokeWidth={1.5} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="date" className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all text-[var(--color-luxury-steel)]" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Annual Cost (₹)</label>
              <div className="relative">
                <CreditCard size={18} strokeWidth={1.5} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="number" placeholder="12,000" className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:border-[#2d3436]/20 transition-all text-[var(--color-luxury-steel)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex gap-4 shrink-0">
          <button onClick={onClose} className="flex-1 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[var(--color-luxury-steel)] transition-colors">Cancel</button>
          <button className="flex-[2] py-4 bg-[var(--color-luxury-steel)] text-white rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-all shadow-xl active:scale-[0.98]">Add Registry</button>
        </div>
      </div>
    </div>
  );
};

const Subscription = () => {
  const [activeTab, setActiveTab] = useState('Service');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [services, setServices] = useState([
    { id: 1, name: 'Fiber Internet (High Speed)', provider: 'Jio Business', cost: '₹2,499', freq: 'Monthly', expiry: 'Nov 12, 2023', status: 'Active', icon: Wifi, autoRenew: true },
    { id: 2, name: 'Water Supply (Commercial)', provider: 'Municipal Corp', cost: '₹8,500', freq: 'Monthly', expiry: 'Oct 30, 2023', status: 'Expiring Soon', icon: Droplets, autoRenew: false },
    { id: 3, name: 'Power Grid (Industrial)', provider: 'State Electricity', cost: '₹45,000', freq: 'Monthly', expiry: 'Nov 05, 2023', status: 'Active', icon: Zap, autoRenew: true },
  ]);

  const legalDocs = [
    { id: 101, name: 'Liquor License Renewal', provider: 'Excise Dept', cost: '₹2,50,000', freq: 'Yearly', expiry: 'Nov 02, 2023', status: 'Critical', days: 8 },
    { id: 102, name: 'Fire Safety Certificate', provider: 'Fire Authority', cost: '₹12,000', freq: 'Yearly', expiry: 'Dec 15, 2023', status: 'Active', days: 52 },
    { id: 103, name: 'Trade License', provider: 'MNC', cost: '₹5,000', freq: 'Yearly', expiry: 'Oct 28, 2023', status: 'Critical', days: 2 },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-luxury-steel)] tracking-tighter">Subscriptions</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Managed Recurring Costs & Compliance</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-luxury-steel)] text-white rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 shadow-md shadow-slate-200 transition-all active:scale-[0.98] border border-transparent whitespace-nowrap"
        >
          <Plus size={16} strokeWidth={1.5} /> Add New Entry
        </button>
      </div>

      {/* Critical Alerts Section */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-3">
          <AlertCircle size={16} strokeWidth={1.5} /> Critical Alerts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-rose-50/50 backdrop-blur-sm border border-rose-100 p-4 sm:p-8 rounded-[24px] sm:rounded-[32px] flex items-center justify-between group hover:bg-rose-50 transition-all cursor-pointer">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-rose-500 border border-rose-50 shrink-0">
                <FileText size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest">Legal Expiry</p>
                <h4 className="text-sm sm:text-lg font-bold text-[var(--color-luxury-steel)] tracking-tight mt-1">Trade License</h4>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl sm:text-2xl font-black text-rose-500 tracking-tighter">02 Days</p>
              <p className="text-[8px] sm:text-[9px] font-bold text-rose-400 uppercase tracking-widest">Left to Renew</p>
            </div>
          </div>
          <div className="bg-rose-50/50 backdrop-blur-sm border border-rose-100 p-4 sm:p-8 rounded-[24px] sm:rounded-[32px] flex items-center justify-between group hover:bg-rose-50 transition-all cursor-pointer">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-rose-500 border border-rose-50 shrink-0">
                <FileText size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest">Legal Expiry</p>
                <h4 className="text-sm sm:text-lg font-bold text-[var(--color-luxury-steel)] tracking-tight mt-1">Liquor License</h4>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xl sm:text-2xl font-black text-rose-500 tracking-tighter">08 Days</p>
              <p className="text-[8px] sm:text-[9px] font-bold text-rose-400 uppercase tracking-widest">Left to Renew</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
        <StatCard label="Active Service" value="12" subtext="Units" icon={Zap} color="text-[var(--color-luxury-steel)]" bgClass="bg-[var(--color-brand-silver-light)]" />
        <StatCard label="Legal Compliance" value="94%" subtext="Verified" icon={ShieldCheck} color="text-emerald-600" bgClass="bg-emerald-50" />
        <StatCard label="Monthly Cost" value="₹62K" subtext="Estimated" icon={CreditCard} color="text-[var(--color-brand-blue)]" bgClass="bg-[var(--color-brand-blue-light)]" />
        <StatCard label="Alerts" value="02" subtext="Critical" icon={AlertCircle} color="text-rose-600" bgClass="bg-rose-50" />
      </div>

      {/* Main Registry Tabs */}
      <div className="space-y-8 sm:space-y-10">
        <div className="flex items-center justify-between border-b border-white/50 pb-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 sm:gap-10 min-w-max">
            {['Service', 'Legal'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
                  activeTab === tab ? 'text-[var(--color-luxury-steel)]' : 'text-slate-400 hover:text-[var(--color-luxury-steel)]'
                }`}
              >
                {tab === 'Service' ? 'Service Subscriptions' : 'Legal Paper Renewals'}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-luxury-steel)] rounded-full"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(activeTab === 'Service' ? services : legalDocs).map((item) => (
            <div key={item.id} className="bg-white/60 backdrop-blur-lg p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group flex flex-col justify-between min-h-[300px]">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white shadow-inner ${
                    item.status === 'Critical' ? 'bg-rose-50 text-rose-500' : 'bg-[var(--color-brand-silver-light)] text-[var(--color-luxury-steel)]'
                  }`}>
                    {activeTab === 'Service' ? <item.icon size={20} strokeWidth={1.5} /> : <FileText size={20} strokeWidth={1.5} />}
                  </div>
                  <button className="p-2 text-slate-400 hover:text-[var(--color-luxury-steel)] rounded-xl transition-all"><MoreVertical size={18} strokeWidth={1.5} /></button>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-luxury-steel)] tracking-tight leading-tight truncate">{item.name}</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">{item.provider}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{activeTab === 'Service' ? 'Monthly Cost' : 'Renewal Cost'}</p>
                    <p className="text-[12px] font-black text-[var(--color-luxury-steel)]">{item.cost}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{activeTab === 'Service' ? 'Billing Date' : 'Expiry Date'}</p>
                    <p className="text-[12px] font-black text-[var(--color-luxury-steel)]">{item.expiry}</p>
                  </div>
                </div>

                {activeTab === 'Service' && (
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white shadow-sm">
                    <span className="text-[8px] font-bold text-[var(--color-luxury-steel)] uppercase tracking-widest italic">Auto-Renew</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setServices(prev => prev.map(s => s.id === item.id ? { ...s, autoRenew: !s.autoRenew } : s));
                      }}
                      className={`relative w-10 h-5 rounded-full transition-all duration-300 shadow-sm border border-white shrink-0 ${item.autoRenew ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-[3px] w-[12px] h-[12px] bg-white rounded-full transition-all duration-300 shadow-sm ${item.autoRenew ? 'left-[23px]' : 'left-[3px]'}`}></div>
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-white/50 flex items-center justify-between">
                <span className={`px-3 py-1.5 rounded-xl text-[8px] font-bold uppercase tracking-widest ${
                  item.status === 'Critical' ? 'bg-rose-50 text-rose-600' : 
                  item.status === 'Expiring Soon' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {item.status}
                </span>
                <button className="text-[9px] font-bold text-[var(--color-luxury-steel)] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  Manage <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};

export default Subscription;
