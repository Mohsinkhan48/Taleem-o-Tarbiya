import { useState } from "react";
import { motion } from "framer-motion";
import images from "../images";
// import { useHistory } from "react-router-dom";



const modules = [
  {
    id: 1,
    title: "Module 1",
    subheadings: [
      {
        id: 101,
        title: "زکوٰۃ کا تعارف اور اس کی اہمیت",
        type: "text",
        content:
          "زکوٰۃ کا تعارف:\nزکوٰۃ اسلام کے بنیادی ارکان میں سے ایک اہم رکن ہے، جو ہر صاحب نصاب مسلمان پر فرض ہے۔ زکوٰۃ کا لغوی مطلب پاکیزگی اور بڑھوتری ہے، جبکہ اصطلاحی طور پر یہ ایک ایسی عبادت ہے جس میں اپنے مال کا مخصوص حصہ مستحقین میں تقسیم کیا جاتا ہے تاکہ دولت کا توازن برقرار رہے۔\n\nزکوٰۃ کی اہمیت:\nاسلام میں زکوٰۃ کی غیر معمولی اہمیت ہے، اور اسے قرآن میں 30 سے زائد مقامات پر ذکر کیا گیا ہے۔ قرآن پاک میں اللہ تعالیٰ فرماتے ہیں:\n\n\"وَاَقِيْمُوا الصَّلٰوةَ وَ اٰتُوا الزَّكٰوةَ وَ ارْكَعُوْا مَعَ الرّٰكِعِيْنَ\" (البقرہ: 43)\n\nترجمہ: \"نماز قائم کرو، زکوٰۃ دو، اور رکوع کرنے والوں کے ساتھ رکوع کرو۔\"\n\nیہ آیت ظاہر کرتی ہے کہ زکوٰۃ نماز کے ساتھ جوڑی گئی ہے، جو اس کی فرضیت اور اہمیت کو واضح کرتی ہے۔",
      },
      { id: 102, title: "زکوٰۃ کی افادیت اور فضیلت", type: "video", content: images.Zika_First },
    ],
  },
  {
    id: 2,
    title: "Module 2",
    subheadings: [
      { id: 201, title: "زکوٰۃ نہ دینے والوں کے لیے وعید", type: "video", content: images.Zika_Second },
      {
        id: 202,
        title: "زکوٰۃ - درجہ بندی شدہ کوئز",
        type: "quiz",
        content: [
          {
            id: 1,
            question: "قرآن کے مطابق ان لوگوں کے مال کا کیا انجام ہوگا جو سونا اور چاندی جمع کرتے ہیں لیکن اسے اللہ کی راہ میں خرچ نہیں کرتے؟",
            options: [
              "وہ ہمیشہ زمین میں دفن رہے گا",
              "وہ قیامت کے دن سانپ بن کر انہیں ڈسے گا",
              "وہ خود بخود غریبوں میں تقسیم ہو جائے گا",
              "وہ آگ میں بدل جائے گا اور ان کے گھروں کو جلا دے گا"
            ],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "قرآن کی کون سی آیت زکوٰۃ کی ادائیگی کا واضح حکم دیتی ہے؟",
            options: [
              "سورۃ الملک، آیت 2",
              "سورۃ البقرہ، آیت 43",
              "سورۃ الفلق، آیت 5",
              "سورۃ التوبہ، آیت 103"
            ],
            correctAnswer: 1,
          },
          {
            id: 3,
            question: "درج ذیل میں سے کون سا اسلام کا بنیادی رکن نہیں ہے؟",
            options: [
              "زکوٰۃ",
              "جہاد",
              "نماز",
              "حج"
            ],
            correctAnswer: 1,
          },
          {
            id: 4,
            question: "حدیث کے مطابق جو لوگ زکوٰۃ ادا نہیں کرتے ان کا کیا انجام ہوگا؟",
            options: [
              "ان سے سوال کیا جائے گا لیکن آخرکار معاف کر دیا جائے گا",
              "انہیں آخرت میں سخت عذاب کا سامنا کرنا پڑے گا",
              "اگر وہ باقاعدگی سے نماز پڑھیں تو ان کے گناہ معاف ہو جائیں گے",
              "انہیں اگلی زندگی میں زیادہ دولت دی جائے گی"
            ],
            correctAnswer: 1,
          },
          {
            id: 5,
            question: "اسلام میں زکوٰۃ کا بنیادی مقصد کیا ہے؟",
            options: [
              "ذاتی دولت میں اضافہ کرنا",
              "دولت کو پاک کرنا اور ضرورت مندوں کی مدد کرنا",
              "کاروباری منصوبوں میں سرمایہ کاری کرنا",
              "صرف دینی علماء کی مالی مدد کرنا"
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
  },
  {
    "id": 3,
    "title": "Module 3",
    "subheadings": [
      {
        "id": 101,
        "title": "زکوٰۃ اور معیشت کی ترقی ",
        "type": "text",
        "content": "زکوٰۃ اسلام کا ایک اہم رکن ہے جو نہ صرف مالی عبادت کا درجہ رکھتی ہے بلکہ اس کے بے شمار معاشی، سماجی اور روحانی فوائد بھی ہیں۔ زکوٰۃ کا بنیادی مقصد دولت کی گردش کو یقینی بنانا اور سماجی انصاف کو فروغ دینا ہے۔ جب امیر افراد اپنی دولت کا ایک مخصوص حصہ زکوٰۃ کی صورت میں مستحقین تک پہنچاتے ہیں تو اس سے دولت کی غیر منصفانہ تقسیم کم ہو جاتی ہے اور غربت میں نمایاں کمی آتی ہے۔\n\nزکوٰۃ کے ذریعے ضرورت مند افراد کو مالی امداد فراہم کی جاتی ہے جس کے نتیجے میں وہ اپنے روزمرہ کے اخراجات پورے کر سکتے ہیں اور عزت کے ساتھ زندگی گزار سکتے ہیں۔ اس عمل سے بھکاری پن کا خاتمہ ہوتا ہے اور لوگ خود کفیل بننے کی کوشش کرتے ہیں۔ قرآن کریم میں زکوٰۃ کی فرضیت کا مقصد واضح کیا گیا ہے تاکہ دولت چند ہاتھوں میں محدود نہ رہے بلکہ سماج کے تمام افراد کو اس کا فائدہ پہنچے۔\n\nزکوٰۃ کا سب سے بڑا معاشی فائدہ یہ ہے کہ اس سے مارکیٹ میں پیسہ گردش میں رہتا ہے اور معاشی جمود (Economic stagnation) پیدا نہیں ہوتا۔ اس کے علاوہ، زکوٰۃ سودی نظام کے خاتمے میں بھی اہم کردار ادا کرتی ہے کیونکہ جب دولت کا بہاؤ درست سمت میں ہو تو لوگوں کو غیر شرعی طریقوں جیسے سود پر انحصار کرنے کی ضرورت نہیں رہتی۔\n\nسماجی سطح پر زکوٰۃ ایثار، قربانی اور بھائی چارے کے جذبات کو فروغ دیتی ہے۔ اس سے امیر اور غریب کے درمیان فاصلے کم ہوتے ہیں اور ایک صحت مند معاشرہ تشکیل پاتا ہے جہاں لوگ ایک دوسرے کا خیال رکھتے ہیں۔ زکوٰۃ دینے والا شخص بخل، لالچ اور حبِ دنیا جیسی برائیوں سے محفوظ رہتا ہے جبکہ لینے والا شخص بھی احساسِ کمتری کا شکار ہونے کے بجائے اپنی مالی ضروریات پورا کر کے خود کفیل بننے کی طرف راغب ہوتا ہے۔\n\nروحانی طور پر زکوٰۃ ایمان کو مضبوط کرتی ہے اور انسان کو آخرت میں اجر و ثواب کی امید دلاتی ہے۔ قرآن و حدیث میں بارہا زکوٰۃ کے فضائل بیان کیے گئے ہیں اور اسے پاکیزگی، تزکیہ نفس اور اللہ کی رضا حاصل کرنے کا ذریعہ قرار دیا گیا ہے۔"
      },
      { id: 102, title: "زکوٰۃ کی افادیت اور فضیلت", type: "video", content: images.Zika_Third },
    ],
  },
  {
    "id": 4,
    "title": "Module 4",
    "subheadings": [
      { 
        "id": 201, 
        "title": "زکوٰۃ کے معاشرتی فوائد", 
        "type": "video", 
        "content": images.Zika_Fourth 
      },
      {
        "id": 202,
        "title": "زکوٰۃ کا شرعی اور فقہی پہلو - درجہ بندی شدہ کوئز",
        "type": "quiz",
        "content": [
          {
            "id": 1,
            "question": "زکوٰۃ کی فرضیت کس ہجری سال میں ہوئی؟",
            "options": ["1 ہجری", "2 ہجری", "3 ہجری", "5 ہجری"],
            "correctAnswer": 1
          },
          {
            "id": 2,
            "question": "زکوٰۃ کن افراد پر فرض ہے؟",
            "options": ["ہر مسلمان پر", "ہر بالغ اور صاحب نصاب مسلمان پر", "ہر بالغ شخص پر", "ہر نیک مسلمان پر"],
            "correctAnswer": 1
          },
          {
            "id": 3,
            "question": "نصابِ زکوٰۃ کتنے گرام سونے کے برابر ہوتا ہے؟",
            "options": ["50 گرام", "52.5 گرام", "60 گرام", "75 گرام"],
            "correctAnswer": 1
          },
          {
            "id": 4,
            "question": "زکوٰۃ کی رقم کن افراد کو دینا جائز نہیں؟",
            "options": ["والدین اور اولاد", "قریبی رشتہ دار", "فقیر اور مسکین", "یتیم بچے"],
            "correctAnswer": 0
          },
          {
            "id": 5,
            "question": "زکوٰۃ کن اموال پر فرض نہیں ہوتی؟",
            "options": ["سونا اور چاندی", "نقدی", "رہائشی مکان", "تجارتی مال"],
            "correctAnswer": 2
          },
          {
            "id": 6,
            "question": "قرآن میں زکوٰۃ ادا نہ کرنے والوں کے بارے میں کیا وارننگ دی گئی ہے؟",
            "options": ["ان پر دنیا میں قحط آئے گا", "انہیں آخرت میں سخت عذاب ہوگا", "ان کی دولت میں برکت ختم ہو جائے گی", "وہ ہمیشہ بیمار رہیں گے"],
            "correctAnswer": 1
          },
          {
            "id": 7,
            "question": "زکوٰۃ کن لوگوں پر خرچ نہیں کی جا سکتی؟",
            "options": ["حاجیوں پر", "قرض دار پر", "غلاموں کی آزادی پر", "عاملین زکوٰۃ پر"],
            "correctAnswer": 0
          },
          {
            "id": 8,
            "question": "زکوٰۃ کا بنیادی مقصد کیا ہے؟",
            "options": ["غربت میں اضافہ کرنا", "دولت کی غیر مساوی تقسیم کو بڑھانا", "معاشی انصاف قائم کرنا", "صرف دینی رہنماؤں کو فائدہ پہنچانا"],
            "correctAnswer": 2
          },
          {
            "id": 9,
            "question": "اگر کوئی شخص صاحبِ نصاب ہو اور وہ زکوٰۃ ادا نہ کرے تو اس کے بارے میں حدیث میں کیا ذکر ہے؟",
            "options": ["اس کے مال میں برکت ختم ہو جاتی ہے", "اس کا مال قیامت کے دن آگ بنا دیا جائے گا", "اس کے جسم پر بیماری آ جائے گی", "اس کی نسل زوال پذیر ہو جائے گی"],
            "correctAnswer": 1
          },
          {
            "id": 10,
            "question": "زکوٰۃ کا ایک اہم سماجی فائدہ کیا ہے؟",
            "options": ["دولت کا چند ہاتھوں میں ارتکاز", "غربت میں اضافہ", "امیر اور غریب کے درمیان نفرت", "سماجی انصاف اور بھائی چارہ"],
            "correctAnswer": 3
          }
        ]
      }
    ]
  }
  
];

export default function CourseContent() {
  const [currentModule, setCurrentModule] = useState(null);
  const [currentSubheading, setCurrentSubheading] = useState(null);
  const [completedSubheadings, setCompletedSubheadings] = useState({});
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    answers: {},
    isQuizComplete: false,
    feedback: null,
  });

  // const history = useHistory();

  const handleComplete = (subheadingId) => {
    setCompletedSubheadings((prev) => ({ ...prev, [subheadingId]: true }));
  };

  const handleNext = () => {
    if (!currentModule || !currentSubheading) return;
    const currentIndex = currentModule.subheadings.findIndex(
      (sub) => sub.id === currentSubheading.id
    );
    
    if (quizState.isQuizComplete) {
      // Redirect to the home page when the quiz is complete
      window.location.href = '/';  // Using plain JS
      // or if you're using React Router
      // history.push('/');
      return;
    }
  
    if (currentIndex < currentModule.subheadings.length - 1) {
      setCurrentSubheading(currentModule.subheadings[currentIndex + 1]);
    } else {
      const nextModuleIndex = modules.findIndex((mod) => mod.id === currentModule.id) + 1;
      if (nextModuleIndex < modules.length) {
        setCurrentModule(modules[nextModuleIndex]);
        setCurrentSubheading(modules[nextModuleIndex].subheadings[0]);
      }
    }
  };

  const handleQuizAnswer = (questionId, selectedOption) => {
    setQuizState((prevState) => {
      const updatedAnswers = { ...prevState.answers, [questionId]: selectedOption };
      return { ...prevState, answers: updatedAnswers };
    });
  };

  const handleQuizNext = () => {
    const currentQuestion = currentSubheading.content[quizState.currentQuestionIndex];
    const isCorrect = quizState.answers[currentQuestion.id] === currentQuestion.correctAnswer;
    setQuizState((prevState) => ({
      ...prevState,
      feedback: isCorrect ? "Correct!" : "Wrong, try again!",
    }));

    if (quizState.currentQuestionIndex < currentSubheading.content.length - 1) {
      setQuizState((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      }));
    } else {
      handleComplete(currentSubheading.id);
      setQuizState((prevState) => ({ ...prevState, isQuizComplete: true }));
    }
  };

  const renderQuiz = () => {
    const currentQuestion = currentSubheading.content[quizState.currentQuestionIndex];
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="transition-all"
      >
        <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>
        <ul className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <motion.li
              key={index}
              className="cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => handleQuizAnswer(currentQuestion.id, index)}
                className={`p-4 w-full rounded-lg text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-2xl ${
                  quizState.answers[currentQuestion.id] === index
                    ? "bg-green-500"
                    : "bg-blue-600"
                } ${quizState.feedback && quizState.feedback !== "Correct!" && quizState.answers[currentQuestion.id] === index ? "bg-red-500" : ""}`}
              >
                {option}
              </button>
            </motion.li>
          ))}
        </ul>
        {quizState.feedback && (
          <div className={`mt-4 text-lg ${quizState.feedback === "Correct!" ? "text-green-500" : "text-red-500"}`}>
            {quizState.feedback}
          </div>
        )}
        <button
          onClick={handleQuizNext}
          className="mt-6 p-2 bg-primaryColor text-white rounded-lg"
        >
          Next
        </button>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 p-5">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/4 bg-[#0E2431] p-5 text-white rounded-lg shadow-lg overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">زکوٰۃ کی اہمیت اور فوائد</h2>
        <ul>
          {modules.map((module) => (
            <li key={module.id} className="mb-4">
              <div
                className={`cursor-pointer font-semibold p-2 rounded-lg ${
                  currentModule?.id === module.id
                    ? "bg-yellow-300 text-blue-900"
                    : "text-white"
                }`}
                onClick={() => setCurrentModule(module.id === currentModule?.id ? null : module)}
              >
                {module.title}
              </div>
              {currentModule?.id === module.id && (
                <ul className="ml-4 mt-2">
                  {module.subheadings.map((sub) => (
                    <li key={sub.id} className="mb-2">
                      <div
                        className={`cursor-pointer p-2 rounded-lg ${
                          currentSubheading?.id === sub.id
                            ? "bg-gray-200 text-blue-900"
                            : "text-white"
                        }`}
                        onClick={() => setCurrentSubheading(sub)}
                      >
                        ▶ {sub.title}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-10 bg-white rounded-lg shadow-md overflow-auto"
      >
        {currentSubheading ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentSubheading.title}</h2>
            {currentSubheading.type === "text" ? (
              <p className="text-gray-700">{currentSubheading.content}</p>
            ) : currentSubheading.type === "video" ? (
              <iframe
                width="100%"
                height="400"
                src={currentSubheading.content}
                title={currentSubheading.title}
                frameBorder="0"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            ) : currentSubheading.type === "quiz" ? (
              renderQuiz()
            ) : null}
            <div className="mt-4">
            <button
  onClick={handleNext}
  className="p-2 bg-primaryColor text-white rounded-lg"
>
  {quizState.isQuizComplete ? "Finish" : "Next"}
</button>
            </div>
          </>
        ) : (
          <div className="text-center text-xl font-semibold text-gray-600">زکوٰۃ کی اہمیت اور فوائد
          زکوٰۃ اسلام کے بنیادی ارکان میں سے ایک اہم رکن ہے جو انسان کو مال کی محبت سے بچا کر سخاوت، ہمدردی اور تقویٰ کی راہ پر گامزن کرتی ہے۔ یہ نہ صرف غرباء اور مستحقین کی مدد کا ذریعہ ہے بلکہ معاشرتی انصاف اور اقتصادی توازن کو بھی برقرار رکھتی ہے۔ زکوٰۃ کی ادائیگی سے دل میں صفائی، مال میں برکت، اور سماج میں محبت و اخوت کو فروغ ملتا ہے۔ یہ عبادت دولت کی منصفانہ تقسیم کو یقینی بناتی ہے، جس سے سماجی ناہمواری کم ہوتی ہے اور معاشرہ خوشحالی کی طرف گامزن ہوتا ہے۔
          
          
          
          
          
          
          
          </div>
        )}
      </motion.div>
    </div>
  );
}
