const Cart = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-playfair text-center mb-8">Your Cart</h1>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-center text-gray-500 py-8">Your cart is empty</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;