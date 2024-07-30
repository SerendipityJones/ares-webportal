import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  actions: {
    updatePref(cat, pref, lvl) {
        this.set('model.char.rp_prefs.'+cat+'.'+pref, lvl);
    }
  }
});
