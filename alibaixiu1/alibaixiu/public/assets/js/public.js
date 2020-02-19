jQuery || require('jquery')

//定义公用组件  随机推荐
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(param) {
        let randomTpl = `
        {{each data}}
        <li>
        <a href="/detail.html?id={{$value._id}}">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
            </div>
        </a>
    </li>
        {{/each}}
        `;
        // console.log(param);
        let html = template.render(randomTpl, {
            data: param
        })
        $('#randomPosts').html(html)
    }
})