import PropTypes from 'prop-types';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import COLORS from 'Constants/COLORS';

const useStyles = makeStyles(theme => ({
  field: {
    '& .MuiInputLabel-root': {
      fontSize: 12,
      lineHeight: 1.16,
      letterSpacing: '0.02em',
      color: '#c7ccdc',
    },

    '& .MuiOutlinedInput-input': {
      minHeight: 44,
      fontSize: 12,
      color: COLORS.primary,
      fontWeight: 700,
      padding: '0 0 0 20px',
    },

    '& .MuiFormHelperText-root ': {
      fontSize: 10,
      lineHeight: 1.16,
      letterSpacing: '0.02em',
      color: '#c7ccdc',
      textAlign: 'center',
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #F5F6FB',
    },

    '& .css-orzrz6-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
      {
        borderColor: COLORS.mainAccent,
      },
  },

  dateField: {
    '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root': {
      width: 130,
    },

    '& .MuiOutlinedInput-root': {
      borderRadius: '16px 0px 0px 0px',
    },

    '& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root:hover': {
      backgroundColor: 'transparent',
    },

    '& .MuiButtonBase-root': {
      paddingLeft: 0,
    },

    '& .MuiSvgIcon-root': {
      width: 20,
      hight: 20,
    },

    '& .css-axso3v-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
      {
        borderColor: COLORS.mainAccent,
      },

    '& .MuiOutlinedInput-input': {
      paddingLeft: 15,
    },
  },
}));

export const DateInput = ({ getCurrentDate, initialDate, getDate }) => {
  const [date, setDate] = useState(initialDate);

  getDate(format(date, 'yyyy-MM-dd'));

  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack className={classes.dateField}>
        <DatePicker
          mask="__.__.____"
          inputFormat="dd.MM.yyyy"
          openTo="year"
          value={date}
          onChange={newValue => {
            setDate(newValue);
            getCurrentDate(newValue);
          }}
          renderInput={params => <TextField color="info" className={classes.field} {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

DateInput.propTypes = {
  getDate: PropTypes.func.isRequired,
  getCurrentDate: PropTypes.func.isRequired,
  initialDate: PropTypes.object.isRequired,
};
