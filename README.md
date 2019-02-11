# react-native-mobx-init

#### 项目介绍
```
1.tab角标；

2.皮肤管理；

3.任意导航；

4.渐变导航栏

5.数据持久化；
 
 ```
 
 #### 项目初始化
 
 ```
 git clone
 
 yarn install
 
 run android
 
 cd ios
 
 pod install
 
  run ios
 ```
 **特别注意**   请尽量使用yarn代替npm操作
 
 **项目结构**
 
 ```
 ├── README.md                   // README
 ├── app                         // Ract Native
 │   ├── components              // Ract Native 通用组件
 │   ├── localize                // 本地化
 │   │    ├── strings            // 多语言
 │   │    └── theme              // 主题色 
 │   ├── navigator.config.js     // 导航配置
 │   ├── resource                // 资源目录（图片/动画/svg/html）
 │   ├── utils                   
 │   │    ├── api.js             // axios配置
 │   │    ├── global.js          // 全局变量存储
 │   │    └── index.js           // 入口          
 │   ├── views                   // 视图
 │   │    └── index.js           // 入口
 │   └── index.js                // Ract Native 入口页
 ├── ios                         // ios原生部分
 ├── index.js                    // 项目注册入口文件
 ├── android                     // android原生部分
 ├── node_modules                // 项目依赖包
 ├── __test__                    // 自动化测试
 ├── package.json                // 依赖
 └── .babelrc                    // 设置转码的规则,插件,文件地址映射
 ``` 
    
### 编程规范 
```
   使用standard代码规范组件
   webStorm配置: "cmd + ," > Language & FrameWork > JavaScript > Code Quality Tools > ESLint >  选中Enable > ESLint Packages 选中 node_modules/standard > OK 
   ```
   
