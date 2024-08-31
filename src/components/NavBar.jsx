const NavBar = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-green-600 to-orange-500 text-white text-center py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Country list with Flags </h1>
          <p className="text-lg mt-4">
            A curated collection of all country flags in SVG — plus the CSS for easier integration.
          </p>
           
          <pre className="bg-black bg-opacity-30 p-2 mx-auto mt-3 rounded max-w-sm">
            yarn add flag-icons
          </pre>
          <p className="mt-4">For more instructions, check out on GitHub.</p>
          
        </div>
      </div>

       
    </div>
  );
};

export default NavBar;
