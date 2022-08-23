import Component from '@ember/component';
import { inject as service } from '@ember/service';
import EmberObject, { computed } from '@ember/object';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),
  canLearn: computed( 'learn', function() {
    var verdict = this.get('learn.aspects');
    return verdict;
  }),
  aspect: computed( 'learn', function() {
    if (this.get('learn.aspects')) {
      return this.get('learn.aspects')[0];
    }
  }),
  spell: computed( 'learn', function() {
    if (this.get('learn.aspects')) {
      return this.get('learn.learnable')[this.get('learn.aspects')[0]][0];
    }
  }),
  availableSpells: computed( 'learn', function() {
    if (this.get('learn.aspects')) {
      return this.get('learn.learnable')[this.get('learn.aspects')[0]];
    }
  }),
  learnables: computed( 'learn', function() {
    var msg = "You currently have ";
    var aspects = this.get('learn.aspects');
    var slots = this.get('learn.slots');
    if (aspects.length > 0) {
      aspects.forEach((aspect, i) => {
        if (i == 0) {
          var plural = slots[i] > 1 ? "slots" : "slot";
          msg += slots[i] + " " + plural + " available in " + aspect;
        } else {
          if (i == aspects.length-1) {
            if (i > 1) {
              msg += ", and ";
            } else {
              msg += " and ";
            }
          } else {
            msg += ", ";
          }
          msg += slots[i] + " in " + aspect;
        }
      });
      msg += ".";
    } else {
      msg += "no open spell slots.";
    }
    return msg;
  }),

  actions: {
    spellLearned() {
        this.reloadChar();
    },
      changeSpellList: function(aspect) {
        let fullList = this.get('learn.learnable');
        let catList = fullList[aspect];
        this.set('aspect', aspect);
        this.set('availableSpells', this.get('learn.learnable')[aspect]);
        this.set('spell', this.get('availableSpells')[0]);
      },
      addSpell: function(aspect) {
        let api = this.gameApi;
        let spell = this.get('spell');
        let category = this.get('aspect');
        api.requestOne('charSpellLearn', {
           id: this.get('char.id'),
           spell: spell,
           category: category
         }, null)
        .then( (response) => {
          if (response.error) {
            return;
          }
        });
        this.flashMessages.success('Your ' + category + ' spells now include ' + spell + '.');
        this.spellLearned();
      }
  }

});
