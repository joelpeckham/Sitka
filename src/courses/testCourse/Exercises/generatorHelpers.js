function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
exports.randomInt = randomInt;

function randomChar(includeCaps = true, includeDigits = false) {
    let lowers = "abcdefghijklmnopqrstuvwxyz"
    let uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let digits = "0123456789"
    let chars = lower
    if (includeCaps) {chars += uppers}
    if (includeDigits) {chars += digits}
    return chars[randomInt(0,chars.length)]
}
exports.randomChar = randomChar;

function randomString(length, includeCaps = true, includeDigits = false) {
    let str = ""
    for (let i = 0; i < length; i++){
      str += randomChar(includeCaps, includeDigits)
    }
    return str
}
exports.randomString = randomString;

function randomIncorrectMessage() {
  messages = [
    "Hey. Mistakes only help you learn. Try again.",
    "Hmm. Let's give that another take...",
    "That's not exactly what I looking for...",
    "Not quite. Give'r another go.",
    "I wish that was correct... But, try again.",
    "Good try, but no luck. Keep going. You've got this...",
    "Nope.",
    "Very much not correct.",
    "Sadly, that's wrong.",
    "That's incorrect.",
    "Wrong answer, bud."
  ]
  return messages[randomInt(0,messages.length)]
}
exports.randomIncorrectMessage = randomIncorrectMessage;

function randomCorrectMessage() {
  messages = [
    "That's correct!",
    "Nice job. You must have a HUGE brain.",
    "100% correct, bud.",
    "Good one!",
    "Success!",
    "Nice solution!",
    "Problem solved.",
    "That's perfect. Easy, right?"
  ]
  return messages[randomInt(0,messages.length)]
}
exports.randomCorrectMessage = randomCorrectMessage;
