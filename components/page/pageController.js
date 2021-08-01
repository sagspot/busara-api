import mongoose from 'mongoose';
import Page from './pageModel.js';
import Form from '../form/formModel.js';

export const getPages = async (req, res) => {
  try {
    // const pages = await Page.find().populate('form', 'name');
    const pages = await Page.find();
    const count = pages.length;
    res.status(200).json({ count, pages });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postPage = async (req, res) => {
  const validateObjectId = await mongoose.isValidObjectId(req.body.form);
  if (!validateObjectId)
    return res.status(400).json({ msg: 'Invalid form ID' });
  const formExist = await Form.findById(req.body.form);
  if (!formExist) return res.status(404).json({ msg: 'Form not found' });
  try {
    const page = new Page({
      sort_order: req.body.sortOrder,
      path: req.body.path,
      depth: req.body.depth,
      numchild: req.body.numchild,
      name: req.body.name,
      description: req.body.description,
      valid_to: req.body.validTo,
      form: req.body.form,
    });
    const newPage = await page.save();
    res.status(201).json({ msg: 'Success! Page created', Page: newPage });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
