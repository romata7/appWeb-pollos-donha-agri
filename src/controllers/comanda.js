const comanda = {};

comanda.listar = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tproducto', [], (err, prods) => {
            conn.query('SELECT * FROM tcoma_prod', [], (err2, comandas) => {
                res.render('inicio', {
                    prods: prods,
                    comandas: comandas,
                });
            });
        });
    });
};
comanda.save = (req, res) => {
    const data_comanda = JSON.parse(req.body.comanda);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO tcomanda set ?', [data_comanda], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                conn.query('SELECT * FROM tcomanda WHERE id_coma = ?', [results.insertId], (err, comandas) => {
                    if (err) {
                        console.log(err);
                    } else {
                        var comanda = comandas[0];
                        const detalles = JSON.parse(req.body.detalle);
                        for (var i = 0; i < detalles.length; i++) {
                            var data_coma_prod = {
                                id_coma: comanda.id_coma,
                                suma: comanda.suma,
                                fecha: comanda.fecha,
                                comensal: comanda.comensal,
                                id_prod: detalles[i].id_prod,
                                producto: detalles[i].producto,
                                costo: detalles[i].costo,
                                cant: detalles[i].cant,
                                total: detalles[i].total,
                            };
                            conn.query('INSERT INTO tcoma_prod SET ?', [data_coma_prod], (err, results) => {
                                if (err) throw err;
                            })
                        };
                        res.send('ok');
                    };
                });
            };
        });
    });
};

module.exports = comanda;