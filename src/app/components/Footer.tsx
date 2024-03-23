import { useTranslations } from 'next-intl';
import React from 'react';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <div>
      <h1>{t('h2')}</h1>
    </div>
  );
}
