import React, { SFC, ReactNode } from 'react';

import styles from './RadioBoxOption.scss';

export type RadioBoxOptionType = {
  label: string;
  value: number | string;
  content?: ReactNode;
};

export type RadioBoxInputType = {
  checked: boolean;
  name: string;
  onChange: (value: any) => void;
};

export type RadioBoxOptionProps = RadioBoxOptionType & RadioBoxInputType;

export const RadioBoxOption: SFC<RadioBoxOptionProps> = ({ label, checked, value, content, name, onChange }) =>
  (
    <div className={styles.container}>
      <label className={styles.label}>
        <input
          className={styles.radioButton}
          type="radio"
          checked={checked}
          value={value}
          name={name}
          onChange={onChange}
        />
        {label && <span className={styles.labelText}>{label}</span>}
        <span className={styles.checkMark} />
      </label>
      {content && <div className={styles.content}>{content}</div>}
    </div>
  );
