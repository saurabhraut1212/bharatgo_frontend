import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Assuming this context handles user auth

interface Order {
  userId: string;
  date: string;
  total: number;
  items: string[];
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      // Fetch orders from localStorage
      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");

      // Filter orders for the current user
      const userOrders = allOrders.filter((order: Order) => order.userId === user.uid);

      setOrders(userOrders);
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <h2 className="font-semibold">Order #{index + 1}</h2>
                <span className="text-gray-500">Date: {order.date}</span>
              </div>
              <div className="mt-2">
                <strong>Total: </strong>${order.total}
              </div>
              <div className="mt-2">
                <strong>Items:</strong>
                <ul className="list-disc pl-4">
                  {order.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
