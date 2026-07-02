require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");


const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

app.use("/api/v1/users", userRoutes);