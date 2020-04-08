<template>
    <div class="dp-amount--input__wrapper" v-on:keydown.9="nextAmount">
        <div class="dp-amount--input__left-section">
            <input
                ref="input"
                class="numeric"
                type="number"
                placeholder="__"
                min="0"
                max="9999"
                v-on:input="handleInput"
                v-on:keypress="handleKeypress"
                :value="value"
            >
            <div class="dp-amount--input__label">{{ unit }}</div>
            <div class="dp-amount--input__controls">
                <div class="dp-amount--input__btn unselectable" 
                    v-on:mousedown="startSubtraction"
                    v-on:mouseleave="stopSubtraction"
                    v-on:mouseup="stopSubtraction"
                    v-on:touchstart="startSubtraction"
                    v-on:touchend="stopSubtraction"
                    v-on:touchcancel="stopSubtraction"
                >-</div>
                <div class="dp-amount--input__btn unselectable"
                    v-on:mousedown="startAddition"
                    v-on:mouseleave="stopAddition"
                    v-on:mouseup="stopAddition"
                    v-on:touchstart="startAddition"
                    v-on:touchend="stopAddition"
                    v-on:touchcancel="stopAddition"
                >+</div>
            </div>
        </div>
        <div class="dp-amount--input__right-section">
            <template v-for="(dUnit) in duration.units">
                <span 
                    class="dp-amount--input__unit unselectable"
                    :class="{ active: dUnit === unit }"
                    :key="dUnit"
                    v-on:click="handleClickUnit(dUnit)"
                >{{ dUnit }}</span>
            </template>
        </div>
    </div>
</template>

<script>
import { store } from "../store.js";

export default {
	name: "DurationPickerModal",
	data: function () {
		return {
			duration: store.state.duration,
			value: store.state.duration.amounts[this.initialUnit],
            unit: this.initialUnit,
            interval: false
		}
	},
	props: {
		initialUnit: String
	},
    mounted: function () {
        this.$nextTick(function () {
            this.$refs.input.focus();
        });
    },
	watch: {
        initialUnit: function(newVal) {
            this.value = this.duration.amounts[newVal];
			this.unit = newVal;
        }
	},
	updated: function () {
		this.$nextTick(function () {
            this.$refs.input.focus();
		})
    },
	methods: {
        handleKeypress: function (e) {
            if (e.target.value.length > 3) {
                e.preventDefault();
            }
        },
        handleInput: function (e) {
            let value = parseInt(e.target.value, 10);
            if (isNaN(value)) {
                value = 0;
            }
            store.setDurationValue(value, this.unit);
            this.value = value;
        },
		handleClickUnit: function(unit) {
            this.$refs.input.focus();
			this.value = this.duration.amounts[unit];
            this.unit = unit;
		},
		nextAmount: function(e) {
            e.preventDefault();
            const { value, unit } = store.getAmountAfter(this.unit);
			this.value = value;
            this.unit = unit;
		},
		handleSubtraction: function () {
            let newValue = this.value - 1;
            if (newValue < 0) newValue = 0;
            store.setDurationValue(newValue, this.unit);
            this.value = newValue;
        },
        handleAddition: function () {
            let newValue = this.value + 1;
            if (newValue > 9999) newValue = 9999;
            store.setDurationValue(newValue, this.unit);
            this.value = newValue;
		},
        startSubtraction: function () {
            if (!this.interval) {
                this.handleSubtraction();
                this.interval = setInterval(this.handleSubtraction, 180);	
            }
        },
        stopSubtraction: function () {
            clearInterval(this.interval);
            this.interval = false;
        },
        startAddition: function () {
            if (!this.interval) {
                this.handleAddition();
                this.interval = setInterval(this.handleAddition, 180);
            }
        },
        stopAddition: function () {
            clearInterval(this.interval);
            this.interval = false;
        }
	}
};
</script>