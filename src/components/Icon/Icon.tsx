interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Icon({ name, width, height, className }: IconProps) {
  return (
    <svg className={className} width={width} height={height} aria-hidden="true">
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}
