import Component from '@ember/component';
import { inject as service } from '@ember/service';
import EmberObject, { computed } from '@ember/object';

export default Component.extend({
  gameApi: service(),
  flashMessages: service(),
  currentNote: computed( 'spellnotes', 'spells', function() {
    var theNote = this.get('spellnotes')[this.spell];
    if (theNote) {
      theNote = theNote.replace(this.get('spells')[this.category][this.spell].prefix,"");
    } else {
      theNote = "None";
    }
    return theNote;
  }),

  actions: {
    noteSet() {
        this.reloadChar();
    },
    setNote: function(spell) {
      var note = this.newNote;
      if (!note) {
        note = "";
      }
      let api = this.gameApi;
      api.requestOne('charSetSpellNote', {
         id: this.get('char.id'),
         spell: this.spell,
         note: note
       }, null)
      .then( (response) => {
        if (response.error) {
          return;
        } else if (response.success) {
          this.flashMessages.success(response.success);
          this.noteSet();
        }
      });
    }
  }

});
