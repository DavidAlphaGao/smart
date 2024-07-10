import {IconButton, Card, CardHeader, Typography, ButtonGroup, CardProps, CircularProgress} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Fragment, ReactNode, useEffect, useState} from 'react';
import Collapse from '@mui/material/Collapse';

function SmartCaollapseCard(props) {
  const {
    sx = [],
    title,
    subheader,
    isCollapsable = true,
    isCollaps = false,
    status = undefined,
    className = undefined,
    loading,
    ...other
  } = props;
  const [collaps, setCollaps] = useState(isCollaps);
  useEffect(() => {
    setCollaps(isCollaps)
  }, [isCollaps])

  function handleClick(e) {
      setCollaps(!collaps);
  }

  return (
      <Card variant='outlined'
            sx={[{
              width: '100%',
              border: '1px solid',
            },
              ...(Array.isArray(sx) ? sx : [sx])
            ]}
            {...other}>
        <CardHeader
            subheader={subheader} component='span'
            onClick={isCollapsable ? handleClick : undefined}
            sx={{
              alignItems: 'center',
              verticalAlign: 'center',
              borderBottom: '1px solid',
              borderColor: 'divider',
              borderRadius: '4px 4px 0 0',
              display: 'flex',
              justifyContent: 'space-between',
              minHeight: 48,
              ':hover': {cursor: isCollapsable ? 'pointer' : 'auto'},
            }}
            action={<Fragment>
              {status !== undefined &&
                  <div className={className}>{status}</div>}
              <ButtonGroup>
                {isCollapsable && <IconButton size="large" >
                  {!collaps ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </IconButton>}
              </ButtonGroup>
            </Fragment>}
            title={<Typography sx={{fontSize: 16}}>
              {title}
              {loading && <CircularProgress size={20} sx={{ml: 4}}/>}
        </Typography>}
        />
        {isCollapsable ? <Collapse in={!collaps} timeout="auto">
          {props.children}
        </Collapse> : props.children}
      </Card>
  );
}

export default SmartCaollapseCard;