export default function (number, count) {
    return new Array(Math.max(count - String(number).length + 1, 0)).join(0) + number;
}
