import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
  tagName: '',

  @action
  updatePref(cat, pref, lvl) {
      this.set('model.char.rp_prefs.'+cat+'.'+pref, lvl);
  }

});
