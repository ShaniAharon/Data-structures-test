const numsQueue = createQueue();
const nums = getNums();
nums.forEach(numsQueue.enqueue);

// Modify the queue sample to check if the sum of the digits is even

function onCheckIsSumEven() {
  console.log('Lets go', numsQueue.length);
  // perform1()
  isSumEven();
}

// This function keeps the worker busy
function perform1() {
  while (!numsQueue.isEmpty()) {
    const num = numsQueue.dequeue();
    console.log('Checking num', num);

    if (isPrime(num)) {
      document.querySelector('.primes').innerHTML += `<li>${num}</li>`;
    }
  }
}

// This function let the worker handle other stuff
//print the sum every step
function perform2() {
  let sum = 0;
  setTimeout(function handleNum() {
    const num = numsQueue.dequeue();
    if (num) {
      console.log('Checking num', num);
      // if (isPrime(num)) {
      sum += num;
      document.querySelector('.primes').innerHTML += `<li>${sum}</li>`;
      // }
    }
    setTimeout(handleNum, 0);
  }, 0);
}

function isSumEven() {
  let sum = 0;
  while (numsQueue.length) {
    const num = numsQueue.dequeue();
    if (num) {
      console.log('Current num', num);
      sum += num;
    }
  }
  return console.log(sum % 2 === 0);
}

function isPrime(num) {
  const limit = Math.sqrt(num);
  for (let i = 2; i <= limit; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function createQueue() {
  const queue = [];

  return {
    enqueue(x) {
      queue.push(x);
    },
    dequeue() {
      if (queue.length === 0) {
        return undefined;
      }
      return queue.shift();
    },
    peek() {
      if (queue.length === 0) {
        return undefined;
      }
      return queue[queue.length - 1];
    },
    get length() {
      return queue.length;
    },
    isEmpty() {
      return queue.length === 0;
    },
  };
}

// Some nums
function getNums() {
  // return [
  //   1000000000100011, 1000112354597667, 1003229774283941, 1011001110001111,
  //   1084051191974761, 1086868110868699, 1090109110921093, 1106098069699111,
  //   1111235916285193, 1158174141556287, 1181118711931201, 1208152477719361,
  //   1235711131175321, 1238926361552897, 1255571292290713, 1301477951890177,
  //   1311753223571113, 1311870831664661, 1333333333333333, 1379131521253133,
  //   1391098979592919, 1423214346574567, 1510553619999637, 1593350922240001,
  //   1609161918110111, 1616668118999191, 1657688103077659, 1680588011350901,
  //   1693182318746371, 1737476797107127, 1867357583296451, 1886999912279359,
  //   1889080110806881, 1989530586646177, 1990474529917009, 2035802523820057,
  //   2067078579454279, 2222226095589337, 2225124216112318, 2231588810593399,
  //   2345678911111111, 2355457523880889, 2357275332573527, 2357353373727757,
  //   2380072466365871, 2468642135797531, 2573253757232573, 2695965911118727,
  //   2744337540964913, 2828074326968519, 2856646544865959, 2956667885147129,
  //   3129313031303131, 3325997869054417, 3391382115599173, 3637383940414243,
  //   3733799929399999, 3931520917431241, 3940518300860411, 4391491991635087,
  //   4429978144299823, 4444280714420857, 4547495153555759, 4564564564564561,
  //   4847464544434241, 5111111111111119, 5944066965503999, 5953474341373129,
  //   5999999999899999, 6171054912832631, 6241156164232441, 6435616333396997,
  //   6664666366626661, 6735249118018991, 6988699669998001, 7005264275346131,
  //   7190597297273099, 7523725352733257, 7753757725325377, 7897466719774591,
  //   7897897897897897, 8008808808808813, 8343656381177203, 8690333381690951,
  //   8778405442862239, 9007199254740881, 9007199254740847, 9293787934331212,
  //   9436835835813812, 9779737137133112, 9949370777987916, 9999999900000000,
  //   10000000002065384, 10106099866009180, 10112269203786180, 10234567876543200,
  //   10269797835402632, 10939058860032032, 10968523783746900, 11000011101101112,
  // ];
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
}
