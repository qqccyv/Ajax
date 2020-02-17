jQuery || require('jquery')

//获取文章分类选择列表
$.ajax({
        type: 'get',
        url: '/categories',
        success: function(res) {
            let html = template('categorySelect', {
                categories: res
            })

            $('#category').html(html)
        }
    })
    //文章封面添加 
$('#parentBox').on('change', '#feature', function() {
        let file = this.files[0]
        let formData = new FormData()
        if (file) {
            formData.append('cover', file)
            $.ajax({
                type: 'post',
                url: '/upload',
                processData: false,
                contentType: false,
                data: formData,
                success: function(res) {
                    $('#thumbnail').val(res[0].cover)
                    $('#preview').show().attr('src', res[0].cover)
                }
            })
        }
        $('#thumbnail').val('')
        $('#preview').hide()

    })
    //新增文章保存
$('#createPost').on('submit', function(e) {
    e.preventDefault();
    let formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(res) {
            // console.log(res);
            location.reload()
        }
    })

})

// 定义查询url参数的函数
function getUrlParams(name) {
    let paramsAray = location.search.substr(1).split('&')
        // console.log(paramsAray);
    for (let i = 0; i < paramsAray.length; i++) {
        let temp = paramsAray[i].split('=')
        if (temp[0] == name) {
            return temp[1]
        }
    }
    return -1
}
// 判断是否是修改页面并加载修改页面
let id = getUrlParams('id')
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(res) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(categories) {
                    res.categories = categories
                    let html = template('modifyTpl',
                            res
                        )
                        // console.log(res);
                        // console.log(html);

                    $('#parentBox').html(html)
                }
            })
        }
    })
}
$('#parentBox').on('submit', '#modifyPost', function(e) {
    e.preventDefault()
    let id = $(this).data('id')
    let formData = $(this).serialize()
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }
    })
})