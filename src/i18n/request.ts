import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

import { headers } from 'next/headers';

export default getRequestConfig(async ({locale}) => {
  const reqHeaders = await headers();
  const headerLocale = reqHeaders.get('x-next-intl-locale');
  
  const localeToUse = (locale || headerLocale || routing.defaultLocale) as 'fr' | 'en' | 'ar';
  
  console.log('DEBUG REQUEST LOCALE (received):', locale);
  console.log('DEBUG REQUEST LOCALE (header):', headerLocale);
  console.log('DEBUG REQUEST LOCALE (using):', localeToUse);

  return {
    locale: localeToUse,
    messages: (await import(`../../messages/${localeToUse}.json`)).default
  };
});
