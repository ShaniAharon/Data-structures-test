var gTaskQueue = createQueue();
createTasks();
runTest();

function createTasks() {
  for (var i = 0; i < 100; i++) {
    gTaskQueue.enqueue({title: `Task ${i + 1}`});
  }
  // Array(10000)
  //     .fill()
  //     .map((_, i) => ({ title: `Task ${i + 1}` }))
  //     .forEach(gTaskQueue.enqueue)
}

function runTest() {
  console.log('Queue', gTaskQueue.length);

  // processAllTasks(gTaskQueue)
  // .then(res => {
  //     console.log('Results: ', res);
  // })

  processAllTasksSplit(gTaskQueue);
}

async function processAllTasksSplit(taskQueue, result = {}) {
  if (taskQueue.isEmpty()) {
    console.log('Results: ', result);
    return;
  }
  var tasksGroup = [];
  for (var i = 0; i < 10 && !taskQueue.isEmpty(); i++) {
    var task = taskQueue.dequeue();
    tasksGroup.push(task);
  }
  console.log('Starting a batch of: ', tasksGroup.length);
  tasksGroup.map(async (task) => {
    try {
      const res = await perormTask(task);
      result[task.title] = res;
    } catch (err) {
      console.log('Task Failed, putting it back at end of Queue');
      taskQueue.enqueue(task);
    }
  });

  setTimeout(() => {
    processAllTasksSplit(taskQueue, result);
  }, 0);
}

async function processAllTasks(q) {
  const result = {};
  while (!q.isEmpty()) {
    const task = q.dequeue();
    console.log('Performing: ', task);
    try {
      // var res = await perormTaskSync(task)
      const res = await perormTask(task);
      result[task.title] = res;
    } catch (err) {
      console.log('Task Failed, putting it back at end of Queue');
      q.enqueue(task);
    }
  }
  return Promise.resolve(result);
}

function perormTaskSync(task) {
  if (Math.random() > 0.5)
    return Promise.resolve(parseInt(Math.random() * 100));
  else return Promise.reject('Err');
}
function perormTask(task) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve(parseInt(Math.random() * 100));
      else reject('Err');
    }, 0);
  });
}
