const BASE_URL = "http://localhost:3000/hiring/application/screening";

export async function fetchScreening(stageId: string) {
  const res = await fetch(`${BASE_URL}/${stageId}/decision`, {
    /*  TODO our real world header the hardcoded role is form mock purpose later one must be replaced with JWT backend logic
        headers: {
            Authorization: `Bearer ${token}`
        }
 */

    headers: {
      "x-user-role": "recruiter",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function saveScreening(
  stageId: string,
  data: { note: string; decision: string },
) {
  const res = await fetch(`${BASE_URL}/${stageId}/decision`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-role": "recruiter",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save decision");
  return res.json();
}
