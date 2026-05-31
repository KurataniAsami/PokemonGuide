import Image from 'next/image'

export default function SidebarIcon() {
  return (
    <div>
      <Image
        // 以下は全部必須
        src="/images/ball.png" 
        alt='モンスターボール'   
        width={28}
        height={28}
      />
    </div>
  )
}