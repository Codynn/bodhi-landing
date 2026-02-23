export interface SchoolMessageData {
  sectionLabel: string;
  heading: string;
  principalImage: {
    src: string;
    alt: string;
  };
  messageparagraphs: string[];
  closing: {
    salutation: string;
    name: string;
    title: string;
    school: string;
  };
}