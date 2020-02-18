jQuery || require('jquery')

//查询文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        // console.log(res.records);
        let html = template('postsTpl', res)
        $('#postsList').html(html)
        let pageHtml = template('pageTpl', res)
        $('#pageBox').html(pageHtml)
            // console.log(res);


    }
})


//定义翻页函数
function onchangePage(page) {
    // console.log(page);

    $.ajax({
        type: 'get',
        url: '/posts',
        data: { page },
        success: function(res) {
            // console.log(res.records);
            let html = template('postsTpl', res)
            $('#postsList').html(html)
            let pageHtml = template('pageTpl', res)
            $('#pageBox').html(pageHtml)
                // console.log(res);
        }
    })
}

//筛选模块
//展示分类信息

$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        let html = template('categoriesTpl', {
            categories: res
        })
        $('#categoryList').html(html)
    }
})

$("#filterForm").on('submit', function(e) {
    e.preventDefault()
    let formData = $(this).serialize()
        // console.log(formData);

    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(res) {
            // console.log(res.records);
            let html = template('postsTpl', res)
            $('#postsList').html(html)
            let pageHtml = template('pageTpl', res)
            $('#pageBox').html(pageHtml)
                // console.log(res);


        }
    })
})

//删除文章模块
$('#postsList').on('click', '.delete', function() {
    let id = $(this).data('id')
    if (confirm('您确定要删除所选择的选项吗？')) {
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function name(params) {
                location.reload()
            }

        })
    }
})