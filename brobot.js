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
var fila = [];
var filanome = [];

//Piadas
var Joke = require('give-me-a-joke');

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

// Configuração
const config = require('./config.json');
var prefix = config.prefix;
var music = config.music;
var darkhole = config.darkhole;

var segundaresp = false;
var tocando = false;
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

client.on('error', function () {

    var date = new Date();
    console.log("Ocorreu um erro de conexão Às " + date.getHours() - 3 + ":" + date.getMinutes());

});
client.on("ready", function () { // Evento "quando a client estiver pronta/ligada" função:


    client.on('message', message => {
        var date = new Date();
        if (message.isMentioned(client.user)) {
            message.reply("pra q vc ta me enchendo o saco em plenas " + date.getHours() - 3 + " horas? Fala o q q vc quer");
        }
    });

    /*-= STATUS DO BOT =-*/
    /*-=-=-=-=-=-=-=-=-=*/
    setInterval(function () {
        let statuses = ["jogos mais caros que os seus", "Jogos que vc quer ter", "Mineirinho Ultra Adventures", "Hentaikey.com", "Mu", "Runescape", "Red Dead Redemption 2", "Kamasutra Pro", "Um Guei leu isso", "Reddit", "Twitter", "Mass Effect: Andromeda"];
        let status = statuses[Math.floor(Math.random() * statuses.length)]

        client.user.setPresence({ game: { name: status }, status: 'online' });

        client.user.setPresence({ activity: { name: status }, status: 'online' })
    }, 240000);
    setInterval(function () {

        let subreddit = ["DiretoDoZapZap", "memes", "terriblefacebookmemes", "dankmemes"];
        randomimg(subreddit[Math.floor(Math.random() * subreddit.length)])
            .then(url => {

                var chan = client.channels.get("553644829826088980");
                chan.send(url);

            }).catch(e => {
                console.error(e);
            });

    }, 7200000);
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
        dispatcher = connection.playStream(ytdl(fila[0], { filter: "audioonly" }));
        message.channel.send("Tocando: **" + filanome[0] + "**");
        tocando = true;
        dispatcher.on("end", () => {
            votounext.clear();
            votoupause.clear();
            votouresume.clear();
            votoustop.clear();
            votosnext = 0;
            votospause = 0;
            votosresume = 0;
            votosstop = 0;
            filanome.shift();
            fila.shift();
            if (fila[0]) {
                Play(connection);
            }
            else {
                channel = client.channels.get(music);
                channel.leave();
                message.channel.send("Terminei por aqui. Me chame qnd quiser ouvir algo de novo ;)");
                tocando = false;
            }

        });


    }
    function PlayRadio(connection, url) {

        radiodispatcher = connection.playStream(ytdl(url, { quality: '93' }));
        radiodispatcher.on("end", () => {



        });

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
            }

        }


    }
    if (message.content.toLowerCase().includes("brobot") && !message.content.startsWith(prefix)) {

        return firebase.database().ref('/conversas/' + message.content.toLowerCase()).once('value').then(function (snapshot) {
            var resp = (snapshot.val() && snapshot.val().resp) || 'nope';
            if (resp === "nope") {
                perg = message.content.toLowerCase();
                autorpergunta = message.author.id;
                segundaresp = true;
                message.channel.send("Ainda não tenho uma resposta pra isso... o que eu deveria falar nessa situação?");
            }
            else {

                if (resp.includes("-")) {

                    var listaresps = resp.split("-");
                    message.channel.send(listaresps[randomInt(listaresps.length)].trim());

                }
                else {
                    message.channel.send(resp);
                }


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

    if (command === prefix + "server") {

        message.channel.send("Estou sendo Hosteado em **Heroku.com** <:poggers:464204342463823892>");


    }
    if (command === prefix + "play") {
        console.log("Comando play requisitado por: " + message.author.username);
        var url = message.content.replace(command, "").replace(args[1], "").trim() + "";
        message.delete();
        const channel = client.channels.get(music);
        if (args[2]) {

            if (args[1] === "url") {
                if (!channel) return console.error("Canal Inexistente!");
                if (tocando) {
                    fila.push(url);
                    message.channel.send("Anotado! Vou deixar na fila!");
                    var id = ytdl.getURLVideoID(url);
                    ytdl.getInfo(id, function (err, info) {
                        if (err) throw err;
                        var title = info.title;
                        filanome.push(title);
                    });
                } else if (args[1 === "name"]) {
                    message.channel.send("Bora lá! :musical_note:");
                    channel.join().then(connection => {
                        fila.push(url);
                        var id = ytdl.getURLVideoID(url);
                        ytdl.getInfo(id, function (err, info) {
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

                    const channel = client.channels.get(music);
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
                "**" + prefix + "stop:** Abre um voto para parar a música e resetar a fila" +
                "**" + prefix + "shuffle:** Randomiza a playlist");
        }



    }
    if (command === prefix + "shuffle") {

        if (fila[3] && filanome[3]) {

            shuffle(fila, filanome);
            message.channel.send("Ok! Playlist devidamente afofada!");

        }
        else {
            message.channel.send("É necessário pelo menos 4 músicas na fila para fazer shuffle!");
        }

    }
    if (command === prefix + "pause" && tocando) {
        console.log("Comando pause requisitado por: " + message.author.username);

        if (votoupause.has(message.author.id)) {
            message.channel.send("<:fred:404438414201454594>");
            message.reply("vc já votou");
        }
        else {
            if (message.member.voiceChannelID === music) {
                votoupause.add(message.author.id);
                var chan = client.channels.get(music);
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
                message.channel.send("Vc nem tá participando, " + message.author + "Pq vc n vem com a gente? :smile: :musical_note:  \n https://discord.gg/XEnrPmX");
            }

        }

    }
    if (command === prefix + "resume" && !tocando) {
        console.log("Comando resume requisitado por: " + message.author.username);

        if (votouresume.has(message.author.id)) {
            message.channel.send("<:fred:404438414201454594>");
            message.reply("vc já votou");
        }
        else {
            if (message.member.voiceChannelID === music) {
                votouresume.add(message.author.id);
                var chan = client.channels.get(music);
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
                message.channel.send("Vc nem tá participando, " + message.author + "Pq vc n vem com a gente? :smile: :musical_note:  \n https://discord.gg/XEnrPmX");
            }

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
        console.log("Comando stop requisitado por: " + message.author.username);

        if (votoustop.has(message.author.id)) {
            message.channel.send("<:fred:404438414201454594>");
            message.reply("vc já votou");
        }
        else {
            if (message.member.voiceChannelID === music) {
                votoustop.add(message.author.id);
                var chan = client.channels.get(music);
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
                    votoustop.clear();
                    dispatcher.end();
                }
                else {
                    message.channel.send(message.author + " votou para parar e resetar, temos " + votosstop + "/" + pessoas + " a favor de parar");
                }

            }
            else {
                message.channel.send("Vc nem tá participando, " + message.author + ". Pq vc n vem com a gente? :smile: :musical_note:  \n https://discord.gg/XEnrPmX");
            }


        }

    }
    if (command === prefix + "next") {
        console.log("Comando next requisitado por: " + message.author.username);

        if (votounext.has(message.author.id)) {
            message.channel.send("<:fred:404438414201454594>");
            message.reply("vc já votou");
        }
        else {
            if (message.member.voiceChannelID === music) {
                votounext.add(message.author.id);
                var chan = client.channels.get(music);
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
                message.channel.send("Vc nem tá participando, " + message.author + ". Pq vc n vem com a gente? :smile: :musical_note:  \n https://discord.gg/XEnrPmX");
            }

        }

    }
    if (command === prefix + "fila") {
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
            var listEmbed = new Discord.RichEmbed()
                .setTitle("**Lista de Músicas atual (mostra até 25 músicas na fila)**:")
                .setThumbnail("https://media.tenor.com/images/aafec9380ab6cb4b711000761c16726e/tenor.gif")
            listEmbed.addField("**▷" + filanome[0] + "**", "---------------------Próximas Faixas---------------------")
                .setColor('RANDOM');

            for (var i = 1; i < num; i++) {

                listEmbed.addField(filanome[i], "---------------------------------------------------------");

            }

            message.channel.send(listEmbed);

        }
        else {
            message.channel.send("Não Há mais músicas na fila!");
        }

    }

    if (command === prefix + "ask") {
        console.log("Comando ask requisitado por: " + message.author.username);
        message.channel.send("https://cdn.discordapp.com/attachments/494191132318892043/510206947824369695/BRobot_think.gif").then(msg => {
            msg.delete(3000)
        })
            .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

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
            msg.delete(4500)
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

                    message.channel.send("Ganhei! Mais sorte na próxima, " + message.author);

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
                    message.channel.send("Ganhei! Mais sorte na próxima, " + message.author);
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
                            var gameEmbed = new Discord.RichEmbed()
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
                            var newsEmbed = new Discord.RichEmbed()
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
                resultEmbed = new Discord.RichEmbed()
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

                        const channel = client.channels.get(music);

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

                    const channel = client.channels.get(music);

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

        var charEmbed = new Discord.RichEmbed()
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

        if (fila[1]) {
            message.channel.send("Salvando a lista atual pra vc!");
            var links = "";
            var nomes = "";
            for (var i = 0; i < fila.length; i++) {
                if (i === 0) {
                    links += fila[i];
                    nomes += filanome[i];
                } else {
                    links += "," + fila[i];
                    nomes += "," + filanome[i];
                }


            }
            firebase.database().ref('playlists/' + message.author.username).set({
                names: nomes,
                urls: links
            });
            message.channel.send("Sua playlist foi salva no seu nome! quando quiser reproduzir ela, use **" + prefix + "minhalista**");
        }
        else {
            message.channel.send("É preciso ter pelo menos 2 músicas na fila atual para poder salvar como uma playlist");
        }


    }
    if (command === prefix + "minhalista") {

        return firebase.database().ref('/playlists/' + message.author.username).once('value').then(function (snapshot) {
            var names = (snapshot.val() && snapshot.val().names) || 'nope';
            var links = (snapshot.val() && snapshot.val().urls) || 'nope';

            if (names === "nope" || links === "nope") {

                message.channel.send("Aparentemente vc não tem uma playlist registrada aqui...\nCrie uma playlist com o **" + prefix + "play** ou **" + prefix + "playlist** e use **" + prefix + "salvarlista** para salvar sua própria playlist :)");

            }
            else {

                var listanomes = names.split(",");
                var listalinks = links.split(",");

                for (var i = 0; i < listalinks.length; i++) {

                    fila.push(listalinks[i]);
                    filanome.push(listanomes[i]);

                }
                if (tocando) {

                    message.channel.send("Suas músicas foram adicionadas na fila principal!");

                }
                else {
                    var channel = client.channels.get(music);
                    channel.join().then(connection => {
                        message.channel.send("Partiu! :musical_note:");
                        Play(connection);

                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });
                }

            }

        });

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
            var pessoas = message.channel.members.filter(m => m.presence.status === 'online').size;
            console.log("tem " + pessoas + " online");
            const chan = message.channel;
            const voteEmbed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle(message.author.username + " iniciou uma votação:")
                .setDescription(desc)
                .setFooter("Use reações para votar");

            message.channel.send(voteEmbed).then(msg => {

                msg.react('👍').then(() => msg.react('👎'));

                const filter = (reaction, user) => {
                    return ['👍', '👎'].includes(reaction.emoji.name);
                };

                msg.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '👍') {
                            votosSim = votosSim + 1;
                            if (votosSim > pessoas / 2) {
                                const yesEmbed = new Discord.RichEmbed()
                                    .setColor('RANDOM')
                                    .setTitle("Fim da Votação")
                                    .setDescription("Votação Aprovada!")
                                    .setFooter("Obrigado por votar!");
                                chan.send(yesEmbed);
                            }
                        }
                        else if (reaction.emoji.name === '👎') {
                            votosNao = votosNao + 1;
                            if (votosNao > pessoas / 2) {
                                const noEmbed = new Discord.RichEmbed()
                                    .setColor('RANDOM')
                                    .setTitle("Fim da Votação")
                                    .setDescription("Votação Negada!")
                                    .setFooter("Obrigado por votar!");
                                chan.send(noEmbed);
                            }
                        }
                    })
                    .catch(collected => {
                        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                    });

            });

        }
        else {
            message.channel.send("Use direito!\n**" + prefix + "rtv** (Sua votação)\n**EX:**\n**" + prefix + "rtv** Jogar Starbound");
        }

    }


    //----------------ADMIN COMMANDS------------------------

    if (command === prefix + "help") {

        var helpembed = new Discord.RichEmbed()
            .setAuthor("AJUDA")
            .setTitle("**COMANDOS:**")
            .setColor('RANDOM')
            .setThumbnail("https://cdn.discordapp.com/attachments/494191132318892043/523536199995097099/BRobot_Help.png")
            .addField("**" + prefix + "ask**:", "Para fazer uma pergunta!")
            .addField("**" + prefix + "ship**:", "Com esse comando eu posso te dizer se um ship é bom ou não.")
            .addField("**" + prefix + "matematica**:", "Esse comando pode te dar algumas instruções de como eu posso te ajudar com matemática!")
            .addField("**" + prefix + "olhaso**", "Use esse comando se quiser me mostrar algo.")
            .addField("**" + prefix + "bomdia**, **" + prefix + "boatarde** ou **" + prefix + "boanoite**", "Eu respondo a cada um desses comandos de forma diferente de acordo com a hora do dia!")
            .addField("**" + prefix + "gif**:", "Busca gifs no site Giphy, você pode usar esse comando sozinho para gerar uma gif aleatória, ou escrever uma tag depois do comando para ver algo mais específico")
            .addField("**" + prefix + "parouimpar**:", "Esse comando serve para brincarmos de par ou ímpar! Para mais instruções, basta digitar o comando para descobrir mais sobre ele")
            .addField("**" + prefix + "desenha**:", "Eu desenho algo aleatório para você!")
            .addField("**" + prefix + "play**:", "Toca músicas no canal de voz #música, utilize o comando para saber mais sobre ele")
            .addField("**" + prefix + "radio**:", "Toca rádios ao vivo no canal #música")
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
            .addField("**" + prefix + "campominado**", "Faz um joguinho simples de campo minado, usando emojis :boom:")
            .addBlankField()
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

        var kickEmbed = new Discord.RichEmbed()
            .setAuthor(expulso.displayName + " foi expulso do servidor!")
            .setTitle("Reason: " + motivo)
            .setThumbnail(message.author.avatarURL)
            .setColor("RANDOM");

        var NOTreasonEmbed = new Discord.RichEmbed()
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