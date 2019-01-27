import React from 'react';
import i18n from 'i18next';
import { Paragraph, Title } from 'common-ui';

import { getSupportUrl } from '@modules/front-helpers/url';

export type DMPTitleProps = {
  language: string;
};

export const DMPTitle = (props: DMPTitleProps) => {
  const { language } = props;
  return (
    <div>
      <Title level="1">{i18n.t('DMP ')}</Title>
      <Paragraph type="description">
        {i18n.t(
          'Description.'
        )}{' '}
        <a
          href={getSupportUrl(
            language,
            'articles/eee'
          )}
          target="_blank"
        >
          {i18n.t('Support')}
        </a>
      </Paragraph>
    </div>
  );
};
