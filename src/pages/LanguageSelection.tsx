import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

const languages = [
  { value: "eng", label: "English" },
  { value: "hin", label: "हिंदी" },
  { value: "kan", label: "ಕನ್ನಡ" },
];

export function LanguageSelection() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handleNext = () => {
    if (selectedLanguage) {
      // Store language preference in localStorage or state management
      localStorage.setItem("preferredLanguage", selectedLanguage);
      navigate("/schemes/questionnaire");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[80vh] flex-col items-center justify-center space-y-8 px-4"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Choose Your Language
        </h1>
        <p className="text-muted-foreground">
          Select your preferred language to continue
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Select onValueChange={setSelectedLanguage} value={selectedLanguage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={handleNext}
          disabled={!selectedLanguage}
          className="w-full"
          size="lg"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}
