import React, { useEffect, useState } from 'react';
import Header from './Header';
import BaseHead from './BaseHead';

export default function Layout({ children }: React.PropsWithChildren) {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem('theme');
    if (
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !dark) ||
      dark === 'true'
    ) {
      setTheme(true);
    }
  }, []);

  return (
    <>
      <BaseHead />
      <Header theme={theme} setTheme={setTheme} />
      <div className="min-h-[calc(100vh-60px)] bg-white text-gray-900 dark:bg-[#101010] dark:text-gray-50">
        {children}
      </div>
    </>
  );
}
