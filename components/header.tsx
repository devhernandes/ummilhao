import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold flex items-center">
            <img src="/logo1milhaobits.svg" alt="Logo 1MilhãoBits" width="290" height="50" />
          </Link>
        </div>
          <Nav />
        {/* Empty div to balance the layout */}
        <div className="w-[100px]"></div>
      </div>
    </header>
  );
}