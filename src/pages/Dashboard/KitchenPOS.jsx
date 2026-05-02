import React, { useState, useEffect } from 'react';
import { 
  ChefHat, 
  Clock, 
  UtensilsCrossed, 
  DollarSign, 
  Plus, 
  Timer, 
  CheckCircle2, 
  AlertCircle, 
  Coffee,
  Pizza,
  Wine,
  MoreVertical,
  ChevronRight
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

const OrderCard = ({ order, onUpdate }) => {
  const [timer, setTimer] = useState(order.elapsed);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusStyles = (status, urgent) => {
    if (urgent) return 'border-red-200 bg-red-50/20 ring-4 ring-red-100 shadow-2xl animate-pulse-subtle';
    switch (status) {
      case 'New': return 'border-blue-200 bg-blue-50/20 ring-4 ring-blue-50/50 animate-pulse-subtle';
      case 'Preparing': return 'border-slate-200 bg-white';
      case 'Ready': return 'border-green-200 bg-green-50/20';
      default: return 'border-slate-100 bg-white';
    }
  };

  return (
    <div className={`p-4 sm:p-8 rounded-[24px] sm:rounded-[40px] border-2 transition-all duration-500 flex flex-col h-full bg-white/60 backdrop-blur-lg ${getStatusStyles(order.status, order.urgent)}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg sm:text-xl font-black text-[var(--color-luxury-steel)] tracking-tight">{order.source}</h3>
            {order.urgent && (
              <span className="px-2 py-0.5 bg-rose-600 text-white text-[7px] font-black uppercase rounded-lg">Urgent</span>
            )}
          </div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Order #{order.id} • {order.type}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-xl border border-white shadow-sm">
          <Timer size={14} className="text-slate-400" />
          <span className="text-[11px] font-black text-[var(--color-luxury-steel)]">{timer}m</span>
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-6">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-slate-50 border border-white shadow-inner flex items-center justify-center text-[10px] font-black text-[var(--color-luxury-steel)]">
                {item.qty}x
              </span>
              <span className="text-[13px] font-bold text-slate-600">{item.name}</span>
            </div>
            {item.notes && <AlertCircle size={14} className="text-amber-500" title={item.notes} />}
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-white/50 flex items-center gap-3">
        {order.status === 'New' && (
          <button 
            onClick={() => onUpdate(order.id, 'Preparing')}
            className="flex-1 py-3.5 bg-[var(--color-luxury-steel)] text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all shadow-lg active:scale-[0.98]"
          >
            Start Prep
          </button>
        )}
        {order.status === 'Preparing' && (
          <button 
            onClick={() => onUpdate(order.id, 'Ready')}
            className="flex-1 py-3.5 bg-emerald-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg active:scale-[0.98]"
          >
            Mark Ready
          </button>
        )}
        {order.status === 'Ready' && (
          <button 
            onClick={() => onUpdate(order.id, 'Served')}
            className="flex-1 py-3.5 bg-[var(--color-brand-silver-light)] text-[var(--color-luxury-steel)] rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-[0.98]"
          >
            Served
          </button>
        )}
        <button 
          onClick={() => onUpdate(order.id, 'toggleUrgent')}
          className={`p-3.5 rounded-2xl transition-all border border-white shadow-sm ${
            order.urgent ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-white/50 text-slate-300 hover:text-[var(--color-luxury-steel)]'
          }`}
        >
          <AlertCircle size={18} />
        </button>
      </div>
    </div>
  );
};

const KitchenPOS = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState([
    { id: '1024', source: 'Room 302', type: 'Room Service', status: 'New', elapsed: 2, items: [
      { qty: 2, name: 'Club Sandwich', notes: 'No Mayo' },
      { qty: 1, name: 'Orange Juice', notes: 'Fresh' }
    ]},
    { id: '1025', source: 'Table 4', type: 'Dining', status: 'Preparing', elapsed: 12, items: [
      { qty: 1, name: 'Classic Margherita', notes: 'Extra Cheese' },
      { qty: 2, name: 'Coke Zero', notes: '' }
    ]},
    { id: '1026', source: 'Table 7', type: 'Dining', status: 'Ready', elapsed: 24, items: [
      { qty: 1, name: 'Grilled Salmon', notes: '' },
      { qty: 1, name: 'Chardonnay', notes: '' }
    ]},
    { id: '1027', source: 'Poolside', type: 'Dining', status: 'New', elapsed: 5, items: [
      { qty: 3, name: 'Virgin Mojito', notes: 'Extra Mint' }
    ]},
  ]);

  const updateOrderStatus = (id, action) => {
    if (action === 'Served') {
      setOrders(prev => prev.filter(o => o.id !== id));
    } else if (action === 'toggleUrgent') {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, urgent: !o.urgent } : o));
    } else {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: action } : o));
    }
  };

  const filteredOrders = orders.filter(o => activeTab === 'All' || o.type === activeTab);

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#2d3436] tracking-tighter">Kitchen & POS</h1>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 flex items-center gap-3">
            Service Board <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> <span className="text-[#2d3436]">Real-time Operations</span>
          </p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-luxury-steel)] text-white rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 shadow-lg shadow-slate-200 transition-all active:scale-[0.98] border border-transparent">
          <Plus size={16} strokeWidth={1.5} /> New POS Order
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
        <StatCard label="Active Orders" value={orders.length} subtext="Live" icon={ChefHat} color="text-[#2d3436]" bgClass="bg-slate-50" />
        <StatCard label="Total Sales" value="₹12.4K" subtext="Today" icon={DollarSign} color="text-green-500" bgClass="bg-green-50" />
        <StatCard label="Avg. Prep" value="18m" subtext="Target 15m" icon={Clock} color="text-blue-500" bgClass="bg-blue-50" />
        <StatCard label="Kitchen Load" value="Normal" subtext="Optimal" icon={UtensilsCrossed} color="text-orange-500" bgClass="bg-orange-50" />
      </div>

      {/* Tabs & Filtering */}
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[var(--color-brand-silver-light)] rounded-2xl w-full sm:w-auto border border-white shadow-inner overflow-x-auto no-scrollbar">
          {['All', 'Dining', 'Room Service'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-white text-[var(--color-luxury-steel)] shadow-sm border border-slate-100' : 'text-slate-400 hover:text-[var(--color-luxury-steel)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} onUpdate={updateOrderStatus} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white/60 backdrop-blur-lg rounded-[40px] border border-white shadow-sm">
              <div className="w-20 h-20 bg-white/50 border border-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <UtensilsCrossed size={32} strokeWidth={1.5} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-luxury-steel)]">All Clear</h3>
              <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest">No active orders in the queue.</p>
            </div>
          )}
        </div>
      </div>

      {/* Sales Snapshot Footer */}
      <div className="bg-gradient-to-br from-[var(--color-luxury-steel)] to-[var(--color-luxury-charcoal)] p-8 sm:p-12 rounded-[24px] sm:rounded-[56px] shadow-2xl relative overflow-hidden group border border-slate-700/50 animate-fade-in-up">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 backdrop-blur-md">
                <Coffee size={20} strokeWidth={1.5} />
              </div>
              <div className="text-white text-center sm:text-left">
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Coffee Bar</p>
                <p className="text-xl font-black">₹4.2K</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 backdrop-blur-md">
                <Pizza size={20} strokeWidth={1.5} />
              </div>
              <div className="text-white text-center sm:text-left">
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Main Kitchen</p>
                <p className="text-xl font-black">₹6.8K</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 backdrop-blur-md">
                <Wine size={20} strokeWidth={1.5} />
              </div>
              <div className="text-white text-center sm:text-left">
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Lounge</p>
                <p className="text-xl font-black">₹1.4K</p>
              </div>
            </div>
          </div>
          <button className="w-full lg:w-auto px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3 whitespace-nowrap">
            Full Sales Analytics <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(0.995); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}} />

    </div>
  );
};

export default KitchenPOS;
