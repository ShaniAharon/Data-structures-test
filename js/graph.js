const socialGraph = createGraph(true)
// const socialGraph = createGraph()

socialGraph.addNode('Muki')
socialGraph.addNode('Puki')
socialGraph.addNode('Suki')
socialGraph.addNode('Juki')

socialGraph.addEdge('Muki', 'Puki')
socialGraph.addEdge('Puki', 'Muki')
socialGraph.addEdge('Puki', 'Suki')

socialGraph.addEdge('Suki', 'Juki')
socialGraph.addEdge('Muki', 'Juki')
socialGraph.addEdge('Puki', 'Suki')
socialGraph.addEdge('Suki', 'Puki')
socialGraph.addEdge('Juki', 'Muki')

console.log(socialGraph.getAsPrintableString())

//print all nodes that start with P
socialGraph.bfs(socialGraph.nodes[0].key, (node) => {
  node.key.charAt(0) === 'P' ? console.log('BFS Looking at test:', node) : ''
})

//2 Visit the graph and print all edges that goes both ways (Puki -> Muki && Muki -> Puki)
//not sure what we need to do here

socialGraph.bfs(socialGraph.nodes[0].key, (node) =>
  console.log('BFS Looking at:', node)
)

// socialGraph.dfs(socialGraph.nodes[0].key, (node) =>
//   console.log('DFS Looking at:', node)
// );

function createNode(key) {
  const friends = []

  return {
    key,
    friends,
    addFriend(node) {
      if (friends.find((f) => f.key === node.key)) return
      friends.push(node)
    },
  }
}

function createGraph(directed = false) {
  const nodes = []
  const edges = []

  return {
    nodes,
    edges,
    addNode(key) {
      nodes.push(createNode(key))
    },

    getNode(key) {
      return nodes.find((n) => n.key === key)
    },

    addEdge(node1Key, node2Key) {
      const node1 = this.getNode(node1Key)
      const node2 = this.getNode(node2Key)

      node1.addFriend(node2)
      console.log('node1', 'node2', node1, node2)
      if (!directed) {
        node2.addFriend(node1)
      }
      edges.push(`${node1Key}${node2Key}`)
      console.log('edges', edges)
    },

    getAsPrintableString() {
      return nodes
        .map(({friends, key}) => {
          let result = `${key}`

          if (friends.length) {
            const str = friends.map((node) => node.key).join(' ')
            console.log('test', (result += ` ---> ${str}`))
            result += ` ---> ${str}`
          }

          return result
        })
        .join('\n')
    },
    getAsPrintableTest() {
      return nodes
        .map(({friends, key}) => {
          let result = `${key}`
          let edegsTest = []
          if (friends.length) {
            const str = friends.map((node) => node.key).join(' ')
            console.log('test', (result += ` ---> ${str}`))
            result += ` ---> ${str}`
            edegsTest.push(str)
          }
          console.log('test', edegsTest)
          return result
        })
        .join('\n')
    },

    bfs(startingNodeKey, visitFn) {
      const visitedMap = nodes.reduce((acc, cur) => {
        acc[cur.key] = false
        return acc
      }, {})
      const queue = createQueue()
      const startingNode = this.getNode(startingNodeKey)
      queue.enqueue(startingNode)

      while (!queue.isEmpty()) {
        const currentNode = queue.dequeue()

        if (!visitedMap[currentNode.key]) {
          visitFn(currentNode)
          visitedMap[currentNode.key] = true
        }

        currentNode.friends.forEach((node) => {
          if (!visitedMap[node.key]) {
            queue.enqueue(node)
          }
        })
      }
    },

    dfs(startingNodeKey, visitFn) {
      const startingNode = this.getNode(startingNodeKey)
      const visitedMap = nodes.reduce((acc, cur) => {
        acc[cur.key] = false
        return acc
      }, {})

      function traverse(node) {
        if (visitedMap[node.key]) {
          return
        }

        visitFn(node)
        visitedMap[node.key] = true

        node.friends.forEach((friend) => {
          traverse(friend)
        })
      }
      traverse(startingNode)
    },
  }
}
