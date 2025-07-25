export const TimeFormater = (time) => {
  const mins = Math.floor(time / 60)
  const secs = Math.floor(time % 60)

  if ((mins < 10) & (secs < 10)) {
    return `0${mins}:0${secs}`
  }

  if ((mins > 9) & (secs < 10)) {
    return `${mins}:0${secs}`
  }
  if ((mins < 10) & (secs > 9)) {
    return `0${mins}:${secs}`
  }
  if ((mins > 9) & (secs > 9)) {
    return `${mins}:${secs}`
  }
}
