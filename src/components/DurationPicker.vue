<template>
    <div class="duration-picker" v-click-outside="handleCloseModal">
        <template v-for="(dUnit) in duration.units">
            <div class="dp-amount--container" v-on:click="handleOpenModal(dUnit, $event)" :key="dUnit">
                <DurationPickerAmount :value="duration.amounts[dUnit]" :unit="dUnit"></DurationPickerAmount>
            </div>
        </template>
		<input type="hidden" name="duration" :value="getMilliseconds">
		<DurationPickerModal v-if="show" :initialUnit="unit" :handleCloseModal="handleCloseModal"></DurationPickerModal>
    </div>
</template>

<script>
import DurationPickerAmount from "./DurationPickerAmount";
import DurationPickerModal from "./DurationPickerModal";
import { store } from "../store.js";

export default {
    name: "DurationPicker",
    components: {
        DurationPickerAmount: DurationPickerAmount,
        DurationPickerModal: DurationPickerModal
    },
	data: function () {
		return {
            duration: store.state.duration,
            show: false,
			unit: '',
			milliseconds: store.state.duration.milliseconds
		}
	},
	computed: {
        getMilliseconds: function() {
            return store.state.duration.milliseconds;
        }
    },
	methods: {
		handleCloseModal: function () {
            this.show = false;
        },
		handleOpenModal: function (unit) {
            this.unit = unit;
			this.show = true;
		}
	},
	directives: {
		clickOutside: {
			bind: function (el, binding, vnode) {
				el.clickOutsideEvent = function (event) {
					// here I check that click was outside the el and his childrens
					if (!(el == event.target || el.contains(event.target))) {
						// and if it did, call method provided in attribute value
						vnode.context[binding.expression](event);
					}
				};
				document.body.addEventListener('click', el.clickOutsideEvent)
			},
			unbind: function (el) {
				document.body.removeEventListener('click', el.clickOutsideEvent)
			},
		}
	}
};
</script>