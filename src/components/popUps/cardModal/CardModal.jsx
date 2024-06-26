import css from './CardModal.module.scss';
import clsx from 'clsx';
import CloseModalButton from '../Board/CloseModalButton/CloseModalButton';
import {
  useClickOnBackdropToCloseModals,
  useEscapeKeyToCloseModals,
  useAuth,
} from '../../../hooks';

const CardModal = ({ func, name, children }) => {
  const { theme } = useAuth();

  useClickOnBackdropToCloseModals(func);
  useEscapeKeyToCloseModals(func);

  return (
    <div
      data-id="modal-backdrop"
      className={clsx(css.backdrop, {
        [css.backdropDark]: theme === 'dark',
        [css.backdropLight]: theme === 'light',
        [css.backdropViolet]: theme === 'violet',
      })}
    >
      <div
        className={clsx(css.filterModal, {
          [css.filterModalDark]: theme === 'dark',
          [css.filterModalLight]: theme === 'light',
          [css.filterModalViolet]: theme === 'violet',
        })}
      >
        <CloseModalButton onClick={func} />
        <p className={css.filtersTitle}>{name}</p>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CardModal;
