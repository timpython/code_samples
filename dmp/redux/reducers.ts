import { assoc } from 'ramda';
import { EnabledDMP } from 'api-client';
import {
  getSettingsIntegrationDMPEnabledSuccess,
  postSettingsIntegrationDMPSuccess,
  getSettingsIntegrationDMPSuccess,
  patchSettingsIntegrationDMPSuccess,
  deleteSettingsIntegrationDMPSuccess,
  deleteSettingsIntegrationDMPRequest,
  deleteSettingsIntegrationDMPRequestFinish,
} from './actions';

export type SettingsIntegrationAction =
  | ReturnType<typeof getSettingsIntegrationDMPEnabledSuccess>
  | ReturnType<typeof postSettingsIntegrationDMPSuccess>
  | ReturnType<typeof getSettingsIntegrationDMPSuccess>
  | ReturnType<typeof patchSettingsIntegrationDMPSuccess>
  | ReturnType<typeof deleteSettingsIntegrationDMPRequest>
  | ReturnType<typeof deleteSettingsIntegrationDMPSuccess>
  | ReturnType<typeof deleteSettingsIntegrationDMPRequestFinish>;

export type SettingsIntegrationDMPStore = {
  enabledDMPFields: EnabledDMP[];
  currentLocationHeaderId: string | null;
  waitingDelete: boolean;
};

export const initialState: SettingsIntegrationDMPStore = {
  enabledDMPFields: [],
  currentLocationHeaderId: null,
  waitingDelete: false,
};

export const settingsIntegrationDMPReducer = (
  state: SettingsIntegrationDMPStore = initialState,
  action: SettingsIntegrationAction
): SettingsIntegrationDMPStore => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_SETTINGS_INTEGRATION_DMP_ENABLED_SUCCESS':
      return assoc('enabledDMPFields', payload._embedded.items, state);
    case 'POST_SETTINGS_INTEGRATION_DMP_SUCCESS':
      return assoc('currentLocationHeaderId', payload, state);
    case 'GET_SETTINGS_INTEGRATION_DMP_SUCCESS':
      return assoc('enabledDMPFields', [...state.enabledDMPFields, payload], state);
    case 'PATCH_SETTINGS_INTEGRATION_DMP_SUCCESS':
      const target = state.enabledDMPFields.find(item => item.id === payload.additionalInformationId);
      const cleanAray = state.enabledDMPFields.filter(item => item.id !== payload.additionalInformationId);
      const newTarget = assoc('value', payload.value, target);
      return assoc('enabledDMPFields', [...cleanAray, newTarget], state);
    case 'DELETE_SETTINGS_INTEGRATION_DMP_REQUEST':
      return assoc('waitingDelete', payload.waiting, state);
    case 'DELETE_SETTINGS_INTEGRATION_DMP_SUCCESS':
      const deleteEnabledDMPFields = state.enabledDMPFields.filter(item => item.id !== payload.additionalInformationId);
      return assoc('enabledDMPFields', deleteEnabledDMPFields, state);
    case 'DELETE_SETTINGS_INTEGRATION_DMP_REQUEST_FINISH':
      return assoc('waitingDelete', payload.waiting, state);
    default:
      return state;
  }
};
