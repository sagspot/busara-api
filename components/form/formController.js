import mongoose from 'mongoose';
import Form from './formModel.js';
import Page from '../page/pageModel.js';
import Section from '../section/sectionModel.js';
import Question from '../question/questionModel.js';

export const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    const count = forms.length;
    res.status(200).json({ count, forms });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getForm = async (req, res) => {
  try {
    const formId = req.params.formId;
    /*
    const data = await Form.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(formId) } },
      {
        $lookup: {
          from: Page.collection.name,
          localField: '_id',
          foreignField: 'form',
          as: 'pages',
        },
      },
      { $unwind: { path: '$pages', preserveNullAndEmptyArrays: true } },
      { $sort: { 'pages.level': -1 } },
      {
        $group: {
          _id: '$_id',
          pages: { $push: '$pages' },
        },
      },
      {
        $lookup: {
          from: Section.collection.name,
          localField: '_id',
          foreignField: 'page',
          as: 'sections',
        },
      },
    ]);
    */
    const data = await Form.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(formId) } },
      {
        $graphLookup: {
          from: Page.collection.name,
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'form',
          as: 'pages',
        },
      },
      { $unwind: { path: '$pages', preserveNullAndEmptyArrays: true } },
      { $sort: { 'pages.level': -1 } },
      {
        $group: {
          _id: '$_id',
          // formDetails: { $first: '$$ROOT' },
          pages: { $push: '$pages' },
        },
      },
      // { $replaceRoot: { newRoot: '$formDetails' } },
    ]);
    return res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export const postForm = async (req, res) => {
  const formExist = await Form.findOne({ name: req.body.name });
  if (formExist) return res.status(409).json({ msg: 'Form exist' });
  try {
    const form = new Form({
      sort_order: req.body.sortOrder,
      path: req.body.path,
      depth: req.body.depth,
      numchild: req.body.numchild,
      name: req.body.name,
      description: req.body.description,
      valid_to: req.body.validTo,
      creator: {
        name: req.userData.name,
        email: req.userData.email,
      },
    });
    const newForm = await form.save();
    res.status(201).json({ msg: 'Success! Form created', newForm });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const form = {};
