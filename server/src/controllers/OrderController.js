import { Order, OrderItem } from "../models/index.js";

class OrderController {
  // [GET] show all Order
  async showAllOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            as: "orderItems",
          },
        ],
      });
      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error fetching all Cart:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // [POST] add Order
  async addOrder(req, res) {
    // const data = JSON.parse(req.body.FinalOrder);
    const data = req.body;
    try {
      const {
        userId,
        idOrder,
        subTotal,
        discount,
        shippingFree,
        total,
        paymentMethod,
        paymentStatus,
        status,
        voucherCode,
        isConfirm,
      } = data;

      const order = await Order.create(
        {
          userId,
          idOrder,
          subTotal,
          discount,
          shippingFree,
          total,
          paymentMethod,
          paymentStatus,
          status,
          voucherCode,
          isConfirm,

          orderItems: data.orderItem.map((item) => ({
            orderId: data.idOrder,
            productId: item.productId,
            name: item.name,
            price: item.price,
            thumbnail: item.thumbnail,
            quantity: item.quantity,
          })),
        },
        {
          include: [
            {
              model: OrderItem,
              as: "orderItems",
            },
          ],
        }
      );

      return res.status(201).json({ message: "Add cart complete", order });
    } catch (error) {
      console.error("Error creating status:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  //[UPDATE] update Order
  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { isConfirm } = req.body;

      const updated = await Order.update(
        { isConfirm }, // chỉ update trường này
        { where: { id } }
      );

      if (updated[0] === 1) {
        return res.json({ message: "Cập nhật isConfirm thành công" });
      } else {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  // [DELETE] delete order by id
  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Order.destroy({ where: { id } });

      if (deleted) {
        return res.status(200).json({ message: "Đã xóa thành công" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

export default new OrderController();
