'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={toggleTheme}
          size="icon"
          aria-label="Toggle theme"
          variant="ghost"
        >
          {theme === 'light' ? (
            <Moon className="size-5" />
          ) : (
            <Sun className="size-5" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </TooltipContent>
    </Tooltip>
  );
}
