const fs = require('fs');

const db = __dirname + '/../data/urls.json';

/**
  Use text file to store array of url objects with short_url & original_url
**/


module.exports = {
  getUrls: (cb) => {
    fs.readFile(db, 'utf8', (err, data) => {
      if (err) console.log(err);
      // Reverse data array to display newest first in GUI
      const dataObject = JSON.parse(data).reverse();
      cb(dataObject);
    });
  },
  getUrl: (index, cb) => {
    fs.readFile(db, 'utf8', (err, data) => {
      if (err) return cb(err, null)
      let dataObject = JSON.parse(data);
      if (dataObject.length > 0) {
        let url = dataObject[index].original_url;
        return cb(err, url);
      }
      cb('We don\'t have a record of this short url', null);
    });
  },
  addUrl: (url, cb) => {
    fs.readFile(db, 'utf8', (err, data) => {
      if (err) console.log(err);
      let dataObject = JSON.parse(data);
      let index = dataObject.length;
      const urlObject = {
        original_url: url,
        short_url: `https://fnbg.glitch.me/${index}`
      };
      dataObject.push(urlObject);
      fs.writeFile(db, JSON.stringify(dataObject), err => {
        if (err) console.log(err);
        cb(urlObject);
      });
    });
  }
  
}
