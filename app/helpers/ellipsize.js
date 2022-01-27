import { helper } from '@ember/component/helper';

export function ellipsize([string], { limit }) {
  let text = '';

  if (string != null && string.length > 0) {
    text = string.substr(0, limit).trim();

    if (string.length > limit) {
      text += '...';
    }
  }

  return text;
}

export default helper(ellipsize);
