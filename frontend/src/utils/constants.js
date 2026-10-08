// frontend/src/utils/constants.js

export const APP_NAME = "Campus Mess Portal";

export const MEAL_TYPES = {
  BREAKFAST: "breakfast",
  LUNCH: "lunch",
  SNACKS: "snacks",
  DINNER: "dinner"
};

export const USER_ROLES = {
  STUDENT: "student",
  HOSTEL_ADMIN: "hostel_admin",
  MESS_ADMIN: "mess_admin",
  SUPER_ADMIN: "super_admin"
};

export const COMPLIMENT_CATEGORIES = [
  { id: "master_chef", label: "Master Chef Cooking & Flavor" },
  { id: "signature_dish", label: "Signature Dish Appreciation" },
  { id: "fresh_hot", label: "Hot & Fresh Serving" },
  { id: "clean_hygiene", label: "Spotless Cleanliness & Ambience" },
  { id: "courteous_staff", label: "Staff Courtesy & Warm Smiles" },
  { id: "general_kudos", label: "Overall Outstanding Dining" }
];

export const COMPLAINT_CATEGORIES = COMPLIMENT_CATEGORIES;

export const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
