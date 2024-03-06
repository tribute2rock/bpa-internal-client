import { useState } from 'react';
import { Modal, Button, Group, Loader, LoadingOverlay } from '@mantine/core';
import Input from '../components/Input';
import { server } from '../config/server';
import { toast } from 'react-toastify';

export function NewUser({ newUser, setNewUser }) {
  const [opened, setOpened] = useState(false);
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'pin':
        setPin(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.warn('Password do not matched.');
    setLoading((prev) => true);
    server
      .post('/reset-password', { email, password, confirmPassword, pin })
      .then((res) => {
        toast.success('Reset Successful');
        setOpened(false);
      })
      .catch((err) => {
        if (err.response.data.status === 'Failed') {
          const errorMessage = err?.response?.data?.message;
          // send toast message or validation
          if (errorMessage) {
            toast.error(errorMessage);
            setErrors(err?.response?.data?.data?.errors);
          }
        } else {
          toast.error('Failed to submit. Please contact your administator');
        }
      })
      .finally((_) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        opened={opened}
        transition="fade"
        size="45%"
        transitionDuration={600}
        transitionTimingFunction="ease"
        onClose={() => setOpened(false)}
        title="Register New User"
      >
        <form onChange={handleChange} onSubmit={onSubmit}>
          <LoadingOverlay visible={loading} />

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
              errors={errors}
            />
            <Input
              value={pin}
              type="number"
              title="Pin"
              name="pin"
              className="form-control"
              placeholder="Pin"
              required
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
              placeholder="Password"
              errors={errors}
            />
            <Input
              type="password"
              required
              id="confirmPassword"
              title="Confirm Password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              errors={errors}
            />

            <div className="mt-30 text-right">
              {loading ? (
                <Loader variant="dots" />
              ) : (
                <button type="submit" className="btn btn-custom btn-block mt-4" disabled={!!loading}>
                  Proceed
                </button>
              )}
            </div>
          </>
        </form>
      </Modal>

      <a href="javascript:void(0)" className="new-user-btn" onClick={() => setOpened(true)}>
        New User ?
      </a>
    </>
  );
}
