import { createContext, useState, useEffect } from 'react';
import cartService from '../services/cart.service';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from backend if authenticated, or localStorage if guest
  const fetchCart = async () => {
    if (isAuthenticated) {
      setLoading(true);
      try {
        const res = await cartService.getCart();
        if (res.success && res.data) {
          const items = (res.data.items || []).map((item) => ({
            product: item.product,
            quantity: item.quantity,
          }));
          setCartItems(items);
        }
      } catch (err) {
        console.error('Failed to fetch cart', err);
      } finally {
        setLoading(false);
      }
    } else {
      const saved = localStorage.getItem('zakhira_guest_cart');
      if (saved) {
        try {
          setCartItems(JSON.parse(saved));
        } catch (e) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  // Sync guest cart to localstorage
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('zakhira_guest_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const addToCart = async (product, quantity = 1) => {
    const productId = typeof product === 'object' ? product._id : product;
    if (isAuthenticated) {
      try {
        const res = await cartService.addToCart(productId, quantity);
        if (res.success) {
          await fetchCart();
          toast.success('Added to cart!');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Could not add to cart');
      }
    } else {
      setCartItems((prev) => {
        const existing = prev.find(
          (item) => (item.product?._id || item.product) === productId
        );
        if (existing) {
          return prev.map((item) =>
            (item.product?._id || item.product) === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, quantity }];
      });
      toast.success('Added to cart!');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    if (isAuthenticated) {
      try {
        const res = await cartService.updateCartItem(productId, quantity);
        if (res.success) {
          await fetchCart();
        }
      } catch (err) {
        toast.error('Failed to update quantity');
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          (item.product?._id || item.product) === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        const res = await cartService.removeFromCart(productId);
        if (res.success) {
          await fetchCart();
          toast.success('Item removed');
        }
      } catch (err) {
        toast.error('Failed to remove item');
      }
    } else {
      setCartItems((prev) =>
        prev.filter((item) => (item.product?._id || item.product) !== productId)
      );
      toast.success('Item removed');
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await cartService.clearCart();
        setCartItems([]);
      } catch (err) {
        console.error('Failed to clear cart');
      }
    } else {
      setCartItems([]);
      localStorage.removeItem('zakhira_guest_cart');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
