export const store = {
    state: {
        duration: {
            "amounts":{"years":0,"months":0,"weeks":0,"days":0,"hours":0,"minutes":0,"seconds":0},
            "units":["years","months","weeks","days","hours","minutes","seconds"]
		}
    },
    setDuration(duration) {
        duration.units.reverse();
        this.state.duration = duration;
    },
    setDurationValue(value, unit) {
        this.state.duration.amounts[unit] = value;
    },
    getAmountAfter(unit) {
        const index = this.state.duration.units.findIndex(el => el === unit);
        let nextIndex = index + 1;
        if (nextIndex === this.state.duration.units.length) {
            nextIndex = 0;
        }
        const nextUnit = this.state.duration.units[nextIndex]
        return {
            value: this.state.duration.amounts[nextUnit],
            unit: nextUnit
        }
    }
};