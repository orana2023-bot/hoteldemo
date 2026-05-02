import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Receipt, 
  Search, 
  Filter, 
  Download,
  CreditCard,
  Building2,
  Globe,
  ArrowUpRight,
  MoreVertical,
  ChevronRight,
  X,
  FileText,
  User,
  Wallet
} from 'lucide-react';

const StatCard = ({ label, value, subtext, icon: Icon, color, trend }) => (
  <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-[24px] sm:rounded-[32px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full min-h-[140px] group hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 animate-fade-in-up">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 sm:p-4 bg-[var(--color-brand-silver-light)] rounded-2xl border border-white shadow-inner ${color} group-hover:scale-105 transition-transform`}>
        <Icon size={20} strokeWidth={1.5} className="sm:w-6 sm:h-6" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-widest border border-emerald-100">
          <ArrowUpRight size={12} strokeWidth={2.5} /> {trend}
        </div>
      )}
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

const InvoiceModal = ({ isOpen, onClose, bill }) => {
  if (!bill || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8 animate-fade-in overflow-hidden bg-[var(--color-luxury-steel)]/20 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-2xl w-full sm:max-w-2xl rounded-[24px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-slide-up relative border border-white">
        <div className="p-6 sm:p-10 border-b border-white/10 flex items-center justify-between bg-gradient-to-br from-[var(--color-luxury-steel)] to-[var(--color-luxury-charcoal)] text-white">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-white">Invoice Preview</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Heritage Hotel & Resort</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-xl transition-all">
            <X size={20} strokeWidth={1.5} className="text-white/80 hover:text-white" />
          </button>
        </div>
        
        <div className="p-6 sm:p-10 space-y-10 overflow-y-auto max-h-[60vh] no-scrollbar bg-transparent">
          <div className="flex justify-between items-start border-b border-slate-50 pb-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Bill To</p>
              <h4 className="text-lg font-black text-[#2d3436]">{bill.guest}</h4>
              <p className="text-xs font-bold text-slate-400">Room {bill.room}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Date</p>
              <h4 className="text-sm font-black text-[#2d3436]">{bill.date}</h4>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Summary</p>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500 italic">Total Amount</span>
                <span className="font-black text-[#2d3436]">{bill.amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500 italic">Method</span>
                <span className="font-black text-[#2d3436]">{bill.method}</span>
              </div>
              <div className="h-px bg-slate-50"></div>
              <div className="flex justify-between text-xl">
                <span className="font-black text-[#2d3436] uppercase tracking-tighter">Grand Total</span>
                <span className="font-black text-[#2d3436]">{bill.amount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Close</button>
          <button className="flex-[2] py-4 bg-[#2d3436] text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
            Download PDF <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBill, setSelectedBill] = useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const billingData = [
    { room: '101', guest: 'John Doe', amount: '₹12,450', method: 'Card', status: 'Paid', date: 'Oct 24, 2023' },
    { room: '203', guest: 'Ellen Ripley', amount: '₹8,900', method: 'UPI', status: 'Paid', date: 'Oct 24, 2023' },
    { room: '104', guest: 'Michael Scott', amount: '₹15,200', method: 'Cash', status: 'Pending', date: 'Oct 23, 2023' },
    { room: '302', guest: 'Sarah Connor', amount: '₹22,000', method: 'Card', status: 'Paid', date: 'Oct 22, 2023' },
    { room: '205', guest: 'Thomas Anderson', amount: '₹5,600', method: 'UPI', status: 'Partial', date: 'Oct 22, 2023' },
  ];

  const otaRevenue = [
    { channel: 'Booking.com', amount: '₹4,52,000', percentage: 45, icon: Globe },
    { channel: 'Expedia', amount: '₹2,80,000', percentage: 28, icon: Globe },
    { channel: 'Airbnb', amount: '₹1,20,000', percentage: 12, icon: Building2 },
    { channel: 'Direct / Others', amount: '₹1,50,000', percentage: 15, icon: TrendingUp },
  ];

  const gstSummary = {
    taxable: '₹10,02,450',
    cgst: '₹90,220',
    sgst: '₹90,220',
    total: '₹1,80,440'
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-luxury-steel)] tracking-tighter">Billing & Revenue</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
            Financial Overview • <span className="text-emerald-500 underline underline-offset-4 decoration-2">This Month</span>
          </p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-luxury-steel)] text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 shadow-lg shadow-slate-200 transition-all active:scale-[0.98] border border-transparent">
            <Download size={16} strokeWidth={1.5} /> Export Report
          </button>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
        <StatCard label="Total Revenue" value="₹12.4L" subtext="INR" icon={DollarSign} color="text-[var(--color-luxury-steel)]" trend="+12%" />
        <StatCard label="OTA Revenue" value="₹8.5L" subtext="INR" icon={Globe} color="text-[var(--color-brand-blue)]" trend="+8%" />
        <StatCard label="GST Summary" value="₹1.8L" subtext="Collected" icon={Receipt} color="text-emerald-600" />
        <StatCard label="Pending" value="₹42K" subtext="Due" icon={CreditCard} color="text-amber-600" />
      </div>

      {/* Secondary Grid: OTA & GST Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* OTA Breakdown */}
        <div className="lg:col-span-1 bg-white/60 backdrop-blur-lg p-4 sm:p-10 rounded-[24px] sm:rounded-[40px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col h-full animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[12px] font-bold text-[var(--color-luxury-steel)] uppercase tracking-[0.2em] flex items-center gap-3">
              <PieChart size={18} strokeWidth={1.5} className="text-slate-400" /> OTA Revenue
            </h3>
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[var(--color-luxury-steel)] transition-colors">Details</button>
          </div>
          <div className="space-y-6 flex-1">
            {otaRevenue.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-[var(--color-luxury-steel)]">{item.channel}</span>
                  <span className="text-slate-400">{item.amount}</span>
                </div>
                <div className="h-2 bg-[var(--color-brand-silver-light)] rounded-full overflow-hidden border border-white shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--color-brand-silver)] to-[var(--color-luxury-steel)] rounded-full transition-all duration-1000" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GST Summary Block */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[var(--color-luxury-steel)] to-[var(--color-luxury-charcoal)] p-4 sm:p-10 rounded-[24px] sm:rounded-[40px] shadow-2xl relative overflow-hidden group animate-fade-in-up border border-slate-700/50" style={{ animationDelay: '0.3s' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-colors"></div>
          <div className="relative z-10">
            <h3 className="text-[12px] font-bold text-white uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
              <Receipt size={18} strokeWidth={1.5} className="text-white/60" /> Tax & GST Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10 pb-10">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Taxable Amount</p>
                <p className="text-3xl font-black text-white tracking-tight">{gstSummary.taxable}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">CGST (9%)</p>
                <p className="text-3xl font-black text-white tracking-tight">{gstSummary.cgst}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">SGST (9%)</p>
                <p className="text-3xl font-black text-white tracking-tight">{gstSummary.sgst}</p>
              </div>
            </div>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Total Tax Liability</p>
                <p className="text-4xl font-black text-white mt-1 tracking-tight">{gstSummary.total}</p>
              </div>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                Download GST Report <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Room-wise Billing Table/List */}
      <div className="bg-white/60 backdrop-blur-lg rounded-[24px] sm:rounded-[40px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="p-4 sm:p-10 border-b border-white/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative group w-full sm:w-96">
            <Search size={18} strokeWidth={1.5} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-luxury-steel)] transition-colors" />
            <input 
              type="text" 
              placeholder="Search Room or Guest..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/50 border border-white shadow-sm rounded-3xl text-[12px] font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 focus:shadow-md transition-all text-[var(--color-luxury-steel)] placeholder-slate-400" 
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none p-4 bg-white/50 border border-white text-slate-400 rounded-2xl hover:text-[var(--color-luxury-steel)] transition-all shadow-sm"><Filter size={18} strokeWidth={1.5} /></button>
            <p className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Displaying Last 30 Days</p>
          </div>
        </div>

        <div className="p-4 sm:p-10">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-6 gap-6 px-6 pb-6 border-b border-white/50 mb-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Room / Guest</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Check-out</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Method</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
            <p className="text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</p>
          </div>

          <div className="space-y-4">
            {billingData.map((bill, idx) => (
              <div key={idx} className="flex flex-col md:grid md:grid-cols-6 gap-4 md:gap-6 p-4 sm:p-6 rounded-[24px] border border-white shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all items-start md:items-center group bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-brand-silver-light)] to-[var(--color-brand-silver)] border border-white shadow-inner rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-[var(--color-luxury-steel)]">
                    <span className="text-sm font-black tracking-tighter">{bill.room}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[var(--color-luxury-steel)] tracking-tight">{bill.guest}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Transaction Verified</p>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <p className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Check-out</p>
                  <p className="text-[11px] font-black text-[#2d3436] uppercase tracking-widest">{bill.date}</p>
                </div>

                <div className="w-full md:w-auto">
                  <p className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                  <p className="text-lg font-black text-[#2d3436] tracking-tighter">{bill.amount}</p>
                </div>

                <div className="w-full md:w-auto">
                  <p className="md:hidden text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Method</p>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{bill.method}</p>
                </div>

                <div className="w-full md:w-auto">
                  <p className="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <span className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border ${
                    bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {bill.status}
                  </span>
                </div>

                <div className="w-full md:w-auto flex justify-end gap-3">
                  <button 
                    onClick={() => {
                      setSelectedBill(bill);
                      setIsInvoiceOpen(true);
                    }}
                    className="p-4 text-slate-300 hover:text-[#2d3436] bg-slate-50 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-100 shadow-sm"
                  >
                    <Search size={18} />
                  </button>
                  <button className="p-4 text-slate-300 hover:text-[#2d3436] bg-slate-50 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-100 shadow-sm">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InvoiceModal 
        isOpen={isInvoiceOpen} 
        onClose={() => setIsInvoiceOpen(false)} 
        bill={selectedBill} 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

    </div>
  );
};

export default Billing;
