import axios from 'axios';

const cloudName = 'dynfr1idx';
const uploadPreset = 'peaceapppresset';
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export class CloudinaryService {
  static async uploadImage(file: File): Promise<{ secure_url: string, public_id: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const { secure_url, public_id } = response.data;
    return { secure_url, public_id };
  }
}
