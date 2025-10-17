import LanguageSelector from '../LanguageSelector';

export default function LanguageSelectorExample() {
  return (
    <LanguageSelector
      onSelect={(lang) => console.log('Selected language:', lang)}
      onClose={() => console.log('Close language selector')}
    />
  );
}
