import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$120",
    image:
      "https://images.unsplash.com/photo-1580894894513-677cfc3b4a26?auto=format&fit=crop&w=400&q=80",
    description: "Noise cancelling over-ear headphones with crystal sound.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$95",
    image:
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=400&q=80",
    description: "Fitness tracking with heart rate monitoring and alerts.",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1612810806563-4cf8886881f6?auto=format&fit=crop&w=400&q=80",
    description: "Ergonomic design with customizable RGB lighting.",
  },
];

const ProductCardList = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-indigo-600">
                  {product.price}
                </span>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-xl shadow hover:bg-indigo-700 transition">
                  <ShoppingCart size={18} />
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCardList;
