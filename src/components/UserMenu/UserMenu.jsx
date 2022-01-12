import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import { Link } from 'react-router-dom';
import SelectionModal from 'components/Modal/SelectionModal';
import LogoutIcon from '@mui/icons-material/Logout';
import Stack from '@mui/material/Stack';
import IconAvatar from 'components/IconAvatar';
import { COLORS } from '../../Constants';
import { useLogoutMutation } from 'redux/service/userAPI';
import { useGetDataUserQuery } from 'redux/service/userAPI';
import style from './UserMenu.module.scss';

import { useDispatch } from 'react-redux';
import { logOut } from 'redux/service/authSlice';

// LOCALISE
import { useTranslation } from 'react-i18next';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [open, setOpen] = useState(false);

  const { data, isSuccess } = useGetDataUserQuery();

  const fullName = (firstName, lastName) => {
    return firstName || lastName ? `${firstName} ${lastName}` : '';
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // LOCALISE
  const { t } = useTranslation();

  const refreshToken = useSelector(state => state.auth.refreshToken);

  console.log('refreshUser', refreshToken);
  const goToHomePage = () => {
    logout(refreshToken)
      .then(() => {
        dispatch(logOut());
      })
      .catch(error => console.log(error.message));
    handleClose();
    navigate('/');
  };

  const small = useMediaPredicate('(max-width: 767px)');
  const medium = useMediaPredicate('(min-width: 768px) and (max-width: 1279px)');
  const large = useMediaPredicate('(min-width: 1280px)');
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} color="#CBCCD0">
        <Link className={style.buttonProfile} type="button" to={'/profile'}>
          {isSuccess && (
            <IconAvatar
              src={data.data.user.avatar ? data.data.user.avatar : ''}
              width={32}
              height={32}
            />
          )}

          {small && (
            <LogoutIcon
              onClick={handleOpen}
              sx={{ fontSize: 18, color: COLORS.auxiliaryDark }}
              titleAccess={t('period.exit')}
            />
          )}
          {medium && (
            <>
              {isSuccess && (
                <>
                  {(fullName(data.data.user.fullName.firstName, data.data.user.fullName.lastName) ||
                    data.data.user.email) && (
                    <p className={style.user__name}>
                      {fullName(data.data.user.fullName.firstName, data.data.user.fullName.lastName)
                        ? fullName(
                            data.data.user.fullName.firstName,
                            data.data.user.fullName.lastName,
                          )
                        : data.data.user.email}
                    </p>
                  )}{' '}
                </>
              )}
              <span className={style.user__line}></span>{' '}
            </>
          )}
          {large && (
            <>
              {isSuccess && (
                <>
                  {(fullName(data.data.user.fullName.firstName, data.data.user.fullName.lastName) ||
                    data.data.user.email) && (
                    <p className={style.user__name}>
                      {fullName(data.data.user.fullName.firstName, data.data.user.fullName.lastName)
                        ? fullName(
                            data.data.user.fullName.firstName,
                            data.data.user.fullName.lastName,
                          )
                        : data.data.user.email}
                    </p>
                  )}
                </>
              )}

              <span className={style.user__line}></span>
            </>
          )}
        </Link>

        {medium && (
          <>
            <button className={style.user__button__logout} onClick={handleOpen}>
              {t('period.exit')}
            </button>
          </>
        )}
        {large && (
          <>
            <button className={style.user__button__logout} onClick={handleOpen}>
              {t('period.exit')}
            </button>
          </>
        )}

        {open && <SelectionModal open={open} handleClose={handleClose} onClick={goToHomePage} />}
      </Stack>
    </>
  );
};

export default UserMenu;
