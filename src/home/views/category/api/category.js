const { server } = require('../../../../config/server');
const url = '/categories';
const acesstoken = '/validate-internal-login';
const availableCategories = '/categoryForms';

function getCategories(callback) {
  server
    .get(`${url}`)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
}

/** To only show available categories */

export const availableCategory = (callback) => {
  server
    .get(`${availableCategories}`)
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};

function getDataByCategoryId(id, callback) {
  server
    .get(`${url}/${id}`)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
}

export const accessToken = (token, id, callback) => {
  server
    .post(`${acesstoken}`, { token, id })
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      console.log(err, "ERROR")
      callback(err);
    });
};
export { getCategories, getDataByCategoryId };
