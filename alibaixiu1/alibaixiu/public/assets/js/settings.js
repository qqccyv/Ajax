jQuery || require('jquery')
    //展示原有网站设置
$.ajax({
        type: 'get',
        url: '/settings',
        success: function(res) {
            $('#site_logo').val(res.logo)
            $('#previews').attr('src', res.logo)
            $('#site_name').val(res.title)
            $('#comment_status').prop('checked', res.comment)
            $('#review').prop('checked', res.review)
        }
    })
    //网站封面logo图片添加
$('#logo').on('change', function() {
    let file = this.files[0]
    let formData = new FormData()
    formData.set('logo', file)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            // console.log(res);
            $('#site_logo').val(res[0].logo)
            $('#previews').attr('src', res[0].logo)

        }
    })
})

//网页设置保存
$('#settingsForm').on('submit', function(e) {
    e.preventDefault()
    let formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function() {
            location.reload()
        }
    })
})