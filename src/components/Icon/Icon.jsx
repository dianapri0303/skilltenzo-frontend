export default function Icon({ name, width, height, className }) {
  return (
    <svg className={className} width={width} height={height} aria-hidden="true">
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
