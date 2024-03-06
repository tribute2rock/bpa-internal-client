import React, { useEffect, useState } from 'react';
import CustomerFooter from '../containers/Layout/CustomerFooter';
import CustomerNavbar from '../containers/Layout/CustomerNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../config/server';
import metaRoutes from '../home/meta_routes';
import { toast } from 'react-toastify';
import { login } from '../redux/user/userSlice';
import Input from '../components/Input';
import { Loader, LoadingOverlay, Switch } from '@mantine/core';
import { NewUser } from './new-user';
import { Helmet } from 'react-helmet';
import Recaptcha from 'react-recaptcha';

const LoginPage = (props) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [coorporateLogin, setCoorporateLogin] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [reCaptcha, setReCapcha] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    // getcaptcha();
    if (token.accessToken) {
      props.history.push('/');
    }
  }, [token]);

  const getcaptcha = () => {
    server
      .get('/captcha')
      .then((res) => {
        // console.log(res.data.captcha)
        // setReCapcha(res.data.captcha)
        // if (res.data.status === 'Success') {
        // }
      })
      .catch((err) => {
        toast.error('Please provide valid information');
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'mobileNumber':
        setMobileNumber(value);
        break;
      case 'accountNumber':
        setAccountNumber(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const postData = {
      accountNumber: accountNumber,
      mobileNumber: mobileNumber,
    };

    const cooperateUser = {
      email,
      password,
    };
    if (reCaptcha) {
      setLoading(true);
      server
        .post(coorporateLogin ? 'cooperate-login' : '/initiate-login', coorporateLogin ? cooperateUser : postData)
        .then((res) => {
          console.log(res.data.status);
          if (res.data.status === 'Success') {
            dispatch(login(postData));
            props.history.push(metaRoutes.otpPage);
          }
        })
        .catch((err) => {
          if (err.response.data.status === 'Failed') {
            toast.error(err?.response?.data?.message);
            setErrors(err?.response?.data?.data?.errors);
          } else toast.error('Please provide valid information');
        });
      setLoading(false);
    } else {
      setLoading(false);
      toast.error('capcha is not selected');
    }
  };

  const verifyCallback = (response) => {
    if (response) {
      setReCapcha(true);
    }
  };

  const recaptchaLoaded = () => {
    toast.warn('please select capcha before you proceed');
  };

  return (
    <>
      <CustomerNavbar {...props} />
      <div className="container content-section">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="custom-card mt-5">
              <div className="text-center mb-5">
                <h3 className="text-dark">Customer Login</h3>
                <span className="text-muted">Please enter your login credentials to proceed</span>
              </div>
              <form onSubmit={handleLogin} onChange={handleChange}>
                <LoadingOverlay visible={loading} />
                {coorporateLogin ? (
                  <>
                    <Input
                      value={email}
                      type="email"
                      title="Email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      disabled={!!loading}
                      errors={errors}
                    />
                    <Input
                      value={password}
                      type="password"
                      required
                      id="password"
                      title="Password"
                      name="password"
                      className="form-control"
                      placeholder="password"
                      errors={errors}
                      disabled={!!loading}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      value={accountNumber}
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      title="Account Number"
                      required
                      className="form-control"
                      placeholder="Account Number"
                      errors={errors}
                      disabled={!!loading}
                    />
                    <Input
                      value={mobileNumber}
                      type="number"
                      required
                      id="mobileNumber"
                      errors={errors}
                      name="mobileNumber"
                      title="Mobile Number"
                      className="form-control"
                      placeholder="Mobile Number"
                      disabled={!!loading}
                    />
                  </>
                )}
                <div className="d-flex justify-content-between align-items-middle">
                  <div className="d-flex">
                    <Switch
                      checked={coorporateLogin}
                      onChange={(event) => {
                        setCoorporateLogin(event.currentTarget.checked);
                      }}
                    />
                    <label className="ml-2 col-form-label">Corporate Login</label>
                  </div>
                  <NewUser newUser={newUser} setNewUser={setNewUser} />
                </div>
                <div className="mt-3">
                  {loading ? (
                    <Loader variant="dots" />
                  ) : (
                    <>
                      <div className="form-group">
                        <Recaptcha
                          sitekey="6Le-bysfAAAAANoI9ezIejdqUzVKCWdxEn2UiZgh"
                          render="explicit"
                          onloadCallback={recaptchaLoaded}
                          verifyCallback={verifyCallback}
                        />
                      </div>
                      <button className="btn btn-custom btn-block" disabled={!!loading}>
                        Proceed
                      </button>
                    </>
                  )}
                </div>
                {/* <hr />
                <div className="mt-30 text-right">
                  <button className="btn btn-custom btn-gradient" disabled={!!loading}>
                    PROCEED
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      <CustomerFooter />
    </>
  );
};

export default LoginPage;
