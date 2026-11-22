export function ArtPlate() {
  return (
    <picture className="artplate">
      <source media="(max-width: 650px)" srcSet="./art/section-study-small.webp" />
      <img
        src="./art/section-study.webp"
        width={1500}
        height={1000}
        alt=""
        fetchPriority="high"
        decoding="async"
      />
    </picture>
  );
}
