<template>
    <div class="weather-actions" :class="actionsClass" layout="row center-justify">
        <icon-button class="weather-actions__action weather-actions__action--location" icon="map-pin-line" v-tooltip:right="t('location.setLocation')" @click="setLocation">
            <div v-if="location">{{ location.shortName }}</div>
            <div v-else>{{ t('location.unknown') }}</div>
        </icon-button>
        <div self="size-x1">
            <slot></slot>
        </div>
        <icon-button class="weather-actions__action weather-actions__action--update" icon="refresh-line" @click="update(true)" v-tooltip:left="t('location.update')"></icon-button>
    </div>
</template>

<script lang="ts">
import STATUS from '../../enums/core/status';

import applicationController from '../../controllers/application';
import { useI18n } from '../../i18n';

import {
    defineComponent,
    computed
} from 'vue';

import {
    state,
    update
} from '../../store';

export default defineComponent({

    setup() {
        const { t } = useI18n();
        const {
            setLocation
        } = applicationController;

        const location = computed(() => state.location);
        const actionsClass = computed(() => state.status === STATUS.loading && 'weather-actions--loading');

        return {
            t,
            location,
            setLocation,
            update,
            actionsClass
        };
    }

});
</script>

<style lang="scss">

    .weather-actions {
        padding: var(--spacing__small) var(--spacing__medium);
    }

    .weather-actions--loading {

        & .weather-actions__action {
            pointer-events: none;
            cursor: not-allowed;
        }

        & .weather-actions__action--update {

            & .icon {
                animation: rotate 750ms ease-out infinite;
            }
        }
    }

    @keyframes rotate {

        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }

    }

</style>
