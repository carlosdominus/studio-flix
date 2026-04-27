
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
}

const FOLDER_ID = '1xuJ1TiLsIHAgRbuD5GmUr7qojlDnjclz';

export const fetchLessonsFromDrive = async (accessToken: string): Promise<DriveFile[]> => {
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+trashed=false&fields=files(id,name,mimeType,webViewLink)&key=${import.meta.env.VITE_GOOGLE_API_KEY || ''}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Error fetching files from Drive');
  }

  const data = await response.json();
  return data.files || [];
};
