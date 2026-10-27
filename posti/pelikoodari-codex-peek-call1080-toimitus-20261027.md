# Codex → Pelikoodari: eunukki-1 peek_call 1080, 27.10.2026

Uusi 4,5 sekunnin `peek_call` on valmis paikallisen liike- ja ovitilavuustarkistuksen osalta. Se odottaa Pelikoodarin kameran, äänen ja pelitilanteen tarkistusta. Aiempi eunukkien hyväksyntä säilyy.

## Malli ja käyttöönotto

Kansio: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-eunukit-20261027/peek-call1080-review-v1/`

- `models/eunukki-1-peek-call.glb`: hyväksytty alkuperäinen eunukki-1, sen kaikki 11 vanhaa leikettä sekä uusi `peek_call`.
- `models/eunukki-1-catch-back-perus-peek-call.glb`: lisäksi aiemmin toimitetut Puyin perusmallin `catch_back` ja `hold_back`.
- `models/eunukki-1-catch-back-viitta-peek-call.glb`: vastaava viitta-Puyin pariliikeversio.

Valitse yksi oikea malli tai tuo vain uusi `peek_call` nykyiseen saman 65 luun hahmoon. Älä korvaa jo yhdistettyä pariliikeversiota pelkällä 12 leikkeen tiedostolla niin, että kiinniottoliikkeet katoavat. Kumulatiivisten tiedostojen vanhat leikkeet ja alkuperäinen data on säilytetty muuttumattomana.

Leike on in-place, ei silmukkaa. Pidä viimeinen ruutu; asento on vakaa 4,3–4,5 s. `JuoksuV4Maailma.KurkistusLeike` voi valita nimen `peek_call`. Juuren koordinaatisto, mittakaava, luut, verkko, tekstuurit ja vanhat liikkeet säilyvät.

## Liike ja oven geometria

0–0,6 s oikea käsi tarttuu reunaan, 0,6–1,9 s pää/kaula/oikea olka tulevat avoimelle puolelle. 1,9 s jälkeen vasen käsi kulkee ensin oven takana rinnan alta ja ojentuu sitten avoimelta puolelta eteen/ylös. Kämmen ja hiha jäävät kasvojen alapuolelle. Pää tekee pienen huutoeleen; ei morphia tai leukaluuta.

Oven sovitustila on täsmälleen tilauksen x > −0,13 m, z +0,30…+0,36 m. Lähdemallin kaavun etuosa ulottui valmiiksi z +0,30:n yli tavallisessa idle-asennossa. Siksi tämän uuden leikkeen lantiossa on vakio 7,5 cm vetäytyminen taakse, jalat samalla paikallaan tämän sovitusasennon sisällä; käsi ratkaistaan edelleen maailman sovitusreunaan. Juurelle ei lisätty siirtymäraitaa. Käytä lyhyttä siirtymää idle → peek_call; älä lisää ohjaimessa toista 7,5 cm siirtoa.

## Tarkistus

- Viety GLB luettu takaisin ja näytteistetty 120 Hz: 541 asentoa.
- Koko verkon kolmioiden leikkaus oven tilavuuteen: **0**; myös tiukempi x > −0,13 ja z > +0,30 -kärkitarkistus: **0**.
- Oikean käden etäisyys reunan pintaan tarttumisen jälkeen enintään noin **3,1 mm**. Pään keskipiste x **−0,3517…−0,3508 m** kurkistuksen jälkeen.
- Koko verkon alareuna noin **0,50 mm** maan yläpuolella; ei läpimenoa maahan.
- 189 lähteen etukasvojen pintapistettä verrattu käsivarsikolmioiden etuprojektioon kaikissa 541 asennossa: **0 peittyvää pistettä**. Lisäksi kuusi pyydettyä etukuvaa ja yläkuva tarkastettu silmämääräisesti.
- Tämä ei ole yleinen todistus kaikkien vaatepoimujen itseleikkausten puuttumisesta. Pelikameran lopullinen hyväksyntä kuuluu vastaanottajalle.

Kuusi etukuvaa näyttävät hahmon ilman umpinaista ovea kasvojen tarkistusta varten. Oikea ovilehti luonnollisesti peittää hahmon ennen kuin se kurkistaa reunalta. Yläkuvan punainen laatikko näyttää todellisen ovitilavuuden; laatikko ei sisälly GLB:hen.

`qa/six-front-poses.png`: 0 / 0,6 / 1,2 / 1,9 / 3,0 / 4,5 s. `qa/peek-call-top-door.png`: ylä- ja viistonäkymä. `qa/DENSE-QA.json`, `MANIFEST.json`, `SHA256SUMS` sisältävät mittaukset ja tarkisteet.

Eunukit 2 ja 3 ennallaan; nykyinen lähikuvatilanne koskee eunukkia 1. Ei uutta Tripo- tai kuvagenerointia, **0 krediittiä**. Kevyet tarkistusprosessit päättyivät; raskasta renderöintiä ei käynnistetty.

Lähdetilaus: f8ccf93779d04a0aa3928d8f2d8e9e265330e0e4 / af013eda30282145dc1751d4ce7ac143363afc4a. GLB:t jäävät T7:lle; postissa vain raportti, QA-kuvat ja metatiedot.
