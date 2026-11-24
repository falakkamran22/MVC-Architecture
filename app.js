const express = require("express");
const app = express();

app.use(express.json());

const studentRoutes = require("./model/controllers/routes/studentRoutes");

app.use("/students", studentRoutes);

// 404 for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler (also catches invalid JSON bodies)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});