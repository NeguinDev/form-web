const fs = require("fs");

async function Questions(req, res){
	let { nick, answers } = req.query;
	if(!nick) return res.json({error:"Coloque seu nick!"});
	if(!answers) return res.json({error: "Responda as questões!"});
	
	let db = JSON.parse(fs.readFileSync("./data/db.json"));
	
	if(!db.questions) return res.json({error: "As perguntas não foram definidas!"});
	answers = answers.split(",").filter(x=> x);
	if(answers.length !== db.questions.length) return res.json({error: "Responda todas as questões!"});
	
	console.log(nick+" =", { answers, ip: req.ip });

	if(!db.users) db.users = {};
	if(!db.ips) db.ips = [];
	
	if(db.ips.includes(req.ip)) return res.json({error: "Você já respondeu!"});
	if(db.users?.[nick]) return res.json({error: "Você já respondeu!"});
	
	db.users[nick] = {
		answers,
		ip: req.ip
	};
	db.ips.push(req.ip);
	await fs.writeFileSync("./data/db.json", JSON.stringify(db, null, "\t"));
	
	return res.json({sucess:true});
}

module.exports = Questions;