export function formatHours(minutes) {
  const hours = Math.round((minutes / 60) * 10) / 10;
  return `${hours} Hours`;
}

export function formatStudents(count) {
  if (count >= 1000) {
    const value = Math.round((count / 1000) * 10) / 10;
    return `${value}k students`;
  }
  return `${count} students`;
}

export function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export function getStarIcons(rating) {
  const fullCount = Math.floor(rating);
  const icons = Array(fullCount).fill("icon-star-sm");

  if (rating % 1 > 0) {
    icons.push("icon-star-half-sm");
  }
  return icons;
}

export function formatPurchaseDate(enrollmentId) {
  const seconds = parseInt(enrollmentId.substring(0, 8), 16);

  return new Date(seconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
