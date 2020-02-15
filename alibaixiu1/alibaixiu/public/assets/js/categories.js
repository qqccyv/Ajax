jQuery || require('jquery')
    //展示分类信息
$.ajax({
        type: 'get',
        url: '/categories',
        success: function(res) {
            let html = template('categoriesTpl', {
                categories: res
            })
            $('#categoriesList').html(html)
        }
    })
    //添加分类
$('#categoriesForm').on('submit', function(e) {
    e.preventDefault()
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(res) {
            location.reload()
                // console.log(res);

        }
    })
})

//分类信息展示