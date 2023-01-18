export function toUrl(item: string) {
  return item.replaceAll(/[ :,'.]+/g, '-').toLowerCase();
}

export function getDate(date: string) {
  return new Date(date).toLocaleString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function checkType(el: string) {
  return el === 'movie' ? 'movie' : 'tv';
}
