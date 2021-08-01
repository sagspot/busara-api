import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    sort_order: { type: Number, required: true },
    path: { type: String, required: true },
    depth: { type: Number, required: true },
    numchild: { type: Number, required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: { type: String, default: 'section', enum: ['section'] },
    is_active: { type: Boolean, default: true },
    status: {
      type: String,
      default: 'Draft',
      enum: ['Published', 'Draft'],
    },
    valid_from: { type: Date, default: Date.now() },
    valid_to: { type: Date, required: true },
    has_consent: { type: Boolean, default: false },
    is_primary: { type: Boolean, default: false },
    node_type: { type: String, default: 'Survey', enum: ['Survey'] },
    visibility: {
      type: String,
      default: 'Public',
      enum: ['Public', 'Private'],
    },
    is_special: { type: Boolean, default: false },
    survey_airtime_compensation: { type: Number, default: 0.0 },
    survey_cash_compensation: { type: Number, default: 0.0 },
    survey_estimated_time: { type: Number, default: 0.0 },
    show_description: { type: Boolean, default: false },
    can_make_payments: { type: Boolean, default: false },
    can_track_data: { type: Boolean, default: false },

    page: { type: 'ObjectId', ref: 'Page', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Section', sectionSchema);
