<template>
	<div class="dp-amount--container">
		<div class="dp-amount--preview" v-on:click="toggleInput">
			<span class="dp-amount--preview__value">{{ value }}</span>
			<span class="dp-amount--preview__unit">{{ unit[0] }}</span>
		</div>
		<durationpickerinput v-show="show" :value="value" :unit="unit" :focus="focus"/>
	</div>
</template>

<script>
import DurationPickerInput from "./DurationPickerInput";

export default {
	name: "DurationPickerAmount",
	components: {
        durationpickerinput: DurationPickerInput
    },
	data: function () {
		return {
			focus: false,
			show: false
		}
	},
	props: {
		value: Number,
		unit: String
	},
	methods: {
		toggleInput: function () {
			this.show = !this.show;
			this.focus = !this.focus;
        }
	}
};
</script>