// Sort
// • See what happens when array gets bigger (50,000?)
// • Demonstrate how quick sort can be very poor if given a sorted array
// o Did quick-sort throw a Maximum call stack size exceeded error?

function createBigArray() {
  return Array(50000)
    .fill()
    .map((_, i) => i)
    .sort((a, b) => b - a);
  //   console.log(arr.sort((tsk1, tsk2) => tsk2.value - tsk1.value));
}
var items = [2, 3, 5, 6, 7, 9]; //[5, 3, 7, 6, 2, 9];
function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(items, index, right);
    }
  }
  return items;
}
// first call to quick sort
const nums = createBigArray();
var sortedArray = quickSort(nums, 0, nums.length - 1);
console.log(sortedArray); //prints [2,3,5,6,7,9]
