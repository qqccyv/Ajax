//热门文章展示

$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(res) {
        // console.log(res);
        let recommendTpl = `
    {{each data}}   
    <li>
        <a href="/detail.html?id={{$value._id}}">
            <img src="{{$value.thumbnail}}" alt="">
            <span>{{$value.title}}</span>
        </a>
    </li>
    {{/each}}
        `

        let html = template.render(recommendTpl, {
            data: res
        })
        $('#recommend').html(html)
    }
})