import { Gender, setGender } from '../store/flowSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import styles from '../styles/GenderSelector.module.scss';

const options: { label: string; value: Gender }[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Trans', value: 'trans' },
];

export default function GenderSelector() {
  const dispatch = useAppDispatch();
  const selectedGender = useAppSelector((state) => state.flow.gender);

  return (
    <div className={styles.genderSelector}>
      <h3 className={styles.genderSelector__title}>Select Gender</h3>
      <div className={styles.genderSelector__options}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => dispatch(setGender(option.value))}
            className={`${styles.genderSelector__option} ${
              selectedGender === option.value ? styles['genderSelector__option--active'] : ''
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
