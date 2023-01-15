import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function Layout({ children }: React.PropsWithChildren) {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem('theme');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches && !dark) {
      setTheme(true);
      // @ts-ignore
      document.querySelector('meta[name="color-scheme"]').content = 'dark';
    } else if (dark === 'true') {
      setTheme(true);
      // @ts-ignore
      document.querySelector('meta[name="color-scheme"]').content = 'dark';
    }
  }, []);

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <div className="min-h-[calc(100vh-60px)] bg-white dark:bg-[#101010]">
        {children}
      </div>
    </>
  );
}
