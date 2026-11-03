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

export type ServiceIcon = "joint" | "spine" | "arthritis" | "foot";

export type ServiceOffering = {
  title: string;
  body: string;
};

export type Service = {
  slug: string;
  name: string;
  pageTitle?: string;
  summary: string;
  paragraphs: string[];
  procedures: string[];
  offerings?: ServiceOffering[];
  offeringsTitle?: string;
  guidance?: string;
  callLabel?: string;
  icon: ServiceIcon;
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
  slug: string;
  title: string;
  caption: string;
  alt: string;
  src: string;
  width: number;
  height: number;
};

export type ClinicVideo = {
  slug: string;
  kicker?: string;
  title: string;
  lede: string;
  src: string;
  poster: string;
};

export type PhoneNumber = {
  display: string;
  e164: string;
};

export type ClinicLocation = {
  label: string;
  street?: string;
  locality: string;
  region: string;
  postalCode?: string;
  country: string;
};

export const clinic = {
  readyToPublish: true,
  copyrightYear: "2026",
  name: "Maximum Healthcare",
  legalName: "Maximum Healthcare Pvt. Ltd.",
  speciality: "Orthopaedic clinic",
  cityCountry: "Jammu, Srinagar & Rajouri",
  phone: "+919419029200",
  phones: [{ display: "94190 29200", e164: "+919419029200" }] satisfies PhoneNumber[],
  email: "Admn.maxclinics@gmail.com",
  hours: "Monday to Saturday, 10:00 am–6:00 pm. Sunday, 9:00 am–3:30 pm.",
  hoursShort: "Mon–Sat 10 am–6 pm · Sun 9 am–3:30 pm",
  schedule: [
    { days: "Monday to Saturday", hours: "10:00 am–6:00 pm" },
    { days: "Sunday", hours: "9:00 am–3:30 pm" },
  ],
  bookingMethod: "Call 94190 29200, or send an appointment request on this website.",
  mapsUrl: "https://www.google.com/maps/place/Maximum+Clinics/@32.7002309,74.860236,17z",
  mapEmbedUrl: "https://maps.google.com/maps?q=32.7002309,74.860236&z=16&output=embed",
  geo: { latitude: 32.7002309, longitude: 74.860236 },
  whatsappEnabled: true,
  social: [
    { label: "Instagram", href: "https://www.instagram.com/maximumclinics/" },
    { label: "Facebook", href: "https://www.facebook.com/maximumclinicsjammu/" },
  ],
  address: {
    street: "Gole Market, 358/A, opposite Peer Baba, Apsara Road",
    locality: "Jammu",
    region: "Jammu and Kashmir",
    postalCode: "180004",
    country: "India",
  },
  locations: [
    {
      label: "Jammu",
      street: "Gole Market, 358/A, opposite Peer Baba, Apsara Road",
      locality: "Jammu",
      region: "Jammu and Kashmir",
      postalCode: "180004",
      country: "India",
    },
    {
      label: "Srinagar",
      locality: "Srinagar",
      region: "Jammu and Kashmir",
      country: "India",
    },
    {
      label: "Rajouri",
      locality: "Rajouri",
      region: "Jammu and Kashmir",
      country: "India",
    },
  ] satisfies ClinicLocation[],
  parking: "",
  publicTransport: "",
  emergencyNote:
    "If you need emergency medical help, contact your local emergency number. This website cannot provide urgent or emergency care.",
  footerSummary:
    "Maximum Healthcare Pvt. Ltd. Orthopaedic care in Jammu, Srinagar, and Rajouri.",
  hero: {
    eyebrow: "Orthopaedic clinic · Jammu, Srinagar & Rajouri",
    title: "Healthcare that puts you first.",
    description:
      "Quality-driven, ethical, and patient-centric orthopaedic care across Jammu, Srinagar, and Rajouri. Explore the services, hours, and how to plan a visit.",
    primaryCta: "Book an appointment",
    secondaryCta: "Explore our services",
  },
  finalCta: {
    eyebrow: "Appointments",
    title: "Take the next step towards better-informed care.",
    body: "Call the clinic, or send an **appointment request**. The clinic confirms the time with you. The form itself does not reserve a visit.",
    cta: "Book an appointment",
  },
  about: {
    eyebrow: "About us",
    title: "Advanced Orthopaedic & Musculoskeletal Care in Jammu",
    lede: "**Restoring Mobility.** Relieving Pain. **Rebuilding Lives.**",
    specialtiesTitle: "Clinical specialties & services",
    paragraphs: [
      "Located in the heart of Gandhi Nagar, **Maximum Healthcare** (operated by Maximum Healthcare Pvt. Ltd.) is a specialised clinic dedicated to comprehensive **orthopaedic** and joint wellness. We combine clinical excellence with a **patient-first** approach to help you return to a pain-free, active life.",
      "From non-invasive joint therapies and specialised **spine management** to comprehensive **arthritis**, foot, and ankle treatments, our facility delivers ethical, **evidence-based** medical care tailored to your recovery needs.",
    ],
  },
  quality: {
    eyebrow: "Quality, Accreditation & Professional Excellence",
    title: "Our Accreditations & Affiliations",
    intro:
      "Maximum Healthcare Pvt. Ltd. is committed to delivering **quality-driven**, ethical and **patient-centric** healthcare services.",
    body: "Our organisation takes pride in its affiliations and accreditations with **NABH** (National Accreditation Board for Hospitals & Healthcare Providers), **NABL** (National Accreditation Board for Testing and Calibration Laboratories), and the **Arthritis Foundation of India**.",
    associations:
      "These associations reflect our commitment to maintaining high standards of **clinical care**, **patient safety**, diagnostic quality, continuous improvement and professional excellence.",
    tagline: "At **Maximum Healthcare**, quality is not just a standard; it is our commitment to every patient.",
  },
  careers: {
    eyebrow: "Careers",
    title: "Build Your Career with Maximum Healthcare",
    lede: "Join a team dedicated to **medical excellence**, patient care, and compassionate healing in Jammu.",
    paragraphs: [
      "At Maximum Healthcare Pvt. Ltd., we look for medical professionals, administrative staff, and healthcare personnel who share our commitment to **patient-first** care.",
      "Even if no vacancies are listed, we welcome talent to connect with us. Candidate profiles are reviewed for upcoming opportunities across specialised departments in **Gandhi Nagar, Jammu**.",
    ],
    stepsTitle: "How the talent network form works",
    steps: [
      {
        title: "Express your interest",
        body: "Share your background, specialised skills, and preferred roles with the administrative team using the form.",
      },
      {
        title: "Profile database",
        body: "Your details are kept for consideration against future openings aligned with your qualifications.",
      },
      {
        title: "Document verification",
        body: "No CV upload is required at this stage. If a profile matches an upcoming opening, the team will ask for formal documents.",
      },
    ],
    contact: {
      title: "Direct inquiries",
      location: "Jammu, Srinagar & Rajouri",
      phoneLabel: "Direct HR / Recruitment contact",
      emailLabel: "Email",
      note: "For urgent recruitment queries or direct applications, contact the administrative desk during operational hours.",
    },
  },
  videos: {
    eyebrow: "Videos",
    title: "Patient Education & Clinical Insights",
    lede: "Explore how we approach specialised **Spine Care** and **Arthritis Treatment** at Maximum Healthcare, Gandhi Nagar.",
    heading: "About these films",
    phone: { display: "94190 29200", e164: "+919419029200" } satisfies PhoneNumber,
    home: {
      title: "Spine care at Maximum Healthcare.",
      lede: "A short film supplied by Maximum Healthcare. It introduces how the practice presents **spine care**. It does not diagnose, and it does not book an appointment.",
      paragraphs: [
        "Maximum Healthcare is in **Gandhi Nagar, Jammu**. This film is published so patients and families can see how the practice talks about spine care.",
        "Open the videos page to watch the arthritis care film as well. For questions, call **94190 29200**.",
      ],
    },
    paragraphs: [
      "We believe an **informed patient** is an empowered patient. These short videos offer an exclusive glimpse into our clinic environment, patient care philosophy, and modern approaches to **spine and joint health**.",
      "Designed to introduce our practice to patients and their families, these insights help you understand what to expect before your visit to our **Jammu centre**.",
    ],
    noteTitle: "Medical note",
    note: "These videos are provided for educational and introductory purposes only and do not replace an in-person medical evaluation. Individual treatment plans depend on a thorough consultation with our specialists.",
    questionsTitle: "Have questions about what you watched?",
    questions:
      "Call our medical helpdesk directly at **+91 94190 29200** or schedule an in-person consultation at our Gandhi Nagar clinic.",
    items: [
      {
        slug: "spine-care",
        kicker: "Film 01",
        title: "Specialised Spine Care & Rehabilitation",
        lede: "A visual overview of **non-surgical spine management**, posture correction, and back pain treatment options available at the clinic.",
        src: "/media/spine-care.mp4",
        poster: "/media/spine-care.jpg",
      },
      {
        slug: "arthritis-care",
        kicker: "Film 02",
        title: "Advanced Arthritis & Joint Wellness",
        lede: "Understanding joint care, **arthritis management**, and mobility restoration techniques tailored for long-term relief.",
        src: "/media/arthritis-care.mp4",
        poster: "/media/arthritis-care.jpg",
      },
    ] satisfies ClinicVideo[],
  },
  galleryPage: {
    eyebrow: "Gallery",
    title: "Inside Maximum Healthcare.",
    lede: "Clinic-supplied photographs of the waiting lounge, entrance, walkway, and consultation rooms in **Jammu**.",
    paragraphs: [
      "These photographs were supplied by Maximum Healthcare. They show the premises as they looked when the pictures were taken, not a live view of who is in the clinic today.",
      "Call before you visit if you need to know about access, parking, or which door to use.",
    ],
  },
  accreditations: [
    {
      id: "nabh",
      short: "NABH",
      name: "National Accreditation Board for Hospitals & Healthcare Providers",
    },
    {
      id: "nabl",
      short: "NABL",
      name: "National Accreditation Board for Testing and Calibration Laboratories",
    },
    {
      id: "afi",
      short: "AFI",
      name: "Arthritis Foundation of India",
    },
  ],
  principles: [
    {
      kicker: "Location",
      title: "Prime Jammu location",
      body: "Centrally located at **Gole Market**, opposite Peer Baba, Apsara Road, Jammu, with easy access and parking.",
    },
    {
      kicker: "Hours",
      title: "Flexible hours",
      body: "Open **seven days a week**. Monday to Saturday, 10:00 am–6:00 pm. Sunday, 9:00 am–3:30 pm.",
    },
    {
      kicker: "Support",
      title: "Direct clinic support",
      body: "Phone assistance for queries and consultations at **94190 29200**.",
    },
    {
      kicker: "Booking",
      title: "Hassle-free booking",
      body: "Request an appointment online. The team calls back to **confirm your visit time**. The form itself does not reserve a slot.",
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
      body: "Call **94190 29200**, or send a preferred day and part of the day. The request does not reserve that time.",
    },
    {
      number: "03",
      title: "Visit the clinic",
      body: "Use the published **address and hours** before you travel. Ask the clinic what to bring when the visit is confirmed.",
    },
    {
      number: "04",
      title: "Follow up",
      body: "If further contact is needed, the clinic arranges it after the visit. This website does not book follow-up appointments by itself.",
    },
  ],
  gallery: [
    {
      slug: "waiting-lounge",
      title: "Waiting lounge",
      caption: "The indoor waiting lounge at Maximum Healthcare, Jammu.",
      alt: "Indoor waiting lounge at Maximum Healthcare in Gandhi Nagar, with seating along the walls and a Maximum Healthcare display.",
      src: "/media/gallery/waiting-lounge.jpg",
      width: 1024,
      height: 768,
    },
    {
      slug: "entrance",
      title: "Entrance",
      caption: "The covered entrance and walkway into the clinic.",
      alt: "Covered entrance to Maximum Healthcare in Gandhi Nagar, with a welcome sign above the walkway.",
      src: "/media/gallery/entrance.jpg",
      width: 1024,
      height: 739,
    },
    {
      slug: "outdoor-walkway",
      title: "Outdoor walkway",
      caption: "Seating along the covered walkway outside the consultation rooms.",
      alt: "Covered outdoor walkway at Maximum Healthcare in Gandhi Nagar, with seating, plants, and clinic displays.",
      src: "/media/gallery/outdoor-walkway.jpg",
      width: 1024,
      height: 768,
    },
    {
      slug: "consultation-desk",
      title: "Consultation room",
      caption: "A consultation room with a desk beside the windows.",
      alt: "Consultation room at Maximum Healthcare, with a desk, chairs, and tall windows.",
      src: "/media/gallery/consultation-desk.jpg",
      width: 1024,
      height: 768,
    },
    {
      slug: "consultation-exam",
      title: "Examination room",
      caption: "A consultation room with an examination couch.",
      alt: "Consultation room at Maximum Healthcare, with a desk, examination couch, and wall niche.",
      src: "/media/gallery/consultation-exam.jpg",
      width: 1024,
      height: 768,
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
      slug: "bone-joint-care",
      name: "Bone & Joint Care",
      pageTitle: "Advanced Bone & Joint Care",
      summary:
        "Comprehensive diagnostics, **non-surgical therapies**, and surgical solutions for long-term mobility.",
      paragraphs: [
        "At Maximum Healthcare, we provide tailored treatment plans for a wide range of **musculoskeletal** conditions. From precision diagnostics to specialised **joint preservation** and post-injury care, our focus is on relieving pain and restoring your active lifestyle.",
      ],
      icon: "joint",
      procedures: [
        "Hip Preservation & Joint Care",
        "Knee Care & Mobility",
        "Shoulder & Upper Limb Care",
        "Elbow & Forearm Conditions",
        "Advanced Fracture Management",
        "Sports Injury Rehabilitation",
      ],
      offerings: [
        {
          title: "Hip Preservation & Joint Care",
          body: "Evaluation and management of chronic hip pain, arthritis, and joint restoration.",
        },
        {
          title: "Knee Care & Mobility",
          body: "Comprehensive treatment for ligament tears, cartilage wear, and knee joint disorders.",
        },
        {
          title: "Shoulder & Upper Limb Care",
          body: "Relief from rotator cuff issues, shoulder stiffness, and tendon injuries.",
        },
        {
          title: "Elbow & Forearm Conditions",
          body: "Specialised care for tennis elbow, joint inflammation, and nerve compression.",
        },
        {
          title: "Advanced Fracture Management",
          body: "Precision trauma care, bone setting, and alignment restoration.",
        },
        {
          title: "Sports Injury Rehabilitation",
          body: "Targeted treatment for athletic strain, joint instability, and soft tissue injuries.",
        },
      ],
      guidance:
        "Treatment duration, procedure protocols, and consultation fees are determined after an in-person diagnostic evaluation. Contact our medical desk to discuss your specific symptoms.",
    },
    {
      slug: "spine-care",
      name: "Spine Care & Rehabilitation",
      summary:
        "Advanced diagnostics, **non-surgical relief**, and expert care for chronic back pain, herniated discs, and spinal health.",
      paragraphs: [
        "Back and spine conditions require precise evaluation and specialised care. At Maximum Healthcare, we focus on relieving chronic discomfort, correcting **spinal alignment**, and restoring your freedom of movement through targeted medical interventions and rehabilitation.",
      ],
      icon: "spine",
      offeringsTitle: "Core specialties and treatments",
      callLabel: "Call Clinic",
      procedures: [
        "Chronic Back Pain Relief",
        "Disc Disorders",
        "Spinal Stenosis Management",
        "Posture Correction & Scoliosis",
        "Minimally Invasive Spine Procedures",
        "Spine Trauma & Injury Care",
      ],
      offerings: [
        {
          title: "Chronic Back Pain Relief",
          body: "Comprehensive diagnostic approaches to identify root causes of lower and upper back pain.",
        },
        {
          title: "Disc Disorders",
          body: "Expert care for slipped or herniated discs, relieving nerve compression and pain.",
        },
        {
          title: "Spinal Stenosis Management",
          body: "Tailored treatment plans to reduce spinal canal pressure and improve mobility.",
        },
        {
          title: "Posture Correction & Scoliosis",
          body: "Early assessment, therapeutic guidance, and corrective spine alignment care.",
        },
        {
          title: "Minimally Invasive Spine Procedures",
          body: "Advanced techniques designed for faster recovery, minimal scarring, and effective pain management.",
        },
        {
          title: "Spine Trauma & Injury Care",
          body: "Prompt medical assessment and stabilisation for acute spinal injuries.",
        },
      ],
      guidance:
        "Treatment protocols, therapy schedules, and consultation fees are determined following a personal clinical evaluation with our specialists. Feel free to call our desk for specific inquiries.",
    },
    {
      slug: "arthritis-treatment",
      name: "Arthritis Treatment",
      pageTitle: "Arthritis & Joint Wellness Care",
      summary:
        "**Evidence-based** medical management to relieve joint pain, restore flexibility, and protect your long-term mobility.",
      paragraphs: [
        "Chronic joint pain and inflammation should not limit your daily life. At Maximum Healthcare, we deliver personalised, **evidence-based** treatment plans tailored to slow joint degeneration, manage inflammation, and help you live an active, pain-free life.",
      ],
      icon: "arthritis",
      offeringsTitle: "Core conditions and advanced therapies",
      callLabel: "Call Clinic",
      procedures: [
        "Osteoarthritis Management",
        "Rheumatoid Arthritis Care",
        "Gout & Metabolic Joint Pain",
        "Juvenile Arthritis Support",
        "Holistic Arthritis Management",
        "Advanced Regenerative Therapies",
      ],
      offerings: [
        {
          title: "Osteoarthritis Management",
          body: "Comprehensive non-surgical strategies, joint lubrication, and lifestyle adjustments to protect cartilage health.",
        },
        {
          title: "Rheumatoid Arthritis Care",
          body: "Targeted medical interventions to control systemic joint inflammation and prevent joint deformity.",
        },
        {
          title: "Gout & Metabolic Joint Pain",
          body: "Rapid relief protocols for acute gout flare-ups and long-term uric acid management.",
        },
        {
          title: "Juvenile Arthritis Support",
          body: "Specialised, compassionate evaluation and management tailored for young patients.",
        },
        {
          title: "Holistic Arthritis Management",
          body: "Multidisciplinary plans combining medication, physical therapy, and joint preservation.",
        },
        {
          title: "Advanced Regenerative Therapies",
          body: "Modern non-surgical options, including PRP therapies, to promote tissue healing and joint comfort.",
        },
      ],
      guidance:
        "Treatment plans, therapy duration, and procedure costs are determined after a thorough clinical assessment. Contact our medical team to learn more about suitable care options.",
    },
    {
      slug: "foot-ankle-care",
      name: "Foot & Ankle Care",
      pageTitle: "Advanced Foot & Ankle Care",
      summary:
        "Targeted treatment plans for **alignment correction**, sports injuries, and long-term mobility support.",
      paragraphs: [
        "Your feet and ankles carry the weight of your daily life. At Maximum Healthcare, we provide specialised care to correct structural alignment issues, treat traumatic or sports-related injuries, and eliminate heel and foot pain so you can walk with confidence.",
      ],
      icon: "foot",
      offeringsTitle: "Core conditions and specialised treatments",
      callLabel: "Call Clinic",
      procedures: [
        "Ankle Sprain & Ligament Recovery",
        "Flat Foot & Alignment Correction",
        "Heel Pain & Plantar Fasciitis",
        "Foot Deformity Management",
        "Athletic & Sports Injury Care",
        "Bunions & Toe Condition Relief",
      ],
      offerings: [
        {
          title: "Ankle Sprain & Ligament Recovery",
          body: "Comprehensive treatment for acute sprains, ligament tears, and chronic ankle instability.",
        },
        {
          title: "Flat Foot & Alignment Correction",
          body: "Customised orthotic guidance and therapeutic care for arch support and gait alignment.",
        },
        {
          title: "Heel Pain & Plantar Fasciitis",
          body: "Targeted therapy to relieve morning stiffness, heel inflammation, and chronic arch pain.",
        },
        {
          title: "Foot Deformity Management",
          body: "Specialised clinical evaluation for structural foot conditions and corrective care.",
        },
        {
          title: "Athletic & Sports Injury Care",
          body: "Rapid recovery plans for tendon strain, Achilles tendinitis, and sports-related foot trauma.",
        },
        {
          title: "Bunions & Toe Condition Relief",
          body: "Non-invasive and surgical options to relieve bunion pressure and toe joint discomfort.",
        },
      ],
      guidance:
        "Treatment duration, specialised orthotic solutions, and procedure costs are determined after a thorough clinical assessment. Contact our helpdesk for specific inquiries.",
    },
  ] satisfies Service[],
  testimonials: [] as Testimonial[],
};

export function getFaqs() {
  const numbers = clinic.phones.map((item) => item.display).join(" or ");
  return [
    {
      question: "How can I book an appointment?",
      answer:
        `Call **${numbers}**, or submit an **appointment request** online with your preferred day and part of the day. Our team reviews every request and calls you back to confirm a suitable visit time.`,
    },
    {
      question: "What are the clinic's opening hours?",
      answer: clinic.hours,
    },
    {
      question: "Where is the clinic located?",
      answer:
        "Maximum Healthcare serves **Jammu, Srinagar, and Rajouri**. The Jammu centre is at **Gole Market, 358/A**, opposite Peer Baba, Apsara Road, Gandhi Nagar, Jammu, Jammu and Kashmir 180004. Use the Contact page for directions and to reach the team about Srinagar or Rajouri visits.",
    },
    {
      question: "What services are available?",
      answer:
        "We provide **bone and joint care**, **spine care and rehabilitation**, **arthritis treatment**, and **foot and ankle care**. When you call or send a request, our team can guide you to the most suitable consultation.",
    },
    {
      question: "What should I bring to my first visit?",
      answer:
        "Please bring a **government-issued ID**, any previous reports or imaging related to your concern, a list of current medicines, and referral or insurance papers if you have them. Our team can confirm any additional requirements when your visit is arranged.",
    },
    {
      question: "How can I reschedule an appointment?",
      answer: `To reschedule or cancel a confirmed visit, please call **${numbers}** and share the appointment details already confirmed with you. Our administrative team will help you arrange a new time.`,
    },
    {
      question: "Which payment methods are accepted?",
      answer:
        "Our team will guide you on accepted payment options when your visit is confirmed or when you arrive at the clinic. For any billing query before your appointment, call the helpdesk.",
    },
    {
      question: "How can I contact the clinic?",
      answer: `Call **${numbers}** during operational hours, or email **${clinic.email}**. You can also use the Contact page for directions and for our Instagram and Facebook links.`,
    },
    {
      question: "What accreditations does the clinic hold?",
      answer:
        "Maximum Healthcare Pvt. Ltd. maintains affiliations and accreditations with **NABH**, **NABL**, and the **Arthritis Foundation of India**. Full details are available on the About page.",
    },
    {
      question: "Are there jobs at the clinic?",
      answer:
        "We welcome applications of interest through the **Careers** page. Share your details with our team, and we will review your profile for suitable openings across our departments.",
    },
    {
      question: "Are there videos of the clinic?",
      answer:
        "Yes. Educational films on **spine care** and **arthritis care** are available on the Videos page. They introduce our approach and support patient understanding before a consultation.",
    },
    {
      question: "Can I see photographs of the rooms?",
      answer:
        "Yes. Photographs of the waiting lounge, entrance, walkway, and consultation rooms are available on the **Gallery** page.",
    },
  ];
}
