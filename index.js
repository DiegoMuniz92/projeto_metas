// Arrays, objetos
/*
let meta = {
    value: "Ler um livro por mês",
    checked: true
}

// Organização de várias metas
let metas = [
    meta,
    {
        value: "caminhar 20 minutos todos os dias",
        ckecked: false
    }
]

console.log(metas[0].value)
*/

const {select, input, checkbox} = require('@inquirer/prompts')
const { error } = require('console')
const fs = require("fs").promises

let mensagem = "Bem vindo ao App"



const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro){ 
        metas = []
    }
 }

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null,2))
}

const cadastraMeta = async () => {
    const meta = await input({ message: "Digite a meta: "})

    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia."
        return
    }

    /*metas.push(
        { value: meta, checked: false}
    )*/

    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar e desmarcar e o enter para finalizar esta etapa.",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0) {
        console.log("nenhuma meta selecionada!")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) concluída(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log("Não existem metas realizadas! :(")
    }

    await select ({
        message: "Metas realizadas" + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return  meta.checked != true
    }) 

    if(abertas.length == 0) {
        console.log("Não existem metas abertas! :)")
    }

    await select ({
        message: "Metas abertas" + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensADeletar.length == 0) {
        console.log("Nenhum item para deletar!")
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) deletada(s) com sucesso!")
}

const mostrarMesagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagen = ""
    }
}

const start = async () => {

    await carregarMetas()
    await salvarMetas()
    
    while(true){
        mostrarMesagem()

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "cadastra meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar meta",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
        ]
    })
        switch(opcao) {
            case "cadastrar":
                await cadastraMeta()
                console.log(metas)
                console.log("vamos cadastrar")
                break
            case "listar":
                await listarMetas()
                console.log("vamos listar")
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                return
        }
    }
}

start()