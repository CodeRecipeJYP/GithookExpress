'use strict';

const worker = {
  push: function () {
    console.log("im pushing");
  },
  pull: function () {
    console.log("im pulling");
  }
};

module.exports = worker;