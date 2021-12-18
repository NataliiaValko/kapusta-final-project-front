import PropTypes from 'prop-types';
import style from './Button.module.scss';
const Button = ({ name, type, onClick, disabled = false, variant, borderType }) => (
  <button
    className={[style.main__button, style[variant], style[borderType]].join(' ')}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {name}
  </button>
);

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  borderType: PropTypes.string,
};

export default Button;
