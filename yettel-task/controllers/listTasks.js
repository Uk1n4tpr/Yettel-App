const { Task } = require("../models");

const listTasks = async (req, res) => {
  const { page = 1, limit = 10, sort = "desc" } = req.query;
  const offset = (page - 1) * limit;

  try {
    let whereClause = {};
    if (req.user.role === "basic") {
      whereClause = { UserId: req.user.id };
    }

    const tasks = await Task.findAndCountAll({
      where: whereClause,
      order: [["createdAt", sort.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: "User"
    });

    res.status(200).json({
      total: tasks.count,
      page: parseInt(page),
      pages: Math.ceil(tasks.count / limit),
      tasks: tasks.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Greska na serveru" });
  }
};

module.exports = listTasks;
