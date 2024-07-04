import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),
  canLearn: computed( 'learn', function() {
    let verdict = this.get('learn.aspects');
    return verdict;
  }),
 aspect: computed( 'learn', {
    get() {
      if (this.get('learn.aspects')) {
        return this.get('learn.aspects')[0];
      }
    },
    set(key, value) {
      return value;
    }
 }),
 spell: computed( 'learn', {
    get() {
      if (this.get('learn.aspects')) {
        return this.get('learn.learnable')[this.get('learn.aspects')[0]][0];
      }
    },
    set(key, value) {
      return value;
    }
  }),
  availableSpells: computed( 'learn', {
    get() {
      if (this.get('learn.aspects')) {
        return this.get('learn.learnable')[this.get('learn.aspects')[0]];
      }
    },
    set(key, value) {
      return value;
    }
  }),
  learnables: computed( 'learn', function() {
    let msg = "You currently have ";
    let aspects = this.get('learn.aspects');
    let slots = this.get('learn.slots');
    if (aspects.length > 0) {
      aspects.forEach((aspect, i) => {
        if (i == 0) {
          let plural = slots[i] > 1 ? "slots" : "slot";
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
    changeSpellList: function(newAspect) {
      let fullList = this.get('learn.learnable');
      let catList = fullList[newAspect];
      this.set('aspect', newAspect);
      this.set('availableSpells', this.get('learn.learnable')[newAspect]);
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
