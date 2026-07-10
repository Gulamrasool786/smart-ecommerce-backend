import app from "../src/app.js";
import connectDB from "../src/config/db.js";

const demoProducts = [
  {
    _id: "1",
    title: "Wireless Headphones",
    description: "Premium wireless headphones with clear sound.",
    price: 1999,
    image: "https://m.media-amazon.com/images/I/71CT4h6bDSL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    category: "electronics",
    brand: "SoundMax",
    stock: 20,
    rating: 4.5,
    isActive: true,
  },
  {
    _id: "2",
    title: "Smart Watch",
    description: "Stylish smart watch with fitness tracking.",
    price: 2999,
    image: "https://m.media-amazon.com/images/I/71CT4h6bDSL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    category: "electronics",
    brand: "FitPro",
    stock: 15,
    rating: 4.3,
    isActive: true,
  },
  {
    _id: "3",
    title: "Classic T-Shirt",
    description: "Comfortable cotton t-shirt for daily wear.",
    price: 799,
    image: "https://m.media-amazon.com/images/I/71CT4h6bDSL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    category: "fashion",
    brand: "UrbanWear",
    stock: 50,
    rating: 4.2,
    isActive: true,
  },
  {
    _id: "4",
    title: "Leather Backpack",
    description: "Modern backpack for college, office, and travel.",
    price: 2499,
    image: "https://m.media-amazon.com/images/I/71CT4h6bDSL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    category: "accessories",
    brand: "TravelPro",
    stock: 12,
    rating: 4.6,
    isActive: true,
  },
];

export default async function handler(req, res) {
  try {
    if (process.env.DEMO_MODE === "true") {
      if (req.method === "GET" && req.url.startsWith("/api/products")) {
        const parts = req.url.split("/");
        const id = parts[parts.length - 1]?.split("?")[0];

        if (id && id !== "products") {
          const product = demoProducts.find((item) => item._id === id);

          return res.status(200).json({
            success: true,
            product,
            data: product,
          });
        }

        return res.status(200).json({
          success: true,
          count: demoProducts.length,
          products: demoProducts,
          data: demoProducts,
        });
      }
    }

    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Serverless Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}