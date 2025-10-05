import UNITS from '../../enums/forecast/units';
import { useI18n } from '../../i18n';

export default {
    [UNITS.metric]: {
        label: 'Metric'
    },
    [UNITS.imperial]: {
        label: 'Imperial'
    }
} as const;

// Function to get localized unit labels
export function getLocalizedUnits() {
    const { t } = useI18n();

    return {
        [UNITS.metric]: {
            label: t('settings.units.metric')
        },
        [UNITS.imperial]: {
            label: t('settings.units.imperial')
        }
    };
}