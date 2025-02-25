// SQL Database Example
export const sqlDatabase = {
  type: "sql",
  tables: {
    users: {
      columns: ["id", "name", "email", "role", "status"],
      rows: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
      ],
    },
    products: {
      columns: ["id", "name", "price", "category", "stock"],
      rows: [
        { id: 1, name: "Laptop", price: 999.99, category: "Electronics", stock: 50 },
        { id: 2, name: "Desk Chair", price: 199.99, category: "Furniture", stock: 30 },
        { id: 3, name: "Coffee Maker", price: 79.99, category: "Appliances", stock: 25 },
      ],
    },
  },
}

// MongoDB Database Example
export const mongoDatabase = {
  type: "nosql",
  collections: {
    users: {
      documents: [
        {
          _id: "user1",
          name: "John Doe",
          email: "john@example.com",
          profile: {
            age: 30,
            location: "New York",
            interests: ["technology", "sports"],
          },
          orders: [
            { orderId: "ord1", total: 299.99, date: "2024-02-25" },
            { orderId: "ord2", total: 199.99, date: "2024-02-24" },
          ],
          createdAt: "2024-02-20T10:00:00Z",
          status: "active",
        },
        {
          _id: "user2",
          name: "Jane Smith",
          email: "jane@example.com",
          profile: {
            age: 25,
            location: "San Francisco",
            interests: ["design", "travel"],
          },
          orders: [{ orderId: "ord3", total: 499.99, date: "2024-02-23" }],
          createdAt: "2024-02-21T15:30:00Z",
          status: "active",
        },
      ],
    },
    products: {
      documents: [
        {
          _id: "prod1",
          name: "Gaming Laptop",
          price: 1299.99,
          specs: {
            cpu: "Intel i7",
            ram: "16GB",
            storage: "1TB SSD",
          },
          categories: ["electronics", "gaming"],
          variants: [
            { color: "black", stock: 10 },
            { color: "silver", stock: 5 },
          ],
          ratings: [
            { userId: "user1", rating: 5, review: "Great laptop!" },
            { userId: "user2", rating: 4, review: "Good performance" },
          ],
          lastUpdated: "2024-02-25T12:00:00Z",
        },
        {
          _id: "prod2",
          name: "Wireless Mouse",
          price: 49.99,
          specs: {
            connectivity: "Bluetooth",
            battery: "Rechargeable",
            dpi: "16000",
          },
          categories: ["electronics", "accessories"],
          variants: [
            { color: "black", stock: 20 },
            { color: "white", stock: 15 },
          ],
          ratings: [{ userId: "user2", rating: 5, review: "Perfect for gaming" }],
          lastUpdated: "2024-02-24T14:30:00Z",
        },
      ],
    },
    orders: {
      documents: [
        {
          _id: "ord1",
          userId: "user1",
          items: [
            {
              productId: "prod1",
              quantity: 1,
              price: 1299.99,
              variant: "black",
            },
            {
              productId: "prod2",
              quantity: 2,
              price: 49.99,
              variant: "black",
            },
          ],
          shipping: {
            address: {
              street: "123 Main St",
              city: "New York",
              state: "NY",
              zip: "10001",
            },
            method: "express",
            cost: 15.99,
          },
          payment: {
            method: "credit_card",
            status: "completed",
            total: 1415.96,
          },
          status: "delivered",
          createdAt: "2024-02-23T09:00:00Z",
          updatedAt: "2024-02-25T14:00:00Z",
        },
      ],
    },
  },
}

