export function formatString(text: string) {
  let newString = text.replace(/\s/g, "-")
                      .replace(/[ç]/i, "c")
                      .replace(/[áâã]/i, "a")
                      .replace(/[éê]/i, "e")
                      .replace(/[í]/i, "i")
                      .replace(/[óô]/i, "o")
                      .replace(/[ú]/i, "u")
                      .toLowerCase();

  return newString;
}