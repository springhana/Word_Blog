import axios from 'axios';

export const PostImage = async (
  file: File | undefined,
  id: string,
  type: 'card' | 'note' | 'user' | 'test'
) => {
  let fileUrl;
  let fileName;
  if (file) {
    fileName = encodeURIComponent(new Date() + file.name);
    await axios
      .post(`/api/post/image?file=${fileName}&id=${id}&state=${type}`)
      .then(async res => {
        const formData = new FormData();
        Object.entries({ ...res.data.fields, file }).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        return await fetch(res.data.url, { method: 'POST', body: formData });
      })
      .then(res => {
        fileUrl = res.url;
      });
  }
  return { url: fileUrl, name: fileName };
};
