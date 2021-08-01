import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    sort_order: { type: Number, required: true },
    type: { type: String, required: true, enum: ['text', 'select', 'tel'] },
    is_mandatory: { type: Boolean, default: true },
    is_visible: { type: Boolean, default: true },
    text: { type: String, required: true },
    description: { type: String },
    detail: { type: String },
    column_match: { type: String, required: true },
    default: { type: String },
    field_length: { type: Number, default: 255 },
    is_enabled: { type: Boolean, default: true },
    is_unique: { type: Boolean, default: false },
    has_skip: { type: Boolean, default: false },
    extras: { name: { type: String } },
    is_active: { type: Boolean, default: true },
    error_message: { type: String },
    validation_rule: { type: String },
    is_unique_with: { type: Array },
    widget: {
      type: String,
      required: true,
      enums: ['text', 'select', 'lookup', 'tel'],
    },
    airtime_compensation: { type: Number, default: 0.0 },
    cash_compensation: { type: Number, default: 0.0 },
    estimated_time: { type: Number, default: 0 },
    show_if: { type: Array },
    q_options: { type: Array },
    uploads: { type: Array },
    section: { type: 'ObjectId', ref: 'Section', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Question', questionSchema);
