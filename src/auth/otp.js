import React, { useState, useEffect } from 'react';
import CustomerFooter from '../containers/Layout/CustomerFooter';
import CustomerNavbar from '../containers/Layout/CustomerNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../config/server';
import { Redirect } from 'react-router-dom';
import { addToken, adduserInfo } from '../redux/user/userSlice';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import toastConst from '../constants/toast';

const OTPPage = (props) => {
  const [otp, setOtp] = useState('please wait opt is loading.');
  const [otpCode, setOtpCode] = useState();
  const [loading, setLoading] = useState(false);
  const loginInfo = useSelector((state) => state.user.loginInfo);
  const redirectUrl = useSelector((state) => state.user.redirectUrl);
  const dispatch = useDispatch();

  useEffect(() => {
    sendOTP();
    // getTokenChannelManager();
  }, []);

  const sendOTP = async () => {
    const res = await server.post('/send-otp', {
      accountNumber: loginInfo.accountNumber,
      mobileNumber: loginInfo.mobileNumber,
    });
    if (res.data.status == 'Success') {
      if (res.data.data) {
        setOtpCode(res.data.data ? res.data.data : 'please try after few minutes');
      }
    }
  };

  // const getTokenChannelManager = async () => {
  //   const res = await server.get('/channel-manager/auth-token');
  //   if (res.data.msg === 'success') {
  //     console.log('get channel manager token success');
  //   }
  // };

  const handleChange = (e) => {
    const value = e.target.value;
    setOtp(value);
  };
  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await server.post('/login', {
        accountNumber: loginInfo.accountNumber,
        otp,
      });
      if (res.data.status === 'Success') {
        let userData = jwt_decode(res.data.data.accessToken); //TODO: Is it okay to decode token here??
        dispatch(adduserInfo(userData));
        dispatch(addToken(res.data.data));
        setTimeout(() => {
          props.history.push(redirectUrl);
        }, 20);
      }
      setLoading(false);
    } catch (err) {
      if (err.response.data.status === 'Failed') {
        toast.error(err.response.data.message, toastConst.error);
      }
      setLoading(false);
    }
  };

  if (!loginInfo) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <CustomerNavbar {...props} />
      <div className="container content-section">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="custom-card mt-5">
              <div className="text-center mb-5">
                <h3 className="text-dark">OTP Verification</h3>
                <span className="text-muted">Please provide OTP sent to your registered mobile number.</span>
              </div>
              <div className="form-group">
                <label for="otp">OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  className="form-control"
                  placeholder="One Time Password"
                  onChange={handleChange}
                  disabled={!!loading}
                />
              </div>
              <h3>
                OTP:<u style={{ color: 'red' }}>{otpCode}</u>
              </h3>
              <hr />
              <div className="mt-30">
                <button className="btn btn-custom btn-block" onClick={handleVerify} disabled={!!loading}>
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </>
  );
};

export default OTPPage;
