document.getElementById('birthForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const birthdate = document.getElementById('birthdate').value;
    const alert = document.getElementById('alert-message');
    if (validateInput(birthdate)) {
        const birthFormDiv = document.getElementById('birthForm-div');
        const values = document.getElementById('main-values');
        birthFormDiv.classList.add('d-none');
        alert.classList.add('d-none');
        values.classList.remove('d-none');
        generateCards(birthdate);
    } else {
        alert.innerHTML = 'Coloque a sua data de aniversário corretamente';
        alert.classList.remove('d-none');
    }
});

function validateInput(birthdate) {
    const selectedDate = new Date(birthdate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate > today) return false;
    return true;
}

function generateCards(birthdate) {
    const birthShow = document.getElementById('birthdate-show');
    const [ano, mes, dia] = birthdate.split('-').map(Number);
    birthShow.innerHTML = `${dia}/${mes}/${ano}`;

    var pi = dia;
    var pe = mes;
    var rva = ano;
    var rvaSum = rva.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    var mva = ano + dia + mes;
    var mvaSum = mva.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    var pg = dia + mes;
    var ilka = pi + pe + rvaSum + mvaSum;
    var pgString = pg > 22 ? getCardNumber(pg).toString().split('') : pg.toString().split('');
    var oculto = pgString.map(Number).reduce((a, b) => a + b, 0);
    var desafio = getCardNumber(pg) < 10 ? 0 : pgString.map(Number).reduce((a, b) => b - a, 0);
    desafio = desafio < 0 ? desafio * -1 : desafio;
    var fd = rvaSum + desafio;
    var fm = mvaSum + pg;

    putValueOnCard('pi', pi);
    putValueOnCard('pe', pe);
    putValueOnCard('pg', pg);
    putValueOnCard('oculto', oculto);
    putValueOnCard('desafio', desafio);
    putValueOnCard('fd', fd);
    putValueOnCard('rva', rva, rvaSum);
    putValueOnCard('mva', mva, mvaSum);
    putValueOnCard('fm', fm);
    putValueOnCard('abalo', fd + fm);
    putValueOnCard('ilka', ilka);
}

function putValueOnCard(id, number, calcNumber = null) {
    const title = document.getElementById(`${id}-title`);
    const name = document.getElementById(`${id}-name`);
    const image = document.getElementById(`${id}-card`);
    const video = document.getElementById(`${id}-link`);
    card = arcanosMaiores[getCardNumber(number)];
    if (calcNumber) {
        title.innerHTML = `${number}  ->  ${calcNumber} (${title.innerHTML})`;
        card = arcanosMaiores[getCardNumber(calcNumber)];
    }
    else title.innerHTML = `${number} (${title.innerHTML})`;
    name.innerHTML = `${card.name}.`;
    image.src = `/numerologia-karmica${card.image}`;
    video.href = card.video;
}

function getCardNumber(number) {
    if (number >= 0 && number < 22) return number;
    if (number == 22 || number < 0) return 0;
    number = number
        .toString()
        .split('')
        .map(Number)
        .reduce((a, b) => a + b, 0);
    return getCardNumber(number);
}

const arcanosMaiores = {
    0: { name: "0 - O Louco", image: "/public/cards/major_arcana_fool.png", video: "https://www.youtube.com/watch?v=qrdOm2BsV4Q" },
    1: { name: "1 - O Mago", image: "/public/cards/major_arcana_magician.png", video: "https://www.youtube.com/watch?v=6B2gsn_Nsrg" },
    2: { name: "2 - A Sacerdotisa", image: "/public/cards/major_arcana_priestess.png", video: "https://www.youtube.com/watch?v=SnUyvSMaNzU" },
    3: { name: "3 - A Imperatriz", image: "/public/cards/major_arcana_empress.png", video: "https://www.youtube.com/watch?v=na-O01G-u3s" },
    4: { name: "4 - O Imperador", image: "/public/cards/major_arcana_emperor.png", video: "https://www.youtube.com/watch?v=KHc-QFPBl1g" },
    5: { name: "5 - O Hierofante", image: "/public/cards/major_arcana_hierophant.png", video: "https://www.youtube.com/watch?v=YaIHqJpUfTM" },
    6: { name: "6 - Enamorados", image: "/public/cards/major_arcana_lovers.png", video: "https://www.youtube.com/watch?v=-Hl64af4LjM" },
    7: { name: "7 - O Carro", image: "/public/cards/major_arcana_chariot.png", video: "https://www.youtube.com/watch?v=Bt709CNcH3c" },
    8: { name: "8 - A Força", image: "/public/cards/major_arcana_strength.png", video: "https://www.youtube.com/watch?v=1c-c3Fomw5s" },
    9: { name: "9 - O Eremita", image: "/public/cards/major_arcana_hermit.png", video: "https://www.youtube.com/watch?v=iGeMj8hOM0Q" },
    10: { name: "10 - A Roda da Fortuna", image: "/public/cards/major_arcana_fortune.png", video: "https://www.youtube.com/watch?v=Cn3kvhvPOfw" },
    11: { name: "11 - A Justiça", image: "/public/cards/major_arcana_justice.png", video: "https://www.youtube.com/watch?v=moK3ZIx-H8Y" },
    12: { name: "12 - O Pendurado", image: "/public/cards/major_arcana_hanged.png", video: "https://www.youtube.com/watch?v=fEykQJsCUzM" },
    13: { name: "13 - A Morte", image: "/public/cards/major_arcana_death.png", video: "https://www.youtube.com/watch?v=h_Xq5fMShfM" },
    14: { name: "14 - A Temperança", image: "/public/cards/major_arcana_temperance.png", video: "https://www.youtube.com/watch?v=dImEx4kkLis" },
    15: { name: "15 - O Diabo", image: "/public/cards/major_arcana_devil.png", video: "https://www.youtube.com/watch?v=mo-ffQbzebI" },
    16: { name: "16 - A Torre", image: "/public/cards/major_arcana_tower.png", video: "https://www.youtube.com/watch?v=MQnvTMH4EBE" },
    17: { name: "17 - A Estrela", image: "/public/cards/major_arcana_star.png", video: "https://www.youtube.com/watch?v=CsNcutaVG_A" },
    18: { name: "18 - A Lua", image: "/public/cards/major_arcana_moon.png", video: "https://www.youtube.com/watch?v=lVE-GLcEEMs" },
    19: { name: "19 - O Sol", image: "/public/cards/major_arcana_sun.png", video: "https://www.youtube.com/watch?v=T3loe-HhCDo" },
    20: { name: "20 - O Julgamento", image: "/public/cards/major_arcana_judgement.png", video: "https://www.youtube.com/watch?v=TkUBzzWX5lQ" },
    21: { name: "21 - O Mundo", image: "/public/cards/major_arcana_world.png", video: "https://www.youtube.com/watch?v=tj98roN8EoI+" }
};
