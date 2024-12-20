import mongoose from "mongoose";

const ResearchParticipantSchema = new mongoose.Schema(
  {
    // Personal Details
    firstName: {
      type: String,
      default: null,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      default: null,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      default: null,
      trim: true,
      lowercase: true,
      // match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    mobileNumber: {
      type: String,
      required: false,
      default: null,
      trim: true,
      // validate: {
      //   validator: function (v) {
      //     // Regex for common phone number formats
      //     // Supports formats like:
      //     // (123) 456-7890
      //     // 123-456-7890
      //     // 123.456.7890
      //     // 1234567890
      //     return /^(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/.test(
      //       v
      //     );
      //   },
      //   message: (props) => `${props.value} is not a valid phone number!`,
      // },
    },

    // Demographic Information
    age: {
      type: String,
      required: true,
      enum: ["18-24", "25-34", "35-44", "45-54", "55+"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other", "prefer-not-to-say"],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },

    // Shopping Behavior
    shoppingFrequency: {
      type: String,
      required: true,
      enum: ["weekly", "bi-weekly", "monthly", "occasionally"],
    },
    preferredCategories: {
      type: [String],
      required: true,
      enum: [
        "Electronics",
        "Fashion",
        "Food & Dining",
        "Home & Garden",
        "Sports & Fitness",
        "Beauty & Personal Care",
        "Books & Entertainment",
      ],
    },
    averageMonthlySpending: {
      type: String,
      required: true,
      enum: [
        "10000-",
        "10001-25000",
        "25001-50000",
        "50001-100000",
        "100001-200000",
        "200000+",
      ],
    },

    shoppingMethod: {
      type: String,
      required: true,
      enum: ["Online", "Physical Store", "Both",],
    },

    offerPreferences: {
      type: String,
      required: true,
      enum: [
        "instantGrabber",
        "activeHunter",
        "waitForSales",
        "compareOffers",
        "loyaltyPrograms",
        "occasionalBuyer",
        "plannedOnly",
        "qualityConcerned",
        "brandLoyal",
        "rarelyUse",
        "skeptical",
        "dislike",
      ],
    },

    // Communication Preferences
    communicationPreference: {
      type: String,
      required: true,
      enum: ["email", "sms", "push-notification", "no-communication"],
    },

    // Consent
    termsConsent: {
      type: Boolean,
      required: true,
      default: false,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save validation
ResearchParticipantSchema.pre("save", function (next) {
  if (!this.termsConsent) {
    return next(new Error("Consent is required"));
  }
  next();
});

const ResearchParticipant = mongoose.model(
  "ResearchParticipant",
  ResearchParticipantSchema
);
export default ResearchParticipant;
