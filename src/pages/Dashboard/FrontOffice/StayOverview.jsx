import React, { useState } from 'react';
import {
  Plus,
  Search,
  X,
  User,
  Phone,
  Calendar,
  Users as UsersIcon,
  CheckCircle2,
  AlertTriangle,
  Info,
  CreditCard,
  MapPin,
  Clock,
  ChevronRight
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white/60 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-[24px] sm:rounded-[32px] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between h-full min-h-[140px] group hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 animate-fade-in-up">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 sm:p-4 bg-[var(--color-brand-silver-light)] rounded-2xl border border-white shadow-inner ${color} group-hover:scale-105 transition-transform`}>
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

const RoomCard = ({ room, onClick }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'available':
        return 'bg-white/60 backdrop-blur-md text-[var(--color-luxury-steel)] border-white hover:border-slate-200 hover:shadow-lg';
      case 'occupied':
        return 'bg-gradient-to-br from-[var(--color-luxury-steel)] to-[var(--color-luxury-charcoal)] text-white border-transparent hover:opacity-95 shadow-lg';
      case 'maintenance':
        return 'bg-amber-50/80 backdrop-blur-md text-amber-700 border-amber-100 hover:border-amber-300';
      case 'dirty':
        return 'bg-rose-50/80 backdrop-blur-md text-rose-600 border-rose-100 hover:shadow-xl';
      default:
        return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <button
      onClick={() => onClick(room)}
      className={`relative group h-28 sm:h-36 rounded-[32px] border-2 transition-all duration-500 flex flex-col items-center justify-center gap-3 overflow-hidden ${getStatusStyles(room.status)}`}
    >
      {room.status === 'available' && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      )}

      {/* Cleaning Status Badge */}
      <div className={`absolute top-4 left-4 px-2 py-0.5 rounded-lg text-[6px] font-black uppercase tracking-widest ${room.isClean ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
        {room.isClean ? 'Clean' : 'Dirty'}
      </div>

      <span className="text-2xl font-black tracking-tighter transition-transform group-hover:scale-110 duration-500">{room.id}</span>
      <div className="flex flex-col items-center">
        <span className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full ${room.status === 'occupied' ? 'bg-white/10' : 'bg-slate-50'
          }`}>
          {room.type}
        </span>
      </div>
      {room.guest && (
        <div className="absolute inset-x-0 bottom-0 bg-white/5 backdrop-blur-md py-2 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-[8px] font-black uppercase tracking-widest truncate px-4">{room.guest}</p>
        </div>
      )}
    </button>
  );
};

const AddRoomModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ id: '', type: 'Deluxe', floor: 1 });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-[#2d3436]/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in overflow-hidden">
      <div className="bg-white/95 w-full sm:max-w-md rounded-[32px] sm:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-white overflow-hidden flex flex-col animate-slide-up relative">
        <div className="p-6 sm:p-8 border-b border-white/50 flex items-center justify-between bg-white/40">
          <h3 className="text-xl font-black text-[var(--color-luxury-steel)] tracking-tight">Add New Room</h3>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all"><X size={20} className="text-slate-400" /></button>
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Room Number</label>
            <input
              type="text"
              placeholder="e.g. 101"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full px-6 py-4 bg-white/50 border border-white rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all text-[var(--color-luxury-steel)]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Room Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-6 py-4 bg-white/50 border border-white rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all text-[var(--color-luxury-steel)]"
            >
              <option>Deluxe</option>
              <option>Single</option>
              <option>Double</option>
              <option>Suite</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Floor Number</label>
            <input
              type="number"
              value={formData.floor}
              onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
              className="w-full px-6 py-4 bg-white/50 border border-white rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all text-[var(--color-luxury-steel)]"
            />
          </div>
        </div>
        <div className="p-6 sm:p-8 bg-white/40 border-t border-white/50 flex flex-row gap-4">
          <button onClick={onClose} className="flex-1 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[var(--color-luxury-steel)] transition-colors">Cancel</button>
          <button
            onClick={() => onAdd(formData)}
            className="flex-[2] py-4 bg-[var(--color-luxury-steel)] text-white rounded-3xl text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-slate-700 transition-all active:scale-[0.98]"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ room, isOpen, onClose, onConfirm }) => {
  if (!room || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#2d3436]/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in">
      <div className="bg-white/95 border border-white w-full sm:max-w-2xl max-h-[90vh] rounded-[32px] sm:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col animate-slide-up">

        {/* Mobile close button (Top Right) */}
        <div className="sm:hidden flex justify-end p-4 bg-gradient-to-br from-[var(--color-luxury-steel)] to-[var(--color-luxury-charcoal)]">
          <button onClick={onClose} className="p-2 bg-white/10 rounded-xl">
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Simplified Header with Room Context */}
        <div className="p-6 sm:p-10 bg-gradient-to-br from-[var(--color-luxury-steel)] to-[var(--color-luxury-charcoal)] text-white flex items-center justify-between relative overflow-hidden shrink-0 border-b border-slate-700/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="relative z-10 flex items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
              <Hotel size={24} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Register Guest</p>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">Room {room.id} • <span className="text-slate-400 font-bold">{room.type}</span></h3>
            </div>
          </div>
          <button onClick={onClose} className="relative z-10 p-3 hover:bg-white/10 rounded-xl transition-all hidden sm:block">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 sm:space-y-8 no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Guest Name</label>
              <div className="relative group">
                <User size={18} strokeWidth={1.5} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-luxury-steel)] transition-colors" />
                <input type="text" placeholder="John Doe" className="w-full pl-14 pr-6 py-4 bg-white/50 border border-white rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all text-[var(--color-luxury-steel)]" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Mobile</label>
              <div className="relative group">
                <Phone size={18} strokeWidth={1.5} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-luxury-steel)] transition-colors" />
                <input type="tel" placeholder="+1 000 000" className="w-full pl-14 pr-6 py-4 bg-white/50 border border-white rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all text-[var(--color-luxury-steel)]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Check-in</label>
              <input type="date" className="w-full px-6 py-4 bg-white/50 border border-white rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all text-[var(--color-luxury-steel)]" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Check-out</label>
              <input type="date" className="w-full px-6 py-4 bg-white/50 border border-white rounded-3xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all text-[var(--color-luxury-steel)]" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Occupancy Type</label>
            <select className="w-full px-6 py-4 bg-white/50 border border-white rounded-3xl text-sm font-bold appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all text-[var(--color-luxury-steel)]">
              <option>Single</option>
              <option>Double</option>
              <option>Family</option>
            </select>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-6 sm:p-8 bg-white/40 border-t border-white/50 flex flex-row gap-4 shrink-0">
          <button onClick={onClose} className="flex-1 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[var(--color-luxury-steel)] transition-colors">
            Cancel
          </button>
          <button onClick={() => onConfirm(room.id)} className="flex-[2] py-4 bg-[var(--color-luxury-steel)] text-white text-[10px] font-bold uppercase tracking-widest rounded-3xl hover:bg-slate-700 shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            Confirm Registration <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

const StayOverview = () => {
  const [roomsByFloor, setRoomsByFloor] = useState([
    {
      floor: 1,
      rooms: [
        { id: 101, type: 'Deluxe', status: 'available', isClean: true },
        { id: 102, type: 'Single', status: 'occupied', guest: 'John Doe', isClean: true },
        { id: 103, type: 'Double', status: 'available', isClean: false },
        { id: 104, type: 'Suite', status: 'maintenance', isClean: true },
        { id: 105, type: 'Deluxe', status: 'available', isClean: true },
        { id: 106, type: 'Single', status: 'occupied', guest: 'Sarah Connor', isClean: false },
      ]
    },
    {
      floor: 2,
      rooms: [
        { id: 201, type: 'Suite', status: 'available', isClean: true },
        { id: 202, type: 'Double', status: 'maintenance', isClean: true },
        { id: 203, type: 'Deluxe', status: 'occupied', guest: 'Ellen Ripley', isClean: true },
        { id: 204, type: 'Single', status: 'available', isClean: false },
      ]
    }
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [activeFloorForNewRoom, setActiveFloorForNewRoom] = useState(1);
  const [floorFilter, setFloorFilter] = useState('All');

  const handleRoomClick = (room) => {
    if (room.status === 'available') {
      setSelectedRoom(room);
      setIsBookingModalOpen(true);
    }
  };

  const handleBookingConfirm = (roomId) => {
    setRoomsByFloor(prev => prev.map(floorData => ({
      ...floorData,
      rooms: floorData.rooms.map(room =>
        room.id === roomId ? { ...room, status: 'occupied', guest: 'New Guest', isClean: true } : room
      )
    })));
    setIsBookingModalOpen(false);
  };

  const handleAddRoom = (newRoomData) => {
    setRoomsByFloor(prev => {
      // Check if floor exists
      const floorExists = prev.some(f => f.floor === newRoomData.floor);
      if (floorExists) {
        return prev.map(floorData => {
          if (floorData.floor === newRoomData.floor) {
            return {
              ...floorData,
              rooms: [...floorData.rooms, { id: parseInt(newRoomData.id), type: newRoomData.type, status: 'available' }]
            };
          }
          return floorData;
        });
      } else {
        // Create new floor
        return [...prev, {
          floor: newRoomData.floor,
          rooms: [{ id: parseInt(newRoomData.id), type: newRoomData.type, status: 'available', isClean: true }]
        }].sort((a, b) => a.floor - b.floor);
      }
    });
    setIsAddRoomModalOpen(false);
  };

  const filteredFloors = floorFilter === 'All'
    ? roomsByFloor
    : roomsByFloor.filter(f => f.floor === parseInt(floorFilter));

  return (
    <div className="space-y-12 sm:space-y-20 pb-20">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-luxury-steel)] tracking-tighter">Stay Overview</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Live Occupancy & Room Control</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex w-full sm:w-auto bg-[var(--color-brand-silver-light)] p-1.5 rounded-2xl border border-white shadow-inner overflow-x-auto no-scrollbar">
            {['All', '1', '2', '3'].map(floor => (
              <button
                key={floor}
                onClick={() => setFloorFilter(floor)}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${floorFilter === floor ? 'bg-white text-[var(--color-luxury-steel)] shadow-sm border border-slate-100' : 'text-slate-400 hover:text-[var(--color-luxury-steel)]'
                  }`}
              >
                {floor === 'All' ? 'All Floors' : `Floor ${floor}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
        <StatCard label="Total Rooms" value="10" icon={Hotel} color="text-[var(--color-luxury-steel)]" />
        <StatCard label="Available" value="06" icon={CheckCircle2} color="text-emerald-600" />
        <StatCard label="Occupied" value="03" icon={UsersIcon} color="text-indigo-600" />
        <StatCard label="Maintenance" value="01" icon={AlertTriangle} color="text-amber-600" />
      </div>

      <div className="space-y-12 sm:space-y-16">
        {filteredFloors.map((floorData) => (
          <div key={floorData.floor} className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 border-l-4 border-[var(--color-luxury-steel)] py-1 sm:py-2 gap-4">
              <div>
                <h3 className="text-sm font-black text-[var(--color-luxury-steel)] uppercase tracking-[0.2em]">Floor {floorData.floor}</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Management of {floorData.rooms.length} units</p>
              </div>
              <button
                onClick={() => {
                  setActiveFloorForNewRoom(floorData.floor);
                  setIsAddRoomModalOpen(true);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-md border border-white shadow-sm text-[var(--color-luxury-steel)] hover:bg-white rounded-2xl text-[9px] font-bold uppercase tracking-widest transition-all active:scale-[0.98]"
              >
                <Plus size={16} strokeWidth={1.5} /> New Room
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
              {floorData.rooms.map((room) => (
                <RoomCard key={room.id} room={room} onClick={handleRoomClick} />
              ))}
              <button
                onClick={() => {
                  setActiveFloorForNewRoom(floorData.floor);
                  setIsAddRoomModalOpen(true);
                }}
                className="h-28 sm:h-36 rounded-[24px] sm:rounded-[32px] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-[var(--color-luxury-steel)] hover:border-[var(--color-luxury-steel)] transition-all group bg-white/30 backdrop-blur-md"
              >
                <Plus size={28} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Add Room</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Legend */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 py-8 sm:py-10 border-t border-slate-200/50">
        <div className="flex items-center gap-3 px-5 py-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
          <span className="text-[9px] font-bold text-[var(--color-luxury-steel)] uppercase tracking-widest">Available</span>
        </div>
        <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-[var(--color-luxury-steel)] to-[var(--color-luxury-charcoal)] rounded-2xl shadow-lg border border-transparent">
          <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
          <span className="text-[9px] font-bold text-white uppercase tracking-widest">Occupied</span>
        </div>
        <div className="flex items-center gap-3 px-5 py-3 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]"></div>
          <span className="text-[9px] font-bold text-[var(--color-luxury-steel)] uppercase tracking-widest">Maintenance</span>
        </div>
      </div>

      <BookingModal
        room={selectedRoom}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirm={handleBookingConfirm}
      />

      <AddRoomModal
        isOpen={isAddRoomModalOpen}
        onClose={() => setIsAddRoomModalOpen(false)}
        onAdd={handleAddRoom}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
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

// Internal Import for Hotel icon since I missed it in the block
const Hotel = ({ size, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 18 0" /><path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14" /><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" /><path d="M10 9h4" /><path d="M10 13h4" /></svg>
);

export default StayOverview;
