export function validate(req: XMLHttpRequest): boolean {
  return req.status === 200 &&
  JSON.parse(req.responseText).hasOwnProperty('RESULT');
}