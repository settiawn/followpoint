export default function SideBarMap({ tenantData, onClose }) {
  return (
    <aside
      style={{ color: "white" }}
      className="fixed top-0 right-0 h-full w-full md:w-96 bg-black bg-opacity-90 p-6 overflow-auto z-50 shadow-lg"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-2xl font-bold mb-6">{tenantData.name}</h2>
      {tenantData ? (
        <div>
          <div className="mb-4">
            <img
              src={tenantData.image}
              alt={tenantData.name}
              className="object-cover w-full h-48 rounded-lg shadow-md"
            />
          </div>
          <p className="text-lg mb-4">{tenantData.description}</p>
        </div>
      ) : (
        <p className="text-center text-gray-400">No tenant selected.</p>
      )}
    </aside>
  );
}
