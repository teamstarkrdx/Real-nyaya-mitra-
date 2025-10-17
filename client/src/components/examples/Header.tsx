import Header from '../Header';
import { useState } from 'react';

export default function HeaderExample() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Header
      onNavigate={(section) => console.log('Navigate to:', section)}
      onSearch={() => console.log('Search clicked')}
      darkMode={darkMode}
      onToggleDarkMode={() => setDarkMode(!darkMode)}
    />
  );
}
