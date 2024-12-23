import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/theme-provider";
import { BackgroundGradient } from "@/components/animations/background-gradient";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import { LanguageSelection } from "@/pages/LanguageSelection";
import { Questionnaire } from "@/pages/Questionnaire";
import SchemesPage, { Schemes } from "./components/sections/schemes";
import { SchemeDetails } from "./pages/SchemeDetails";
import SchemeListFromStorage from "./pages/SchemeListFromStorage";
import SchemeInfo from "@/components/sections/SchemeInfo";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="system">
        <BackgroundGradient />
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/schemes">
              <Route index element={<LanguageSelection />} />
              <Route path="questionnaire" element={<Questionnaire />} />
              <Route path=":id" element={<SchemeInfo />} />
            </Route>
            <Route path="/scheme-list" element={<SchemeListFromStorage />} />
            <Route path="/all-schemes" element={<SchemesPage />} />
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
