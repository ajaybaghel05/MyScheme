import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

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

interface SchemesProps {
  schemes: Scheme[];
}

export function Schemes({ schemes }: SchemesProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSchemes = schemes.filter((scheme) => {
    if (!searchQuery) return true;

    const searchTerms = searchQuery.toLowerCase();
    if (searchQuery.startsWith('"') && searchQuery.endsWith('"')) {
      // Exact match
      const exactTerm = searchTerms.slice(1, -1);
      return scheme.schemeName.toLowerCase() === exactTerm;
    }

    return (
      scheme.schemeName.toLowerCase().includes(searchTerms) ||
      scheme.category.toLowerCase().includes(searchTerms) ||
      scheme.state.toLowerCase().includes(searchTerms)
    );
  });

  return (
    <section className="py-8 mt-10">
      <div className="container mx-auto px-4">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-10 pr-4 h-12 text-base"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">
            For an exact match, put the words in quotes. For example: "Scheme
            Name"
          </p>
        </div>

        {/* Tabs and Sort Section */}
        <Tabs defaultValue="all" className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">All Schemes</TabsTrigger>
              <TabsTrigger value="state">State Schemes</TabsTrigger>
              <TabsTrigger value="central">Central Schemes</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Total {filteredSchemes.length} schemes available
              </span>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Sort by: Relevance</SelectItem>
                  <SelectItem value="name">Sort by: Name</SelectItem>
                  <SelectItem value="state">Sort by: State</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="space-y-6">
            {filteredSchemes.length === 0 ? (
              <div className="text-center text-muted-foreground text-lg">
                No schemes found matching your search
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSchemes.map((scheme) => (
                  <Link
                    key={scheme.id}
                    to={`/schemes/${scheme.id}`}
                    className="block transition-all hover:bg-accent hover:text-accent-foreground"
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {scheme.schemeName}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {scheme.state}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{scheme.category}</Badge>
                          {scheme.eligibility.minority && (
                            <Badge variant="secondary">Minority</Badge>
                          )}
                          {scheme.mode ? (
                            <Badge variant="secondary">Online</Badge>
                          ) : (
                            <Badge variant="secondary">Offline</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="state" className="space-y-6">
            {/* Similar content filtered for state schemes */}
          </TabsContent>

          <TabsContent value="central" className="space-y-6">
            {/* Similar content filtered for central schemes */}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5; // max number of page buttons to show (excluding prev/next)
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  // Prev button
  pages.push(
    <button
      key="prev"
      className="px-3 py-1 rounded mx-1 bg-muted text-foreground disabled:opacity-50"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </button>
  );

  if (start > 1) {
    pages.push(
      <button
        key={1}
        className={`px-3 py-1 rounded mx-1 ${
          currentPage === 1
            ? "bg-primary text-white"
            : "bg-muted text-foreground"
        }`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );
    if (start > 2) pages.push(<span key="start-ellipsis">...</span>);
  }

  for (let i = start; i <= end; i++) {
    if (i === 1 || i === totalPages) continue; // already rendered
    pages.push(
      <button
        key={i}
        className={`px-3 py-1 rounded mx-1 ${
          i === currentPage
            ? "bg-primary text-white"
            : "bg-muted text-foreground"
        }`}
        onClick={() => onPageChange(i)}
        disabled={i === currentPage}
      >
        {i}
      </button>
    );
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push(<span key="end-ellipsis">...</span>);
    pages.push(
      <button
        key={totalPages}
        className={`px-3 py-1 rounded mx-1 ${
          currentPage === totalPages
            ? "bg-primary text-white"
            : "bg-muted text-foreground"
        }`}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </button>
    );
  }

  // Next button
  pages.push(
    <button
      key="next"
      className="px-3 py-1 rounded mx-1 bg-muted text-foreground disabled:opacity-50"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  );

  return <div className="flex justify-center mt-8">{pages}</div>;
}

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:4000/schemes?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setSchemes(data.data); // use data.data for the array of schemes
        setTotalPages(data.meta.totalPages); // use data.meta.totalPages for total pages
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch schemes:", error);
        setIsLoading(false);
      });
  }, [currentPage]);

  return (
    <div>
      <Schemes schemes={schemes} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
