import LegalGuidanceHub from '../LegalGuidanceHub';

export default function LegalGuidanceHubExample() {
  return (
    <LegalGuidanceHub
      onExploreMore={(category) => console.log('Explore more:', category)}
    />
  );
}
