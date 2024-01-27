export const LiveSeparate = (input) => {
    return input.toString().replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}