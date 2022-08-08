import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set, computed } from '@ember/object';
import { observer } from '@ember/object';

export default Component.extend({
    gameApi: service(),
    flashMessages: service(),
    tagName: '',
    selectCastSpell: false,
    vsRoll1: null,
    vsRoll2: null,
    vsName1: null,
    vsName2: null,
    pcCastSpell: null,
    pcSpellName: null,
    pcTarget: null,
    npcRating: null,
    spellString: null,
    spellOpposed: null,
    destinationType: 'scene',

    didInsertElement: computed('scene.poseChar', function() {
      this._super(...arguments);
      if (this.scene && !this.get('scene.poseChar')) {

        let self = this;
        this.scene.poseable_chars.forEach(c => {
          if (!this.get('scene.poseChar') && self.scene.participants.any(w => w.name == c.name)) {
            self.set('scene.poseChar', c);
          }
        });

        if (!this.get('scene.poseChar')) {
          this.set('scene.poseChar', this.get('scene.poseable_chars')[0]);
        }
      }
      let currentChar = this.get('scene.poseChar.name');
      let defaultSpell = this.spellList[currentChar].unopposed ? this.spellList[currentChar].unopposed[0] : '';
      this.set('spellString', defaultSpell);
      let defaultOpposed = this.spellList[currentChar].opposed ? this.spellList[currentChar].opposed[0] : '';
      this.set('spellOpposed', defaultOpposed);
    }),

    poseCharChanged: observer('scene.poseChar', function() {
      let currentChar = this.get('scene.poseChar.name');
      let defaultSpell = this.spellList[currentChar].unopposed ? this.spellList[currentChar].unopposed[0] : '';
      this.set('spellString', defaultSpell);
      let defaultOpposed = this.spellList[currentChar].opposed ? this.spellList[currentChar].opposed[0] : '';
      this.set('spellOpposed', defaultOpposed);
    }),


    actions: {

      addSpell() {
        let api = this.gameApi;
        let currentChar = this.get('scene.poseChar.name');
        let defaultSpell = this.spellList[currentChar].unopposed ? this.spellList[currentChar].unopposed[0] : '';
        let defaultOpposed = this.spellList[currentChar].opposed ? this.spellList[currentChar].opposed[0] : '';
        // Needed because the onChange event doesn't get triggered when the list is
        // first loaded, so the roll string is empty.
        let spellString = this.spellString || defaultSpell;
        let spellOpposed = this.spellOpposed || defaultOpposed;
        let vsRoll1 = this.vsRoll1;
        let vsRoll2 = this.vsRoll2;
        let vsName1 = this.vsName1;
        let vsName2 = this.vsName2;
        let pcCastSpell = this.pcCastSpell;
        let pcSpellName = this.pcSpellName;
        let pcTarget = this.pcTarget;
        let npcRating = this.npcRating;

        var sender;
        if (this.scene) {
          sender = this.get('scene.poseChar.name');
        }

        if (!spellString && !spellOpposed && !vsRoll1 && !pcCastSpell) {
          this.flashMessages.danger("You haven't selected a spell to cast.");
          return;
        }

        if (vsRoll1 || vsRoll2 || vsName1 || vsName2) {
          if (!vsName1 || !vsName2 || !vsRoll1) {
            this.flashMessages.danger("You have to provide all opposed spell information.");
            return;
          }
        }

        if (pcCastSpell || pcSpellName) {
          if (!pcCastSpell || !pcSpellName) {
            this.flashMessages.danger("You have to provide all spell information to cast for a PC.");
            return;
          }
        }
        this.set('selectCastSpell', false);
        this.set('spellString', null);
        this.set('spellOpposed', null);
        this.set('vsRoll1', null);
        this.set('vsRoll2', null);
        this.set('vsName1', null);
        this.set('vsName2', null);
        this.set('pcCastSpell', null);
        this.set('pcSpellName', null);
        this.set('pcTarget', null);
        this.set('npcRating', null);

        var destinationId, command;
        if (this.destinationType == 'scene') {
          destinationId = this.get('scene.id');
          command = 'addSceneSpell';
        }

        api.requestOne(command, { id: destinationId,
           spell_string: spellString,
           spell_opposed: spellOpposed,
           vs_roll1: vsRoll1,
           vs_roll2: vsRoll2,
           vs_name1: vsName1,
           vs_name2: vsName2,
           pc_name: pcSpellName,
           pc_spell: pcCastSpell,
           pc_target: pcTarget,
           npc_rating: npcRating,
           sender: sender }, null)
        .then( (response) => {
          if (response.error) {
            return;
          }
        });
      },
    }
});
