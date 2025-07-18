const db = require("../dbConfig");
const bcrypt = require("bcrypt");


exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, email, phone, age, gender, address, role FROM Users"
    );
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.createUsers = async (req, res) => {
  const { name, email, phone, age, gender, address, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO Users (name, email, phone, age, gender, address, password, role) VALUES (@name, @email, @phone, @age, @gender, @address, @password, @role)`,
      {
        name,
        email,
        phone,
        age,
        gender,
        address,
        password: hashedPassword,
        role,
      }
    );
    res.status(201).send("User created successfully.");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send(err.message);
  }
};


exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "SELECT id, name, email, phone, age, gender, address, role FROM Users WHERE id = @id",
      { id }
    );
    if (result.recordset.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, age, gender, address, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `UPDATE Users SET name = @name, email = @email, phone = @phone, age = @age, gender = @gender, address = @address, password = @password WHERE id = @id`,
      { id, name, email, phone, age, gender, address, password: hashedPassword }
    );
    res.send("User updated successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Users WHERE id = @id", { id });
    res.send("User deleted successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.loginUser = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send("Name and Password are required.");
  }

  try {
    const result = await db.query("select * from Users where name = @name", {
      name,
    });
    const user = result.recordset[0];
    if (!user) {
      return res.status(404).send("User not found.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password.");
    }
    delete user.password;
    res.json(user);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal server error");
  }
};


exports.updateUserRole = async (req, res) => {
  const id = req.params.id;
  const {role} = req.body;
  if (!id) {
    return res.status(400).send("User Id is required");
  }
  if (!["admin", "user"].includes(role)){
    return res.status(400).send("Invalid role");
  }

  try {
    await db.query(`Update Users Set role=@role where id = @id`, { id, role });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
