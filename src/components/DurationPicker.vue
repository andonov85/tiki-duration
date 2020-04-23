<template>
    <div class="duration-picker" v-click-outside="handleCloseModal">
		<DurationPickerAmounts v-on:unit="loadAmount" :duration="duration"></DurationPickerAmounts>
		<DurationPickerModal v-if="show" :initialUnit="unit" :handleCloseModal="handleCloseModal"></DurationPickerModal>
		<input type="hidden" name="duration" :value="getMilliseconds">
    </div>
</template>

<script>
import { store } from "../store.js";
import DurationPickerAmounts from "./DurationPickerAmounts";
import DurationPickerModal from "./DurationPickerModal";

export default {
    name: "DurationPicker",
    components: {
        DurationPickerAmounts: DurationPickerAmounts,
        DurationPickerModal: DurationPickerModal
    },
	data: function () {
		return {
            duration: store.state.duration,
            show: false,
			unit: '',
			milliseconds: store.state.duration.milliseconds,
			// chronometerInterval: false
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
		loadAmount: function (unit) {
			this.unit = unit;
			this.show = true;
		}
	},
	directives: {
		clickOutside: {
			bind: function (el, binding, vnode) {
				el.clickOutsideEvent = function (event) {
					// here I check that click was outside the el and his childrens
					if (!(el === event.target || el.contains(event.target))) {
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