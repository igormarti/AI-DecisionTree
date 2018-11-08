
//estrutura do problema.
var problem = {
    init_state:"III",
    end_state:"VIII",
    action: [
        ["I",1,280],["II",2,280],['IV',3,240],["V",4,770],['VI',5,180]
        ,["VIII",6,770],['VII',7,1330],['VII',8,1000],['IX',9,830],['VIII',10,1400]
        ],
    costs:[
        ["I",1,280],["II",1,280],["III",2,230],['III',3,240],["III",8,1000]
        ,["IV",4,770],['IV',6,770],['IV',7,1330],['V',5,180],['VII',10,830],['VII',9,1400]
        ]
}
//Variável que receberá a solução.
var soluction = null;
//Variável que receberá a borda.
var border = [];
//Função para cria o nó.
function createNode(init_state,noFather,action,cost,profundity){
    var node = {
        state:init_state,
        noFather: noFather,
        action:action,
        cost:cost,
        profundity:profundity
    }

    return node;
}

//função criada apenas para exibir resultos no HTML
function logar() {
    // onde vai ser escrito o log
    var logger = document.getElementById('resultado');
    // verifica da parâmetro passaod para a função, separado por vírgula
    for (var i = 0; i < arguments.length; i++) {
       //se for um objeto, serializa para melhorar a visualização e adiciona na div, e depois pula uma linha
       if (typeof arguments[i] == 'object') {
           logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '';
       } else { 
           //senão, simplesmente adiciona na div
           logger.innerHTML += arguments[i] + ' ';
       }
   }
}

//Função que fará os testes.
function test(problem,node){
    logar("Testando... Atual:",node.state,", Objetivo:",problem.end_state,", Ação:",node.action, "<br>");
    if(problem.end_state === node.state){
        soluction = node;
        logar("<br>Encontramos o objetivo:",soluction, "<br><br>");
        return true;
    }else{
       return false 
    }
}

//Função para remover o primeiro da borda.
function removerFisrt(border){
    var no;
    if(border){ 
        no = border[0];
        border.splice(0,1);
    }
    return no;
}
//Função que pegará os nós sucessores.
function successor(no,problem){

    var actions_possibles = [];
    //Procurando as ações possiveis.
    for(var i =0; i < Object.keys(problem.costs).length;i++){
        if(problem.costs[i][0]===no.state){
            actions_possibles.push(problem.costs[i][1]);
        }
    }
    //Procurando os problemas ações.
    var problem_actions = [];
    for(var i=0; i< Object.keys(actions_possibles).length;i++){
        for(var j =0; j <Object.keys(problem.action).length;j++){
            if(problem.action[j][1] === actions_possibles[i]){
                problem_actions.push(problem.action[j]);
            }
        }
    }
    
    return problem_actions;
    
}
//Função que adicionará os nós sucessores em uma borda.
function addInBorder(border,sucessors){
    for(var i =0;i<Object.keys(sucessors).length;i++){
        border.push(sucessors[i]);
    }
}
//Função para expadir.
function expand(node,problem){
    var sucessors = [];
    var problem_actions = [];
    problem_actions = successor(node,problem);
    for(var i =0; i < Object.keys(problem_actions).length;i++){
         var no = createNode(problem_actions[i][0],node.state,problem_actions[i][1],problem_actions[i][2]+node.cost,node.profundity+1);
         sucessors.push(no);
    }
    return sucessors;
 }
//Funçao que busca na árvore.
function searchInTree(problem,border){
    
    border.push(createNode(problem.init_state,null,null,0,0)); 
    while(soluction === null){
        if(border===null || border === undefined || ''){logar("Ocorreu uma falha");}
        var node = removerFisrt(border);
        if(test(problem,node)){logar("Chegamos ao destino:",problem.end_state," pela ação ", node.action," com o custo de R$", node.cost,"."); break}
        addInBorder(border,expand(node,problem));
    }
}

//Funçao princiapl onde o fluxo começa ao receber o evento click.
var main = function(){
    logar("Objetivo Final:",problem.end_state," <br><br>");
   
    console.log("Objetivo Final:",problem.end_state," <br>");
    searchInTree(problem,border);
}


