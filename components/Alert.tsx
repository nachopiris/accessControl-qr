interface Props {
  type: string;
  message: string;
}

export default function Error({ type, message }: Props) {
  return (
    <div
      className={`p-4 my-4 text-sm rounded-lg ${
        type === "error"
          ? "text-red-700 bg-red-100"
          : "text-green-700 bg-green-100"
      }`}
      role="alert"
    >
      {message}
    </div>
  );
}
