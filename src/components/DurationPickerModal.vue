<template>
    <div class="dp-amount--input__container">
        <div class="dp-amount--input__header">
            <div class="dp-toggle-mode" v-on:click="toggleMode">{{ mode }}</div>
            <div class="dp-amount--input__close" v-on:click="handleCloseModal" title="close">x</div>
        </div>
        <DurationPickerEditor v-show="!toggle" :initialUnit="initialUnit" />
        <DurationPickerChronometer v-show="toggle" />
    </div>
</template>

<script>
import DurationPickerEditor from "./DurationPickerEditor";
import DurationPickerChronometer from "./DurationPickerChronometer";

export default {
	name: "DurationPickerModal",
    components: {
        DurationPickerChronometer: DurationPickerChronometer,
        DurationPickerEditor: DurationPickerEditor
    },
	data: function () {
		return {
            mode: 'to chronometer',
            toggle: false
		}
	},
	props: {
        initialUnit: String,
        handleCloseModal: Function
    },
    methods: {
        toggleMode: function() {
            if (this.toggle) {
                this.mode = 'to chronometer';
            } else {
                this.mode = 'to editor';
            }
            this.toggle = !this.toggle;
        }
    }
};
</script>