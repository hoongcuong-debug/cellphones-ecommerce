import Spec from "../models/Spec.js";

class SpecsController {
  // [GET] show all specs
  async showAllSpecs(req, res) {
    try {
      const specs = await Spec.findAll();
      res.status(200).json({ specs });
    } catch (error) {
      console.error("Error fetching specs:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // [POST] add new spec
  async addSpec(req, res) {
    try {
      const {
        screenSize,
        screenTechnology,
        rearCamera,
        frontCamera,
        chipset,
        internalMemory,
        battery,
        operatingSystem,
        screenResolution,
        screenFeatures,
        cpuType,
        compatibility,
      } = req.body;

      const spec = await Spec.create({
        screenSize: screenSize || null,
        screenTechnology: screenTechnology || null,
        rearCamera: rearCamera || null,
        frontCamera: frontCamera || null,
        chipset: chipset || null,
        internalMemory: internalMemory || null,
        battery: battery || null,
        operatingSystem: operatingSystem || null,
        screenResolution: screenResolution || null,
        screenFeatures: screenFeatures || null,
        cpuType: cpuType || null,
        compatibility: compatibility || null,
      });

      res.status(201).json({ message: "Add Spec complete", spec });
    } catch (error) {
      console.error("Error creating spec:", error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  // [PUT] update spec field by id
  async updateSpecField(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body; // object chứa các trường muốn update

      if (!Object.keys(updateData).length) {
        return res
          .status(400)
          .json({ message: "Chưa có trường nào để cập nhật" });
      }

      const [updated] = await Spec.update(updateData, { where: { id } });

      if (updated) {
        const updatedSpec = await Spec.findByPk(id);
        return res.json({ message: "Spec updated successfully", updatedSpec });
      }

      res.status(404).json({ message: "Spec not found" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
}

export default new SpecsController();
