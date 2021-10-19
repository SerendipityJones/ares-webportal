import { helper } from '@ember/component/helper';

function spaces([string]) {
  return string.toString().split(',').join(' ');
}

export default helper(spaces);
