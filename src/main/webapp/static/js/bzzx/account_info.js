$("#divUserHead").imageUpload({
    label: "点击更改头像",
    defaultImage: $("#hidUserHead").val(),
    callback: function (val) {
        $("#hidUserHead").val(val);
    }
});

$("#btnSubmit").click(function () {
    var formData = true;

    if (formData) {
        var isHasData = false;

        for (var key in formData) {
            if (formData[key]) {
                isHasData = true;

                break;
            }
        }

        if (isHasData) {
            alert("请输入要提交的信息！");
        }
       var userName = $("#realName").val();
       var idCard = $("#idCard").val();
       $.ajax({
			type: "POST",
			dataType:'json',
			url: 'http://localhost:8080/updateUser',
			data: {"userName":userName,"idCard":idCard},
			success: function(data){
				if(data.state === 0){
					alert('操作成功', function(){
					});
				}else{
					alert("操作失败");
				}
			}
		});
    }
});