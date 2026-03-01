import CatItems from "./CatItems";

const ResCat = ({ data, show, setShowIndex }) => {
  const handleclick = () => {
    setShowIndex();
  };

  return (
    <div className="border-b border-slate-border">
      <div
        className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-50 transition-colors px-2 rounded"
        onClick={handleclick}
      >
        <h3 className="text-base font-bold text-slate-title">
          {data.title} ({data.itemCards.length})
        </h3>
        <svg
          className={`w-5 h-5 text-slate-body transition-transform duration-300 ${
            show ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          show ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <CatItems items={data.itemCards} />
      </div>
    </div>
  );
};

export default ResCat;
