import multer from "multer";
// Cấu hình multer để nhận file từ client
export const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads"), // thư mục lưu file
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});
