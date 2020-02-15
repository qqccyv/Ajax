jQuery || require('jquery')
    //添加用户
$('#addUser').on('submit', function() {
        let formData = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            success: function() {
                location.reload()
            },
            error: function() {
                alert('用户添加失败')
            }
        })
    })
    //添加用户头像
$('#userForm').on('change', '#avatar', function() {
        let formData = new FormData();
        formData.append('avatar', this.files[0])
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function(res) {
                $('#preview').attr('src', res[0].avatar)
                $('#hiddenAvatar').val(res[0].avatar)
            }
        })
    })
    //展示用户列表
$.ajax({
        type: 'get',
        url: '/users',
        success: function(res) {
            let html = template('userTpl', {
                users: res
            })
            $('#usersList').html(html)
        }

    })
    //展示待修改用户信息
$('#usersList').on('click', '.edit', function(e) {
        e.preventDefault() //阻止默认行为
        let id = $(this).data('id')
        $.ajax({
            type: 'get',
            url: '/users/' + id,
            success: function(res) {
                let html = template('modifyTpl', res)
                $('#userForm').html(html)
            }
        })
    })
    //修改用户信息
$('#userForm').on('submit', '#modifyUser', function() {
    let id = $(this).data('id')
    let formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(res) {
            location.reload()
        }
    })
})