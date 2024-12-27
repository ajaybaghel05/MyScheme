export type QuestionType = "select" | "radio" | "number";

export interface QuestionTranslation {
  text: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  translations: {
    [key: string]: QuestionTranslation;
  };
}

export const questions: Question[] = [
  {
    id: "gender",
    type: "radio",
    translations: {
      eng: {
        text: "What is your gender?",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ],
      },
      hin: {
        text: "आपका लिंग क्या है?",
        options: [
          { value: "male", label: "पुरुष" },
          { value: "female", label: "महिला" },
          { value: "other", label: "अन्य" },
        ],
      },
      kan: {
        text: "ನಿಮ್ಮ ಲಿಂಗ ಯಾವುದು?",
        options: [
          { value: "male", label: "ಪುರುಷ" },
          { value: "female", label: "ಮಹಿಳೆ" },
          { value: "other", label: "ಇತರೆ" },
        ],
      },
    },
  },
  {
    id: "age",
    type: "number",
    translations: {
      eng: {
        text: "How old are you?",
        placeholder: "Enter your age",
        min: 18,
        max: 100,
      },
      hin: {
        text: "आपकी उम्र क्या है?",
        placeholder: "अपनी उम्र दर्ज करें",
        min: 18,
        max: 100,
      },
      kan: {
        text: "ನಿಮ್ಮ ವಯಸ್ಸು ಎಷ್ಟು?",
        placeholder: "ನಿಮ್ಮ ವಯಸ್ಸನ್ನು ನಮೂದಿಸಿ",
        min: 18,
        max: 100,
      },
    },
  },
  {
    id: "residence",
    type: "radio",
    translations: {
      eng: {
        text: "Do you live in an urban or rural area?",
        options: [
          { value: "urban", label: "Urban" },
          { value: "rural", label: "Rural" },
        ],
      },
      hin: {
        text: "क्या आप शहरी या ग्रामीण क्षेत्र में रहते हैं?",
        options: [
          { value: "urban", label: "शहरी" },
          { value: "rural", label: "ग्रामीण" },
        ],
      },
      kan: {
        text: "ನೀವು ನಗರ ಅಥವಾ ಗ್ರಾಮೀಣ ಪ್ರದೇಶದಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಾ?",
        options: [
          { value: "urban", label: "ನಗರ" },
          { value: "rural", label: "ಗ್ರಾಮೀಣ" },
        ],
      },
    },
  },
  {
    id: "state",
    type: "select",
    translations: {
      eng: {
        text: "Which state do you live in?",
        options: [
          { value: "andhra-pradesh", label: "Andhra Pradesh" },
          { value: "assam", label: "Assam" },
          { value: "bihar", label: "Bihar" },
          { value: "chhattisgarh", label: "Chhattisgarh" },
          { value: "goa", label: "Goa" },
          { value: "gujarat", label: "Gujarat" },
          { value: "haryana", label: "Haryana" },
          { value: "himachal-pradesh", label: "Himachal Pradesh" },
          { value: "jharkhand", label: "Jharkhand" },
          { value: "karnataka", label: "Karnataka" },
          { value: "kerala", label: "Kerala" },
          { value: "madhya-pradesh", label: "Madhya Pradesh" },
          { value: "maharashtra", label: "Maharashtra" },
          { value: "manipur", label: "Manipur" },
          { value: "meghalaya", label: "Meghalaya" },
          { value: "mizoram", label: "Mizoram" },
          { value: "nagaland", label: "Nagaland" },
          { value: "odisha", label: "Odisha" },
          { value: "punjab", label: "Punjab" },
          { value: "rajasthan", label: "Rajasthan" },
          { value: "sikkim", label: "Sikkim" },
          { value: "tamil-nadu", label: "Tamil Nadu" },
          { value: "telangana", label: "Telangana" },
          { value: "tripura", label: "Tripura" },
          { value: "uttar-pradesh", label: "Uttar Pradesh" },
          { value: "uttarakhand", label: "Uttarakhand" },
          { value: "west-bengal", label: "West Bengal" },
        ],
      },
      hin: {
        text: "आप किस राज्य में रहते हैं?",
        options: [
          { value: "andhra-pradesh", label: "आंध्र प्रदेश" },
          { value: "assam", label: "असम" },
          { value: "bihar", label: "बिहार" },
          { value: "chhattisgarh", label: "छत्तीसगढ़" },
          { value: "goa", label: "गोवा" },
          { value: "gujarat", label: "गुजरात" },
          { value: "haryana", label: "हरियाणा" },
          { value: "himachal-pradesh", label: "हिमाचल प्रदेश" },
          { value: "jharkhand", label: "झारखंड" },
          { value: "karnataka", label: "कर्नाटक" },
          { value: "kerala", label: "केरल" },
          { value: "madhya-pradesh", label: "मध्य प्रदेश" },
          { value: "maharashtra", label: "महाराष्ट्र" },
          { value: "manipur", label: "मणिपुर" },
          { value: "meghalaya", label: "मेघालय" },
          { value: "mizoram", label: "मिजोरम" },
          { value: "nagaland", label: "नागालैंड" },
          { value: "odisha", label: "उड़ीसा" },
          { value: "punjab", label: "पंजाब" },
          { value: "rajasthan", label: "राजस्थान" },
          { value: "sikkim", label: "सिक्किम" },
          { value: "tamil-nadu", label: "तमिलनाडु" },
          { value: "telangana", label: "तेलंगाना" },
          { value: "tripura", label: "त्रिपुरा" },
          { value: "uttar-pradesh", label: "उत्तर प्रदेश" },
          { value: "uttarakhand", label: "उत्तराखंड" },
          { value: "west-bengal", label: "पश्चिम बंगाल" },
        ],
      },
      kan: {
        text: "ನೀವು ಯಾವ ರಾಜ್ಯದಲ್ಲಿ ವಾಸಿಸುತ್ತೀರಿ?",
        options: [
          { value: "andhra-pradesh", label: "ಆಂಧ್ರ ಪ್ರದೇಶ" },
          { value: "assam", label: "ಅಸ್ಸಾಂ" },
          { value: "bihar", label: "ಬಿಹಾರ" },
          { value: "chhattisgarh", label: "ಛತ್ತೀಸ್‌ಗಢ್" },
          { value: "goa", label: "ಗೋವಾ" },
          { value: "gujarat", label: "ಗುಜರಾತ್" },
          { value: "haryana", label: "ಹರಿಯಾಣ" },
          { value: "himachal-pradesh", label: "ಹಿಮಾಚಲ ಪ್ರದೇಶ" },
          { value: "jharkhand", label: "ಜಾರ್ಖಂಡ್" },
          { value: "karnataka", label: "ಕರ್ನಾಟಕ" },
          { value: "kerala", label: "ಕೇರಳ" },
          { value: "madhya-pradesh", label: "ಮಧ್ಯ ಪ್ರದೇಶ" },
          { value: "maharashtra", label: "ಮಹಾರಾಷ್ಟ್ರ" },
          { value: "manipur", label: "ಮಣಿಪುರ" },
          { value: "karnataka", label: "ಕರ್ನಾಟಕ" },
          { value: "kerala", label: "ಕೇರಳ" },
          { value: "madhya-pradesh", label: "ಮಧ್ಯ ಪ್ರದೇಶ" },
          { value: "maharashtra", label: "ಮಹಾರಾಷ್ಟ್ರ" },
          { value: "manipur", label: "ಮಣಿಪುರ" },
          { value: "meghalaya", label: "ಮೇಘಾಲಯ" },
          { value: "mizoram", label: "ಮಿಜೋರಮ್" },
          { value: "nagaland", label: "ನಾಗಾಲೆಂಡ್" },
          { value: "odisha", label: "ಓಡಿಶಾ" },
          { value: "punjab", label: "ಪಂಜಾಬ್" },
          { value: "rajasthan", label: "ರಾಜಸ್ಥಾನ" },
          { value: "sikkim", label: "ಸಿಕ್ಕಿಂ" },
          { value: "tamil-nadu", label: "ತಮಿಳುನಾಡು" },
          { value: "telangana", label: "ತೇಲಂಗಾಣ" },
          { value: "tripura", label: "ತ್ರಿಪುರಾ" },
          { value: "uttar-pradesh", label: "ಉತ್ತರ ಪ್ರದೇಶ" },
          { value: "uttarakhand", label: "ಉತ್ತರಾಖಂಡ" },
          { value: "west-bengal", label: "ಪಶ್ಚಿಮ ಬಂಗಾಳ" },
        ],
      },
    },
  },
  {
    id: "social-category",
    type: "select",
    translations: {
      eng: {
        text: "What is your social category?",
        options: [
          { value: "OBC", label: "OBC" },
          { value: "VJNT and SBC", label: "VJNT and SBC" },
          { value: "BC/EBC", label: "BC/EBC" },
          { value: "EWS", label: "EWS" },
          { value: "minority", label: "Minority" },
          { value: "EBC", label: "EBC" },
          { value: "SC and ST", label: "SC and ST" },
          { value: "ST", label: "ST" },
          { value: "General", label: "General" },
          { value: "Gadiya Lohar", label: "Gadiya Lohar" },
          { value: "Charmakar Community", label: "Charmakar Community" },
        ],
      },
      hin: {
        text: "आपकी सामाजिक श्रेणी क्या है?",
        options: [
          { value: "OBC", label: "ओबीसी" },
          { value: "VJNT and SBC", label: "विमुक्त जाति और विशेष पिछड़ा वर्ग" },
          { value: "BC/EBC", label: "पिछड़ा वर्ग/अत्यंत पिछड़ा वर्ग" },
          { value: "EWS", label: "आर्थिक रूप से कमजोर वर्ग" },
          { value: "minority", label: "अल्पसंख्यक" },
          { value: "EBC", label: "अत्यंत पिछड़ा वर्ग" },
          { value: "SC and ST", label: "अनुसूचित जाति और जनजाति" },
          { value: "ST", label: "अनुसूचित जनजाति" },
          { value: "General", label: "सामान्य" },
          { value: "Gadiya Lohar", label: "गडिया लोहार" },
          { value: "Charmakar Community", label: "चर्मकार समुदाय" },
        ],
      },
      kan: {
        text: "ನಿಮ್ಮ ಸಾಮಾಜಿಕ ವರ್ಗ ಯಾವುದು?",
        options: [
          { value: "OBC", label: "ಒಬಿಸಿ" },
          {
            value: "VJNT and SBC",
            label: "ವಿಮುಕ್ತ ಜಾತಿ ಮತ್ತು ವಿಶೇಷ ಹಿಂದುಳಿದ ವರ್ಗ",
          },
          { value: "BC/EBC", label: "ಹಿಂದುಳಿದ ವರ್ಗ/ಅತ್ಯಂತ ಹಿಂದುಳಿದ ವರ್ಗ" },
          { value: "EWS", label: "ಆರ್ಥಿಕವಾಗಿ ದುರ್ಬಲ ವರ್ಗ" },
          { value: "minority", label: "ಅಲ್ಪಸಂಖ್ಯಾತ" },
          { value: "EBC", label: "ಅತ್ಯಂತ ಹಿಂದುಳಿದ ವರ್ಗ" },
          { value: "SC and ST", label: "ಪರಿಶಿಷ್ಟ ಜಾತಿ ಮತ್ತು ಪರಿಶಿಷ್ಟ ಪಂಗಡ" },
          { value: "ST", label: "ಪರಿಶಿಷ್ಟ ಪಂಗಡ" },
          { value: "General", label: "ಸಾಮಾನ್ಯ" },
          { value: "Gadiya Lohar", label: "ಗಡಿಯಾ ಲೋಹಾರ್" },
          { value: "Charmakar Community", label: "ಚರ್ಮಕಾರ ಸಮುದಾಯ" },
        ],
      },
    },
  },
  {
    id: "disability",
    type: "radio",
    translations: {
      eng: {
        text: "Are you a person with a disability?",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      hin: {
        text: "क्या आप दिव्यांग व्यक्ति हैं?",
        options: [
          { value: "yes", label: "हाँ" },
          { value: "no", label: "नहीं" },
        ],
      },
      kan: {
        text: "ನೀವು ಅಂಗವಿಕಲತೆ ಹೊಂದಿರುವ ವ್ಯಕ್ತಿಯೇ?",
        options: [
          { value: "yes", label: "ಹೌದು" },
          { value: "no", label: "ಇಲ್ಲ" },
        ],
      },
    },
  },
];
