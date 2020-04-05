const producto = {};
const ruta_prod = '/producto';

producto.listar = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from tproducto', [], (err, results) => {
            res.render('producto', {
                results: results,
            });
        });
    });
};
producto.save = (req, res) => {
    req.getConnection((err, conn) => {
        const {
            producto
        } = req.body;
        conn.query('SELECT producto FROM tproducto WHERE producto = ?', [producto], (err1, prods1) => {
            if (!err1 && prods1.length == 0) {
                const data = req.body;
                console.log(data);
                conn.query('INSERT INTO tproducto set ?', [data], () => {
                    res.redirect(ruta_prod);
                });
            } else {
                res.redirect(ruta_prod);
            };
        });
    });
};
producto.delete = (req, res) => {
    const {
        id_prod
    } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM tproducto WHERE id_prod = ?', [id_prod], () => {
            res.redirect(ruta_prod);
        });
    });
};
producto.update = (req, res) => {
    req.getConnection((err, conn) => {
        const {
            id_prod
        } = req.params;
        const {
            producto
        } = req.body;
        conn.query('SELECT * FROM tproducto WHERE id_prod = ? AND producto = ?', [id_prod, producto], (err1, prods1) => {
            //Mismo nombre de producto, distinto precio
            const data = req.body;
            if (!err1 && prods1.length == 1) {
                conn.query('UPDATE tproducto set ? WHERE id_prod = ?', [data, id_prod], () => {
                    res.redirect(ruta_prod);
                });
            } else {
                //distinto nombre, pero no debe existir el nombre
                conn.query('SELECT producto FROM tproducto WHERE producto = ?', [producto], (err2, prods2) => {
                    if (!err2 && prods2 == 0) {
                        conn.query('UPDATE tproducto set ? WHERE id_prod = ?', [data, id_prod], () => {
                            res.redirect(ruta_prod);
                        });
                    } else res.redirect(ruta_prod);
                });
            }
        });
    });
};

module.exports = producto;