export const formatNumber = (num) => {
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + "M";
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + "K";
    }
    return num?.toString() || 'N/A';
};

export const formatTimeAgo = (dateString) => {
    if (!dateString) {
        return 'N/A';
    }

    const date = new Date(dateString);
    if (isNaN(date)) {
        return 'N/A';
    }

    const now = new Date();
    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30.44); // average month length
    const years = Math.floor(days / 365.25); // leap year average

    const pluralize = (value, unit) => `${value} ${unit}${value !== 1 ? 's' : ''} ago`;

    if (years >= 1) return pluralize(years, 'year');
    if (months >= 1) return pluralize(months, 'month');
    if (days >= 1) return pluralize(days, 'day');
    if (hours >= 1) return pluralize(hours, 'hour');
    if (minutes >= 1) return pluralize(minutes, 'minute');
    if (seconds >= 5) return pluralize(seconds, 'second');
    return 'Just now';
};
