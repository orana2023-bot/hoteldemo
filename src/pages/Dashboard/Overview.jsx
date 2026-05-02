import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Users,
  Bed,
  CalendarCheck,
  TrendingUp,
  ArrowUpRight as ArrowUp,
  ArrowDownRight as ArrowDown,
  Clock,
  MoreHorizontal
} from 'lucide-react'

const StatCard = ({ title, value, change, isPositive, icon: Icon, delay }) => (
  <div 
    className="bg-white/60 backdrop-blur-lg rounded-[24px] lg:rounded-[32px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-4 sm:p-6 lg:p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 animate-fade-in-up h-full min-h-[140px]"
    style={{ animationDelay: delay }}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 sm:p-4 bg-[var(--color-brand-silver-light)] text-[var(--color-luxury-steel)] rounded-2xl border border-white shadow-inner">
        <Icon size={20} strokeWidth={1.5} className="sm:w-6 sm:h-6" />
      </div>
      <div className={`px-2 py-1 rounded-xl flex items-center gap-1 border ${isPositive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
        {isPositive ? <ArrowUp size={12} strokeWidth={2.5} /> : <ArrowDown size={12} strokeWidth={2.5} />}
        <span className="text-[10px] font-bold tracking-wider">{change}</span>
      </div>
    </div>
    <div>
      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
      <p className="text-2xl sm:text-3xl font-black text-[var(--color-luxury-steel)] tracking-tight">{value}</p>
    </div>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white/60 backdrop-blur-lg rounded-[24px] lg:rounded-[40px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-4 sm:p-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
    <div className="flex items-center justify-between mb-10">
      <div>
        <h3 className="text-[12px] font-bold text-[var(--color-luxury-steel)] uppercase tracking-[0.2em]">Live Status</h3>
        <p className="text-[10px] font-medium text-slate-400 mt-1">Check-ins & Alerts</p>
      </div>
      <button className="p-2.5 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100">
        <MoreHorizontal size={20} strokeWidth={1.5} className="text-slate-400" />
      </button>
    </div>
    <div className="space-y-8">
      {[
        { user: 'Sarah Connor', room: 'Suite 402', status: 'Check-in', time: '10:30 AM', active: true, type: 'checkin' },
        { user: 'John Doe', room: 'Deluxe 105', status: 'Check-out', time: '11:15 AM', active: false, type: 'checkout' },
        { user: 'Room 304', room: 'Standard', status: 'Cleaning', time: 'Ongoing', active: true, type: 'cleaning' },
        { user: 'Thomas Muller', room: 'Suite 401', status: 'Pending', time: '12:00 PM', active: false, type: 'pending' },
      ].map((item, i) => (
        <div key={i} className="flex flex-wrap items-center justify-between group cursor-pointer p-3 -mx-3 rounded-2xl hover:bg-white/50 transition-colors gap-y-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[var(--color-brand-silver-light)] to-[var(--color-brand-silver)] border border-white flex items-center justify-center font-bold text-[var(--color-luxury-steel)] text-xs sm:text-sm shadow-inner group-hover:scale-105 transition-transform duration-300">
              {item.user.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div>
              <p className="text-[13px] font-bold text-[var(--color-luxury-steel)] tracking-tight">{item.user}</p>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">{item.room}</p>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className={`text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest mb-1.5 border transition-all ${item.type === 'checkin' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
              item.type === 'cleaning' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                item.active ? 'bg-[var(--color-luxury-steel)] text-white border-[var(--color-luxury-steel)]' : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
              {item.status}
            </div>
            <p className="text-[10px] font-medium text-slate-400">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const Overview = () => {
  const [dateFilter, setDateFilter] = useState('Daily');

  return (
    <div className="space-y-14">
      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
        <StatCard title="TOTAL BOOKINGS" value="1,284" change="+12.5%" isPositive icon={CalendarCheck} delay="0s" />
        <StatCard title="OCCUPANCY RATE" value="85%" change="+4.2%" isPositive icon={Bed} delay="0.1s" />
        <StatCard title="ACTIVE GUESTS" value="216" change="+8.3%" isPositive icon={Users} delay="0.2s" />
        <StatCard title="REVENUE (MTD)" value="$142.5K" change="+18.2%" isPositive icon={TrendingUp} delay="0.3s" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-lg rounded-[24px] lg:rounded-[40px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-4 sm:p-6 lg:p-10 min-h-[400px] sm:min-h-[450px] flex flex-col animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-[12px] font-bold text-[var(--color-luxury-steel)] uppercase tracking-[0.2em]">Revenue Overview</h3>
              <p className="text-[10px] font-medium text-slate-400 mt-1">Performance across all properties</p>
            </div>
            <div className="flex w-full sm:w-auto gap-1 sm:gap-2 bg-[var(--color-brand-silver-light)] p-1.5 rounded-2xl border border-white shadow-inner overflow-x-auto no-scrollbar">
              {['Daily', 'Weekly', 'Monthly'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setDateFilter(filter)}
                  className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 whitespace-nowrap ${dateFilter === filter
                    ? 'bg-white text-[var(--color-luxury-steel)] shadow-sm border border-slate-100'
                    : 'text-slate-400 hover:text-[var(--color-luxury-steel)]'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full mt-8" style={{ minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { name: 'MON', val: 35 }, { name: 'TUE', val: 60 }, { name: 'WED', val: 40 },
                { name: 'THU', val: 75 }, { name: 'FRI', val: 90 }, { name: 'SAT', val: 50 }, { name: 'SUN', val: 70 }
              ]} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 'bold' }} dy={10} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} dx={-10} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', fontSize: '12px', fontWeight: 'bold', color: '#0f172a' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="val" stroke="#64748b" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" activeDot={{ r: 6, fill: '#ffffff', stroke: '#64748b', strokeWidth: 2, shadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <RecentActivity />
      </div>

      {/* Quick Actions / Data Tables Link */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
        {[
          { title: 'New Reservation', subtitle: 'Open calendar view', icon: CalendarCheck, delay: '0.5s' },
          { title: 'Guest Directory', subtitle: 'Manage active stays', icon: Users, delay: '0.6s' },
          { title: 'Room Services', subtitle: 'View cleaning tasks', icon: Clock, delay: '0.7s' },
        ].map((action, i) => (
          <button key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 lg:p-8 bg-white/60 backdrop-blur-lg border border-white rounded-[24px] lg:rounded-[32px] text-left hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group animate-fade-in-up w-full" style={{ animationDelay: action.delay }}>
            <div className="p-4 bg-gradient-to-br from-[var(--color-brand-silver-light)] to-[var(--color-brand-silver)] rounded-2xl group-hover:from-[var(--color-luxury-steel)] group-hover:to-slate-700 group-hover:text-white transition-all duration-500 border border-white shadow-inner">
              <action.icon size={22} strokeWidth={1.5} className="text-[var(--color-luxury-steel)] group-hover:text-white transition-colors" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-[var(--color-luxury-steel)] mb-1">{action.title}</h4>
              <p className="text-[11px] font-medium text-slate-400">{action.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Overview
