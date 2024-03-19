export default function SideBarMap({ tenantData, onClose }) {
  return (
    <aside className="fixed top-0 right-0 h-full w-64 bg-black bg-opacity-80 text-white p-4 overflow-auto z-10">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-transparent text-white rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-xl font-bold mb-4">Tenant Details</h2>
      {tenantData ? (
        <div>
          <p className="mb-2">
            <strong>Name:</strong> {tenantData.name}
          </p>
        </div>
      ) : (
        <p>No tenant selected.</p>
      )}
    </aside>
  );
}
