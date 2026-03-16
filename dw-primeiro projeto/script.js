let contador = 0;//variavel q controla o estado da variaçao 

const valor = document.getElementById("valor");
const botaoIncrementar = document.getElementById("incrementar");
const botaoDecrementar = document.getElementById("decrementar");
const botaoReset = document.getElementById("reset");
const historico = document.getElementById("historico");
// linha 3 a 7 captura de elementos html para manipular
//sempre q tiver o id vou usar document,getelementebyid







botaoIncrementar.addEventListener("click", () => { //adicionando que ficam escutando eventos 
  // () => se chama arefunction(parece com isso) quando a funcao tem so uma linha 
  // ela nao precisa do abre e fecha chaves, ex= const incrementar2 = () => contador++;
	contador++
	valor.textContent=contador
	const div = document.createElement("div");
	div.textContent = contador;
  div.className = "historico-item";
	historico.appendChild(div) //appendChild e quando a gente cria um filho da div historico
  //quem e a div? = 	e esse const div = document.createElement("div");
  //class naame, dando um nome q e historico

})
//historico e o elememto q capturamos la em cima

botaoDecrementar.addEventListener("click", () => {
    contador--
    valor.textContent=contador
    const div = document.createElement("div");//tudo aquilo q se repete a gente 
    // tem u8ma grande chance de criar funçao
    div.textContent = contador;
  div.className = "historico-item";
	historico.appendChild(div)
})

botaoReset.addEventListener("click", () => {
  contador = 0;
	valor.textContent = contador;
  historico.innerHTML = "";
});

//aqui vamos comocar algumacoisa mais simples 

function atualizarInterface() {
  valor.textContent = contador;
}

function adicionarHistorico() {
  const div = document.createElement("div");
  div.textContent = contador;
  div.className = "historico-item";
  historico.appendChild(div);
}
  //Agora modifique os eventos:
botaoIncrementar.addEventListener("click", () => {
  contador++;
  atualizarInterface();
  adicionarHistorico();
});

botaoDecrementar.addEventListener("click", () => {
  contador--;
  atualizarInterface();
  adicionarHistorico();
});

botaoReset.addEventListener("click", () => {
  contador = 0;
  atualizarInterface();
  historico.innerHTML = "";
});

//proposta do react = ele identifica que o estado
//  muda, ve na sua arvore qual estado que foi mudado e ele mesmo foi mudado
//conclusao da aula : uma revisao sobre DOM