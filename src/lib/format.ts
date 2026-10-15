export function formatHours(minutes: number): string {
  const hours = Math.round((minutes / 60) * 10) / 10;
  return `${hours} Hours`;
}

export function formatStudents(count: number): string {
  if (count >= 1000) {
    const value = Math.round((count / 1000) * 10) / 10;
    return `${value}k students`;
  }
  return `${count} students`;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getStarIcons(rating: number): string[] {
  const fullCount = Math.floor(rating);
  const icons: string[] = Array(fullCount).fill("icon-star-sm");

  if (rating % 1 > 0) {
    icons.push("icon-star-half-sm");
  }
  return icons;
}

export function formatPurchaseDate(enrollmentId: string): string {
  const seconds = parseInt(enrollmentId.substring(0, 8), 16);

  return new Date(seconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatCompletedDate(value: string | null): string {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}