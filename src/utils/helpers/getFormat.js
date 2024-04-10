export default function getFormat(file) {
  return file.type.split('/')[1];
}
