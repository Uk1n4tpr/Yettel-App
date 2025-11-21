const User = require("./user");
const Task = require("./task");

// Postavljanje veza
User.hasMany(Task, { foreignKey: "UserId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "UserId" });

module.exports = { User, Task };
