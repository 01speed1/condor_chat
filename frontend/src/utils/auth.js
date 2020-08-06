const isLogin = () => Boolean(localStorage.getItem('token'))

export { isLogin }