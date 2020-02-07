function ajax(options) {
    const xhr = new XMLHttpRequest()
    var defaults = {
            type: 'get',
            url: '',
            async: true,
            data: {},
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function() {},
            error: function() {}
        }
        // 使用用户传递的参数替换默认值参数
    Object.assign(defaults, options);
    let params = '';
    for (let attr in defaults.data) {
        params += attr + '=' + defaults.data[attr] + '&';
        params = params.substr(0, params.length - 1)
    }
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params
    }
    console.log(defaults.url);

    xhr.open(defaults.type, defaults.url, defaults.async)
    if (defaults.type == 'post') {
        xhr.setRequestHeader('Content-Type', defaults.header['Content-Type'])
        if (defaults.header['Content-Type'] == 'application/json') {
            // console.log(params);

            xhr.send(JSON.stringify(defaults.data))
        } else {
            xhr.send(params)
        }
    } else {
        xhr.send()

    }
    xhr.onload = function() {
        let contentType = xhr.getResponseHeader('Content-Type');
        let responseText = xhr.responseText
        if (contentType.includes('application/json')) {
            responseText = JSON.parse(responseText)
        }
        if (xhr.status == 200) {
            defaults.success(responseText, xhr)
        } else {
            defaults.error(responseText, xhr)
        }

    }
    xhr.onerror = function() {
        defaults.error(xhr)
    }
}