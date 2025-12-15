import { Brand } from "../models/index.js";

class BrandsController {
  // [GET] show all brands
  async showAllBrands(req, res) {
    try {
      const brands = await Brand.findAll();
      res.status(200).json({ brands });
    } catch (error) {
      console.error("Error fetching all brands:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // [POST] add brands
  async addBrand(req, res) {
    try {
      const nameBrand = req.body.nameBrand;
      const logo = req.file ? req.file.filename : null; //Nhận file từ req
      const brand = await Brand.create({
        nameBrand: nameBrand,
        logo: logo,
        isActive: 1,
      });
      res.status(201).json({ message: "Add brand complete", brand });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: error.message });
    }
  }
  // [PATCH] update brand
  async updateBrand(req, res) {
    try {
      const { id } = req.params;
      const { nameBrand, isActive } = req.body;
      const logo = req.file ? req.file.filename : null;

      // Chuẩn bị object update, chỉ include những trường có giá trị
      const updateData = {};
      if (nameBrand !== undefined) updateData.nameBrand = nameBrand;
      if (logo !== null) updateData.logo = logo;
      if (isActive !== undefined) updateData.isActive = isActive;

      // Cập nhật
      const [updated] = await Brand.update(updateData, {
        where: { idBrand: id },
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

  // [DELETE] delete brand by id
  async deleteBrand(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Brand.destroy({
        where: { idBrand: id },
      });

      if (deleted) {
        return res.status(200).json({ message: "Đã xóa thành công" });
      }
      return res.status(404).json({ message: "Không tìm thấy brand" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}
export default new BrandsController();
