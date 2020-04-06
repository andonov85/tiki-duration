<template>
	<div class="dp-amount--preview">
		<span class="dp-amount--preview__value">{{ value }}</span>
		<span class="dp-amount--preview__unit">{{ unit.charAt(0) }}</span>
		<input type="hidden" :value="value" :unit="unit" >
	</div>
</template>

<script>
export default {
	name: "DurationPickerAmount",
	props: {
		value: Number,
		unit: String
	}
};
</script>