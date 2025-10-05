<template>
    <settings-layout class="route settings-sections" :title="t('settings.forecast.sections')" :back-route="backRoute">
        <transition-group tag="div" name="sections" class="settings-sections__sections menu">
            <div class="settings-sections__section menu-item" layout="row center-justify" v-for="(section, index) in sections" :key="section.type">
                <div class="text--truncate margin__right--x-small" self="size-x1">{{ section.label }}</div>
                <icon-button icon="arrow-up-line" @click.native.stop="moveSection(section.type, -1)" v-visible="index > 0"></icon-button>
                <icon-button icon="arrow-down-line" @click.native.stop="moveSection(section.type, 1)" v-visible="index < sections.length - 1"></icon-button>
                <icon-button :icon="getVisibilityIcon(section)" @click.native.stop="setSectionVisibility(section.type, !section.visible)"></icon-button>
            </div>
        </transition-group>
    </settings-layout>
</template>

<script lang="ts">
import ROUTES from '../../../constants/core/routes';
import FORECAST_SECTION from '../../../enums/forecast/section';
import { useI18n } from '../../../i18n';

import SettingsLayout from '../../../components/layouts/settings.vue';

import {
    defineComponent,
    computed
} from 'vue';

import {
    state,
    moveSection,
    setSectionVisibility
} from '../../../store';

export default defineComponent({

    components: {
        SettingsLayout
    },

    setup() {
        const { t } = useI18n();

        const backRoute = {
            name: ROUTES.settings.index
        };

        const sections = computed(() => {
            return state.settings.forecast.sections.map(section => {
                // Map section type to translation key
                const labelMap = {
                    [FORECAST_SECTION.dailyForecast]: 'forecast.sections.dailyForecast',
                    [FORECAST_SECTION.hourlyForecast]: 'forecast.sections.hourlyForecast',
                    [FORECAST_SECTION.today]: 'forecast.sections.today',
                    [FORECAST_SECTION.uvIndex]: 'forecast.sections.uvIndex',
                    [FORECAST_SECTION.tides]: 'forecast.sections.tides'
                };

                return {
                    ...section,
                    label: t(labelMap[section.type] || section.type)
                };
            })
        });

        function getVisibilityIcon(section): string {
            return section.visible ? 'eye-line' : 'eye-off-line';
        }

        return {
            t,
            backRoute,
            sections,
            moveSection,
            getVisibilityIcon,
            setSectionVisibility
        };
    }

});
</script>

<style lang="scss">

    .settings-sections__sections {
        padding: 0 var(--spacing__small);
    }

    .settings-sections__section {
        padding: var(--spacing__x-small) var(--spacing__small);
        cursor: default;
    }

    .sections-move {
        transition: transform var(--transition__timing) var(--transition__easing--default);
    }

</style>