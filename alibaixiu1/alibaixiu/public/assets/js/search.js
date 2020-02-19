jQuery || require('jquery')
let keys = getUrlParams('keys')
$.ajax({
    type: 'get',
    url: '/posts/search/' + keys,
    success: function(res) {
        console.log(res);
        let html = template('searchTpl', {
            data: res
        })
        $('#searchBox').html(html)
    }
})