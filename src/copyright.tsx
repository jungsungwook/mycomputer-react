import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MuiLink color="inherit" href="https://naver.com/">
        MyComputer
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default Copyright;