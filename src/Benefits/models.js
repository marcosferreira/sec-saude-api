import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BenefitsSchema = new Schema({
  person: {
    full_name: {
      type: String,
      required: true,
    },
    social_name: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    rg: {
      type: String,
      required: true,
    },
    organ: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    father_affiliation: {
      name: {
        type: String,
        required: true,
      },
      cpf: {
        type: String,
        required: true,
      },
    },
    mother_affiliation: {
      name: {
        type: String,
        required: true,
      },
      cpf: {
        type: String,
        required: true,
      },
    },
  },
  telephone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  sus_card: {
    type: String,
    required: true,
  },
  ubs: {
    name_ubs: {
      type: String,
      required: true,
    },
    name_acs: {
      type: String,
      required: true,
    },
  },
  family_responsible: {
    type: String,
    required: true,
  },
  family_composition: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Benefits = model("Benefits", BenefitsSchema);

export { Benefits };
