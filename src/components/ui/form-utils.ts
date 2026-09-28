export function getFieldError(
  field: any,
): string | undefined {
  if (!field.state.meta.isTouched) {
    return undefined;
  }

  const error = field.state.meta.errors?.[0];

  if (error == null) {
    return undefined;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (
    typeof error === 'object' &&
    'message' in error &&
    error.message != null
  ) {
    return String(error.message);
  }

  return undefined;
}