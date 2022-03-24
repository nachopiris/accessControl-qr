interface Props {
  text: string;
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function Button({ text, onClick, loading, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`my-3 py-4 text-white mb-6 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 text-center ${
        disabled ? "bg-blue-400" : "bg-blue-700 hover:bg-blue-800"
      }`}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 rounded-full bg-transparent border-2 border-transparent border-opacity-50 inline mr-2"
          style={{ borderRightColor: "black", borderTopColor: "black" }}
          viewBox="0 0 24 24"
        ></svg>
      )}
      {text}
    </button>
  );
}
