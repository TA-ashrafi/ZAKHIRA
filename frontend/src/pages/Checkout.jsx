const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-playfair text-center mb-8">Checkout</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input type="text" className="w-full px-4 py-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Address</label>
              <input type="text" className="w-full px-4 py-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input type="tel" className="w-full px-4 py-2 border rounded" required />
            </div>
            <button type="submit" className="w-full bg-zakhira-gold text-white py-3 rounded hover:bg-opacity-90 transition">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
