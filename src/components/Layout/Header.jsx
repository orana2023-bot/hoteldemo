import { Bell, Search, Menu } from 'lucide-react'

const Header = ({ title, onMenuClick }) => {
  return (
    <header className="h-20 sm:h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 md:px-12 flex items-center justify-between sticky top-0 z-40 w-full overflow-hidden shrink-0">
      <div className="flex items-center gap-3 sm:gap-6 md:gap-8 shrink-0">
        <button
          onClick={onMenuClick}
          className="p-2 sm:p-2.5 hover:bg-slate-50 rounded-xl lg:hidden transition-colors border border-transparent active:border-slate-100 shrink-0"
        >
          <Menu size={20} className="text-[var(--color-brand-blue-dark)] sm:w-[22px] sm:h-[22px]" />
        </button>
        <h2 className="text-[9px] sm:text-[10px] font-black text-black uppercase tracking-[0.3em] sm:tracking-[0.4em] truncate max-w-[100px] xs:max-w-[150px] sm:max-w-none">{title}</h2>
      </div>

      <div className="flex items-center gap-1 sm:gap-6 lg:gap-8 justify-end ml-auto min-w-0">
        <div className="hidden md:flex items-center bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-2xl px-5 py-2.5 w-64 lg:w-96 focus-within:bg-white focus-within:shadow-[0_8px_30px_rgba(0,0,0,0.04)] focus-within:ring-2 focus-within:ring-slate-100 transition-all duration-300 group">
          <Search size={16} strokeWidth={2} className="text-slate-400 group-focus-within:text-[var(--color-luxury-steel)] transition-colors" />
          <input 
            type="text" 
            placeholder="Search guests, rooms, or invoices..." 
            className="bg-transparent border-none outline-none focus:ring-0 text-[12px] font-semibold tracking-wide ml-4 w-full text-[var(--color-luxury-steel)] placeholder-slate-400"
          />
          <div className="flex items-center gap-1 bg-slate-100/80 px-2 py-1 rounded-lg border border-slate-200/60 ml-2">
            <span className="text-[9px] font-bold text-slate-400">⌘</span>
            <span className="text-[9px] font-bold text-slate-400">K</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <button className="relative p-2 sm:p-3 hover:bg-slate-50 rounded-2xl transition-all group">
            <Bell size={18} className="text-[var(--color-brand-blue-dark)] sm:w-[20px] sm:h-[20px]" strokeWidth={2} />
            <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--color-brand-blue)] border border-white rounded-full animate-pulse-slow"></span>
          </button>

          <div className="h-8 sm:h-10 w-px bg-slate-100 mx-1 sm:mx-3 hidden xs:block"></div>

          <button className="flex items-center gap-2 sm:gap-4 pl-2 pr-0 sm:pl-3 sm:pr-1 py-1 rounded-2xl hover:bg-slate-50 transition-all group shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-[var(--color-brand-blue-dark)] uppercase tracking-widest">Aditya Jaiswal</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">System Administrator</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[var(--color-brand-blue)] to-[var(--color-brand-blue-dark)] flex items-center justify-center text-white text-[10px] sm:text-xs font-black shadow-lg shadow-[var(--color-brand-blue-light)]">
              AJ
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
