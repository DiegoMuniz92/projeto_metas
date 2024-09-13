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

let meta = {
    value: "Tomar 3L de água por dia.",
    checked: false
}

let metas = [meta]

const listarMetas = async () => {
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

const cadastraMeta = async () => {
    const meta = await input({ message: "Digite a meta: "})

    if(meta.length == 0) {
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push(
        { value: meta, checked: false}
    )
}

const start = async () => {
    
    while(true){

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
            case "sair":
                return
        }
    }
}

start()