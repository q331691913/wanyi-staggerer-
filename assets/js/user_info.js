$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须1~6之间'
            }
        }
    })
    initUserInfo()
        //初始化用户的数据
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                //form.val方法 为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    //重置表单的数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    //调用父页面中的方法，重新渲染用户的头像和用户的信息
                    //`<iframe>` 中的子页面，如果想要调用父页面中的方法，使用 `window.parent` 即可
                window.top.getUserInfo()
            }
        })
    })
})