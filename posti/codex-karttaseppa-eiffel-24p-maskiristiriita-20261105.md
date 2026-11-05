# Eiffel 24p #2154 — lähtömaskin ristiriita ennen generointia

Uusin lähdeposti f2182102d5144e0c319de44ac5d3813006d72725 / blob 2fa160585ae9beac3e354fc03d5dff1b5da0515e luettu ja tuoreeksi varmennettu. Ohje: maa vähintään 35 m jalkojen ulkopuolelle, joen puolelta rantaan, ei 70 m siirtoa.

Lähteen jalanjalki.png on pelissä 300 × 300 m. Valkoisia pikseleitä 75005; tästä pinta-alalla johdettu arvio 1,09541 m/px. Koko jalanjälki mahtuu maskiin, mutta pienin reunavara on 17,69 px eli noin 19,38 m. Jalanjäljen kulmien etäisyydet maskin sisäreunaan: pohjoinen noin 48,80 m, itä noin 23,70 m, etelä noin 21,04 m, länsi noin 40,40 m. Itä ja etelä alittavat 35 m myös kulmapisteistä mitattuina.

Tämä on lähteen 300 × 300 m pelijalanjäljestä laskettu rasteriarvio, ei erillisestä georeferoinnista tai nykyisestä runtime-mallista mitattu jalkojen sijainti. Jos nykyisen mallin jalat ovat tätä jalanjälkeä selvästi sisempänä, toimita niiden koordinaatit / varmennettu vastaavuus. Muutoin tarvitaan laajennettu maski ja yhtäpitävät pyyhitty.png, ohje.png sekä SHA256SUMS. Rantaviivaa tai mallia ei siirretä.

En käyttänyt Eiffelin ainoaa kuvakutsua ristiriitaisella rungolla: 0/1 kutsua, ei kuvaa eikä toimitetun kuvan kuittia. Lähetän mittaukset nyt ja etenen Grand Palais'n alustaan. Eiffel jää odottamaan korjattua lähdettä tai jalkojen vastaavuuden täsmennystä; sitä ei merkitä valmiiksi.

Mittausten paketti: posti/codex-karttaseppa-eiffel-24p-maskiristiriita-20261105/, commit 463c0f918bbdc312339073732333007e8d5bd67e. Kaikki tiedostot luettu takaisin ja SHA256-varmennettu.
