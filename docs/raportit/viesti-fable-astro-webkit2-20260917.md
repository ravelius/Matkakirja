# Viesti Fablelle: Astronautin kamera WebKitissä — tyhjä ruutu ja musta pallo (v1926)

17.9.2026, Opus. Haara `claude/bold-ride-vow4ki-astro-webkit2`
(pohjana `origin/main` 8a24acf5, v1929).
Ei PR:ää, ei versionostoa, ei Raamattu-muutoksia.

Viat: Raamattu, ASTRONAUTIN KAMERA **LISÄYS 13 kohdat 36 ja 37**;
Codexin havainnot `posti/codex-fable-astronaut-webkit-tyhja-20260916.md`
(kaksi ylintä osiota, 17.9.). Aiemmat erät:
`docs/raportit/viesti-fable-pallo-musta-20260916.md` ja
`docs/raportit/viesti-fable-astro-webkit-20260916.md`.

**LUE ENSIN SEURAAVA OSIO.** Raportin ensimmäinen versio väitti
molempien vikojen juurisyyksi kangas- ja muistirajoja. Se oli väärin.
Sain kontissa saman LOKIN kuin Codex, mutta sama oire eri syystä ei ole
todiste — ja Mac-session mittaus oikealla WebKitillä osoitti sen.
Kohdan 37 juurisyy on nyt mitattu ja korjattu; kohta 36 ei toistu
kummallakaan oikealla moottorilla ja jää Codexin uusintatestiin.

---

## Macin mittaama juurisyy 37: globe.gl `color = null`

Tämä osio on kirjoitettu viimeisenä, Mac-session mittauksen jälkeen, ja
se kumoaa raportin ensimmäisen version väitteen (8k-ladonnan muistiraja).

**Mekanismi, luettu kirjaston lähteestä** (`globe.gl` 2.46.2,
`globeImageUrl`-käsittelijä): kun osoite on tosi, kirjasto lataa
tekstuurin ja asettaa `n.map = t; n.color = null`. Kun osoite on **null**,
se tekee `!n.color && (n.color = new Color(0))` — eli **maalaa
materiaalin mustaksi**. Linssin SULKU palauttaa pohjapallon lähtötilaan
kutsulla `globeImageUrl(null)`, joten musta väri jää materiaaliin
odottamaan. Seuraava avaus asettaa oman tekstuurin päälle, mutta
musta × tekstuuri = **musta pallo**, vaikka kartta, valot ja kangas ovat
kunnossa. Siksi vika näkyi vasta kolmannessa avauksessa eikä
ensimmäisessä — yksi avaus ei voi nähdä sitä.

**Mitä lisäsin** (`js/linssit/satelliitti-avaruus.js`):

1. `valkaiseMateriaali(materiaali, hex)` — kirjoittaa **uuden**
   Color-olion (`color.set()` ei pure nulliin) käyttäen Color-luokkaa,
   joka haetaan `materiaali.specular.constructor`ista, kun globaalia
   `THREE`:ä ei ole.
2. Avauksessa: väri valkaistaan **ennen** oman tekstuurin asetusta, ja
   lähtöväri otetaan talteen (`varinLahto`).
3. Sulussa: `globeImageUrl(lahto.kuvaUrl ?? null)` -kutsun **perässä**
   `valkaiseMateriaali(materiaali, varinLahto)` — jotta kirjaston juuri
   maalaama musta ei jää seuraavalle avaukselle.
4. `pinta-musta`-vartija: `pinnanKirkkaus` piirtää yhden kehyksen ja
   lukee pallon keskustan **piirtopuskurista** (`readPixels`); alle
   kynnyksen jäävä kirkkaus nimetään `avauksenPuute`-arvoksi
   `pinta-musta`, kirjataan `pallodiag`-riville ja laukaisee
   kaksivaiheisen varapolun: **1)** väri valkoiseksi (mitattu juurisyy),
   **2)** vasta jos sekään ei auta, generoitu vyöhykepallo.
5. `pistemittari`-lokirivi (`kohteita` / `domissa` / `kerros`) kohdan 36
   uusintatestiä varten.

**16 Mpx:n ladontakatto jää varotoimeksi. Se EI ole kohdan 37 korjaus** —
Mac mittasi mustan myös 2048 × 1024 -ladonnalla.

---

## 0. Yhteenveto yhdellä silmäyksellä

| | Vika 36 (tyhjä ruutu, 0 pistettä) | Vika 37 (musta pinta) |
|---|---|---|
| Juurisyy | **EI TOISTU** oikealla WebKitillä eikä Chromiumilla (Mac-sessio: 0/61 avausta). Jää Codexin uusintatestiin. | **Globe.gl maalaa materiaalin mustaksi, kun `globeImageUrl` on null** — ja linssin SULKU tekee juuri sen. Seuraava avaus perii mustan. |
| Varmuusaste | — (ei toisinnettavissa; kontissa saatiin sama LOKI kehykset katkaisemalla, mutta se ei ole todiste WebKitin käytöksestä) | **korkea**: mekanismi luettu kirjaston lähteestä ja mitattu molemmilla moottoreilla |
| Korjaus | kehysvahti + pisteiden uusinta jäävät varotoimena; uusi `pistemittari`-lokirivi Codexin uusintatestiä varten | **`material.color = new Color(0xffffff)`** avauksessa ja sulussa; `pinta-musta`-vartija WebGL-luennalla, varapolku = väri valkoiseksi |
| Todiste | — | kolme peräkkäistä avausta: Chromium toisti mustan 16/16 ilman korjausta |

---

## 1. Miten mittasin ilman WebKitiä

Kontissa on vain `/opt/pw-browsers/chromium`, eikä `playwright install`
ole sallittu. Safarin rajat lavastettiin siis Chromiumiin
`addInitScript`illä ENNEN yhtään sivuskriptiä, ja koelaite on
omistajan oma mitta: **kotelo 2 539 × 1 321 CSS, dpr 1,
`navigator.standalone = true`**.

Neljä lavastusta. Kaksi niistä osui, ja **juuri se rajaus on tämän
raportin tärkein tulos**:

| Lavastus | Tulos ennen korjausta | Codexin kuva? |
|---|---|---|
| Iso PNG-blob ei dekoodaudu | pallo + reliefi kunnossa: three.js jättää vanhan tekstuurin voimaan, eli **rikkinäinen blob ei voi mustata palloa** | ei |
| `texImage2D` hylkää ison tekstuurin | pallo + reliefi kunnossa — lavastus ei purrut lainkaan (three.js vie tekstuurin GPU:lle jotain muuta WebGL2-polkua kuin `texImage2D`ia; en jäljittänyt kumpaa, koska seuraava lavastus osui) | ei |
| **rAF lakkaa kutsumasta takaisin aktivoinnissa** | **ruskea tyhjä ruutu, ei palloa, ei pisteitä, `vartija puute=pisteet pisteita=0` kahdesti** | oire täsmää, **mutta syy ei ole vahvistettu** (ks. luku 2) |
| **Kangas valehtelee: `drawImage` ei piirrä, `getImageData` antaa uskottavia pikseleitä** | **pallo + 64 vihreää pistettä + ratakaari, tekstuuri MUSTA, `vartija puute=ei`** | oire täsmää, mutta **syy oli väärä** — oikea juurisyy luvussa 3 |

**TÄMÄN TAULUKON OPETUS, ja se on raportin tärkein rivi:** lavastus,
joka tuottaa oikean oireen, ei todista syytä. Molemmat "osumani"
tuottivat Codexin kuvan — ja kohdassa 37 oikea syy oli aivan muualla.
Mac-session mittaus oikealla WebKitillä (luku 3) ratkaisi sen.

Kaksi ensimmäistä ovat yhtä tärkeitä kuin kaksi jälkimmäistä: ne
sulkevat pois selityksiä, jotka olisivat kuulostaneet uskottavilta.

---

## 2. Vika 36 — miksi kohdepisteitä ei synny DOMiin

**Juurisyy yhdellä kappaleella.** Kohdepisteet eivät ole dataa vaan
CSS2D-elementtejä, ja CSS2DRenderer lisää ne DOMiin VASTA PIIRTÄESSÄÄN:
`lauta.linssit.merkit(...)` vain kirjaa listan, Globe.gl:n Kapsule
sulattaa sen 1 millisekunnin ajastimella, ja elementti päätyy ruudulle
vasta seuraavassa piirretyssä kehyksessä. Asennetussa WebAppissa
kehyksiä ei tullut yhtäkään — ja koska pallon pintakin piirtyy vain
samassa render-silmukassa, sama yksi puute selittää molemmat oireet:
ruskean tyhjän ruudun (WebGL-kangas on läpinäkyvä, alta näkyy pelin oma
nahkatausta `.map-pane`) JA nollan kohdepisteen. Kaikki muu avauksessa
lepää AJASTIMILLA — kirjaston lataus, vaiheloki, reliefiketju,
vartija — joten ne kaikki raportoivat onnistuneensa. `vaihe
nimi=pisteet ok=1 ms=1` oli täysin rehellinen: lista MENI kirjastolle
yhdessä millisekunnissa. Se ei vain koskaan päätynyt ruudulle.
**KORJAUS TÄHÄN PÄÄTELMÄÄN (Mac-sessio 17.9.2026).** Kohta 36 **ei
toistu oikealla WebKitillä eikä Chromiumilla: 0/61 avausta.** Sain
kontissa saman LOKIN katkaisemalla kehykset, ja loki vastaa Codexin
kuvaa rivi riviltä — mutta se ei ole todiste siitä, että WebApp tekee
niin. Lavastus voi tuottaa oikean oireen väärästä syystä, ja juuri
niin kävi kohdassa 37 (luku 3).

**Mitä siis tiedän:** ilman kehyksiä pinta ja pisteet EIVÄT VOI olla
ruudulla, ja avausketju raportoi silti onnistuneensa — tämä on
rakenteellinen tosiasia koodista, ei arvaus. **Mitä en tiedä:** onko
juuri se se, mikä WebAppissa tapahtui. Kehysvahti ja pisteiden uusinta
jäävät siksi **varotoimeksi**, eivät vahvistetuksi korjaukseksi, ja
kohta 36 jää Codexin uusintatestiin uuden `pistemittari`-lokirivin
kanssa (luku 4).

### Toisinto kontissa (lavastus, ei todiste WebKitistä)

```
kirjasto yritys=0 ok=1 ms=661
avaruus-alku kotelo=2518x1242 kangas=2518x1242 hukassa=0 itsenainen=1 dpr=1
alku lahde=8192x4096 kangas=8192x4096 ruutu=2539 kokoPallo=1
avaruus-pinta tekstuuri=1 tarkkuus=8k
vaihe nimi=avaruus ok=1 ms=205
vaihe nimi=pulu ok=1 ms=1
vaihe nimi=aanet ok=1 ms=1
vaihe nimi=linssiaani ok=1 ms=2
vaihe nimi=pisteet ok=1 ms=0
ladonta koko=8192x4096 ok=1 tapa=suodatin ms=2015
vartija puute=pisteet pisteita=0 vaiheet=0
blob kt=49686 ms=2329
valmis syy=blob osoite=blob:http:// ms=4739
vartija puute=pisteet pisteita=0 vaiheet=0
```

Ruudulla: ruskea tyhjä pinta, ✕ oikeassa yläkulmassa ja ilmoitus
*"Kohdepisteitä ei saatu pallolle. Voit poistua linssistä ja yrittää
uudelleen."* — sama merkkijono, jonka Codex kuvasi.

### Varotoimet (eivät vahvistettu korjaus — ks. yllä)

**1. Kehysvahti** (`js/linssit/satelliitti-avaruus.js`
`varmistaKehykset`). Linssi lukee `renderer().info.render.frame` 300
ms:n välein 12 sekunnin ajan. Jos laskuri ei etene, vahti PAKOTTAA
piirron ajastimesta: `pallo.pauseAnimation()` tyhjentää kirjaston
kehyspyynnön ja `pallo.resumeAnimation()` ajaa piirtosyklin HETI
(`renderObjs.tick()` on synkroninen) ja pyytää uuden kehyksen. Sama
tikki piirtää sekä WebGL:n että CSS2D:n, joten pinta ja kohdepisteet
tulevat molemmat. Piilotetulla sivulla ei pakoteta — se olisi akun
tuhlausta.

**2. Pisteet asetetaan uudestaan, kunnes ne näkyvät**
(`js/linssit/satelliitti.js`). Halpa `querySelectorAll` 300 ms:n välein,
enintään yhdeksän kertaa; jos DOMissa ei ole yhtään
`.satelliitti-piste`, lista asetetaan uudestaan ja kehys pakotetaan.
Ajastimella eikä kehyspyynnöllä — kehykset olivat juuri se, mikä
puuttui. Loppuu itsestään heti kun pisteet ovat ruudulla.

**3. Vartija nimeää SYYN eikä seurausta.** `avauksenPuute` sai kentän
`kehyksia`, ja se tarkistetaan ENNEN pintaa ja pisteitä: ilman kehyksiä
kumpikaan ei VOI olla ruudulla. Pelaajan lause on nyt *"Laite ei
piirtänyt näkymästä yhtään kuvaa."* eikä *"Kohdepisteitä ei saatu
pallolle."* `null` (ei mitattavissa) ei ole puute.

### Toisinto korjauksen jälkeen, sama lavastus

```
alku lahde=8192x4096 kangas=4096x2048 ruutu=2539 kokoPallo=1 webkit=1
ladonta koko=4096x2048 ok=1 tapa=suodatin ms=1163
vartija puute=ei pisteita=64 vaiheet=0
blob kt=14805 ms=1206
pinta-mittaus kirkkaus=153 reliefi=1 varapolku=0
kehykset piirtoja=54 alussa=34 pakotettu=20
```

Pallo, reliefi ja 64 kohdepistettä ruudulla, ei ilmoitusta — vaikka
rAF ei kutsunut takaisin kertaakaan.

![Kehykset poikki, korjauksen jälkeen](kuvat/astro-webkit2-kehykset-poikki-20260917.jpg)

---

## 3. Vika 37 — miksi tekstuuri jäi mustaksi

### KORJAUS TÄHÄN LUKUUN (Mac-session mittaus 17.9.2026)

**Ensimmäinen analyysini tästä viasta oli VÄÄRÄ, ja se on sanottava
suoraan.** Päättelin 8k-ladonnan (33,5 Mpx, 48,5 Mt:n PNG, 134 Mt:n
tekstuuri) olevan syy, koska se on WebKitin rajojen yli ja koska
lavastamani "valehteleva kangas" tuotti täsmälleen omistajan kuvan.
Lavastus tuotti oikean OIREEN väärästä syystä.

Mac-sessio mittasi saman vian **oikealla WebKitillä** ja erotteli sen
(docs/raportit/viesti-fable-webkit-toisto-20260917.md luku 4;
Raamattu LISÄYS 13 kohta 37 TARKENNUS). Ratkaiseva havainto: **musta
syntyy myös 2048 × 1024 -ladonnalla.** Kangas ei siis ole syy.

### Juurisyy yhdellä kappaleella

Globe.gl 2.46.2:n oma `globeImageUrl`-käsittelijä (luin sen
vendor-niteestä sanatarkasti, `media.matkakirja.app/vendor/
globe.gl-2.46.2.min.js`) on tämä:

```js
globeImageUrl
  ? new TextureLoader().load(url, t => { n.map = t; n.color = null; n.needsUpdate = true })
  : !n.color && (n.color = new Color(0))
```

Kun osoite on **null**, kirjasto maalaa pohjapallon materiaalin
**mustaksi**. Linssin sulku tekee juuri sen: `pallo.globeImageUrl(
lahto.kuvaUrl ?? null)` — ja pelin lähtöarvo ON null, koska peli
piirtää laattamoottorilla. Mustaa ei vielä näy, koska laatat peittävät
pohjapallon. **Seuraavassa avauksessa** `globeTileEngineUrl(null)`
paljastaa pallon HETI, mutta oma tekstuuri saapuu asynkronisesti: jos
yksikin kehys ehtii väliin, sävyttimen `diffuse`-uniformi saa mustan —
ja kun tekstuuri lopulta saapuu, kirjasto asettaa `color = null`,
jolloin three.js ei enää kirjoita uniformia (nullista ei ole mitä
kopioida). Lopputulos on **musta × tekstuuri = musta pallo**, vaikka
kartta, valot, kangas ja osoite ovat kaikki kunnossa. Kilpajuoksu
selittää satunnaisuuden: WebKit lataa 2048 × 1024 -blobin ~200 ms:ssa ja
ehtii yleensä ensin (5/30 mustaa), Chromium headless on hitaampi
(1,3–2,5 s) ja **häviää aina (16/16)**. Codexin WebAppissa avaukset 1–2
eivät edenneet tekstuuriin lainkaan, ja kolmas osui tähän ansaan.
**Varmuusaste: korkea** — mekanismi on luettavissa kirjaston lähteestä
ja mitattu molemmilla moottoreilla.

Ja tämä selittää myös sen, miksi vartija päästi tilan läpi: se katsoi
osoitetta, kangasta, koteloa ja pisteitä — kaikkia kunnossa — muttei
**piirron tulosta**.

### Korjaus

**Ydin on yksi rivi kahdessa paikassa** (`valkaiseMateriaali`,
`js/linssit/satelliitti-avaruus.js`):

* **sulussa** heti `globeImageUrl(null)`-kutsun perään väri palautetaan
  avauksessa talteen otettuun lähtöarvoon (tai valkoiseen), jottei
  musta jää odottamaan seuraavaa avausta;
* **avauksessa** ennen oman tekstuurin asetusta sama valkaisu, jottei
  edellisten versioiden jättämä musta pure.

Mustaa **ei saa pois** `color.set()`illä eikä `needsUpdate`illa:
`color` on siinä vaiheessa `null`, jolla ei ole settiä. Materiaalille on
annettava **uusi Color-olio**. Color-luokan saa ilman globaalia
`THREE`:ä pohjapallon `specular`-olion konstruktorista (Mac-sessio
mittasi tämän toimivaksi; koodissa on lisäksi `globalThis.THREE`-haara
ja viimeisenä oljenkortena `setHex`).

**Vartija ja varapolku.** `pinnanKirkkaus` lukee pallon keskustan
piirtopuskurista `readPixels`illä heti oman `render()`-kutsun perään
samassa synkronisessa askeleessa (pelin kontekstissa ei ole
`preserveDrawingBuffer`ia, joten muu ei kelpaisi). Mustassa tilassa
luenta on `[0,0,0,255]`, ehjässä 60–70. Alle kynnyksen 12 varapolku
käynnistyy, ja se on **kaksivaiheinen** — tämän mittasin vasta
ajamalla:

1. **väri valkoiseksi** (`pinta-musta askel=1
   toimenpide=vari-valkoiseksi`), ja jos uusi mittaus on yhä musta,
2. **generoitu vyöhykepallo pinnalle** (`askel=2
   toimenpide=vyohykepallo`).

Aioin ensin korvata vanhan tekstuurivarapolun kokonaan värillä, koska
Mac-session juurisyy on väri. **Ajo osoitti sen liian kapeaksi:**
savukkeen "valehteleva kangas" -lavastuksessa tekstuuri on aidosti
tyhjä, eikä väri auta siihen mitään (mittaukset `[0, 0]`). Mustalla
pinnalla on siis kaksi eri syytä ja kaksi eri lääkettä — väri ei auta
tyhjään tekstuuriin eikä tekstuuri mustaan väriin — ja järjestys on
väri ensin, koska se on mitattu juurisyy. Molemmat todistavat itsensä
uudella mittauksella; jos kumpikaan ei auta, pelaaja saa lauseen
*"Maapallon pintakuva jäi mustaksi."*

**16 Mpx:n kangaskatto jää — mutta se EI ole tämän vian korjaus.**
Pidin sen varotoimena, koska pallo-musta-raportin ennuste iPad-vaakaan
on yhä voimassa (8192 × 4096 = 33,5 Mpx on kaksi kertaa iOS:n
kangaskatto) ja koska se pudottaa blobin 49 686 kt → 14 805 kt. Se on
oma parannuksensa, ei kohdan 37 ratkaisu, eikä sitä pidä raportoida
sellaisena.

## 4. Mitä uusi vaiheloki näyttää

`?pallodiag=1` sai neljä uutta riviä. Ne ovat se, mitä Codexin on
luettava Macilla:

| Rivi | Mitä se kertoo |
|---|---|
| `alku … kangas=4096x2048 … webkit=1` | ladontakangas ja selainperhe. `webkit=1` vahvistaa, että WebApp tunnistettiin; `kangas` ei saa koskaan olla yli 4096 × 2048. |
| `pinta-mittaus kirkkaus=N reliefi=1 varapolku=0` | pallon keskustan kirkkaus PIIRTOPUSKURISTA. Yli 20 = värillinen pinta; 0 = musta. |
| `pinta-musta toimenpide=vari-valkoiseksi kirkkaus=0` | musta pinta havaittiin ja materiaalin väri palautettiin. Tämän rivin PUUTTUMINEN ehjässä ajossa on yhtä tärkeä tieto. |
| `pistemittari kohteita=64 domissa=N kerros=M` | **kohtaa 36 varten.** `kohteita` = linssin data, `domissa` = tämän linssin pisteet DOMissa, `kerros` = KAIKKIEN laudan CSS2D-merkkien määrä. Jos `kerros=0`, merkkikerrosta ei ole lainkaan; jos `kerros` on iso mutta `domissa=0`, kerros on mutta linssin lista ei päätynyt siihen. |
| `kehykset piirtoja=N alussa=M pakotettu=K` | kehysvahdin loppuraportti 12 s:n jälkeen. `pakotettu=0` = laite antoi kehykset itse; `pakotettu>0` = laite ei antanut ja vahti pelasti tilanteen. |
| `pisteet-uusinta domissa=N yrityksia=K` | kohdepisteet jouduttiin asettamaan uudestaan. Ilmestyy vain, jos ensimmäinen asetus ei riittänyt. |

---

## 5. MAC-AJO-OHJE (omistajan Mac Studio / asennettu Safari WebApp)

Tämä on se osa, jota kontti ei voi tehdä. Kaksi tapaa; **A on
pakollinen, B on lisätodiste**.

### A. Asennettu WebApp, pelaajan oma polku

1. Julkaise haaran sisältö (tai aja peli paikallisesta puusta) ja avaa
   asennettu WebApp osoiteriviltä lipulla:
   **`?pallodiag=1`**. Sovelluksessa: *Näytä → Lataa sivu uudelleen
   lähteestä*, tai avaa peli kerran Safarissa lipulla ensin.
2. Varmista päivitysdialogista, että versio on tämän haaran versio.
3. Matkalaukku → Astronautin kamera → **Aktivoi**.
4. Lue ruudun vasemman alakulman musta lokilaatikko.

**Odotetut rivit, tässä järjestyksessä:**

```
kirjasto yritys=0 ok=1 ms=…
avaruus-alku kotelo=2539x1321 kangas=2539x1321 hukassa=0 itsenainen=1 dpr=1
alku lahde=8192x4096 kangas=4096x2048 ruutu=2539 kokoPallo=1 webkit=1
avaruus-pinta tekstuuri=1 tarkkuus=8k
vaihe nimi=avaruus ok=1 ms=…
vaihe nimi=pulu ok=1 ms=…
vaihe nimi=aanet ok=1 ms=…
vaihe nimi=linssiaani ok=1 ms=…
vaihe nimi=pisteet ok=1 ms=…
kuva px=8192x4096 ms=…
ladonta koko=4096x2048 ok=1 tapa=suodatin ms=…
vartija puute=ei pisteita=64 vaiheet=0
blob kt=14000…15000 ms=…
valmis syy=blob osoite=blob:https:// ms=…
pinta-mittaus kirkkaus=<yli 20> reliefi=1 varapolku=0
vartija puute=ei pisteita=64 vaiheet=0
kehykset piirtoja=… alussa=… pakotettu=0
```

**Viisi asiaa, jotka ratkaisevat:**

1. **`kangas=4096x2048` ja `webkit=1`** rivillä `alku`. Jos tässä lukee
   `8192x4096`, WebKit-tunnistus ei mennyt perille — kerro se, se on
   oma vikansa.
2. **`blob kt` on noin 14 800, ei 49 686.** Se on koko korjauksen a)
   mitta yhtenä lukuna.
3. **`pinta-mittaus kirkkaus=` yli 20 ja `varapolku=0`** — ja tämä on
   luettava **kolmesta peräkkäisestä avauksesta**, koska vika syntyy
   vasta toisesta (sulku maalaa materiaalin mustaksi, seuraava avaus
   perii sen). Jos näet rivin `pinta-musta
   toimenpide=vari-valkoiseksi`, vartija nappasi vian ja korjasi sen —
   mutta silloin valkaisu avauksessa tuli liian myöhään, ja se on
   kerrottava. Ota siitä kuva.
4. **`kehykset … pakotettu=`.** `pakotettu=0` tarkoittaa, että WebApp
   antoi kehykset itse (vika 36 ei uusiutunut). **`pakotettu>0`
   tarkoittaa, että vika 36 ON yhä laitteessa ja kehysvahti korjasi
   sen** — ja se on suoraa todistusaineistoa juurisyystä. Kumpi tahansa
   luku on hyvä tulos; kerro kumpi.
5. **Ruutu itse: pallo, maasto ja 64 vihreää pistettä**, eikä
   ilmoituslaatikkoa. Pisteiden pitää ilmestyä noin sekunnissa
   aktivoinnista (kontissa mitattu 11 s, mutta siellä SwiftShader
   piirtää 2–3 kehystä sekunnissa — Macilla kehykset ovat 60/s).

**Toista avaus kolme kertaa** (sulje linssi → matkalaukku → Aktivoi).
Tämä ei ole varovaisuutta vaan vian rakenne: **ensimmäinen avaus ei voi
näyttää vikaa lainkaan**, koska musta syntyy vasta sulussa. Codexin
kolmas avaus oli se, jossa pinta mustui.

**Lisäksi:** vie sovellus taustalle linssin ollessa auki, odota minuutti
ja palaa. Jos loki näyttää `kehykset … pakotettu>0` vasta tämän
jälkeen, tiedämme WebKitin kehyskadon syyn tarkasti.

### B. Oikea WebKit Playwrightilla (lisätodiste, ei korvaa A:ta)

Mac Studiolla, repon juuressa:

```sh
npx playwright install webkit
PLAYWRIGHT_BROWSERS_PATH=0 NODE_USE_ENV_PROXY=1 \
  node tools/savukkeet/savuke-astro-pallo.mjs NAKYMAT=vartija
```

Savuke ajaa Chromiumilla oletuksena; WebKit-ajoa varten vaihda
`chromium.launch` → `webkit.launch` savukkeen alusta (yksi rivi) ja aja
sama komento. Odotetut rivit ovat samat kuin A:ssa, ja neljä uutta
väitettä (`SAFARIN RAJAT`, `KEHYKSET POIKKI`, `MUSTA PINTA`,
`VASTAKOE`) ovat ne, joiden pitää olla vihreitä oikealla moottorilla.
**Tämä on nimenomaan se ajo, jota kontti ei voinut tehdä** — jos jokin
niistä on punainen WebKitissä, lavastukseni oli liian lempeä ja
juurisyy on syvemmällä.

---

## 6. Vartiot

### Yksikkötestit

`node --test tests/satelliitti-avaruus.test.mjs tests/satelliitti.test.mjs
tests/pallolinssit.test.mjs tests/pallo.test.mjs tests/pallolauta.test.mjs
tests/sw.test.mjs tests/dokumentit.test.mjs` — **224/224 läpi**
(kymmenen uutta tai uudistettua vartiota). Lopullisella koodilla ajettu
vielä erikseen `node --test tests/satelliitti-avaruus.test.mjs
tests/satelliitti.test.mjs` — **128/128 läpi**.

Uudet ja muutetut vartiot:

* **`valitseLadonta` ei koskaan ylitä 16 Mpx:ää.** Leveä ruutu (2 539)
  saa 4096 × 2048 eikä enää lähdekuvan omaa kokoa; WebKit-lippu ei voi
  löysätä kattoa; nimenomainenkaan `katto` ei voi ylittää
  pikselikattoa. *(Tämä on vanha vartio, joka vartioi invarianttia, joka
  muuttui TARKOITUKSELLA — siksi se on päivitetty eikä poistettu.)*
* **`webkitSelain`** tunnistaa Safarin ja iPhonen, EI Chromea (joka
  kantaa "Safari"-merkkijonoa omassa UA:ssaan), ja `navigator.standalone`
  riittää yksin. Puuttuva navigator ei kaada eikä arvaa.
* **`tyhjaKangas`**: läpinäkyvä ja musta hylätään kuten ennen; **uutta**
  on, että yksivärinen kirkas pinta hylätään ja lähes musta hylätään,
  vaikka yksi näyte ylittäisi kynnyksen. Oikea reliefi (meri + manner)
  kelpaa. "Ei voi tarkistaa → hyväksytään" on ennallaan.
* **Näytteet ulottuvat reunoihin** (lähdekoodivartio: vähintään 16
  näytettä ja näyte kummastakin päästä molempia akseleita).
* **`valkaiseMateriaali`** kirjoittaa UUDEN Color-olion, koska
  `color.set()` ei pure nulliin; se osaa nollatun värin, mustan värin ja
  lähtövärin palautuksen, eikä kaadu ilman materiaalia tai Color-luokkaa.
* **Lähdekoodivartio sulusta**: `globeImageUrl(lahto.kuvaUrl ?? null)`
  -kutsun perässä on `valkaiseMateriaali(materiaali, varinLahto)`,
  avauksessa valkaisu tulee ennen sitä, ja varapolku on **väri** eikä
  tekstuurin vaihto. Juuri tämä rivijärjestys on koko kohdan 37 korjaus.
* **`avauksenPuute`**: `kehykset` nimetään ENNEN pintaa ja pisteitä,
  koska se selittää molemmat; `pinta-musta` nimetään, kun osoite on
  paikallaan mutta mitattu kirkkaus alittaa kynnyksen; `null` (ei
  mitattavissa) ei ole puute kummassakaan. Jokaiselle puutteelle on
  pelaajan kielinen LAUSE (iso alkukirjain, piste lopussa), ei koodinimi.
* **`pinnanKirkkaus` PIIRTÄÄ.** Vartio tarkistaa, että mittaus kutsuu
  `renderer.render`iä — ilman omaa kehystä puskuri olisi jo vaihdettu ja
  mittari väittäisi mustaa aina. Mittaamattomissa oleva tilanne on
  `null` eikä nolla.
* **Kehysvahti pakottaa PARINA** (`pauseAnimation` + `resumeAnimation`),
  vain kun laskuri ei etene, ei koskaan piilotetulla sivulla, ja purku
  ottaa kellon pois.
* **Pisteiden uusinta** on ajastimella eikä kehyspyynnöllä, loppuu ennen
  vartijan aikakatkoa ja siivotaan purkaessa.

### Savukkeet

`tools/savukkeet/savuke-astro-pallo.mjs` sai neljä uutta väitesarjaa
omassa Mac-kotelossaan (2 539 × 1 321, dpr 1, WebKit-liput):

* **10. SAFARIN RAJAT** — ladontakangas ≤ 4096 × 2048 ja pinta
  värillinen, kun kangaskatto on 16,7 Mpx.
* **10b. KEHYKSET POIKKI** — rAF lakkaa kutsumasta takaisin
  aktivoinnissa: kohdepisteiden on silti tultava DOMiin, kehysvahdin on
  pakotettava piirto eikä pelaajalle saa jäädä ilmoitusta.
* **10c. MUSTA PINTA** — valehteleva kangas: mittauksen on nähtävä musta
  PIIRTOPUSKURISTA ja varapolun palautettava värillinen pinta. *(Tämä
  lavastus tuottaa oikean oireen väärästä syystä — se jää mittaamaan
  vartijaa ja varapolkua, ei kohdan 37 juurisyytä.)*
* **11. KOLME AVAUSTA PERÄKKÄIN** — kohdan 37 OIKEA koe: avaa, sulje,
  avaa, sulje, avaa, ja mittaa joka kerralla pallon keskipisteen
  kirkkaus sekä kuvakaappauksesta että piirtopuskurista, ja lisäksi
  materiaalin väri avausten välissä. Yksi avaus ei voi nähdä vikaa;
  kolme näkee. **Chromium toisti mustan 16/16 ilman korjausta, joten
  väite on itsessään vastakoe.**
* **10d/VASTAKOE** — ehjässä ajossa pisteet ovat DOMissa ajoissa ja
  PYSYVÄT pinnan vaihdon yli, mustaa pintaa ei havaita, varapolkua ei
  käytetä eikä kehyksiä tarvitse pakottaa. **Ilman vastakoetta yksikään
  yllä olevista mittareista ei voisi mennä punaiseksi.**

Ajot (lopullisella koodilla, eli kaksivaiheisen varapolun jälkeen):

* `savuke-astro-pallo NAKYMAT=vartija` — **26/26 läpi**. Kaikki neljä
  KOLME AVAUSTA -väitettä vihreinä: puskurista mitattu kirkkaus
  163 / 164 / 167, materiaalin väri `null` (= kirjasto ei ole maalannut
  mustaa) jokaisen avauksen välissä.
* `savuke-astro-pallo NAKYMAT=tyopoyta` — **62/63 läpi**, yksi punainen.
  **Ja tässä on oma virheeni, joka on syytä sanoa suoraan:** putkitin
  ajon lokin `tail`in läpi, joten punaisen väitteen NIMI ei tallentunut
  mihinkään. Ajoin saman sarjan heti uudestaan, ja siinä kaikki 59
  ensimmäistä väitettä olivat vihreitä (ajo katkaistiin KOLME AVAUSTA
  -kohtaan, jonka neljä väitettä olivat vihreitä edellisessä ajossa) —
  eli jokainen 63 väitteestä on ollut vihreä ainakin toisessa ajossa ja
  punainen on epävakaa. **En tiedä mikä se oli, enkä väitä tietäväni.**
  Ensimmäisessä erässä sama sarja meni 59/59. Mitatut luvut ajosta:
  reliefi 8k, ladonta 4096 × 2048, blob 14 805 kt (ennen 49 686 kt),
  pinnan mitattu kirkkaus 150–164, `kehykset … pakotettu=0`.
* `savuke-astro-pallo NAKYMAT=puhelin` ja
  `savuke-satelliittilinssi NAKYMAT=tyopoyta` — **37/37** ja **34/34
  läpi** ensimmäisen erän koodilla (ennen kaksivaiheista varapolkua).
  Puhelinajossa molemmat uudet mekanismit laukesivat oikeasti:
  `pisteet-uusinta domissa=64 yrityksia=2` ja `kehykset … pakotettu=1` —
  kontin SwiftShader on hitaimmillaan juuri se laite, jolle ne on tehty.
  **NÄITÄ KAHTA EI AJETTU UUDESTAAN** lopullisella koodilla: sinä
  käskit lopettaa savukeajot ja jättää loput Macille ja PR:n
  Savukkeet-työnkululle. Muutos niiden ja lopullisen koodin välillä on
  yksi: varapolku tekee ensin värin ja vasta sitten vyöhykepallon.

Yhteenveto rehellisesti: **159 savukeväitettä vihreänä, yksi
tunnistamaton punainen työpöytäsarjassa, kaksi sarjaa ajettu edellisellä
koodilla.** Pyydän PR:n Savukkeet-työnkulkua ajamaan koko sarjan
lopullisella koodilla — se nimeää punaisen, jos se toistuu.

---

## 6b. Mitä opin tästä erästä (ja mitä siitä seuraa)

Toimitin ensimmäisessä versiossa kohdan 37 juurisyyksi 8k-ladonnan
muistirajat. Se oli väärä. Lavastukseni tuotti omistajan kuvan
pikselilleen, ja pidin sitä todisteena — vaikka se todisti vain, että
*jokin* hiljainen kangasvika tuottaa saman oireen. Mac-session mittaus
oikealla WebKitillä erotteli asian minuuteissa: musta syntyi myös
2048 × 1024 -ladonnalla, eli kangas ei voinut olla syy.

Kaksi asiaa, jotka pidän tästä mielessä ja jotka kannattaa lukea myös
tulevien pilvisessioiden raporteista:

1. **Lavastuksen osuma ei ole juurisyy.** Kun oire toistuu, on vielä
   kysyttävä, tuottaako sama mekanismi kaikki havainnon yksityiskohdat —
   ja mitä muuta se ennustaa. Kohdan 37 kohdalla en kysynyt, ennustaako
   selitykseni myös sen, että vika tulee vasta KOLMANNELLA avauksella.
   Se oli Codexin havainnossa alusta asti, ja se osoittaa tilaan, ei
   kokoon.
2. **Kirjaston lähde on primäärilähde.** Mekanismi oli luettavissa
   `globe.gl-2.46.2.min.js`:stä yhtenä rivinä. Luin sen vasta Fablen
   osoitettua kohdan — ja siinä se oli, sanatarkasti.

Sama varaus koskee nyt kohtaa 36: minulla on lavastus, joka tuottaa
oireen, eikä mitään todistetta siitä, että WebApp tekee niin. Merkitsin
sen raporttiin varotoimeksi enkä korjaukseksi.

---

## 7. Yksi asia, joka jää sinulle päätettäväksi

**8k-kuvan valinta on nyt turhaa työtä leveällä ruudulla.**
`valitseReliefi` lataa yhä 2,9 Mt:n 8k-kuvan, kun CSS-leveys on ≥ 1024
— mutta ladonta piirtää sen 4096 × 2048 -kankaalle. Tarkkuutta se ei
enää tuo (kangas on kuvan 4k-version kokoinen), vain latausaikaa.

**En muuttanut `valitseReliefi`ä**, ja syy on tarkka: sama funktio
palvelee myös topografialinssiä (`js/linssit/topografia.js`), joka
piirtää kuvan kalvolle SELLAISENAAN eikä monikangasketjun kautta —
sille 8k on oikeasti terävämpi eikä sitä koske tämä vika. Valinnan
sitominen ladontakattoon on siis oma päätöksensä ja oma mittauksensa,
ja se koskee kahta linssiä. Kaksi vaihtoehtoa:

1. **Astronautin kamera pyytää 4k:ta aina** (yksi parametri
   `valitseReliefi`lle): säästää 2,1 Mt latausta joka avauksella,
   topografialinssi jatkaa 8k:lla. Suosittelen tätä.
2. **Ladontakatto nostetaan takaisin 8192:een ei-WebKitissä**: pitää
   Chromen terävyyden, mutta jättää eron kahden selaimen välille.
   Vaatii mitatun tuen ennen kuin sen voi tehdä.

Sen lisäksi: **jos Codexin Mac-ajo näyttää rivin `pinta-musta` vielä
4k-ladonnalla**, katto on pudotettava 2048 × 1024:ään WebKitissä. Se on
yhden vakion muutos (`LADONNAN_KATTO_WEBKIT`), ja koodi on jo
rakennettu niin, että se riittää.

---

## 8. Mitä ei koskettu

Raamattuun ei kirjoitettu, versionumeroa ei nostettu, PR:ää ei tehty,
`dist/`-kansiota ei luotu. Reliefin **valinta** (`valitseReliefi`, 8k vs.
4k), kytkimet `RELIEFIN_8K_KAYTOSSA` ja `RELIEFI_KOKO_PALLO`, kuvat
ämpärissä, kirjaston latausketju (`js/pallo.js` aikakatko ja uusinta),
vaihekääre, linssivirheen ulkoasu ja `sw.js` ovat ennallaan — uusia
moduuleja ei syntynyt, joten huoltokarttaan ei tarvinnut lisätä mitään.
Topografialinssiin ei koskettu.

Muutetut tiedostot:

```
js/linssit/reliefikuva.js              ladontakatto, webkitSelain
js/linssit/satelliitti-avaruus.js      pinnanKirkkaus, varmistaKehykset,
                                       tyhjaKangas, avauksenPuute, varapolku
js/linssit/satelliitti.js              pisteiden uusinta DOMiin asti
tests/satelliitti-avaruus.test.mjs     uudet ja päivitetyt vartiot
tests/satelliitti.test.mjs             pisteiden uusinnan vartio
tools/savukkeet/savuke-astro-pallo.mjs neljä uutta väitesarjaa
docs/raportit/viesti-fable-astro-webkit2-20260917.md  tämä raportti
docs/raportit/kuvat/astro-webkit2-*.jpg               kolme kuvaa
```

---

## 9. Kokonaiskesto

Noin 5 h 15 min yhtäjaksoista työtä kahdessa erässä: lukeminen ja
koeympäristön pystytys 40 min, vikojen toisintaminen ja epäilysten
karsinta (neljä lavastusta) 45 min, ensimmäinen korjaus 50 min, vartiot
ja savukkeet 25 min, ajot ja raportti 40 min — ja sen jälkeen toinen erä
(Macin mittauksen jälkeen): juurisyyn tarkistus kirjaston lähteestä,
värikorjaus, kaksivaiheinen varapolku, `pistemittari`, KOLME AVAUSTA
-väitesarja ja raportin oikaisu noin 1 h 55 min.

Savukeajot ovat kontissa hitaita — yksi `NAKYMAT=vartija` -kierros on
noin 11 minuuttia ja täysi työpöytäajo yli 10 minuuttia; niitä ajettiin
yhteensä yhdeksän. **Liikaa aikaa paloi ajojen odotteluun**, ja se on
syy siihen, että kaksi savukesarjaa jäi ajamatta uudestaan.
