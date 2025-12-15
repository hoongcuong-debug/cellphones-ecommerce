import { Role } from "../models/index.js";

class RoleController {
  // [GET] show all Role
  async showAllRole(req, res) {
    try {
      const role = await Role.findAll();
      res.status(200).json({ role });
    } catch (error) {
      console.error("Error fetching all Role:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // [POST] add Role
  async addRole(req, res) {
    try {
      const { roleName, permissions } = req.body;

      const role = await Role.create({ roleName, permissions });

      return res.status(201).json({ message: "Add Role complete", role });
    } catch (error) {
      console.error("Error creating Role:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  //[UPDATE] update Role
  async updateRole(req, res) {
    try {
      const { id } = req.params; // Lấy id từ URL
      const { roleName, permissions } = req.body;

      // Cập nhật
      const updated = await Role.update(
        { roleName, permissions },
        { where: { id } }
      );

      if (updated) {
        return res.json({ message: "Cập nhật Role thành công" });
      } else {
        return res.status(404).json({ message: "Không tìm thấy Role này" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  // [DELETE] delete category by id
  async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Role.destroy({ where: { id } });

      if (deleted) {
        return res.status(200).json({ message: "Đã xóa thành công" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

export default new RoleController();
