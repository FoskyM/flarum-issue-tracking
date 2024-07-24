import app from 'flarum/admin/app';
import SettingsPage from './components/SettingsPage';

app.initializers.add('foskym/flarum-issue-tracking', () => {
  app.extensionData
    .for('foskym-issue-tracking')
    .registerPage(SettingsPage);
});
