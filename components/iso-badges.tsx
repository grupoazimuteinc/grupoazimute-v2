import Image from 'next/image'

export default function IsoBadges() {
    const cacheVersion = Date.now();
    
    return (
        <div className="fixed bottom-[15px] left-[15px] smartphone:bottom-[10px] smartphone:left-[10px] flex flex-row gap-1 z-50">
            <div className="h-[60px] w-[60px] smartphone:h-[50px] smartphone:w-[50px] transition-all hover:opacity-80 hover:scale-105">
                <Image
                    src={`/images/selo_iso_9001_grupo_azimute.png?v=${cacheVersion}`}
                    alt="Selo ISO 9001 - Grupo Azimute"
                    width={80}
                    height={80}
                    className="h-[60px] w-[60px] smartphone:h-[50px] smartphone:w-[50px] object-contain"
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>
            {/* <div className="h-[60px] w-[60px] smartphone:h-[50px] smartphone:w-[50px] transition-all hover:opacity-80 hover:scale-105">
                <Image
                    src={`/images/selo_iso_45001_grupo_azimute.png?v=${cacheVersion}`}
                    alt="Selo ISO 45001 - Grupo Azimute"
                    width={80}
                    height={80}
                    className="h-[60px] w-[60px] smartphone:h-[50px] smartphone:w-[50px] object-contain"
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div> */}
            <div className="h-[60px] w-[60px] smartphone:h-[50px] smartphone:w-[50px] transition-all hover:opacity-80 hover:scale-105">
                <Image
                    src={`/images/selo_saude_e_seguranca_no_trabalho_grupo_azimute.png?v=${cacheVersion}`}
                    alt="Selo Saúde e Segurança no Trabalho - Grupo Azimute"
                    width={80}
                    height={80}
                    className="h-[60px] w-[60px] smartphone:h-[50px] smartphone:w-[50px] object-contain"
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>
        </div>
    )
}
