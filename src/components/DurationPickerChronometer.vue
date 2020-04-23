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
            // interval: store.getCustomInterval('chronometer'),
            // startTime: null,
            // stopTime: null
        };
    },
    // beforeDestroy: function() {
    //     clearInterval(this.interval);
    // },
    methods: {
        startTimer: function () {
            let interval = store.getCustomInterval('chronometer');
            if (!interval) {
                let startMilliseconds = store.state.duration.milliseconds;
                let startTime = moment(new Date()).toISOString();
                
                let newInterval = setInterval(function() {
                    let nowTime = moment(new Date());
                    let duration = moment.duration(moment(nowTime).diff(startTime));
                    let milliseconds = duration.asMilliseconds();
                    store.setDuration(startMilliseconds + milliseconds);
                }, 100);
                store.setCustomInterval(newInterval, 'chronometer');
            }
        },
        stopTimer: function () {
            let interval = store.getCustomInterval('chronometer');
            clearInterval(interval);
            store.setCustomInterval(false, 'chronometer');
        },
        resetTimer: function () {
            store.setDuration(0);
        }
    }
};
</script>