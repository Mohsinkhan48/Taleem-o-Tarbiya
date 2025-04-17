export const Loader = () => {
  return (
    <svg className="w-10 h-10 animate-spin" viewBox="0 0 50 50">
      <circle
        className="stroke-text"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
      <circle
        className="stroke-secondary"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
        strokeDasharray="100"
        strokeDashoffset="50"
        strokeLinecap="round"
      />
    </svg>
  );
};
