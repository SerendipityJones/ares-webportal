import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs: function () {
    console.log(this.spells.Life.Heal.special);
    console.log(this.skills.find(({ name }) => name === 'Life').rating);
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
});
