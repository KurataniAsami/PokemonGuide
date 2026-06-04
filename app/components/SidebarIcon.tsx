import Image from 'next/image'
import Link from 'next/link'

export default function SidebarIcon() {
  return (
    <div>
      <Link href="./">
        <Image
          // 以下は全部必須
          src="/images/ball.png" 
          alt='モンスターボール'   
          width={28}
          height={28}
        />
      </Link>
    </div>
  )
}