//获取用户的基本信息
let layer = layui.layer

$(function() {
    // 获取用户的的基本信息
    getUserInfo();

    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？', {
            icon: 3,
            title: '提示'
        }, function(index) {
            // 1. 清空本地 token
            localStorage.removeItem('token');
            // 2. 跳转到登录页
            location.href = '/login.html';
            // 3. 关闭确认框
            layer.close(index);
        });
    });
});


function getUserInfo() {
    $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败', { icon: 6 })
                }
                // console.log(res);
                renderAvatar(res.data)
            }
        })
        //渲染用户头像
    function renderAvatar(user) {
        let name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp&nbsp' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
                //此处name[0]取第一个字符
            let first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }

}