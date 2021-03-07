function clamp(min, max, val) {
    return Math.max(Math.min(val, max), min);
}

function daysBetween(date1, date2) {
    return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
}

export { clamp, daysBetween };