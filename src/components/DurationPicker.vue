<template>
    <div class="duration-picker" v-click-outside="testFunc">
        <template v-for="(unit) in duration.units">
            <div class="dp-amount--container" v-on:click="handleClick(duration.amounts[unit], unit, $event)" :key="unit">
                <durationpickeramount :value="duration.amounts[unit]" :unit="unit" />
            </div>
        </template>
        <durationpickerinput v-if="show" :value="value" :unit="unit" :nextAmount="nextAmount" />
    </div>
</template>

<script>
import DurationPickerAmount from "./DurationPickerAmount";
import DurationPickerInput from "./DurationPickerInput";
import { store } from "../store.js";

export default {
    name: "DurationPicker",
    components: {
        durationpickeramount: DurationPickerAmount,
        durationpickerinput: DurationPickerInput
    },
	data: function () {
		return {
            show: false,
            value: 0,
            unit: ''
		}
	},
    props: {
        duration: Object
    },
	methods: {
		testFunc: function () {
            console.log('outside click');
            this.show = false;
        },
		handleClick: function (value, unit, event) {
            console.log(value, unit, event);
            this.value = value;
            this.unit = unit;
			this.show = true;
        },
		nextAmount: function(e) {
			e.preventDefault();
            const { value, unit } = store.getAmountAfter(this.unit);
            this.value = value;
            this.unit = unit;
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