export default function Error({ message }) {
  return (
    <div
      className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      {message}
    </div>
  );
}
