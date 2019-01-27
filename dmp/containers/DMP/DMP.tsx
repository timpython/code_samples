import React, { Component } from 'react';
import { getModuleState } from 'redux-register-module';
import { connect } from 'react-redux';
import { clone } from 'ramda';
import { Section } from '../../components/Section';
import styles from './DMP.scss';
import { getEnabledDMPs, getAdditionalInformationDmp } from '../../redux/actions';
import { baseDMP, DMPSection, advaloIdentifier } from '../../constants';
import { SettingsIntegrationDMPStore } from '../../redux/reducers';
import { settingsSidebarLayoutHOC } from '../../settings/hoc';
import { DMPTitle } from '../../components/DMPTitle';

type DMPProps = {
  getEnabledDMPs: (accountId: number) => void;
  getAdditionalInformationDmp: (accountId: number, additionalInformationId: number) => void;
  currentAccountId: number;
  enabledDMPFields: SettingsIntegrationDMPStore['enabledDMPFields'];
  currentLocationHeaderId: SettingsIntegrationDMPStore['currentLocationHeaderId'];
  aIdentifier: string;
  language: string;
};

type DMPState = {
  chargedDmp: DMPSection[];
};

class DMPContainer extends Component<DMPProps, DMPState> {
  state = {
    chargedDmp: baseDMP,
  };

  componentDidMount() {
    this.props.getEnabledDMPs(this.props.currentAccountId);
  }

  componentDidUpdate(prevProps: DMPProps) {
    const { currentAccountId, currentLocationHeaderId, getAdditionalInformationDmp, enabledDMPFields } = this.props;
    if (currentLocationHeaderId && prevProps.currentLocationHeaderId !== currentLocationHeaderId) {
      getAdditionalInformationDmp(currentAccountId, parseInt(currentLocationHeaderId, 10));
    }
    if (enabledDMPFields && prevProps.enabledDMPFields !== enabledDMPFields) {
      this.chargeDMP();
    }
  }

  chargeDMP() {
    const { enabledDMPFields, abtastyIdentifier } = this.props;
    const newDMP = baseDMP.map(item => {
      const sectionElem = clone(item); // work with cloned object
      if (sectionElem.mark === 'liveramp') {
        const livermapObj = enabledDMPFields.find(item => item.key === 'isLiverampEnabled');
        if (livermapObj) sectionElem.enabled = livermapObj.value === '1';
      }
      for (const fieldElem of sectionElem.fields) {
        fieldElem.value = '';
        fieldElem.id = 0;
        switch (fieldElem.key) {
          case 'advaloAbtastyIdentifier':
            fieldElem.value = abtastyIdentifier;
            break;
          case 'advaloToken':
            fieldElem.value = advaloIdentifier.token;
            break;
          case 'advaloPartnerId':
            fieldElem.value = advaloIdentifier.partnerId;
            break;
        }
        for (const enabledItem of enabledDMPFields) {
          if (fieldElem.key === enabledItem.key) {
            fieldElem.value = enabledItem.value;
            fieldElem.id = enabledItem.id;
            sectionElem.enabled = true;
          }
        }
      }
      return sectionElem;
    });
    this.setState(() => ({ chargedDmp: newDMP }));
  }

  render() {
    const { chargedDmp } = this.state;
    const { language } = this.props;
    return (
      <div className={styles.container}>
        <DMPTitle language={language} />
        {chargedDmp.map(sectionItem => (
          <Section
            key={sectionItem.mark}
            mark={sectionItem.mark}
            title={sectionItem.title}
            fields={sectionItem.fields}
            enabled={sectionItem.enabled}
            description={sectionItem.description}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentAccountId: getModuleState('user', state).currentAccount!.id,
  enabledDMPFields: getModuleState('settingsIntegrationDMP', state).enabledDMPFields,
  currentLocationHeaderId: getModuleState('settingsIntegrationDMP', state).currentLocationHeaderId,
  aIdentifier: getModuleState('user', state).currentAccount!.identifier,
  language: getModuleState('user', state).profile.lang,
});

const mapDispatchToProps = (dispatch: any) => ({
  getEnabledDMPs: (accountId: number) => dispatch(getEnabledDMPs(accountId)),
  getAdditionalInformationDmp: (accountId: number, additionalInformationId: number) =>
    dispatch(getAdditionalInformationDmp(accountId, additionalInformationId)),
});

const DMPConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(DMPContainer);

export const DMP = settingsSidebarLayoutHOC(<DMPConnector />);
