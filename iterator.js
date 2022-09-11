/*
Challenge 1
A) Create a for loop that iterates through an array and returns the sum of the elements of the array.
B) Create a functional iterator for an array that returns each value of the array when called, one element at a time.
*/
function sumOfArray(list) {
  let result = 0;
  for (let i = 0; i < list.length; i++) {
    result += list[i];
  }
  return result;
}
function returnIterator(list) {
  let i = 0;
  return function () {
    const value = list[i];
    i++;
    return value;
  };
}
// const array2 = ["a", "b", "c", "d"];
// const myIterator = returnIterator(array2);
// console.log(myIterator()); // -> should log 'a'
// console.log(myIterator()); // -> should log 'b'
// console.log(myIterator()); // -> should log 'c'
// console.log(myIterator()); // -> should log 'd'

/*
Challenge 2
Create an iterator with a next method that returns each value of the array when .next is called.
*/
function nextIterator(list) {
  const iterator = returnIterator(list);
  return {
    next: iterator,
  };
}
// Uncomment the lines below to test your work
// const array3 = [1, 2, 3];
// const iteratorWithNext = nextIterator(array3);
// console.log(iteratorWithNext.next()); // -> should log 1
// console.log(iteratorWithNext.next()); // -> should log 2
// console.log(iteratorWithNext.next()); // -> should log 3
// console.log(iteratorWithNext.next());

/*
Challenge 3
Write code to iterate through an entire array using your nextIterator and sum the values.
*/
function sumArray(list) {
  const ItWithNext = nextIterator(list);
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += ItWithNext.next();
  }
  return sum;
}
// Uncomment the lines below to test your work
// const array4 = [1, 2, 3, 4];
// console.log(sumArray(array4)); // -> should log 10

/*
Challenge 4
Create an iterator with a next method that returns each value of a set when .next is called
*/
function setIterator(set) {
  const values = set.values();
  return {
    next: () => {
      let element = values.next();
      return element.value;
    },
  };
}
// Uncomment the lines below to test your work
// const mySet = new Set("hey");
// const iterateSet = setIterator(mySet);
// console.log(iterateSet.next()); // -> should log 'h'
// console.log(iterateSet.next()); // -> should log 'e'
// console.log(iterateSet.next()); // -> should log 'y'

/*
Challenge 5
Create an iterator with a next method that returns an array with two elements (where the first element is the index and the second is the value at that index) when .next is called.
*/
function indexIterator(list) {
  let i = 0;
  return {
    next: function iterate() {
      const element = [i, list[i]];
      i++;
      return element;
    },
  };
}
// Uncomment the lines below to test your work
//const array5 = ['a', 'b', 'c', 'd'];
//const iteratorWithIndex = indexIterator(array5);
//console.log(iteratorWithIndex.next()); // -> should log [0, 'a']
//console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
//console.log(iteratorWithIndex.next()); // -> should log [2, 'c']

/*
Challenge 6
Create an iterator that returns each word from a string of words on the call of its .next method (hint: use regex!)
Then attach it as a method to the prototype of a constructor Words. Hint: research Symbol.iterator!
*/
function Words(string) {
  this.str = string;
}

Words.prototype[Symbol.iterator] = function () {
  // YOUR CODE HERE
  let index = 0;
  const splitStr = this.str.split(/\s/);
  return {
    next: function () {
      if (index < splitStr.length) {
        const value = splitStr[index];
        index++;
        return { value: value, done: false };
      } else {
        return { done: true };
      }
    },
  };
};
// Uncomment the lines below to test your work
// const helloWorld = new Words("Hello World");
// for (let word of helloWorld) {
//   console.log("Challenge 6", word);
// }
/*
Challenge 7
Build a function that walks through an array and returns the element concatenated with the string "was found after index x", where x is the previous index.
Note: if it is the first element it should say that it is the first
*/
function valueAndPrevIndex(array) {
  let index = 0;
  return {
    sentence: function () {
      index++;
      let indexName = index;
      if (index - 1 === 0) {
        indexName = "first";
      }
      return "" + array[index - 1] + " was found after index " + indexName;
    },
  };
}
/*
Challenge 8
Write a function that will console.log "hello there", or "gibberish", every three seconds depending on if the word passed into the function is 'english'.
Do not use any type of loop constructor and only make the call to createConversation once.
*/
function* createConversation(str) {
  yield setInterval(function () {
    if (str == "english") {
      console.log("hello there");
    } else {
      console.log("gibberish");
    }
  }, 3000);
}

//createConversation("english").next();

/*
Challenge 9
Use async/await to console.log a sentence comprised of a noun and 
verb in which the non async function takes in a noun, concatenates it
with a hard coded verb and returns it to the async function to be 
console.logged after a duration of 3 seconds. Call the async 
function only once, feeding it a noun to make this happen.
*/
function waitForVerb(noun) {
  const verb = "play";
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(noun + " " + verb), 3000);
  });
}

async function f(noun) {
  const data = await waitForVerb(noun);
  console.log(data);
}

f("dog");
