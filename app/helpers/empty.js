import { helper } from '@ember/component/helper';

export function empty(obj) {
  return Object.keys(obj[0]).length === 0;
}

export default helper(empty);
