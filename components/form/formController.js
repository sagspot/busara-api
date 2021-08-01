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
  const formId = req.params.formId;
  // try {
  Form.aggregate([
    {
      $match: { id: formId },
    },
    {
      $lookup: {
        from: 'Page',
        localField: 'pages',
        foreignField: '_id',
        as: 'students',
      },
    },
    {
      $lookup: {
        from: 'hobbies',
        localField: 'hobbyId',
        foreignField: '_id',
        as: 'hobbies',
      },
    },
    {
      $lookup: {
        from: 'course',
        localField: 'courseId',
        foreignField: '_id',
        as: 'courses',
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $unwind: '$author',
    },
  ])
    .then((data) => {
      return res.status(200).json({ data });
      // return data
    })
    .throw((err) => console.log(err));

  //   res.status(200).json({ form });
  // } catch (err) {
  //   res.status(500).json({ error: err });
  // }
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
