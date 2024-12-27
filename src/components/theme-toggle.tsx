import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "h-9 w-9 rounded-full bg-background/30 backdrop-blur-sm relative",
            className
          )}
          aria-label="Toggle theme"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] absolute transition-all duration-300 text-yellow-400 dark:text-gray-400 opacity-100 dark:opacity-0 scale-100 dark:scale-0" />
          <Moon className="h-[1.2rem] w-[1.2rem] absolute transition-all duration-300 text-gray-900 dark:text-yellow-300 opacity-0 dark:opacity-100 scale-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-background/80 backdrop-blur-md"
      >
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
