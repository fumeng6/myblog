// 按键防抖
// 防抖全局计时器
let TT = null; //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
  if (TT !== null) clearTimeout(TT);
  TT = setTimeout(fn, time);
}

// function debounce(func, wait) {
//   let timeout;
//   return function () {
//     const context = this,
//       args = arguments;
//     clearTimeout(timeout);
//     timeout = setTimeout(function () {
//       func.apply(context, args);
//     }, wait);
//   };
// }

// 复制提醒
document.addEventListener("copy", function () {
  debounce(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "复制成功😀",
          message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
          position: "top-left",
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000,
        });
      },
    });
  }, 300);
});

// f12提醒但不禁用
document.onkeydown = function (e) {
  if (
    123 == e.keyCode ||
    (e.ctrlKey &&
      e.shiftKey &&
      (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) ||
    (e.ctrlKey && 85 === e.keyCode)
  ) {
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "你已被发现😜",
            message: "小伙子，扒源记住要遵循GPL协议哦~",
            position: "top-left",
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000,
          });
        },
      });
    }, 300);
  }
};
/* 禁用f12与按键防抖 end */

/***********************/
// 分享本页
function share_() {
  let url = window.location.origin + window.location.pathname;
  try {
    // 截取标题
    var title = document.title;
    var subTitle = title.endsWith("| 猫野")
      ? title.substring(0, title.length - 14)
      : title;
    navigator.clipboard.writeText(
      "猫野的站内分享\n标题：" + subTitle + "\n链接：" + url + "\n欢迎来访！🙂"
    );
    new Vue({
      data: function () {
        this.$notify({
          title: "成功复制分享信息🎉",
          message: "你现在可以通过粘贴直接跟小伙伴分享了！",
          position: "top-left",
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000,
        });
        // return { visible: false }
      },
    });
  } catch (err) {
    console.error("复制失败！", err);
  }
  // new ClipboardJS(".share", { text: function () { return '标题：' + document.title + '\n链接：' + url } });
  // btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~")
}

// 防抖
function share() {
  debounce(share_, 300);
}
/***********************/



