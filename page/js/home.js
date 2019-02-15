$(document).ready(function(){

    var jdata = {"token":sessionStorage.getItem("token")};
    $.ajax({
        url:'http://localhost:8090/selectUserByToken',
        data:JSON.stringify(jdata),
        type:"POST",
        dataType:"json",
        cache:false,//false是不缓存，true为缓存
        async:true,//true为异步，false为同步
        contentType: "application/json;charset=UTF-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization','Bearer' + sessionStorage.getItem('token'));
        },
        success:function(data){
            if(data['status'] == 200) {
                $("#selUname").html(data['result']);
            } else {
                location.href = 'login.html';
            }
        },
        error(exc) {
            console.info(exc);
        }
    });

    if(sessionStorage.getItem("token") == null || sessionStorage.getItem("token") == "") {
        alert("Token已过期，请重新登录！");
        // toastr.warning("Token已过期，请重新登录！");
        location.href = "login.html";
    }

    $("#logout").click(function (){
        $.ajax({
            url:'http://localhost:8090/loginOut',
            data:JSON.stringify(jdata),
            type:"POST",
            dataType:"json",
            cache:false,//false是不缓存，true为缓存
            async:true,//true为异步，false为同步
            contentType: "application/json;charset=UTF-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization','Bearer' + sessionStorage.getItem('token'));
            },
            success:function(data){
                sessionStorage.removeItem("token");
                location.href = "login.html";
            },
            error(exc) {
                console.info(exc);
            }
        });
    });
});