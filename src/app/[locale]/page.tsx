import PageComponent from "./PageComponent";
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {allVideoList, randomVideo} from "~/data/openaiVideo";
import {getAuthLanguageText, getIndexLanguageText, getQuestionLanguageText} from "~/configs/supportLanguage";

export default async function IndexPage({params: {locale = ''}}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const indexLanguageText = await getIndexLanguageText();
  const questionText = await getQuestionLanguageText();
  const authLanguageText = await getAuthLanguageText();

  const initVideoList = randomVideo(2);

  return (
      <PageComponent
          locale={locale}
          indexLanguageText={indexLanguageText}
          initVideoList={initVideoList}
          questionText={questionText}
          authLanguageText={authLanguageText}
      >

      </PageComponent>
  )
}
