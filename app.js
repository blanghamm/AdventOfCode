//Using map and regex expressions to reformat the txt document into an array.
const fs = require("fs");
console.time("exc");
//Main pasword function with boolean value to run either part one or two.
const passwordValidator = (setPartTwoActive) => {
  let dataText;
  //Set readfile to execute synchronously, otherwise dataText would be undefined.
  try {
    dataText = fs.readFileSync("./input.txt", "utf8");
  } catch (e) {
    console.log("Error:", e);
  }
  const output = dataText.split("\n");
  const passwordArr = output.map((ele, i) => {
    //Extract letter and password
    const letterPattern = /[a-z]+/g;
    const letterOutput = ele.match(letterPattern);
    //Extract first and second number, allows for both single and double digits
    const numPattern = /([0-9]|[1-9][0-9])+/gm;
    const numberOutput = ele.match(numPattern);
    //Return a new array with the sorted items, index selection for returned strings. Regex returns two matches, so can select each one.
    return {
      letter: letterOutput[0],
      password: letterOutput[1],
      //Convert string into number
      minNumber: parseInt(numberOutput[0]),
      maxNumber: parseInt(numberOutput[1]),
    };
  });
  //Run first part of the ruleset.
  if (!setPartTwoActive) {
    const validPasswordsPartOne = passwordArr.map((ele) => {
      const password = ele.password;
      //Compares the number of occurances based on the letter rule, returns the count.
      const comparingLetter = password.split(ele.letter).length - 1;
      //Comparing the count with the min and max number range, returning 1 or 0, true or false.
      const checkMinCount = comparingLetter >= ele.minNumber ? 1 : 0;
      const checkMaxCount = comparingLetter > ele.maxNumber ? 0 : 1;
      const finalCheck = checkMinCount && checkMaxCount ? 1 : 0;
      return finalCheck;
    });
    //Filter the returned array and count the number of true outputs
    const validPartOne = validPasswordsPartOne.filter(Boolean).length;
    console.log(validPartOne);
  }
  //Second part of the exercise. Could wrap them up together at the expense of readability
  if (setPartTwoActive) {
    const validPasswordsPartTwo = passwordArr.map((ele) => {
      //Setting constants to help make it easier to read
      const letter = ele.letter;
      const firstPos = ele.minNumber;
      const secondPos = ele.maxNumber;
      //Adding an extra character to the start of each string, no zero index issue. Not sure if best solution
      const passwordSlice = ele.password.slice(0, 0) + "0" + ele.password;
      //Checking char at given positions
      const posCheckOne = passwordSlice.charAt(firstPos);
      const posCheckTwo = passwordSlice.charAt(secondPos);
      //Comparing each pos to the assigned letter, returning true all false.
      if (letter === posCheckOne && letter !== posCheckTwo) {
        return 1;
      } else if (letter === posCheckTwo && letter !== posCheckOne) {
        return 1;
      } else if (letter !== posCheckOne && posCheckTwo) {
        return 0;
      } else if (letter === posCheckOne && posCheckTwo) {
        return 0;
      }
      //Return new array to validPasswordsPartTwo
      return;
    });
    //Check for true values
    const validPartTwo = validPasswordsPartTwo.filter(Boolean).length;
    console.log(validPartTwo);
  }
};

console.timeEnd("exc");

passwordValidator(false);
