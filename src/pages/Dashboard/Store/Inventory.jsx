import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  TrendingDown,
  History,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Minus,
  MoreVertical,
  CheckCircle2,
  Box
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

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const [items, setItems] = useState([
    { id: 'SKU-001', name: 'Luxury Soap Bar', category: 'Housekeeping', stock: 142, unit: 'pcs', reorder: 50, status: 'Healthy' },
    { id: 'SKU-002', name: 'Coffee Beans (Arabic)', category: 'F&B', stock: 12, unit: 'kg', reorder: 15, status: 'Low' },
    { id: 'SKU-003', name: 'Bath Towels (White)', category: 'Linen', stock: 85, unit: 'pcs', reorder: 30, status: 'Healthy' },
    { id: 'SKU-004', name: 'Light Bulbs (Warm)', category: 'Maintenance', stock: 4, unit: 'pcs', reorder: 10, status: 'Critical' },
    { id: 'SKU-005', name: 'Toilet Paper Rolls', category: 'Housekeeping', stock: 240, unit: 'pcs', reorder: 100, status: 'Healthy' },
  ]);

  const categories = ['All', 'Housekeeping', 'F&B', 'Linen', 'Maintenance'];

  const filteredItems = items.filter(item =>
    (activeTab === 'All' || item.category === activeTab) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const adjustStock = (id, amount) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item
    ));
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-luxury-steel)] tracking-tighter">Inventory</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Stock Registry & Consumption Tracking</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/50 border border-white shadow-sm text-[var(--color-luxury-steel)] rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all whitespace-nowrap">
            <Filter size={16} strokeWidth={1.5} /> Export
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-luxury-steel)] text-white rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 shadow-lg shadow-slate-200 transition-all active:scale-[0.98] border border-transparent whitespace-nowrap">
            <Plus size={16} strokeWidth={1.5} /> Add New Item
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
        <StatCard label="Total SKUs" value="1,240" subtext="Items" icon={Package} color="text-[var(--color-luxury-steel)]" bgClass="bg-[var(--color-brand-silver-light)]" />
        <StatCard label="Low Stock" value="08" subtext="Alerts" icon={AlertTriangle} color="text-amber-600" bgClass="bg-amber-50" />
        <StatCard label="Critical" value="03" subtext="Urgent" icon={TrendingDown} color="text-rose-600" bgClass="bg-rose-50" />
        <StatCard label="Restocked" value="42" subtext="This Week" icon={CheckCircle2} color="text-emerald-600" bgClass="bg-emerald-50" />
      </div>

      {/* Search & Tabs */}
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[var(--color-brand-silver-light)] rounded-2xl w-full lg:w-auto border border-white shadow-inner">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === cat ? 'bg-white text-[var(--color-luxury-steel)] shadow-sm border border-slate-100' : 'text-slate-400 hover:text-[var(--color-luxury-steel)]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative group w-full lg:w-96">
            <Search size={18} strokeWidth={1.5} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-luxury-steel)] transition-colors" />
            <input
              type="text"
              placeholder="Search by Item or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/50 border border-white shadow-sm rounded-3xl text-[12px] font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 focus:shadow-md transition-all text-[var(--color-luxury-steel)] placeholder-slate-400"
            />
          </div>
        </div>

        {/* Inventory List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white/60 backdrop-blur-lg p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group animate-fade-in-up">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white shadow-inner group-hover:scale-105 transition-transform ${item.status === 'Critical' ? 'bg-rose-50 text-rose-500' :
                    item.status === 'Low' ? 'bg-amber-50 text-amber-600' : 'bg-gradient-to-br from-[var(--color-brand-silver-light)] to-[var(--color-brand-silver)] text-[var(--color-luxury-steel)]'
                    }`}>
                    <Box size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-[var(--color-luxury-steel)] tracking-tight">{item.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.id} • {item.category}</p>
                  </div>
                </div>
                <button className="p-3 text-slate-400 hover:text-[var(--color-luxury-steel)] rounded-xl transition-all"><MoreVertical size={18} strokeWidth={1.5} /></button>
              </div>

              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Stock</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-black tracking-tight ${item.status === 'Critical' ? 'text-rose-500' :
                      item.status === 'Low' ? 'text-amber-600' : 'text-[var(--color-luxury-steel)]'
                      }`}>{item.stock}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <span className={`px-3 py-1.5 rounded-xl text-[8px] font-bold uppercase tracking-widest border ${item.status === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                    item.status === 'Low' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/50">
                <button
                  onClick={() => adjustStock(item.id, -1)}
                  className="w-12 h-12 bg-white/50 border border-white shadow-sm text-slate-400 rounded-xl hover:text-[var(--color-luxury-steel)] transition-all flex items-center justify-center shrink-0"
                >
                  <Minus size={16} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => adjustStock(item.id, 1)}
                  className="w-12 h-12 bg-white/50 border border-white shadow-sm text-slate-400 rounded-xl hover:text-[var(--color-luxury-steel)] transition-all flex items-center justify-center shrink-0"
                >
                  <Plus size={16} strokeWidth={1.5} />
                </button>
                <button className="flex-1 h-12 bg-[var(--color-luxury-steel)] text-white rounded-xl text-[9px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movement Log Sidebar (Optional/Sub-section) */}
      <div className="bg-gradient-to-br from-[var(--color-luxury-steel)] to-[var(--color-luxury-charcoal)] p-8 sm:p-12 rounded-[24px] sm:rounded-[40px] shadow-2xl relative overflow-hidden group border border-slate-700/50 animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4">
            <h3 className="text-[12px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-3">
              <History size={18} strokeWidth={1.5} className="text-white/60" /> Stock Movements
            </h3>
            <p className="text-[11px] text-white/60 max-w-sm font-semibold">Track every addition and consumption log across all departments in real-time.</p>
          </div>
          <button className="w-full md:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3 whitespace-nowrap">
            View Full Audit Log <ChevronRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Inventory;
