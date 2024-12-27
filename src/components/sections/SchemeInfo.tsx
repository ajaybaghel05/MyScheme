import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, ExternalLink } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { BackgroundGradient } from "@/components/animations/background-gradient";
import { ApplicationProcessStepper } from "@/components/sections/ApplicationProcessStepper";

interface Scheme {
  id: number;
  schemeName: string;
  eligibility: {
    gender: boolean | null;
    maxAge: number;
    minAge: number;
    minority: boolean;
    maritalStatus: string;
  };
  category: string;
  applicationProcedure: string[];
  documents: string[];
  state: string;
  mode: boolean;
  sourceLink: string;
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

export default function SchemeInfo() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`http://localhost:4000/schemes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Scheme not found");
        return res.json();
      })
      .then((data) => {
        const schemeData = data.response || data.data || data;
        setScheme(schemeData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch scheme");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
      </div>
    );
  }
  if (error) {
    return <div className="text-center text-destructive mt-10">{error}</div>;
  }
  if (!scheme) return null;

  return (
    <section className="mt-24 relative min-h-screen flex flex-col justify-center items-center">
      <BackgroundGradient className="fixed inset-0 -z-10" />
      <div className="bento-container w-full pt-24">
        <div className="bento-grid">
          <div className="bento-tile main">
            <h1 className="scheme-title text-foreground transition-colors duration-300">
              {scheme.schemeName}
            </h1>
            <div className="info-row">
              <span className="info-chip category-chip transition-colors duration-300">
                {scheme.category}
              </span>
              <span className="info-chip state-chip transition-colors duration-300">
                {scheme.state}
              </span>
              {scheme.eligibility.minority && (
                <Tag>
                  <span className="transition-colors duration-300">
                    Minority
                  </span>
                </Tag>
              )}
              <span
                className={`info-chip mode-chip ${
                  scheme.mode ? "online" : "offline"
                } transition-colors duration-300`}
              >
                {scheme.mode ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          <div className="bento-tile">
            <h2 className="tile-title">Eligibility</h2>
            <ul className="tile-list">
              <li>
                <b>Gender:</b>{" "}
                {scheme.eligibility.gender === null
                  ? "Any"
                  : scheme.eligibility.gender
                  ? "Female"
                  : "Male"}
              </li>
              <li>
                <b>Age:</b> {scheme.eligibility.minAge} -{" "}
                {scheme.eligibility.maxAge}
              </li>
              <li>
                <b>Marital Status:</b>{" "}
                {scheme.eligibility.maritalStatus || "Any"}
              </li>
              <li>
                <b>Minority:</b> {scheme.eligibility.minority ? "Yes" : "No"}
              </li>
            </ul>
          </div>

          {/* <div className="bento-tile">
            <h2 className="tile-title">Application Steps</h2>
            <ol className="tile-list">
              {scheme.applicationProcedure.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div> */}

          <div className="bento-tile">
            <h2 className="tile-title">Documents</h2>
            <ul className="tile-list">
              {scheme.documents.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>

          <div className="bento-tile">
            <h2 className="tile-title">Source</h2>
            <a
              href={scheme.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              View Official Source <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* <div className="bento-tile">
            <h2 className="tile-title">Map</h2>
            <iframe />
          </div> */}
        </div>
      </div>

      {/* ApplicationProcessStepper visualizes the steps below the bento grid */}
      <div className="w-full max-w-4xl mx-auto mt-12">
        <ApplicationProcessStepper steps={scheme.applicationProcedure} />
      </div>
      <div className="back-link-row">
        <Link to="/" className="back-link transition-colors duration-300">
          ← Back to all schemes
        </Link>
      </div>
      <style jsx>{`
        .bento-container {
          width: 100vw;
          min-height: 100vh;
          padding: 2rem 0;
        }
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          grid-auto-rows: minmax(180px, auto);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .bento-tile {
          background: var(--tile-bg, hsl(var(--card)));
          border: 2px solid var(--tile-border, hsl(var(--border)));
          border-radius: 1.25rem;
          box-shadow: 0 4px 24px 0 rgba(30, 41, 59, 0.06);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          transition: background 0.3s, border 0.3s;
        }
        .bento-tile.main {
          grid-column: span 2;
          background: linear-gradient(
            90deg,
            hsl(var(--muted)) 60%,
            hsl(var(--card)) 100%
          );
          border: 2.5px solid var(--tile-border, hsl(var(--border)));
        }
        @media (max-width: 900px) {
          .bento-tile.main {
            grid-column: span 1;
          }
        }
        .scheme-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: hsl(var(--foreground));
          margin-bottom: 1rem;
          transition: color 0.3s;
        }
        .info-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .info-chip {
          display: inline-block;
          padding: 0.32em 1.1em;
          border-radius: 0.7em;
          font-weight: 600;
          font-size: 1.02rem;
          background: hsl(var(--muted));
          color: hsl(var(--foreground));
          border: 1.5px solid hsl(var(--border));
          box-shadow: 0 1px 4px 0 rgba(30, 41, 59, 0.04);
          letter-spacing: 0.01em;
          transition: background 0.3s, color 0.3s, border 0.3s;
        }
        .category-chip {
          background: hsl(var(--accent));
          color: hsl(var(--accent-foreground));
          border-color: hsl(var(--accent));
        }
        .state-chip {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          border-color: hsl(var(--primary));
        }
        .mode-chip.online {
          background: hsl(var(--secondary));
          color: hsl(var(--secondary-foreground));
          border-color: hsl(var(--secondary));
        }
        .mode-chip.offline {
          background: hsl(var(--destructive));
          color: hsl(var(--destructive-foreground));
          border-color: hsl(var(--destructive));
        }
        .tag {
          border: 1.5px solid hsl(var(--border));
          background: hsl(var(--muted));
          color: hsl(var(--foreground));
          font-weight: 600;
          font-size: 1rem;
          border-radius: 999px;
          padding: 0.35em 1.1em;
          letter-spacing: 0.01em;
          transition: background 0.2s, color 0.3s, border 0.3s;
        }
        .tag:hover {
          background: hsl(var(--accent));
        }
        .tile-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-bottom: 0.7rem;
          transition: color 0.3s;
        }
        .tile-list {
          color: hsl(var(--muted-foreground));
          font-size: 1rem;
          padding-left: 1.2em;
          margin: 0;
          transition: color 0.3s;
        }
        .source-link {
          color: hsl(var(--primary));
          font-weight: 600;
          text-decoration: underline;
          display: inline-flex;
          align-items: center;
          gap: 0.4em;
          margin-top: 0.5em;
          transition: color 0.3s;
        }
        .source-link:hover {
          color: hsl(var(--primary-foreground));
        }
        .back-link-row {
          max-width: 1200px;
          margin: 2rem auto 0;
          padding: 0 2rem;
        }
        .back-link {
          color: hsl(var(--muted-foreground));
          font-size: 1rem;
          font-weight: 500;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: hsl(var(--primary));
        }
        @media (max-width: 600px) {
          .bento-container {
            padding: 0.5rem 0;
          }
          .bento-grid {
            padding: 0 0.5rem;
            gap: 1rem;
          }
          .bento-tile {
            padding: 1rem 0.7rem;
          }
          .scheme-title {
            font-size: 1.3rem;
          }
          .tile-title {
            font-size: 1rem;
          }
          .info-chip,
          .tag {
            font-size: 0.92rem;
            padding: 0.25em 0.7em;
          }
        }
      `}</style>
      {/* <div className="mt-16">
        <ApplicationProcessStepper />
      </div> */}
    </section>
  );
}
