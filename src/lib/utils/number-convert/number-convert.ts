import { invert, toString } from 'lodash';
import { NumberConvertType } from './number-convert.types';

const numbersMap: Record<string, Record<string, string>> = {
  en: {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
  },
  fa: {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  },
  ar: {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
  },
};

const keysMap: Record<string, Record<string, string>> = {
  en: invert(numbersMap['en']),
  fa: invert(numbersMap['fa']),
  ar: invert(numbersMap['ar']),
};

export const numberConvert: NumberConvertType = (text, options) =>
  toString(text).replaceAll(
    /((https?|ftp):\/\/)?[\w-]+(\.[\w-]+)+([\w#%&+,./:=?@^~-]*[\w#%&+/=?@^~-])?|\b[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z|]{2,}\b|./g,
    match =>
      toString(match).replaceAll(new RegExp('.', 'g'), char => {
        for (const locale of Object.keys(numbersMap)) {
          if (char in numbersMap[locale]) {
            return toString(
              keysMap[
                match.startsWith('http') || match.includes('@')
                  ? 'en'
                  : options?.locale || 'en'
              ]?.[numbersMap[locale][char]],
            );
          }
        }
        return options?.numberOnly ? '' : char;
      }),
  );
