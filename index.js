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

const {select} = require('@inquirer/prompts')

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
                console.log("vamos cadastrar")
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                return
        }
    }
}

start()