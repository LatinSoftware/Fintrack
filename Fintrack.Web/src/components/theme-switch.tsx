import { useEffect } from 'react'
import { useTheme } from '@/context/theme-context'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  /* Update theme-color meta tag
   * when theme is updated */
  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff'
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor)
  }, [theme])

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-xl border-2 border-border/60 bg-background/80 backdrop-blur-sm hover:bg-accent/80 hover:border-primary/30 transition-all duration-300 group"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 group-hover:scale-110" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 group-hover:scale-110" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
