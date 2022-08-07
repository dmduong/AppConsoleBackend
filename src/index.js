const path = require('path'); // thêm path để cấu hình đường dẫn thư mục.
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const db = require('./config/db/index');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const headerAllows = require('./app/middlewares/HeaderAllows');
const cookieParser = require('cookie-parser');

const helper = require('./helpers/handlebars');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

//Kết nối với database
db.connect();
const app = express();
const port = 8000;
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}


app.use(cors(corsOptions));
//nhận routes từ file cấu hình route
const route = require('./routes/index.js');

//chỉnh đường dẫn static
app.use(express.static('public'))
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//Add middleware to pages
app.use(SortMiddleware);
app.use(headerAllows);
//midlewere để xử lý lấy dữ liệu post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Http loger
app.use(morgan('combined'));

//handleBars engine
app.engine('.hbs', exphbs.engine({
    extname: '.hbs', // Thay đổi đuôi file views handlebars thành hbs.
    helpers: helper
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


//khởi tạo route cho ứng dụng
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port} - http://127.0.0.1:8000`)
})