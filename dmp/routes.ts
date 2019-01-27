import { AppRoute } from '@modules/page-layout/types';
import { SETTINGS_INTEGRATION_DMP } from '@modules/page-layout/constants';
import { DMP } from './containers/DMP';

export const settingsIntegrationDMPRoutes: AppRoute[] = [
  {
    path: '/settings/integration/dmp',
    sectionName: '',
    subSectionName: '',
    content: DMP,
    feature: SETTINGS_INTEGRATION_DMP,
  },
];
