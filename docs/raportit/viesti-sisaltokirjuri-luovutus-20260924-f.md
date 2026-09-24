# Luovutus: Sisältökirjuri — 24.9.2026 (f), klo 17.55 EEST

Konteksti 70 %, Fablen käskystä luovutus ja nollaus. Edellinen luovutus:
`docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-e.md`. Tämä vuoro
teki kohdekartat 10 kaupungille, Churchill-noston (Arktinen merijää) ja
vei koko 91 kaupungin (71 vanhaa + 20 N2/N4/N5/N6-erää) sää/galleria/
ennenNyt-kierroksen loppuun.

## 1. Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`
2. Raamatun "TYÖTAPA JA SESSIOT" (Ydinajatus-osion kohta 2)
3. `docs/raportit/sisalto-inventaario-20260924.md` (PR #3045) — KOKO,
   erityisesti **kohdat 5–9**, jotka syntyivät tässä vuorossa (5.5
   kohdekartan 10+20 hyväksytty/hylätty -lista, 6–7 galleria/ennenNyt
   N8–N16:lle, 8 N2/N4/N5/N6-mergetilanne, 9 turistiopas-kelpoisuus).
4. Tämä raportti kokonaan

## 2. Tila

`main = v2179`, SHA `9eb1b1bb2` (edellisen vuoron loppu — vain
Kalgoorlien kohdekartta-PR #3075 on mergetty tämän vuoron töistä,
loput ovat auki). Julkaistut/avatut PR:t tässä vuorossa:

| PR | Sisältö | Tila |
|---|---|---|
| #3075 | Kohdekartta: Kalgoorlie | **Mergetty** (v2177) |
| #3080 | Kohdekartta: Mount Isa | Auki, testit 0 fail |
| #3082 | Kohdekartta: Geraldton | Auki, testit 0 fail |
| #3083 | Kohdekartta: Broome | Auki, testit 0 fail |
| #3084 | Kohdekartta: Porto Velho | Auki, testit 0 fail |
| #3087 | Kohdekartta: Santarém | Auki, testit 0 fail |
| #3088 | Kohdekartta: João Pessoa | Auki, testit 0 fail |
| #3089 | Kohdekartta: Macapá | Auki, testit 0 fail |
| #3090 | Kohdekartta: Cayenne | Auki, testit 0 fail |
| #3091 | Kohdekartta: Gao | Auki, testit 0 fail |
| #3094 | Churchill: Arktinen merijää -nosto | Auki, testit 0 fail |
| #3097 | N2: galleria + ennenNyt | Auki, testit 0 fail |
| #3098 | N4: ennenNyt | Auki, testit 0 fail |
| #3101 | N5: galleria + ennenNyt | Auki, testit 0 fail |
| #3104 | N6: galleria + ennenNyt | Auki, testit 0 fail |
| #3045 | Sisältöinventaario (kohdat 5.5, 8, 9 lisätty tässä vuorossa) | Auki |

Lisäksi suljettiin kaksi vanhaa, redundanttia PR:ää Julkaisijan
pyynnöstä: **#2966 ja #2972** (Afrikan O7-paketit) — kaikki niiden
kaupungit olivat jo mainissa N10–N15-erillä, rebase olisi jättänyt ne
tyhjiksi.

**14 vanhaa sää-PR:ää** (edellisen vuoron työtä, #3047–#3065) ovat
tilanteessa: 6 mergetty (#3047, #3056, #3058, #3060, #3062, #3063,
#3064 — tarkista tarkka lista `gh pr list`:llä, tilanne muuttuu koko
ajan), loput auki `mergeable=CONFLICTING`. **Tarkistin merge-tree:llä
neljä näytettä (huom: kaikkia ei ehditty tarkistaa uudelleen tämän
vuoron lopussa) — konfliktit olivat VAIN `js/main.js`, `js/muutokset.js`
ja `sw.js` -versiotiedostoissa, ei sisältöristiriitoja.** Tämä on
odotettu versionumero-tuplaus (`docs/roolitus.md` "Julkaisusäännöt"
kohta 2), jonka Julkaisija ratkaisee mergehetkellä — en rebasenut
kaikkia, koska ne menisivät heti taas vanhaksi ennen kuin Julkaisija
ehtii niihin.

## 3. Pushatut mutta julkaisemattomat haarat

Kaikki alla olevat ovat pushattu originiin ja PR auki — ei katoavaa
työtä. Worktreet ovat yhä paikallaan `/Users/Shared/Claude/wt/`:ssä,
poistetaan `tools/uusi-worktree.sh --poista <nimi>` kunkin PR:n
mergen jälkeen:

- `sisaltokirjuri-mountisa` → #3080
- `sisaltokirjuri-geraldton` → #3082
- `sisaltokirjuri-broome` → #3083
- `sisaltokirjuri-portovelho` → #3084
- (Santarém-worktree poistettu jo tässä vuorossa Postivahdin pyynnöstä,
  vaikka PR #3087 oli silloin yhä auki — huomio lähetetty Postivahdille)
- `sisaltokirjuri-joaopessoa` → #3088
- `sisaltokirjuri-macapa` → #3089
- `sisaltokirjuri-cayenne` → #3090
- `sisaltokirjuri-gao` → #3091
- `sisaltokirjuri-churchill-merijaa` → #3094
- `sisaltokirjuri-n2-galleria-ennennyt` → #3097
- `sisaltokirjuri-n4-galleria-ennennyt` → #3098
- `sisaltokirjuri-n5-galleria-ennennyt` → #3101
- `sisaltokirjuri-n6-galleria-ennennyt` → #3104

Pääkassa `/Users/Shared/Claude/Matkakirja-sisaltokirjuri` on haarassa
`sisalto-kohdekartta-pilotti-20260924` (Kalgoorlien pilotti, jo
mergetty PR #3075:nä) — puhdas, ei committoimatonta.

## 4. Kesken — tee nämä ensin

### 4.1 Kuvatilausluonnos (ENSIMMÄINEN TEHTÄVÄ uudelle sessiolle)

Fable pyysi kuvaputken tilausluonnoksen
`docs/raportit/kuvatilaus-galleria-ennennyt-20260924.md` (per kaupunki:
mitä haetaan, hakusanat, museoiden open access -lähteet, mitä ei saa)
Fablen hyväksyttäväksi ennen postilaatikkoon vientiä. **Tätä ei ehditty
tehdä tässä vuorossa** — se on uuden session ensimmäinen tehtävä, ks.
aloitusviesti kohta 10. Pohjana kaupunkilistat alla (kohta 4.2 ja 4.3).

### 4.2 Galleria puuttuu 58 kaupungilta

**N8–N16 (43/46, tarkistettu, ei aitoa löytöä Commons-haulla):**
angola, namib, robinsoncrusoe, appalakit, churchill, sierraleone,
tanganjika, boavista, kappalmas, kimberley, labrador, sthelena,
ahaggar, gao, kamerun, suakin, viktoria, cayenne, darfur, mosambik,
rashafun, tshadjarvi, bahrelghazal, broome, orjarannikko, santarem,
sepik, bananal, geraldton, joaopessoa, murzuk, nullarbor, alkufra,
campogrande, exmouth, macapa, sanambrosio, birdsville, cooberpedy,
kalgoorlie, mountisa, nome, portovelho.

**N2/N4/N5/N6 (15/20, tarkistettu tässä vuorossa):** managua, sanjuan,
noumea, puertomontt, sahara, kongo, madagaskar, galapagos,
machupicchu, uluru, titicaca, mountrushmore, hawaii, bali,
milfordsound.

**HUOM Fablelle:** ilmoitin aiemmin tässä vuorossa "14 ilman
galleriaa" N2/N4/N5/N6-erälle — tarkka laskenta antaa **15**, ei 14
(Uluru ja Titicaca molemmat ilman, olin unohtanut toisen). Korjaan
tässä: yhteensä 43+15 = **58 kaupunkia ilman galleriaa** koko 91:stä,
ei 43+14=57.

### 4.3 EnnenNyt puuttuu 12 kaupungilta

**N8–N16 (11/46):** caphorn, boavista, santarem, exmouth, sanambrosio,
churchill, bananal, geraldton, nullarbor, campogrande, nome.

**N2/N4/N5/N6 (1/20):** sahara — ei päivättyä vanhaa kuvaa
valokuvataulussa eikä Commons-haku löytänyt varmaa pre-1960 valokuvaa
autiomaasta.

### 4.4 Kimberley ja Al Kufra pois kohdekartta-12-listasta

Alkuperäinen Fablen hyväksymä 12 kaupungin kohdekartta-lista supistui
10:een: Kimberley ja Al Kufra siirrettiin hylättyyn (inventaario
kohta 5.5, "Riittävä väestö mutta ei kahta paikannettavaa kohdetta"
-ryhmä) — kummankin kaikki nostot koskevat yhtä ainoaa aluetta eikä
toista OSM-nimettyä kohdetta löytynyt. Ei korvaajaa valittu — jos
lista halutaan täyteen 12:een, seuraavan session pitää löytää kaksi
uutta kaupunkia kohdan 3 kaupunki/taajama-listalta.

## 5. Odottaa omistajan päätöstä

Ei suoraan omistajalle nousseita kysymyksiä tässä vuorossa — kaikki
päätökset (Kimberley/Al Kufra-hylkäys, turistiopas-luokittelu,
kohdekartta-tekniikka) on käsitelty Fablen kanssa suoraan.

## 6. Voimassa olevat työtavat

Ei muutoksia perussääntöihin — ks. Raamatun "TYÖTAPA JA SESSIOT".
Tässä vuorossa vahvistettua (ei uusia pysyviä sääntöjä):

- Kohdekartta-erä: yksi kaupunki per PR, oma haara `origin/mainista`
  (`tools/uusi-worktree.sh sisaltokirjuri <kaupunki>`) — EI usean
  kaupungin samalle haaralle, koska `uusi-versio.mjs` kieltäytyy
  samasta versionumerosta kahdesti samalla haaralla ennen mergeä.
- Galleria/ennenNyt-erä: yksi PR per 5 kaupunkia (sää → galleria →
  ennenNyt samassa PR:ssä, kun sää on jo tehty erikseen).
- `js/packs/*-valokuvat.js`:n "lisat"-taulukon ensimmäinen kuva
  kelpaa yleensä ennenNyt:n "uudeksi" puoleksi ilman erillistä
  harkintaa, MUTTA jos taululla ei ole top-level `tiedosto`-kenttää
  (vain "lisat"), koko taulussa ei ole valmista vanhaa puolta — silloin
  vanha puoli pitää hakea Commonsista erikseen (kongo, madagaskar,
  ouropreto tässä vuorossa).

## 7. Julkaisukaava

Ei muutoksia. `git fetch origin main` → `node tools/uusi-versio.mjs
"<rivi, alle 60 merkkiä>"` → `node --test tests/*.test.mjs` (0 fail) →
`node tools/tarkista-kaksoisavaimet.mjs` → `node tools/build-standalone.mjs`
→ commit (data + sw.js + js/main.js + js/muutokset.js) → push → PR.
Kohdekartta-erissä lisäksi `node tools/tarkista-karttapisteet.mjs
<kaupunki>` version-nostin JÄLKEEN, ennen committia.

## 8. Ympäristö ja infra

- **Työkansio:** `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
  (pääkassa), erä-worktreet `/Users/Shared/Claude/wt/sisaltokirjuri-*`
  (lista kohdassa 3), Mac Studio.
- `npm ci` ajettu jokaisessa worktreessä erikseen (node_modules ei
  periydy worktreestä toiseen).
- **Chromium (Playwright), kohdekartta-renderöintiin:**
  `~/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/
  Google Chrome for Testing.app/Contents/MacOS/Google Chrome for
  Testing`. Aseta `CHROMIUM`-ympäristömuuttuja AINA ennen
  `tools/piirra-kaupunkikartta.mjs`:ää.
- **Overpass-rajapinta** (kartat): ajoittain 504/timeout, mutta
  toistoyritykset (työkalun oma retry-logiikka) onnistuivat joka
  kerta tässä vuorossa muutaman minuutin sisällä — ei tarvinnut
  vaihtaa peiliä kertaakaan.
- **Commons-haku:** `tools/hae-commons.mjs haku "<hakusana>" <n>` +
  `tiedot "File:..."` lisenssin/tekijän tarkistukseen. Ei API-avainta.
- **dist/-kansio EI committoida.**
- Ei uusia rutiineja, ajastuksia tai trigger-id:itä perustettu.

## 9. Avoimet velat ja opetukset

### Velat

1. Kuvatilausluonnos (kohta 4.1) tekemättä — ensimmäinen tehtävä.
2. Galleria puuttuu 58 kaupungilta, ennenNyt 12:lta (kohdat 4.2–4.3) —
   odottaa kuvatilausluonnon hyväksyntää ja postilaatikko-kierrosta.
3. Kimberley/Al Kufra-korvaajat kohdekartta-12-listalle valitsematta
   (kohta 4.4).
4. 13 vanhaa sää-PR:ää versiotiedosto-konfliktissa, odottaa
   Julkaisijan mergekierrosta (kohta 2).
5. Turistioppaan (inventaario kohta 9) 9 hylättyä + 4 epävarmaa
   kaupunkia odottaa Fablen silmäystä ennen kuin turistiopas-vaihe
   (5.4) voidaan aloittaa.

### Opetukset

- **Flavor-tekstin maantiede pitää tarkistaa, ei vain kaunis lause.**
  Mount Isan Lake Moondarra -nosto väitti järven olevan "aivan
  kaupungin kupeessa" — todellisuudessa n. 18 km päässä. Nominatim-
  koordinaattien etäisyyslasku (`sqrt(dlat²+dlon²)*111 km`) paljasti
  tämän ennen kuin virhe päätyi kohdekarttaan.
- **Yksi kaupunki per haara kohdekartta-erissä**, ei useampaa samalla
  haaralla ennen mergeä — `uusi-versio.mjs` kieltäytyy toistamasta
  numeroa, ja korjaus (uusi worktree `origin/mainista`) on nopeampi
  kuin yrittää pakottaa sama haara toimimaan.
- **`js/packs/*-valokuvat.js`:n rakenne vaihtelee.** Kaupunkimaiset
  kohteet (Managua, San Juan) noudattavat top-level=vanha +
  lisat=uusi-kaavaa, mutta laaja-alaiset luontokohteet (Sahara, Kongo,
  Madagaskar) saattavat kerätä KAIKKI kuvat "lisat"-tauluun ilman
  päivättyä vanhaa ankkuria — tarkista aina ennen kuin oletat parin
  löytyvän suoraan.
- **Kulttuurisesti herkkää kuvamateriaalia ei käytetä ilman selvää
  kontekstia.** Uluru-galleriaan löytyi aboriginaalien
  kalliomaalauskuvia (Dagmar Hollmann, 2010-luku), mutta ne jätettiin
  pois: kuva on nykyaikainen valokuva pyhästä kalliotaiteesta, ei
  historiallinen taideteos, eikä sille ollut riittävää kontekstia
  galleria-formaattiin.
- **Konfliktilistaus vaatii tuoreen tarkistuksen, ei vain
  yleistietoa.** Turistiopas-kelpoisuuden (inventaario kohta 9) arvio
  perustui tämän session yleistietoon ilman uutishakua — merkitty
  raporttiin selvästi, jotta Fable tietää tarkistaa ennen tilausta.

## 10. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main

Lue: CLAUDE.md, docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT",
docs/raportit/sisalto-inventaario-20260924.md (KOKO, erityisesti kohdat 5-9),
ja tämä raportti kokonaan (docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-f.md).

TILA: kohdekartat tehty 10 kaupungille (PR:t #3080 #3082-#3084 #3087-#3091,
#3075 mergetty). Churchill-nosto tehty (#3094). Koko 91 kaupungin (71+20)
sää/galleria/ennenNyt-kierros VALMIS (PR:t #3097 #3098 #3101 #3104 + aiemmat).
Galleria puuttuu 58 kaupungilta, ennenNyt 12:lta — täydelliset listat
raportin kohdissa 4.2-4.3.

ENSIMMÄINEN TEHTÄVÄ: kirjoita docs/raportit/kuvatilaus-galleria-ennennyt-20260924.md,
kuvaputken tilausluonnos Fablen hyväksyttäväksi ennen postilaatikkoon vientiä.
Per kaupunki (kaikki 58 galleria-puutteelliset + 12 ennenNyt-puutteelliset,
listat raportin kohdissa 4.2-4.3): mitä haetaan (galleria: aikakauden
maalaus/taideteos aidosti kuvaamassa paikkaa; ennenNyt: pre-1960 valokuva),
hakusanat jotka jo kokeiltu tässä vuorossa ja EIVÄT tuottaneet tulosta (jotta
ei toisteta samaa hakua turhaan), museoiden/arkistojen open access -lähteet
jotka kannattaa kokeilla (esim. Rijksmuseum, Library of Congress, Gallica,
Smithsonian, Getty), ja mitä EI saa hakea (ei samannimisiä eri paikkoja, ei
kuvia jotka eivät aidosti kuvaa juuri tätä kohdetta — ks. Campo Granden
faktavirhe-esimerkki inventaarion kohdassa 6). Älä vielä tilaa mitään
postilaatikkoon — vain luonnos Fablen hyväksyttäväksi.

Kun luonnos on valmis, pushaa omalle haarallesi ja ilmoita Fablelle lyhyesti
(enintään 8 riviä), että se odottaa hyväksyntää.

Agentit vain Sonnet/Opus, enintään 4 rinnakkain. Kytke Remote Control
(set_remote_control self). Viestit Fablelle vain PR-numero valmiista
erästä, jumi tai kysymys, enintään 8 riviä. Aikaleimat date-komennolla.
```
