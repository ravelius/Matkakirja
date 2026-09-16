# Astronautin kamera: ääni, minipulu, kysymykset — ja LISÄYKSET 6–8

16.9.2026 · haara `claude/bold-ride-vow4ki-astro-aani-pulu` · Opus-agentti

Tehty neljä tilattua osaa (humina, musiikki, minipulu, kysymykset) sekä
saman istunnon aikana tulleet Raamatun LISÄYKSET 6, 7 ja 8. Ei
versionostoa, ei PR:ää, ei Raamattu-muokkauksia.

## 1. Soitinmekanismi (kohdat 8, 14 ja 17)

Uusi moduuli **`js/linssit/satelliitti-aani.js`**.

- **Ei äänielementtiä.** `fetch` → `decodeAudioData` → `AudioBufferSourceNode`
  `loop = true`. Codexin toimittamassa huminassa on 1,5 s ristihäivytys
  luupin saumassa; `<audio loop>` katkaisisi nauhan pään alkuun ja
  dekooderi lisäisi tauon, jolloin ristihäivytys menisi hukkaan.
  `ended`-tapahtumaan sidottua uudelleenkäynnistystä ei ole.
- **Kaksi kerrosta, yksi soitin koko linssille.**
  - humina: versioitu osoite
    `…/astronautin-kamera/20260916/93aaf7fb…fde2f2b.mp3`
    (1 345 091 tavua, 84 s, −30,48 LUFS), sisääntulofeidi **2 s**, voima 0,45;
  - musiikki: `…/astronautin-kamera-musiikki-lyria.mp3`, sisääntulofeidi
    **3 s**, voima 0,11, vakio `ASTRONAUTIN_MUSIIKKI_KAYTOSSA = true`.
  - Aliasta `astronautin-kamera-tausta.mp3` **ei** käytetä: sama nimi ehti
    osoittaa hylättyyn tuontikokeiluun, ja välimuistista tuleva vanha
    tavusarja soisi leikatun sauman.
- **Kohteen tai kuvan vaihto ei kutsu soitinta lainkaan** — avaus on
  linssin avauksessa, purku sen purussa. Kierros ei nollaudu eikä feidi
  ala alusta.
- **Taso tulee pelin omasta totuudesta:** pelin äänikonteksti
  (`js/musiikkivahvistin.js musiikkiKonteksti`, ei omaa AudioContextia),
  musiikin säädin (`musiikinKerroin`) ja luennan/pöllön/lukijan väistö
  (`lisaaVaistaja`). Linssin OMA hiljennys (`LINSSIN_HILJENNYS`) ei väistä
  itseään — sama poikkeus kuin `js/siirtymamusiikki.js lajinVaisto`.
- **Autoplay-esto:** nukkuva äänikonteksti ei ole virhe. Soitin
  ilmoittautuu `kuunteleReitityksenAvautumista`-vahdille ja käynnistyy
  ensimmäisestä eleestä. Konsoliin ei kirjoiteta mitään.
- **Puuttuva raita on normaali tila:** tavallinen `fetch`, ei
  `js/media.js haeAani` — haeAani kirjaisi puuttuvan raidan äänipeilin
  viaksi, ja kolme sellaista sulkisi peilin myös äänimaisemilta.

**Musiikki on jo ämpärissä.** Tarkistettu 16.9.2026:
`astronautin-kamera-musiikki-lyria.mp3` vastaa HTTP 200, audio/mpeg,
2 401 219 tavua. Se siis soi jo nyt huminan päällä. 404-polku on silti
mitattu (savuke pakottaa 404:n toisessa näkymässä).

## 2. Minipulu ja kysymykset (kohdat 9 ja 10)

- `js/minipulu.js` (Codexin PR 2521) sijoitetaan valokuvanäkymän
  **oikeaan alakulmaan**, 12 px reunoista + turva-alue, tumma pohja,
  hahmon korkeus 84 px työpöydällä ja 56 px kapealla ruudulla.
  Pienoiskuvat ovat vasemmassa alakulmassa ja niiden nauha on enintään
  puolet leveydestä, joten kulmat eivät voi leikata toisiaan.
- Pelin **iso** pulu pysyy piilossa (`aikajana-pulu-piilossa`); minipulun
  kulma on oma luokkansa, ja CSS sanoo ääneen ettei piilotus osu siihen.
- Napautus avaa kysymyskortin, jossa on kohteen **kaksi valmista
  kysymystä** (`js/linssit/astronaut-kysymykset.js`, Codexin PR 2539,
  64 × 2). Kysymyksen napautus näyttää **esikirjoitetun vastauksen**
  pulun kuplana ja hahmo tekee saman 700 ms:n päänkäännön kuin kartalla.
- **Ei mallikutsua.** Kartan valmiit kysymykset menevät `polloKysy`-reittiä
  mallille; tässä vastaus on jo aineistossa. Kuplaa ei myöskään voi
  piirtää `polloLinssikupla`lla, koska pelin kuplapino on linssin ajan
  `visibility: hidden` — se ei näkyisi.
- Vastaus ladotaan tekstisolmuna, ei `innerHTML`:nä.

## 3. LISÄYS 6 — kelattu selite yhdelle riville, hampurilainen pois kuvasta

- Kelattu otsikkorivi: fonttikoko kutistuu **16 → 11 px** (JS mittaa
  `scrollWidth` vs. `clientWidth`) ja vasta sen jälkeen teksti lyhennetään
  ellipsillä; `white-space: nowrap` tekee rivityksen mahdottomaksi.
  Laatikon katto ulottuu ✕:ään asti, mutta leveys on sisällön
  (`width: auto`), joten lyhyt nimi ei venytä laatikkoa.
- Selite kelautuu **itsestään** kuvan napautuksesta, panoroinnista ja
  rullasta (`kelaaKuvasta` on yksisuuntainen: kuva ei koskaan avaa sitä).
  Avaus tulee vain otsikkorivin napautuksesta.
- Kuvanäkymässä linssin oma nappi piilotetaan (`display: none`, ei
  `visibility: hidden` — näkymätön nappi ottaisi yhä napautuksia).

## 4. LISÄYS 7 — himmeä ja läpikuultava, kiinni vasemmassa reunassa

- Kelattu selite: tausta `rgba(6,13,10,0.25)` (avattu 0,72), otsikon
  `opacity: 0.7`, reunus vaimeampi, ei varjoa.
- **Vaaka-asennon syy mitattu.** Sisennys oli
  `calc(12px + env(safe-area-inset-left))`, eli turva-alue LISÄTTIIN aina
  12 px:n päälle. Pystyssä turva-alue on 0 eikä vika näkynyt siellä
  lainkaan; vaaka-asennossa lovellisen puhelimen vasen turva-alue on
  kymmeniä pikseleitä ja Safari kasvattaa sitä vielä täysruudussa — siitä
  omistajan kuvan noin 170 px. Korjaus:
  `left: max(12px, env(safe-area-inset-left, 0px))` — turva-alue on
  KATTO, ei lisäys. Mitattu 844 × 390: selitteen vasen reuna **12 px**
  sekä auki että kiinni.
- Kuvan letterbox ei siirrä selitettä: `.satelliitti-katselu` on
  `position: fixed; inset: 0`, joten sisennys lasketaan ruudusta.

## 5. LISÄYS 8 — hampurilainen pois, tilalle X; äänikytkin poistui

- `rakennaValikko` → **`rakennaLinssikehys`**. Hampurilainen, sen valikko,
  kolme viivaa, valikon kohdat ja "Poistu linssistä" -rivi ovat poissa
  sekä lähteestä että tyylistä. Jäljellä on yksi nappi:
  `.satelliitti-linssisulku`, joka käyttää samaa `.satelliitti-sulku`
  -ulkoasua (harmaa, pyöreä, sama koko) ja sulkee linssin.
- Kuvan sulkeva ✕ sai ruudun oikean yläkulman itselleen
  (`right: var(--satelliitti-oikea)`), eli merkki ei hyppää näkymästä
  toiseen. Kaksi ✕:ää ei voi olla ruudulla yhtä aikaa, koska linssin ✕ on
  kuvanäkymässä `display: none`.
- **Oma luokka, sama ulkoasu — ja se oli pakko.** Kun molemmat napit
  olivat `.satelliitti-sulku`, `querySelector` osui ensin linssin
  nappiin, joka on kuvanäkymässä piilossa: savuke mittasi kuvan sulusta
  0 × 0 ja "sulje kuva" sulki koko linssin. Mitattu ja korjattu.
- Linssin oma äänikytkin ja avain `matkakirja-linssiaani` **poistuivat**.
  Humina ja musiikki noudattavat pelin yleistä musiikkiasetusta
  (`matkakirja-musiikki`), ja muutos kuuluu myös kesken linssin
  (`kuunteleMusiikkitilaa`).

## 6. Mittaukset

Selaimesta mitattu (Chromium, kontti):

| Mitta | 1400 × 900 | 390 × 844 | 844 × 390 |
| --- | --- | --- | --- |
| minipulun kulma reunoista | 12 / 12 px | 12 / 12 px | 12 / 12 px |
| kuvan ✕ ruudun oikeasta reunasta | 12 px | 12 px | 12 px |
| selite vasemmasta reunasta (auki / kiinni) | 12 / 12 px | 12 / 12 px | 12 / 12 px |
| kelatun selitteen taustan alfa | 0,25 | 0,25 | 0,25 |
| avatun selitteen taustan alfa | 0,72 | 0,72 | 0,72 |
| kelatun otsikon opacity | 0,70 | 0,70 | 0,70 |
| kelattu otsikko, korkeus / fontti | 19 / 16 px | 19 / 16 px | 19 / 16 px |
| hampurilaisia DOMissa | 0 | 0 | 0 |

Ääni (työpöytä ja puhelin):

- puskurin kesto **84 s**, `loop = true`, yksi soitin;
- gain nousee ensimmäisestä näytteestä (0) tavoitteeseen **0,2609**
  (humina) ja musiikki omalle tasolleen **0,0638**;
- kolme kohteenvaihtoa ja yksi pikkukuvan vaihto: luotujen
  `BufferSourceNode`ien määrä **ei muutu** (11 → 11 / 10 → 10);
- pelin musiikkikytkin pois: taso **0**, kerrokset pysäytetty; takaisin
  päälle: uusi soitin ja taso takaisin 0,2609;
- pakotettu 404 musiikille: `puuttuu: true`, humina soi silti, ei
  sivuvirheitä;
- linssistä poistuminen: soitin `null`, yhtään pitkää lähdettä ei jää
  soimaan.

**Feidin kestoa ei voi mitata tässä kontissa kellolla.** Ohjelmisto-WebGL
nälkiinnyttää pääsäikeen niin, että 50 ms:n näyteväli venyy sekunneiksi
(äänikontekstin oma kello ehti 190 s, kun nimellinen mittaus oli 10 s).
Siksi väite mittaa nousun MUODON (ensimmäinen näyte 0, myöhempi näyte
tavoitteessa) eikä sekuntimäärää; feidin pituus (2 s / 3 s) on vakiona
koodissa ja vartioitu yksikkötestissä.

## 7. Testit ja savukkeet

Yksikkötestit (`NODE_USE_ENV_PROXY=1 node --test`):

- `tests/satelliitti.test.mjs` 54/54 (8 uutta väitettä: soitin, kerrokset,
  puuttuva musiikki, äänikonteksti ja väistö, minipulu, kysymykset,
  kelattu selite);
- `tests/satelliitti-avaruus.test.mjs`, `tests/astronaut-audio.test.mjs`,
  `tests/astronaut-kysymykset.test.mjs`, `tests/rules.test.mjs`,
  `tests/dokumentit.test.mjs`, `tests/sw.test.mjs` — yhteensä **472/472**;
- `tools/tarkista-niputus.mjs`: 392 moduulia, ei törmäyksiä.

Savukkeet (yksi kerrallaan, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`):

| Savuke | Tulos |
| --- | --- |
| `savuke-astro-aani.mjs` (uusi, työpöytä + puhelin) | **22/22** |
| `savuke-astro-valokuva.mjs` työpöytä | **32/32** |
| `savuke-astro-valokuva.mjs` puhelin | **32/32** |
| `savuke-astro-valokuva.mjs` vaaka 844 × 390 (uusi näkymä) | **32/32** |
| `savuke-astro-pallo.mjs` työpöytä | **31/31** |
| `savuke-satelliittilinssi.mjs` työpöytä | **34/34** |

`savuke-astro-valokuva.mjs` kasvoi 18:sta 32 väitteeseen näkymää kohti ja
sai neljännen näkymän (puhelimen vaaka-asento, josta LISÄYS 7 tuli).

**R2-MP3 kontissa.** Ämpärin 1,3 Mt:n humina latautui Noden kautta ilman
ongelmia (`fetch` proxyn läpi, 200 audio/mpeg), ja savuke tarjoaa tavut
selaimelle `route`-vastauksena. Varalla on paikallisesti syntetisoitu
84 s:n WAV, joka otetaan käyttöön vain jos nouto epäonnistuu — ja siitä
tulostuu silloin oma rivi lokiin, jottei sitä voi lukea oikeaksi
äänitteeksi. Tässä ajossa varaäänitettä ei tarvittu.

**Yksi vartija korjattiin, ja syy on kirjattu.**
`savuke-satelliittilinssi.mjs`:n väite "pallon takapuolen merkki ei ota
napautusta" alkoi kaatua: pallo pyörii linssin avauduttua hitaasti
(LISÄYS 4), ja takapuolen merkin RUUTUPAIKKA osui ajoittain jonkin
ETUPUOLEN merkin osuma-alueen päälle — napautus avasi siis oikean kortin
oikein, mutta mittari luki sen takapuolen ansioksi. Mittari valitsee nyt
vain sellaisen takapuolen merkin, jonka 40 px:n säteellä ei ole
etupuolen merkkiä. Sama savuke ajettiin varmuudeksi puhtaalla
`origin/main`-työpuulla: **34/34 läpi**, eli vika oli mittarissa eikä
pelissä.

## 8. Konfliktit Codexin haarojen kanssa

Ei yhtäkään. Molemmat haarat yhdistyivät puhtaasti:

- `origin/codex/astronaut-audio-questions-20260916` (PR 2539):
  15 tiedostoa, pelikoodiin vain uusi `js/linssit/astronaut-kysymykset.js`
  + `sw.js`-rivi;
- `origin/codex/minipulu-lens-api-20260915` (PR 2521): 6 tiedostoa,
  pelikoodiin vain uusi `js/minipulu.js` + `sw.js`- ja Raamatun
  dokumenttikartan rivi (Codexin oma, säilytetty sellaisenaan).

Kummankin haaran omat testit ajettiin ja ne menivät läpi muuttumattomina.

## 9. Kuvat

- `docs/raportit/kuvat/astro-minipulu-1400-20260916.jpg` (147 kt)
- `docs/raportit/kuvat/astro-minipulu-390-20260916.jpg` (65 kt)

Molemmissa näkyy minipulu oikeassa alakulmassa ja avattu kysymyskortti,
jossa on kohteen kaksi kysymystä ja napautetun kysymyksen vastaus.

## 10. Mitä jäi Fablelle

1. **Raamattuun ei koskettu** (työsession sääntö): LISÄYKSET 6–8 on
   toteutettu, mutta niiden tilarivit ("työ Opus-agentilla" → "valmis
   haarassa") kuuluvat Fablen kirjattaviksi.
2. **Musiikki on jo ämpärissä** eikä sitä ole vielä kuunneltu omistajan
   kanssa. Kytkentä on valmis ja soi; jos raita halutaan vaihtaa, vain
   tiedosto vaihtuu — koodiin ei kosketa.
3. Versionosto ja julkaisu Fablen aikataulun mukaan.
