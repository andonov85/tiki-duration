<template>
    <div class="dp-amount--input" v-on:keydown.9="nextAmount">
        <input
			ref="input"
			class="numeric"
			type="number"
			placeholder="__"
			min="0"
			v-on:input="handleChange"
			:value="value"
		>
		<div class="dp-amount--input__label">{{ unit }}</div>
    </div>
</template>

<script>
import { store } from "../store.js";

export default {
	name: "DurationPickerInput",
	props: {
		value: Number,
		unit: String,
		nextAmount: Function
	},
    mounted: function () {
        this.$nextTick(function () {
			console.log('mounted -> nextTick');
            this.$refs.input.focus();
        });
    },
	watch: {
		value: function(value) {
			console.log(value);
			this.$refs.input.focus();
		}
	},
	methods: {
        handleChange: function (event) {
			const value = parseInt(event.target.value, 10);
            store.setDurationAmount(value, this.unit);
		}
	}
};
</script>