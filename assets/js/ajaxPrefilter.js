$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})