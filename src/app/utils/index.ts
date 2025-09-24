export function fromFullNameToInitials(name: string) {
  const splitNamedArr = name.split(" ");
  let initial = "";
  for (const name of splitNamedArr) {
    initial += name.substring(0, 1);
  }
  return initial;
}

export function randomizeColor() {
  return Math.floor(Math.random() * 4 + 1);
}
