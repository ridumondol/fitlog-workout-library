'use client';

interface FilterBarProps {
  activeTab: 'today' | 'saved';
  onTabChange: (tab: 'today' | 'saved') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({
  activeTab,
  onTabChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left side: Toggle Tabs */}
      <div className="inline-flex items-center rounded-xl border border-zinc-800 bg-[#121318] p-1 w-fit">
        <button
          onClick={() => onTabChange('today')}
          className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${
            activeTab === 'today'
              ? 'bg-[#1e2029] text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Today’s Plan
        </button>
        <button
          onClick={() => onTabChange('saved')}
          className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${
            activeTab === 'saved'
              ? 'bg-[#1e2029] text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Saved
        </button>
      </div>

      {/* Right side: Sort Dropdown */}
      <div className="flex items-center gap-2.5">
        <span className="text-xs font-medium text-zinc-400">Sort By</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none rounded-xl border border-zinc-800 bg-[#121318] px-4 py-2 pr-9 text-xs font-bold text-white outline-none cursor-pointer hover:border-zinc-700 transition-colors"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}