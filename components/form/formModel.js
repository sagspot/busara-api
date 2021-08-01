import mongoose from 'mongoose';

const formSchema = new mongoose.Schema(
  {
    sort_order: { type: Number, required: true },
    path: { type: String, required: true },
    depth: { type: Number, required: true },
    numchild: { type: Number, required: true },
    name: {
      type: String,
      required: true,
      unique: [true, 'Form exist'],
      dropDups: true,
      trim: true,
    },
    description: { type: String, required: true, trim: true },
    type: { type: String, default: 'form', enum: ['form'] },
    is_active: { type: Boolean, default: false },
    status: {
      type: String,
      default: 'Published',
      enum: ['Published', 'Pending'],
    },
    valid_from: { type: Date, default: Date.now() },
    valid_to: { type: Date, required: true },
    has_consent: { type: Boolean, default: false },
    is_primary: { type: Boolean, default: false },
    node_type: { type: String, default: 'Respondent', enum: ['Respondent'] },
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
    expected_views: { type: Number, default: 100 },
    no_of_views: { type: Number, default: 1 },
    gateway: { type: Number, default: 1 },
    universe: { type: Number, default: 1 },
    airtime_compensation: { type: Number, default: 0.0 },
    cash_compensation: { type: Number, default: 0.0 },
    estimated_time: { type: Number, default: 0.0 },
    creator: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Form', formSchema);
