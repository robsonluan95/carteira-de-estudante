import {useState,useEffect,useRef} from 'react'
import "./CentralizarFoto.css"

const TAMANHO=260 // lado do quadrado de recorte, em px
const SAIDA=300 // lado da foto salva, em px
const ZOOM_MAX=3

function limitar(valor,min,max){
    return Math.min(max,Math.max(min,valor))
}

// Mostra a foto escolhida num quadrado para o usuário arrastar e dar zoom,
// e devolve só a parte que ficou dentro do quadrado como JPEG.
const CentralizarFoto = ({src,onConfirmar,onCancelar}) => {
    const [imagem,setImagem]=useState(null)
    const [zoom,setZoom]=useState(1)
    const [pos,setPos]=useState({x:0,y:0})
    const arrasto=useRef(null)

    useEffect(()=>{
        const img=new Image()
        img.onload=()=>{
            const escala=TAMANHO/Math.min(img.width,img.height)
            setImagem(img)
            setZoom(1)
            setPos({x:(TAMANHO-img.width*escala)/2,y:(TAMANHO-img.height*escala)/2})
        }
        img.src=src
    },[src])

    if (!imagem) return null

    const escalaBase=TAMANHO/Math.min(imagem.width,imagem.height)

    // Mantém a imagem cobrindo o quadrado inteiro, sem sobrar borda vazia.
    function ajustar(x,y,z){
        const escala=escalaBase*z
        return {
            x:limitar(x,TAMANHO-imagem.width*escala,0),
            y:limitar(y,TAMANHO-imagem.height*escala,0),
        }
    }

    function mudarZoom(novoZoom){
        const z=limitar(novoZoom,1,ZOOM_MAX)
        // Dá zoom a partir do centro do quadrado.
        const fator=z/zoom
        const meio=TAMANHO/2
        setPos(ajustar(meio-(meio-pos.x)*fator,meio-(meio-pos.y)*fator,z))
        setZoom(z)
    }

    function handlePointerDown(e){
        e.currentTarget.setPointerCapture(e.pointerId)
        arrasto.current={x:e.clientX-pos.x,y:e.clientY-pos.y}
    }

    function handlePointerMove(e){
        if (!arrasto.current) return
        setPos(ajustar(e.clientX-arrasto.current.x,e.clientY-arrasto.current.y,zoom))
    }

    function handlePointerUp(){
        arrasto.current=null
    }

    function handleConfirmar(){
        const escala=escalaBase*zoom
        const canvas=document.createElement("canvas")
        canvas.width=SAIDA
        canvas.height=SAIDA
        canvas.getContext("2d").drawImage(imagem,-pos.x/escala,-pos.y/escala,TAMANHO/escala,TAMANHO/escala,0,0,SAIDA,SAIDA)
        onConfirmar(canvas.toDataURL("image/jpeg",0.8))
    }

    const escala=escalaBase*zoom

  return (
    <div className='centralizar-fundo'>
        <div className='centralizar-janela' role='dialog' aria-label='Centralizar foto'>
            <h2>Centralizar foto</h2>
            <p className='subtitulo'>Arraste a foto e use o zoom para escolher o que aparece no quadrado.</p>
            <div
                className='centralizar-area'
                style={{width:TAMANHO,height:TAMANHO}}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onWheel={(e)=>mudarZoom(zoom-e.deltaY*0.001)}
            >
                <img
                    src={src}
                    alt='Foto escolhida'
                    draggable={false}
                    style={{width:imagem.width*escala,height:imagem.height*escala,transform:`translate(${pos.x}px, ${pos.y}px)`}}
                />
            </div>
            <label className='centralizar-zoom'>
                Zoom
                <input type='range' min={1} max={ZOOM_MAX} step={0.01} value={zoom} onChange={(e)=>mudarZoom(Number(e.target.value))}/>
            </label>
            <div className='centralizar-botoes'>
                <button type='button' className='btn btn-secundario' onClick={onCancelar}>Cancelar</button>
                <button type='button' className='btn' onClick={handleConfirmar}>Usar foto</button>
            </div>
        </div>
    </div>
  )
}

export default CentralizarFoto
