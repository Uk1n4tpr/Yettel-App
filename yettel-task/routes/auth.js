const { Router } = require("express");
const router = Router();

const authUser = require("../controllers/authUser");
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/loginUser");
const createTask = require("../controllers/createTask");
const listTasks = require("../controllers/listTasks");
const updateUser = require("../controllers/updateUser");
const updateTask = require("../controllers/updateTask");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Routes that require authentication
router.post("/create-task", authUser, createTask);
router.get("/tasks", authUser, listTasks);
router.put('/update-user/:id', authUser, updateUser);
router.put("/update-task/:id", authUser, updateTask);

module.exports = router;
