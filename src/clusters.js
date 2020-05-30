const cluster = require('cluster')
const { cpus } = require('os')

class Clusters {
  constructor() {
    this.cpus = cpus()
    this.init()
  }

  init() {
    if (cluster.isMaster) {
      this.cpus.forEach(() => cluster.fork())

      cluster.on('listening', (worker) => {
        console.log('Cluster %d connected', worker.process.pid)
      })

      cluster.on('disconnect', (worker) => {
        console.log('Cluster %d disconnected', worker.process.pid)
      })

      cluster.on('exit', (worker) => {
        console.log('Cluster %d exited', worker.process.pid)
        cluster.fork()
      })
    } else {
      require('./index')
    }
  }
}

export default new Clusters()
