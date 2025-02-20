export const chordName2id = (name: string) => name.replace("#", "is").replace("#", "is").replace("/", "_");
export const chordId2name = (name: string) => name.replace("is", "#").replace("is", "#").replace("_", "/");

export function svgElement2blob(svgEl: SVGSVGElement) {
  svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const svgData = svgEl.outerHTML;
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  return new Blob([preface, svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
}
export function saveSvg(svgEl: SVGSVGElement, name: string) {
  const svgBlob = svgElement2blob(svgEl);
  saveBlob(svgBlob, name);
}
export function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
