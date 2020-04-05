const express = require('express');
const router = express.Router();
const producto = require('../controllers/producto');
const comanda = require('../controllers/comanda');

router.get('/producto', producto.listar);
router.post('/add_prod', producto.save);
router.get('/delete_prod/:id_prod', producto.delete);
router.post('/update_prod/:id_prod', producto.update);

router.get('/', comanda.listar);
router.post('/add_comanda', comanda.save);


function getYYYYMMDD(date) {
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
    if (mm < 10) mm = '0' + mm
    var dd = date.getDate()
    if (dd < 10) dd = '0' + dd
    return yyyy + '-' + mm + '-' + dd
}
router.get('/comandas', (req, res) => {
    //fecha de hoy
    var f01 = new Date();
    f01.setHours(23)
    f01.setMinutes(59)
    f01.setSeconds(50)
    f01.setMilliseconds(999)
    //fecha de inicio de mes
    var f02 = new Date(f01);
    // f02.setDate(1)
    f02.setHours(0)
    f02.setMinutes(0)
    f02.setSeconds(0)
    f02.setMilliseconds(0)

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tcoma_prod WHERE fecha BETWEEN ? AND ?', [f02, f01], (err, comandas) => {
            res.render('comandas', {
                f1: getYYYYMMDD(f02),
                f2: getYYYYMMDD(f01),
                comandas: comandas,
            });
        });
    });
});
router.post('/comandas', (req, res) => {
    if (req.body.f1 > req.body.f2) {
        res.redirect('/comandas')
    } else {
        //fecha de fin   
        var f01 = req.body.f2 + ' 23:59:59';
        //fecha de inicio
        var f02 = req.body.f1 + ' 00:00:00';

        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM tcoma_prod WHERE fecha BETWEEN ? AND ?', [f02, f01], (err, comandas) => {
                res.render('comandas', {
                    f1: req.body.f1,
                    f2: req.body.f2,
                    comandas: comandas,
                });
            });
        });
    }
});

router.post('/del_comanda', (req, res) => {
    console.log(req.body.id_coma)
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM tcoma_prod WHERE id_coma = ?', [req.body.id_coma], (err1, result) => {
            res.redirect('/comandas');
        })
    })
});

module.exports = router;