let layer = layui.layer
let form = layui.form
let laypage = layui.laypage
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

            let htmlStr = template('tpl-table', res)
                // let htmlStr = template('tpl-table', {
                //     data: [
                //         { Id: 28476, title: "济南", pub_date: "2020-10-29 23:04:33.407", state: "已发布", cate_name: "改我头条试试" },
                //         { Id: 28477, title: "呢喃1", pub_date: "2020-10-29 20:28:47.326", state: "已发布", cate_name: "改我头条试试" }
                //     ]
                // });
            $('tbody').html(htmlStr)
            renderPage(res.total)
        }
    })
}

//初始化文章分类的方法

initCate()

function initCate() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取分类数据失败！')
            }
            let htmlStr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlStr)
            form.render()
        }
    })
}
$('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中项的值
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
            // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
            // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })
    //渲染分页的方法
    // 定义渲染分页的方法
    // 定义渲染分页的方法
    // 定义渲染分页的方法
function renderPage(total) {
    // 调用 laypage.render() 方法来渲染分页的结构
    laypage.render({
        elem: 'pageBox', // 分页容器的 Id
        count: total, // 总数据条数
        limit: q.pagesize, // 每页显示几条数据
        curr: q.pagenum, // 设置默认被选中的分页
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],
        // 分页发生切换的时候，触发 jump 回调
        // 触发 jump 回调的方式有两种：
        // 1. 点击页码的时候，会触发 jump 回调
        // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
        jump: function(obj, first) {
            // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
            // 如果 first 的值为 true，证明是方式2触发的
            // 否则就是方式1触发的
            console.log(first)
            console.log(obj.curr)
                // 把最新的页码值，赋值到 q 这个查询参数对象中
            q.pagenum = obj.curr
                // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
            q.pagesize = obj.limit
                // 根据最新的 q 获取对应的数据列表，并渲染表格
                // initTable()
            if (!first) {
                initTable()
            }
        }
    })
}
$('tbody').on('click', '.btn-delete', function() {
    // 获取删除按钮的个数
    var len = $('.btn-delete').length
        // 获取到文章的 id
    var id = $(this).attr('data-id')
        // 询问用户是否要删除数据
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
        $.ajax({
            method: 'GET',
            url: '/my/article/delete/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('删除文章失败！')
                }
                layer.msg('删除文章成功！')
                    // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                    // 如果没有剩余的数据了,则让页码值 -1 之后,
                    // 再重新调用 initTable 方法
                    // 4
                if (len === 1) {
                    // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                    // 页码值最小必须是 1
                    q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                }
                initTable()
            }
        })

        layer.close(index)




    })
})