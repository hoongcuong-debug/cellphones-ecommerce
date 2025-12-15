import {
  Product,
  Brand,
  Category,
  ProductSpec,
  ProductImage,
} from "../models/index.js"; // file /models/index.js là nơi thiết lập quan hệ(associations) sự phụ thuộc khóa chính khóa ngoại với sequelize

class ProductController {
  // [GET] show product by slug
  async showOneProductBySlug(req, res) {
    try {
      const { slug } = req.params;
      const product = await Product.findOne({
        where: { slug }, // truy vấn từ slug nhận vào

        include: [
          {
            model: Brand,
            as: "brand",
            attributes: ["nameBrand"], // show ra cột nameBrand
          },
          {
            model: Category,
            as: "category",
            attributes: ["nameCategory"],
          },
          {
            model: ProductSpec,
            as: "specs",
            attributes: [
              "id",
              "productId",
              "screenSize",
              "screenTechnology",
              "rearCamera",
              "frontCamera",
              "chipset",
              "internalMemory",
              "battery",
              "operatingSystem",
              "screenResolution",
              "screenFeatures",
              "cpuType",
              "compatibility",
              "quantity",
            ],
          },
          {
            model: ProductImage,
            as: "images",
            attributes: ["imageUrl"],
          },
        ],
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ product });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  //[GET] show all products
  async showAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Brand,
            as: "brand",
            attributes: ["nameBrand"], // show ra cột nameBrand
          },
          {
            model: Category,
            as: "category",
            attributes: ["nameCategory"],
          },
          {
            model: ProductSpec,
            as: "specs",
            attributes: [
              "id",
              "productId",
              "screenSize",
              "screenTechnology",
              "rearCamera",
              "frontCamera",
              "chipset",
              "internalMemory",
              "battery",
              "operatingSystem",
              "screenResolution",
              "screenFeatures",
              "cpuType",
              "compatibility",
              "quantity",
            ],
          },
          {
            model: ProductImage,
            as: "images",
            attributes: ["imageUrl"],
          },
        ],
      });

      if (!products) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ products });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // [GET] show products by page and limit
  async showProductsByLimit(req, res) {
    const page = parseInt(req.query.page) || 1; // trang hiện tại
    const limit = parseInt(req.query.limit) || 10; // số bản ghi trên 1 trang
    const offset = (page - 1) * limit; // bỏ qua bao nhiêu bản ghi

    try {
      const { count, rows } = await Product.findAndCountAll({
        offset: offset,
        limit: limit,
        include: [
          {
            model: Brand,
            as: "brand",
            attributes: ["nameBrand"], // show ra cột nameBrand
          },
          {
            model: Category,
            as: "category",
            attributes: ["nameCategory"],
          },
          {
            model: ProductSpec,
            as: "specs",
            attributes: { exclude: ["id", "productId"] },
          },
          {
            model: ProductImage,
            as: "images",
            attributes: ["imageUrl"],
          },
        ],
      });
      res.status(200).json({
        products: rows,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      console.error("Error fetching all products:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // [POST] create new product
  async createProduct(req, res) {
    // Đảm bảo key trùng với formData frontend gửi
    const data = JSON.parse(req.body.FinalProduct);

    // Lấy thumbnail (1 file)
    const thumbnailFile = req.files["thumbnailPath"]?.[0];
    const thumbnailPath = thumbnailFile ? `${thumbnailFile.filename}` : null;

    // Lấy images (tối đa 10)
    const imagesFile = req.files ? req.files["imagesFile"] : [];
    const images = (imagesFile || []).map((file) => ({
      imageUrl: `${file.filename}`,
    }));

    try {
      const {
        idProduct,
        nameProduct,
        slug,
        categoryId,
        brandId,
        price,
        originalPrice,
        discountPercent,
        shortDesc,
        description,
        isFeatured,
        status,
        allowInstallment,
        allowOnlinePrice,
      } = data;

      // Kiểm tra các trường bắt buộc
      if (!nameProduct || !slug || !categoryId || !brandId || !price) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const product = await Product.create(
        {
          idProduct: "PROD-" + idProduct,
          nameProduct: nameProduct.trim().replace(/\s+/g, " "),
          slug,
          categoryId,
          brandId,
          price,
          originalPrice,
          discountPercent: discountPercent || 0,
          thumbnail: thumbnailPath || null,
          shortDesc: shortDesc || null,
          description: description || null,
          isFeatured: isFeatured ? 1 : 0,
          status: status || "active",
          allowInstallment: allowInstallment ? 1 : 0,
          allowOnlinePrice: allowOnlinePrice ? 1 : 0,
          createdAt: new Date(),
          updatedAt: new Date(),

          // Tạo images kèm product
          images: images,

          // Tạo specs kèm product
          specs:
            data.specs.map((s) => ({
              productId: data.idProduct, // phải trùng idProduct vừa tạo
              screenSize: s.screenSize,
              screenTechnology: s.screenTechnology,
              rearCamera: s.rearCamera,
              frontCamera: s.frontCamera,
              chipset: s.chipset,
              internalMemory: s.internalMemory,
              battery: s.battery,
              operatingSystem: s.operatingSystem,
              screenResolution: s.screenResolution,
              screenFeatures: s.screenFeatures,
              cpuType: s.cpuType,
              compatibility: s.compatibility,
              quantity: s.quantity,
            })) || [],
        },
        {
          include: [
            { model: ProductImage, as: "images" },
            { model: ProductSpec, as: "specs" },
          ],
        }
      );

      res.status(201).json({ message: "Product created", product });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // [PATCH] update product by slug
  async updateProduct(req, res) {
    console.log(">>> req.body:", req.body);
    console.log(">>> req.files:", req.files);

    // Parse FinalProduct
    const data = JSON.parse(req.body.FinalProduct);

    const thumbnailFile = req.files["thumbnailPath"]?.[0];
    const thumbnailPath = thumbnailFile ? `${thumbnailFile.filename}` : null;

    // Lấy images (tối đa 10)
    const imagesFile = req.files ? req.files["imagesFile"] : [];
    const images = (imagesFile || []).map((file) => ({
      imageUrl: `${file.filename}`,
    }));

    try {
      const { idProduct } = req.params;

      const {
        nameProduct,
        slug,
        categoryId,
        brandId,
        price,
        originalPrice,
        discountPercent,
        shortDesc,
        description,
        isFeatured,
        status,
        allowInstallment,
        allowOnlinePrice,
        specs,
        thumbnail,
      } = data;

      // UPDATE bảng Product
      await Product.update(
        {
          nameProduct: nameProduct?.trim() || null,
          slug,
          categoryId,
          brandId,
          price,
          originalPrice,
          discountPercent: discountPercent || 0,
          shortDesc: shortDesc || null,
          description: description || null,
          isFeatured: isFeatured ? 1 : 0,
          status: status || "available",
          allowInstallment: allowInstallment ? 1 : 0,
          allowOnlinePrice: allowOnlinePrice ? 1 : 0,
          thumbnail: thumbnailPath || thumbnail || null,
          updatedAt: new Date(),
        },
        { where: { idProduct } }
      );

      // UPDATE ProductImage
      if (images && images.length > 0) {
        await ProductImage.destroy({ where: { productId: idProduct } });
        await ProductImage.bulkCreate(
          images.map((img) => ({
            productId: idProduct,
            imageUrl: img.imageUrl,
          }))
        );
      }

      // UPDATE ProductSpec
      if (specs && specs.length > 0) {
        await ProductSpec.destroy({ where: { productId: idProduct } });
        await ProductSpec.bulkCreate(
          specs.map((s) => ({
            productId: idProduct,
            screenSize: s.screenSize || null,
            screenTechnology: s.screenTechnology || null,
            rearCamera: s.rearCamera || null,
            frontCamera: s.frontCamera || null,
            chipset: s.chipset || null,
            internalMemory: s.internalMemory || null,
            battery: s.battery || null,
            operatingSystem: s.operatingSystem || null,
            screenResolution: s.screenResolution || null,
            screenFeatures: s.screenFeatures || null,
            cpuType: s.cpuType || null,
            compatibility: s.compatibility || null,
            quantity: s.quantity || 0,
          }))
        );
      }

      res.json({ message: "Cập nhật sản phẩm thành công" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }

  // [DELETE] delete product by id
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      // Xóa spec liên quan
      await ProductSpec.destroy({ where: { productId: id } });

      // Xóa images liên quan
      await ProductImage.destroy({ where: { productId: id } });

      // Xóa product
      const deleted = await Product.destroy({
        where: { idProduct: id },
      });

      if (deleted) {
        return res.status(200).json({ message: "Đã xóa thành công" });
      }
      return res.status(404).json({ message: "Không tìm thấy product" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

export default new ProductController();
