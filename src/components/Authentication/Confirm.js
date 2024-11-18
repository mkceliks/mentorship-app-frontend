import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import Stack from '@mui/material/Stack';
import { handleConfirm } from './handlers/handleConfirm';
import { handleResend } from './handlers/handleResend';

const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const CodeInput = styled(TextField)(({ theme }) => ({
  width: '60px',
  height: '60px',
  '& .MuiInputBase-input': {
    textAlign: 'center',
    fontSize: '2rem',
    padding: theme.spacing(1),
  },
}));

const ConfirmContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Confirm(props) {
  const [code, setCode] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || localStorage.getItem('emailToConfirm') || '';

  useEffect(() => {
    if (!email) {
      navigate('/sign-up');
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleConfirmClick = async () => {
    if (code.some((digit) => !digit)) {
      setError('Please enter all 6 digits.');
      return;
    }

    const enteredCode = code.join('');
    setIsLoading(true);
    setError('');

    try {
      await handleConfirm(email, enteredCode);
      localStorage.removeItem('emailToConfirm');
      setIsConfirmed(true);
      setTimeout(() => navigate('/sign-in'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError('');
    try {
      await handleResend(email);
      alert('Verification code has been resent!');
    } catch (err) {
      setError(err.message || 'Failed to resend the code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />

      <ConfirmContainer direction="column" justifyContent="center" alignItems="center">
        <Card variant="outlined">
          {isConfirmed ? (
            <>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  width: '100%',
                  fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                ✅ Email Confirmed!
              </Typography>
              <Typography sx={{ textAlign: 'center', color: 'white' }}>
                Redirecting to login...
              </Typography>
            </>
          ) : (
            <>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  width: '100%',
                  fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                Confirm Your Email
              </Typography>
              <Typography sx={{ textAlign: 'center', mb: 2, color: 'white' }}>
                Please enter the 6-digit code sent to your email.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
                {code.map((digit, index) => (
                  <CodeInput
                    key={index}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    inputRef={(el) => (inputs.current[index] = el)}
                    inputProps={{ maxLength: 1 }}
                    variant="outlined"
                  />
                ))}
              </Box>
              {error && (
                <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleConfirmClick}
                fullWidth
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                {isLoading ? 'Confirming...' : 'Confirm'}
              </Button>
              <Link
                component="button"
                variant="body2"
                onClick={handleResendCode}
                sx={{ mt: 2, textAlign: 'center' }}
                disabled={isResending} // Disable link during resend
              >
                {isResending ? 'Resending...' : 'Resend Code'}
              </Link>
            </>
          )}
        </Card>
      </ConfirmContainer>
    </AppTheme>
  );
}
