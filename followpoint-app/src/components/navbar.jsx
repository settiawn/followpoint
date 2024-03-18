import DropdownSidebar from "./sidebar";

export default function Navbar() {
  return (
    <nav className="bg-[rgba(27,29,34,1)] text-white p-4">
      <div className="container mx-auto flex items-center">
        <img
          src="/Banner-Render-Concept.png"
          alt="Logo"
          className="w-20 h-auto"
        />
        <div className="flex-grow"></div>
        <div>
          <DropdownSidebar />
        </div>
      </div>
    </nav>
  );
}
