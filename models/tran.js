'use strict';

var db = require('../config/db');

db.run(`CREATE TABLE IF NOT EXISTS trans (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date DATETIME,
          desc TEXT,
          debit REAL,
          credit REAL,
          memo TEXT
        )`);

exports.create = function(tran, cb) {
  db.run('INSERT INTO trans (id, date, desc, debit, credit, memo) VALUES (?, ?, ?, ?, ?, ?)', null, tran.date, tran.desc, tran.debit, tran.credit, tran.memo,
    (err) => {
      if(err) return cb(err);

      db.get(`SELECT * FROM trans
              WHERE ID = (SELECT MAX(ID) FROM trans);`, cb);
  });
};


exports.get = function(cb) {
  db.all('SELECT * FROM trans', cb);
};

exports.removeById = function(id, cb) {
  db.run('DELETE FROM trans WHERE ID = ?', id, cb);
}

exports.update = function(tran, cb) {
  db.run(`UPDATE trans SET date = '${tran.date}', desc = '${tran.desc}', debit = '${tran.debit}', credit = '${tran.credit}', memo = '${tran.memo}' WHERE id = '${tran.id}'`, function(err, tran) {
    cb(err, tran);
  });
};
