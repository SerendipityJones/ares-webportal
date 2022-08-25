import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),
  
  actions: {
    luckTraded() {
        this.reloadChar();
    },
    tradeLuck: function() {
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
  }
});
