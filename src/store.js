import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

export const store = {
    state: {
        duration: {
            milliseconds: null,
            amounts: null,
            units: null
        },
        token: null,
        lastPositiveFormated: null,
        intervals: {
            chronometer: false
        }
    },
    __calcDuration(amounts) {
        const momentDuration = moment.duration(amounts);
        const formated = momentDuration
            .format(this.state.token, {
                useToLocaleString: false,
                groupingSeparator: "",
                usePlural: false,
                trim: false,
                trunc: true
            });
        const isNegative = momentDuration.asMilliseconds() < 0;
        let newAmounts = JSON.parse(formated);
        // Cache formated
        if (!isNegative) this.lastPositiveFormated = formated;
        // Replace negative format with last known positive
        if (isNegative) newAmounts = JSON.parse(this.lastPositiveFormated);

        return {
            isNegative: isNegative,
            momentDuration: momentDuration,
            amounts: newAmounts
        };
    },
    __calcToken(units) {
        const durationLabels = {
            'milliseconds': 'S',
            'seconds': 's',
            'minutes': 'm',
            'hours': 'h',
            'days': 'd',
            'weeks': 'w',
            'months': 'M',
            'years': 'y'
        };
        const formatedUnits = units.map(unit => `"[${unit}]": ${durationLabels[unit]}`);
        const token = '{' + formatedUnits.join(',') + '}';
        return token;
    },
    setInitialDuration(duration) {
        this.state.token = this.__calcToken(duration.units);
        const result = this.__calcDuration(duration.value);
        this.state.duration.milliseconds = result.momentDuration.asMilliseconds();
        this.state.duration.amounts = result.amounts;
        this.state.duration.units = duration.units;
    },
    setDuration(value) {
        const result = this.__calcDuration(value);
        this.state.duration.milliseconds = result.momentDuration.asMilliseconds();
        this.state.duration.amounts = result.amounts;
    },
    setDurationValue(value, unit) {
        const clonedAmounts = JSON.parse(JSON.stringify(this.state.duration.amounts));
        clonedAmounts[unit] = value;
        const result = this.__calcDuration(clonedAmounts);

        this.state.duration.amounts = result.amounts;
        if (!result.isNegative) {
            this.state.duration.milliseconds = result.momentDuration.asMilliseconds();
        }

        return this.state.duration.amounts[unit];
    },
    setCustomInterval(value, type) {
        this.state.intervals[type] = value;
    },
    getCustomInterval(type) {
        return this.state.intervals[type];
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
    },
    getAmountBefore(unit) {
        const index = this.state.duration.units.findIndex(el => el === unit);
        let prevIndex = index - 1;
        if (prevIndex < 0) {
            prevIndex = this.state.duration.units.length - 1;
        }
        const prevUnit = this.state.duration.units[prevIndex]
        return {
            value: this.state.duration.amounts[prevUnit],
            unit: prevUnit
        }
    }
};