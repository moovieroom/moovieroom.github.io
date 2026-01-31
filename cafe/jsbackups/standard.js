/**** variable settings - from cytube's defaults ****/
UI_UserCommands = 1;
/**** END variable settings ****/

/**** Chat Bot variables ****/
// [!8ball] Magic 8 Ball responses
const AskAnswers_Array = [
    "as I see it, yes","it is certain","it is decidedly so","most likely","outlook good","signs point to yes","without a doubt","yes","yes - definitely","you may rely on it", "reply hazy, try again","ask again later","better not tell you now","cannot predict now","concentrate and ask again","don't count on it","my reply is no","my sources say no","outlook not so good","very doubtful"
];

// [!order] vending machine prizes 
const emotes_Array = [
    "menu1","menu2","menu3","menu4","menu5","menu6","menu7","menu8","menu9","menu10","menu11","menu12","menu13","menu14","menu15","menu16","menu17","menu18","menu19","menu20","menu21"
];

// [!unblock] vending machine prizes 
const motivation_Array = [
    "if you can't get past the fear, do it scared","what would help future you?","what can you do to make this moment more pleasant?","make yourself something nice to drink and come back to it after","inspiration and creativity need room to grow","have a stretch or a short walk","give yourself permission to get more comfortable","forget perfectionism, do it messy","what needs to get done now and what can wait for later?","freshen up your space or change work locations"
];

/**** END - Chat Bot variables ****/


// reload script after unexpected re-connection or script URL change

var LOADED = (typeof LOADED==="undefined") ? false : true;
LOADED ? location.reload() : '';

var COMMAND = false;

/**** Chat Bot functions ****/
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPokemon() {
    num=a=Math.round(Math.random()*(493));
    const request = new XMLHttpRequest();
    request.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + num + '/', false);
    request.send(null);

    if (request.status === 200) {
        var pokemon = JSON.parse(request.response);
        imgTag.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+num+'.png';
        $(imagepopup).addClass('show');
        setTimeout(function() { 
            $(imagepopup).removeClass('show');
            imgTag.src='';
        }, 1000);
        return 'you found a ' + capitalizeFirstLetter(pokemon.name) + '!';
    }
}


/**** END Chat Bot functions ****/

// format chat messages before sending and execute commands
function prepareMessage(msg) {
    if (UI_UserCommands=="1" && msg.indexOf("!") == 0) {
        COMMAND=true;
        if (msg.indexOf("!8ball") == 0) {
            // magic 8 ball function, if message begins with !8ball
            rnd=a=Math.round(Math.random()*(AskAnswers_Array.length-1));
            msg='🎱 shake shake shake 🎱  . ݁₊ ⊹ . ݁˖ . ݁ \n' + AskAnswers_Array[rnd];
        } else if (msg.indexOf("!order") == 0) {
            // vending machine function, if message begins with !order
            rnd=a=Math.round(Math.random()*(emotes_Array.length-1));
            msg='coming right up! ' + emotes_Array[rnd];
        } else if (msg.indexOf("!unblock") == 0) {
            // tip function, if message begins with !unblock
            rnd=a=Math.round(Math.random()*(motivation_Array.length-1));
            msg='. ݁₊ ⊹ . ݁ ⟡ ݁ . ⊹ ₊ ݁. ' + motivation_Array[rnd];
        } else if (msg.indexOf("!encounter") == 0) {
            // pokemon function, if message begins with !encounter
            msg=getPokemon();
        } else {	
            COMMAND=false;	
        }	
    }
    return msg;
}

const chatformel = $("#chatwrap").find("form");
chatformel.attr("autocomplete","off");

$("#chatline, #chatbtn").unbind();

$("#chatline").on("keydown", function(ev) {
    if (ev.keyCode==13) {
        if (CHATTHROTTLE) {
            return;
        }
        _msg=$("#chatline").val();
        msg=$("#chatline").val();
        if (msg.trim()) {
            msg=prepareMessage(msg.trim());
            meta={};
            if (COMMAND) {
                socket.emit("chatMsg", {msg:_msg});
                msg='➥ '+msg;
                COMMAND=false;
            }
            if (USEROPTS.adminhat && CLIENT.rank>=255) {
                msg='/a '+msg;
            } else if (USEROPTS.modhat && CLIENT.rank>=Rank.Moderator) {
                meta.modflair=CLIENT.rank;
            }
            if (CLIENT.rank>=2 && msg.indexOf("/m ")===0) {
                meta.modflair=CLIENT.rank;
                msg=msg.substring(3);
            }
            socket.emit("chatMsg", {msg:msg, meta:meta});
            CHATHIST.push($("#chatline").val());
            CHATHISTIDX=CHATHIST.length;
            $("#chatline").val('');
        }
        return;
    } else if (ev.keyCode==9) {
        chatTabComplete();
        ev.preventDefault();
        return false;
    } else if (ev.keyCode==38) {
        if (CHATHISTIDX==CHATHIST.length) {
            CHATHIST.push($("#chatline").val());
        }
        if(CHATHISTIDX>0) {
            CHATHISTIDX--;
            $("#chatline").val(CHATHIST[CHATHISTIDX]);
        }
        ev.preventDefault();
        return false;
    } else if (ev.keyCode==40) {
        if (CHATHISTIDX<CHATHIST.length-1) {
            CHATHISTIDX++;
            $("#chatline").val(CHATHIST[CHATHISTIDX]);
        }
        ev.preventDefault();
        return false;
    }
});

$("#chatbtn").on("click", function() {
    _msg=$("#chatline").val();
    msg=$("#chatline").val();
    if (msg.trim()) {
        msg=prepareMessage(msg.trim());
        if (COMMAND) {
            socket.emit("chatMsg", {msg:_msg});
            msg='➥ '+msg;
            COMMAND=false;
        }
        socket.emit("chatMsg", {msg:msg});
        $("#chatline").val('');
    }
});