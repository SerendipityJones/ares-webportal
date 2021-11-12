import { helper } from '@ember/component/helper';

export function undash([string]) {
  return string.toString().split('-').join(' ');
}

export default helper(undash);
