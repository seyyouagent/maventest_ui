$(document).ready(function(){

    alert(sessionStorage.getItem("token"));
    $.ajax({
        url:'http://localhost:8090/selectUserByToken',
        data:{"token":sessionStorage.getItem("token")},
        type:"POST",
        dataType:"json",
        cache:false,//false是不缓存，true为缓存
        async:true,//true为异步，false为同步
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization','Bearer' + sessionStorage.getItem('token'));

        },
        success:function(data){
            var datas = JSON.parse(data);
            sessionStorage.setItem("token",datas['jwtToken']);
            if(datas['status'] == 200) {
                alert(datas);
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
        location.href = "login.html";
    }

    $("#logout").click(function (){
        sessionStorage.removeItem("token");
        location.href = "login.html";
    });
});