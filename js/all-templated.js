// 创建全局组件
Vue.component('app-header', {
  // 选项
  template:' <header class="header"><div class="headerInfo" id = "haderTitle">{{ HTitle }}</div></header>',
  data: function () {
  return {
    HTitle: ''
  }
}
})
