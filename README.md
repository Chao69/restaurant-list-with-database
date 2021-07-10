# This project is my first use database to control back-end environment!
* 本次專案透過Mongodb及Robo 3T操作達到自行載入後端資料的效果，不再仰賴教案提供的.Json檔作為後端資料。
## 實作重點
- 了解如何透過Node.js環境匯入mongoose檔案，並且使用mongoose語法來控制後端資料CRUD主要功能。
- 透過mongoose及Schema的配合建立出基礎資料型態。
- 如後透過Node.js呼叫後端資料，並且達到預期的功能。
- 加強路由設定的概念，以及定義路由的方式。
- 反覆訓練在不同路由下做不同的功能。
## 主要功能
- 增加新增餐廳功能
- 更改了瀏覽一家餐廳的詳細資訊方式
- 新增了修改餐廳的資訊功能
- 新增了刪除餐廳功能
* 可與前一份restaurant-list專案做對比 https://github.com/Chao69/restaurant_list
## 編程環境
* Node.js v10.24.1
## 使用框架及套件
* express 4.17.1
* express-handlebars 5.3.2
* body-parser 1.19.0
* bootstrap 5.0.2
* jquery 3.6.0.min
* popper 2.9.2
## 安裝方法
- 開啟終端機(terminal)，點擊Code，將HTTPS的URL Clone至本機電腦
- 透過終端機(terminal)進入專案資料夾
- 安裝npm套件 (nodemon套件可裝可不裝)
- 在終端機輸入 $ npm run dev
- 將終端機(terminal)顯示的 http://localhost:3000 複製到瀏覽器即可體驗