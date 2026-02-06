const START_MARKER = "<!-- docs:start -->";
const END_MARKER = "<!-- docs:end -->";

export async function extractDocs(readmePath: string): Promise<string> {
  const content = await Bun.file(readmePath).text();

  const startIdx = content.indexOf(START_MARKER);
  const endIdx = content.indexOf(END_MARKER);

  if (startIdx === -1 || endIdx === -1) {
    throw new Error(
      `README.md must contain ${START_MARKER} and ${END_MARKER} markers`
    );
  }

  if (endIdx <= startIdx) {
    throw new Error(
      `${END_MARKER} must come after ${START_MARKER} in README.md`
    );
  }

  return content.slice(startIdx + START_MARKER.length, endIdx).trim();
}
