import { University } from "../../Models";

// Create
export const createUniversity = async (req, res) => {
  try {
    const university = await University.create(req.body);
    res.status(201).json({ status: "success", data: university });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Get all
export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).json({ status: "success", data: universities });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get by ID
export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ status: "success", data: university });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Update
export const updateUniversityById = async (req, res) => {
  try {
    const updated = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ status: "success", data: updated });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete
export const deleteUniversity = async (req, res) => {
  try {
    const deleted = await University.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ status: "success", data: deleted });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
