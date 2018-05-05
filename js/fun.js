var appid = '20180130000119675';
var key = 'FR_PCoJGORi8gmqnXjGh';
var salt = (new Date).getTime();
var query;
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
var from = 'zh';
var to = 'en';
var str1; //= appid + query + salt + key;
var sign; // = MD5(str1);

var request = null; //异步请求

$('#transte').on('click',
    function (event) {
        query = $('#srctext').val();
        if (!query) {
            alert("请输入");
            // request.abort();
            return;
        }
        // alert(query);
        str1 = appid + query + salt + key;
        sign = MD5(str1);
    }
)

$('#transte').on('click',
    function () {
        request = $.ajax({
            url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'get',
            dataType: 'jsonp',
            data: {
                q: query,
                appid: appid,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            },
            success: function (data) {
                var result = data.trans_result;
                if (result) {
                    var r = result[0].dst;
                    $("#srcResulttext").val(r);
                    console.log("输出：" + r);
                }

            }
        });
    }
)

/**
 * 清除按钮
 */
$('#clear').on('click', function () {
    $('#srctext').val('');
    $('#srcResulttext').val('');
})

/**
 * 复制到剪贴板
 */
var clipboard = new Clipboard("#copy");
clipboard.on('success', function (e) {
    alert("复制成功！");
})