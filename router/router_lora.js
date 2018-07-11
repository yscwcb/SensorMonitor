module.exports = function(express, sqlConn) {
    const route = express.Router();

    route.get('/', (req, res) => {
        // res.render('/pages/login', { baseDir : './pug/' });

        res.render('pages/login', { basedir : './views_file/' });
    });
    route.get('/register', (req, res) => {
        // res.render('/pages/login', { baseDir : './pug/' });
        res.render('pages/404', { basedir : './views_file/' });
    });

    route.post('/data', (req, res) => {
        var temperature = req.body.temperature;
        var time = new Date().getTime() / 1000;
        var query = "INSERT INTO `lora_table`(`temperature`, `time`) VALUES(?, ?)";
        var params = [temperature, time];
        sqlConn.query(query, params, (err, row, fields) => {
            if (err) {
                res.status(500).json({'msg' : 'Internal server error' });
            }
            else {
                res.status(200).json({'msg' : 'Data registered successfully' });
            }
        });
    });
    return route;
}