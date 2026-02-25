// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {/* Social icons can go here */}
        </div>
        <div className="mt-8 md:mt-0 md:order-1 text-center sm:text-left">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} The Local Briefing. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Built with ❤️ and AI in Englewood, CO.
          </p>
        </div>
      </div>
    </footer>
  );
}
