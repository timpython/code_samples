import React from 'react';
import classNames from 'classnames';
import styles from './SectionIcon.scss';

export type SectionIconProps = {
  mark: string;
};

export const SectionIcon = (props: SectionIconProps) => {
  const { mark } = props;
  return <div className={classNames(styles.baseIcon, styles[mark])} />;
};
