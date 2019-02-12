const sum = (...extraArguments) => { // (1, 2, 3, 4, 5)
    let result = 0;

    extraArguments.forEach(ele => result += ele);

    return result; 
}

// console.log(sum(1,2,3,4,5));


class Cat {
    constructor(name) {
      this.name = name;
    }
  
    says(sound, person) {
      console.log(`${this.name} says ${sound} to ${person}!`);
      return true;
    }
  }
  
  class Dog {
    constructor(name) {
      this.name = name;
    }
  }
  
  const markov = new Cat("Markov");
  const pavlov = new Dog("Pavlov");
  
//   markov.says("meow", "Ned");
  // Markov says meow to Ned!
  // true
  
// ES5
// Function.prototype.myBind = function() {
//     let extraArgs = Array.from(arguments);
//     let context = extraArgs.shift();
//     const origFn = this;
//     return function () {
//         const callArgs = Array.from(arguments);
//         return origFn.apply(context, extraArgs.concat(callArgs));
//     };
// }
// says.myBind (context(instance of object), boundArguments(not array)) "bind time arguments"
// want to return anonymous function that received "call time" arguments
// says received "sound and person(not array)"

//ES6
Function.prototype.myBind = function (context, ...boundArgs) {
    return (...callArgs) => {
        return this.apply(context, boundArgs.concat(callArgs));
    }
}

  // bind time args are "meow" and "Kush", no call time args
//   markov.says.myBind(pavlov, "meow", "Kush")();
//   // Pavlov says meow to Kush!
//   // true
  
//   // no bind time args (other than context), call time args are "meow" and "a tree"
//   markov.says.myBind(pavlov)("meow", "a tree");
//   // Pavlov says meow to a tree!
//   // true
  
//   // bind time arg is "meow", call time arg is "Markov"
//   markov.says.myBind(pavlov, "meow")("Markov");
//   // Pavlov says meow to Markov!
//   // true
  
//   // no bind time args (other than context), call time args are "meow" and "me"
//   const notMarkovSays = markov.says.myBind(pavlov);
//   notMarkovSays("meow", "me");
//   // Pavlov says meow to me!
//   // true


function curriedSum(numArgs) {
    let numbers = Array();

    return function _curriedSum(num) {
        numbers.push(num);
        if (numbers.length === numArgs) {
            return numbers.reduce((sum, num) => sum += num, 0);
        } else {
            return this; 
        }
    }
}


// const addition = curriedSum(4);
// addition(5);
// addition(30);
// addition(20);
// addition(1);

// Function.prototype.myBind = function (context, ...boundArgs) {
//     return (...callArgs) => {
//         return this.apply(context, boundArgs.concat(callArgs));
//     }
// }

Function.prototype.curry = function (numArgs) {
    let args = Array();
    let origFn = this;

    return function _curry(arg) {
        args.push(arg);
        if (args.length === numArgs) {
            return origFn(args)
        } else {
            return this;
        }
    }
}
