import React, { SFC } from 'react';

import { RadioBoxOption, RadioBoxOptionType } from './RadioBoxOption';
import styles from './RadioBox.scss';

export { RadioBoxOptionType };

export type RadioBoxProps = {
  options: RadioBoxOptionType[];
  selection: number | string;
  containerClassName?: string;
  title?: string;
  name: string;
  onChange?: (selectedValue: any) => void;
};

export const RadioBox: SFC<RadioBoxProps> = ({
  options,
  selection,
  title,
  containerClassName,
  name,
  onChange = () => {},
}) =>
  (
    <div className={containerClassName}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.body}>
        {options.map(({ label, value, content }) => {
          return (
            <RadioBoxOption
              key={label}
              label={label}
              name={name}
              value={value}
              content={content}
              onChange={onChange}
              checked={selection === value}
            />
          );
        })}
      </div>
    </div>
  );
