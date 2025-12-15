import { ProductReview } from "../models/index.js";

class ProductReviewController {
  // thêm review
  async addReview(req, res) {
    try {
      const { userId, productId, rating, title, content, images } = req.body;

      if (!userId || !productId || !title || !content || !images) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }

      const review = await ProductReview.create({
        userId,
        productId,
        rating,
        title,
        content,
        images,
      });

      return res.status(201).json({
        message: "Review created successfully",
        review,
      });
    } catch (error) {
      console.log("Error creating review:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Lấy review theo productId
  async getReviewsByProduct(req, res) {
    try {
      const { productId } = req.params;
      console.log(productId);
      const reviews = await ProductReview.findAll({
        where: { productId },
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(reviews);
    } catch (error) {
      console.log("Error fetching reviews:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Lấy review theo userId
  async getReviewsByUser(req, res) {
    try {
      const { userId } = req.params;

      const reviews = await ProductReview.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(reviews);
    } catch (error) {
      console.log("Error fetching reviews:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ProductReviewController();
