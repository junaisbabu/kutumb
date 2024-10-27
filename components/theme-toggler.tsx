import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 rounded-md border-input">
      <ToggleGroup
        type="single"
        value={theme}
        onValueChange={(theme) => theme && setTheme(theme)}
      >
        <ToggleGroupItem value="system" className="h-6 w-6 rounded-md p-0">
          <Monitor className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="light" className="h-6 w-6 rounded-md p-0">
          <Sun className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" className="h-6 w-6 rounded-md p-0">
          <Moon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default ThemeToggler;
