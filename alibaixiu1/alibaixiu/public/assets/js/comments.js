//预先向数据库传入评论数据
// $.ajax({
//     type: 'post',
//     url: '/comments',
//     data: {
//         author: '5e463d1b64541b0720e9f1b9',
//         content: '评论内容10',
//         post: '5e4906d03d4b752f1cdecab3',
//         state: 0
//     }
// })

//获取评论信息列表
//定义获取某一页的评论列表函数
changePage(1)

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page
        },
        success: function(params) {
            // console.log(params);
            //渲染评论列表
            let html = template('commentsTpl', params)
            $('#commentsList').html(html)
                //渲染分页列表
            let pageHtml = template('pageTpl', params)
            $('#pageList').html(pageHtml)
        }
    })
}

//审核模块点击功能
$('#commentsList').on('click', '.edit', function() {
    let id = $(this).data('id')
    let state = $(this).data('status')
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: state ^= 1
        },
        success: function(param) {
            location.reload()
        }
    })
})

//删除模块
$('#commentsList').on('click', '.delete', function() {
    let id = $(this).data('id')
    if (confirm('您确定要删除所选择的选项吗？')) {
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function(param) {
                location.reload()
            }
        })
    }

})