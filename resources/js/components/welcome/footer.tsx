export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-20">

        
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}