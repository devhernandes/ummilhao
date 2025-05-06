import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold flex items-center">
            <span className="mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z"
                  stroke="white"
                  strokeWidth="2"
                />
                <path d="M8 10H16M8 14H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            evervault
          </Link>
        </div>
          <Nav />
        {/* Empty div to balance the layout */}
        <div className="w-[100px]"></div>
      </div>
    </header>
  );
}