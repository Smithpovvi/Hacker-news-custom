const dateConvert = (unixTime: number) => (new Date(unixTime * 1000)).toLocaleDateString("en-US")

export default dateConvert;
