import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Alert from 'flarum/common/components/Alert';
import FieldSet from 'flarum/common/components/FieldSet';
import type { SaveSubmitEvent } from 'flarum/admin/components/AdminPage';

import type Mithril from 'mithril';

export interface ProviderSettings {
  data: {
    attributes: {
      fields: Record<string, any>;
      errors: any[];
    };
  };
}

export default class SettingsPage extends ExtensionPage {
  providerFields?: Record<string, any>;
  status?: { errors: any };

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);

    this.refresh();
  }

  refresh() {
    this.loading = true;

    this.status = { errors: {} };

    app
      .request<ProviderSettings>({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/issue-tracking/settings',
      })
      .then((response) => {
        this.providerFields = response.data.attributes.fields;
        this.status!.errors = response.data.attributes.errors;

        this.loading = false;
        m.redraw();
      });
  }

  content() {
    if (this.loading) {
      return <LoadingIndicator />;
    }

    const fields = this.providerFields![this.setting('foskym-issue-tracking.provider')()]['settings'];
    const fieldKeys = Object.keys(fields);

    const options = Object.keys(this.providerFields!).reduce((memo, key) => ({ ...memo, [key]: this.providerFields![key].name }), {});

    return (
      <div className="container IssueTracking-container">
        <div className="Form">
          {this.buildSettingComponent({
            type: 'boolean',
            setting: 'foskym-issue-tracking.enable_create_issue',
            label: app.translator.trans('foskym-issue-tracking.admin.enable_create_issue_label'),
          })}

          {this.buildSettingComponent({
            type: 'boolean',
            setting: 'foskym-issue-tracking.enable_auto_import',
            label: app.translator.trans('foskym-issue-tracking.admin.enable_auto_import_label'),
          })}

          {this.buildSettingComponent({
            type: 'boolean',
            setting: 'foskym-issue-tracking.enable_comment_sync',
            label: app.translator.trans('foskym-issue-tracking.admin.enable_comment_sync_label'),
          })}

          {this.buildSettingComponent({
            type: 'select',
            setting: 'foskym-issue-tracking.provider',
            options: options,
            label: app.translator.trans('foskym-issue-tracking.admin.provider_heading'),
          })}

          {!!fieldKeys.length && (
            <FieldSet
              label={app.translator.trans(`${this.setting('foskym-issue-tracking.provider')()}.admin.fields.heading`)}
              className="IssueTrackingPage-IssueTrackingSettings"
            >
              <div className="IssueTrackingPage-IssueTrackingSettings-input">
                {fieldKeys.map((field) => {
                  const fieldInfo = fields[field];

                  return (
                    <>
                      {this.buildSettingComponent({
                        type: typeof fieldInfo === 'string' ? 'text' : 'select',
                        label: app.translator.trans(`${this.setting('foskym-issue-tracking.provider')()}.admin.fields.${field}_label`),
                        help: app.translator.trans(`${this.setting('foskym-issue-tracking.provider')()}.admin.fields.${field}_help`) === `${this.setting('foskym-issue-tracking.provider')()}.admin.fields.${field}_help` ? '' : app.translator.trans(`${this.setting('foskym-issue-tracking.provider')()}.admin.fields.${field}_help`),
                        setting: this.setting(`foskym-issue-tracking.provider`)() + '.' + field,
                        options: fieldInfo,
                      })}
                      {this.status!.errors[field] && <p className="ValidationError">{this.status!.errors[field]}</p>}
                    </>
                  );
                })}
              </div>
            </FieldSet>
          )}
          {this.submitButton()}
        </div>
      </div>
    );
  }

  saveSettings(e: SaveSubmitEvent) {
    return super.saveSettings(e).then(() => this.refresh());
  }
}
