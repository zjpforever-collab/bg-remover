import type { ProcessResult, ApiResponse } from '../types';

// Change this to your Workers URL after deployment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bgremove.zjpforever.workers.dev';

export async function processImageApi(file: File): Promise<ProcessResult> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/remove-bg`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData: ApiResponse = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `HTTP error: ${response.status}`,
      };
    }

    // The response should be a blob/image
    const blob = await response.blob();
    
    if (blob.type.startsWith('image/')) {
      const dataUrl = await blobToDataUrl(blob);
      return {
        success: true,
        data: dataUrl,
      };
    } else {
      return {
        success: false,
        error: 'Invalid response format',
      };
    }
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a JPG, PNG, or WebP image',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image size must be less than 10MB',
    };
  }

  return { valid: true };
}

export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
