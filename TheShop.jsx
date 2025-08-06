
// Online Clothes Store - THE SHOP by Diether Lingbanan

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 20,
    stock: 10,
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 60,
    stock: 5,
    rating: 4.8,
    reviews: 8,
  },
  {
    id: 3,
    name: "Black Hoodie",
    price: 45,
    stock: 3,
    rating: 4.2,
    reviews: 20,
  },
];

export default function TheShop() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const route = isLogin ? "/login" : "/signup";
    try {
      const { data } = await axios.post(`http://localhost:3000${route}`, {
        email,
        password,
      });
      if (isLogin) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        alert("Logged in!");
      } else {
        alert("Account created!");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Error occurred");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }
    setCart([]);
    setCheckoutSuccess(true);
    setTimeout(() => setCheckoutSuccess(false), 3000);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-md mx-auto"
      >
        <form onSubmit={handleAuth} className="space-y-4">
          <h2 className="text-2xl font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          <p
            className="text-sm text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "No account? Sign up" : "Have an account? Login"}
          </p>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 max-w-6xl mx-auto"
    >
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        THE SHOP
      </motion.h1>
      <p className="text-gray-600 mb-6">Owned by Diether Lingbanan | Founded 2025</p>

      <Input
        placeholder="Search for clothes..."
        className="mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <img
                  src={`https://source.unsplash.com/featured/?clothes,${product.name}`}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">In Stock: {product.stock}</p>
                <div className="flex items-center text-yellow-500">
                  {[...Array(Math.floor(product.rating))].map((_, i) => (
                    <Star key={i} size={16} fill="gold" />
                  ))}
                  <span className="text-sm text-gray-700 ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-2">Cart ({cart.length})</h2>
        <ul className="list-disc list-inside">
          {cart.map((item, idx) => (
            <li key={idx}>{item.name} - ${item.price}</li>
          ))}
        </ul>
        <Button onClick={handleCheckout} className="mt-4">
          Checkout
        </Button>
        {checkoutSuccess && (
          <motion.p
            className="text-green-600 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Checkout successful!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
