const form = document.querySelector("#form");
const validator = {

    // função manipulativa
    handleFunction: (e) => {
        // previnindo a ação padrão 
        e.preventDefault();

        // variáveis
        let send = true;
        const inputs = form.querySelectorAll("input");

        // limpando os erros existentes
        validator.clearErrors(inputs);

        for(let input of inputs){
            let check = validator.checkRules(input); 
            if(check !== true){
                send = false;
                validator.showErrors(input, check);
            }
        }

        if(send){
            form.submit();
        }

    },

    // função para checar as regras de cada input
    checkRules: (input) => {
        let rawRules = input.getAttribute("data-rules");

        if(rawRules !== null){
            const toRules = (r) => {
                const [rule, value] = r.split("=");
                return {rule, value};
            };            
            let rules = rawRules.split("|").map(toRules);
            for(let i in rules){
                switch (rules[i].rule){
                    case 'required':
                        if(input.value == ''){
                            return "o campo não pode ser vazio"
                        }
                    break;
                    case 'min':
                        if(input.value.length < rules[1].value){
                            return `o campo precisa de pelo menos ${rules[1].value} caracteres`;
                        }   
                    break;
                }
            }
        }
        return true
    },

    // função para mostrar os erros
    showErrors: (input, error) => {
        const errorElement = document.createElement("div");
        errorElement.classList.add("error");
        errorElement.innerHTML = error;
        input.style.borderColor = "#EC2300";

        input.parentElement.insertBefore(errorElement, input);
    },

    // função que limpa os erros
    clearErrors: (inputs) => {
        let errorElements = document.querySelectorAll(".error");
        
        for(let input of inputs){
            input.style = "";
        }
        for(let error of errorElements){
            error.remove();
        }
    }
};

form.addEventListener("submit", validator.handleFunction);
