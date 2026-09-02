import { createContext, useState, useEffect } from 'react';
import wishlistService from '../services/wishlist.service';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (isAuthenticated) {
      setLoading(true);
      try {
        const res = await wishlistService.getWishlist();
        if (res.success && res.data) {
          setWishlistItems(res.data.products || []);
        }
      } catch (err) {
        console.error('Failed to fetch wishlist', err);
      } finally {
        setLoading(false);
      }
    } else {
      const saved = localStorage.getItem('zakhira_guest_wishlist');
      if (saved) {
        try {
          setWishlistItems(JSON.parse(saved));
        } catch (e) {
          setWishlistItems([]);
        }
      } else {
        setWishlistItems([]);
      }
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('zakhira_guest_wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isAuthenticated]);

  const addToWishlist = async (product) => {
    const productId = typeof product === 'object' ? product._id : product;

    if (isInWishlist(productId)) {
      toast.error('Item is already in your wishlist');
      return;
    }

    if (isAuthenticated) {
      try {
        const res = await wishlistService.addToWishlist(productId);
        if (res.success) {
          await fetchWishlist();
          toast.success('Added to Wishlist!');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Could not add to wishlist');
      }
    } else {
      setWishlistItems((prev) => [...prev, product]);
      toast.success('Added to Wishlist!');
    }
  };

  const removeFromWishlist = async (productId) => {
    if (isAuthenticated) {
      try {
        const res = await wishlistService.removeFromWishlist(productId);
        if (res.success) {
          await fetchWishlist();
          toast.success('Removed from Wishlist');
        }
      } catch (err) {
        toast.error('Failed to remove from wishlist');
      }
    } else {
      setWishlistItems((prev) =>
        prev.filter((item) => (typeof item === 'object' ? item._id : item) !== productId)
      );
      toast.success('Removed from Wishlist');
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => (typeof item === 'object' ? item._id : item) === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
