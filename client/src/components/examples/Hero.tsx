import Hero from '../Hero';

export default function HeroExample() {
  return (
    <Hero
      onStartChat={() => console.log('Start chat clicked')}
      onViewRights={() => console.log('View rights clicked')}
    />
  );
}
