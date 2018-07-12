var channel = 0;
module.exports = function (express, sqlConn) {
    var route = express.Router();
    route.get('/', (req, res) => {
        // res.render('/pages/login', { baseDir : './pug/' });
        if (channel == 0) {
            res.redirect('/login');
        }
        else {
            res.render('pages/index', { basedir: './views_file/' });
        }
    });

    route.get('/login', (req, res) => {
        // res.render('/pages/login', { baseDir : './pug/' });
        res.render('pages/login', { basedir: './views_file/' });
    });

    route.get('/index/:id', (req, res) => {
        // res.render('/pages/login', { baseDir : './pug/' });
        var channel = req.params.id;
        res.render('pages/index', { basedir: './views_file/' });
    });

    route.post('/:id', function (req, res) {
        var responseData = {};
        var query = 'SELECT * FORM `dust_data_table` WHERE `channel`=?';
        var params = [res.query.id];
        var query = sqlConn.query(query, params, (err, rows) => {
            responseData.score = [];
            if (err) throw err;
            if (rows[0]) {
                responseData.result = "ok";
                rows.forEach(function (val) {
                    responseData.score.push(val.score);
                });
            }
            else {
                responseData.result = "none";
                responseData.score = "";
            }
            sres.json(responseData);
        });
    });

    route.post('/data', (req, res) => {
        var channel = req.body.channel;
        var density = req.body.density;
        var time = new Date().getTime() / 1000;
        var query = "INSERT INTO `dust_data_table`(`channel`, `density`, `time`) VALUES(?, ?)";
        var params = [temperature, time];
        sqlConn.query(query, params, (err, row, fields) => {
            if (err) {
                res.status(500).json({ 'msg': 'Internal server error' });
            }
            else {
                res.status(200).json({ 'msg': 'Data registered successfully' });
            }
        });
    });
    return route;
}