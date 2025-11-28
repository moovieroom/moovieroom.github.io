/**** variable settings - from cytube's defaults ****/
UI_UserCommands = 1;
/**** END variable settings ****/

/**** Cookie Functions ****/
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

const headers = new Headers();
const d = new Date();
let day = d.getDay();

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(+ date + (days * 86400000));
        var expires = "; expires=" + date.toUTCString();
        var maxage = "; max-age=" + (days * 86400000);
    }
    document.cookie = name + "=" + (value || "")  + expires + maxage + "; path=/r/moovieroom";
}

/**** Chat Bot variables ****/
// [!8ball] Magic 8 Ball responses
const AskAnswers_Array = [
    "as I see it, yes","it is certain","it is decidedly so","most likely","outlook good","signs point to yes","without a doubt","yes","yes - definitely","you may rely on it", "reply hazy, try again","ask again later","better not tell you now","cannot predict now","concentrate and ask again","don't count on it","my reply is no","my sources say no","outlook not so good","very doubtful"
];

// [!vend] vending machine prizes 
const emotes_Array = [
    "angelcake","burger1","cherrypie","cheese","drink1","burger2","icecream","cake2","milk1","milk2","milk3","milk4","pizza*","zebracake","junkfood","tea1","sushi1","sushi2","riceball1","snack1","ramen1","ramen2","sake1","kpop1","milkbone","snowcone","cheekystrawb","pancakes1","chocolates1","coffee1","vendsnack1","vendsnack2","vendsnack3","vendsnack4","vendsnack5","vendsnack6","vendsnack7","vendsnack8","vendsnack9","vendsnack10","vendsnack11","vendsnack12","vendsnack13","vendsnack14","vendsnack15","vendsnack16","vendsnack17","vendsnack18","vendsnack19","vendsnack20","vendsnack21","vendsnack22","vendsnack23","vendsnack24","vendsnack25","vendsnack26","vendsnack27","vendsnack28","vendsnack29","vendsnack30","vendsnack31","vendsnack32","vendsnack33","vendsnack34","vendsnack35","vendsnack36","vendsnack37","vendsnack38","vendsnack39","vendsnack40","vendtoy1","vendtoy2","vendtoy3","vendtoy4","vendtoy5","vendtoy6","vendtoy7","vendtoy8","vendtoy9","vendtoy10","vendtoy11","vendtoy12","vendtoy13","vendtoy14","vendtoy15","vendtoy16","vendtoy17"
];

// [!gift] Christmas gifts
const gift_Array = [
    "giftbox","giftcandycane","giftcocoa","giftdeerglobe","giftgingerbreadman","giftgreenpresent","gifthouse","giftknitting","giftpresentglobe","giftredpresent","giftsantaglobe","gifttreat","gifttree","gifttreeglobe","giftcherryicebox","giftjoulutorttu","giftpepernoten","giftpudding","giftstroopwafel","giftyulelog","giftpizelle","giftbuttertart","giftbasket","giftboot","giftbunny1","giftbunny2","giftcake","giftcakepop","giftcandycane2","giftcat1","giftcat2","giftcocoa2","giftcocoa2","giftcocoa3","giftcocoa4","giftcone1","giftcone2","giftcone3","giftcupcake1","giftcupcake2","giftcookie","giftcupcake3","giftdog","giftdog2","giftdog3","gifteggnog","giftessence","giftgameboy","giftcamecube","giftgba","gifthellokitty","gifthouse2","giftipod1","giftipod2","giftidog","giftlamp","giftmixer","giftmoney","giftpresent2","giftpudding2","giftrecord","giftsnes","giftstocking","giftsweater","giftteddy","giftteddy2","giftteddy3","giftteddy4","gifttrain","gifttreat2","giftyulelog2"
];

// [!santa] Santa gifts
const santa_Array = [
    "toybear","toybearsleep","toyblanket","toybunny","toycoal","toycrayons","toygame","toylocket","toysnowman","toybarbie","toybeanie1","toybeanie2","toybear","toybetty","toybopit","toycamera","toydiscman","toygb","toygirltech","toyidog","toylamp","toylipsmack","toyn64","toyplush1","toyplush2","toyplush2","toyplush3","toypolly","toypony1","toypony2","toytalkback","toytama","toyteddy"
];

const queue = document.getElementById("queue");
var sortedVideos = {};
const chatformel = $("#chatwrap").find("form");

const wrapelement = document.getElementById("chatwrap");
const imagepopup = document.createElement("div");
const imgTag = new Image();
imagepopup.id = "image-popup";
wrapelement.appendChild(imagepopup);
imagepopup.appendChild(imgTag);

const snowbutton = document.createElement('button');
const leftcontrols = document.getElementById('leftcontrols');
snowbutton.innerText = '❆ stop snow';
snowbutton.id = 'snowbutton';
snowbutton.className = 'btn btn-sm btn-default snowbutton';
leftcontrols.appendChild(snowbutton);


/**** END - Chat Bot variables ****/


/**** Custom Theme Handling ****/

const themeSelect = document.getElementById('us-theme');

// Remove existing options from options list
Array.from(themeSelect).forEach((option) => {
  themeSelect.removeChild(option)
})

// get or set your new options here.
var newthemeSelect = [
    ["Change your theme!", "/css/themes/slate.css", ""],
    ["Moomin Default", "/css/themes/slate.css", "https://moovieroom.github.io/nonny.css"],
    ["Strawbentines - Valentine's Day Light Mode", "/css/themes/slate.css", "https://moovieroom.github.io/strawbentines.css"],
    ["Dreamentines - Valentine's Day Dark Mode", "/css/themes/slate.css", "https://moovieroom.github.io/valentinesdarkmode.css"],
    ["Summer Bubble - Summer Light Mode", "/css/themes/slate.css", "htatps://moovieroom.github.io/summerbubble.css"],
    ["Summer Nights - Summer Dark Mode", "/css/themes/slate.css", "https://moovieroom.github.io/summernights.css"],
    ["Age of Aquarium", "/css/themes/slate.css", "https://moovieroom.github.io/age-of-aquarium.css"],
    ["Eurovision Mode", "/css/themes/slate.css", "https://moovieroom.github.io/eurovisionmode.css"],
    ["Whimsical Medieval", "/css/themes/slate.css", "https://moovieroom.github.io/whimsidieval.css"],
    ["Moomin Autumn", "/css/themes/slate.css", "https://moovieroom.github.io/autumn.css"],
    ["Halloween", "/css/themes/slate.css", "https://moovieroom.github.io/halloween.css"],
    ["Battyween", "/css/themes/slate.css", "https://moovieroom.github.io/battyween.css"],
    ["Hallosweets", "/css/themes/slate.css", "https://moovieroom.github.io/hallosweets.css"],
    ["Halloween at Home", "/css/themes/slate.css", "https://moovieroom.github.io/halloween-at-home.css"],
    ["Moomin Winter", "/css/themes/slate.css", "https://moovieroom.github.io/winter.css"],
    ["Merry Matryoshka", "/css/themes/slate.css", "https://moovieroom.github.io/matryoshka.css"],
    ["Christmas", "/css/themes/slate.css", "https://moovieroom.github.io/herbalchristmas.css"],
    ["Gingerbread Street", "/css/themes/slate.css", "https://moovieroom.github.io/gingerbreadstreet.css"]
]

// Add new options
newthemeSelect.map((optionData) => {
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(optionData[0]));
    opt.value = optionData[1]
    opt.setAttribute('extcss', optionData[2]);
    themeSelect.appendChild(opt);
})

// swap only custom css
$(themeSelect).change(function(e){
    e.preventDefault;
    var customstyle = themeSelect.options[themeSelect.selectedIndex].getAttribute('extcss');
    setCookie('customtheme', customstyle, 30);
    swapStyleSheet(customstyle);
})

function swapStyleSheet(sheet) {
    document.getElementById("chanexternalcss").setAttribute("href", sheet);  
}

function styleCookieCheck() {
    if (document.cookie.indexOf('customtheme') > -1) {
        let stylecookie = getCookie('customtheme');
        if (stylecookie == 'https://moovieroom.github.io/halloween-at-home.css') {
            swapStyleSheet('https://moovieroom.github.io/whimsidieval.css');
            setCookie('customtheme', 'https://moovieroom.github.io/whimsidieval.css', 30);
        } else {
            swapStyleSheet(stylecookie);
        }
    } else {
        swapStyleSheet('https://moovieroom.github.io/whimsidieval.css');
        setCookie('customtheme', 'https://moovieroom.github.io/whimsidieval.css', 30);
    }
}

/**** END - Custom Theme Handling ****/

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

function daysUntilChristmas() {
    var one_day = 1000 * 60 * 60 * 24
      
    // To set present_dates to two variables
    var present_date = new Date();
      
    // 0-11 is Month in JavaScript
    var christmas_day = new Date(present_date.getFullYear(), 11, 26)
      
    // To Calculate next year's Christmas if passed already.
    if (present_date.getMonth() == 11 && present_date.getDate() > 25)
    christmas_day.setFullYear(christmas_day.getFullYear() + 1)
      
    // To Calculate the result in milliseconds and then converting into days
    var Result = Math.round(christmas_day.getTime() - present_date.getTime()) / (one_day);
      
    // To remove the decimals from the (Result) resulting days value
    return 'there are ' + Result.toFixed(0) + ' days until Christmas!';
}

function getUserCount() {
    var userList = document.getElementById("userlist");
    return userList.childElementCount;
}

function createNonnyList() {
    var nonnies = []
    var userList = document.getElementById("userlist");
    var userListCollection = userList.children;
    var userCount = userList.childElementCount;
    for (i = 0; i < userCount; i++) {
        var currnonny = userListCollection[i];
        var currnonnyName = currnonny.children[1].innerText;
        nonnies.push(currnonnyName);
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
            msg='🎱 shake shake shake 🎱  ✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧ ｡･:*:･ﾟ★,｡･:*:･ﾟ☆ \n' + AskAnswers_Array[rnd];
        } else if (msg.indexOf("!vend") == 0) {
            // vending machine function, if message begins with !vend
            rnd=a=Math.round(Math.random()*(emotes_Array.length-1));
            msg='yay! you got ' + emotes_Array[rnd];
        } else if (msg.indexOf("!advice") == 0) {
            // advice function, if message begins with !advice
            msg='advicebot gave too much bad advice and died';
        } else if (msg.indexOf("!encounter") == 0) {
            // pokemon function, if message begins with !encounter
            msg=getPokemon();
        } else if (msg.indexOf("!mock") == 0) {
            // mocking spongebob function, if message begins with !mock
            var heldMsg = msg.split('!mock ')[1];
            msg=heldMsg.split('').map((v) =>
            Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
            ).join('') + ' spongebobdurr';
        } else if (msg.indexOf("!now") == 0) {	
            // now playing function, if message begins with !now	
            msg='Now playing = '+$(".queue_active a").html();	
        } else if (msg.indexOf("!rules") == 0) {	
            msg='\n⚘ Be nice\n⚘ Do not sperg out\n⚘ Right click user to ignore\n⚘ No males';	
        } else if (msg.indexOf("!guide") == 0) {	
            msg='Hosting a Moovie Night: https://moovieroom.github.io/moovie-guide\nHosting a YouTube Night: https://moovieroom.github.io/youtube-guide';	
        } else if (msg.indexOf("!unsync") == 0) {	
            msg='\n1. click options in the header.\n2. click the playback tab.\n3. uncheck the synchronize video playback box\n4. click save.';	
        } else if (msg.indexOf("!calendar") == 0) {	
            msg='See any upcoming events and subscribe anonymously to our calendar here: https://moovieroom.github.io/host-helper';	
        } else if (msg.indexOf("!hosthelper") == 0) {	
            msg='Schedule your event and generate an announcement post here: https://moovieroom.github.io/host-helper';	
        } else if (msg.indexOf("!playlists") == 0) {	
            msg='Tunesday playlists are saved here: https://moovieroom.github.io/tunesday-playlists';	
        } else if (msg.indexOf("!blocked") == 0) {	
            msg='`' + $(".queue_active a").html() + '`' + ' is region blocked. Host: please skip this video. ' + $(".queue_active").attr('title').replace('Added by: ','') + ', please find an alternate video link if possible.';	
        } else if (msg.indexOf("!gift") == 0) {
            // gift giving function, if message begins with !gift
            var heldMsg = msg.split('!gift ')[1];
            if (heldMsg == undefined) {
                msg='remember to include the name of the nonny you want to send a gift!';
            } else if (heldMsg.indexOf("mr") == 0 || heldMsg.indexOf("moid") >= 0 || heldMsg.indexOf("Mr") == 0) {
                msg='moids get no presents';
            } else {
                rnd=a=Math.round(Math.random()*(gift_Array.length-1));
                msg='❅ ❆ ❄ present for ' + heldMsg + '! ' + gift_Array[rnd];
            }
        } else if (msg.indexOf("!santa") == 0) {
            // Santa gift function, if message begins with !santa
            rnd=a=Math.round(Math.random()*(santa_Array.length-1));
            msg='❅ ❆ ❄ Santa brought you a ' + santa_Array[rnd];
        } else if (msg.indexOf("!countdown") == 0) {
            // days until Christmas, if message begins with !countdown
            msg=daysUntilChristmas();
        } else if (msg.indexOf("!mistletoe") == 0) {
            // nonnies give kisses if message begins with !mistletoe
            var currUserCount = getUserCount();
            var nonnies = []
            var userList = document.getElementById("userlist");
            var userListCollection = userList.children;
            for (i = 0; i < currUserCount; i++) {
                var currnonny = userListCollection[i];
                var currnonnyName = currnonny.children[1].innerText;
                nonnies.push(currnonnyName);
            }
            var rand1=a=Math.round(Math.random()*(currUserCount-1));
            var rand2=a=Math.round(Math.random()*(currUserCount-1));
            if (rand1 == rand2) {
                rand2=a=Math.round(Math.random()*(currUserCount-1));
            }
            msg='mistletoe ' + nonnies[rand1] + ' gave ' + nonnies[rand2] + ' a smek';
        } else {	
            COMMAND=false;	
        }	
    }
    return msg;
}

// Select the node that will be observed for mutations - counter for playlist
var targetNode = document.getElementById('plcount');
var targetUsers = document.getElementById('userlist');

// Options for the observer (which mutations to observe)
var config = { childList: true };
var observer;

// Callback function to execute when mutations are observed - run counterCheck function
var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            counterCheck();
        }
    }
};

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

async function idSave(ytID) {
    let body = JSON.stringify({"ytID":ytID})
    const response = await fetch("https://app.windmill.dev/api/w/moovieroom/jobs/run_wait_result/f/u/herbnona/ytID_capture", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer x3zyLJri9WHLYoMfhfsq7kqFNziGMatc"
        },
        body
    })
}

// add to queue on tuesdays, save yt id
$("#queue_end").on("click", function() {
    let yturl=$("#mediaurl").val();
    let ytID=yturl.split('?v=')[1];
    ytID=ytID.split('&')[0];
    if (day == 2) {
        idSave(ytID);
    }
});

$("#queue_next").on("click", function() {
    let yturl=$("#mediaurl").val();
    let ytID=yturl.split('?v=')[1];
    ytID=ytID.split('&')[0];
    if (day == 2) {
        idSave(ytID);
    }
});

$("#snowbutton").on("click", function() {
    const snowcontain = document.getElementById("snowcontain");
    if (snowcontain.style.display !== 'none') {
        snowcontain.style.display = 'none';
        snowbutton.innerText = '❆ let it snow';
    }
    else {
        snowcontain.style.display = 'block';
        snowbutton.innerText = '❆ stop snow';
    }
});

setTimeout(styleCookieCheck, 100);