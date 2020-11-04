$(function() {
    let layer = layui.layer
    let form = layui.form
    initArtCateList()
        //更新数据
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success(res) {
                // console.log(res);
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //添加模块
    let indexAdd = null
    $('.addClass').on('click', function() {
            indexAdd = layer.open({
                type: 1,
                title: '添加分类文章',
                area: ['500px', '250px'],
                content: $('#dialog-add').html() //这里content是一个普通的String
            });
        })
        //添加分类
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                layer.close(indexAdd)
            }
        })
    })
    let indexEdit = null
        //代理 给编辑绑定事件
    $('tbody').on('click', '#btn-edit', function() {
            indexEdit = layer.open({
                type: 1,
                title: '修改分类文章',
                area: ['500px', '250px'],
                content: $('#dialog-edit').html() //这里content是一个普通的String
            });
            let id = $(this).attr('data-id')
            $.ajax({
                method: 'GET',
                url: `/my/article/cates/${id}`,
                success(res) {
                    form.val('form-edit', res.data)
                }
            })
        })
        //修改文章分类
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章数据失败')
                }
                layer.msg('更新成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function() {
        let id = $(this).attr('data-id')
        console.log(id);
        layer.confirm('你确定删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: `/my/article/deletecate/${id}`,
                success(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功')
                    layer.close(index);
                    initArtCateList()
                }
            })

            $.each('')
        });
    })
    $("#checkAll").on("click", function() {
        // let newCheckbox = document.querySelectorAll('#delete_checkbox')
        $('.delEte').prop('checked', $(this).prop('checked'))

    })
    $("tbody").on('click', ".delEte", function() {
        console.log($(".delEte").length);
        console.log($(".delEte:checked").length);
        if ($(".delEte:checked").length === $(".delEte").length) {
            $("#checkAll").prop("checked", true)
        } else {
            $("#checkAll").prop("checked", false)
        }
    })


    $('.removeClass').on('click', function() {
        let flag = true
        $('.delEte').each(function() {
            if ($(this).is(':checked')) {
                let id = ($(this).attr('data-id')) //逐个获取id
                if (id > 2) {
                    $.ajax({
                        method: 'GET',
                        url: `/my/article/deletecate/${id}`,
                        success(res) {
                            if (res.status !== 0) {
                                flag = false
                                return layer.msg('删除分类失败')
                            }

                        }
                    })
                }
                initArtCateList()
            }
        })

        if (flag) {
            layer.msg('删除分类成功')

        }



    })







})