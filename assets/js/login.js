$(function() {

    $('#link_reg').on('click', function() {
        $('.log-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.log-box').show()
        $('.reg-box').hide()
    })
    let from = layui.from
    let layer = layui.layer
    form.verify({
            username: function(value, item) { //value：表单的值、item：表单的DOM对象
                if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '用户名不能有特殊字符';
                }
                if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if (/^\d+\d+\d$/.test(value)) {
                    return '用户名不能全为数字';
                }
            },
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repass: function(value) {
                let pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return layer.msg('两次密码不一致', { icon: 6 });
                }
            }


        })
        //注册提交
    $('#form_reg').on('submit', function(e) {
            e.preventfalut()
            let data = {
                usename: $('#form_reg[name=usename]').val(),
                password: $('#form_reg[name=password]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败', { icon: 6 })
                }
                layer.msg('注册成功！请登录', { icon: 6 })
                $('#link_login').click()

            })
        })
        //登录提交
    $('#form_login').on('submit', function(e) {
        e.preventfalut()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败', { icon: 6 })
                }
                layer.msg('登录成功', { icon: 6 })
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})