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

//定义时间处理函数
function dateformat(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

template.defaults.imports.dateformat = dateformat

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