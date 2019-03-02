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
var filapics = [];

//Piadas
var Joke = require('give-me-a-joke');

//Steam
const steam = require('steam-provider');
const steamnews = require('steam-news');

//Google
let google_customsearch = require('@datafire/google_customsearch').create();

//OOOH BOOY
const Pornsearch = require('pornsearch');

//Conversor de moedas
const convertCurrency = require('nodejs-currency-converter');

//Diversos
var randomInt = require('random-int');
var randomFloat = require('random-float');
var casual = require('casual');
var toonavatar = require('cartoon-avatar');
const randomFloatPro = require('random-float-pro');

// Configuração
const config = require('./config.json');
var prefix = config.prefix;
var music = config.music;
var darkhole = config.darkhole;

//Variaveis Diversas
var medo = false;
var segundaresp = false;
var tocando = false;
var dispatcher;
var radiodispatcher;
var votospause = 0;
var votosresume = 0;
var votosnext = 0;
var votosstop = 0;
const votounext = new Set();
const votoupause = new Set();
const votouresume = new Set();
const votoustop = new Set();

client.on('error', function () {

    var date = new Date();
    console.log("Ocorreu um erro de conexão Às " + date.getHours() + ":" + date.getMinutes());

});
client.on("ready", function () { // Evento "quando a client estiver pronta/ligada" função:


    client.on('message', message => {
        var date = new Date();
        if (message.isMentioned(client.user)) {
            message.reply("pra q vc ta me enchendo o saco em plenas " + date.getHours() + " horas? Fala o q q vc quer");
        }
    });

    /*-= STATUS DO BOT =-*/
    /*-=-=-=-=-=-=-=-=-=*/
    setInterval(function () {
        let statuses = ["jogos mais caros que os seus", "Jogos que vc quer ter", "Mineirinho Ultra Adventures", "Hentaikey.com", "Mu", "Runescape", "Red Dead Redemption 2", "Kamasutra Pro", "Um Guei leu isso"]; // Status do Dark Code que atualizam a cada 1 minuto. Para adicionar um novo apenas acrescente com vírgula... exemplo; let statuses = ["Dark Code™ | &help", "oi", "sou um bot lescal com nescau :3"];
        let status = statuses[Math.floor(Math.random() * statuses.length)]

        client.user.setPresence({ game: { name: status }, status: 'online' });

        client.user.setPresence({ activity: { name: status }, status: 'online' })
    }, 60000);
    setInterval(function () {

        let subreddit = ["rule34", "rule34 comics", "asseffect", "PokePorn", "animalcrossingr34", "rule34 abuse", "NSFW_HTML5", "nsfw_sexy_gif", "nsfw_gif"];
        randomimg(subreddit[Math.floor(Math.random() * subreddit.length)])
            .then(url => {

                var chan = client.channels.get(darkhole);
                chan.send(url);

            }).catch(e => {
                console.error(e);
            });

    }, 3600000);
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
        dispatcher.on("end", end => {
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
        radiodispatcher.on("end", end => {



        });

    }

    const messageArray = message.content.split(" ");
    const command = messageArray[0];
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //----------------- FUN COMMANDS -----------------
    if (segundaresp) {

        if (message.content.includes("nada não") || message.content.includes("nada")) {

            message.channel.send("Não me chamem atoa ok? Estou ocupado aki sendo foda");
            segundaresp = false;
        }
        else if (message.content.includes("sua mãe") || message.content.includes("sua mae")) {

            message.channel.send("Eu nem tenho mãe ;-;");
            segundaresp = false;

        }
        else if (message.content.includes("sim") || message.content.includes("Sim") || message.content.includes("ss") || message.content.includes("Ss") || message.content.includes("si") || message.content.includes("yee") || message.content.includes("yuss") || message.content.includes("yup")) {

            message.channel.send("Ah ok, só confirmando. Se quiser ajuda usa o **" + prefix + "help**faz favor");
            segundaresp = false;

        }
        else if (message.content.includes("não") || message.content.includes("Não") || message.content.includes("nn") || message.content.includes("Nn") || message.content.includes("no") || message.content.includes("nah") || message.content.includes("nope") || message.content.includes("nop")) {

            message.channel.send("E tem outro Brobot aki? Acho q não hein");
            segundaresp = false;

        }
        else {

            segundaresp = false;

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

            if (args[1].includes("cock") || args[1].includes("penis") || args[1].includes("pinto") || args[1].includes("jiromba") || args[1].includes("caralho") || args[1].includes("COCK") || args[1].includes("PENIS") || args[1].includes("PINTO") || args[1].includes("JIROMBA") || args[1].includes("CARALHO")) {

                message.channel.send("**VÊ SE VIRA HOMEM, RAPAZ >:(**");

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
                var votos = 0;
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
    if (command === prefix + "radio") {
        console.log("Comando radio requisitado por: " + message.author.username);
        var url = "";
        if (args[1]) {
            const channel = client.channels.get(music);
            switch (args[1]) {
                case "lofi":

                    url = "https://www.youtube.com/watch?v=hHW1oY26kxQ";
                    channel.join().then(connection => {
                        if (radiodispatcher) {
                            radiodispatcher.end();
                        }
                        if (dispatcher) {
                            dispatcher.end();
                        }
                        PlayRadio(connection, url);
                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });

                    break;
                case "vintage":

                    url = "https://www.youtube.com/watch?v=hHyy_l0Hby8";
                    channel.join().then(connection => {
                        if (radiodispatcher) {
                            radiodispatcher.end();
                        }
                        if (dispatcher) {
                            dispatcher.end();
                        }
                        PlayRadio(connection, url);
                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });

                    break;
                case "gaming":

                    url = "https://www.youtube.com/watch?v=GVC5adzPpiE";
                    channel.join().then(connection => {
                        if (radiodispatcher) {
                            radiodispatcher.end();
                        }
                        if (dispatcher) {
                            dispatcher.end();
                        }
                        PlayRadio(connection, url);
                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });

                    break;
                case "fantasy":

                    url = "https://www.youtube.com/watch?v=_aKThQcLbmc";
                    channel.join().then(connection => {
                        if (radiodispatcher) {
                            radiodispatcher.end();
                        }
                        if (dispatcher) {
                            dispatcher.end();
                        }
                        PlayRadio(connection, url);
                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });

                    break;
                case "calmjazz":

                    url = "https://www.youtube.com/watch?v=2ccaHpy5Ewo";
                    channel.join().then(connection => {
                        if (radiodispatcher) {
                            radiodispatcher.end();
                        }
                        if (dispatcher) {
                            dispatcher.end();
                        }
                        PlayRadio(connection, url);
                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });

                    break;
                case "nightcorerock":

                    url = "https://www.youtube.com/watch?v=qrNSt3BXJg8";
                    channel.join().then(connection => {
                        if (radiodispatcher) {
                            radiodispatcher.end();
                        }
                        if (dispatcher) {
                            dispatcher.end();
                        }
                        PlayRadio(connection, url);
                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });

                    break;
                case "piano":

                    url = "https://www.youtube.com/watch?v=rLMHGjoxJdQ";
                    channel.join().then(connection => {
                        if (radiodispatcher) {
                            radiodispatcher.end();
                        }
                        if (dispatcher) {
                            dispatcher.end();
                        }
                        PlayRadio(connection, url);
                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });

                    break;
                case "nintendo":

                    url = "https://www.youtube.com/watch?v=cA3D-2c33DM";
                    channel.join().then(connection => {
                        if (radiodispatcher) {
                            radiodispatcher.end();
                        }
                        if (dispatcher) {
                            dispatcher.end();
                        }
                        PlayRadio(connection, url);
                    }).catch(e => {
                        // Oh no, it errored! Let's log it to console :)
                        console.error(e);
                    });

                    break;
            }
        }
        else {

            message.channel.send("Opa! Escolha uma radio! use **" + prefix + "radio** (nomedaradio) \n" +
                "**Radios disponíveis:**\n" +
                "**lofi** - Lo-fi Music \n" +
                "**vintage** - Músicas antigas \n" +
                "**gaming** - Músicas para jogar \n" +
                "**fantasy** - Céltica e fantasia\n" +
                "**calmjazz** - Jazz calmo \n" +
                "**piano** - Piano (derp) \n" +
                "**nightcorerock** - NightCore\n" +
                "**nintendo** - Músicas dos jogos da Nintendo");

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
    if (command === prefix + "ship") {
        console.log("Comando ship requisitado por: " + message.author.username);
        var name1 = messageArray[1].substring(0, 2);
        var name2 = messageArray[2].substring(3);
        var shipname = name1 + name2;
        let replies = ["MDS ELES SÃO MT FOFOOOOOS! EU SHIPO ELES TBM! #" + shipname, "Vei pq eles não tão juntos ainda? ELES TEM Q FICAR JUNTOOOOOS ;-; #" + shipname + "forever", "Nâo mesmo '-'", "VEI AIDS É MELHOR Q UM SHIP DESSES"]; // Respostas do Dark Code.
        if (args[2]) { // Se o argumento for [1], ou seja um espaço a mais, ele vai fazer esta ação:
            message.channel.send(replies[Math.floor(Math.random() * replies.length)])
        } else // else = Caso ao contrário fazer: ou seja se não for args[1] ele vai mandar isso:
            message.channel.send("Faça um ship!\n**Exemplo:** \n**" + prefix + "ship** eu waifu");
    }
    if (command === prefix + "olhaso") {
        console.log("Comando olhaso requisitado por: " + message.author.username);
        let replies = ["<:chris:404439721968795648>", "<:poggers:464204342463823892>", "<:feelsbadman:488683259539226633>", "<:feelsgoodman:488687465364979712>", "<:monkas:464543183997501440>", "<:blz:404429279812780032>", "https://cdn.discordapp.com/attachments/404058102565044234/493839622758072341/WhatsApp_Image_2018-09-24_at_13.46.43.jpeg", "https://cdn.discordapp.com/attachments/404058102565044234/493839621394792448/WhatsApp_Image_2018-09-24_at_13.46.42.jpeg", "https://cdn.discordapp.com/attachments/404058102565044234/493839620526702602/WhatsApp_Image_2018-09-24_at_13.46.47.jpeg", "https://cdn.discordapp.com/attachments/404058102565044234/493839615535349770/WhatsApp_Image_2018-09-24_at_13.46.48.jpeg", "https://cdn.discordapp.com/attachments/404058102565044234/493839273431269387/WhatsApp_Image_2018-09-24_at_13.47.03.jpeg", "https://cdn.discordapp.com/attachments/404058102565044234/493839150546419714/WhatsApp_Image_2018-09-24_at_14.14.53_1.jpeg", "https://cdn.discordapp.com/attachments/404058102565044234/493839199531827216/WhatsApp_Image_2018-09-24_at_14.03.41.jpeg", "https://cdn.discordapp.com/attachments/494191132318892043/504706421502509057/BRobot_REACT_SURPRISE.png", "https://cdn.discordapp.com/attachments/494191132318892043/504706421502509057/BRobot_REACT_SURPRISE.png", "https://cdn.discordapp.com/attachments/494191132318892043/498935802932494345/react3.PNG", "https://cdn.discordapp.com/attachments/494191132318892043/498935769109495829/react1.PNG"];
        message.channel.send(replies[Math.floor(Math.random() * replies.length)]);

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

    if (command === prefix + "vlw") {
        message.reply(" não tem por onde! <:chris:404439721968795648>");
    }
    if (command === prefix + "vcentendeu") {

        message.channel.send("<:wat:404459079415889933>");

    }
    if (command === prefix + "funfacts") {
        console.log("Comando funfacts requisitado por: " + message.author.username);
        let replies = ["https://cdn.discordapp.com/attachments/404058102565044234/493836015576940545/WhatsApp_Image_2018-09-24_at_13.47.00.jpeg",
            "https://www.raiseyourbrain.com/wp-content/uploads/2015/01/fun-facts-about-pandas-26-300x200.jpg?x84682", "https://piximus.net/media/20475/fun-facts-1.jpg",
            "https://images.template.net/wp-content/uploads/2015/08/Gecko-Feet-Fact.jpg", "https://img.izismile.com/img/img5/20120604/640/video_gaming_fun_facts_640_04.jpg",
            "https://i.kym-cdn.com/photos/images/original/000/466/001/369.png", "https://m.media-amazon.com/images/M/MV5BNGYyYmZhY2MtMmU2OC00NmMwLWExYTktYTU3NzRjNDBmMjM5L2ltYWdlXkEyXkFqcGdeQXVyNjM2NDIwMzQ@._V1_.jpg",
            "https://i.pinimg.com/originals/e1/82/7e/e1827ea68cf27b8fd1d3eb0285511850.jpg", "https://qph.fs.quoracdn.net/main-qimg-06ddf88599e44dd1615b534b142e9204-c", "https://i.kym-cdn.com/photos/images/original/000/431/247/f0c.png",
            "https://pics.me.me/w-tp-fun-fact-every-character-you-kill-in-assassins-20752602.png", "http://img.izismile.com/img/img5/20120604/640/video_gaming_fun_facts_640_01.jpg",
            "https://i.kym-cdn.com/photos/images/original/000/397/835/f33.png", "https://78.media.tumblr.com/06300aa5fa66060758fbf1f52b71a1f4/tumblr_mk1gxyr1sz1roqv59o1_500.png",
            "https://78.media.tumblr.com/ef0d2d83ec25886ce025b45a3d72af94/tumblr_milrpkMd301roqv59o1_500.png", "https://thechive.files.wordpress.com/2013/01/wtf-interesting-facts-22.jpg?quality=85&strip=info&w=500",
            "https://data.whicdn.com/images/34318990/original.png", "https://i.imgur.com/k8evXfG.png", "https://78.media.tumblr.com/bde223d39ea54233360c4567f13ec426/tumblr_neufccTg9d1roqv59o1_500.png",
            "https://78.media.tumblr.com/169291dac78516a7e494a4f92b9330af/tumblr_nl0m6mECYa1roqv59o1_500.png", "https://i.pinimg.com/originals/f6/b4/f5/f6b4f57ae9e8a7de0e689474c6ca9491.jpg",
            "https://78.media.tumblr.com/2e216af874a0058bcd04bbfc89a0fd28/tumblr_p1ux0o1ntP1roqv59o1_500.png", "https://78.media.tumblr.com/b4cbe425fdb0b778654469d9c2407562/tumblr_nsbxjlcmu31roqv59o1_500.png",
            "https://78.media.tumblr.com/65e4e8801e9e8ed67697fd3c61eced4f/tumblr_mfz2pbU92W1roqv59o1_500.png", "https://i.pinimg.com/originals/07/cf/a4/07cfa4dbd73b918fc4430a27565e6283.png",
            "https://78.media.tumblr.com/6b0e1c11cd00c6cb1a1243d0304fe110/tumblr_njzh0iSsny1roqv59o1_500.png", "http://36.media.tumblr.com/218bf2671deab7331cf714fac279c4af/tumblr_nom6txJtFu1roqv59o1_500.png",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoCmyNtCWMOhn3peCxXOGmk8y3MFmkyZN-F0tFyjqe3_u5ZdRG", "http://aboutube.com/wp-content/uploads/2017/02/tumblr_okx2uby2ii1roqv59o1_500.png",
            "https://78.media.tumblr.com/ec736d9d3271e3e97189b34f78ba55c3/tumblr_nphrtpwRDS1roqv59o1_500.png", "https://i.pinimg.com/236x/10/17/27/101727c8041164adc29dcf78fda2601a--wtf-fun-facts-awesome-facts.jpg",
            "https://www.soumo.eu/wp-content/uploads/2018/03/26003/d59a07298ce1c6dd3d2b44b99e2c1ab1.png", "http://images6.fanpop.com/image/photos/33700000/WTF-fun-fact-random-33735084-499-499.png",
            "https://i.pinimg.com/236x/eb/12/90/eb12906c1c9b111c22b0e1382bcdcc8e--creepy-facts-wtf-fun-facts.jpg"];

        message.channel.send(replies[Math.floor(Math.random() * replies.length)]);

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
    if (command === prefix + "stick") {

        console.log("Comando stick requisitado por: " + message.author.username);
        let gifs = [];
        if (args[1]) {
            giphyclient.search('stickers', { "q": message.content.replace(command, ""), "limit": 30 })
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

            giphyclient.random('stickers', {})
                .then((response) => {

                    message.channel.send(response.data.url);

                })
                .catch((err) => {
                    console.log(err);
                })

        }

    }
    if (command === prefix + "bomdia") {

        var date = new Date();
        let replies = ["Bom dia! :)", "Bom diaaaaaa :3", "Bom dia frô du dia", "SENP.... bom dia :D"];
        if (date.getHours() >= 13 && date.getHours() < 18) {
            message.channel.send("Meio atrasado não? Já são " + date.getHours() + " horas! O correto seria boa tarde! XD");
        }
        else if (date.getHours() > 18) {
            message.channel.send("Olha, seria bom vc olhar pra janela ou pro relógio. Já são " + date.getHours() + " horas! O correto seria boa noite! XD");
        }
        else if (date.getHours() < 5 && date.getHours() > 00) {
            message.channel.send("Boa madrugada! Agora vai dormir pq já são " + date.getHours() + " horas!");
        }
        else if (date.getHours() === 12) {
            message.channel.send("E agora? meio-dia seria bom dia ou boa tarde? :thinking: ..... Bem, bom meio-dia pra tu XD");
        }
        else if (date.getHours() === 00) {
            message.channel.send("meia-noite.... Seria um novo dia com bom dia? ou ainda boa noite? dianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoite \n **RangeError:** Maximum call stack size exceeded");
        }
        else {
            message.channel.send(replies[Math.floor(Math.random() * replies.length)]);
        }


    }
    if (command === prefix + "boatarde") {
        var date = new Date();
        let replies = ["Boa tarde! :)", "Tarde :D", "Uma Excelente tarde para Vossa Senhoria :tophat:", "UOOOOOOUUU, O SENPAI ME NOT.....ahem, boa tarde :D"];

        if (date.getHours() >= 6 && date.getHours() < 12) {
            message.channel.send("Meio adiantado não? ainda são " + date.getHours() + " horas! Quer que o dia passe mais rápido? XD");
        }
        else if (date.getHours() > 18) {
            message.channel.send("Olha, seria bom vc olhar pra janela ou pro relógio. Já são " + date.getHours() + " horas! O correto seria boa noite! XD");
        }
        else if (date.getHours() < 5 && date.getHours() > 00) {
            message.channel.send("Boa madrugada! Agora vai dormir pq já são " + date.getHours() + " horas!");
        }
        else if (date.getHours() === 12) {
            message.channel.send("E agora? meio-dia seria bom dia ou boa tarde? :thinking: ..... Bem, bom meio-dia pra tu XD");
        }
        else if (date.getHours() === 00) {
            message.channel.send("Ah não cara.... é meia noite e vc me fala boa tarde? da onde tu tirou isso?????");
        }
        else {
            message.channel.send(replies[Math.floor(Math.random() * replies.length)]);
        }


    }
    if (command === prefix + "boanoite") {
        var date = new Date();
        let replies = ["Boa noite! :)", "Noite :D", "Noite boa pra jogar! :video_game: ", "Boa noite! Nessas horas da noite eu penso no Sen... SENHOR JOGO DE AÇÃO Q EU VOU JOGAR!"];

        if (date.getHours() >= 6 && date.getHours() < 12) {
            message.channel.send("Olha, já amanheceu viu XD. são " + date.getHours() + " horas! Suspeito q  vc tenha virado a noite jogando? XD");
        }
        else if (date.getHours() === 00) {
            message.channel.send("meia-noite.... Seria um novo dia com bom dia? ou ainda boa noite? dianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoitedianoite \n **RangeError:** Maximum call stack size exceeded");
        }
        else if (date.getHours() < 5 && date.getHours() > 00) {
            message.channel.send("Boa madrugada! Agora vai dormir pq já são " + date.getHours() + " horas!");
        }
        else if (date.getHours() === 12) {
            message.channel.send("Não, não jovem, hoje em dia usamos o sistema 24h então meia-noite é 00h00 e n 12h00");
        }
        else if (date.getHours() > 12 && date.getHours() < 18) {
            message.channel.send("Meio cedo pra boa noite, não? ainda são " + date.getHours() + " horas. Como já diz o sistema de conexão da PSN : Tente novamente mais tarde");
        }
        else {
            message.channel.send(replies[Math.floor(Math.random() * replies.length)]);
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
    if (command === prefix + "porn") {


        if (message.channel.id === darkhole) {
            if (args[2]) {

                if (args[1] === "g") {

                    const Searcher = new Pornsearch(args.slice(2).join(" "));

                    Searcher.gifs()
                        .then(gifs => {

                            var num = Math.floor(Math.random() * gifs.length);
                            message.channel.send("**" + gifs[num].title + "**");
                            message.channel.send(gifs[num].url);

                        });

                }
                else if (args[1] === "v") {

                    const Searcher = new Pornsearch(args.slice(2).join(" "));

                    Searcher.videos()
                        .then(videos => {

                            var num = Math.floor(Math.random() * videos.length);
                            message.channel.send("**" + videos[num].title + " - " + videos[num].duration + "**");
                            message.channel.send(videos[num].url);

                        });

                }
                else {
                    message.channel.send("Faz certo!\nEx: **" + prefix + "porn** (g ou v) (sua pesquisa)");
                }

            }
            else {
                message.channel.send("Faz certo!\nEx: **" + prefix + "porn** (g ou v) (sua pesquisa)");
            }
        }
        message.delete();


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
    if (command === prefix + "rule34") {

        let subreddit = ["rule34", "rule34 comics", "asseffect", "PokePorn", "animalcrossingr34", "rule34 abuse"];
        randomimg(subreddit[Math.floor(Math.random() * subreddit.length)])
            .then(url => {
                if (message.channel.id === darkhole) {
                    message.channel.send(url);
                }
                else {
                    message.delete();
                }

            }).catch(e => {
                console.error(e);
            });

    }
    if (command === prefix + "nsfw") {

        let subreddit = ["NSFW_HTML5", "nsfw_sexy_gif", "nsfw_gif"];
        randomimg(subreddit[Math.floor(Math.random() * subreddit.length)])
            .then(url => {
                if (message.channel.id === darkhole) {
                    message.channel.send(url);
                }
                else {
                    message.delete();
                }

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
    if (command === prefix + "send") {

        if (args[2]) {

            switch (args[1]) {

                case "og": {

                    var chan = client.channels.get("434510369692712962");
                    chan.send(args.slice(2).join(" "));

                }
                    break;
                case "zv": {

                    var chan = client.channels.get("404058088329576450");
                    chan.send(args.slice(2).join(" "));

                }
                    break;
                case "dh": {

                    var chan = client.channels.get(darkhole);
                    chan.send(args.slice(2).join(" "));

                }
                    break;
                case "hq": {

                    var chan = client.channels.get("476225541280890930");
                    chan.send(args.slice(2).join(" "));

                }
                    break;

            }

        }

    }
    if (command === prefix + "conv") {

        if (args[2]) {

            if (isNaN(parseFloat(args[1].replace(",", ".")))) {

                message.channel.send("Opa! Use o comando assim:\n**" + prefix + "conv** (valor) (moeda)\n" +
                    "**EX:**\n **" + prefix + "conv** 300 USD\nPara uma lista de alguns códigos de moeda, use **" + prefix + "moedas**");

            }
            else {
                convertCurrency(parseInt(args[1]), args[2].toUpperCase(), 'BRL').then(response => message.channel.send("R$ " + response)).catch(e => {
                    console.error(e);
                });
            }

        }
        else {
            message.channel.send("Opa!\nUse esse comando assim: **" + prefix + "conv** (VALOR) (MOEDA)\n**EX:**\n**" + prefix + "conv** 45 USD");
        }

    }
    if (command === prefix + "moedas") {

        message.channel.send("Aqui estão algumas moedas:\n" +
            "USD Dólar americano" +
            "CAD Dólar canadense" +
            "AUD Dólar australiano	 Austrália" +
            "EUR Euro" +
            "JPY Iene (Japão)" +
            "CNY Renminbi (China)" +
            "GBP Libra Esterlina (Reino Unido)" +
            "MXN Peso mexicano" +
            "ARS Peso Argentino" +
            "BOB Boliviano" +
            "CLP Peso chileno" +
            "COP Peso colombiano" +
            "CUP Peso cubano" +
            "INR Rupia indiana Índia" +
            "KPW Won norte coreano" +
            "KRW Won sul coreano");

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
            .addField("**" + prefix + "conv**", "Converte qualquer moeda para REAL!")
            .addBlankField()
            .setFooter("Novos comandos serão adicionados em breve");


        message.author.send(helpembed);


    }

    if (command === prefix + "ded") {
        message.channel.send("Tudo On! <:brobot:502145028106223617> :thumbsup: ");
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