const Skeleton = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
        {/* Caja 1 */}
        <div 
          className="bg-gray-900
          rounded-xl px-6 py-20 text-center animate-pulse w-full"
        ></div>
        
        {/* Caja 2 */}
        <div 
          className="bg-gray-900
          rounded-xl px-6 py-20 text-center animate-pulse w-full"
        ></div>
        
        {/* Caja 3 */}
        <div 
          className="bg-gray-900
          rounded-xl px-6 py-20 text-center animate-pulse w-full"
        ></div>
      </div>
    </div>
  );
};

export default Skeleton;