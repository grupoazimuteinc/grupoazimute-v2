import Image from 'next/image'

export default function IsoBadges() {
    const cacheVersion = Date.now();
    
    return (
        <div className="fixed bottom-[35px] left-[35px] flex flex-row gap-2 z-50">
            <div className="h-[80px] w-[80px] transition-all hover:opacity-80 hover:scale-105">
                <Image
                    src={`/images/selo_iso_9001_grupo_azimute.png?v=${cacheVersion}`}
                    alt="Selo ISO 9001 - Grupo Azimute"
                    width={80}
                    height={80}
                    className="h-[80px] w-[80px] object-contain"
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>
            <div className="h-[80px] w-[80px] transition-all hover:opacity-80 hover:scale-105">
                <Image
                    src={`/images/selo_iso_45001_grupo_azimute.png?v=${cacheVersion}`}
                    alt="Selo ISO 45001 - Grupo Azimute"
                    width={80}
                    height={80}
                    className="h-[80px] w-[80px] object-contain"
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>
        </div>
    )
}
