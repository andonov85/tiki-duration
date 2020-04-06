export const store = {
    state: {
        duration: {
            "amounts":{"years":0,"months":0,"weeks":0,"days":0,"hours":0,"minutes":0,"seconds":0},
            "units":["years","months","weeks","days","hours","minutes","seconds"] // reversed
			// "units":["seconds","minutes","hours","days","weeks","months","years"]
		}
    },
    setDuration(duration) {
        duration.units.reverse();
        this.state.duration = duration;
    },
    setDurationAmount(value, unit) {
        this.state.duration.amounts[unit] = value;
    }
};