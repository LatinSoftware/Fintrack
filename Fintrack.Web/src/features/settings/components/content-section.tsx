interface ContentSectionProps {
  title: string
  desc: string
  children: React.JSX.Element
  button?: React.JSX.Element
}

export default function ContentSection({
  title,
  desc,
  button,
  children,
}: ContentSectionProps) {
  return (
    // <div className="flex flex-1 flex-col">
    //   <div className="flex-none">
    //     <h3 className="text-lg font-medium">{title}</h3>
    //     <p className="text-muted-foreground text-sm">{desc}</p>
    //   </div>
    //   <Separator className="my-4 flex-none" />
    //   <div className="faded-bottom h-full w-full overflow-y-auto scroll-smooth pr-4 pb-12">
    //     <div className="-mx-1 px-1.5">{children}</div>
    //   </div>
    // </div>

    <div className="container mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pt-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground font-medium">{desc}</p>
        </div>

        <div className="flex items-center gap-4">{button}</div>
      </div>

      {children}
    </div>
  )
}
