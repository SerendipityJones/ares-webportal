import { helper } from '@ember/component/helper';

export function pagecase([string]) {
  return string.toString().toLowerCase().split(' ').join('_');
}

export default helper(pagecase);
