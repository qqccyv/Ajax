jQuery || require('jquery')
    //统计文章数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function(res) {
        let html = `<strong>${res.postCount}</strong>篇文章（<strong>${res.draftCount}</strong>篇草稿）`
        $('#posts').html(html)
    }
})

//统计分类数量
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function(res) {
        let html = `<strong>${res.categoryCount}</strong>个分类`
        $('#category').html(html)
    }
})

//统计评论数量
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function(res) {
        // console.log(res);

        let html = `<strong>${res.commentCount}</strong>条评论（<strong>1</strong>条待审核）`
        $('#comment').html(html)
    }
})