export function toUrl(item: string) {
  return item.replaceAll(/[ :,'.]+/g, '-').toLowerCase();
}
