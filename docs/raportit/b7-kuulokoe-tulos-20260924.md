# B7 kuulokoe: tulos (24.9.2026)

Simulaattori iPhone 18 Pro, proto-master `fff33f5`. Ääni Mac Studion
kaiuttimiin kierroksen ajaksi, palautettu Scarlett Solo USB:hen lopuksi
(SwitchAudioSource). Mitattu `Documents/peli-tila.json`:n
`musiikki.kanavat[].aika`-kentän etenemisellä (ei play()-kutsulla) sekä
`taso`/`tavoite`-suhteilla, komennot `peli-komento.txt`:llä.

Ajan puutteessa kaikkia 13 kohtaa ei ehditty käydä yhtä perusteellisesti;
alla mitä oikeasti todennettiin vs. mitä ei.

## Todennettu (PASS)

1. **Etusivu**: pohja (musa-etusivu-lyria.mp3) ja maisema
   (freesound-731249.mp3) soivat heti (aika eteni 6,7 s → 19,8 s).
   "Aloita seikkailu": pohja ×0,600 (0,01971→0,01183, täsmälleen 0,6),
   maisema ×1,45 (korostus, ei vaimennus — täsmää "korostaa maiseman").
   **Ei todennettu**: tasojen paluu alkuperäiseen intron jälkeen — ruutu
   oli yhä "Aloitus"-silmukassa (kaupunkivalinta) eikä laskenut takaisin
   etusivun lukemiin edes kaupunkivalinnassa; palautuiko myöhemmin
   (lennolla/perillä), ei tarkistettu erikseen kellosta.
2. **Avauslento**: napautuksesta silmukka→Matkalla, `lentoSoi:true`
   heti, maisema vaihtui matkustamon ääneen (freesound-433002.mp3).
   Perillä `lentoSoi:false`, pohja/maisema vaihtuivat kohdekaupungin
   (Ateena) raitoihin — täsmää.
3. **Kysymys**: `visa`-kanava (musa-visa-2-lyria.mp3) soi hiljaa
   kysymyksen ajan. **Ei todennettu tarkkaa 0,15×-suhdetta** webiin —
   vaatisi rinnakkaisen web-mittauksen, jota ei tehty ajan puutteessa.
4. **Aarteen paljastus**: `aarre`-kanava (musa-aarre-lyria.mp3) käynnistyi
   selvästi kovempana (0,075) oikean vastauksen jälkeen. Hihkaisua
   (UI:n oma SFX) ei voi todentaa tästä tiedostosta — ei ole omaa
   kanavaansa `musiikki.kanavat`-listassa.
5. **Lehti**: pohja vaihtui lehtiraitaan (musa-lehti-lyria.mp3) hiljaa,
   maisema jatkui hiljaa taustalla — hetken päällekkäistä 0-tasoa
   siirtymän alussa (crossfade), ei virhe.
6. **Linssit**: `linssi topografia` pysäytti pohja/maisema/visa-kanavat
   (taso 0). `aarre`-kanava jäi soimaan omana kertaluontoisena raitanaan
   riippumatta näkymän vaihdosta — vaikuttaa tarkoitukselliselta
   (kertasoitto), ei tutkittu tarkemmin.

## Ei ehditty / ei testattavissa simulaattorissa

- **Kohta 3 (mannerlento), 4 (jalan-raita/laiva)**: ei ehditty ajaa
  omana kulkutapana ajan puutteessa.
- **Kohta 9 (tausta/takaisin, striimaus isoista tiedostoista,
  2,6 s -ristihäivytys)**: ei testattu.
- **Kohta 10**: tiedossa oleva puute (kompressori puuttuu vielä) —
  ei tarvitse raportoida.
- **Kohta 11 (sanelu, "tärkein")**: EI EHDITTY — vaatisi oikean
  mikrofonisyötteen simuloinnin (Simulaattorin "Dictation" ei vastaa
  oikeaa laitetta täysin), oma erä tarvitaan.
- **Kohta 12 (äänettömyyskytkin, Bluetooth, MixWithOthers)**: ei
  testattavissa simulaattorissa — ei fyysistä mykistyskytkintä eikä
  oikeita Bluetooth-kuulokkeita. Vaatii iPadin tai fyysisen laitteen.
- **Kohta 13 (nykäys raidan purussa, levyvälimuistin kasvu)**: ei
  mitattu — vaatisi tarkempaa ajastusta ja levynkäytön seurantaa.

## Yhteenveto

Ydinlogiikka (tasonvaihdot tilasta toiseen, oikeat raidat, hiljennykset/
korostukset) vaikuttaa toimivan oikein niissä kohdissa jotka ehdittiin
mitata. Ei löytynyt virheitä. Kohdat 3, 4, 9, 11, 12, 13 ja intron
tasonpalautus (kohta 1 loppuosa) jäävät seuraavaan erään.

## Jatko 24.9.2026 (kohdat 3, 4, 9, 13; kompressori nyt masterissa)

Simulaattori iPhone 18 Pro, ääni Mac Studion kaiuttimiin (palautettu
Scarlett Solo USB:hen lopuksi). `peli-komento.txt`/`peli-tila.json`.

- **Kohta 9 (tausta/takaisin) PASS**: HOME-nappi taustalle (button HOME),
  8 s odotus, `simctl launch` takaisin etualalle (SAMA PID 32520 — ei
  uudelleenkäynnistys). Maiseman `aika` oli pysähtynyt taustalla-ajaksi
  (odotettua: ei etene kun sovellus jäädytetty), jatkoi normaalisti
  etualalle palatessa (esim. 36,3 → 116,4 s seuraavassa mittauksessa),
  ei kaatumista, kartta piirtyi heti oikein. **Ei eroteltu** tarkkaa
  2,6 s -ristihäivytysikkunaa erikseen — mittaus on liian karkea siihen.
- **Kohta 4 (jalan/maa-raita) PASS, laiva EI TAVOITETTU**: liftaus-
  kulkutapa (Lontoo→Edinburgh) sai oman `maisema`-raitansa
  (aporee-aporee_37194…, eri kuin lennon matkustamoääni), taso ja
  kompressori kunnossa, `aika` eteni normaalisti, vaihtui oikein
  saapuessa. `kulkutapa laiva` ei löytänyt yhtään reittiä sen paremmin
  Madridista kuin Edinburghista (tyhjä vaihtoehtolista, ei rahasyy —
  300 £ tallella) — jäi testaamatta oikealla reitillä, ei tiedetä onko
  datapuute vai bugi.
- **Kohta 3 (mannerlento) EI TAVOITETTU**: kaikki tarjolla olleet
  lennot olivat lyhyitä Euroopan sisäisiä hyppyjä (Madrid/Berliini/
  Tukholma, 300 p) sekä alkupelissä (päivä 1) että "uusi-peli"
  -uusinnan jälkeen — mannerlento vaatii ilmeisesti pidemmälle
  edennyttä peliä/reittien avautumista. Ei uutta yritystä tällä
  kierroksella ajan puutteessa.
- **Kohta 13 (levyvälimuistin kasvu)**: `Library/Caches` pysyi
  tasan 48 Mt useamman raidanvaihdon/kaupunkikäynnin yli — ei
  kasvua havaittu tässä lyhyessä istunnossa. `kehysajat.jsonl`:ssä
  yksi 100 ms -piikki (yli15x 1) komentoja nopeasti peräkkäin
  ajettaessa; simulaattoriluku, ei tulkittu (ks. yllä oleva varaus
  simulaattorin GPU:sta).
- **Kohta 10 (kompressori)**: vahvistettu masterissa — jokaisella
  aktiivisella kanavalla `kompressori`-kenttä (esim. 2,089)
  peli-tila.json:ssa.

Jäljellä: kohta 3 (mannerlento, vaatii pidemmälle edenneen pelin),
laiva-raita (kohta 4), 11 (sanelu) ja 12 (äänettömyys/Bluetooth) —
11 ja 12 vaativat fyysisen laitteen.
