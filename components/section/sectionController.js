import mongoose from 'mongoose';
import Section from './sectionModel.js';
import Page from '../page/pageModel.js';

export const getSections = async (req, res) => {
  try {
    // const sections = await Section.find().populate('page', 'name');
    const sections = await Section.find();
    const count = sections.length;
    res.status(200).json({ count, sections });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postSection = async (req, res) => {
  const validateObjectId = await mongoose.isValidObjectId(req.body.page);
  if (!validateObjectId)
    return res.status(400).json({ msg: 'Invalid page ID' });

  const pageExist = await Page.findById(req.body.page);
  if (!pageExist) return res.status(404).json({ msg: 'Page not found' });

  try {
    const section = new Section({
      sort_order: req.body.sortOrder,
      path: req.body.path,
      depth: req.body.depth,
      numchild: req.body.numchild,
      name: req.body.name,
      description: req.body.description,
      valid_to: req.body.validTo,
      page: req.body.page,
    });

    const newSection = await section.save();
    res.status(201).json({
      msg: 'Success! Section created',
      Section: newSection,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
