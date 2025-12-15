import productsRouter from "./productsRouter.js";
import brandRouter from "./brandRouter.js";
import categoryRouter from "./categoryRouter.js";
import specRouter from "./specRouter.js";
import bannerRouter from "./bannerRouter.js";
import stausRouter from "./statusRouter.js";
import userRouter from "./userRouter.js";
import roleRouter from "./roleRouter.js";
import cartRouter from "./cartRouter.js";
import orderRouter from "./orderRouter.js";
import productReviewRouter from "./productReviewRouter.js";
import productQuestionRouter from "./productQuestionRouter.js";

// RESTful API
function routes(app) {
  app.use("/products", productsRouter);
  app.use("/brands", brandRouter);
  app.use("/categories", categoryRouter);
  app.use("/specs", specRouter);
  app.use("/banners", bannerRouter);
  app.use("/status", stausRouter);
  app.use("/users", userRouter);
  app.use("/roles", roleRouter);
  app.use("/carts", cartRouter);
  app.use("/orders", orderRouter);
  app.use("/productReview", productReviewRouter);
  app.use("/productQuestion", productQuestionRouter);
}
export default routes;
