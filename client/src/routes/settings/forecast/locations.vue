<template>
    <settings-layout class="route settings-locations" :title="t('settings.forecast.locations')" :back-route="backRoute">
        <div class="settings-locations__locations menu">
            <div class="menu-item" layout="row center-justify" v-for="location in locations" :key="location.id">
                <div class="text--truncate" self="size-x1">{{ location.longName }}</div>
                <div v-tooltip:left="t('settings.general.removeLocation')" @click.stop="removeLocation(location)">
                    <icon name="delete-bin-line" class="margin__left--small"/>
                </div>
            </div>
        </div>
    </settings-layout>
</template>

<script lang="ts">
import ROUTES from '../../../constants/core/routes';
import { useI18n } from '../../../i18n';

import SettingsLayout from '../../../components/layouts/settings.vue';

import {
    defineComponent,
    computed
} from 'vue';

import {
    state,
    removeLocation
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

        const locations = computed(() => state.settings.locations);

        return {
            t,
            backRoute,
            locations,
            removeLocation
        };
    }

});
</script>

<style lang="scss">

    .settings-locations__locations {
        padding: 0 var(--spacing__small);
    }

</style>