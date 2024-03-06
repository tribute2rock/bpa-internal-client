import React, { useEffect, useState } from 'react';
import { getRequests } from '../api/request';
import { toast } from 'react-toastify';
import { Request } from './request';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   returnPending,
//   returnProcessing,
//   returnReturned,
//   returnCompleted,
//   returnDrafts,
// } from "../../../../redux/notification/notificationSlice";
import status from '../constants';
import { getDrafts } from '../api/draftRequest';
import A from '../../../../config/url';
import metaRoutes from '../../../../config/meta_routes';
import { Link } from 'react-router-dom';
import toastConst from '../../../../constants/toast';
import { persistor } from 'redux-persist';

const Requests = (props) => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    filterStatus();
    fetchRequests();
  }, [props.status, total, page, pageSize]); 

  useEffect(() => {
    setPage(0); 
  }, [props.status]);

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const renderEllipsisButton = (pageIndex, label, onClickHandler) => (
    <li className="page-item" key={pageIndex}>
      <button className="page-link cursor-pointer" onClick={onClickHandler}>
        {label}
      </button>
    </li>
  );

  const notificationData = {
    1: useSelector((state) => state.notification?.data?.Pending),
    2: useSelector((state) => state.notification?.data?.Processing),
    3: useSelector((state) => state.notification?.data?.Returned),
    4: useSelector((state) => state.notification?.data?.Completed),
    5: useSelector((state) => state.notification?.data?.Closed),
    6: useSelector((state) => state.notification?.data?.Draft),
  };
  let value = notificationData[props.status] || 0;

  let length;

  if (value <= 100) {
    length = Math.max(1, Math.ceil(value / 10));
  } else {
    length = Math.ceil(value / 10);
  }

  let maxButtons;
  let midPoint;

  if (length <= 10) {
    maxButtons = length;
    midPoint = maxButtons;
  } else {
    maxButtons = 10;
    midPoint = Math.min(10, length - maxButtons + 1);
  }

  const startPage = Math.max(0, Math.min(page - midPoint + 1, length - maxButtons));
  const endPage = Math.min(length - 1, startPage + maxButtons - 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const filterStatus = (status) => {
    switch (status) {
      case 1:
        return {
          tags: (
            <span className="pending">
              <i class="fas fa-info-circle"></i>
            </span>
          ),
          class: 'content-item form-item',
        };
      case 2:
        return {
          tags: (
            <span className="pending">
              <i class="fas fa-info-circle"></i>
            </span>
          ),
          class: 'content-item form-item',
        };
      case 3:
        return {
          tags: (
            <span className="pending">
              <i class="fas fa-info-circle"></i>
            </span>
          ),
          class: 'content-item form-item',
        };
      case 4:
        return {
          tags: (
            <span className="completed">
              <i className="fa fa-check-circle" />
            </span>
          ),
          class: 'content-item form-item completed-status',
        };
      case 5:
        return {
          tags: (
            <>
              <span className="pending">
                <i className="fa fa-edit" />
              </span>
            </>
          ),
          class: 'content-item form-item',
        };
      default:
        return {
          class: '',
        };
    }
  };

  const fetchRequests = () => {
    let searchParams = {
      status: props.status,
    };
    if (Number(props.status) === status.drafts) {
      getDrafts(searchParams, (data, err) => {
        if (!err) {
          setRequests(data);
        } else {
          toast.error('No Any Requests.', toastConst.error);
        }
      });
    } else {
      getRequests(searchParams, page, pageSize, (data, err) => {
        if (!err) {
          setRequests(data?.request?.pageData);
        } else {
          toast.error('No Any Requests.', toastConst.error);
        }
      });
    }
  };
  const dispatch = useDispatch();

  /**
   *
   * @param {requests} requests
   * count number of requests
   * @returns total requests
   */

  function countRequest(requests) {
    return requests.length;
  }

  var total = countRequest(requests);
  // eslint-disable-next-line array-callback-return
  // if (total === 0) {
  //   if (props.status === 1) {
  //     dispatch(returnPending(null));
  //   }
  //   if (props.status === 2) {
  //     dispatch(returnProcessing(null));
  //   }
  //   if (props.status === 3) {
  //     dispatch(returnReturned(null));
  //   }
  //   if (props.status === 4) {
  //     dispatch(returnCompleted(null));
  //   }
  //   if (props.status === 5) {
  //     dispatch(returnDrafts(null));
  //   }
  // } else
  //   requests.map((req) => {
  //     if (req.statusId === 1) {
  //       dispatch(returnPending(total));
  //     }
  //     if (req.statusId === 2) {
  //       dispatch(returnProcessing(total));
  //     }
  //     if (req.statusId === 3) {
  //       dispatch(returnReturned(total));
  //     }
  //     if (req.statusId === 4) {
  //       dispatch(returnCompleted(total));
  //     }
  //     if (req.statusId === 5) {
  //       dispatch(returnDrafts(total));
  //     }
  //   });

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <div className="row">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Request Name</th>
              <th scope="col">Request ID</th>
              <th scope="col">Requested Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests && requests.length !== 0 ? (
              requests &&
              requests?.map((request, index) =>
                // <Request
                //   request={request}
                //   key={key}
                //   status={props.status}
                //   requestKey={key}
                // />

                props.status === status.returned ? (
                  // <Link
                  //   className="col-md-4"
                  //   to={{
                  //     pathname: metaRoutes.formEditVerify,
                  //     search: '?i=' + A.getHash(request.id),
                  //     status: props.status,
                  //     state: { formEditVerify: '?i=' + A.getHash(request.id) },
                  //   }}
                  // >
                  <>
                    <tr key={index}>
                      <th scope="row">{index + 1 + page * pageSize}</th>
                      <td>
                        {request.form
                          ? request.requestRepeat !== null
                            ? request.form.name + '-' + request.requestRepeat
                            : request.form.name
                          : null}
                      </td>
                      <td>
                        {filterStatus(status).tags}
                        <span>
                          Id : <b className="text-muted"> {request ? request.requestKey : null}</b>
                        </span>
                      </td>
                      <td>
                        {new Date(request.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td>
                        <Link
                          className="btn btn-sm btn-dark"
                          to={{
                            pathname: metaRoutes.RequestDetails,
                            search: '?i=' + A.getHash(request.id) + '&type=return',
                            status: props.status,
                            state: { RequestDetails: '?i=' + A.getHash(request.id) + '&type=return' },
                          }}
                        >
                          <i class="fas fa-eye"></i> Detail
                        </Link>
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr key={index}>
                      <th scope="row">{index + 1 + page * pageSize}</th>

                      <td>
                        {request.form
                          ? request.requestRepeat !== null
                            ? request.form.name + '-' + request.requestRepeat
                            : request.form.name
                          : null}
                      </td>
                      <td>
                        {filterStatus(status).tags}
                        {request && request.requestKey ? (
                          <>
                            <span>
                              Id : <b className="text-muted">{request.requestKey}</b>
                            </span>
                          </>
                        ) : null}
                      </td>
                      <td>
                        {new Date(request.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td>
                        <Link
                          className="btn btn-sm btn-dark"
                          to={{
                            pathname: metaRoutes.RequestDetails,
                            search: '?i=' + A.getHash(request.id) + '&&' + '?s=' + props.status,
                            status: props.status,
                            state: {
                              RequestDetails: '?i=' + A.getHash(request.id) + '?s=' + props.status,
                            },
                          }}
                        >
                          <i class="fas fa-eye"></i> Detail
                        </Link>
                      </td>
                    </tr>
                  </>
                )
              )
            ) : (
              <tr>
                <td colspan="5">
                  <div className="jumbotron w-100 p-3">
                    <p className="m-0 text-center">
                      <b>No Data Found</b>
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {value !== 0 && (
        <ul className="pagination pagination-md d-flex justify-content-end align-items-end">
          {page > 0 && (
            <>
              <li className="page-item">
                <button className="page-link cursor-pointer" onClick={() => handlePageChange(0, pageSize)}>
                  First
                </button>
              </li>
              {page > 10 && renderEllipsisButton('ellipsis-prev', '...', () => handlePageChange(page - 10, pageSize))}
            </>
          )}

          {pages.map((pageIndex) => (
            <li className="page-item" key={pageIndex}>
              <button
                style={{
                  backgroundColor: page === pageIndex ? '#3383FF' : pageIndex === midPoint ? '' : 'inherit',
                  color: page === pageIndex ? 'white' : 'inherit',
                }}
                className="page-link cursor-pointer"
                onClick={() => handlePageChange(pageIndex, pageSize)}
              >
                {pageIndex + 1}
              </button>
            </li>
          ))}

          {page < length - 1 && (
            <>
              {page + 10 < length &&
                renderEllipsisButton('ellipsis-next', '...', () => handlePageChange(page + 10, pageSize))}
              <li className="page-item">
                <button className="page-link cursor-pointer" onClick={() => handlePageChange(length - 1, pageSize)}>
                  Last
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default Requests;
