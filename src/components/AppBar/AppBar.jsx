import UserMenu from 'components/UserMenu';
import Container from 'components/Container';
import { Link } from 'react-router-dom';
import Snowflakes from 'magic-snowflakes';
import i18n from '../../i18next';
import { useSelector } from 'react-redux';
import style from './AppBar.module.scss';
import usaIcon from '../../images/united-states.svg';
import russiaIcon from '../../images/Russia.svg';

const AppBar = () => {
  const snowflakes = new Snowflakes({ height: 40, speed: 0.1, count: 16 });

  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  const accessToken = useSelector(state => state.auth.accessToken);
  snowflakes.start();
  return (
    <>
      <header className={style.header}>
        <Container>
          <div className={style.header__wrapper}>
            <Link to="/developers">
              <div className={style.logo}></div>
            </Link>
            <div>
              <button className={style.localization_icon} onClick={() => changeLanguage('en')}>
                <img src={usaIcon} alt="" width={20} />
              </button>
              <button className={style.localization_icon} onClick={() => changeLanguage('ru')}>
                <img src={russiaIcon} alt="" width={20} />
              </button>
            </div>
            {accessToken && <UserMenu />}
          </div>
        </Container>
      </header>
    </>
  );
};

export default AppBar;
