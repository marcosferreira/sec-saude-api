import { CRUD } from "../utils.js";
import { Benefits } from "./models.js";

export class BenefitsController extends CRUD {
  constructor() {
    super(Benefits);
  }
}
