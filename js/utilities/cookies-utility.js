function saveToCookies(id, obj) {
  const objString = JSON.stringify(obj);
  document.cookie = `${id}=${encodeURIComponent(objString)}; path=/; expires=${new Date('2024-12-31').toUTCString()}`;
}

function getFromCookies(id) {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find(c => c.trim().startsWith(id + '='));
  if (cookie) {
    const value = cookie.split('=')[1];
    const decodedValue = decodeURIComponent(value);
    return JSON.parse(decodedValue);
  }
  return null;
}
