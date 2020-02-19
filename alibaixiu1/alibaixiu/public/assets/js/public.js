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

//最新评论展示
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(res) {
        // console.log(res);
        let commentsTpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
                <div class="avatar">
                    <img src="{{$value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                    <p>
                        <span>{{$value.author.nickName}}</span>{{$imports.dateformat($value.author.createTime)}}说:
                    </p>
                    <p>{{$value.content.substr(0,15)}}</p>
                </div>
            </a>
        </li>
        {{/each}}
        `
        let html = template.render(commentsTpl, {
            data: res
        })
        $('#lastedComments').html(html)
    }
})


function dateformat(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}