import { MouseEventHandler } from "react";

interface Props {
  text: string;
  onClick: MouseEventHandler;
}

export default function Button({ text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="my-3 p-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
    >
      {text}
    </button>
  );
}
