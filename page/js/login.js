$(document).ready(function(){
    $("#submits").click(function (){
        var uname = $("#username").val();
        var pas = $("#password").val();
        var jsondata = {"uname":uname,"password":pas};

        $.ajax({
            url:'http://localhost:8090/login',
            data:JSON.stringify(jsondata),
            type:"POST",
            contentType: "application/json;charset=UTF-8",
            cache:false,//false是不缓存，true为缓存
            async:true,//true为异步，false为同步
            // beforeSend: function (xhr) {
            //     xhr.setRequestHeader('Access-Control-Allow-Credentials',true);
            // xhr.setRequestHeader('Access-Control-Allow-Origin','*');
            // },
            success:function(data){
                alert(data['jwtToken']);
                sessionStorage.setItem("token",data['jwtToken']);
                if(data['status'] == 200) {
                    location.href = 'home.html';
                } else {
                    alert(data['msg']);
                }
            },
            error:function(exc) {
                console.info(exc);
            }
        });
    });
});