import { helper } from '@ember/component/helper';

export function undash([string]) {
  return string.toString().split(' ').join('-').toLowerCase();
}

export default helper(undash);
