import { ThunkDispatch } from 'redux-thunk';
import i18n from 'i18next';
import { EnabledDMPList, FieldInfoDMP } from 'api-client';
import { apiClient } from '@modules/front-helpers/api';
import { Store } from '@store';
import { addSuccessToast, addDangerToast } from '@modules/notifications/redux/actions';

export const toastDMPRequestSuccess = () =>
  addSuccessToast(i18n.t('Success! Your information has been correctly saved!'));

export const toastDMPRequestFail = () =>
  addDangerToast(i18n.t('An error occurred, please retry or contact our support.'));

export const GET_SETTINGS_INTEGRATION_DMP_ENABLED_SUCCESS: 'GET_SETTINGS_INTEGRATION_DMP_ENABLED_SUCCESS' =
  'GET_SETTINGS_INTEGRATION_DMP_ENABLED_SUCCESS';
export const getSettingsIntegrationDMPEnabledSuccess = (response: EnabledDMPList) => ({
  type: GET_SETTINGS_INTEGRATION_DMP_ENABLED_SUCCESS,
  payload: response,
});

export const GET_SETTINGS_INTEGRATION_DMP_ENABLED_FAIL: 'GET_SETTINGS_INTEGRATION_DMP_ENABLED_FAIL' =
  'GET_SETTINGS_INTEGRATION_DMP_ENABLED_FAIL';
export const getSettingsIntegrationDMPEnabledFail = () => ({
  type: GET_SETTINGS_INTEGRATION_DMP_ENABLED_FAIL,
});

export const getEnabledDMPs = (accountId: number) => (dispatch: ThunkDispatch<Store, any, any>) => {
  apiClient.settings
    .fetchEnabledDMPs({ accountId })
    .then(response => {
      dispatch(getSettingsIntegrationDMPEnabledSuccess(response));
    })
    .catch(() => dispatch(getSettingsIntegrationDMPEnabledFail()));
};

// --------------
export const POST_SETTINGS_INTEGRATION_DMP_SUCCESS: 'POST_SETTINGS_INTEGRATION_DMP_SUCCESS' =
  'POST_SETTINGS_INTEGRATION_DMP_SUCCESS';
export const postSettingsIntegrationDMPSuccess = (response: any) => ({
  type: POST_SETTINGS_INTEGRATION_DMP_SUCCESS,
  payload: response,
});

export const POST_SETTINGS_INTEGRATION_DMP_FAIL: 'POST_SETTINGS_INTEGRATION_DMP_FAIL' =
  'POST_SETTINGS_INTEGRATION_DMP_FAIL';
export const postSettingsIntegrationDMPFail = () => ({
  type: POST_SETTINGS_INTEGRATION_DMP_FAIL,
});

export const postAdditionalInformationDmp = (accountId: number, key: string, value: string) => (
  dispatch: ThunkDispatch<Store, any, any>
) => {
  apiClient.settings
    .postAdditionalInformationDmp({ accountId, key, value })
    .then(response => {
      const header = response.headers.get('Location').split('/');
      const headerId = header[header.length - 1];
      dispatch(postSettingsIntegrationDMPSuccess(headerId));
    })
    .catch(() => {
      dispatch(postSettingsIntegrationDMPFail());
      dispatch(toastDMPRequestFail());
    });
};

// ---------------
export const GET_SETTINGS_INTEGRATION_DMP_SUCCESS: 'GET_SETTINGS_INTEGRATION_DMP_SUCCESS' =
  'GET_SETTINGS_INTEGRATION_DMP_SUCCESS';
export const getSettingsIntegrationDMPSuccess = (response: FieldInfoDMP) => ({
  type: GET_SETTINGS_INTEGRATION_DMP_SUCCESS,
  payload: response,
});

export const GET_SETTINGS_INTEGRATION_DMP_FAIL: 'GET_SETTINGS_INTEGRATION_DMP_FAIL' =
  'GET_SETTINGS_INTEGRATION_DMP_FAIL';
export const getSettingsIntegrationDMPFail = () => ({
  type: GET_SETTINGS_INTEGRATION_DMP_FAIL,
});

export const getAdditionalInformationDmp = (accountId: number, additionalInformationId: number) => (
  dispatch: ThunkDispatch<Store, any, any>
) => {
  apiClient.settings
    .getAdditionalInformationDmp({ accountId, additionalInformationId })
    .then(response => {
      dispatch(getSettingsIntegrationDMPSuccess(response));
      dispatch(toastDMPRequestSuccess());
    })
    .catch(() => {
      dispatch(getSettingsIntegrationDMPFail());
      dispatch(toastDMPRequestFail());
    });
};

// --------------
export const PATCH_SETTINGS_INTEGRATION_DMP_SUCCESS: 'PATCH_SETTINGS_INTEGRATION_DMP_SUCCESS' =
  'PATCH_SETTINGS_INTEGRATION_DMP_SUCCESS';
export const patchSettingsIntegrationDMPSuccess = (additionalInformationId: number, value: string) => ({
  type: PATCH_SETTINGS_INTEGRATION_DMP_SUCCESS,
  payload: {
    additionalInformationId,
    value,
  },
});

export const PATCH_SETTINGS_INTEGRATION_DMP_FAIL: 'PATCH_SETTINGS_INTEGRATION_DMP_FAIL' =
  'PATCH_SETTINGS_INTEGRATION_DMP_FAIL';
export const patchSettingsIntegrationDMPFail = () => ({
  type: PATCH_SETTINGS_INTEGRATION_DMP_FAIL,
});

export const patchAdditionalInformationDmp = (accountId: number, additionalInformationId: number, value: string) => (
  dispatch: ThunkDispatch<Store, any, any>
) => {
  apiClient.settings
    .patchAdditionalInformationDmp({ accountId, additionalInformationId, value })
    .then(() => {
      dispatch(patchSettingsIntegrationDMPSuccess(additionalInformationId, value));
      dispatch(toastDMPRequestSuccess());
    })
    .catch(() => {
      dispatch(patchSettingsIntegrationDMPFail());
      dispatch(toastDMPRequestFail());
    });
};

// --------------
export const DELETE_SETTINGS_INTEGRATION_DMP_SUCCESS: 'DELETE_SETTINGS_INTEGRATION_DMP_SUCCESS' =
  'DELETE_SETTINGS_INTEGRATION_DMP_SUCCESS';
export const deleteSettingsIntegrationDMPSuccess = (additionalInformationId: number) => ({
  type: DELETE_SETTINGS_INTEGRATION_DMP_SUCCESS,
  payload: {
    additionalInformationId,
  },
});

export const DELETE_SETTINGS_INTEGRATION_DMP_FAIL: 'DELETE_SETTINGS_INTEGRATION_DMP_FAIL' =
  'DELETE_SETTINGS_INTEGRATION_DMP_FAIL';
export const deleteSettingsIntegrationDMPFail = () => ({
  type: DELETE_SETTINGS_INTEGRATION_DMP_FAIL,
});

export const DELETE_SETTINGS_INTEGRATION_DMP_REQUEST: 'DELETE_SETTINGS_INTEGRATION_DMP_REQUEST' =
  'DELETE_SETTINGS_INTEGRATION_DMP_REQUEST';
export const deleteSettingsIntegrationDMPRequest = () => ({
  type: DELETE_SETTINGS_INTEGRATION_DMP_REQUEST,
  payload: {
    waiting: true,
  },
});

export const DELETE_SETTINGS_INTEGRATION_DMP_REQUEST_FINISH: 'DELETE_SETTINGS_INTEGRATION_DMP_REQUEST_FINISH' =
  'DELETE_SETTINGS_INTEGRATION_DMP_REQUEST_FINISH';
export const deleteSettingsIntegrationDMPRequestFinish = () => ({
  type: DELETE_SETTINGS_INTEGRATION_DMP_REQUEST_FINISH,
  payload: {
    waiting: false,
  },
});

export const deleteAdditionalInformationDmp = (accountId: number, additionalInformationId: number) => (
  dispatch: ThunkDispatch<Store, any, any>
) => {
  dispatch(deleteSettingsIntegrationDMPRequest());
  apiClient.settings
    .deleteAdditionalInformationDmp({ accountId, additionalInformationId })
    .then(() => {
      dispatch(deleteSettingsIntegrationDMPRequestFinish());
      dispatch(deleteSettingsIntegrationDMPSuccess(additionalInformationId));
      dispatch(toastDMPRequestSuccess());
    })
    .catch(() => {
      dispatch(deleteSettingsIntegrationDMPRequestFinish());
      dispatch(deleteSettingsIntegrationDMPFail());
      dispatch(toastDMPRequestFail());
    });
};
