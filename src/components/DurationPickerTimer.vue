<template>
	<div class="dp-timer__container">
        <div v-on:click="startTimer">start</div>
        <div v-on:click="stopTimer">stop</div>
        <div v-on:click="resetTimer">reset</div>
	</div>
</template>

<script>
import { store } from "../store.js";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

export default {
    name: "DurationPickerTimer",
    data: function () {
        return {
            interval: true,
            // startTime: null,
            // stopTime: null
        };
    },
    methods: {
        startTimer: function () {
            this.interval = true;
            let startMilliseconds = store.state.duration.milliseconds;
            let startTime = moment(new Date()).toISOString();

            if (this.interval) {
                this.interval = setInterval(function() {
                    let nowTime = moment(new Date());
                    let duration = moment.duration(moment(nowTime).diff(startTime));
                    let milliseconds = duration.asMilliseconds();
                    store.setDuration(startMilliseconds + milliseconds);
                }, 100);
            }
        },
        stopTimer: function () {
            clearInterval(this.interval);
            this.interval = false;
        },
        resetTimer: function () {
            store.setDuration(0);
        }
    }
};
</script>