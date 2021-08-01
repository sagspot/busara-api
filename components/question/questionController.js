import mongoose from 'mongoose';
import Section from '../section/sectionModel.js';
import Page from '../page/pageModel.js';
import Question from './questionModel.js';

export const getquestions = async (req, res) => {
  try {
    // const questions = await Question.find().populate('section', 'name');
    const questions = await Question.find();
    const count = questions.length;
    res.status(200).json({ count, questions });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postQuestion = async (req, res) => {
  const validateObjectId = await mongoose.isValidObjectId(req.body.section);
  if (!validateObjectId)
    return res.status(400).json({ msg: 'Invalid section ID' });

  const sectionExist = await Section.findById(req.body.section).populate(
    'page',
    'form'
  );
  if (!sectionExist) return res.status(404).json({ msg: 'Section not found' });

  const pageId = sectionExist.page.id;
  const formId = sectionExist.page.form;

  try {
    const question = new Question({
      sort_order: req.body.sortOrder,
      type: req.body.type,
      text: req.body.text,
      description: req.body.description,
      column_match: req.body.columnMatch,
      error_message: req.body.errorMessage,
      widget: req.body.widget,
      q_options: req.body.qOptions,
      section: req.body.section,
      pageId,
      formId,
    });

    const newQuestion = await question.save();
    res.status(201).json({
      msg: 'Success! Question created',
      Question: newQuestion,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
