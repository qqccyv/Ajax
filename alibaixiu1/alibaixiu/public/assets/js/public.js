jQuery || require('jquery')
    //时间处理
function dateformat(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

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




//定义侧边和顶部导航栏
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        // console.log(res);
        let navTpl = `
        {{each data}}
        <li><a href="/list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>     
        {{/each}}
        `
        let html = template.render(navTpl, {
            data: res
        })
        $('#topNav').html(html)
        $('#asideNav').html(html)
    }
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

//搜索处理

$('.search form').on('submit', function(e) {
    e.preventDefault();
    let keys = $(this).find('.keys').val()
    location.href = `/search.html?keys=${keys}`
})