import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
}

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="border p-4 rounded-lg shadow-md cursor-pointer"
      onClick={() => onClick(product)}
    >
      <img
        src={product.images?.[0] || "https://via.placeholder.com/150"}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-500 text-sm">{product.category?.name || "No Category"}</p>
      <p className="text-gray-600 font-bold">${product.price}</p>
    </div>
  );
};

export default ProductCard;
