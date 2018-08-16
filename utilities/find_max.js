x = findMax(1,2,3,4,100,10000,-1,-100);
function findMax(){
  var i, max = arguments[0];  // deifne i and max init value -> first arg
  // return max value if the number of args is only one
  if (arguments.length < 2){
    return max;
  }else
  {
    for (i = 1; i < arguments.length; i++){
      if(arguments[i] > max){
        max = arguments[i];
      }
    }
  return max;
  }
}

console.log(x);

// y = test()
// function test(){
//   var a, b = 10;
//   console.log('a -> ' + a);
//   console.log('b -> ' + b);
// }
// console.log(y);
