import { Form } from 'react-bootstrap';
import { SectionType } from '../types.d';
import type { ChangeEvent } from 'react';

interface TextAreaProps {
  type: SectionType;
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
}

export function TextArea({ type, loading, onChange, value }: TextAreaProps) {
  const commonStyles = { border: 0, height: '200px' };
  const styles = type === SectionType.From ? commonStyles : { ...commonStyles, backgroundColor: '#f5f5f5' };

  const getPlaceholder = ({ type, loading }: { type: SectionType; loading?: boolean }) => {
    if (type === SectionType.From) return 'Introducir texto';
    if (loading === true) return 'Cargando...';
    return 'Traducción';
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      as={'textarea'}
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      autoFocus={type === SectionType.From}
      value={value}
      disabled={type === SectionType.To}
      onChange={handleChange}
    />
  );
}
