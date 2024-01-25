const Shimmer = () => {
    return (
      <div className="shimmer-container flex flex-wrap gap-4">
        {[...Array(8).keys()].map((index) => (
          <div
            key={index}
            className="shimmer-card w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 border border-black animate-pulse"
          ></div>
        ))}
      </div>
    );
  };
  
  export default Shimmer;
  