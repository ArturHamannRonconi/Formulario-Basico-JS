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

        for(let i = 0; i < inputs.length; i++){
            let check = validator.checkRules(inputs[i]); 
            if(check !== true){
                send = false;
                validator.showErrors(inputs[i], check);
            }
        }

        if(send){
            form.submit();
        }

    },

    // função para checar as regras de cada input
    checkRules: (input) => {
        const toRules = (r) => {
            const [rule, value] = r.split("=");
            return {rule, value};
        };

        let rawRules = input.getAttribute("data-rules");
        let rules = rawRules.split("|").map(toRules);

        switch (rules.rule) {
            case "required":
                return `É necessário preencher este campo!`;    
            break;
            default:
                return true;
            break;
        };
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
        
        for(let i in inputs){
            inputs[i].style = "";
        }
        for(let i = 0; i < errorElements.length; i++){
            errorElements[i].remove();
        }
    }
};

form.addEventListener("submit", validator.handleFunction);