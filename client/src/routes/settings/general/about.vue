<template>
    <settings-layout class="route settings-about" :title="t('settings.general.about')" :back-route="backRoute">
        <div class="settings-about__body">
            <div class="settings-about__header">
                <img class="settings-about__logo" :src="logo" alt="Ocula">
                <h1 class="settings-about__title">{{ manifest.title }}</h1>
                <div class="settings-about__subtitle">{{ t('settings.general.description') }}</div>
            </div>
            <block class="settings-about__block" :title="t('settings.general.details')">
                <div class="settings-about__details-grid">
                    <strong>{{ t('settings.general.version') }}</strong>
                    <div>{{ manifest.version }}</div>
                    <strong>{{ t('settings.general.author') }}</strong>
                    <div>{{ manifest.author }}</div>
                    <strong>{{ t('settings.general.license') }}</strong>
                    <div>{{ manifest.license }}</div>
                    <strong>{{ t('settings.general.source') }}</strong>
                    <a :href="manifest.repository" target="_blank">{{ t('settings.general.github') }}</a>
                </div>
            </block>
            <block class="settings-about__block" :title="t('settings.general.attribution')">
                <div class="settings-about__details-grid">
                    <strong>{{ t('settings.general.forecastData') }}</strong>
                    <a href="https://openweathermap.org" target="_blank">Open Weather Maps</a>
                    <strong>{{ t('settings.general.tideData') }}</strong>
                    <a href="https://www.worldtides.info" target="_blank">World Tides</a>
                    <strong>{{ t('settings.general.mapsGeocoding') }}</strong>
                    <a href="https://www.mapbox.com" target="_blank">Mapbox</a>
                    <strong>{{ t('settings.general.radarImagery') }}</strong>
                    <a href="https://www.rainviewer.com" target="_blank">RainViewer</a>
                    <strong>{{ t('settings.general.logoDesign') }}</strong>
                    <a href="https://github.com/ethanroxburgh" target="_blank">Ethan Roxburgh</a>
                    <strong>{{ t('settings.general.icons') }}</strong>
                    <a href="https://remixicon.com" target="_blank">Remix Icons</a>
                </div>
            </block>
            <block class="settings-about__block" :title="t('settings.general.sponsors')">
                <div>Kerry Tarrant</div>
            </block>
            <div class="margin__top--large text--centre">
                <small class="text--meta">Psalm 147:8</small>
            </div>
        </div>
    </settings-layout>
</template>

<script lang="ts">
import ROUTES from '../../../constants/core/routes';
import { useI18n } from '../../../i18n';

import SettingsLayout from '../../../components/layouts/settings.vue';

import manifest from '../../../../package.json';
import logo from '../../../assets/images/logo/logo-192.svg';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    components: {
        SettingsLayout
    },

    setup() {
        const { t } = useI18n();

        const backRoute = {
            name: ROUTES.settings.index
        };

        return {
            t,
            backRoute,
            logo,
            manifest
        };
    }

});
</script>

<style lang="scss">

    .settings-about__body {
        padding: 0 var(--spacing__small);
    }

    .settings-about__header {
        text-align: center;
        margin-bottom: var(--spacing__large);
    }

    .settings-about__title {
        text-transform: uppercase;
        letter-spacing: 0.2em;
    }

    .settings-about__logo {
        width: 96px;
    }

    .settings-about__block {
        
        &:not(:last-of-type) {
            margin-bottom: var(--spacing__small);
        }

        & .block__title {
            color: var(--font__colour--meta);
        }
    }

    .settings-about__details-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: var(--spacing__x-small) var(--spacing__small);
    }

</style>