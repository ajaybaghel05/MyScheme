import React from "react";
import { Schemes } from "@/components/sections/schemes";

// This component reads schemes from localStorage (finalSchemeResults) and displays them using the Schemes component
const SchemeListFromStorage: React.FC = () => {
  let schemes: any[] = [];
  const finalResultsRaw = localStorage.getItem("finalSchemeResults");
  if (finalResultsRaw) {
    try {
      const parsed = JSON.parse(finalResultsRaw);
      console.log(["YEHYASD"]);
      console.log(parsed);
      if (
        parsed &&
        parsed.response &&
        Array.isArray(parsed.response.response)
      ) {
        schemes = parsed.response.response;
      } else if (Array.isArray(parsed.response)) {
        schemes = parsed.response;
      } else if (Array.isArray(parsed.schemes)) {
        schemes = parsed.schemes;
      } else if (parsed.response && Array.isArray(parsed.response.schemes)) {
        schemes = parsed.response.schemes;
      } else if (
        parsed.response &&
        Array.isArray(parsed.response.filteredCandidates)
      ) {
        schemes = parsed.response.filteredCandidates;
      } else if (Array.isArray(parsed)) {
        schemes = parsed;
      }
    } catch {}
  }

  return (
    <div className="max-w-4xl mx-auto mt-24  py-8 px-4">
      <h1 className="text-3xl font-bold mb-3 text-center">Eligible schemes</h1>
      <Schemes schemes={schemes} />
    </div>
  );
};

export default SchemeListFromStorage;
