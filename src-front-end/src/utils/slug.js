export function slugify(string) {
  const source = 'áàảãạăắằẳẵặóòỏõọôốồổỗộơớờởỡợeéèẻẽẹêếềểễệúùủũụưứừửữựíìỉĩịđ·/_,:;';
  const target = 'aaaaaaaaaaaoooooooooooooooooeeeeeeeeeeeeuuuuuuuuuuuiiiiid------';
  const pattern = new RegExp(source.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(pattern, char => target.charAt(source.indexOf(char))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
