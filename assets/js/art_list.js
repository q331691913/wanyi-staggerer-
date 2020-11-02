 let layer = layui.layer
     // 定义一个查询的参数对象，将来请求数据的时候，
     // 需要将请求参数对象提交到服务器
 let q = {
     pagenum: 1, // 页码值，默认请求第一页的数据
     pagesize: 2, // 每页显示几条数据，默认每页显示2条
     cate_id: '', // 文章分类的 Id
     state: '' // 文章的发布状态
 }
 initTable()


 function getNotime() {
     template.defaults.imports.formatDate = function(data) {
         let date = new Date(data)
         let y = date.getFullYear()
         let m = (date.getMonth() + 1).toString().padStart(2, 0)
         let d = date.getDate().toString().padStart(2, 0)
         let h = date.getHours().toString().padStart(2, 0)
         let miu = date.getMinutes().toString().padStart(2, 0)
         let s = date.getSeconds().toString().padStart(2, 0)
         return `${y}-${m}-${d} ${h}:${miu}:${s}`
     }
 }
 getNotime()
     // 获取文章列表数据的方法
 function initTable() {
     $.ajax({
         method: 'GET',
         url: '/my/article/list',
         data: q,
         success: function(res) {

             if (res.status !== 0) {
                 return layer.msg('获取文章列表失败！')
             }
             // 使用模板引擎渲染页面的数据

             //  var htmlStr = template('tpl-table', res)
             var htmlStr = template('tpl-table', {
                 data: [
                     { Id: 28476, title: "济南", pub_date: "2020-10-29 23:04:33.407", state: "已发布", cate_name: "改我头条试试" },
                     { Id: 28477, title: "呢喃1", pub_date: "2020-10-29 20:28:47.326", state: "已发布", cate_name: "改我头条试试" }
                 ]
             });
             $('tbody').html(htmlStr)
         }
     })
 }