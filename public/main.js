const Submit = ()=> {
	const nick = document.querySelector(".input-nick");
	const questions = Array.from(document.querySelectorAll(".question-input"));
	const answers = questions.map((x) => x.value);
	let msg = document.querySelector('.msg');

	//console.log("nick: "+nick.value, "respostas: "+answers.join(", "));
	
	const data = {
		nick: nick.value,
		answers
	};
	const query = new URLSearchParams(data);
	
	fetch("/questions?"+query.toString(), {
		method: 'GET'
	}).then((resp) => resp.json())
	.then((body) => {
		if(body.sucess) {
			msg.innerHTML = "Enviado com sucesso!";
			msg.style.color = "#00ff00";
			nick.value = "";
			questions.forEach((x)=> x.value = "");
		}
		else if(body.error){
			msg.innerHTML = "Error: "+body.error;
			msg.style.color = "#ff0000";
		}
	}).catch((error) => {
		msg.innerHTML = "Error no servidor da Api!";
		msg.style.color = "#ff0000";
		console.log(error);
	});
}