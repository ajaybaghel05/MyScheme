import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { questions, Question } from "@/data/questions";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { X } from "lucide-react";

export function Questionnaire() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dynamicQuestions, setDynamicQuestions] = useState<Question[] | null>(
    null
  );

  // Get the selected language from localStorage
  const selectedLanguage = localStorage.getItem("preferredLanguage") || "eng";
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const questionTranslation = currentQuestion.translations[selectedLanguage];

  console.log(currentQuestion);

  const handleNext = async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsSubmitting(true);
      setLoading(true);
      try {
        // Store answers in localStorage
        localStorage.setItem("questionnaireAnswers", JSON.stringify(answers));

        // Prepare the request body
        const requestBody = {
          residence: answers["residence"],
          state: answers["state"],
          age: parseInt(answers["age"]),
          gender:
            answers["gender"] === "male"
              ? true
              : answers["gender"] === "female"
              ? false
              : null,
          casteCategory: answers["social-category"],
          disability: answers["disability"] === "true",
          preferredLang: localStorage.getItem("preferredLanguage") || "eng",
        };

        console.log(requestBody);

        // Make POST request to the server
        const response = await fetch(
          "http://localhost:4000/schemes/questionnaire",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to submit questionnaire");
        }

        // Store the response data
        localStorage.setItem("schemeResults", JSON.stringify(data));
        console.log(data);
        // If we get dynamic questions, show DynamicQuestionnaire
        if (
          data.response &&
          data.response.questions &&
          Array.isArray(data.response.questions.questions) &&
          data.response.questions.questions.length > 0
        ) {
          setDynamicQuestions(data.response.questions.questions);
        } else if (data.response && data.response.error) {
          console.log({
            error: data.response.error,
          });
          alert("Server error: " + data.response.error);
        }
      } catch (error) {
        console.error("Error submitting questionnaire:", error);
        alert(
          error instanceof Error
            ? error.message
            : "Failed to submit questionnaire. Please try again."
        );
      } finally {
        setIsSubmitting(false);
        setLoading(false);
      }
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };
  const renderQuestion = (question: Question) => {
    const translation = question.translations[selectedLanguage];

    switch (question.type) {
      case "radio":
        return (
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={handleAnswerChange}
            className="flex flex-col space-y-3"
          >
            {translation.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "select":
        return (
          <Select
            value={answers[question.id] || ""}
            onValueChange={handleAnswerChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  selectedLanguage === "eng"
                    ? "Select an option"
                    : selectedLanguage === "hin"
                    ? "एक विकल्प चुनें"
                    : "ಒಂದು ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {translation.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "number":
        return (
          <div className="space-y-2">
            <Input
              type="number"
              min={5}
              max={100}
              value={answers[question.id] || ""}
              onChange={(e) => {
                const value = e.target.value;
                handleAnswerChange(value);
              }}
              onSubmit={(e) => {
                const value = (e.target as HTMLInputElement).value;
                if (Number(value) > 5 && Number(value) < 100) {
                  handleAnswerChange(value);
                }
              }}
              placeholder="Enter age (5-100)"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              {selectedLanguage === "eng"
                ? "Age must be between 5 and 100 years"
                : selectedLanguage === "hin"
                ? "आयु 5 से 100 वर्ष के बीच होनी चाहिए"
                : "ವಯಸ್ಸು 5 ರಿಂದ 100 ವರ್ಷಗಳ ನಡುವೆ ಇರಬೇಕು"}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Loader */}
        {loading && (
          <div className="w-full h-[60vh] flex items-center justify-center">
            <MultiStepLoader loading={loading} duration={2000} />
          </div>
        )}
        {/* Show regular questionnaire if not loading and no dynamic questions */}
        {!loading && !dynamicQuestions && (
          <>
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                <span>
                  {selectedLanguage === "eng"
                    ? `Question ${
                        currentQuestionIndex + 1
                      } of ${totalQuestions}`
                    : selectedLanguage === "hin"
                    ? `प्रश्न ${currentQuestionIndex + 1} / ${totalQuestions}`
                    : `ಪ್ರಶ್ನೆ ${currentQuestionIndex + 1} / ${totalQuestions}`}
                </span>
                <span>
                  {Math.round(
                    ((currentQuestionIndex + 1) / totalQuestions) * 100
                  )}
                  %
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / totalQuestions) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-semibold">
                  {questionTranslation.text}
                </h2>
                <div className="min-h-[120px]">
                  {renderQuestion(currentQuestion)}
                </div>
                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id] || isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {currentQuestionIndex < totalQuestions - 1
                    ? selectedLanguage === "eng"
                      ? "Next"
                      : selectedLanguage === "hin"
                      ? "आगे बढ़ें"
                      : "ಮುಂದೆ"
                    : selectedLanguage === "eng"
                    ? "Submit"
                    : selectedLanguage === "hin"
                    ? "जमा करें"
                    : "ಸಲ್ಲಿಸು"}
                </Button>
              </motion.div>
            </AnimatePresence>
          </>
        )}
        {/* Show dynamic questionnaire if present and not loading */}
        {!loading && dynamicQuestions && (
          <DynamicQuestionnaire questions={dynamicQuestions} />
        )}
      </div>
    </div>
  );
}

// DynamicQuestionnaire component for dynamic questions
export function DynamicQuestionnaire({ questions }: { questions: any[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  // For dynamic questions, text is a string, not an object
  const questionText = currentQuestion;

  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentAnswer(answers[currentQuestionIndex + 1] || "");
    } else {
      setIsSubmitting(true);
      setTimeout(async () => {
        setIsSubmitting(false);
        // Add answers to schemeResults in localStorage
        const resultsRaw = localStorage.getItem("schemeResults");
        if (resultsRaw) {
          try {
            const results = JSON.parse(resultsRaw);
            if (
              results.response &&
              results.response.questions &&
              Array.isArray(results.response.questions.questions)
            ) {
              // Add answers array to the responses section
              results.response.userAnswers = updatedAnswers;
              localStorage.setItem("schemeResults", JSON.stringify(results));

              // Prepare payload for axios POST
              const payload = {
                questions: results.response.questions.questions.map(
                  (q: any) => q.text || q
                ),
                answers: updatedAnswers,
                response: results.response.filteredCandidates || [],
              };
              try {
                const filterRes = await fetch(
                  "http://localhost:4000/schemes/filter_schemes",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                  }
                );
                const filterData = await filterRes.json();
                // If response contains schemes, navigate to SchemeDetails
                if (filterData && filterData.response) {
                  // Save schemes to localStorage if needed
                  localStorage.setItem(
                    "finalSchemeResults",
                    JSON.stringify(filterData)
                  );
                  // Navigate to SchemeDetails page using react-router
                  window.location.href = "/scheme-list";
                  // Alternatively, if using react-router's navigate, you could do:
                  // navigate("/scheme-details", { state: { schemes: filterData.response } });
                  return;
                }
              } catch (err) {
                // Optionally handle error
                console.error("Failed to send to filter_schemes endpoint", err);
              }
            }
          } catch (e) {
            // If parsing fails, do nothing
          }
        }
        alert(
          "Dynamic questionnaire submitted!\n" +
            JSON.stringify({ answers: updatedAnswers }, null, 2)
        );
      }, 1000);
    }
  };

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
  };

  // On question change, set currentAnswer from answers array
  React.useEffect(() => {
    setCurrentAnswer(answers[currentQuestionIndex] || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>
              {`Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
            </span>
            <span>
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              }}
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id || currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">
              {questionText.text || questionText}
            </h2>
            <div className="min-h-[120px]">
              <Input
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Type your answer"
                className="w-full"
              />
            </div>
            <Button
              onClick={handleNext}
              disabled={!currentAnswer || isSubmitting}
              className="w-full"
              size="lg"
            >
              {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Submit"}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
