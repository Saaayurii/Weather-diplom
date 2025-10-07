import { ref, computed } from 'vue';
import en from './en';
import ru from './ru';

export type Locale = 'en' | 'ru';

const translations = {
    en,
    ru
};

// Default locale is Russian
const currentLocale = ref<Locale>('ru');

// Get nested property from object using dot notation
function getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Translation function
export function useI18n() {
    const t = (key: string, params?: Record<string, string>): string => {
        let translation = getNestedProperty(translations[currentLocale.value], key);

        // Fallback to English if translation not found
        if (translation === undefined) {
            translation = getNestedProperty(translations.en, key);
        }

        // Fallback to key if still not found
        if (translation === undefined) {
            return key;
        }

        // Replace parameters if provided
        if (params) {
            Object.keys(params).forEach(paramKey => {
                translation = translation.replace(`{${paramKey}}`, params[paramKey]);
            });
        }

        return translation;
    };

    const locale = computed({
        get: () => currentLocale.value,
        set: (value: Locale) => {
            currentLocale.value = value;
            localStorage.setItem('locale', value);
        }
    });

    return {
        t,
        locale
    };
}

// Initialize locale from localStorage or browser language
const savedLocale = localStorage.getItem('locale') as Locale;
const browserLang = navigator.language.toLowerCase();

if (savedLocale && (savedLocale === 'en' || savedLocale === 'ru')) {
    currentLocale.value = savedLocale;
} else if (browserLang.startsWith('ru')) {
    currentLocale.value = 'ru';
} else {
    currentLocale.value = 'ru'; // Default to Russian
}

export { currentLocale };
