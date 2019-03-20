/*校内登录  只有校内人员才能登录*/
function login1() {
  if ($('#userName').val() == "") {
    input_wrong('#userName', '用户名不能为空!')
    return;
  }

  if ($('#password').val() == "") {
    input_wrong('#password', '密码不能为空!')
    return;
  }
  $.ajax({
    url: '${pageContext.request.contextPath}/user/login.action',
    data: $('#fm').serialize(),
    type: 'post',
    success: function (map) {
      if (map.msg == "1") {
        if (map.type == "校内") {
          window.self.location = 'jsp/index.jsp';
        } else {
          input_wrong('', '您不是校内用户，无法登录!')
        }
      } else {
        let str = '登陆失败，' + map.msg
        input_wrong('', str);
      }
    },
    error: function (xhr, status, error) {
      alert(xhr.responseText);
    }

  });
}
/*校外登录 所有用户都可以登录*/
function login2() {
  if ($('#userName').val() == "") {
    input_wrong('#userName', '用户名不能为空!')
    return;
  }
  if ($('#password').val() == "") {
    input_wrong('#password', '密码不能为空!')
    return;
  }
  $.ajax({
    url: '${pageContext.request.contextPath}/user/login.action',
    data: $('#fm').serialize(),
    type: 'post',
    success: function (map) {
      if (map.msg == "1") {
        window.self.location = 'jsp/outIndex/index.jsp';
      } else {
        let str = '登陆失败，' + map.msg
        input_wrong('', str);
      }
    },
    error: function (xhr, status, error) {
      alert(xhr.responseText);
    }

  });
}






//=====new=======
var input_wrong = function(el, message){
  $(el).animate({"left":".5rem"},100).animate({"left":"-.5rem"},100).animate({"left":".5rem"},100).animate({"left":"0rem"},100);
  $('#alert').text(message)
  $('#alert').fadeIn(200).delay(1000).fadeOut(200);
}
$(function () {
  $('input').focus(function () {
    $(this).prev().removeClass('font_lost');
    $(this).prev().addClass('font_point');
    $(this).removeClass('input_lost');
    $(this).addClass('input_point');
  })
  $('input').blur(function () {
    $(this).prev().removeClass('font_point');
    $(this).prev().addClass('font_lost');
    $(this).removeClass('input_point');
    $(this).addClass('input_lost');
  })
})
