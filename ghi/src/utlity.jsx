export const getImageUrl = (path) => {
    return new URL(`/images/${path}`, import.meta.url).href;
};
