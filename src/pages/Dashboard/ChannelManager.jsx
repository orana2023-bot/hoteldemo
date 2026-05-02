import React, { useState, useEffect } from 'react';
import {
  Globe,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Zap,
  Settings2,
  Link2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Plus
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

const ChannelCard = ({ channel, onToggle }) => (
  <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden animate-fade-in-up">
    {channel.status === 'Error' && (
      <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
    )}

    <div className="flex justify-between items-start mb-6 gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 border border-white shadow-inner shrink-0 ${channel.active ? 'bg-gradient-to-br from-[var(--color-brand-silver-light)] to-[var(--color-brand-silver)]' : 'bg-slate-100 opacity-50'
          }`}>
          <Globe size={20} strokeWidth={1.5} className={channel.active ? 'text-[var(--color-luxury-steel)]' : 'text-slate-400'} />
        </div>
        <div className="min-w-0">
          <h3 className="text-[14px] font-bold text-[var(--color-luxury-steel)] tracking-tight truncate">{channel.name}</h3>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 truncate">API Connection • {channel.mode}</p>
        </div>
      </div>
      <button
        onClick={() => onToggle(channel.id)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 border border-white shadow-sm shrink-0 ${channel.active ? 'bg-[var(--color-luxury-steel)]' : 'bg-slate-200'
          }`}
      >
        <div className={`absolute top-[3px] w-[16px] h-[16px] bg-white rounded-full transition-all duration-300 shadow-sm ${channel.active ? 'left-[26px]' : 'left-[3px]'
          }`}></div>
      </button>
    </div>

    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="space-y-1">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Last Sync</p>
        <p className="text-[12px] font-black text-[var(--color-luxury-steel)] uppercase">{channel.lastSync}</p>
      </div>
      <div className="space-y-1 text-right">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sync Quality</p>
        <p className={`text-[12px] font-black ${channel.quality > 95 ? 'text-emerald-500' : 'text-amber-500'
          }`}>{channel.quality}%</p>
      </div>
    </div>

    {/* Markup Indicator */}
    <div className="mb-6 p-4 bg-white/50 border border-white shadow-sm rounded-2xl flex items-center justify-between">
      <span className="text-[9px] font-bold text-[var(--color-luxury-steel)] uppercase tracking-widest italic">Markup Rule</span>
      <span className="text-[12px] font-black text-[var(--color-luxury-steel)]">{channel.markup}</span>
    </div>

    <div className="flex items-center gap-3 pt-6 border-t border-white/50">
      <button className="flex-1 py-3 bg-[var(--color-luxury-steel)] text-white rounded-xl hover:bg-slate-700 transition-all text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md">
        <Settings2 size={14} strokeWidth={1.5} /> Configure
      </button>
      <button className="p-3 bg-white/50 border border-white text-[var(--color-luxury-steel)] shadow-sm rounded-xl hover:bg-white transition-all">
        <RefreshCw size={16} strokeWidth={1.5} />
      </button>
    </div>
  </div>
);

const ChannelManager = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [channels, setChannels] = useState([
    { id: 1, name: 'Booking.com', mode: 'Full Sync', active: true, lastSync: '2 min ago', quality: 99.8, status: 'Healthy', markup: '+15%' },
    { id: 2, name: 'Expedia', mode: 'Inventory Only', active: true, lastSync: '5 min ago', quality: 98.4, status: 'Healthy', markup: '+12%' },
    { id: 3, name: 'Airbnb', mode: 'iCal + API', active: true, lastSync: '12 min ago', quality: 92.1, status: 'Healthy', markup: '+10%' },
    { id: 4, name: 'Agoda', mode: 'Full Sync', active: false, lastSync: '--', quality: 0, status: 'Inactive', markup: '+18%' },
    { id: 5, name: 'HotelBeds', mode: 'XML', active: true, lastSync: '1 hour ago', quality: 85.0, status: 'Error', markup: '+15%' },
  ]);

  const toggleChannel = (id) => {
    setChannels(prev => prev.map(ch =>
      ch.id === id ? { ...ch, active: !ch.active, status: !ch.active ? 'Healthy' : 'Inactive' } : ch
    ));
  };

  const syncAll = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 3000);
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-luxury-steel)] tracking-tighter">Channel Manager</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-3">
            OTA Connectivity <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> <span className="text-[var(--color-luxury-steel)]">Global Parity Active</span>
          </p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={syncAll}
            disabled={isSyncing}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-3xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-md border border-transparent whitespace-nowrap ${isSyncing ? 'bg-slate-100 text-slate-400' : 'bg-[var(--color-luxury-steel)] text-white hover:bg-slate-700'
              }`}
          >
            <RefreshCw size={16} strokeWidth={1.5} className={isSyncing ? 'animate-spin' : ''} />
            {isSyncing ? 'Syncing All...' : 'Sync All Now'}
          </button>
          <button className="hidden sm:flex items-center justify-center p-4 bg-white/50 border border-white shadow-sm rounded-2xl hover:bg-white transition-all text-[var(--color-luxury-steel)]">
            <Plus size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
        <StatCard label="Connected" value="04" subtext="Channels" icon={Link2} color="text-[var(--color-luxury-steel)]" bgClass="bg-[var(--color-brand-silver-light)]" />
        <StatCard label="Sync Health" value="98%" subtext="Parity" icon={Zap} color="text-amber-600" bgClass="bg-amber-50" />
        <StatCard label="Live Syncs" value="03" subtext="Active" icon={RefreshCw} color="text-[var(--color-brand-blue)]" bgClass="bg-[var(--color-brand-blue-light)]" />
        <StatCard label="Security" value="SSL" subtext="Verified" icon={ShieldCheck} color="text-emerald-600" bgClass="bg-emerald-50" />
      </div>

      {/* Main Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} onToggle={toggleChannel} />
        ))}

        {/* Add New Channel Placeholder */}
        <button className="group bg-white/30 backdrop-blur-md border-2 border-dashed border-white shadow-sm rounded-[24px] sm:rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-[var(--color-luxury-steel)] hover:bg-white/50 transition-all h-full min-h-[250px]">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--color-luxury-steel)] transition-all">
            <Plus size={28} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Connect New Channel</span>
        </button>
      </div>

      {/* Global Availability Snapshot */}
      <div className="bg-gradient-to-br from-[var(--color-luxury-steel)] to-[var(--color-luxury-charcoal)] p-8 sm:p-12 rounded-[24px] sm:rounded-[40px] shadow-2xl relative overflow-hidden group border border-slate-700/50 animate-fade-in-up">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            <div className="space-y-4">
              <h3 className="text-[12px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-3">
                <Calendar size={18} strokeWidth={1.5} className="text-white/60" /> 7-Day Parity Snapshot
              </h3>
              <p className="text-[11px] text-white/60 font-semibold max-w-sm">Real-time inventory currently being broadcasted to all active OTAs.</p>
            </div>
            <button className="w-full md:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3 whitespace-nowrap">
              Full Inventory Grid <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>

          {/* Simple Parity Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="bg-white/5 border border-white/10 p-5 rounded-[24px] text-center group/day hover:bg-white/10 transition-colors">
                <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest mb-3">{day}</p>
                <p className="text-2xl font-black text-white tracking-tight">14</p>
                <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest mt-2 border border-emerald-400/20 bg-emerald-400/10 rounded-lg py-1 mx-2">In Sync</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChannelManager;
