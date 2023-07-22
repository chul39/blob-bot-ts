export async function fetchRequest<T>(url: RequestInfo): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`HTTP Error: [${response.status}] ${response.statusText}`);
    return response.json() as Promise<T>;
  })
}