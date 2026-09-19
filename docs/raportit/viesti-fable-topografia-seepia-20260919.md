# Viesti Fablelle: topografialinssin seepialaattavartio, juurisyy ja korjaus

19.9.2026, Opus (Mac Studio, Playwright Chromium 1234). Haara
`claude/bold-ride-vow4ki-topografia-seepia`. Ei PR:ää, ei versionostoa,
ei Raamattu-muutoksia, `tools/savukkeet/sarjat.json` koskematta.
Erä: *TOPOGRAFIALINSSIN AIKANA LIVAHTAA SEEPIAPOHJAN LAATTAPYYNTÖJÄ*.

## 1. Tulos lyhyesti

Väite `390 px: seepiapohjan laattoja ei haeta linssin aikana
(0 pyyntöä)` kaatui 19.9.2026 kolmessa rinnakkaisessa PR-Savukkeet-ajossa
(seepia 3 / 2 / 1, reliefi 64) ja oli vihreä yksin ajettuna.

- **Toistoa mittarilla ei saatu** (kolme kuormakoetta, ks. luku 2), joten
  juurisyy on **epävarma** — mutta se on rajattu kahteen mekanismiin,
  jotka molemmat ovat samaa asiaa: **linssiä edeltävä pohjalaattojen
  latausjono valuu linssin puolelle.**
- Korjattu molemmat päät: peli **katkaisee pohjalaattojen jonon heti
  linssin lipun noustessa** (js/pallolaatat.js), ja savuke **laskee
  vain ne pyynnöt, jotka lähtivät linssin ollessa auki** — ei niitä,
  jotka lähtivät valinnan ja lipun välissä (tools/savukkeet/savuke-topografialinssi.mjs).
- Mittaus korjauksen jälkeen: **seepia 0, reliefi 64** sekä yksin että
  kahtena rinnakkaisena ajona; avauksen mitat (PAATOKSET 41, LISAYS 16
  kohta 49) ennallaan.

## 2. Toisto

Kaikki ajot Mac Studiolla, Chromium `chromium-1234`, ruutu 390 × 844
dpr 2, peli paikalliselta palvelimelta, ämpäri Noden kautta
(`NODE_USE_ENV_PROXY=1`), service worker estetty.

Toistoa varten kirjoitettiin **luotain** (tilapäiskansio, ei repossa),
joka on savukkeen avausjakso sellaisenaan — Pariisi, linssi päälle,
Alppien lähizoomi, uloin sallittu näkymä — mutta joka mittaa pyynnön
ajan **sivun sisältä**: `window.fetch` ja `HTMLImageElement.prototype.src`
kääritään, jokaisesta laattapyynnöstä talletetaan `Date.now()` ja
kutsupino, ja linssin lipun nousuhetki luetaan
`kuunteleReliefiLinssi`-kuuntelijalla (js/reliefipyramidi.js). Samassa
ajossa kirjataan myös Playwrightin oma `request`-tapahtuma, jotta
mittarin ja selaimen ero näkyy.

| Koe | Kuorma | Seepiapyyntöjä linssin aikana |
|---|---|---|
| 1 | yksi selain, CPU-kuristus ×6 | 0 (kaikki 54 pyyntöä 2,3–2,6 s **ennen** linssiä) |
| 2 | kaksi rinnakkaista selainta, CPU-kuristus ×20 | 0 ja 0 |
| 3 | kaksi rinnakkaista selainta, CPU-kuristus ×6, koko linssijakso | 0 ja 0 (reliefi 64, sama kuin CI:ssä) |

Vika ei siis toistunut kahdella yrityksellä eikä kolmannella. Kaksi
asiaa luotain silti **sulkee pois**:

1. **Mittarin viive ei riitä selitykseksi.** Playwrightin
   `request`-tapahtuman ja sivun oman hetken ero samalle URLille oli
   mediaanina 1 ms ja enimmillään 25 ms. Hypoteesi a) puhtaana
   kirjanpitoviiveenä (pyyntö lähti ennen linssiä, leimattiin linssin
   ajalle) vaatisi 2,5 sekunnin viiveen; sitä ei mitattu.
2. **Linssin avaus ei itse herätä pohjalaattakonetta.** Yhdessäkään
   ajossa ei lähtenyt yhtään pohjalaatan hakua lipun nousun jälkeen,
   ei kameran lennossa eikä lähizoomissa — eli hypoteesi b)
   "kamera-ajo laukaisee pohjan päivityksen" ei saanut tukea.

Mitä jää jäljelle: luotain näki joka ajossa, että pohjalaattoja
haetaan **vielä 2,3–2,6 sekuntia ennen linssin avausta** — savukkeen
kolmen sekunnin asettumisodotus loppuu juuri ja juuri pohjan
latausjonon jälkeen (`jonossa 0, ladattavia 0` mitattiin t0:ssa joka
ajossa). Kolmella rinnakkaisella savukkeella (12 selainistuntoa,
kaappaukset, 11,6 Mt:n kuvia) se häntä on pidempi kuin kolme sekuntia,
ja jono on t0:ssa auki. Juurisyy on siis tämä hännän valuminen, ja
koodissa sille on täsmällinen mekanismi (luku 3).

## 3. Juurisyy (epävarma, mutta koodista osoitettava)

`js/pallolaatat.js`:n laattakerroksessa on **kaksi eri kelloa**:

- `suorita()` — kerroksen päivitys — ajetaan pallon piirtokoukusta.
  Vain se lukee `lepokerroksenKerrokset()`:n, huomaa reliefilipun
  vaihtuneen, nostaa sukupolven, tyhjentää jonon ja purkaa laatat.
- `kaynnista()` — latausjonon veto — ajetaan **jokaisen valmistuneen
  haun perään** (`.then(() => { ladattavia -= 1; kaynnista(); })`).
  Se ei katsonut kehyksiä eikä linssiä lainkaan.

Kun linssi avataan, `asetaReliefiLinssi(true)` nostaa lipun heti,
mutta kerroksen herätys (`kokoa()`) on tarkoituksella **kahden kehyksen
päässä** (js/linssit/topografia.js, "HERÄTYS VASTA KUN PEITE ON
RUUDULLA"). Levossa tuo väli on millisekunteja. Kuormassa kehysten
väli venyy sadoiksi millisekunneiksi — ja juuri sen ajan `kaynnista()`
veti yhä **vanhasta, seepiapohjaa koskevasta jonosta** uusia hakuja,
kuusi latauspaikkaa kerrallaan. Se on 1–3 pohjalaatan kokoinen vuoto,
se riippuu kuormasta, ja se katoaa heti kun kone on yksin — täsmälleen
se kuva, jonka CI antoi.

## 4. Muutokset

**1) `js/pallolaatat.js` — jono katkeaa lipusta, ei kehyksestä.**
`kaynnista()` tarkistaa ennen jokaista vetoa, onko linssin tila
vaihtunut viime päivityksen jälkeen (`kerrokset.reliefi !==
pyramidinReliefiKaytossa()`). Jos on, jono tyhjennetään
käynnistämättä, `mittarit.jonossa` nollataan ja kesken olevat haut
katkaistaan `AbortController`illa — turha verkkoliikenne on
puhelimella oikeaa rahaa. Seuraava `suorita()` purkaa laatat ja kokoaa
jonon uudestaan oikeilla kerroksilla, kuten ennenkin. Portti toimii
molempiin suuntiin: linssin sulkeutuessa reliefilaattojen jono katkeaa
samalla tavalla. Muut linssit eivät muutu — ehto on tosi vain silloin,
kun reliefilippu on juuri kääntynyt.

**2) `tools/savukkeet/savuke-topografialinssi.mjs` — ikkuna alkaa
lipusta.** Laskurin `t0` oli hetki, jolloin Node *pyysi* linssiä. Sen
ja lipun nousun väliin mahtuu linssimoduulien lataus ja
`linssi.lataa()`; kuormitetulla koneella se on satoja millisekunteja
pelin omaa seepiakarttaa, eikä se ole linssin aikaa. `t0` luetaan nyt
**sivulta**: linssi rekisteröi `kuunteleReliefiLinssi`-kuuntelijan
ennen avausta, ja lipun nousuhetki (sama seinäkello kuin Nodella) on
ikkunan alku. Väitteen selitteeseen tulostetaan myös `lippu nousi
valinnasta +N ms`, jotta seuraava häilyvä ajo kertoo itse, kummasta
päästä se tuli. Väitteen raja on ennallaan: 0 pyyntöä.

## 5. Mittaukset ennen ja jälkeen

Kaikki ajot: `savuke-topografialinssi.mjs` kokonaisena, Chromium,
Mac Studio, 19.9.2026 klo 11.55–12.10 Suomen aikaa.

| Mittaus | Ennen (CI 19.9., kolme rinnakkaista) | Jälkeen: yksin | Jälkeen: kaksi rinnakkaista |
|---|---|---|---|
| 390 px seepiapyyntöjä linssin aikana | **3 / 2 / 1** | **0** | **0 ja 0** |
| 390 px reliefipyyntöjä | 64 | **64** | **64 ja 64** |
| 1400 px seepia / reliefi | — | **0 / 147** | — |
| lippu nousi valinnasta | ei mitattu | **+1 ms** | **+1 ms ja +1 ms** |
| väitteitä vihreänä | — | **47 / 47** | **47 / 47 ja 47 / 47** |

Avauksen mitat (PAATOKSET 41, LISAYS 16 kohta 49) eivät huonontuneet.
Napautuksesta ensimmäiseen reliefikehykseen (katto 400 ms):

- yksin **83 ms** — `sytyta 0 → linssit-ladattu 0 → lataa 0 → peite 1 →
  pallolle 2 → kokoa-ennen 17 → laatta-haku 20 → kokoa 20 →
  laatta-kuvat 78 → laatta-valmis 78 → laatta-ruudulla 83`
- rinnakkain **86 ms** ja **93 ms**

Lähizoomin laatasto on yhä tarkassa tasossa: 390 px `taso 7, laattoja
48, valmiita 48`; 1400 px `taso 7, laattoja 64, valmiita 64`.

`node --test tests/*.test.mjs`: **3650 pass / 0 fail** (13 skipped).
Ensimmäisessä ajossa yksi häilyvä kaatuminen (3649 pass / 1 fail),
joka ei toistunut kahdessa seuraavassa ajossa eikä osunut tämän erän
tiedostoihin — kirjataan häilyväksi, ei korjattavaksi.

## 6. Mitä EI tehty

- Ei PR:ää, ei versionostoa, ei Raamattu-muutoksia.
- `tools/savukkeet/sarjat.json` koskematta: tunnetun punaisen poisto on
  Fablen päätös. Jos tämä korjaus kelpaa, seepiavartion saa poistaa
  kuormapunaisten listalta.
- Luotain jäi tilapäiskansioon eikä ole repossa: se on kertakäyttöinen
  diagnoosi, ja sama tieto saadaan nyt savukkeen omasta selitteestä.
