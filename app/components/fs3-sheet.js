import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),

  @action
  tradeLuck() {
    let api = this.gameApi;
    api.requestOne('luckConversion', {
        id: this.get('char.id')
      }, null)
    .then( (response) => {
      if (response.error) {
        return;
      } else if (response.success) {
        this.flashMessages.success(response.success);
        this.onReloadChar()
      }
    });
  },

  @action
  confirmLuck(value) {
    this.set('luckConfirm', value);
  },

});
