// src/controllers/UserController.js
import { User } from "../models/index.js";
import { v4 as uuidv4 } from "uuid";

class UserController {
  // Lấy 1 user theo idUser
  async showUserById(req, res) {
    try {
      const { idUser } = req.params;
      const user = await User.findOne({ where: { idUser } });

      return res.status(200).json({ user });
    } catch (error) {
      console.log("Error fetching User:", error);
      return res
        .status(500)
        .json({ message: "server error", error: error.message });
    }
  }

  // Phân trang user
  async showAllUsersByLimit(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const { count, rows } = await User.findAndCountAll({
        offset,
        limit,
      });

      return res.status(200).json({
        users: rows,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      console.log("Error fetching User:", error);
      return res
        .status(500)
        .json({ message: "server error", error: error.message });
    }
  }

  // Lấy tất cả user
  async showAllUsers(req, res) {
    try {
      const users = await User.findAll({});
      return res.status(200).json({ users });
    } catch (error) {
      console.log("Error fetching User:", error);
      return res
        .status(500)
        .json({ message: "server error", error: error.message });
    }
  }
  async createUser(req, res) {
    try {
      let data;

      // Trường hợp ADMIN gửi FormData với field FinalUser
      if (req.body.FinalUser) {
        try {
          data = JSON.parse(req.body.FinalUser);
        } catch (e) {
          return res.status(400).json({ message: "Invalid FinalUser JSON" });
        }
      } else {
        // Client (register) gửi JSON bình thường
        data = req.body; // { fullName, phone, password, ... }
      }

      const fullName = data.fullName;
      const phone = data.phone;
      const password = data.password;
      const email = data.email || "";

      if (!fullName || !phone || !password) {
        return res
          .status(400)
          .json({ message: "Thiếu fullName / phone / password" });
      }

      const idUser =
        data.idUser && data.idUser.startsWith("User-")
          ? data.idUser
          : "User-" + uuidv4();

      const avatarFile = req.file ? req.file.filename : null;

      const user = await User.create({
        idUser,
        fullName,                   // allowNull: false
        email,                      // không để null
        userName: data.userName || phone, // allowNull: false
        password,                   // allowNull: false
        phone,
        role: data.role || "customer",    // allowNull: false
        permissions: data.permissions || "",
        avatar: avatarFile || data.avatar || "",
        addresses: data.addresses || "",
        isVerified:
          data.isVerified !== undefined && data.isVerified !== null
            ? data.isVerified
            : 1,
      });

      return res
        .status(201)
        .json({ message: "Đăng ký thành công! Vui lòng đăng nhập.", user });
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      return res
        .status(500)
        .json({ message: "error server", error: error.message });
    }
  }

  // ĐĂNG NHẬP
  async login(req, res) {
    try {
      const { phone, password } = req.body;

      if (!phone || !password) {
        return res.status(400).json({
          Login: false,
          message: "Thiếu số điện thoại hoặc mật khẩu",
        });
      }

      // hiện tại đang dùng password thường (chưa hash)
      const user = await User.findOne({
        where: { phone: phone, password: password },
      });

      if (!user) {
        return res.status(404).json({
          Login: false,
          message: "Sai số điện thoại hoặc mật khẩu",
        });
      }

      return res.status(200).json({
        Login: true,
        User: user,
      });
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      return res.status(500).json({
        Login: false,
        message: "Lỗi server",
        error: error.message,
      });
    }
  }

  // Cập nhật user (phục vụ phần admin)
  async updateUser(req, res) {
    try {
      let data;

      if (req.body.FinalUser) {
        try {
          data = JSON.parse(req.body.FinalUser);
        } catch (e) {
          return res.status(400).json({ message: "Invalid FinalUser JSON" });
        }
      } else {
        data = req.body;
      }

      const avatarFile = req.file ? req.file.filename : null;

      const user = await User.findOne({ where: { idUser: data.idUser } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.update({
        fullName: data.fullName ?? user.fullName,
        email: data.email ?? user.email,
        userName: data.userName ?? user.userName,
        password: data.password ?? user.password,
        phone: data.phone ?? user.phone,
        role: data.role ?? user.role,
        permissions: data.permissions ?? user.permissions,
        avatar: avatarFile || data.avatar || user.avatar,
        addresses: data.addresses ?? user.addresses,
        isVerified:
          data.isVerified !== undefined && data.isVerified !== null
            ? data.isVerified
            : user.isVerified,
      });

      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    } catch (error) {
      console.log("Error updating User:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }

  // Xoá user
  async deleteUser(req, res) {
    try {
      const { idUser } = req.params;
      await User.destroy({ where: { idUser } });
      return res.status(200).json({ message: "Đã xóa thành công" });
    } catch (error) {
      console.log("Error delete User", error);
      return res
        .status(500)
        .json({ message: "error server", error: error.message });
    }
  }
}

export default new UserController();
