export const truncate = (str: string, max = 24) =>
    str.length > max ? str.slice(0, max - 1) + "…" : str;

export const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};