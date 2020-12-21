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
            const returnToMainFunction = validator.checkReturn(rules);

            return returnToMainFunction;
        };
    },

    // função para retornar ao check
    checkReturn: (rules) => {
        const inputs = form.querySelectorAll("input");
        for(let input of inputs){
            switch (rules.rule){
                case 'required':
                    if(input.value == ''){
                        return "o campo não pode ser vazio"
                    }
                break;
                case 'min':
                    if(input.value.length < rules.value[1]){
                        return `o campo precisa de pelo menos ${rules.value[1]} caracteres`;
                    }   
                break;
                default:
                    return true;
                break;
            }
        }
    },

    // função para mostrar os erros
    showErrors: (input, error) => {
        const errorElement = document.createElement("div");
        errorElement.classList.add("error");
        errorElement.innerHTML = error;
        input.style.borderColor = "#F00";

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
