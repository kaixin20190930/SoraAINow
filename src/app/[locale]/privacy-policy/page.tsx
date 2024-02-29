import {unstable_setRequestLocale} from 'next-intl/server';

import PageComponent from './PageComponent';
import {getAuthLanguageText, getIndexLanguageText, getPrivacyPolicyLanguageText} from "~/configs/supportLanguage";

export default async function PageContent({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const indexLanguageText = await getIndexLanguageText();
  const privacyPolicyLanguageText = await getPrivacyPolicyLanguageText();
  const authLanguageText = await getAuthLanguageText();

  return (
      <PageComponent
          locale={locale}
          privacyPolicyLanguageText={privacyPolicyLanguageText}
          indexLanguageText={indexLanguageText}
          authLanguageText={authLanguageText}
      >
      </PageComponent>
  )
}
