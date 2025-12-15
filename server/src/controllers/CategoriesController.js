import { Category } from "../models/index.js";

class CategoriesController {
  // [GET] show all categories
  async showALLCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({ categories });
    } catch (error) {
      console.error("Error fetching all categories:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
  // [POST] add category
  async addCategory(req, res) {
    try {
      const nameCategory = req.body.nameCategory;
      const logo = req.file ? req.file.filename : null; //Nhận file từ req

      const category = await Category.create({
        nameCategory: nameCategory,
        logo: logo,
      });
      res.status(201).json({ message: "Add Category complete", category });
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: error.message });
    }
  }
  //[UPDATE] update Category
  async updateCategory(req, res) {
    try {
      const { id } = req.params; // Lấy id từ URL
      const { nameCategory, isActive } = req.body;
      const logo = req.file ? req.file.filename : null; //Nhận file từ req

      // Chuẩn bị object update, chỉ include những trường có giá trị
      const updateData = {};
      if (nameCategory !== undefined) updateData.nameCategory = nameCategory;
      if (logo !== null) updateData.logo = logo;
      if (isActive !== undefined) updateData.isActive = isActive;

      // Cập nhật
      const [updated] = await Category.update(updateData, {
        where: { idCate: id },
      });

      if (updated) {
        return res.json({ message: "Cập nhật brand thành công" });
      } else {
        return res.status(404).json({ message: "Không tìm thấy brand này" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  // [DELETE] delete category by id
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Category.destroy({
        where: { idCate: id },
      });

      if (deleted) {
        return res.status(200).json({ message: "Đã xóa thành công" });
      }
      return res.status(404).json({ message: "Không tìm thấy category này" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

export default new CategoriesController();
