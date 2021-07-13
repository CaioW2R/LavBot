const Discord = require('discord.js');
const Ytdl = require('ytdl-core');

const token = 'ODYzOTE0MDgwMTc0ODY2NDcy.YOt0rw.3q8baTwl7a-86exK2wDsfaf-E5w';
const app = new Discord.Client();
let estouPronto = false;

app.on('ready', ()=>{
    console.log('Olá me chamo Lav, acabei de acordar!')
});

app.on('message', (msg)=>{
    //!join =  Bot se junta ao canal de voz
    if (msg.content === '!join') {
        if (msg.member.voiceChanel){   //Verifica se a pessoa que mandou o comando estava no canal de voz
            msg.member.voiceChanel.join(); //Bot entra no canal de voz
            estouPronto = true;
        }
        else {
            msg.channel.send("Você precisa estar conectado a um canal de voz!")
        }

    }

    //!leave =  Bot sai do canal de voz
    else if (msg.content === '!leave') {
        if (msg.member.voiceChanel) {    //Verifica se a pessoa que mandou o comando estava no canal de voz
            msg.member.voiceChanel.leave(); //Bot sai do canal de voz
            estouPronto = false;
        }
        else {
            msg.channel.send("Você precisa estar conectado a um canal de voz!")
        }        
    }

    //!play [Link] =  Bot toca músicas
    else if (msg.content.startsWith('!play ' || '!p')) {
        if (estouPronto) {
            let oQueTocar = msg.content.replace('!play ','')
            if (Ytdl.validateURL(oQueTocar)) {
                msg.member.voiceChanel.connection.playStream(Ytdl(oQueTocar))
            } else {
                msg.channel.send('Esse link não é válido!')
            }
        }
    }
});

app.login(token);