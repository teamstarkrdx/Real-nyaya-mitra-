import RightsModal from '../RightsModal';
import { useState } from 'react';

export default function RightsModalExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <RightsModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}
