import Component from '@ember/component';
import { action, set } from '@ember/object';

export default Component.extend({
  tagName: '',

@action
updatePref(cat, pref, lvl) {
  const char = this.get('model.char');
  const currentPrefs = char.get ? char.get('rp_prefs') : (char.rp_prefs || {});

  const nextPrefs = {
    ...(currentPrefs || {}),
    [cat]: {
      ...((currentPrefs && currentPrefs[cat]) || {}),
      [pref]: lvl
    }
  };

  set(char, 'rp_prefs', nextPrefs);
}

});
