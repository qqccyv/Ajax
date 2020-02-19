jQuery || require('jquery')
    // 分类文章列表展示
let categoryId = getUrlParams('categoryId')
let data = {}
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function(res) {
        // console.log(res);
        data.res = res
        $.ajax({
            type: 'get',
            url: '/categories/' + categoryId,
            success: function(category) {
                data.category = category;
                let html = template('listTpl', data)
                $('#listBox').html(html)
            }
        })
    }
})