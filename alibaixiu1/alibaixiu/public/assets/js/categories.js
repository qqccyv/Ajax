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

//编辑分类信息
//展示待编辑的分类信息
$('#categoriesList').on('click', '.edit', function() {
        let id = $(this).data('id');

        $.ajax({
            type: 'get',
            url: '/categories/' + id,
            success: function(res) {
                // console.log(res);

                let html = template('editCategories', res)

                $('#categoriesBox').html(html)
            }
        })
    })
    //保存修改后的分类信息
$('#categoriesBox').on('submit', '#modifyCategories', function(e) {
    e.preventDefault();
    let id = $(this).data('id')
    let formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload()
        }
    })
})

//分类信息的全选，反选 批量删除按钮显示隐藏
$('#checkAll').on('change', function() {
    let status = $(this).is(':checked')
    $('#categoriesList input').prop('checked', status)
    status ? $('.deleteMany').show() : $('.deleteMany').hide()
})
$('#categoriesList').on('change', 'input', function() {
    // console.log(1);

    let iptLength = $('#categoriesList input').length
    let checkedLength = $('#categoriesList input:checked').length
    $('#checkAll').prop('checked', iptLength == checkedLength)
    checkedLength > 0 ? $('.deleteMany').show() : $('.deleteMany').hide()

})

//删除和批量删除
$('#categoriesList').on('click', '.delete', function() {
    let id = $(this).data('id');
    if (confirm('您确定要删除所选选项吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload()
            }
        })
    }

})
$('.deleteMany').on('click', function() {
    let checkedCategories = []
    $('#categoriesList input:checked').each(function(index, item) {
        checkedCategories.push($(item).data('id'))
    })
    if (confirm('您确定要删除所选选项吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + checkedCategories.join('-'),
            success: function() {
                location.reload()
            }

        })
    }

})