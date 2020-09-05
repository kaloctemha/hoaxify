import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password Mismatch': 'Password Mismatch',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Login': 'Login',
                'Home Page': 'Home Page'
                
            }
        },
        tr: {
            translations: {
                'Sign Up': "Kayit Ol",
                'Password Mismatch': 'Ayni Sifreyi Giriniz',
                'Username': 'Kullanici Adi',
                'Display Name': 'Goruntu Adi',
                'Password': 'Sifre',
                'Password Repeat': 'Sifre Tekrar',
                'Login': 'Giris',
                'Home Page': 'Anasayfa'
            }
        }
    },

    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true,
    }
})

export default i18n;