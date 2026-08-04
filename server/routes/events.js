import express from "express";
import Event from "../models/Event.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, category, when } = req.query;
    const query = {};

    if (category && category !== "All") query.category = category;
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
      query.date = { $gte: now, $lte: weekLater };
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
  const events = await Event.find({ organizer: req.userId }).sort({ date: 1 });
  res.json(events);
});
router.get("/my/attending", auth, async (req, res) => {
  const events = await Event.find({ attendees: req.userId })
    .populate("organizer", "name")
    .sort({ date: 1 });
  res.json(events);
});
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name")
      .populate("comments.user", "name");
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
      organizer: req.userId,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Events not found" });
    if (event.organizer.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this event" });
    }
    Object.assign(event, req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.organizer.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this event " });
    }
    await event.deleteOne();
    res.json({ message: "Events deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/:id/rsvp", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.attendees.includes(req.userId)) {
      return res.status(400).json({ message: "Already registered" });
    }
    if (event.capacity > 0 && event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }
    event.attendees.push(req.userId);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/:id/rsvp", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.attendees = event.attendees.filter(
      (id) => id.toString() !== req.userId,
    );
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/:id/comments", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const User = (await import("../models/User.js")).default;
    const user = await User.findById(req.userId);

    event.comments.push({
      user: req.userId,
      name: user.name,
      text: req.body.text,
    });
    await event.save();
    res.status(201).json(event.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
