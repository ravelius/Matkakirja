# Viesti Fablelle: musta pallo iPhonessa (v1924) — juurisyy ja korjaus

16.9.2026, Opus. Haara `claude/bold-ride-vow4ki-pallo-musta`.
Ei PR:ää, ei versionostoa, ei Raamattu-muutoksia.

## 1. Oire

Omistajan kaappaus (iPhone, v1924): Astronautin kameran pallo on
**kokonaan musta**. Vihreät kohdepisteet, ISS:n ratakaari, valkoinen
ISS-merkki ja sininen kehähohto piirtyvät normaalisti. Linssi siis
avautuu, kamera menee paikalleen, kalvo toimii — vain pallon **pinta**
puuttuu.

Juuri tuo yhdistelmä on ratkaiseva vihje. Pisteet ja kalvo ovat DOMia
ja ilmakehän hohto oma sävytinnsä; ne eivät lue tekstuuria. Musta on
siis *tekstuuri*, ei valaistus, ei kamera eikä kalvo.

## 2. Todennäköisin juurisyy

**Ladontakangas jäi tyhjäksi iOS Safarissa, eikä yksikään virhehaara
lauennut.**

Ketju oli (v1921–v1924):

1. `kangas` 4096 × 2048 — generoitu vyöhykepallo pohjalle
2. `apu` 4096 × 2048 — reliefikuva + kylläisyys + valon käänteiskaava
3. `kangas.drawImage(apu)`
4. `kangas.toBlob('image/png')` → blob-osoite → `globeImageUrl`

Huipulla muistissa oli siis **kaksi 4096 × 2048 -kangasta** (33,5 Mt
kumpikin), **purettu WebP** (33,5 Mt) ja **PNG-pakkaus** 8,4
megapikselistä — päälle pelin oma WebGL-konteksti. Yli sata megatavua
yhdellä avauksella.

Ja tässä on se kohta, joka teki viasta näkymättömän:

> **iOS Safari ei heitä poikkeusta, kun kangas ylittää sen rajat. Se
> antaa kankaan, joka on kokonaan läpinäkyvä.**

Tyhjä kangas menee `toBlob`in läpi ongelmitta. Blob-osoite syntyy.
`globeImageUrl` asetetaan. Kirjaston ja three.js:n kannalta kaikki
onnistui. Mutta läpinäkyvä tekstuuri MeshPhongMaterialin `map`issa
piirtyy **mustana** — RGB on nolla, eikä alfaa katsota.

Ketju siis "onnistui" alusta loppuun, `reliefi`-mittari näytti
`true`, eikä yksikään `catch` lauennut. Chromiumissa (savuke, työpöytä
ja puhelinmitta) sama ketju mahtuu muistiin, joten vika ei näkynyt
missään automaattisessa mittarissa.

### Miksi tämä eikä joku muu

Kävin tehtävänannon kuusi epäilystä läpi koodista:

| # | Epäily | Tulos |
|---|--------|-------|
| 1 | 8k valittiin väärin puhelimelle | **Ei.** `valitseReliefi` vaatii CSS-leveys ≥ 1024 **ja** laitepikselit ≥ 1024; 390 CSS putoaa ensimmäiseen ehtoon. 4k valittiin oikein. Mutta 4k:n **ladonta** oli silti liian raskas — ja **iPad vaakatasossa saa 8k:n, jonka 33,5 Mpx ylittää Safarin 16,7 Mpx:n kangaskaton kaksinkertaisesti eli ei voi koskaan onnistua.** |
| 2 | `ctx.filter` ei tuettu (Safari ≤ 16) | **Osasyy, ja siinä oli oma bugi.** Varareitti asetti `globalCompositeOperation = 'saturation'` — mutta tuntematon sekoitustila **ei heitä virhettä**, vaan jättää `source-over`in voimaan. Silloin harmaa `#808080` levisi 0,2 alfalla koko kankaalle. Ei musta, mutta väärä. Nyt arvo luetaan takaisin ennen täyttöä. |
| 3 | `createImageBitmap` / `OffscreenCanvas` | **Ei käytössä.** Ketjussa ei ollut kumpaakaan. |
| 4 | WebP + `crossOrigin` + fetch/decode | **Ei.** Jos CORS estäisi latauksen, `error` laukeaisi → `null` → generoitu vyöhykepallo jäisi pinnalle. Se olisi värillinen pallo, ei musta. |
| 5 | `toBlob` epäonnistuu tai kestää | **Ei suoraan**, mutta se ei myöskään suojannut: tyhjästä kankaasta tulee kelvollinen blob. Aikakatkoa ei ollut lainkaan. |
| 6 | Virhe ketjussa jättää `globeImageUrl` asettamatta | **Ei.** Generoitu tekstuuri asetetaan heti avauksessa, ennen reliefiä. Musta ei voi syntyä puuttuvasta osoitteesta — vain **väärästä** osoitteesta, ja juuri se tapahtui. |

Epäilyt 1, 2 ja 5 ovat kaikki saman asian eri puolia: **ketju luotti
siihen, että epäonnistuminen näkyy poikkeuksena.** Safarissa se ei näy.

## 3. Korjaus

### 3.1 Ladontakangas valitaan RUUDUSTA, ei kuvasta
`js/linssit/reliefikuva.js`: uusi puhdas funktio `valitseLadonta`.
Lähdekuva ladataan aina täytenä, mutta se piirretään kankaalle, joka
mahtuu laitteeseen — puhelimella (CSS-leveys < 1024) **2048 × 1024**,
leveällä ruudulla lähdekuvan oma koko. Suhde pysyy 2:1 puolituksin.

Puhelimella tämä riittää: avaruusnäkymässä palloa näkyy vain puolikas,
joten 390 CSS-pikselin pallo saa noin 1 024 tekstuuripikseliä näkyvälle
puoliskolleen. Hieman pehmeämpi kuin 4k — mutta ei musta.

### 3.2 Yksi kangas kahden sijaan
Koko pallon kuvassa (v1923, `RELIEFI_KOKO_PALLO`) **ei ole yhtään
läpinäkyvää pikseliä**: navat ovat siinä mukana. Alfan palautusta ja
napaliukua ei siis tarvita, eikä niiden kanssa apukangasta. Ketjun
huippukulutus puolittuu. Vanha kaksikangaspolku on tallella sitä
varten, jos koko pallon kytkin joskus käännetään pois.

### 3.3 Tyhjän kankaan tunnistus — korjauksen ydin
`tyhjaKangas()` lukee kymmenen näytettä eri puolilta ladottua karttaa
ennen kuin tuloksesta tehdään osoitetta. Jos kirkkain alittaa kynnyksen
(12), kangas oli tyhjä → **kangasta ei oteta käyttöön**, vaan ladonta
yritetään uudestaan puolikkaalla (3 yritystä, 8192 → 4096 → 2048). Jos
kaikki epäonnistuvat, `reliefiTekstuuri` palaa nullina ja generoitu
vyöhykepallo jää pinnalle.

Jos tarkistusta ei voi tehdä (ei `getImageData`ia, likainen kangas),
ladonta hyväksytään: vartija ei saa olla tiukempi kuin sen tieto.

### 3.4 Aikakatko ja varapolku
`RELIEFIN_AIKAKATKO_MS = 8000`. Jos kuva ei lataudu eikä heitä virhettä
(Safarissa tavallista yhteyden katketessa), lupaus ratkeaa nullina.
Varapolku itsessään oli jo olemassa ja säilyy: **generoitu
vyöhykepallo asetetaan heti avauksessa, ennen kuin reliefiä edes
pyydetään**, eikä sitä oteta pois jos reliefi ei valmistu.

### 3.5 Kylläisyys ilman `ctx.filter`ia
Kolme tasoa: `suodatin` (Safari 17+, Chrome) → `pikselit` (tarkka
pikselisilmukka, sallittu vain `PIKSELISATURAATION_KATTO` = 2048 × 1024
alittavalle kankaalle, eli juuri puhelimen ladontakankaalle) →
`sekoitus` (`saturation`-sekoitus, nyt arvo takaisinluettuna).

### 3.6 Kankaat vapautetaan heti
iOS Safari ei vapauta kankaan taustapuskuria roskienkeruun tahdissa.
Jokainen kangas nollataan (`width = height = 1`) heti kun sitä ei enää
tarvita — myös tuloskangas `toBlob`in jälkeen.

### 3.7 `?pallodiag=1`
Ketju kirjoittaa itsestään lokia (vaihe + kesto) **aina**; lippu
`?pallodiag=1` ratkaisee, tulostetaanko se konsoliin ja pieneen
ruutulokiin ruudun vasempaan alakulmaan. Loki näkyy myös linssin
`tila().diag`-kentässä, ja pinnan osoite `tila().pinnanOsoite`:ssa.

## 4. Mitä omistajan pitää tarkistaa puhelimella

Avaa peli osoitteella, jonka perässä on **`?pallodiag=1`**, ja avaa
Astronautin kamera. Ruudun vasempaan alakulmaan ilmestyy pieni musta
lokilaatikko. Odotettu rivistö puhelimella:

```
alku lahde=4096x2048 kangas=2048x1024 ruutu=390 kokoPallo=1
kuva px=4096x2048 ms=...
ladonta koko=2048x1024 ok=1 tapa=suodatin ms=...
blob kt=... ms=...
valmis syy=blob osoite=blob:https:// ms=...
```

Kolme asiaa katsottavaksi:

1. **`kangas=2048x1024`** — ladontakangas pienennettiin puhelimelle.
   Jos tässä lukee `4096x2048`, ruudun leveys ei tullut perille.
2. **`ladonta ... ok=1`** ensimmäisellä yrityksellä. Jos näet useamman
   `ladonta`-rivin, laitteessa oli kuormaa ja puolitus pelasti tilanteen
   — se on odotettua käytöstä, ei vikaa.
3. **`valmis syy=blob`** ja kokonaiskesto. Jos lukee
   `syy=kangas-tyhja` tai `syy=aikakatko`, reliefiä ei saatu — mutta
   pallon pitää silti olla **värillinen** (generoitu vyöhykepallo), ei
   musta. Jos se on siinäkin tapauksessa musta, vika on generoidussa
   tekstuurissa eikä reliefissä, ja se on eri korjaus.

Ja tietysti: **näkyykö pallolla maastoa.** Puhelimen tekstuuri on nyt
2048 leveä; jos se näyttää liian pehmeältä lähimmässä zoomissa, katon
voi nostaa yhdellä luvulla (`LADONNAN_KATTO_PUHELIN`) — mutta silloin
kannattaa varmistaa, ettei musta palaa.

## 5. Testit

Yksikkötestit (`tests/satelliitti-avaruus.test.mjs`), uudet viisi:
ladontakoon valinta puhelimella ja leveällä ruudulla; tyhjän kankaan
tunnistus (ja se, ettei tunnistus estä kun sitä ei voi tehdä);
kylläisyyden kolme tasoa mukaan lukien vanha harmaantumisbugi;
`reliefiTekstuuri`n varapolut (kangas mahtuu / ei mahdu / aikakatko);
ja se, että koko pallon kuva ladotaan **yhdelle** kankaalle ja kaikki
kankaat vapautetaan.

Kaksi vanhaa lähdekooditestiä päivitettiin, koska ne vartioivat
invarianttia joka muuttui tarkoituksella (pikselisilmukka on nyt
olemassa mutta kokokatolla; `napaLiuku` on nyt kokonaan toisessa
haarassa eikä `if (!kokoPallo)`-ehdon takana).

Savuke `tools/savukkeet/savuke-astro-pallo.mjs`, väite 8: pinnalla on
osoite, reliefi ehti 8 s:ssa, ja **pallon keskipisteen kirkkaus > 20**
kuvakaappauksesta luettuna. Lisäksi väite 8b ajaa saman linssin
**Safarin rajoilla**: `addInitScript` poistaa `ctx.filter`in ja tekee
yli 2048 × 1024 -kankaista tyhjiä. Ennen korjausta se tuotti
täsmälleen omistajan kuvan; nyt varapolun on kannettava.

## 6. Mitä ei koskettu, ja yksi jatkokysymys

Reliefin **valinta** (`valitseReliefi`, 8k vs. 4k) on ennallaan: se oli
oikeassa, 390 CSS-pikselin puhelin sai 4k:n kuten pitikin. Kytkimiä
`RELIEFIN_8K_KAYTOSSA` ja `RELIEFI_KOKO_PALLO` ei käännetty, kuvia ei
vaihdettu, versionumeroa ei nostettu eikä Raamattuun koskettu.

Topografialinssi (`js/linssit/topografia.js`) lukee saman valinnan,
mutta se piirtää kuvan kalvolle sellaisenaan eikä kokoa sitä
monikangasketjussa — tämä vika ei siis koske sitä. Sen
tarkennuslaastari tekee oman kankaansa, mutta se on näkyvän ikkunan
kokoinen, ei 4096 × 2048.

**Jatkokysymys Fablelle:** iPad vaakatasossa valitsee 8k:n, jonka
ladonta on 33,5 megapikseliä eli yli iOS Safarin 16,7 Mpx:n
kangaskaton. Nyt se ei enää mustu — tyhjä kangas huomataan ja ladonta
putoaa 4096 × 2048:aan — mutta se tarkoittaa, että **iPad tekee turhaa
työtä**: lataa 2,9 Mt:n 8k-kuvan ja latoo sen sitten puolikkaana.
Siistein korjaus olisi sitoa 8k:n valinta myös siihen, pystyykö laite
latomaan sen. Se on kuitenkin oma päätöksensä ja oma mittauksensa, ja
tämä haara on kiireellinen vikakorjaus — jätän sen sinulle.

## 7. Ajotulokset

- `node --test tests/satelliitti-avaruus.test.mjs tests/satelliitti.test.mjs
  tests/pallolinssit.test.mjs tests/dokumentit.test.mjs` — **129/129 läpi**.
- `savuke-astro-pallo NAKYMAT=puhelin` — **37/37 läpi**. Diag:
  `kangas=2048x1024`, ladonta ok ensimmäisellä yrityksellä
  (`tapa=suodatin`), koko ketju 4 583 ms, keskipisteen kirkkaus 48,4.
- `savuke-astro-pallo NAKYMAT=tyopoyta` — **37/37 läpi**. 8k ladotaan
  yhä täydessä koossa, kirkkaus 54,4.
- **Safarin rajoilla (väite 8b) molemmilla ruuduilla.** Puhelimella
  kylläisyys putosi pikselisilmukkaan (`tapa=pikselit`) ja ladonta
  onnistui heti. Työpöydällä näkyy puolitusketju kokonaisuudessaan:

  ```
  ladonta koko=8192x4096 ok=0     <- Safarin katto ylittyi, kangas tyhjä
  ladonta koko=4096x2048 ok=0     <- yhä liikaa
  ladonta koko=2048x1024 ok=1     <- mahtui
  ```

  Kirkkaus 88,2 eli pallo oli värillinen, ei musta. Ennen korjausta
  ensimmäinen tyhjä kangas olisi mennyt suoraan pinnalle.

**EI AJETTU:** `savuke-satelliittilinssi NAKYMAT=tyopoyta` — sessio
loppui kesken. Se ei koske tämän korjauksen koodia (kartta-asetelma ja
kuvakortit, ei pallon tekstuuriketju), mutta se on syytä ajaa ennen
julkaisua.
