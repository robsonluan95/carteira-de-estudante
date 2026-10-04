// Lê a imagem escolhida, reduz para no máximo 300x400 e devolve um data URL JPEG.
// A foto fica pequena (dezenas de KB) e cabe no documento do Firestore (limite de 1 MB).
export function reduzirFoto(arquivo,larguraMax=300,alturaMax=400){
    return new Promise((resolve,reject)=>{
        if (!arquivo.type.startsWith("image/")){
            reject(new Error("O arquivo precisa ser uma imagem"))
            return
        }
        const url=URL.createObjectURL(arquivo)
        const img=new Image()
        img.onload=()=>{
            const escala=Math.min(1,larguraMax/img.width,alturaMax/img.height)
            const canvas=document.createElement("canvas")
            canvas.width=Math.round(img.width*escala)
            canvas.height=Math.round(img.height*escala)
            canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height)
            URL.revokeObjectURL(url)
            resolve(canvas.toDataURL("image/jpeg",0.8))
        }
        img.onerror=()=>{
            URL.revokeObjectURL(url)
            reject(new Error("Não foi possível ler a imagem"))
        }
        img.src=url
    })
}
