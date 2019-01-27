import React, { Component } from 'react';
import { Input } from 'common-ui';
import i18n from 'i18next';
import { connect } from 'react-redux';
import { getModuleState } from 'redux-register-module';
import { postAdditionalInformationDmp, patchAdditionalInformationDmp } from '../../redux/actions';
import { SettingsIntegrationDMPStore } from '../../redux/reducers';
import styles from './SectionField.scss';

type SectionFieldProps = {
  label: string;
  type?: 'text' | 'search' | 'number';
  valid?: boolean;
  errorMessage?: string;
  value: string;
  id: number;
  fieldKey: string;
  postAdditionalInformationDmp: (accountId: number, key: string, value: string) => void;
  patchAdditionalInformationDmp: (accountId: number, additionalInformationId: number, value: string) => void;
  currentAccountId: number;
  currentLocationHeaderId: SettingsIntegrationDMPStore['currentLocationHeaderId'];
  disabled?: boolean;
  placeholder?: string;
};

type SectionFieldState = {
  fieldValue: string;
};

class SectionFieldComponent extends Component<SectionFieldProps, SectionFieldState> {
  static defaultProps = {
    placeholder: 'Type here...',
  };

  state = {
    fieldValue: this.props.value,
  };

  onChange = e => {
    this.setState({ fieldValue: e.target.value });
  };

  publishData = () => {
    const { currentAccountId, id, patchAdditionalInformationDmp, postAdditionalInformationDmp, fieldKey } = this.props;
    const { fieldValue } = this.state;
    if (fieldValue === '') return;
    if (id !== 0) {
      patchAdditionalInformationDmp(currentAccountId, id, fieldValue);
    } else {
      postAdditionalInformationDmp(currentAccountId, fieldKey, fieldValue);
    }
  };

  render() {
    const { label, type, disabled, placeholder } = this.props;
    return (
      <div className={styles.fieldContainer}>
        <Input
          value={this.state.fieldValue}
          label={label}
          placeholder={i18n.t(placeholder!)}
          type={type}
          onChange={this.onChange}
          onBlur={this.publishData}
          disabled={disabled}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentAccountId: getModuleState('user', state).currentAccount!.id,
  currentLocationHeaderId: getModuleState('settingsIntegrationDMP', state).currentLocationHeaderId,
});

const mapDispatchToProps = (dispatch: any) => ({
  postAdditionalInformationDmp: (accountId: number, key: string, value: string) =>
    dispatch(postAdditionalInformationDmp(accountId, key, value)),
  patchAdditionalInformationDmp: (accountId: number, additionalInformationId: number, value: string) =>
    dispatch(patchAdditionalInformationDmp(accountId, additionalInformationId, value)),
});

export const SectionField = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionFieldComponent);
