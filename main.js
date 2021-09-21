'use strict';

const validar = /Preencha somente com letras/g;
const validar2 = /Preenchimento Obrigatório/g;
const validar3 = /Preencha somente com Números/g;

//função para verificar dados tipo string
const eTexto = (texto) => /^[a-zA-Z]+$/.test(texto);

//completar nome
function completarNome(){
	const nome = document.getElementById("txtNome");
	const sobrenome = document.getElementById("txtSobrenome");
	const nomeCompleto = document.getElementById("txtNomeCpl");
		
		if(!validar.test(nome.value) && !validar.test(sobrenome.value) && !validar2.test(nome.value) && !validar2.test(sobrenome.value)){
			const receber = nome.value + " " + sobrenome.value
			nomeCompleto.value = receber;
			nomeCompleto.disabled = "true";
			nomeCompleto.style.color = "black";
		} 
} 

//validação dos nomes
function validarNome(){
	const nome = document.getElementById("txtNome");
	if(nome.value == ""){
		campoObrig("txtNome");
	} else {
		if(!eTexto(nome.value)){
		erroAlerta("txtNome", "red");
		nome.value = "Preencha somente com letras";
		} else {
			erroAlerta("txtNome", "black");
		}
	}
}

function validarNomeComp(){
	const nomeCompleto = document.getElementById("txtNomeCpl");
	if(!eTexto(nomeCompleto.value)){
		erroAlerta("txtNomeCpl", "red");
		nomeCompleto.value= "Preencha somente com letras";
	}
}

function validarSobrenome(){
	const sobrenome = document.getElementById("txtSobrenome");
	if(sobrenome.value == ""){
		campoObrig("txtSobrenome");
	}else{
		if(!eTexto(sobrenome.value)){
			erroAlerta("txtSobrenome", "red");
			sobrenome.value= "Preencha somente com letras";
		} else {
			erroAlerta("txtSobrenome", "black");
		}
	}
}

//eventos para nome
document.getElementById("txtNome").addEventListener("focusout", validarNome);
document.getElementById("txtSobrenome").addEventListener("focusout", validarSobrenome);
document.getElementById("txtNomeCpl").addEventListener("focusout", validarNomeComp);
document.getElementById("txtSobrenome").addEventListener("focusout", completarNome);

//função para trazer os valores pelo json
const preencherFormualario = (endereco) => {
	document.getElementById("txtRua").value = endereco.logradouro;
	document.getElementById("txtBairro").value = endereco.bairro;
	document.getElementById("txtCidade").value = endereco.localidade;
}

//fução para verificar dados tipo int
const eNumero = (numero) => /^[0-9]+$/.test(numero);

//consumindo api viaCep
const pesquisarCep = async() => {
	const cep = document.getElementById("txtCep").value;
	const url = `http://viacep.com.br/ws/${cep}/json/`;
	
	//validar cep 
	if(cep == ""){
		campoObrig("txtCep", "orange");
	} else {
		if(cep.length == 8 && eNumero(cep)){
			const dados = await fetch(url);
			const endereco = await dados.json();
				if(endereco.hasOwnProperty("erro")){
					document.getElementById("txtCep").value = "CEP não encontrado";
					erroAlerta("txtCep", "orange");
				} else {
					document.getElementById("txtCep").addEventListener('focusout', mascaraCep);
					preencherFormualario(endereco);
				}
		} else {
			document.getElementById("txtCep").value = "CEP Incorreto";
			erroAlerta("txtCep", "red");
		}
	}
}

//evento do consumo api
document.getElementById("txtCep").addEventListener("focusout", pesquisarCep)

function validarNumero(){
	const numero = document.getElementById("txtNumero").value;
	if(numero == ""){
		campoObrig("txtNumero");
	} else {
		if(!eNumero(numero)){
		erroAlerta("txtNumero", "red");
		document.getElementById("txtNumero").value = "Preencha somente com Números";
	} else {
		erroAlerta("txtNumero", "black");
		}
	}
}

document.getElementById("txtNumero").addEventListener("focusout", validarNumero)

function validarCidade(){
	const cidade = document.getElementById("txtCidade").value;
	if(cidade == ""){
		campoObrig("txtCidade");
	} else {
		if(eNumero(cidade)){
		erroAlerta("txtCidade", "red");
		document.getElementById("txtCidade").value = "Preencha somente com Letras";
	} else {
		erroAlerta("txtCidade", "black");
		}
	}
}
document.getElementById("txtCidade").addEventListener("focusout", validarCidade)

function validarBairro(){
	const bairro = document.getElementById("txtBairro").value;
	if(bairro == ""){
		campoObrig("txtBairro");
	} else {
		if(eNumero(bairro)){
		erroAlerta("txtBairro", "red");
		document.getElementById("txtBairro").value = "Preencha somente com Letras";
	} else {
		erroAlerta("txtBairro", "black");
		}
	}
}
document.getElementById("txtBairro").addEventListener("focusout", validarBairro)

//confirmação email
function verificarEmail(){
	const email = document.getElementById("txtEmail");
	const emailConf = document.getElementById("txtEmailConf");
	//const verifica = `\\[${email}\\`
	if(email.value != emailConf.value){
		erroAlerta("txtEmailConf", "orange");
		erroAlerta("txtEmail", "orange");
		emailConf.value = "Os emails devem ser iguais";
	} 	
}

function emailVazio(){
	const email = document.getElementById("txtEmail");
	if(email.value == ""){
		campoObrig("txtEmail");
	} else {
		erroAlerta("txtEmail", "orange");
	}
}

function emailConfVazio(){
	const emailConf = document.getElementById("txtEmailConf");
	if(emailConf.value == ""){
		campoObrig("txtEmailConf");
	} else {
		erroAlerta("txtEmailConf", "orange")
	}
}

//evento confirmação email
document.getElementById("txtEmail").addEventListener("focusout", emailVazio);
document.getElementById("txtEmailConf").addEventListener("focusout", emailConfVazio);
document.getElementById("txtEmailConf").addEventListener("focusout", verificarEmail);


//mascaras e validação  
function mascaraTelefone(){
	const telefone = document.getElementById("txtTelefone");
	if(telefone.value == ""){
		campoObrig("txtTelefone");
	} else if(eTexto(telefone.value)){
		erroAlerta("txtTelefone", "red");
		telefone.value = "Preencha somente com Números";
		} else {
			telefone.value = telefone.value.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
			erroAlerta("txtTelefone", "black");
		}
}

function mascaraCelular(){
	const celular = document.getElementById("txtCelular");
	if(celular.value == ""){
		campoObrig("txtCelular");
	} else if(eTexto(celular.value)){
		erroAlerta("txtCelular", "red");
		celular.value = "Preencha somente com Números";
		} else {
			celular.value = celular.value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
			erroAlerta("txtCelular", "black");
		}
}

function mascaraCep(){
	const cep = document.getElementById("txtCep");
	cep.value = cep.value.replace(/^(\d{5})(\d{3})/, "$1-$2");
}

//eventos mascara input 
document.getElementById("txtTelefone").addEventListener("focusout", mascaraTelefone);
document.getElementById("txtCelular").addEventListener("focusout", mascaraCelular);

//erros ou alertas 
function erroAlerta( id, cor){
	const varStyle = document.getElementById(id);
	const corStyle = cor;
	const bordaStyle = varStyle.style.borderBottomColor = corStyle;
	const letraStyle = varStyle.style.color = corStyle;
}

//função para preenchimento obrigatorio
function campoObrig(id){
	document.getElementById(id).value = "Preenchimento Obrigatório";
	erroAlerta(id, "orange");
}


//função para ativar/desativar o botão
function ativarBtn(status){
	const btn = document.getElementById("btnCadastrar")
	if(status == "true"){
		btn.disabled = true
		btn.style.backgroundColor = "#db3a2c"
	} else {
		btn.disabled = false
	}
}

function receberId(nomeId){
	const id = document.getElementById(nomeId)
	return id
}

//função para verificar se o campo está com avisos
function verificarCampo(){
	
	const nome = receberId("txtNome");
	const sobrenome = receberId("txtSobrenome");
	const nomeCpl = receberId("txtNomeCpl");
	const telefone = receberId("txtTelefone");
	const celular = receberId("txtCelular");
	const email = receberId("txtEmail");
	const emailConf = receberId("txtEmailConf");
	const cep = receberId("txtCep");
	const cidade = receberId("txtCidade");
	const bairro = receberId("txtBairro");
	const rua = receberId("txtRua");
	const numero = receberId("txtNumero");
	
	if(validar.test(nome.value) || validar2.test(nome.value)){
		ativarBtn("true");
	} else if(validar.test(sobrenome.value) || validar2.test(sobrenome.value)){
		ativarBtn("true");
	} else if(validar.test(nomeCpl.value) || validar2.test(nomeCpl.value)){
		ativarBtn("true");
	} else if(validar.test(telefone.value) || validar2.test(telefone.value) || validar3.test(telefone.value)){
		ativarBtn("true");
	} else if(validar.test(celular.value) || validar2.test(celular.value) || validar3.test(celular.value)){
		ativarBtn("true");
	} else if(validar.test(email.value) || validar2.test(email.value)){
		ativarBtn("true");
	} else if(validar.test(emailConf.value) || validar2.test(emailConf.value)){
		ativarBtn("true");
	} else if(validar.test(cep.value) || validar2.test(cep.value)){
		ativarBtn("true");
	} else if(validar.test(cidade.value) || validar2.test(cidade.value)){
		ativarBtn("true");
	} else if(validar.test(rua.value) || validar2.test(rua.value)){
		ativarBtn("true");
	} else if(validar.test(numero.value) || validar2.test(numero.value) || validar3.test(numero.value)){
		ativarBtn("true");
	} else {
		ativarBtn("false");
	}
}

document.getElementById("formulario").addEventListener("mouseover", verificarCampo)








