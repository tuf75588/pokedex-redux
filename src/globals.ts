export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export function importImages(image: string, filetype?: string) {
  return `${process.env.PUBLIC_URL}/assets/images/${image}.${
    filetype || 'png'
  }`;
}
