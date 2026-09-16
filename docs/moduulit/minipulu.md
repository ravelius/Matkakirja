# Minipulu linssien kuvanäkymiin

`js/minipulu.js` käyttää suoraan nykyistä `livianSvgKuva`-mallia ja sen
väripalettia. Se rajaa pois lentonäyttämön tyhjän tilan venyttämättä hahmoa.
Ei uusia rasterikuvia eikä muutoksia kartan Pulun piirtäjään.

```js
import { luoMinipulu } from './minipulu.js';

const mini = luoMinipulu(paikka); // lapsielementti, ei omaa fixed-sijoittelua
mini.katso('vasen');             // kuva oikean alakulman Pulun ylävasemmalla
mini.reagoi();                   // yksi 700 ms pään kääntö, sitten lepo
mini.lepo();                    // myös peruu keskeneräisen reaktion
mini.asetaKoko(56);              // SVG-laatikon korkeus px; tai 'auto'
mini.tuhoa();                   // linssin sulku: elementti, RAF ja kuuntelijat pois
```

`luoMinipulu(paikka, {koko: 'auto', suunta: 'vasen'})` palauttaa lisäksi
`elementti`-viitteen. Suunnat ovat `vasen` ja `oikea`; oikealle katselu
peilaa saman hahmon. Kiinteä koko hyväksyy 24–160 px. Automaattikoko on
56 px leveydellä ≤620 px tai korkeudella ≤500 px, muuten 84 px.
Rajauksen sisällä näkyvä lintu on levossa noin 49/74 px ja ylöspäin
katsoessaan noin 53/79 px korkea. Näin myös puhelimen vaakanäkymä saa
pienen Pulun. Vakiorajaus pitää koon tasaisena eleen aikana.

Hahmo on koristeellinen (`aria-hidden`, ei tab-kohdetta), ja kosketukset
menevät sen läpi. Se ei käynnistä automaattista ele- tai äänisilmukkaa.
Liikkeenvähennys estää reaktion; asetuksen muuttaminen tai välilehden
piilottaminen kesken reaktion palauttaa levon. `tuhoa()` on toistettavissa.

## Fablen linssikytkentä

Tuotannon `js/linssit/*.js`-tiedostoja ei ole muutettu. Fable luo
paikkaelementin linssin omaan näyttökerrokseen ja tuhoaa minipulun sulussa.
Älä anna sille `.livia-kasvot-pinta`-luokkaa: linssin nykyinen yleisen Pulun
piilotus koskee sitä. Miniversio on erillinen `.minipulu`.

Tarkistettu `css/satelliitti.css` ja `js/linssit/satelliitti.js` v1912:
pystyruudussa `.satelliitti-ala` sisältää **sekä** pikkukuvat **että** napit
alareunassa. Vaakanäkymässä sama palkki on oikean reunan pystysarake.
Sijoita Pulu pystynäytöllä koko alapalkin yläpuolelle, vaakaruudussa koko
oikean sarakkeen vasemmalle puolelle. Jätä 12 px väli sekä tarvittava
`env(safe-area-inset-right/bottom)`-turva-alue. Mittaa palkki
`getBoundingClientRect()`/`ResizeObserver`-avulla, älä arvaa sen korkeutta.
Testisivulla on toimiva sijoitteluesimerkki oikeaa satelliitti-CSS:ää vasten.

Minipulu ei tee omaa puhekuplaa tai plusnappia. Linssin oma kommentti tulee
nykyisestä `polloLinssikupla(osat, asetukset)`-reitistä (`js/pollo.js`),
joka käyttää samaa kuplapinoa ja `.pollo-kuplapalautus`-palautusta kuin kartta.
Fablen on kytkennässä varmistettava pinon ankkuri ja linssin kuplapiilotus:
`body.aikajana-pulu-piilossa` piilottaa tällä hetkellä myös kuplapinon.
Yleiset karttakommentit kuuluvat edelleen jonoon linssin ajaksi. Tämä
hahmo-API ei muuta kuplaporttia, konteksteja tai tuota kommenttitekstejä.

## Selainvarmennus

```sh
python3 -m http.server 8000
node tools/savukkeet/savuke-minipulu.mjs
```

Valinnat: `BASE_URL`, `OUTPUT_DIR`. Testisivu
`tools/savukkeet/minipulu.html` on erillinen koe, ei pelin linssikytkentä.
Se näyttää myös lepo-/katseasennot sekä hahmon vaalealla pohjalla.

Chromiumissa tarkistettu 390×844, 1400×900 ja 844×390: hahmo on kokonaan
ruudussa, ei osu palkkiin/pikkukuviin/sulkuun, eikä estä kuvan kosketusta.
Lisäksi testataan reaktion rajaus ja päättyminen, liikkeenvähennys,
koon muuttuminen, usean instanssin SVG-tunnukset ja purku kesken reaktion.
PNG-kaappaukset ja `mittaukset.json` tallentuvat output-hakemistoon,
eivät repoon. Varsinaisen linssikytkennän ja asennetun pelin QA jää Fablelle.
