jQuery || require('jquery')
    //轮播图展示
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(res) {
        // console.log(res);

        let html = template('slidesTpl', {
            data: res
        })
        $('#slidesList').html(html)
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function(index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function() {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

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

//最新发布展示
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function(res) {
        let html = template('lastedPostsTpl', {
                data: res
            })
            // console.log(res);
        $('#lastedPosts').html(html)

    }
})

function dateformat(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//