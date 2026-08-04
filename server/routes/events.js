import express from "express";
import Event from "../models/Event.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, category, when } = req.query;
    const query = {};

    if (category && category != "ALL") query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }
    const now = new Date();
    if (when === "week") {
      const weekLater = new Date();
      weekLater.setDate(now.getDate() + 7);
      query.Date = { $gte: now, $lte: weekLater };
    } else if (when === "month") {
      const monthLater = new Date();
      monthLater.setMonth(now.getMonth() + 1);
      query.date = { $gte: now, $lte: monthLater };
    } else {
      query.date = { $gte: now };
    }
    const events = await Event.find(query)
      .populate("organizer", "name")
      .sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/my/hosting", auth, async (req, res) => {
  const events = await Event.find({ organizer: req.UserId }).sort({ date: 1 });
  res.json(events);
});
router.get("/my/attending", auth, async (req, res) => {
  const events = await Event.find({ attendees: req.UserId })
    .populate("organizer", "name")
    .sort({ date: 1 });
  res.json(events);
});
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name")
      .populate("commesnts.user", "name");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      date,
      time,
      location,
      image,
      capacity,
    } = req.body;
    const event = await Event.create({
      title,
      description,
      category,
      date,
      time,
      location,
      image,
      capacity: capacity || 0,
      organizer: req.UserId,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json("message: err.message");
  }
});
