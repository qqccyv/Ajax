jQuery || require('jquery')

//添加图片
$('#image').on('change', function() {
        let file = this.files[0]
        let formData = new FormData()
        formData.append('image', file)
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false, //这里一定要设置  不然会报错！！！
            // jquery.js:7340 Uncaught TypeError: Illegal invocation
            success: function(res) {
                // console.log(res);
                $('#imgHidden').val(res[0].image)

            }
        })
    })
    //轮播图添加
$('#slideForm').on('submit', function(e) {
    e.preventDefault()
    let formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(res) {
            console.log(res);

            location.reload()
        }
    })
})

//轮播图展示
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(res) {

        let html = template('slidesTpl', {
            data: res
        })
        $('#slidesList').html(html)
    }
})