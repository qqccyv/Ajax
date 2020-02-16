jQuery || require('jquery')
    //获取文章分类选择列表
$.ajax({
        type: 'get',
        url: '/categories',
        success: function(res) {
            let html = template('categorySelect', {
                categories: res
            })

            $('#category').html(html)
        }
    })
    //文章封面添加 
$('#feature').on('change', function() {
        let file = this.files[0]
        let formData = new FormData()
        if (file) {
            formData.append('cover', file)
            $.ajax({
                type: 'post',
                url: '/upload',
                processData: false,
                contentType: false,
                data: formData,
                success: function(res) {
                    $('#thumbnail').val(res[0].cover)
                    $('#preview').show().attr('src', res[0].cover)
                }
            })
        }
        $('#preview').hide()

    })
    //新增文章保存
$('#createPost').on('submit', function(e) {
    e.preventDefault();
    let formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(res) {
            // console.log(res);
            location.reload()
        }
    })

})