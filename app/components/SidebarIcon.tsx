import Image from 'next/image'

export default function SidebarIcon() {
  return (
    <div className='ml-5 mb-5'>
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