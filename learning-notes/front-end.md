+ 如有一个组件 `<Route path="/SignIn" component={SignIn}>`，则 SignIn 的子组件想要使用 `this.props.history.push(nextProps.redirectTo)`，必须要通过父组件传递 history 属性。

  参考：https://blog.csdn.net/yingzizizizizizzz/article/details/78751305

+ mapStateToProps 中的值的改变似乎不会影响组件的生命周期，即不会调用 componentWillReceiveProps 方法，也不会重新 render。该问题可以通过在 constructor 中赋初值，之后每次都改变 this.state 来解决。

