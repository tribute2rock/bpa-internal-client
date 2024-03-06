const { server } = require('../../../../config/server');
const url = '/form';
const url2 = '/forms';
const searchUrl = '/searchForms';
const branches = '/mock-branches';

export const getForms = (callback) => {
  server
    .get(`${url}`)
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};

export const getFormById = (id, callback) => {
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
};

export const getFormsByCatId = (id, callback) => {
  server
    .get(`${url2}/${id}`)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
};

export const getSearch = (data, callback) => {
  const { query, categoryId } = data;
  server
    .get(`${url2}/${categoryId}/search`, {
      params: {
        query,
      },
    })
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => callback(err));
};

export const getBranchLists = (callback) => {
  server
    .get(`${branches}`)
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};

export const getDbBranch = (callback) => {
  server
    .get(`/dbBranches`)
    .then((res) => {
      callback(null, res.data);
    })
    .catch((err) => {
      callback(err);
    });
};
// export const getSearch = (data, callback) => {
//   server
//     .get(`${searchUrl}/${data}`)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       return err;
//     });
// };
