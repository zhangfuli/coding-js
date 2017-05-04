if(typeof(localStorage.remb)!="undefined"){
	if(localStorage.remb){
		alert("登陆成功");
		//window.onload.href="index.html";
	}else{
		$(".phone").value =localStorage.phone;
		$(".password").value =localStorage.password;
	}
}
//jq操作习惯写的自定义选择d0m元素方法
function $ (selector) {
	var doms = document.querySelectorAll(selector);
	return doms.length>1?doms:doms[0];
}
//判断是否选择自动登陆
$("#auto").onclick = function(){
	if(this.checked){
		$("#remb").checked = true;
	}else{
		$("#remb").checked = false;
	}
}	
$(".btn").onclick =function(){
	var phone = $(".phone").value.trim();  //去掉两端空格
	var password = $(".password").value.trim();
	if(phone ==""){
		// show_tips("手机号不能为空");
		alert("手机号不能为空");
		$(".phone").focus();
	}
	else{
		if(/^1[3|4|5|7|8]\d{8}$/.test(phone)){  //正则
			alert("手机号格式错误！");
			$(".phone").focus();
			return false;
		}else if(password==""){
			alert("密码不能为空");
			$(".password").focus();
			return false;
		}else{
			var xhr =  new XMLHttpRequest();
			xhr.open("GET","http://localhost:9000/data.json",true);

			xhr.onreadystatechange=function(){
				if(xhr.status == 200 && xhr.readyState==4){
					var data= JSON.parse(xhr.responseText);//将数据转化为json格式
					if(data.success){
						if(data.obj[0].phone == phone&&data.obj[0].password ==password){
							alert("登陆成功");
							// window.location.href=""
							if($("#auto").checked){
								localStorage.setItem("remb",true);
								localStorage.setItem("phone",phone);
								localStorage.setItem("password",password);
							}else{
								if($("#remb").checked){
									localStorage.setItem("phone",phone);
									localStorage.setItem("password",password);
								}else{
									localStorage.removeItem("remb");
									localStorage.removeItem("phone");
									localStorage.removeItem("password");
								}
							}
							//保证下一个页面拿到session
							sessionStorage.setItem("phone",phone);
							sessionStorage.setItem("password",password);
						}else{
							alert("登陆错误");
						}
					}	
				}
			}
			
			xhr.send();
		}
	}
}
	

// var timer=null;
// function show_tips(message){
// 	if(typeof($(".show-tips"))=='undefined'){
// 		var tipsDiv = document.createElement("div");
// 		tipsDiv.className = "show-tips hide";
// 		document.body.appendChild(tipsDiv);
// 	}
// 	clearTimeout(timer);//先把之前的定时器清除
// 	timer = null;
// 	var tips = $(".show_tips");
// 	tips.className = "show_tips";
// 	tips.innerHTML = message;
// 	timer = setTimeout(function(){
// 		tips.className = "show_tips";
// 		tips.innerHTML="";
// 	},2000);
// }