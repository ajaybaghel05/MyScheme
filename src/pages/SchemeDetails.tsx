import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ApplicationProcessStepper } from "@/components/sections/ApplicationProcessStepper";

export function SchemeDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get schemes from navigation state
  let schemes = location.state?.schemes;

  // If not in state, try to get from localStorage
  if (!schemes) {
    const finalResultsRaw = localStorage.getItem("finalSchemeResults");
    const schemeResultsRaw = localStorage.getItem("schemeResults");
    if (finalResultsRaw) {
      try {
        const parsed = JSON.parse(finalResultsRaw);
        schemes = parsed.response || parsed.schemes || null;
      } catch {}
    } else if (schemeResultsRaw) {
      try {
        const parsed = JSON.parse(schemeResultsRaw);
        schemes =
          parsed.response?.filteredCandidates || parsed.response || null;
      } catch {}
    }
  }

  // If still no schemes, or if error present, show a message
  let errorMsg: string | null = null;
  // Check for error in schemes object (from backend)
  if (schemes && typeof schemes === "object" && !Array.isArray(schemes)) {
    if (schemes.error) {
      errorMsg =
        typeof schemes.error === "string"
          ? schemes.error
          : "An error occurred while fetching eligible schemes.";
    } else if (schemes.response && schemes.response.error) {
      errorMsg =
        typeof schemes.response.error === "string"
          ? schemes.response.error
          : "An error occurred while fetching eligible schemes.";
    }
  }
  if (errorMsg || !schemes || !Array.isArray(schemes) || schemes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h2 className="text-2xl font-semibold mb-4">
          {errorMsg ? "Error" : "No Schemes Found"}
        </h2>
        <p className="mb-6 text-muted-foreground">
          {errorMsg
            ? errorMsg === "timeout of 10000ms exceeded"
              ? "The request to fetch eligible schemes timed out. Please try again later."
              : errorMsg
            : "We couldn't find any schemes matching your answers."}
        </p>
        <Button onClick={() => navigate("/questionnaire")}>
          Back to Questionnaire
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Eligible Schemes</h1>
      <div className="grid gap-6">
        {schemes.map((scheme: any, idx: number) => (
          <div
            key={scheme.id || idx}
            className="rounded-lg border p-6 bg-card shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              {scheme.name || scheme.title || `Scheme ${idx + 1}`}
            </h2>
            {scheme.description && (
              <p className="mb-2 text-muted-foreground">{scheme.description}</p>
            )}
            {scheme.benefits && (
              <p className="mb-2">
                <span className="font-medium">Benefits:</span> {scheme.benefits}
              </p>
            )}
            {scheme.eligibility && (
              <p className="mb-2">
                <span className="font-medium">Eligibility:</span>{" "}
                {scheme.eligibility}
              </p>
            )}
            {scheme.link && (
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Learn more
              </a>
            )}
          </div>
        ))}
      </div>
      {/* Application Process Stepper */}
      <div className="mt-16">
        <ApplicationProcessStepper />
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline" onClick={() => navigate("/all-schemes")}>
          Browse All Schemes
        </Button>
      </div>
    </div>
  );
}
