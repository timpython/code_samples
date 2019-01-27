import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { getModuleState } from 'redux-register-module';
import { Switch } from '@abtasty/turfu-common-ui';
import { SectionField } from '../SectionField';
import { DMPSectionField } from '../../constants';
import styles from './Section.scss';
import { deleteAdditionalInformationDmp, patchAdditionalInformationDmp } from '../../redux/actions';
import { SectionIcon } from '../SectionIcon';
import { SettingsIntegrationDMPStore } from '../../redux/reducers';

export type SectionFieldsTypes = {
  title: string;
  type?: 'text' | 'search' | 'number';
};

export type SectionProps = {
  mark: string;
  title: string;
  fields: DMPSectionField[];
  enabled: boolean;
  currentAccountId: number;
  deleteAdditionalInformationDmp: (accountId: number, additionalInformationId: number) => void;
  waitingDelete: boolean;
  enabledDMPFields: SettingsIntegrationDMPStore['enabledDMPFields'];
  patchAdditionalInformationDmp: (accountId: number, additionalInformationId: number, value: string) => void;
  description?: string;
};

export type SectionState = {
  isOpen: boolean;
};

export class SectionComponent extends React.Component<SectionProps, SectionState> {
  state = {
    isOpen: this.props.enabled,
  };

  componentDidUpdate(prevProps: SectionProps) {
    const { enabled } = this.props;
    if (enabled && enabled !== prevProps.enabled) {
      this.setState(() => ({ isOpen: enabled }));
    }
  }

  switchHandler = () => {
    const { waitingDelete } = this.props;
    if (waitingDelete) return;
    this.setState(
      ({ isOpen }) => ({ isOpen: !isOpen }),
      () => {
        const { isOpen } = this.state;
        const {
          fields,
          currentAccountId,
          deleteAdditionalInformationDmp,
          mark,
          enabledDMPFields,
          patchAdditionalInformationDmp,
        } = this.props;
        if (mark === 'liveramp') {
          const liverMapObj = enabledDMPFields.find(item => item.key === 'isLiverampEnabled');
          if (liverMapObj) {
            const fieldValue = isOpen ? '1' : '0';
            patchAdditionalInformationDmp(currentAccountId, liverMapObj.id, fieldValue);
          }
        }
        if (!isOpen) {
          fields.forEach(field => {
            if (field.id && !field.disabled) {
              deleteAdditionalInformationDmp(currentAccountId, field.id);
            }
          });
        }
      }
    );
  };

  render() {
    const { mark, title, fields, description } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.titleBlock}>
          <div className={styles.nameGroup}>
            <SectionIcon mark={mark} />
            <span className={styles.titleText}>{title}</span>
          </div>
          <Switch onClick={this.switchHandler} on={isOpen} />
        </div>
        {isOpen && (
          <div className={styles.fieldsBlock}>
            {fields.map(field => (
              <SectionField
                key={field.key}
                label={field.title}
                type={field.type}
                value={field.value!}
                id={field.id!}
                fieldKey={field.key}
                disabled={field.disabled}
                placeholder={field.placeholder}
              />
            ))}
            {description && <div className={styles.description}>{i18n.t(description)}</div>}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentAccountId: getModuleState('user', state).currentAccount!.id,
  waitingDelete: getModuleState('settingsIntegrationDMP', state).waitingDelete,
  enabledDMPFields: getModuleState('settingsIntegrationDMP', state).enabledDMPFields,
});

const mapDispatchToProps = (dispatch: any) => ({
  deleteAdditionalInformationDmp: (accountId: number, additionalInformationId: number) =>
    dispatch(deleteAdditionalInformationDmp(accountId, additionalInformationId)),
  patchAdditionalInformationDmp: (accountId: number, additionalInformationId: number, value: string) =>
    dispatch(patchAdditionalInformationDmp(accountId, additionalInformationId, value)),
});

export const Section = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionComponent);
