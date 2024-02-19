interface Props {
  width: number;
  height: number;
}

export function Skeleton({ height, width }: Props) {
  return (
    <div className="w-full max-w-md animate-pulse">
      <div style={{ height, width }} className="bg-gray-300 rounded-sm"></div>
    </div>
  );
}
