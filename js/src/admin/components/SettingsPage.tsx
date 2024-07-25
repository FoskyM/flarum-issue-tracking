import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Alert from 'flarum/common/components/Alert';
import Button from 'flarum/common/components/Button';
import FieldSet from 'flarum/common/components/FieldSet';
import type { SaveSubmitEvent } from 'flarum/admin/components/AdminPage';
import type { AlertIdentifier } from 'flarum/common/states/AlertManagerState';
import type Mithril from 'mithril';
import icon from 'flarum/common/helpers/icon';
import extractText from 'flarum/common/utils/extractText';

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
  testing = false;
  testSuccessAlert?: AlertIdentifier | null = null;

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

    const fields = this.providerFields![this.setting('foskym-issue-tracking.provider')()]?.settings || {};
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
                        help:
                          app.translator.trans(`${this.setting('foskym-issue-tracking.provider')()}.admin.fields.${field}_help`) ===
                          `${this.setting('foskym-issue-tracking.provider')()}.admin.fields.${field}_help`
                            ? ''
                            : app.translator.trans(`${this.setting('foskym-issue-tracking.provider')()}.admin.fields.${field}_help`),
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

          <FieldSet
            label={app.translator.trans('foskym-issue-tracking.admin.action.heading')}
            className="FieldSet--col IssueTrackingPage-IssueTrackingSettings"
          >
            <Button className="Button Button--primary" disabled={this.testing || this.isChanged()} onclick={() => this.testConnection()}>
              {app.translator.trans('foskym-issue-tracking.admin.action.test_connection_button')}
            </Button>

            <Button className="Button Button--primary" onclick={() => this.importIssues()}>
              {icon('fas fa-download')}
              {app.translator.trans('foskym-issue-tracking.admin.action.import_issues_button')}
            </Button>

            <Button className="Button Button--primary" onclick={() => this.deleteImportedIssues()}>
              {icon('fas fa-trash-alt')}
              {app.translator.trans('foskym-issue-tracking.admin.action.delete_imported_issues_button')}
            </Button>

            <Button className="Button Button--danger" onclick={() => this.deleteAllIssues()}>
              {icon('fas fa-trash-alt')}
              {app.translator.trans('foskym-issue-tracking.admin.action.delete_all_issues_button')}
            </Button>
          </FieldSet>
        </div>
      </div>
    );
  }

  importIssues() {
    window.confirm(extractText(app.translator.trans('foskym-issue-tracking.admin.action.import_issues_confirmation'))) &&
      app
        .request({
          method: 'POST',
          url: app.forum.attribute('apiUrl') + '/issue-tracking/issues/import',
        })
        .then(() => {
          app.alerts.show({ type: 'success' }, app.translator.trans('foskym-issue-tracking.admin.action.import_issues_success'));
        })
        .catch((error) => {
          m.redraw();
          throw error;
        });
  }

  deleteImportedIssues() {
    window.confirm(extractText(app.translator.trans('foskym-issue-tracking.admin.action.delete_imported_issues_confirmation'))) &&
      app
        .request({
          method: 'DELETE',
          url: app.forum.attribute('apiUrl') + '/issue-tracking/issues/imported',
        })
        .then(() => {
          app.alerts.show({ type: 'success' }, app.translator.trans('foskym-issue-tracking.admin.action.delete_imported_issues_success'));
        })
        .catch((error) => {
          m.redraw();
          throw error;
        });
  }

  deleteAllIssues() {
    window.confirm(extractText(app.translator.trans('foskym-issue-tracking.admin.action.delete_all_issues_confirmation'))) &&
      app
        .request({
          method: 'DELETE',
          url: app.forum.attribute('apiUrl') + '/issue-tracking/issues',
        })
        .then(() => {
          app.alerts.show({ type: 'success' }, app.translator.trans('foskym-issue-tracking.admin.action.delete_all_issues_success'));
        })
        .catch((error) => {
          m.redraw();
          throw error;
        });
  }

  testConnection() {
    this.testing = true;

    if (this.testSuccessAlert) app.alerts.dismiss(this.testSuccessAlert);

    app
      .request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/issue-tracking/settings/test',
      })
      .then((response) => {
        this.testing = false;
        this.testSuccessAlert = app.alerts.show(
          { type: 'success' },
          app.translator.trans('foskym-issue-tracking.admin.action.test_connection_success')
        );
      })
      .catch((error) => {
        this.testing = false;
        m.redraw();
        throw error;
      });
  }

  saveSettings(e: SaveSubmitEvent) {
    return super.saveSettings(e).then(() => this.refresh());
  }
}
