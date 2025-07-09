import { useTranslation } from 'react-i18next';

export function useLocalizedDate() {
    const { t } = useTranslation();

    return () => {
        const today = new Date();
        const dayNames = [
            t('sunday'),
            t('monday'),
            t('tuesday'),
            t('wednesday'),
            t('thursday'),
            t('friday'),
            t('saturday'),
        ];
        const monthNames = [
            t('january'),
            t('february'),
            t('march'),
            t('april'),
            t('may'),
            t('june'),
            t('july'),
            t('august'),
            t('september'),
            t('october'),
            t('november'),
            t('december'),
        ];

        return `${dayNames[today.getDay()]}, ${monthNames[today.getMonth()]} ${today.getDate()}`;
    };
}
