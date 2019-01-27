import { Reducer } from 'redux';
import { registerModuleReducer } from 'redux-register-module';
import { settingsIntegrationDMPReducer } from './redux/reducers';

export const registerSettingsIntegrationDMP = () => {
  registerModuleReducer('settingsIntegrationDMP', settingsIntegrationDMPReducer as Reducer<any>);
};

export { SettingsIntegrationDMPStore } from './redux/reducers';
export { settingsIntegrationDMPRoutes } from './routes';
