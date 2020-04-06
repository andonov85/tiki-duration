<template>
    <div class="duration-picker-container">
        <h3>Vue Duration picker</h3>
        <durationpicker :duration="duration" />
    </div>
</template>

<script>
import DurationPicker from "./components/DurationPicker";
import { store } from "./store.js";

export default {
    name: "DurationPickerApp",
    components: {
        durationpicker: DurationPicker
    },
    data: function() {
        return {
            duration: store.state.duration
        };
    }
};
</script>