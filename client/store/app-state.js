import {
  observable, computed, autorun, action
} from 'mobx'

export class AppState {
  @observable count = 0

  @observable name = 'Jokey'

  @computed get msg() {
    return `${this.name} say count IS ${this.count}`
  }

  @action add() {
    this.count += 2
  }

  @action changeName(name) {
    this.name = name
  }
}

const appState = new AppState()

autorun(() => {
  console.log(appState.msg) //eslint-disable-line
})

setInterval(() => {
  appState.add()
}, 1000)

export default appState
