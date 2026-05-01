const BASE_URL = "http://localhost:3000/hiring/application/screening";

export async function fetchScreening(stageId: string) {
  const res = await fetch(`${BASE_URL}/${stageId}/decision`, {
    headers: {
      "x-user-role": "recruiter", // <--- Add this
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
      "x-user-role": "recruiter", // <--- Add this
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save decision");
  return res.json();
}
