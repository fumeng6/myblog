// get请求位置及天气信息
$.ajax({
  type: "get",
  url: "https://apis.map.qq.com/ws/location/v1/ip",
  data: {
    key: "Z5QBZ-J4WCJ-2Q6FG-XQR25-IXXP7-VAFTJ",
    output: "jsonp",
  },
  dataType: "jsonp",
  success: function (res) {
    // 位置获取成功则继续获取对应天气
    if (res && res.result && res.result.location) {
      // console.log(res); //控制台调试输出
      ipLoacation = res;

      // 逆地址解析
      $.ajax({
        type: "get",
        url: "https://apis.map.qq.com/ws/geocoder/v1/?location=",
        data: {
          key: "Z5QBZ-J4WCJ-2Q6FG-XQR25-IXXP7-VAFTJ",
          location: `${ipLoacation.result.location.lat},${ipLoacation.result.location.lng}`,
          get_poi: 1,
          output: "jsonp",
        },
        dataType: "jsonp",
        success: function (data) {
          if (data.status === 0) {
            // 处理返回的地址信息
            // console.log(data.result);
            address = data.result;
            $.ajax({
              type: "get",
              url: "https://devapi.qweather.com/v7/grid-weather/now", // 切换为城市实时天气"https://devapi.qweather.com/v7/weather/now"
              data: {
                key: "083ad2370e6c41e0b24fbf8dd4d455bb",
                location:
                  res.result.location.lng + "," + res.result.location.lat,
              },
              success: function (res2) {
                if (res2.code === "200") {
                  // console.log(res2); //控制台调试输出
                  ipWeather = res2;
                  // 当成功取位置及天气信息，输出对应问候语
                  WelcomeInfo();
                  // updateWeatherInfo(weatherInfo);
                }
              },
              error: function (error) {
                console.error("获取天气信息失败:", error);
              },
            });
          } else {
            console.error("获取地址信息失败:", data.message);
          }
        },
        error: function (error) {
          console.error("请求失败:", error);
        },
      });
    }
  },
  error: function (error) {
    console.error("获取位置信息失败:", error);
  },
});

function WelcomeInfo() {
  let dist = getDistance(
    104.10194,
    30.65984,
    ipLoacation.result.location.lng,
    ipLoacation.result.location.lat
  );
  // 位置信息
  let pos;
  if (address.address_component.district != "") {
    pos = address.address_component.district;
  } else if (address.address_component.city != "") {
    pos = address.address_component.city;
  } else if (address.address_component.province != "") {
    pos = address.address_component.province;
  }
  let ip = ipLoacation.result.ip;
  // 天气信息
  let weather = ipWeather.now.text;
  let temp = ipWeather.now.temp;
  //   天气问候语
  let weather_greeting = getWeathergreeting(weather);
  //   温度问候语
  // 添加体感温度的问候
  let temp_greeting;
  if (temp <= 10) {
    temp_greeting = `气温只有${temp}°C，记得添衣保暖哦~`;
  } else if (temp >= 30) {
    temp_greeting = `气温高达${temp}°C，记得多补充水分，尽量待在阴凉处~`;
  } else {
    temp_greeting = "";
  }
  //   时间问候语
  let time_greeting = getTimeChange();
  // 距离问候语
  // 添加与距离相关的问候
  if (dist > 5000) {
    dist_greeting = ` 虽然我们相隔<span style="color:var(--theme-color)">${dist}</span>公里，但我们的心可以跨越山海，共赏这宽广的世界。`;
  } else if (dist > 1000 && dist <= 5000) {
    dist_greeting = ` 我们远隔<span style="color:var(--theme-color)">${dist}</span>公里，就像星星与星星之间的距离，遥远却互相照耀。`;
  } else if (dist > 500 && dist <= 1000) {
    dist_greeting = ` 我们之间的距离是<span style="color:var(--theme-color)">${dist}</span>公里，就像一段美丽的旅程，期待有一天相遇。`;
  } else if (dist > 100 && dist <= 500) {
    dist_greeting = ` 我们只有<span style="color:var(--theme-color)">${dist}</span>公里的距离，好像隔着一座小山，期盼有朝一日能相见。`;
  } else if (dist <= 100) {
    // 生成一个随机索引
    // let randomIndex = Math.floor(Math.random() * address.pois.length);
    // // 使用这个索引来获取一个随机的POI
    // let randomPoi = address.pois[randomIndex].title;
    dist_greeting = ` 我们近在咫尺，只隔了<span style="color:var(--theme-color)">${dist}</span>公里，没准哪天就在<span style="color:var(--theme-color)">${pos} </span>偶遇了。`;
  }

  let welcomeInfo = `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;${time_greeting}，现在 <span style="color:var(--theme-color)">${pos}</span> 的天气是 <span style="color:var(--theme-color)">${weather}</span>，气温 <span style="color:var(--theme-color)">${temp}°C</span>，${weather_greeting}${temp_greeting}<br>&emsp;&emsp;${dist_greeting}<center><span id="toggleIp" style="color:var(--theme-color);">点击查看IP</span><br><span id="ipAddress" style="color:var(--theme-color); display: none;">${ip}</span></center></b>`;
  document.getElementById("welcome-info").innerHTML = welcomeInfo;
  document.getElementById("toggleIp").addEventListener("click", function () {
    var ipElement = document.getElementById("ipAddress");
    ipElement.style.display =
      ipElement.style.display === "none" ? "inline" : "none";
    this.textContent =
      ipElement.style.display === "none" ? "点击查看IP" : "点击隐藏IP";
  });
}
// <center>当前的IP地址<br><span style="color:var(--theme-color)">${ip}</span></center>
function getDistance(e1, n1, e2, n2) {
  const R = 6371; // 地球半径，单位为公里
  const rad = Math.PI / 180;
  const lat1 = n1 * rad;
  const lat2 = n2 * rad;
  const sinLat = Math.sin(((n2 - n1) * rad) / 2);
  const sinLng = Math.sin(((e2 - e1) * rad) / 2);
  const a = sinLat * sinLat + sinLng * sinLng * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c); // 返回距离（四舍五入到最接近的公里）
}

function getTimeChange() {
  let date = new Date();
  let hour = date.getHours();

  if (hour >= 5 && hour < 11) {
    return "<span style='color:var(--theme-color)'>上午好</span>";
  } else if (hour >= 11 && hour < 13) {
    return "<span style='color:var(--theme-color)'>中午好</span>";
  } else if (hour >= 13 && hour < 18) {
    return "<span style='color:var(--theme-color)'>下午好</span>";
  } else if (hour >= 18 && hour < 24) {
    return "<span style='color:var(--theme-color)'>晚上好</span>";
  } else {
    return "<span style='color:var(--theme-color)'>夜深了，早点休息，少熬夜。</span>";
  }
}

function getWeathergreeting(weather) {
  switch (weather) {
    case "晴":
      greeting = `天空清晰，阳光充足。无论我们相隔多远，都在同一片蓝天下。`;
      break;
    case "多云":
      greeting = `云朵点缀着天空，但阳光依然灿烂。`;
      break;
    case "阴":
      greeting = `虽然没有阳光，但愿你的心情依旧明媚。`;
      break;
    case "阵雨":
      greeting = `只是一会儿，很快雨云就会飘走啦。`;
      break;
    case "小雨":
      greeting = `小小雨滴，淋湿了也会感冒的，记得带伞哦。`;
      break;
    case "雷阵雨":
      greeting = `雷声中也藏着自然的力量，希望它不会打扰到你。`;
      break;
    case "雷阵雨并伴有冰雹":
      greeting = `伴随着雷声和冰雹的是大自然的壮观，但也请注意安全。`;
      break;
    case "雨夹雪":
      greeting = `雨和雪的交融，像是冬日里的一个小奇迹。`;
      break;
    case "中雨":
      greeting = `雨势适中，但也别忘了保持干燥。`;
      break;
    case "大雨":
      greeting = `雨势有点大，出门记得带伞呐。`;
      break;
    case "暴雨":
      greeting = `雨势很大，请尽量待在室内，保持温暖和安全。`;
      break;
    case "大暴雨":
      greeting = `雨势非常大，今天就呆在家里吧。`;
      break;
    case "特大暴雨":
      greeting = `面对如此强降雨，请务必保持警惕，注意安全。`;
      break;
    // 补全的部分
    case "雾":
      greeting = `雾气蒙蒙，视线不清。出行请小心。`;
      break;
    case "霾":
      greeting = `空气质量不佳，尽量减少户外活动。`;
      break;
    case "沙尘暴":
      greeting = `沙尘肆虐，外出请戴好口罩保护自己。`;
      break;
    case "大风":
      greeting = `风力强劲，请注意安全，避免户外活动。`;
      break;
    case "热":
      greeting = `天气炎热，记得多补充水分，防止中暑。`;
      break;
    case "寒冷":
      greeting = `气温低迷，保暖很重要，注意添加衣物。`;
      break;
    // 默认情况
    default:
      greeting = `无论天气如何，都希望你有个美好的一天。`;
  }
  return greeting;
}

// 如果使用了pjax在加上下面这行代码
document.addEventListener("pjax:complete", WelcomeInfo);
