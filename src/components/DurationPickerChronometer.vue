<template>
	<div class="dp-chronometer__container">
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
    name: "DurationPickerChronometer",
    data: function () {
        return {
            interval: false,
            // startTime: null,
            // stopTime: null
        };
    },
    // beforeDestroy: function() {
    //     clearInterval(this.interval);
    // },
    methods: {
        startTimer: function () {
            if (!this.interval) {
                let startMilliseconds = store.state.duration.milliseconds;
                let startTime = moment(new Date()).toISOString();
                
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