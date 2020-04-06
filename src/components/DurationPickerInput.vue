<template>
    <div class="dp-amount--input" v-click-outside="testFunc">
        <input
			ref="input"
			class="numeric"
			type="number"
			placeholder="__"
			min="0"
			v-on:input="inputChange"
			:value="inputValue"
		>
    </div>
</template>

<script>
import { store } from "../store.js";

export default {
	name: "DurationPickerInput",
	data: function () {
		return {
			inputValue: this.value
		}
	},
	props: {
		value: Number,
		unit: String,
		focus: Boolean
	},
	watch: {
		focus: function(value) {
			if (value) {
				this.$refs.input.focus();
			}
		}
	},
	methods: {
		testFunc: function () {
			console.log('outside click');
        },
        inputChange: function (event) {
			const value = parseInt(event.target.value, 10);
			this.inputValue = value;
            store.setDurationAmount(value, this.unit);
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