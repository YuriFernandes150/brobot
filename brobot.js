require('http').createServer().listen(3000);
const Discord = require("discord.js"); // API Discord.JS (Comandos)
const math = require("mathjs");
const randomimg = require('random-puppy');
var client = new Discord.Client(); // Criar uma nova Client

//Giphy
const GphApiClient = require('giphy-js-sdk-core');
var giphyclient = GphApiClient("1Z69tcE44eF9YM6OKIMpUiy8vCvyvyPv");

//Musicas
const ytdl = require("ytdl-core");
const ytlist = require('youtube-playlist');
var ytSearch = require('youtube-search');
const fs = require("fs");
var fila = [];
var filanome = [];
var currStream;


//Piadas
var Joke = require('give-me-a-joke');
var fuckShitUp = require('fuck-shit-up').create({
    useAlternativeModifiers: false
});

//Steam
const steam = require('steam-provider');
const steamnews = require('steam-news');

//Google
let google_customsearch = require('@datafire/google_customsearch').create();

//Conversor de moedas
//var converter = require('@divvit/currency-converter')();

//Banco de Dados
var firebase = require("firebase");
var fireconfig = {
    apiKey: process.env.FIREBASE,
    authDomain: process.env.AUTH,
    databaseURL: process.env.DATABASE,
    storageBucket: process.env.STORAGE,
};
firebase.initializeApp(fireconfig);

//Diversos
var randomInt = require('random-int');
var randomFloat = require('random-float');
var casual = require('casual');
var toonavatar = require('cartoon-avatar');
const randomFloatPro = require('random-float-pro');
const Minesweeper = require('discord.js-minesweeper');
const AcceptMessage = require('acceptmessage');
const axios = require('axios');
const Warframe = require("warframe.js");
let options = { platform: "pc" };

// Configuração
const config = require('./config.json');
var prefix = config.prefix;
var music = config.music;
var darkhole = config.darkhole;
var segundaresp = false;
var canalpergunta;
var tocando = false;
var loop = false;
var dispatcher;
var radiodispatcher;
var votospause = 0;
var votosresume = 0;
var votosnext = 0;
var votosstop = 0;
var votosSim = 0;
var votosNao = 0;
const votounext = new Set();
const votoupause = new Set();
const votouresume = new Set();
const votoustop = new Set();
var autorpergunta;
var perg;

//Servidor
var BRothersServer = client.guilds.cache.get("404058088329576448");
//Canais
var zueraVisivel = client.channels.cache.get("404058088329576450");
var arte = client.channels.cache.get("476225541280890930");
var brothersOG = client.channels.cache.get("434510369692712962");
var sugestoesDoBRotot = client.channels.cache.get("518042011064991756");
var brobotUpdates = client.channels.cache.get("535429355099389962");
var musica = client.channels.cache.get("520562189904510997");


client.on('error', function () {

    var date = new Date();
    console.log("Ocorreu um erro de conexão às " + date.getHours() - 3 + ":" + date.getMinutes());

});
client.on("ready", function () { // Evento "quando a client estiver pronta/ligada" função:

    /*-= STATUS DO BOT =-*/
    /*-=-=-=-=-=-=-=-=-=*/
    setInterval(function () {
        let statuses = ["jogos mais caros que os seus", "Jogos que vc quer ter", "Mineirinho Ultra Adventures", "Hentaikey.com", "Mu", "Runescape", "Red Dead Redemption 2", "Kamasutra Pro", "Um Guei leu isso", "Reddit", "Twitter", "Mass Effect: Andromeda"];
        let status = statuses[Math.floor(Math.random() * statuses.length)]

        client.user.setPresence({ game: { name: status }, status: 'online' });

        client.user.setPresence({ activity: { name: status }, status: 'online' })
    }, 240000);

    setInterval(function () {

        const WF = new Warframe(options);
        var BRothersServer = client.guilds.get("404058088329576448");
        var tennoScoom = BRothersServer.roles.get("434513357605961748");
        var listaTennos = tennoScoom.members;
        WF.fissures.then(fendas => {

            fendas.forEach((fenda) => {

                if (fenda.type === "Excavation") {

                    var fendaEmbed = new Discord.MessageEmbed()
                        .setTitle("Hora de Abrir Reliquias!")
                        .setColor('RANDOM')
                        .setThumbnail("http://content.warframe.com/MobileExport/Lotus/Interface/Icons/Store/Luminous.png");

                    listaTennos.forEach((tenno) => {

                        var user = BRothersServer.members.get(tenno.user.id);
                        console.log(user.id);

                        fendaEmbed.setDescription(tenno.user.username + ",\nTem uma fenda " + fenda.tierClass + " de Escavação em " + fenda.node + "\nMas corre! Ela acaba em " + fenda.countdown);

                        user.send(fendaEmbed);

                    });


                }

            });

        });

    }, 3600000);

    
    /*
    setInterval(function () {

        let subreddit = ["funfacts", "memes", "terriblefacebookmemes", "dankmemes",
            "ProgrammerHumor", "HoldMyBeer", "Facepalm", "PerfectTiming", "WTF", "wholesomememes",
            "PhotoshopBattles", "funnyvideos", "FunnyAnimals", "FunnyCommercials", "wheredidthesodago",
            "Punny", "puns", "pun"];
        randomimg(subreddit[Math.floor(Math.random() * subreddit.length)])
            .then(url => {

                var chan = client.channels.cache.get("553644829826088980");
                chan.send(url).then(msg => {

                    msg.react('👍').then(() => msg.react('👎'));

                });

            }).catch(e => {
                console.error(e);
            });

    }, 5400000);
    */
});

client.on("message", (message) => {
    if (message.author.equals(client.user)) return;


    function shuffle(array, array2) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            temporaryValue2 = array2[currentIndex];

            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;

            array2[currentIndex] = array2[randomIndex];
            array2[randomIndex] = temporaryValue2;
        }
    }


    function Play(connection) {

        currStream = ytdl(fila[0], { filter: 'audioonly' });

        dispatcher = connection.play(currStream);
        if (!loop) {
            message.channel.send("Tocando: **" + filanome[0] + "**");
        }
        tocando = true;
        dispatcher.on("finish", () => {
            votounext.clear();
            votoupause.clear();
            votouresume.clear();
            votoustop.clear();
            votosnext = 0;
            votospause = 0;
            votosresume = 0;
            votosstop = 0;
            if (!loop) {
                filanome.shift();
                fila.shift();
            }

            if (fila[0]) {
                Play(connection);
            }
            else {
                channel = client.channels.cache.get(music);
                channel.leave();
                message.channel.send("Terminei por aqui. Me chame qnd quiser ouvir algo de novo ;)");
                tocando = false;
            }

        });


    }

    function removeDups(names) {
        let unique = {};
        names.forEach(function(i) {
          if(!unique[i]) {
            unique[i] = true;
          }
        });
        return Object.keys(unique);
      }

    const messageArray = message.content.split(" ");
    const command = messageArray[0];
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //----------------- FUN COMMANDS -----------------

    if (segundaresp) {

        if (message.author.id === autorpergunta) {
            if (message.content.toLowerCase() === "cancelar") {
                segundaresp = false;
                autorpergunta = "";
                message.channel.send("blz então");
            }
            else {
                var resposta = message.content.toLowerCase();
                firebase.database().ref('conversas/' + perg).set({
                    resp: resposta
                });
                segundaresp = false;
                autorpergunta = "";
                message.channel.send("Vlw por me ensinar!");
                canalpergunta.send(resposta);
            }

        }


    }
    if (message.content.toLowerCase().includes("brobot") && !message.content.startsWith(prefix)) {

        firebase.database().ref('/conversas/' + message.content.toLowerCase()).once('value').then(function (snapshot) {
            var resp = (snapshot.val() && snapshot.val().resp) || 'nope';

            if(resp){
                if (resp === "nope") {
                    perg = message.content.toLowerCase();
                    autorpergunta = message.author.id;
                    segundaresp = true;
                    canalpergunta = message.channel;
                    message.author.send("Ainda não tenho uma resposta pra isso... o que eu deveria falar nessa situação?");
                }
                else {
    
                    if (resp.includes("-")) {
    
                        var listaresps = resp.split("-");
                        if(listaresps[0]){
                            message.channel.send(listaresps[randomInt(listaresps.length)]);
                        }else{
                            message.channel.send("Algo deu errado e eu n consegui buscar a resposta.... WTF");
                        }
                        
    
                    }
                    else {
                        message.channel.send(resp);
                    }
    
    
                }
            }else{
                message.channel.send("Algo deu errado e eu n consegui buscar a resposta.... WTF");
            }

        });



    }
    if (command === prefix + "addresp") {

        if (args[1]) {

            if (message.content.includes("-")) {
                console.log("pergunta: " + message.content.split("-")[0].replace(command, "").trim());
                console.log("resposta: " + message.content.split("-")[1].replace(command, "").trim());
                return firebase.database().ref('/conversas/' + message.content.split("-")[0].replace(command, "").trim()).once('value').then(function (snapshot) {

                    var retorno = (snapshot.val() && snapshot.val().resp) || 'nope';

                    if (retorno === "nope") {

                        message.channel.send("Eu ainda não conheço essa ," + message.author.username + ".\nEu preciso aprender pelo menos uma resposta pra\nessa frase antes de vc tentar adicionar outras");

                    }
                    else {

                        firebase.database().ref('conversas/' + message.content.split("-")[0].replace(command, "").trim()).set({
                            resp: retorno + "-" + message.content.split("-")[1].trim()
                        });
                        message.channel.send("OK! Vou me lembrar dessa resposta tbm!");

                    }
                });
            }
            else {
                message.channel.send("Opa!\nUse esse comando assim:\n**" + prefix + "addresp** (frase de pergunta)-(resposta do bot)\n**NÃO SE ESQUEÇA DO TRAÇO** ;)");
            }


        }

    }
    if (command.toLowerCase() === prefix + "loop") {

        if (loop) {
            loop = false;
            message.channel.send("Ok!Desativando loop! ");
        } else {

            loop = true;
            message.channel.send("Beleza! Loopando\n**" + filanome[0] + "**\nCaso queira desativar o loop, basta mandar o comando novamente");

        }


    }

    if (command === prefix + "server") {

        message.channel.send("Estou sendo Hosteado em **Heroku.com** <:poggers:464204342463823892>");


    }
    if (command === prefix + "play") {
        if(message.guild.id === "404058088329576448"){
            console.log("Comando play requisitado por: " + message.author.username);
            var url = message.content.replace(command, "").replace(args[1], "").trim() + "";
            message.delete();
            const channel = client.channels.cache.get(music);
            if (args[2]) {
    
                if (args[1] === "url") {
                    if (!channel) return console.error("Canal Inexistente!");
                    if (tocando) {
                        fila.push(url);
                        message.channel.send("Anotado! Vou deixar na fila!");
                        var id = ytdl.getURLVideoID(url);
                        ytdl.getInfo(id, function (err, info) {
                            if (err) throw err;
                            console.log(info);
                            var title = info.title;
                            filanome.push(title);
                        });
                    } else {
                        message.channel.send("Bora lá! :musical_note:");
                        channel.join().then(connection => {
                            fila.push(url);
                            var id = ytdl.getURLVideoID(url);
                            ytdl.getInfo(id, function (err, info) {
                                console.log(info);
                                if (err) throw err;
                                var title = info.title;
                                filanome.push(title);
                            });
                            Play(connection);
                        }).catch(e => {
                            // Oh no, it errored! Let's log it to console :)
                            console.error(e);
                        });
    
                        tocando = true;
                    }
    
    
                }
                else if (args[1] === "name") {
    
                    var opts = {
                        maxResults: 1,
                        key: process.env.YOUTUBE,
                        type: "video"
                    };
    
                    ytSearch(message.content.replace(command, "").replace(args[1], ""), opts, function (err, results) {
                        if (err) console.log(err);
    
                        const channel = client.channels.cache.get(music);
                        if (!channel) return console.error("Canal Inexistente!");
                        if (tocando) {
                            fila.push(results[0].link);
                            filanome.push(results[0].title);
                            message.channel.send("Anotado! Vou deixar na fila!");
                        } else {
                            message.channel.send("Bora lá! :musical_note:");
                            channel.join().then(connection => {
                                fila.push(results[0].link);
                                filanome.push(results[0].title);
                                Play(connection);
                            }).catch(e => {
                                // Oh no, it errored! Let's log it to console :)
                                console.error(e);
                            });
    
                            tocando = true;
                        }
    
                    })
    
                }
                else {
    
                    message.channel.send("Opa! Não se esqueça de usar os prefixos certos!\n" +
                        prefix + "play name (nome da música)\n" +
                        prefix + "play url (link do youtube)\n" +
                        "Somente play não vai mais funcionar!");
    
                }
    
    
            }
            else {
                message.channel.send("Opa! \n Para tocar algo, digite **" +
                    prefix + "play name (nome da música)**\nOu **" +
                    prefix + "play url (link do youtube)** e vai ser tocado  ou posto na fila!\n" +
                    "Comandinhos úteis de música: \n" +
                    "**" + prefix + "pause:** Pausa a música (derp)\n" +
                    "**" + prefix + "resume:** continua a música de onde parou\n" +
                    "**" + prefix + "next:** Abre um voto para pular a música\n" +
                    "**" + prefix + "fila:** Mostra quantas músicas tem na fila\n" +
                    "**" + prefix + "stop:** Abre um voto para parar a música e resetar a fila\n" +
                    "**" + prefix + "shuffle:** Randomiza a playlist\n" +
                    "**" + prefix + "loop:** repete a música atual\n" +
                    "**" + prefix + "salvarlista:** Salva (e sobrescreve) todas as musicas atuais na sua playlist pessoal\n" +
                    "**" + prefix + "addlista:** Adiciona a música atual na sua playlist pessoal\n");
            }
    
    
        }
        else{
            message.channel.send("Meus comandos de música são exclusivos para o servidor dos BRothers :p");
        }

    }
    if (command === prefix + "shuffle") {

        if(message.guild.id === "404058088329576448"){
            if (fila[3] && filanome[3]) {

                shuffle(fila, filanome);
                loop = false;
                message.channel.send("Ok! Playlist devidamente afofada!");
    
            }
            else {
                message.channel.send("É necessário pelo menos 4 músicas na fila para fazer shuffle!");
            }
        }
        else{
            message.channel.send("Meus comandos de música são exclusivos para o servidor dos BRothers :p");
        }

        

    }
    if (command === prefix + "pause" && tocando) {

        if(message.guild.id === "404058088329576448"){
            console.log("Comando pause requisitado por: " + message.author.username);

            if (votoupause.has(message.author.id)) {
                message.channel.send("<:fred:404438414201454594>");
                message.reply("vc já votou");
            }
            else {
                if (message.member.voice.channel.id === music) {
                    votoupause.add(message.author.id);
                    var chan = client.channels.cache.get(music);
                    var pessoas = chan.members.filter(member => !member.user.bot).size;
                    votospause++;
                    var metade = pessoas / 2;
                    if (votospause === pessoas || votospause > metade) {
                        message.channel.send("Temos votos o suficiente! Pausando");
                        dispatcher.pause();
                        tocando = false;
                        votospause = 0;
                        votoupause.clear();
                    }
                    else {
                        message.channel.send(message.author + " votou para pausar, temos " + votospause + "/" + pessoas + " a favor de pausar");
                    }
                }
                else {
                    message.channel.send("Vc nem tá participando, " + message.author.username + "Pq vc n vem com a gente? :smile: :musical_note:  \n https://discord.gg/XEnrPmX");
                }
    
            }
        }
        else{
            message.channel.send("Meus comandos de música são exclusivos para o servidor dos BRothers :p");
        }
        
        

    }
    if (command === prefix + "resume" && !tocando) {

        if(message.guild.id === "404058088329576448"){
            console.log("Comando resume requisitado por: " + message.author.username);

            if (votouresume.has(message.author.id)) {
                message.channel.send("<:fred:404438414201454594>");
                message.reply("vc já votou");
            }
            else {
                if (message.member.voice.channel.id === music) {
                    votouresume.add(message.author.id);
                    var chan = client.channels.cache.get(music);
                    var pessoas = chan.members.filter(member => !member.user.bot).size;
                    votosresume++;
                    var metade = pessoas / 2;
                    if (votosresume === pessoas || votosresume > metade) {
                        message.channel.send("Temos votos o suficiente! Resumindo");
                        dispatcher.resume();
                        tocando = true;
                        votosresume = 0;
                        votouresume.clear();
                    }
                    else {
                        message.channel.send(message + author + " votou para resumir, temos " + votosresume + "/" + pessoas + " a favor de resumir");
                    }
    
                }
                else {
                    message.channel.send("Vc nem tá participando, " + message.author.username + "Pq vc n vem com a gente? :smile: :musical_note:  \n https://discord.gg/XEnrPmX");
                }
    
            }
        }
        else{
            message.channel.send("Meus comandos de música são exclusivos para o servidor dos BRothers :p");
        }

        
    }

    if (command == prefix + "reddit") {
        console.log("Comando reddit requisitado por: " + message.author.username);

        if (args[1]) {

            if (args[1].toLowerCase().includes("cock")
                || args[1].toLowerCase().includes("penis")
                || args[1].toLowerCase().includes("pinto")
                || args[1].toLowerCase().includes("jiromba")
                || args[1].toLowerCase().includes("caralho")
                || args[1].toLowerCase().includes("nsfw")
                || args[1].toLowerCase().includes("porn")
                || args[1].toLowerCase().includes("rule34")
                || args[1].toLowerCase().includes("gore")
                || args[1].toLowerCase().includes("hentai")
                || args[1].toLowerCase().includes("fuck")
                || args[1].toLowerCase().includes("ass")
                || args[1].toLowerCase().includes("boob")
                || args[1].toLowerCase().includes("xxx")
                || args[1].toLowerCase().includes("girls")
                || args[1].toLowerCase().includes("amateur")
                || args[1].toLowerCase().includes("sex")
                || args[1].toLowerCase().includes("die")
                || args[1].toLowerCase().includes("anal")
                || args[1].toLowerCase().includes("booty")
                || args[1].toLowerCase().includes("bun")
                || args[1].toLowerCase().includes("bondage")
                || args[1].toLowerCase().includes("rough")
                || args[1].toLowerCase().includes("lesdom")
            ) {

                message.author.send(message.author.username + ", todo o conteúdo NSFW foi permentemente removido do meu repertório, vou ser family friendly agr XD");
                message.delete();

            } else {

                var subreddit = args[1]; // Your Subreddit without /r/
                randomimg(subreddit)
                    .then(url => {
                        if (url) {
                            message.channel.send(url);
                        }
                        else {
                            message.reply(" Malz! Não encontrei nada aqui com a tag: **" + args[1] + "**. Lembre-se de ser mais específico em suas tags e não usar espaços.");
                        }

                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });

            }


        }
        else {

            message.channel.send("Opa! \n" +
                "Minha função do Reddit funciona assim: \n" +
                prefix + "reddit **tag do subreddit(sem o /r)**");

        }

    }

    if (command === prefix + "stop") {

        if(message.guild.id === "404058088329576448"){
            console.log("Comando stop requisitado por: " + message.author.username);

            if (votoustop.has(message.author.id)) {
                message.channel.send("<:fred:404438414201454594>");
                message.reply("vc já votou");
            }
            else {
                if (message.member.voice.channel.id === music) {
                    votoustop.add(message.author.id);
                    var chan = client.channels.cache.get(music);
                    var pessoas = chan.members.filter(member => !member.user.bot).size;
                    votosstop++;
                    var metade = pessoas / 2;
                    if (votosstop === pessoas || votosstop > metade) {
                        message.channel.send("Temos votos o suficiente! Parando e limpando fila...");
                        chan.leave();
                        filanome = [];
                        fila = [];
                        tocando = false;
                        votosstop = 0;
                        loop = false;
                        votoustop.clear();
                        dispatcher.end();
                    }
                    else {
                        message.channel.send(message.author + " votou para parar e resetar, temos " + votosstop + "/" + pessoas + " a favor de parar");
                    }
    
                }
                else {
                    message.channel.send("Vc nem tá participando, " + message.author.username + ". Pq vc n vem com a gente? :smile: :musical_note:  \n https://discord.gg/XEnrPmX");
                }
    
    
            }
        }
        else{
            message.channel.send("Meus comandos de música são exclusivos para o servidor dos BRothers :p");
        }

        

    }
    if (command === prefix + "next") {

        if(message.guild.id === "404058088329576448"){
            console.log("Comando next requisitado por: " + message.author.username);

        if (votounext.has(message.author.id)) {
            message.channel.send("<:fred:404438414201454594>");
            message.reply("vc já votou");
        }
        else {
            if (message.member.voice.channel.id === music) {
                votounext.add(message.author.id);
                var chan = client.channels.cache.get(music);
                var pessoas = chan.members.filter(member => !member.user.bot).size;
                votosnext++;
                var metade = pessoas / 2;
                if (votosnext === pessoas || votosnext > metade) {
                    message.channel.send("Temos votos o suficiente! Pulando faixa...");

                    if (fila[1]) {
                        dispatcher.end();
                        votosnext = 0;
                        next = true;
                        votounext.clear();
                        loop = false;
                    }
                    else {
                        message.channel.send("Não tem mais músicas na fila!");
                    }
                }
                else {
                    message.channel.send(message.author + " votou para pular, temos " + votosnext + "/" + pessoas + " a favor de pular");
                }

            }
            else {
                message.channel.send("Vc nem tá participando, " + message.author.username + ". Pq vc n vem com a gente? :smile: :musical_note:  \n https://discord.gg/XEnrPmX");
            }

        }

        }else{
            message.channel.send("Meus comandos de música são exclusivos para o servidor dos BRothers :p");
        }

        

    }
    if (command === prefix + "fila") {

        if(message.guild.id === "404058088329576448"){
            console.log("Comando fila requisitado por: " + message.author.username);
            if (fila[0]) {
                var tamanhofila = fila.length - 1;
                message.channel.send("Ainda há **" + tamanhofila + "** músicas na fila.");
                var num;
                if (fila.length > 24) {
    
                    num = 24;
    
                }
                else {
                    num = fila.length;
                }
                var loopString = " ";
                if (loop) {
                    " (Loopando) "
                }
                var listEmbed = new Discord.MessageEmbed()
                    .setTitle("**Lista de Músicas atual (mostra até 25 músicas na fila)**:")
                    .setThumbnail("https://media.tenor.com/images/aafec9380ab6cb4b711000761c16726e/tenor.gif")
                listEmbed.addField("**▷" + filanome[0] + loopString + "**", "---------------------Próximas Faixas---------------------")
                    .setColor('RANDOM');
    
                for (var i = 1; i < num; i++) {
    
                    listEmbed.addField(filanome[i], "---------------------------------------------------------");
    
                }
    
                message.channel.send(listEmbed);
    
            }
            else {
                message.channel.send("Não Há mais músicas na fila!");
            }
        }else{
            message.channel.send("Meus comandos de música são exclusivos para o servidor dos BRothers :p");
        }

        

    }

    if (command === prefix + "ask") {
        console.log("Comando ask requisitado por: " + message.author.username);
        message.channel.send("https://cdn.discordapp.com/attachments/494191132318892043/510206947824369695/BRobot_think.gif").then(msg => {
            msg.delete({ timeout: 3000 });
        }).catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

        let replies = ["Sim!", "É Claro ue :3", "Claro q sim!", "MAN É TÃO OBVIO Q SS", "Yee", "YUSS", "Yup", "Sim XD", "Obviamente", "N faço idéia", "talvez sim, talvez não", "Não sei, será?!", "Nope men", "MDS NÃO!", "Claro!...que não .-.", "Sla po :7", "Nem", "Nah", "Creio q não, jovem", "Hmmmmmmmmm... n sei te dizer...", ":regional_indicator_n: :regional_indicator_o:", ":regional_indicator_y: :regional_indicator_e: :regional_indicator_s:"];
        setTimeout(function () {

            if (args[1]) { // Se o argumento for [1], ou seja um espaço a mais, ele vai fazer esta ação:

                if (message.content.includes("vc é tsundere") || message.content.includes("vc e tsundere") || message.content.includes("voce é tsundere") || message.content.includes("voce e tsundere") || message.content.includes("tu é tsundere") || message.content.includes("tu e tsundere")) {

                    message.channel.send("N-não é como se eu quisesse respoder suas mensagens nem nada assim, b-BAKA!!! :flushed: ");

                }
                else {

                    message.channel.send(replies[Math.floor(Math.random() * replies.length)])

                }

            } else // else = Caso ao contrário fazer: ou seja se não for args[1] ele vai mandar isso:
                message.channel.send("<:wat:404459079415889933> faz a pergunta uai...");

        }, 3500);

    }
    if (command === prefix + "desenha") {
        console.log("Comando desenha requisitado por: " + message.author.username);

        message.channel.send("Beleza! Aguentae \nhttps://cdn.discordapp.com/attachments/494191132318892043/508782010609696780/anim.gif").then(msg => {
            msg.delete({ timeout: 4500 })
        }).catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

        let replies = ["https://cdn.discordapp.com/attachments/494191132318892043/508789474340372485/BRobot_Desenha8.jpg",
            "https://cdn.discordapp.com/attachments/494191132318892043/508789482204692500/BRobot_Desenha9.jpg",
            "https://cdn.discordapp.com/attachments/494191132318892043/508789482925850644/BRobot_Desenha10.jpg",
            "https://cdn.discordapp.com/attachments/494191132318892043/508789485673250831/BRobot_Desenha2.jpg",
            "https://cdn.discordapp.com/attachments/494191132318892043/508789486168309762/BRobot_Desenha1.jpg",
            "https://cdn.discordapp.com/attachments/494191132318892043/508789488101752832/BRobot_Desenha4.jpg",
            "https://cdn.discordapp.com/attachments/494191132318892043/508789487426469889/BRobot_Desenha3.jpg",
            "https://cdn.discordapp.com/attachments/494191132318892043/508789489980801024/BRobot_Desenha5.jpg",
            "https://cdn.discordapp.com/attachments/494191132318892043/508789491176177694/BRobot_Desenha6.jpg",
            "https://cdn.discordapp.com/attachments/494191132318892043/508789492807893017/BRobot_Desenha7.jpg",
            "https://cdn.discordapp.com/attachments/476225541280890930/508805236626948107/BRobot_Desenha_11.png",
            "https://cdn.discordapp.com/attachments/476225541280890930/508807877809405962/BRobot_Desenha_12.png",
            "https://cdn.discordapp.com/attachments/518042011064991756/535635359162302464/BRobot_Desenha_15.png"];

        setTimeout(
            function () {

                if (args[1]) {

                    if (args[1] === "eu") {

                        let Cartoonlization = require("photo2cartoon");
                        let c = new Cartoonlization();
                        c.init(message.author.displayAvatarURL).then((cs) => {
                            let c = cs[0];
                            c.make();
                            c.toFile("./test.png");
                            message.channel.send({
                                files: [
                                    {
                                        attachment: "./test.png",
                                        name: "Desenho.png"
                                    }
                                ]
                            });

                        });

                    }
                    else if (message.embeds.length > 0) {
                        var embed = message.embeds[0];
                        if (embed.image.url) {

                            let Cartoonlization = require("photo2cartoon");
                            let c = new Cartoonlization();
                            c.init(embed.image).then((cs) => {
                                let c = cs[0];
                                c.make();
                                c.toFile("./test.png");
                                message.channel.send({
                                    files: [
                                        {
                                            attachment: "./test.png",
                                            name: "Desenho.png"
                                        }
                                    ]
                                });

                            });

                        }

                    }
                }
                else {
                    message.channel.send(replies[Math.floor(Math.random() * replies.length)]);
                }





            }, 5000);
    }

    // BRobot te ajuda com contas de +
    if (command === prefix + "qnto" && messageArray[1].includes("+")) {
        let replies = ["Essa é fácil! É ", "Deixa eu pensar.... Acho que é ", "Vc n sabe? Dá ", "Ah Minzerávi, dá "];
        var operacao = messageArray[1];
        var nums = operacao.split("+");
        var n1 = parseFloat(nums[0].replace(",", ".").trim());
        var n2 = parseFloat(nums[1].replace(",", ".").trim());
        var resp = n1 + n2;

        message.channel.send(replies[Math.floor(Math.random() * replies.length)] + " " + resp);

    } else if (command === prefix + "qnto" && messageArray[1].includes("-")) {

        let replies = ["Essa é fácil! É ", "Deixa eu pensar.... Acho que é ", "Vc n sabe? Dá ", "Ah Minzerávi, dá "];
        var pergunta = messageArray[1].split("-");
        var n1 = parseFloat(pergunta[0].replace(",", ".").trim());
        var n2 = parseFloat(pergunta[1].replace("?", "").replace(",", ".").trim())

        var resp = n1 - n2;

        message.channel.send(replies[Math.floor(Math.random() * replies.length)] + " " + resp)

    } else if (command === prefix + "qnto" && messageArray[1].includes("x")) {

        let replies = ["Essa é fácil! É ", "Deixa eu pensar.... Acho que é ", "Vc n sabe? Dá ", "Ah Minzerávi, dá "];
        var pergunta = messageArray[1].split("x");
        var n1 = parseFloat(pergunta[0].replace(",", ".").trim());
        var n2 = parseFloat(pergunta[1].replace("?", "").replace(",", ".").trim())

        var resp = n1 * n2;

        message.channel.send(replies[Math.floor(Math.random() * replies.length)] + " " + resp)

    } else if (command === prefix + "qnto" && messageArray[1].includes("/")) {

        let replies = ["Essa é fácil! É ", "Deixa eu pensar.... Acho que é ", "Vc n sabe? Dá ", "Ah Minzerávi, dá "];
        var pergunta = messageArray[1].split("/");
        var n1 = parseFloat(pergunta[0].replace(",", ".").trim());
        var n2 = parseFloat(pergunta[1].replace("?", "").replace(",", ".").trim())

        var resp = n1 / n2;

        message.channel.send(replies[Math.floor(Math.random() * replies.length)] + " " + resp)

    }

    if (command === prefix + "matematica" || command === prefix + "Matematica" || command === "matemática" || command === prefix + "Matemática") {

        message.channel.send("Eu posso de ajudar com umas contas rápidas! \nSe você quiser fazer as contas, use o comando **" + prefix + "qnto** \nPara adição use **" + prefix + "qnto** n1+n2 \nPara subtração, use **" + prefix + "qnto** nq-n2 \nPara multiplicação, use **" + prefix + "qnto** n1xn2 \nPara divisão, use **" + prefix + "qnto** n1/n2 \nVlw!")

    }
    if (command === prefix + "gif") {
        console.log("Comando gif requisitado por: " + message.author.username);
        let gifs = [];
        if (args[1]) {
            giphyclient.search('gifs', { "q": message.content.replace(command, ""), "limit": 30 })
                .then((response) => {
                    response.data.forEach((gifObject) => {
                        gifs.push(gifObject.url);

                    })
                    message.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
                })
                .catch((err) => {
                    console.log(err);
                })


        }
        else if (args[0]) {

            giphyclient.random('gifs', {})
                .then((response) => {

                    message.channel.send(response.data.url);

                })
                .catch((err) => {
                    console.log(err);
                })

        }

    }

    if (command === prefix + "parouimpar") {

        if (args[2]) {

            var escolha = "";
            if (messageArray[1] === "par") {
                escolha = "ímpar";
            }
            else if (messageArray[1] === "impar" || messageArray[1] === "ímpar") {
                escolha = "par";
            }
            var n1 = parseInt(messageArray[2]);
            var n2 = math.randomInt(0, 5);

            message.channel.send(escolha + "! " + n2);

            var n3 = n1 + n2;
            if (n3 % 2 === 0) {

                if (escolha === "par") {

                    message.channel.send("Ganhei! Mais sorte na próxima, " + message.author.username);

                }
                else {
                    message.channel.send(":(");
                }
            }
            else {
                if (escolha === "par") {

                    message.channel.send(":(");

                }
                else {
                    message.channel.send("Ganhei! Mais sorte na próxima, " + message.author.username);
                }
            }

        }
        else {
            message.channel.send("Calma ae, meu jovem! Pra gente brincar disso tem que fazer certo! digite **parouimpar** suaescolha seunumero \n **Exemplo:** \n **" + prefix + "parouimpar** par 2");
        }

    }
    if (command === prefix + "joke") {

        console.log("Comando joke requisitado por: " + message.author.username);

        Joke.getRandomDadJoke(function (joke) {
            message.channel.send(joke);
        });

    }
    if (command === prefix + "steam") {
        console.log("Comando steam requisitado por: " + message.author.username);

        if (args[1]) {
            message.channel.send("Perae! Vou Procurar!");
            var provider = new steam.SteamProvider();

            provider.search(message.content.replace(command, ""), 1, "portuguese", "br").then(result => {

                if (result[0]) {

                    result.forEach((SteamSearchEntry) => {

                        provider.detail(SteamSearchEntry.id, "portuguese", "br").then(detail => {

                            var preco;
                            if (detail.$priceData.finalPrice === "0.0") {
                                preco = "Free ou indisponível";
                            }
                            else {
                                preco = "R$ " + detail.$priceData.finalPrice + " com desconto de " + detail.$priceData.discountPercent + "%";
                            }
                            var gameEmbed = new Discord.MessageEmbed()
                                .setAuthor(detail.$name + ", desenvolvido por " + detail.$otherData.developer)
                                .setColor('RANDOM')
                                .setTitle(detail.$genres)
                                .setImage(detail.$otherData.$imageUrl)
                                .setDescription("[ABRIR PÁGINA NA LOJA](" + SteamSearchEntry.url + ")")
                                .addField("**Díponpivel em:**", detail.$otherData.$platforms)
                                .addField("**Detalhes: **", detail.$otherData.features)
                                .addField("**Atualmente custa:** ", preco)
                                .addField("**Análises:** ", SteamSearchEntry.score)
                                .addField("**Metacritic:** ", detail.$otherData.metacriticScore)
                                .setFooter("Appid: " + SteamSearchEntry.id);
                            message.channel.send(gameEmbed);

                        })

                    })

                }
                else {
                    message.channel.send("Não encontrei nada! Tente ser mais específico");
                }



            })
                .catch(err => {
                    console.log(err);
                    message.channel.send("Não encontrei nada! Tente ser mais específico");
                });

        }
        else {
            message.channel.send("Opa! \n" +
                "Informe o título do jogo Steam que deseja ver!\n" +
                "Use **" + prefix + "steam** (título do jogo) para exibir um detalhamento do mesmo");
        }

    }
    if (command === prefix + "steamnews") {

        console.log("Comando steam requisitado por: " + message.author.username);

        if (args[2]) {
            message.channel.send("Buscando news!");
            var provider = new steam.SteamProvider();
            provider.search(message.content.replace(command, "").replace(args[1], "").trim(), 1, "portuguese", "br").then(result => {

                if (result[0]) {
                    result.forEach((SteamSearchEntry) => {

                        steamnews.getNews(SteamSearchEntry.id, args[1], '700', (err, callback) => {
                            if (err) throw err;
                            var i = 0;
                            let listanews = [];
                            var newsEmbed = new Discord.MessageEmbed()
                                .setAuthor(SteamSearchEntry.$name)
                                .setTitle("**Notícias**")
                                .setColor('RANDOM');
                            for (var i = 0; i < callback.length; i++) {
                                var num = i + 1;
                                var title = callback[i].title;
                                var content = callback[i].contents;
                                listanews.push("[Noticia " + num + "](" + callback[i].url + ")");
                                newsEmbed.addField(title, content);
                            }
                            provider.detail(SteamSearchEntry.id, "portuguese", "br").then(detail => {

                                newsEmbed.setThumbnail(detail.$otherData.$imageUrl);
                            });
                            newsEmbed.setDescription("**Links:**\n" + listanews);
                            newsEmbed.setFooter("Se você não ver nenhuma notícia, provavelmente não tem");

                            message.channel.send(newsEmbed);
                            listanews = [];
                        });

                    })
                }
                else {
                    message.channel.send("Não encontrei nada! Tente ser mais específico");
                }

            })
                .catch(err => {
                    console.log(err);
                    message.channel.send("Não encontrei nada! Tente ser mais específico");
                });


        }
        else {
            message.channel.send("Opa!\n" +
                "Para ver as notícias dos seus jogos favoritos,\n" +
                "Use **" + prefix + "steamnews** (numero de noticias [no máximo 10]) (Nome do Jogo)");


        }

    }
    if (command === prefix + "google") {

        console.log("Comando google requisitado por: " + message.author.username);

        if (args[1]) {

            google_customsearch.cse.list({
                "q": message.content.replace(command, ""),
                "key": process.env.GOOGLE,
                "cx": process.env.CX,
                "num": 3
            }).then(data => {
                let listaresultados = [];
                var num = 0;
                resultEmbed = new Discord.MessageEmbed()
                    .setTitle(data.searchInformation.formattedTotalResults + " resultados em " + data.searchInformation.formattedSearchTime + " segundos")
                    .setColor('RANDOM');
                for (var i = 0; i < data.items.length; i++) {
                    num = num + 1;
                    listaresultados.push("[Resultado " + num + "](" + data.items[i].link + ")")
                    resultEmbed.addField(data.items[i].title, data.items[i].snippet);
                }
                resultEmbed.setDescription("**Fontes:** " + listaresultados);
                resultEmbed.setFooter("Resultados podem variar de acordo com a forma de você escrever sua pesquisa ;)");
                message.channel.send(resultEmbed);
                listaresultados = [];

            });

        }

    }

    if (command == prefix + "playlist") {

        if(message.guild.id === "404058088329576448"){
            console.log("Comando playlist requisitado por: " + message.author.username);

        if (args[2]) {

            if (args[1] === "name") {

                var name = args.slice(2).join(" ");

                var opts = {
                    maxResults: 1,
                    key: process.env.YOUTUBE,
                    type: "playlist"
                };

                ytSearch(name, opts, function (err, results) {
                    if (err) console.log(err);

                    var url = results[0].link;

                    if (tocando) {

                        message.channel.send("Ok! vou adicionar as musicas dessa playlist na fila!");
                        ytlist(url, 'url').then(res => {

                            for (var i = 0; i < res.data.playlist.length; i++) {
                                fila.push(res.data.playlist[i]);
                            }

                        });
                        ytlist(url, 'name').then(res => {

                            for (var i = 0; i < res.data.playlist.length; i++) {
                                filanome.push(res.data.playlist[i]);
                            }

                        });

                    }
                    else {

                        const channel = client.channels.cache.get(music);

                        channel.join().then(connection => {
                            message.channel.send("Partiu! :musical_note:");
                            ytlist(url, 'url').then(res => {

                                for (var i = 0; i < res.data.playlist.length; i++) {
                                    fila.push(res.data.playlist[i]);
                                }


                            });
                            ytlist(url, 'name').then(res => {

                                for (var i = 0; i < res.data.playlist.length; i++) {
                                    filanome.push(res.data.playlist[i]);

                                }

                                Play(connection);
                            });

                        }).catch(e => {
                            // Oh no, it errored! Let's log it to console :)
                            console.error(e);
                        });

                    }

                })
                message.delete();

            }
            else if (args[1] === "url") {

                var url = args.slice(2).join(" ");

                if (tocando) {

                    message.channel.send("Ok! vou adicionar as musicas dessa playlist na fila!");
                    ytlist(url, 'url').then(res => {

                        for (var i = 0; i < res.data.playlist.length; i++) {
                            fila.push(res.data.playlist[i]);
                        }


                    });
                    ytlist(url, 'name').then(res => {

                        for (var i = 0; i < res.data.playlist.length; i++) {
                            filanome.push(res.data.playlist[i]);
                        }

                    });

                }
                else {

                    const channel = client.channels.cache.get(music);

                    channel.join().then(connection => {
                        message.channel.send("Partiu! :musical_note:");
                        ytlist(url, 'url').then(res => {



                            for (var i = 0; i < res.data.playlist.length; i++) {
                                fila.push(res.data.playlist[i]);
                            }



                        });
                        ytlist(url, 'name').then(res => {


                            for (var i = 0; i < res.data.playlist.length; i++) {
                                filanome.push(res.data.playlist[i]);

                            }
                            Play(connection);


                        });

                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });

                }
                message.delete();
            }

        }
        else {
            message.channel.send("Opa!\n" +
                "Não se esqueça de usar os prefixos certos!\n" +
                prefix + "playlist url (link da playlist)\n" +
                prefix + "playlist name (nome da playlist)");
        }
        }else{
            message.channel.send("Meus comandos de música são exclusivos para o servidor dos BRothers :p");
        }
        


    }
    if (message.content === "duvido") {

        message.channel.send("Pau no teu ouvido");
        message.channel.send("<:chris:404439721968795648>");

    }

    if (command === prefix + "vid") {

        if (args[1]) {

            var opts = {
                maxResults: 1,
                key: process.env.YOUTUBE,
                type: "video"
            };

            ytSearch(args.slice(1).join(" "), opts, function (err, results) {
                if (err) console.log(err);

                var url = results[0].link;
                message.channel.send(url);

            })

        }
        else {
            message.channel.send("Digite o nome do vídeo");
            message.channel.send("<:pepehands:404642565514854410>");
        }

    }
    if (command === prefix + "roll") {

        if (args[2]) {

            if (isNaN(args[1]) || isNaN(args[2])) {

                message.channel.send("<:wat:404459079415889933>");
                message.channel.send("Desde qnd isso é número véi?");

            }
            else {

                if (parseInt(args[1]) >= parseInt(args[2])) {

                    message.channel.send("<:fred:404438414201454594>");
                    message.channel.send("O número mínimo precisa ser maior que o número máximo, ou vc fugiu da escola?");

                }
                else {
                    var num = randomInt(parseInt(args[1]), parseInt(args[2]));
                    message.channel.send("Saiu o número: " + num);
                }

            }


        }
        else {
            message.channel.send("Opa!\nUse **" + prefix + "roll** (numero mínimo) (número máximo) pra isso funcionar!");
        }

    }
    if (command === prefix + "cringe") {

        let subreddit = ["cringeanarchy", "sadcringe", "trashy", "delusionalartists"];
        randomimg(subreddit[Math.floor(Math.random() * subreddit.length)])
            .then(url => {
                message.channel.send(url);
            }).catch(e => {
                console.error(e);
            });

    }
    if (command === prefix + "randomchar") {

        var int = randomInt(1, 2);
        var gender;
        if (int === 1) {
            gender = "male";
        }
        else {
            gender = "female";
        }

        var charEmbed = new Discord.MessageEmbed()
            .setTitle("PERSONAGEM")
            .setColor('RANDOM')
            .setDescription("Lembre-se que isso só ajuda vc com infos simples, o resto é com vc!")
            .setImage(toonavatar.generate_avatar({ "gender": gender }))
            .addField("NOME:", casual.full_name)
            .addField("LEMA:", casual.catch_phrase)
            .addField("GÊNERO: ", gender)
            .addField("PESO: ", Math.round(randomFloat(40, 100)) + " Kg")
            .addField("ALTURA: ", randomFloatPro({
                min: 1,
                max: 2,
                fractionDigit: 2
            }) + " m")
            .addField("TRABALHA EM:", casual.company_name + " " + casual.company_suffix)
            .addField("PAÍS DE ORIGEM:", casual.country)
            .addField("Stats (0-100)", "Strength: " + randomInt(0, 100) + "\n" +
                "Perception: " + randomInt(0, 100) + "\n" +
                "Endurance: " + randomInt(0, 100) + "\n" +
                "Charisma: " + randomInt(0, 100) + "\n" +
                "Intelligence: " + randomInt(0, 100) + "\n" +
                "Agility: " + randomInt(0, 100) + "\n" +
                "Luck: " + randomInt(0, 100) + "\n" +
                "Wisdom: " + randomInt(0, 100) + "\n" +
                "Witicism: " + randomInt(0, 100) + "\n" +
                "Social: " + randomInt(0, 100) + "\n" +
                "Willpower: " + randomInt(0, 100) + "\n")
            .setFooter("Se quiser que mais informações sejam disponibilizadas, fale com o Spirik!");

        message.channel.send(charEmbed);

    }

    if (command === prefix + "salvarlista") {

        const chan = message.channel;
        // Build the AcceptMessage
        var msg = new AcceptMessage(client, {
            content: new Discord.MessageEmbed()
                .setDescription('AVISO! Salvar a playlist atual irá adicionar TODAS as músicas da fila atual na sua playlist pessoal, verifique a fila e prossiga com cautela')
                .setColor('RANDOM'),
            emotes: {
                accept: '✅',
                deny: '❌'
            },
            checkUser: message.author,
            actions: {
                accept: (reaction, user) => {
                    if (fila[1]) {
                        message.channel.send("Salvando a lista atual pra vc!");
                        for (var i = 0; i < fila.length; i++) {

                            firebase.database().ref('playlists/' + message.author.id).push({
                                name: filanome[i],
                                url: fila[i]
                            });

                        }

                        message.channel.send("Salvei essas músicas na sua playlist pessoal! quando quiser reproduzir ela, use **" + prefix + "minhalista**");
                    }
                    else {
                        message.channel.send("É preciso ter pelo menos 2 músicas na fila atual para poder adicionar na sua playlist");
                    }
                },
                deny: (reaction, user) => {
                    message.channel.send("Operação cancelada!");
                }
            }
        })

        msg.send(chan);

    }
    if (command === prefix + "minhalista") {

        firebase.database().ref('/playlists/' + message.author.id).on("child_added", function (data, prevChildKey) {

            var musica = data.val();

            if (musica.name && musica.url) {

                fila.push(musica.url);
                filanome.push(musica.name);

            }
        });
        if (!tocando) {
            const channel = client.channels.cache.get(music);
            channel.join().then(connection => {

                if (fila.length > 0 && filanome.length > 0) {

                    Play(connection);

                }

            }).catch(e => {
                // Oh no, it errored! Let's log it to console :)
                console.error(e);
            });

        } else {
            message.channel.send("Suas músicas foram adicionadas à fila atual!");
        }

    }
    if (command === prefix + "addlista") {  

        const chan = message.channel;
        // Build the AcceptMessage
        var msg = new AcceptMessage(client, {
            content: new Discord.MessageEmbed()
                .setDescription('Deseja salvar a música atual na sua playlist?')
                .setColor('RANDOM'),
            emotes: {
                accept: '✅',
                deny: '❌'
            },
            checkUser: message.author,
            actions: {
                accept: (reaction, user) => {
                    if (fila[0] && filanome[0]) {

                        firebase.database().ref('playlists/' + message.author.id).push({
                            name: filanome[0],
                            url: fila[0]
                        });



                        message.channel.send("A música foi adicionada na sua playlist!, use **" + prefix + "minhalista** para ouvir sua playlist a qualquer momento!");
                    }
                    else {
                        message.channel.send("É preciso ter pelo menos 1 música tocando para poder adicioná-la");
                    }
                },
                deny: (reaction, user) => {
                    message.channel.send("Operação cancelada!");
                }
            }
        })

        msg.send(chan);

    }
    if (command === prefix + "campominado") {

        if (args[1]) {
            var num = args[1];

            if (num === "1") {
                const minesweeper = new Minesweeper({
                    rows: 3,
                    columns: 3,
                    mines: 3,
                    emote: 'boom',
                    returnType: 'emoji',
                });
                const mine = minesweeper.start();
                message.channel.send(mine);
            }
            else if (num === "2") {
                const minesweeper = new Minesweeper({
                    rows: 6,
                    columns: 6,
                    mines: 15,
                    emote: 'boom',
                    returnType: 'emoji',
                });
                const mine = minesweeper.start();
                message.channel.send(mine);
            }
            else if (num === "3") {
                const minesweeper = new Minesweeper({
                    rows: 10,
                    columns: 10,
                    mines: 40,
                    emote: 'boom',
                    returnType: 'emoji',
                });
                const mine = minesweeper.start();
                message.channel.send(mine);
            }
            else {
                message.channel.send("Escolha uma dificuldade Válida!\n1 - Fácil\n2 - Médio\n3 - Difícil");
            }


        }
        else {
            message.channel.send("Escolha uma dificuldade!\n1 - Fácil\n2 - Médio\n3 - Difícil");
        }

    }
    if (command === prefix + "rtv") {

        if (args[1]) {

            // Build the AcceptMessage
            votosSim = 0;
            votosNao = 0;
            var desc = args.slice(1).join(" ");
            var pessoas = message.channel.members.filter(m => m.presence.status === 'online' && !m.bot).size;
            console.log("tem " + pessoas + " online");
            const chan = message.channel;
            const voteEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(message.author.username + " iniciou uma votação:")
                .setDescription(desc)
                .setFooter("Use reações para votar");

            message.channel.send(voteEmbed).then(msg => {

                msg.react('👍').then(() => msg.react('👎'));

                const filter = (reaction, user) => {
                    return ['👍', '👎'].includes(reaction.emoji.name);
                };
                const collector = m.createReactionCollector(filter, { time: 30000 });

                var sim = false;
                var nao = false;

                collector.on('collect', (reaction, reactionCollector) => {

                    if (reaction.emoji.name === '👍') {
                        votosSim = votosSim + 1;
                        if (votosSim > pessoas / 2) {
                            const yesEmbed = new Discord.MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle("Fim da Votação")
                                .setDescription("Votação Aprovada!")
                                .setFooter("Obrigado por votar!");
                            chan.send(yesEmbed);
                            sim = true;
                            collector.stop();
                        }
                    }
                    else if (reaction.emoji.name === '👎') {
                        votosNao = votosNao + 1;
                        if (votosNao > pessoas / 2) {
                            const noEmbed = new Discord.MessageEmbed()
                                .setColor('RANDOM')
                                .setTitle("Fim da Votação")
                                .setDescription("Votação Negada!")
                                .setFooter("Obrigado por votar!");
                            chan.send(noEmbed);
                            nao = true;
                            collector.stop();
                        }
                    }

                });

                collector.on('end', collected => {

                    if (!sim && !nao) {
                        chan.send("A votação terminou sem que membros o suficiente votassem\nPessoas Online: " + pessoas + "\nVotaram Sim:" + votosSim + "\nVotaram não:" + votosNao);
                    }

                    sim = false;
                    nao = false;

                });

            });

        }
        else {
            message.channel.send("Use direito!\n**" + prefix + "rtv** (Sua votação)\n**EX:**\n**" + prefix + "rtv** Jogar Starbound");
        }

    }
    if (command.toLowerCase() === prefix + "embreve") {

        axios({
            url: "https://api-v3.igdb.com/games",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': process.env.IGBD
            },
            data: "fields name,release_dates.human;sort release_dates.human asc;where rating >= 80 & release_dates.date < " + (new Date().getTime() / 1000).toFixed(0) + ";limit 15;"
        })
            .then(response => {
                console.log(response.data);
                var upcommingEmbed = new Discord.MessageEmbed()
                    .setAuthor("Jogos a serem lançados")
                    .setTitle("EM BREVE")
                    .setColor('RANDOM');
                response.data.forEach((game) => {
                    if (game.release_dates) {
                        upcommingEmbed.addField(game.name + " - " + game.release_dates.human);
                    }
                    else {
                        upcommingEmbed.addField(game.name + " - Sem data");
                    }
                })
                message.channel.send(upcommingEmbed);

            })
            .catch(err => {
                console.error(err);
            });

    }
    if (command === prefix + "send") {

        if (args[2]) {

            switch (args[1]) {

                case "og": {

                    var chan = client.channels.cache.get("434510369692712962");
                    chan.send(args.slice(2).join(" "));

                }
                    break;
                case "zv": {

                    var chan = client.channels.cache.get("404058088329576450");
                    chan.send(args.slice(2).join(" "));

                }
                    break;
                case "dh": {

                    var chan = client.channels.cache.get(darkhole);
                    chan.send(args.slice(2).join(" "));

                }
                    break;
                case "hq": {

                    var chan = client.channels.cache.get("476225541280890930");
                    chan.send(args.slice(2).join(" "));

                }
                    break;

            }

        }

    }
    if (command.toLowerCase() === prefix + "phuck") {

        if (args[1]) {

            fuckShitUp(message.content.replace(command, ""), displayResult);
            function displayResult(error, result) {
                if (error) {
                    console.log(error);
                }
                message.channel.send(result);
                message.delete();
            }

        }

    }
    if (command.toLowerCase() === prefix + "jogar") {

        if (args[1]) {

            var provider = new steam.SteamProvider();
            var gameEmbed = new Discord.MessageEmbed();
            provider.search(message.content.replace(command, ""), 1, "portuguese", "br").then(result => {

                if (result[0]) {

                    result.forEach((SteamSearchEntry) => {

                        provider.detail(SteamSearchEntry.id, "portuguese", "br").then(detail => {

                            var preco;
                            if (detail.$priceData.finalPrice === "0.0") {
                                preco = "Free ou indisponível";
                            }
                            else {
                                preco = "R$ " + detail.$priceData.finalPrice + " com desconto de " + detail.$priceData.discountPercent + "%";
                            }

                            gameEmbed.setAuthor("Chamando @everyone!")
                                .setTitle(message.author.username + " quer jogar " + message.content.replace(command, ""))
                                .setColor('RANDOM')
                                .setThumbnail(message.author.avatarURL())
                                .setImage(detail.$otherData.$imageUrl)
                                .setDescription("[ABRIR PÁGINA NA LOJA](" + SteamSearchEntry.url + ")")
                                .addField("**Díponivel em:**", detail.$otherData.$platforms)
                                .addField("**Atualmente custa:** ", preco)
                            message.channel.send(gameEmbed).then(m => {

                                m.react('✅');
                                const filter = (reaction, user) => {
                                    return ['✅'].includes(reaction.emoji.name) && !user.bot;
                                };

                                const collector = m.createReactionCollector(filter, { time: 120000, dispose:true });

                                let userList = [];
                                let removeUser = [];
                                var users = "";
                                collector.on('collect', (reaction, user) => {
                                    if (reaction.emoji.name === '✅') {
                                        
                                        userList.push(user.username);

                                        let unique = removeDups(userList);

                                        userList = unique;

                                        gameEmbed.setFooter("na sala: " + userList);

                                        m.edit(gameEmbed);

                                    }
                                });

                                collector.on('remove', (reaction, user) => {
                                    if (reaction.emoji.name === '✅') {

                                        removeUser.push(user.username)

                                        let unique = removeDups(removeUser);

                                        removeUser = unique;

                                        userList = userList.filter( ( remove ) => !removeUser.includes( remove ) );

                                        gameEmbed.setFooter("na sala: " + userList);

                                        m.edit(gameEmbed);

                                    }
                                });

                                collector.on('end', collected => {

                                    message.channel.send("Sala Encerrada!\n " + userList + " Hora de jogar!");
                                    userList = [];
                                    removeUser = [];
                                });



                            });

                        })

                    })

                }
                else {
                    message.channel.send("Não encontrei o jogo que vc quer jogar! Tente ser mais específico");
                }

            }).catch(err => {
                console.log(err);
                message.channel.send("Não encontrei o jogo que vc quer jogar! Tente ser mais específico");
            });

        }

    }
    if (command === prefix + "baro") {

        const WF = new Warframe(options);
        WF.voidTrader.then(baro => {

            var nao = "";

            if (!baro.active) nao = "não";

            var baroEmbed = new Discord.MessageEmbed()
                .setTitle("Baro " + nao + " está ativo")
                .setColor('RANDOM');

            if (baro.goodies[1]) {

                var lista = [];
                console.log(baro.goodies[1]);
                baro.goodies.forEach(goodie => {

                    lista.push('**' + goodie.item + '**  (' + goodie.ducats + ' Ducats, ' + goodie.credits + 'CR)\n');

                });

                baroEmbed.setDescription(lista);
            }
            else baroEmbed.setDescription("Nenhum item disponivel")

            baroEmbed.addField("Baro vai aparecer em:", baro.relay);
            baroEmbed.addField("Baro chega em:", baro.fromString.replace("Baro Ki\'Teer arrives in ", ""));
            baroEmbed.addField("Baro vai embora em:", baro.untilString.replace("Baro Ki\'Teer leaves in ", ""));
            if (!baro.active) baroEmbed.setThumbnail('https://scontent.fpoo4-1.fna.fbcdn.net/v/t1.0-9/21768367_1923986577854008_6762904672917938465_n.png?_nc_cat=101&_nc_oc=AQkVyXBLJB9s_pr49ROYl5H1mo0b_Fe4sKzxQL7kzbE62RZC_XlsdaZd5_BQRfBsZX4&_nc_ht=scontent.fpoo4-1.fna&oh=91ebd5154c58c6c56ed2adc6815c2270&oe=5E9AA2B9');
            else baroEmbed.setThumbnail('https://78.media.tumblr.com/105e12339dc6feb05ae224bceea7c4ac/tumblr_nomuhaKQTw1uni8ipo2_500.png');
            message.channel.send(baroEmbed);

        }).catch(err => {
            console.log(err);
            message.channel.send("Ocorreu um erro!!!/n" + err);
        });

    }

    if (command === prefix + "darvo") {

        const WF = new Warframe(options);

        WF.dailyDeals.then(darvo => {

            message.channel.send("Darvo esta vendendo " + darvo[0].item + " por " + darvo[0].salePrice + "pl   (Tempo restante: " + darvo[0].countdown + ")");

        })

    }

    if (command === prefix + "fendas") {
        const WF = new Warframe(options);

        WF.fissures.then(fendas => {

            var tipoMissao = "";

            var fendaEmbed = new Discord.MessageEmbed()
                .setTitle("Fendas do Void")
                .setColor('RANDOM')
                .setThumbnail("http://content.warframe.com/MobileExport/Lotus/Interface/Icons/Store/Luminous.png");
            fendas.forEach((fenda) => {

                switch (fenda.type) {
                    case "Excavation": {
                        tipoMissao = "Escavação (Melhor fenda)";
                    } break;
                    case "Survival": {
                        tipoMissao = "Sobrevivência";
                    } break;
                    case "Defense": {
                        tipoMissao = "Defesa";
                    } break;
                    case "Spy": {
                        tipoMissao = "Espionagem";
                    } break;
                    case "Mobile Defense": {
                        tipoMissao = "Defesa Móvel";
                    } break;
                    case "Extermination": {
                        tipoMissao = "Extermínio";
                    } break;
                    case "Disruption": {
                        tipoMissao = "Interferência (Missão dos conduítes)";
                    } break;
                    case "Interception": {
                        tipoMissao = "Interceptação (Missão das torres de rádio)";
                    } break;
                    case "Sabotage": {
                        tipoMissao = "Sabotagem";
                    } break;
                    case "Rescue": {
                        tipoMissao = "Resgate";
                    } break;
                    default: {
                        tipoMissao = fenda.type;
                    }
                }

                fendaEmbed.addField(fenda.node + "(" + tipoMissao + ")", fenda.tierClass + "\n" + fenda.countdown);

            });

            message.channel.send(fendaEmbed);

        })
    }
    if (command === prefix + "downloadmusica") {

        if (tocando && fila[0]) {

            var name = "./" + filanome[0] + '.mp3';
            message.channel.send("OK! Vou tentar baixar " + name);
            ytdl(fila[0], { filter: "audioonly", format: "mp3" })
                .pipe(fs.createWriteStream(name))
                .on('end', () => {
                    message.channel.sendFile(name);
                });

        }

    }

    if (command === prefix + "mp3") {

        if (args[1]) {

            message.channel.send("OK! Vou tentar baixar!");
            ytdl(args[1], { filter: "audioonly", format: "mp3" })
                .pipe(fs.createWriteStream('./tempaudio.mp3'))
                .on('end', () => {
                    message.channel.sendFile('tempaudio.mp3');
                });

        }

    }

    //----------------ADMIN COMMANDS------------------------

    if (command === prefix + "help") {

        var helpembed = new Discord.MessageEmbed()
            .setAuthor("AJUDA")
            .setTitle("**COMANDOS:**")
            .setColor('RANDOM')
            .setThumbnail("https://cdn.discordapp.com/attachments/494191132318892043/523536199995097099/BRobot_Help.png")
            .addField("**" + prefix + "ask**:", "Para fazer uma pergunta!")
            .addField("**" + prefix + "matematica**:", "Esse comando pode te dar algumas instruções de como eu posso te ajudar com matemática!")
            .addField("**" + prefix + "gif**:", "Busca gifs no site Giphy, você pode usar esse comando sozinho para gerar uma gif aleatória, ou escrever uma tag depois do comando para ver algo mais específico")
            .addField("**" + prefix + "parouimpar**:", "Esse comando serve para brincarmos de par ou ímpar! Para mais instruções, basta digitar o comando para descobrir mais sobre ele")
            .addField("**" + prefix + "desenha**:", "Eu desenho algo aleatório para você!")
            .addField("**" + prefix + "play**:", "Toca músicas no canal de voz #música, utilize o comando para saber mais sobre ele")
            .addField("**" + prefix + "reddit**:", "Busca imagens, gifs e vídeos direto do Reddit")
            .addField("**" + prefix + "joke**", "Com esse comando eu conto piadas de tiozão do pavê (Spirik)")
            .addField("**" + prefix + "steam** (nome do jogo):", "Com esse comando eu busco informações básicas de um jogo na Steam e mostro pra você")
            .addField("**" + prefix + "steamnews** (numero de news) (nome do jogo)", "Com esse comando eu posso mostrar a central de notícias de um jogo na Steam pra você")
            .addField("**" + prefix + "google** (sua pesquisa)", "Eu consigo pesquisar no google! \nPosso fazer até 100 pesquisas por dia (Pirik n quer pagar o plano de 1000 pesquisas <:doidinha:404444360537538571>)\nCada pesquisa retorna até 3 resultados, com link incluso!)")
            .addField("**" + prefix + "playlist**", "A mesma coisa do play, mas esse busca exclusivamente playlists!")
            .addField("**" + prefix + "vid** (Nome)", "Busca e mostra vídeos no youtube (primeiro resultado)")
            .addField("**" + prefix + "cringe**", "Mostra conteúdos de vergonha alheia")
            .addField("**" + prefix + "randomchar**", "Cria um personagem aleatório pra vc!")
            .addField("**" + prefix + "addresp**", "Adiciona uma nova resposta para uma frase já ensinada!!")
            .addField("**" + prefix + "salvarlista**", "Salva a playlist atual no seu nome , pra vc poder chamar ela quando quiser!")
            .addField("**" + prefix + "minhalista**", "Adiciona as músicas da sua playlist pessoal na fila principal")
            .addField("**" + prefix + "addlista**", "Adiciona a música atual na sua playlist pessoal")
            .addField("**" + prefix + "campominado**", "Faz um joguinho simples de campo minado, usando emojis :boom:")
            .addField("**" + prefix + "phuck**", "Transforma uma frase normal em algo mais interessante")
            .addField("**" + prefix + "baro**", "Mostra itens que o baro vende ou quanto tempo ate q ele fique ativo")
            .addField("**" + prefix + "darvo**", "mostra o item em oferta do darvo")
            .addField("**" + prefix + "fendas**", "Mostra as Fendas do void atuais")
            .setFooter("Novos comandos serão adicionados em breve");


        message.author.send(helpembed);

    }

    if (command === prefix + "ded") {
        message.channel.send("Tudo On! <:brobot:502145028106223617> <:blz:404429279812780032> ");
    }
    if (message.channel.type == "dm") return;

    if (command === prefix + "kick") {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":no_entry: Desculpe, sem permissão.");

        let expulso = message.mentions.members.first();
        var motivo = args.slice(2).join(" ");

        if (!args[1]) return message.channel.send("Mas eu vou kickar quem? Você? Marque o usuário que vc quer kickar! (vc marca as pessoas com @)");

        var kickEmbed = new Discord.MessageEmbed()
            .setAuthor(expulso.displayName + " foi expulso do servidor!")
            .setTitle("Reason: " + motivo)
            .setThumbnail(message.author.avatarURL)
            .setColor("RANDOM");

        var NOTreasonEmbed = new Discord.MessageEmbed()
            .setAuthor(expulso.displayName + " foi expulso do servidor!")
            .setThumbnail(message.author.avatarURL)
            .setColor("RANDOM");

        if (!motivo) {
            message.channel.send(NOTreasonEmbed);
            expulso.kick();
        } else
            message.channel.send(kickEmbed);
        expulso.kick();
    }
    if (command === prefix + "avatar") {
        let target = message.mentions.users.first() || message.author;

        message.channel.send({
            files: [
                {
                    attachment: target.displayAvatarURL,
                    name: "avatar.png"
                }
            ]
        });
    }




});
client.login(process.env.TOKEN);