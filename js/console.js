var now1 = new Date();

function createtime1() {
  var grt = new Date("11/28/2023 00:00:00"); //此处修改你的建站时间或者网站上线时间
  now1.setTime(now1.getTime() + 250);
  var days = (now1 - grt) / 1000 / 60 / 60 / 24;
  var dnum = Math.floor(days);

  var ascll = [
    `欢迎来到猫野的小世界😀`,
    `                                                                                                  
                                                                                                  
   mmmmmmm    mmmmmmm     aaaaaaaaaaaaa     ooooooooooo yyyyyyy           yyyyyyy eeeeeeeeeeee    
 mm:::::::m  m:::::::mm   a::::::::::::a  oo:::::::::::ooy:::::y         y:::::yee::::::::::::ee  
m::::::::::mm::::::::::m  aaaaaaaaa:::::ao:::::::::::::::oy:::::y       y:::::ye::::::eeeee:::::ee
m::::::::::::::::::::::m           a::::ao:::::ooooo:::::o y:::::y     y:::::ye::::::e     e:::::e
m:::::mmm::::::mmm:::::m    aaaaaaa:::::ao::::o     o::::o  y:::::y   y:::::y e:::::::eeeee::::::e
m::::m   m::::m   m::::m  aa::::::::::::ao::::o     o::::o   y:::::y y:::::y  e:::::::::::::::::e 
m::::m   m::::m   m::::m a::::aaaa::::::ao::::o     o::::o    y:::::y:::::y   e::::::eeeeeeeeeee  
m::::m   m::::m   m::::ma::::a    a:::::ao::::o     o::::o     y:::::::::y    e:::::::e           
m::::m   m::::m   m::::ma::::a    a:::::ao:::::ooooo:::::o      y:::::::y     e::::::::e          
m::::m   m::::m   m::::ma:::::aaaa::::::ao:::::::::::::::o       y:::::y       e::::::::eeeeeeee  
m::::m   m::::m   m::::m a::::::::::aa:::aoo:::::::::::oo       y:::::y         ee:::::::::::::e  
mmmmmm   mmmmmm   mmmmmm  aaaaaaaaaa  aaaa  ooooooooooo        y:::::y            eeeeeeeeeeeeee  
                                                              y:::::y                             
                                                             y:::::y                              
                                                            y:::::y                               
                                                           y:::::y                                
                                                          yyyyyyy                                 
                                                                                                  
`,
    "小站已经苟活",
    dnum,
    "天啦!",
    "©2023 By 猫野",
  ];

  setTimeout(
    console.log.bind(
      console,
      `\n%c${ascll[0]} %c ${ascll[1]} %c ${ascll[2]} %c${ascll[3]}%c ${ascll[4]}%c ${ascll[5]}\n\n\n`,
      "color:#39c5bb",
      "",
      "color:#39c5bb",
      "color:#39c5bb",
      "",
      "color:#39c5bb",
    )
  );
}

createtime1();

function createtime2() {
  var ascll2 = [
    `正在调用前置摄像头~📷`,
    `正在对比人脸库~🧐`,
    `识别为「大聪明」👇`,
    ` 🤪 `,
  ];
  setTimeout(
    console.log.bind(
      console,
      `%c${ascll2[0]} %c\n${ascll2[1]} %c\n${ascll2[2]} %c\n${ascll2[3]}`,
      "color:white; background-color:#10bcc0",
      "",
      "",
      "color:white; font-size:450%"
    )
  );

  setTimeout(
    console.log.bind(
      console,
      "%c WELCOME %c 欢迎光临，大聪明",
      "color:white; background-color:#23c682",
      ""
    )
  );

  setTimeout(
    console.log.bind(
      console,
      "%c maoye %c 系统监测到你已打开控制台",
      "color:white; background-color:#4f90d9",
      ""
    )
  );
  setTimeout(
    console.warn.bind(
      console,
      "%c maoye %c 你现在正处于监控中",
      "color:white; background-color:#d9534f",
      ""
    )
  );
}
createtime2();

// 重写console方法
// console.log = function () {};
// console.error = function () {};
// console.warn = function () {};
