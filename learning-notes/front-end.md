+ 如有一个组件 `<Route path="/SignIn" component={SignIn}>`，则 SignIn 的子组件想要使用 `this.props.history.push(nextProps.redirectTo)`，必须要通过父组件传递 history 属性。

  参考：https://blog.csdn.net/yingzizizizizizzz/article/details/78751305

+ mapStateToProps 中数组内部的值的改变似乎不会影响组件的生命周期，即不会调用 componentWillReceiveProps 方法，也不会重新 render。该问题可以通过在 constructor 中赋初值，之后每次都改变 this.state 来解决。**又好像不是这样？？ ** 

  + 这个问题应该是 React 的 props 异步更新的机制导致的，可以通过使用生命周期钩子的 **nextProps** 参数来强行刷新 props 以达到同步。

+ `cannot resolve './blabla'` 有可能是文件名打错了，比如打成了 `blabla..js `。

+ ```react
  let modelArray = [];
  modelArray[0] = false;
  modelArray[1000] = false;
  modelArray.fill(false, 0, 1000);
  this.state = {
  	isExpanded: modelArray,
  	isToDelete: modelArray,
  }
  ```

  在 constructor 中这样初始化两个数组，会导致它们**指向同一个 modelArray**，即一个数组的变化会导致另一个数组也跟着变化。

+ 在当前页面重定向回自身，不会调用组件的 componentWillMount 方法。

+ Material-UI 中有比较紧密的依赖关系的组件最好写在一个 class 里，比如 `<ExpansionPanel>`, `<ExpansionPanelSummary>` 和 `<ExpansionPanelDetails>` 。

+ componentWillMount 在 constructor 之后被调用。

+ setState 几点重要的特性：

  + setState 会在函数其余部分执行完毕后再执行。

    （可以这么理解，但是实际上即使函数其余部分都执行完了，setState 也不会立即执行。由于 React 特殊的异步机制，一般所有的 setState 都会留到 render 前一刻不得不更新 state 的时候统一更新。）

  + setState 是异步执行的，在一个函数内部，下面的 setState 如果需要用到上面的 setState 更新后的值，可以通过如下方法强行刷新上面的 setState：

    ```react
    this.setState((prevState) => ({
                value: prevState.value + 1,
    }))
    ```

  + 在一个函数内部，如果某些代码需要用到 setState 更新后的值，可以通过 setState 中的回调函数：

    ```react
    //此时 this.state.value = 1
    this.setState({
        value: this.state.value + 1,
    }, () => {
        console.log(this.state.value) //2
    })
    console.log(this.state.value) //1
    ```

    也可以通过 await 解决（和 promise 的 .then 回调地狱有点像？）。

  + 以上两种方法可以组合使用：

    ```
    this.setState((prevState) => ({
                value: prevState.value + 1,
            }),() => {
            	console.log(this.state.value)
    })
    ```

    其本质是 setState 可以接受两个参数：第一个参数一般是 state 对象，也可以是一个以 prevState 为参数，state 对象为返回值的函数；第二个参数可省，也可以是一个回调函数，该函数作用域内的 state 是更新过后的。

##### Last-modified date: 2019.3.24, 9 p.m.

