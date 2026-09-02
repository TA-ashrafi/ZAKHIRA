const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-zakhira-gold/30 border-t-zakhira-gold rounded-full animate-spin mb-4"></div>
        <p className="font-playfair text-zakhira-gold text-lg tracking-widest animate-pulse">
          ZAKHIRA
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-10 h-10 border-4 border-zakhira-gold/30 border-t-zakhira-gold rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
