jQuery || require('jquery')
$('#passForm').on('submit', function(e) {
    e.preventDefault()
    let formData = $(this).serialize()
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function() {
            location.href = '/admin/login.html'
        }
    })
})