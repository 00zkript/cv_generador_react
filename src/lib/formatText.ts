export const formatearBold = (text: string) => {
    const regesx = /(\*\*)(.*?)(\*\*)/g;
    const newText = text.replace(regesx, '<b>$2</b>');
    return newText;
}

export const formatearList = (text: string) => {
    const regesx = /(-)(.*?)(\n|$)/g;
    const newText = text.replace(regesx, '<li>$2</li>\n');
    return newText;
}
