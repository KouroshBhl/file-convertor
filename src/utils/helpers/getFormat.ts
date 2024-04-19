export default function getFormat(file: File) {
  return file.type.split('/')[1];
}
