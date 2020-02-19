//定义退出登录模块
$('#logoutBtn').on('click', function() {
    let isConfirm = confirm('您确定需要退出吗？')
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                // location.href = 'login.html'
                location.href = './login.html'

            },
            error: function() {
                alert('退出失败')
            }
        })
    }
})

//定义时间处理函数
function dateformat(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//显示当前登录用户信息

$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(res) {
        $('.avatar').attr('src', res.avatar)
        $('.profile .name').html(res.nickName)
    }
})