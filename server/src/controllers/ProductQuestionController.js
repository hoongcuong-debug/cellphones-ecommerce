import productQuestion from "../models/ProductQuestion.js";

class ProductQuestionController {
  // User đặt câu hỏi
  async addQuestion(req, res) {
    try {
      const { productId, userId, question } = req.body;

      if (!productId || !userId || !question) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }

      const newQuestion = await productQuestion.create({
        productId,
        userId,
        question,
        answer: null, // chưa có trả lời
        answeredBy: null,
      });

      return res.status(201).json({
        message: "Question created successfully",
        question: newQuestion,
      });
    } catch (error) {
      console.error("Error creating question:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Admin/Shop trả lời câu hỏi
  async answerQuestion(req, res) {
    try {
      const { id } = req.params;
      const { answer, answeredBy } = req.body;

      if (!answer || !answeredBy) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }

      const questionRow = await productQuestion.findByPk(id);

      if (!questionRow) {
        return res.status(404).json({ message: "Question not found" });
      }

      questionRow.answer = answer;
      questionRow.answeredBy = answeredBy;
      await questionRow.save();

      return res.status(200).json({
        message: "Question answered successfully",
        question: questionRow,
      });
    } catch (error) {
      console.error("Error answering question:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Lấy tất cả câu hỏi
  async getAllQuestion(req, res) {
    try {
      const questions = await productQuestion.findAll();

      return res.status(200).json(questions);
    } catch (error) {
      console.error("Error getting questions:", error);
      return res.status(500).json({ error: error.message });
    }
  }
  // Lấy danh sách câu hỏi theo productId
  async getByProduct(req, res) {
    try {
      const { productId } = req.params;

      const questions = await productQuestion.findAll({
        where: { productId },
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(questions);
    } catch (error) {
      console.error("Error getting questions:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Lấy danh sách câu hỏi theo userId
  async getByUser(req, res) {
    try {
      const { userId } = req.params;

      const questions = await productQuestion.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(questions);
    } catch (error) {
      console.error("Error getting questions:", error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new ProductQuestionController();
