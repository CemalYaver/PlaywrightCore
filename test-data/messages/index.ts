import { LANG } from '../../config';

import * as tr from './tr'; // Turkish messages
import * as en from './en'; // English messages

// Map of supported languages
const messagesMap = { tr, en };

// Export messages according to selected language
export const messages = messagesMap[LANG];