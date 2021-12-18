import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  gameApi: service(),
  newLocation: '',
  newAction: '',
  newThing: '',
  newCue: '',

  actions: {
    newInspiration: function() {
        this.set('model.newLocation', this.get('model.location')[Math.floor(Math.random() * this.get('model.location').length)]);
        this.set('model.newAction', this.get('model.action')[Math.floor(Math.random() * this.get('model.action').length)]);
        this.set('model.newThing', this.get('model.thing')[Math.floor(Math.random() * this.get('model.thing').length)]);
        this.set('model.newCue', this.get('model.cue')[Math.floor(Math.random() * this.get('model.cue').length)]);
    }
  }

});
