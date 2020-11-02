$(function() {
    let form = layui.form
    let layer = layui.layer
    $('#link_reg').on('click', function() {
        $('.log-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.log-box').show()
        $('.reg-box').hide()
    })
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则 return 一个提示消息即可
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！';
            }
        }
    });
    //注册提交
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            let data = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
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
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }

                console.log(res);
                layer.msg('登录成功');
                // 存储
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = "/index.html";
            }
        });
    });
})