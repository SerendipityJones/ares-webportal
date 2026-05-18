import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),

  @action
  luckTraded() {
      this.onReloadChar();
  },

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
        this.luckTraded();
      }
    });
  }

});
