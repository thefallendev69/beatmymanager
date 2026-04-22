import { ChangeEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setImage,
  setValidationError,
  setValidationResult,
  setValidationRunning,
} from '../store/flowSlice';
import { calculateBlurScore, isImageBlurry } from '../utils/blurDetection';
import { detectPersonConfidence } from '../utils/personDetection';
import GenderSelector from './GenderSelector';
import styles from '../styles/UploadCard.module.scss';

export default function UploadCard() {
  const dispatch = useAppDispatch();
  const flow = useAppSelector((state) => state.flow);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setLocalError('Please upload an image file.');
      return;
    }

    setLocalError(null);
    const previewUrl = URL.createObjectURL(file);
    dispatch(setImage({ fileName: file.name, previewUrl }));
  };

  const runValidation = async () => {
    if (!imageRef.current) {
      return;
    }

    dispatch(setValidationRunning());

    try {
      const blurScore = calculateBlurScore(imageRef.current);
      const blurry = isImageBlurry(blurScore);
      const personConfidence = await detectPersonConfidence(imageRef.current);
      const personDetected = personConfidence >= 0.5;

      dispatch(
        setValidationResult({
          blurScore,
          isBlurry: blurry,
          personConfidence,
          isPerson: personDetected,
        }),
      );
    } catch (error) {
      dispatch(setValidationError('Validation failed on this browser. Please try another image.'));
      console.error(error);
    }
  };

  return (
    <article className={styles.uploadCard}>
      <label htmlFor="imageUpload" className={styles.uploadCard__label}>
        Upload person image
      </label>
      <input id="imageUpload" type="file" accept="image/*" onChange={onFileChange} />

      {localError && <p className={styles.uploadCard__error}>{localError}</p>}

      {flow.previewUrl && (
        <div className={styles.uploadCard__preview}>
          <img src={flow.previewUrl} alt="Uploaded preview" ref={imageRef} />
          <p>
            <strong>File:</strong> {flow.fileName}
          </p>
          <button type="button" onClick={runValidation} disabled={flow.validationStatus === 'running'}>
            {flow.validationStatus === 'running' && <span className={styles.uploadCard__spinner} aria-hidden="true" />}
            {flow.validationStatus === 'running' ? 'Validating...' : 'Run Client Validation'}
          </button>
        </div>
      )}

      {flow.validationStatus === 'done' && (
        <div className={styles.uploadCard__results}>
          <h3>Validation Results</h3>
          <p>
            Blur score: <strong>{flow.blurScore}</strong> ({flow.isBlurry ? 'Too blurry' : 'Clear enough'})
          </p>
          <p>
            Person confidence: <strong>{Math.round((flow.personConfidence ?? 0) * 100)}%</strong> (
            {flow.isPerson ? 'Person detected' : 'No person detected'})
          </p>
        </div>
      )}

      {flow.validationStatus === 'error' && <p className={styles.uploadCard__error}>{flow.error}</p>}

      {flow.previewUrl && <GenderSelector />}
    </article>
  );
}
