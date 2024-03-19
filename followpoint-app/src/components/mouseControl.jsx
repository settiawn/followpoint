export default function MouseControl() {
  return (
    <main className="absolute bottom-0 left-0 m-4 p-6 bg-black bg-opacity-80 text-white rounded-lg">
      <h1 className="text-xl font-bold mb-4">Mouse Control</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>Left - Rotate</li>
        <li>Right - Move</li>
        <li>Middle - Zoom</li>
      </ul>
    </main>
  );
}
