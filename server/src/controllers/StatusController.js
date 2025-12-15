import { Status } from "../models/index.js";

class StatusController {
  // [GET] show all status
  async showAllStatus(req, res) {
    try {
      const status = await Status.findAll();
      res.status(200).json({ status });
    } catch (error) {
      console.error("Error fetching all status:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // [POST] add status
  async addStatus(req, res) {
    try {
      const statusName = req.body.statusName;

      const status = await Status.create({ statusName });

      return res.status(201).json({ message: "Add Status complete", status });
    } catch (error) {
      console.error("Error creating status:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  //[UPDATE] update status
  async updateStatus(req, res) {
    try {
      const { id } = req.params; // Lấy id từ URL
      const { statusName } = req.body;

      // Cập nhật
      const updated = await Status.update({ statusName }, { where: { id } });

      if (updated) {
        return res.json({ message: "Cập nhật status thành công" });
      } else {
        return res.status(404).json({ message: "Không tìm thấy status này" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  // [DELETE] delete category by id
  async deleteStatus(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Status.destroy({ where: { id } });

      if (deleted) {
        return res.status(200).json({ message: "Đã xóa thành công" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

export default new StatusController();
