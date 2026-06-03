import { categoryFilters } from '../data/menu.js';

function CategoryFilter() {
  return (
    <section
      className="sticky top-20 z-40 border-y border-[#1a0800]/10 bg-[#fff8fb]/88 px-5 py-3 backdrop-blur-xl sm:px-8"
      aria-label="Menu category shortcuts"
    >
      <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto pb-1">
        {categoryFilters.map((filter) => (
          <a
            className="shrink-0 rounded-full border border-[#1a0800]/12 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1a0800] shadow-sm transition hover:border-[#F9A8D4] hover:bg-[#F9A8D4]"
            href={`#${filter.target}`}
            key={filter.label}
          >
            {filter.label}
          </a>
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter;
