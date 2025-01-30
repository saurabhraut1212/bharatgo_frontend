import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: { name: string };
}

const Home: React.FC = () => {
  const { category } = useParams<{ category: string }>();  // Get the category from URL
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // State for filtered products
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // To hold the product details for modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // For modal visibility
  const [searchQuery, setSearchQuery] = useState<string>(''); // State to store the search query

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        if (category && category !== 'all') {
          setProducts(data.filter(product => product.category.name.toLowerCase() === category.toLowerCase()));
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);  // Re-fetch when category changes

  useEffect(() => {
    // Filter products based on the search query
    if (searchQuery.trim() === '') {
      setFilteredProducts(products); // If no search, show all products
    } else {
      setFilteredProducts(
        products.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]); // Re-filter whenever searchQuery or products change

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true); // Open the modal when product is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const addToCart = (product: Product) => {
    // Placeholder function for adding product to cart
    console.log('Added to cart:', product);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by product title..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleProductClick(product)}>
            <img
              src={product.images?.[0] || 'https://via.placeholder.com/150'}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-500 text-sm">{product.category?.name || 'No Category'}</p>
            <p className="text-gray-600 font-bold">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Modal for detailed product view */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">{selectedProduct.title}</h2>
            <img
              src={selectedProduct.images?.[0] || 'https://img.freepik.com/premium-vector/no-data-concept-illustration_634196-28497.jpg?w=740'}
              alt={selectedProduct.title}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600 mb-4">{selectedProduct.category?.name}</p>
            <p className="text-gray-800 text-lg mb-4">{selectedProduct.price}</p>
            <button
              onClick={() => addToCart(selectedProduct)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mb-4 w-full"
            >
              Add to Cart
            </button>
            <button
              onClick={closeModal}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
