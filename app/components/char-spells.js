import Component from '@ember/component';

export default Component.extend({
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
    } else if (this.spells.Law && this.spells['Law']['Key Maker']) {
      this.spells['Law']['Key Maker']['special'] = this.spells['Law']['Key Maker']['special'].replace(/^(.+); (.+)$/,"<span> $1;</span> <span>$2</span>" );
    }
  }
});
