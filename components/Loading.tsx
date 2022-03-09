export default function Loading() {
  return (
    <>
      <svg
        className="animate-spin h-4 w-4 rounded-full bg-transparent border-2 border-transparent border-opacity-50 inline mr-2"
        style={{ borderRightColor: "black", borderTopColor: "black" }}
        viewBox="0 0 24 24"
      ></svg>
      <p className="font-sans font-medium text-lg inline">Cargando</p>
    </>
  );
}
