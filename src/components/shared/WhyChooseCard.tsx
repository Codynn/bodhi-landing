import Image from 'next/image'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { WhyChooseFeature } from '@/types/home/why-choose.types'



export function WhyChooseCard({
  title,
  description,
  icon,
  iconBg,
}: WhyChooseFeature) {
  const isString = typeof icon === 'string'
  const Icon = !isString ? (icon as LucideIcon) : null

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
      <CardContent className="flex flex-col items-center text-center gap-2 px-6 py-6">
        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          {isString ? (
            <Image
              src={icon as string}
              alt={title}
              width={28}
              height={28}
              className="brightness-0 invert"
            />
          ) : (
            Icon && <Icon className="w-7 h-7  text-white" strokeWidth={1.8} />
          )}
        </div>

        {/* Title */}
        <h3 className="text-[18px] sm:text-[18px] md:text-[16px] lg:text-[18px] font-bold text-gray-800">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[16px] sm:text-[16px] md:text-[18px] lg:text-[18px]  text-gray-500 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}