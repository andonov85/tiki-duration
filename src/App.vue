<template>
    <div class="duration-picker-container">
        <h3>Vue Duration picker</h3>
        <DurationPicker></DurationPicker>
    </div>
</template>

<script>
import DurationPicker from "./components/DurationPicker";

export default {
    name: "DurationPickerApp",
    components: {
        DurationPicker: DurationPicker
    }
};
</script>