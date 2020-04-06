<template>
    <div class="duration-picker">
        <template v-for="(unit) in duration.units">
            <durationpickeramount
                :key="unit"
                :value="duration.amounts[unit]"
                :unit="unit"
            />
        </template>
    </div>
</template>

<script>
import DurationPickerAmount from "./DurationPickerAmount";

export default {
    name: "DurationPicker",
    components: {
        durationpickeramount: DurationPickerAmount
    },
    props: {
        duration: Object
    }
};
</script>