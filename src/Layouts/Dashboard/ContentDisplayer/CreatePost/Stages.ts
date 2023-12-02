export interface IStages {
  label: string;
  errors: string[];
}

const stages: IStages[] = [
  {
    label: "Select estate type",
    errors: ["No type has been chosen"],
  },
  { label: "Pinpoint position", errors: [] },
  {
    label: "Add images",
    errors: ["Need 5 images", "Files cannot be more than 20MB"],
  },
  {
    label: "Create title and description",
    errors: [
      "Title cannot be empty",
      "Description cannot be empty",
      "Cannot contains words that violate our website policy",
    ],
  },
  {
    label: "Specify policies",
    errors: ["Unfinish required field"],
  },
  {
    label: "Add apartments",
    errors: ["Unsaved apartments"],
  },
  {
    label: "Set expiration",
    errors: [],
  },
];

export default stages;
