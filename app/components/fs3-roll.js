import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set, computed } from '@ember/object';
import { observer } from '@ember/object';

export default Component.extend({
    gameApi: service(),
    flashMessages: service(),
    tagName: '',
    selectSkillRoll: false,
    vsRoll1: null,
    vsRoll2: null,
    vsName1: null,
    vsName2: null,
    pcRollSkill: null,
    pcRollName: null,
    rollString: null,
    defaultAbility: null,
    noDraw: false,
    destinationType: 'scene',

    didInsertElement: computed('scene.poseChar', function() {
      this._super(...arguments);
      if (this.scene) {
        if (!this.get('scene.poseChar')) {
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
        let defaultAbility = this.abilityList[currentChar] ? this.abilityList[currentChar][0] : '';
        this.set('rollString', defaultAbility);
      } else {
        let defaultAbility = this.abilities ? this.abilities[0] : '';
        this.set('rollString', defaultAbility);
      }
    }),

    poseCharChanged: observer('scene.poseChar', function() {
      let currentChar = this.get('scene.poseChar.name');
      let defaultAbility = this.abilityList[currentChar] ? this.abilityList[currentChar][0] : '';
      this.set('rollString', defaultAbility);
    }),


    actions: {

      addRoll() {
        let api = this.gameApi;
        let defaultAbility = this.abilities ? this.abilities[0] : '';

        // Needed because the onChange event doesn't get triggered when the list is
        // first loaded, so the roll string is empty.
        let rollString = this.rollString || defaultAbility;
        let vsRoll1 = this.vsRoll1;
        let vsRoll2 = this.vsRoll2;
        let vsName1 = this.vsName1;
        let vsName2 = this.vsName2;
        let pcRollSkill = this.pcRollSkill;
        let pcRollName = this.pcRollName;
        let noDraw = this.noDraw;

        var sender;
        if (this.scene) {
          sender = this.get('scene.poseChar.name');
        }

        if (!rollString && !vsRoll1 && !pcRollSkill) {
          this.flashMessages.danger("You haven't selected an ability to roll.");
          return;
        }

        if (vsRoll1 || vsRoll2 || vsName1 || vsName2) {
          if (!vsRoll2 || !vsName1 || !vsName2) {
            this.flashMessages.danger("You have to provide all opposed skill information.");
            return;
          }
        }

        if (pcRollSkill || pcRollName) {
          if (!pcRollSkill || !pcRollName) {
            this.flashMessages.danger("You have to provide all skill information to roll for a PC.");
            return;
          }
        }
        this.set('selectSkillRoll', false);
        this.set('rollString', null);
        this.set('vsRoll1', null);
        this.set('vsRoll2', null);
        this.set('vsName1', null);
        this.set('vsName2', null);
        this.set('pcRollSkill', null);
        this.set('pcRollName', null);
        this.set('noDraw', false);

        var destinationId, command;
        if (this.destinationType == 'scene') {
          destinationId = this.get('scene.id');
          command = 'addSceneRoll';
        }
        else {
          destinationId = this.get('job.id');
          command = 'addJobRoll'
        }

        api.requestOne(command, { id: destinationId,
           roll_string: rollString,
           vs_roll1: vsRoll1,
           vs_roll2: vsRoll2,
           vs_name1: vsName1,
           vs_name2: vsName2,
           pc_name: pcRollName,
           pc_skill: pcRollSkill,
           no_draw: noDraw,
           sender: sender }, null)
        .then( (response) => {
          if (response.error) {
            return;
          }
        });
      },
    }
});
