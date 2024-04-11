const hexList: string[] = Array.from(new Array(16), (_item, index) =>
  index.toString(16)
);
export  const EmptyUUId = `00000000-0000-0000-0000-000000000000`
export function buildUUID(): UUID {
  let uuid = "";
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += "-";
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8];
    } else {
      uuid += hexList[(Math.random() * 16) | 0];
    }
  }
  return uuid.replace(/-/g, "");
}
export function isEmptyUUId(v:UUID) : v is "00000000-0000-0000-0000-000000000000"{
  return EmptyUUId === v
}
