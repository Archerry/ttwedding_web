export const getImageLink = (link: string) => {
    const subStrings = link.split('/');
    const fidStrings = subStrings[subStrings.length - 1].split('.');
    if (fidStrings.length > 0) {
        fidStrings[0] += '@600_960';
        subStrings[subStrings.length - 1] = fidStrings.join(".");
        return subStrings.join("/");
    }
    return link;
};
