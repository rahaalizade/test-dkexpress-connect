import { keys, toString } from 'lodash';
import { ReplaceOptionsType } from './replace-options.types';

export const replaceOptions: ReplaceOptionsType = (text, options) =>
  toString(text).replaceAll(
    new RegExp(
      keys(options)
        .map(key => `{${key}}`)
        .join('|'),
      'g',
    ),
    key => toString(options?.[key.replaceAll(/[{}]/g, '')]),
  );
