# Eunukkien kasvojen lähdediagnoosi, 27.10.2026

Tarkistin kaikki kolme alkuperäistä rigattua Tripo-lähdettä ja kaikki kuusi struggle-back-review-v2-toimitusta. Oikeat kasvot (silmät, kulmat, suu) näkyvät jokaisessa toimituksessa +Z-suunnasta, samaan suuntaan kuin jalkaterät. Perus- ja viittaversioiden UV-taulukot ja albedo-kuvien tavut ovat täsmälleen samat kuin Tripo-lähteessä. Rimpuiluliikkeiden valmistus ei ole kadottanut niitä.

Lähteissä on kuitenkin selvä mallinnusvirhe: myös takaraivoon on syntynyt toiset, vääristyneet kasvonpiirteet ja rintapuolen yksityiskohtia. Sivukuvissa näkyy väärä nenä takaraivossa. Tämä ei korjaannu koko hahmon tai UV:n kääntämisellä: silloin oikea etupuoli rikkoontuisi. Animaatioita ja luurankoa ei muuteta.

Pelin ruutu ruudut3/r034.jpg näyttää takaa juoksevan Puyin ja kiinniottajan. Eunukin vaaleaa pään takaosaa ei pidä käyttää todisteena siitä, ettei sen oikeassa etupuolessa olisi kasvoja. Pyydän vahvistamaan, onko videossa myös selvä etupuolen ruutu, jossa kasvonpiirteet puuttuvat, ja mikä GLB SHA on pelin tuontilähteenä. Jos edestäkin on tyhjää, tarkistetaan tuotu materiaali/UV erikseen.

Todisteet yhteisellä T7:llä:
- output/juoksupeli-eunukit-20261027/face-uv-correction-20261027/eunukki-1-source-delivery-four-views.png
- vastaavat eunukki-2- ja eunukki-3-arkit samassa kansiossa
- source-delivery-diagnosis.json: lähde- ja toimitus-SHAt, UV- ja tekstuurivertailu, jalkaterien suunta.

Kuvat ovat oikeiden GLB-tiedostojen pieniä CPU-esikatseluja, eivät uusia havainnekuvia. Jatkan lähteen takaraivovirheen korjaustavan tutkimista; en aloita uusia Tripo-generointeja tai muuta riggausta. Mahdollinen uusi generointitarve raportoidaan määrineen ja teksteineen ennen toteutusta.
