import { ChangeEvent } from 'react';
import { Gender, setGender, setName } from '../store/flowSlice';
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
  const selectedName = useAppSelector((state) => state.flow.name);

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

  return (
    <div className={styles.genderSelector}>
      <h3 className={styles.genderSelector__title}>Profile Details</h3>
      <label htmlFor="personName" className={styles.genderSelector__label}>
        Name
      </label>
      <input
        id="personName"
        className={styles.genderSelector__input}
        type="text"
        placeholder="Enter name"
        value={selectedName}
        onChange={onNameChange}
      />
      <h4 className={styles.genderSelector__subtitle}>Select Gender</h4>
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
