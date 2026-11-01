export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'text-right items-start'

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-muted">
          <span className="size-1.5 rounded-full bg-brand" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-extrabold leading-[1.35] text-white sm:text-3xl lg:text-[2.6rem] lg:leading-[1.3]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-sm leading-8 text-muted sm:text-base">{description}</p>
      )}
    </div>
  )
}
