import CategoryDetailModal from '../CategoryDetailModal';
import { useState } from 'react';

export default function CategoryDetailModalExample() {
  const [category, setCategory] = useState<string | null>('Constitutional Law');

  return (
    <CategoryDetailModal
      category={category}
      onClose={() => setCategory(null)}
    />
  );
}
