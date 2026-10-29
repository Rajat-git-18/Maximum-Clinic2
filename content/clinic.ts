/**
 * Public clinic content. Facts here are limited to what research/maximum-clinics.md
 * records as verified. Do not add testimonials, ratings, doctor credentials,
 * fees, or a founding story that the clinic has not published.
 */

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
  authorised: true;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  paragraphs: string[];
  procedures: string[];
};

export type Doctor = {
  slug: string;
  name: string;
  qualifications: string;
  speciality: string;
  experience: string;
  languages: string[];
  paragraphs: string[];
};

export type GalleryItem = {
  title: string;
  caption: string;
  motif: "arch" | "window" | "lines" | "court";
  tone: "green" | "sage" | "paper";
  ratio: "portrait" | "landscape" | "wide";
};

export type PhoneNumber = {
  display: string;
  e164: string;
};

const procedureNote =
  "These names are taken from the clinic’s public business listing. This page does not describe how a procedure is performed, and it does not say that every procedure is offered at every visit. Ask the clinic when you call.";

export const clinic = {
  readyToPublish: true,
  copyrightYear: "2026",
  name: "Maximum Clinics",
  speciality: "Orthopaedic clinic",
  cityCountry: "Gandhi Nagar, Jammu",
  phone: "+919697353535",
  phones: [
    { display: "096973 53535", e164: "+919697353535" },
    { display: "94190 29200", e164: "+919419029200" },
  ] satisfies PhoneNumber[],
  email: "",
  hours: "Monday to Saturday, 10:00 am–6:00 pm. Sunday, 9:00 am–3:30 pm.",
  hoursShort: "Mon–Sat 10 am–6 pm · Sun 9 am–3:30 pm",
  schedule: [
    { days: "Monday to Saturday", hours: "10:00 am–6:00 pm" },
    { days: "Sunday", hours: "9:00 am–3:30 pm" },
  ],
  bookingMethod: "Call either published number, or send an appointment request on this website.",
  mapsUrl: "https://www.google.com/maps/place/Maximum+Clinics/@32.7002309,74.860236,17z",
  mapEmbedUrl: "https://maps.google.com/maps?q=32.7002309,74.860236&z=16&output=embed",
  geo: { latitude: 32.7002309, longitude: 74.860236 },
  /** Turn on when the clinic asks for WhatsApp buttons. */
  whatsappEnabled: false,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/maximumclinics/" },
    { label: "Facebook", href: "https://www.facebook.com/maximumclinicsjammu/" },
  ],
  address: {
    street: "Gole Market, 358/A, opposite Peer Baba, Apsara Road",
    locality: "Gandhi Nagar, Jammu",
    region: "Jammu and Kashmir",
    postalCode: "180004",
    country: "India",
  },
  parking: "",
  publicTransport: "",
  emergencyNote:
    "If you need emergency medical help, contact your local emergency number. This website cannot provide urgent or emergency care.",
  footerSummary:
    "An orthopaedic clinic in Gandhi Nagar, Jammu. Address, hours, and phone numbers are the details published by the clinic.",
  hero: {
    eyebrow: "Orthopaedic clinic · Jammu",
    title: "Healthcare that puts you first.",
    description:
      "Explore the services, check the hours, and find the information you need to plan a visit to Maximum Clinics in Gandhi Nagar.",
    primaryCta: "Book an appointment",
    secondaryCta: "Explore our services",
  },
  finalCta: {
    eyebrow: "Appointments",
    title: "Take the next step towards better-informed care.",
    body: "Call the clinic, or send an appointment request. The clinic confirms the time with you. The form itself does not reserve a visit.",
    cta: "Book an appointment",
  },
  about: {
    eyebrow: "The clinic",
    title: "An orthopaedic clinic in Gandhi Nagar.",
    lede: "Maximum Clinics publishes its address, opening hours, and phone numbers so a visit can be planned with clear information.",
    paragraphs: [
      "Maximum Clinics is a medical clinic at Gole Market, 358/A, opposite Peer Baba, Apsara Road, Gandhi Nagar, Jammu 180004.",
      "Public listings describe the practice as an orthopaedic clinic. The services on this website are the ones named on the clinic’s public business listing, including joint, spine, and bone-related care.",
      "Individual doctor names and qualifications have not been published on the clinic’s Instagram profile or Google listing, so they are not shown here.",
    ],
  },
  principles: [
    {
      title: "A published address",
      body: "The clinic is at Gole Market, Gandhi Nagar. Directions open the same place shown on Google Maps.",
    },
    {
      title: "Hours you can check",
      body: "Monday to Saturday, 10:00 am to 6:00 pm. Sunday, 9:00 am to 3:30 pm.",
    },
    {
      title: "Two phone numbers",
      body: "Call 096973 53535 or 94190 29200.",
    },
    {
      title: "A request, then a confirmation",
      body: "You can ask for an appointment on this website. The visit is confirmed by the clinic, not by the form.",
    },
  ],
  journey: [
    {
      number: "01",
      title: "Explore services",
      body: "Read the services named on the clinic’s public listing and decide what you want to ask about.",
    },
    {
      number: "02",
      title: "Call or send a request",
      body: "Call either published number, or send a preferred day and part of the day. The request does not reserve that time.",
    },
    {
      number: "03",
      title: "Visit the clinic",
      body: "Use the published address and hours before you travel. Ask the clinic what to bring when the visit is confirmed.",
    },
    {
      number: "04",
      title: "Follow up",
      body: "If further contact is needed, the clinic arranges it after the visit. This website does not book follow-up appointments by itself.",
    },
  ],
  gallery: [
    {
      title: "Reception",
      caption: "Space for a photograph of the reception. This frame is not a picture of the clinic.",
      motif: "arch",
      tone: "green",
      ratio: "portrait",
    },
    {
      title: "Waiting area",
      caption: "Space for a photograph of the waiting area. This frame is not a picture of the clinic.",
      motif: "lines",
      tone: "sage",
      ratio: "landscape",
    },
    {
      title: "Consultation room",
      caption: "Space for a photograph of a consultation room. This frame is not a picture of the clinic.",
      motif: "window",
      tone: "green",
      ratio: "landscape",
    },
    {
      title: "Entrance",
      caption: "Space for a photograph of the entrance. This frame is not a picture of the clinic.",
      motif: "court",
      tone: "paper",
      ratio: "wide",
    },
  ] satisfies GalleryItem[],
  /**
   * Copied from the Google Maps listing on 29 October 2026.
   * Rating 4.7 from 88 reviews. These three are the first reviews Google showed, unedited.
   */
  googleReviews: {
    rating: 4.7,
    count: 88,
    url: "https://www.google.com/maps/place/Maximum+Clinics/@32.7002309,74.860236,17z/data=!4m8!3m7!1s0x391e84b044abcd43:0xfc3648a9031bd5d8!8m2!3d32.7002309!4d74.860236!9m1!1b1!16s%2Fg%2F11c56980x7",
    items: [
      {
        name: "manish mansotra",
        stars: 5,
        quote:
          "Maximum Clinics gave my son a new lease on life. After consulting many doctors in Delhi and Amritsar without satisfactory results, we finally found the right treatment here. Thanks to their expert care and dedication, my son recovered from his knee and shoulder injuries and achieved success in national and international sports and is now serving in a prestigious administrative position in J&K. We are truly grateful to the entire team at Maximum Clinics. Highly recommended.",
      },
      {
        name: "Pankaj Kesar",
        stars: 5,
        quote:
          "We visited Maximum Clinics one month ago for my mother’s knee consultation, and choosing them has been one of the best decisions for our family. After consulting multiple orthopaedic specialists in Jammu and Amritsar, we finally decided to proceed with knee replacement surgery here and we are extremely glad we did. The doctor’s clarity, confidence, and patient-centric approach gave us immense trust from day one. The entire experience from pre-operative counselling to post-operative care was exceptionally well managed. The staff is professional, compassionate, and always available to guide and support. A special mention to their physiotherapy team, whose dedication and structured rehabilitation plan played a crucial role in my mother’s smooth recovery. Today my mother is living her life pain-free and independently again. Seeing her walk comfortably after years of suffering has brought immense happiness to our entire family. Highly recommended for anyone looking for ethical advice, expert surgical care, and outstanding rehabilitation support. Thank you Maximum Clinics for giving my mother her active life back.",
      },
      {
        name: "Sunil",
        stars: 5,
        quote:
          "I had been suffering from severe back pain for the last two months. Despite consulting several doctors even in Delhi. I found no relief and for the last 15 days I was completely bedridden. Then I was referred to Maximum Clinics. The moment I entered the clinic I felt I had come to the right place. Dr. Manish patiently evaluated my condition, reassured me that surgery was not required and guided me with the right treatment plan. Just six days later. I feel almost completely back to normal. I sincerely thank Dr. Manish and the entire team at Maximum Clinics for their professionalism, compassionate care, and excellent treatment. If you’re struggling with back pain or spine related problems.I highly recommend consulting Maximum Clinics.",
      },
    ],
  },
  doctors: [] as Doctor[],
  services: [
    {
      slug: "orthopaedic-consultation",
      name: "Orthopaedic consultation",
      summary: "A consultation for bone and joint concerns. Call the clinic to ask what a first visit includes.",
      paragraphs: [
        "Maximum Clinics is publicly listed as an orthopaedic clinic in Gandhi Nagar, Jammu.",
        "This page does not describe a consultation in clinical detail. Ask the clinic what to expect, and what to bring, when a visit is confirmed.",
      ],
      procedures: [],
    },
    {
      slug: "joint-care",
      name: "Joint care",
      summary: "Knee, hip, shoulder, and ligament services named on the clinic’s public listing.",
      paragraphs: [procedureNote],
      procedures: [
        "Knee pain",
        "Knee osteotomy",
        "Ligament reconstruction",
        "Hip resurfacing",
        "Shoulder replacement",
        "Elbow replacement",
      ],
    },
    {
      slug: "spine-care",
      name: "Spine care",
      summary: "Neck, back, and spinal services named on the clinic’s public listing.",
      paragraphs: [procedureNote],
      procedures: ["Neck pain", "Back pain", "Laminectomy", "Spinal disc surgery"],
    },
    {
      slug: "bone-and-foot-care",
      name: "Bone and foot care",
      summary: "Bone-health and foot services named on the clinic’s public listing.",
      paragraphs: [procedureNote],
      procedures: ["Osteoporosis management", "Functional orthopaedics", "Podiatric consultation"],
    },
  ] satisfies Service[],
  testimonials: [] as Testimonial[],
};

export function getFaqs() {
  const numbers = clinic.phones.map((item) => item.display).join(" and ");
  return [
    {
      question: "How can I book an appointment?",
      answer:
        "Call either published phone number, or use the appointment request form and share a preferred day, a preferred part of the day, and a way for the clinic to reply. Submitting the form does not reserve a time or confirm a visit. Until a booking inbox is connected, the form is a preview and does not send the request.",
    },
    {
      question: "What are the clinic's opening hours?",
      answer: clinic.hours,
    },
    {
      question: "Where is the clinic located?",
      answer:
        "Gole Market, 358/A, opposite Peer Baba, Apsara Road, Gandhi Nagar, Jammu, Jammu and Kashmir 180004. Directions open this place on Google Maps.",
    },
    {
      question: "What services are available?",
      answer:
        "The public listing names orthopaedic consultation, joint care, spine care, and bone and foot care. Ask the clinic which of those is the right visit for you.",
    },
    {
      question: "What should I bring to my first visit?",
      answer:
        "A first-visit checklist has not been published. When the clinic confirms your appointment, ask which documents or medicines to bring.",
    },
    {
      question: "How can I reschedule an appointment?",
      answer: `This website cannot change an appointment that has already been agreed. Call ${numbers} and refer to the arrangement the clinic confirmed with you.`,
    },
    {
      question: "Which payment methods are accepted?",
      answer: "Payment methods have not been published. Confirm how to pay with the clinic before the visit.",
    },
    {
      question: "How can I contact the clinic?",
      answer: `Call ${numbers}. There is no public email address on the clinic’s profiles. Instagram and Facebook links are on the contact page.`,
    },
  ];
}
