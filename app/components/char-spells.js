import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';

export default Component.extend({

  sortedSpells: computed( 'spells', function() {
    const sortObject = obj => Object.keys(obj).sort().reduce((res, key) => (res[key] = obj[key], res), {});
    var sortingList = sortObject(this.get('spells'));
    Object.entries(sortingList).forEach(([cat, list]) => sortingList[cat] = sortObject(list));
    return sortingList;
  }),

  didReceiveAttrs: function () {
    if (this.spells.Life && this.spells.Life.Heal && this.spells.Life.Heal.special) {
      var cap = this.skills.find(({ name }) => name === 'Life').rating;
      var times = ""
      switch(cap) {
        case 1:
          times = "once";
          break;
        case 2:
          times = "twice";
          break;
        case 3:
          times = "thrice";
          break;
        default:
          times = cap + " times"
      }
      this.spells.Life.Heal.special = this.spells.Life.Heal.special.replace("one time per Life dot",times);
    }
    if (this.spells.Chaos && this.spells['Chaos']['Key Maker']) {
      this.spells['Chaos']['Key Maker']['special'] = this.spells['Chaos']['Key Maker']['special'].replace(/^(.+); (.+)$/,"<span> $1;</span> <span>$2</span>" );
    }
    if (this.spells.Law && this.spells['Law']['Key Maker']) {
      this.spells['Law']['Key Maker']['special'] = this.spells['Law']['Key Maker']['special'].replace(/^(.+); (.+)$/,"<span> $1;</span> <span>$2</span>" );
    }
    for (const [key, value] of Object.entries(this.spellnotes)) {
      if (value) {
        ["Chaos","Elemental","Heart","Law","Life","Sight"].forEach((aspect) => {
          if (this.spells[aspect] && this.spells[aspect][key]) {
            this.spells[aspect][key]['note'] = value;
          }
        });
      }
    }
  }
});
