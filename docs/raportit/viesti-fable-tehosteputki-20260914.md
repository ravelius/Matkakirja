# Viesti Fablelle: tehosteputki 14.9.2026 — raaka ämpäriin, koodaus 320 kbps

Opus-työagentti. Haara `claude/bold-ride-vow4ki-tehosteputki`, pohja
`origin/main` (`1da0c37b`). Ei yhtään ElevenLabs-kutsua, ei veloittavaa
työnkulkuajoa, ei R2-vientiä, ei mediatiedostoja repoon.

Jatkoa ääniputkiraportille `docs/raportit/viesti-fable-aaniputki-20260914.md`,
jossa Livian "digitaalinen häiriö" mitattiin. Omistajan päätös: sama sääntö
koskee kaikkia äänirooleja, ja tehosteiden koodaus nostetaan suositukseni
mukaisesti.

## Lyhyt vastaus

Tehosteputkessa oli **sama kaksoisvika** kuin Livian putkessa: raaka jäi vain
ajajan levylle, ja valmis tiedosto koodattiin toista kertaa 128 kbps:llä.
Molemmat on nyt korjattu — mutta **eri tavalla kuin Livialla**, koska
tehosteilla uudelleenkoodausta ei voi poistaa.

| | Livia (PR #2451) | Tehosteet (tämä PR) |
|---|---|---|
| raaka ämpäriin | pakollinen | **pakollinen** |
| uudelleenkoodaus | **poistettu kokonaan** | säilyy — normalisointi vaatii sen |
| koodauksen laatu | (ei koodausta) | 128 → **320 kbps** |
| normalisointi | poistettu (taso tulee mallilta) | **säilyy** −30 LUFS |
| lisätty virhe | **−∞ (bittitarkka)** | −25 dB → **−59 dB** |

## 1. Miksi tehosteilla normalisointi säilyy

Livian repliikit tulevat mallilta jo käyttökelpoisessa tasossa, ja niitä on
yksi per kaupunki. Tehosteet ovat toinen tapaus:

- **Lyhyet tehosteet tulevat mallilta eri tasoissa.** `sound-generation` ei lupaa
  vakiotasoa, ja neljä varianttia samasta promptista voivat erota toisistaan
  useita desibelejä. Peli arpoo niistä (`js/tehosteet.js`), joten tasoero
  kuuluisi suoraan: sama kohahdus olisi välillä kuuluva ja välillä ei.
- **Tasolla on sitova suhde musiikkiin.** Tehoste on −30 LUFS ja musiikki
  −33 LUFS (`tools/generoi-siirtymamusiikki.mjs`), eli tasan 3 dB musiikin
  yläpuolella. Omistajan tilaus 3.9.2026: tehosteen *"ei tarvitse nousta
  merkittävästi taustamusiikin päälle"*. Ilman normalisointia tuo 3 dB olisi
  arpapeliä.
- Normalisointi on jo nyt tehty oikein: **mitataan kerran, korjataan yhdellä
  lineaarisella vahvistuksella**. Dynaaminen loudnorm litistäisi kohahduksen
  nousun ja laskun, eli juuri sen mikä tekee siitä kohahduksen.

Siksi tehosteilla jää yksi uudelleenkoodaus. Ratkaisu ei ole poistaa sitä vaan
tehdä se **läpinäkyvästi**.

## 2. Miksi 320 kbps riittää — mitatut luvut

Ääniputkiraportin mittaus (yhdeksän mp3:a, Node-koodilla dekoodatusta PCM:stä,
koska ffmpeg ei ole kontissa) kertoo, paljonko **yksi ylimääräinen
mp3-sukupolvi** lisää virhettä signaaliin nähden:

| sukupolven bittinopeus | lisätty virhe |
|---|---|
| 128 kbps | **−25,1…−26,0 dB** |
| 320 kbps | **−58,6…−70,8 dB** |

Ero on **33–45 dB**. 128 kbps:n kaskadivirhe on juuri se, mitä omistaja kuuli
Livian äänissä; 320 kbps:llä se painuu kuulumattomiin. Kaskadin virhe määräytyy
ketjun **huonoimmasta** koodauksesta, joten pelkkä mallin puolen laadun nosto ei
olisi auttanut niin kauan kuin oma koodaus on 128 kbps.

**Koko kasvaa vähän:** tehosteet ovat 1,5 sekunnin mittaisia, joten variantti
kasvaa noin 24 kt:sta 60 kt:iin ja neljä varianttia yhteensä alle 0,25 Mt.

**Mallin oma ulostulomuoto jätettiin ennalleen** (`mp3_44100_128`). Tehosteet
tulevat `sound-generation`-rajapinnasta, jota omistajan Pro-päätös
(`mp3_44100_192`, Livia ja Horatio) ei koskenut; sen muuttaminen on oma
päätöksensä. Myöskään kuivan ajon **syntetisoitu** lähde ei muuttunut: se
jäljittelee mallin omaa 128 kbps tuotosta, ja jos sekin nostettaisiin, kuiva ajo
mittaisi eri ketjua kuin oikea ajo.

## 3. Raakatallennus

Sääntö (Raamattu: *ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA*): raakatuotos
viedään **aina** ämpäriin versionoituun avaimeen **ennen käsittelyä**, kuitti
kirjaa avaimen ja sha256:n, raakaa ei koskaan ylikirjoiteta, ja ajo joka ei
tallenna raakaa on virheellinen.

| vaihe | mitä |
|---|---|
| avain | `aanet/tehosteet/raaka/<erätunnus>/raaka-<nimi>.mp3` |
| ajoitus | heti API-kutsun jälkeen, **ennen** `viimeistele()`ä |
| varmistus | `HEAD` julkiseen osoitteeseen; muu kuin 200 **kaataa ajon** |
| kuitti | `aanet/tehosteet/kuitit/<erätunnus>.completed.json` |
| hylätty variantti | raaka on **silti** viety ja kirjattu kuittiin |
| kieltäytyminen | `--ei-vientia` pysäyttää ajon **ennen** ffmpeg-etsintää ja ennen ensimmäistäkään API-kutsua |
| avaimen turva | kelvoton erätunnus **hylätään**, ei siivota |

**Erätunnus** (`tuotantoEraId`) johdetaan reseptistä: sourceCommit, laji,
varianttien määrä, prompt, ulostulomuoto, `prompt_influence`, tasotavoite,
häivytys ja bittinopeus. Sama resepti antaa saman tunnuksen, eri resepti eri —
eli kaksi eri ajoa eivät voi kirjoittaa toistensa alkuperäisten päälle, ja saman
reseptin uusinta osuu tarkoituksella samaan kansioon.

**Kuitti oli kokonaan uusi.** Tehosteputkessa ei ollut minkäänlaista kuittia:
valmiit tiedostot menivät suoraan litteään `aanet/tehosteet/`-kansioon, eikä
mistään selvinnyt mikä raaka vastasi mitäkin valmista tehostetta. Uusi kuitti
kertoo per variantti: `rawObjectKey`, `finalObjectKey`, `status`, `reason`,
`rawArtifact` (sha256, tavut, kesto) ja `finalArtifact`.

Lähtötilanne oli, että raaka kirjoitettiin vain `media/tehosteet-raaka`-kansioon,
joka on `.gitignoren` `media/`-säännön alla ja katoaa Actions-ajon mukana.
Kommentti tiedostossa lupasi *"uuden leikkauksen voi tehdä ilmaiseksi"* — se
lupaus ei pitänyt paikkaansa kertaakaan Actions-ajon jälkeen.

## 4. Kuiva-ajo todisteeksi

ffmpeg **ei ole kontissa**, joten koko ketjua ei voi täällä ajaa. Siirsin siksi
suunnitelman tulostuksen **ffmpeg-tarkistuksen edelle** — pieni muutos, joka
tekee kuivasta ajosta luettavan myös ilman ffmpegiä ja jonka Actions-ajo saa
ilmaiseksi mukaan.

```
$ node tools/generoi-tehosteet.mjs --laji kohahdus --kuiva
ERÄ tehoste-4184641f0529acbe75fa (commit 1da0c37b2912)
  ulostulomuoto mallilta: mp3_44100_128
  viimeistelyn koodaus: 320 kbps (320 kbps omistajan päätös 14.9.2026:
    uudelleenkoodaus on tehosteilla pakko tehdä normalisoinnin takia,
    joten se tehdään läpinäkyvästi).
  taso -30 LUFS (±1) — normalisointi säilyy.
  raakatuotokset menevät avaimeen aanet/tehosteet/raaka/tehoste-4184641f0529acbe75fa/ :
    aanet/tehosteet/raaka/tehoste-4184641f0529acbe75fa/raaka-kohahdus-1.mp3
    aanet/tehosteet/raaka/tehoste-4184641f0529acbe75fa/raaka-kohahdus-2.mp3
    aanet/tehosteet/raaka/tehoste-4184641f0529acbe75fa/raaka-kohahdus-3.mp3
    aanet/tehosteet/raaka/tehoste-4184641f0529acbe75fa/raaka-kohahdus-4.mp3
  kuitti: aanet/tehosteet/kuitit/tehoste-4184641f0529acbe75fa.completed.json
  raakavienti on pakollinen: --ei-vientia kaataa maksullisen ajon.
ffmpeg puuttuu polusta — viimeistely tarvitsee sen.
```

Kieltäytyminen todennettu erikseen:

```
$ node tools/generoi-tehosteet.mjs --laji kohahdus --ei-vientia ; echo $?
maksullinen generointi ei ole sallittu ilman raakavientiä: --ei-vientia
jättäisi mallin alkuperäisen tuotoksen vain ajajan levylle. …
1
```

Työnkulku `generoi-tehosteet.yml` ei tarvinnut muutosta: se ei käytä
`--ei-vientia`, sen R2-salaisuudet ovat jo paikallaan ja sen "repoon ei jää
mitään" -vartija kattaa uuden `media/tehosteet-kuitit`-kansion `.gitignoren`
`media/`-säännön kautta. Tarkistin tiedoston `yaml.safe_load`illa
(`workflow_dispatch` näkyy).

## 5. Testit — uusi `tests/tehosteputki.test.mjs`, 12 vartiota

| vartio | mitä kaataa |
|---|---|
| kieltäytyy ilman raakavientiä | jos `--ei-vientia` pääsisi generoimaan |
| vienti päällä ja kuiva saavat jatkaa | jos portti olisi liian tiukka |
| **kielto ennen ffmpegiä ja ennen API-kutsuja** | jos kielto siirtyisi maksullisen kutsun jälkeen |
| raaka-avain eräkohtainen | jos kaksi erää voisi ylikirjoittaa toistensa raa'at |
| erätunnus deterministinen ja reseptiin sidottu | jos tunnus lakkaisi erottelemasta eri reseptejä |
| raaka viedään ennen viimeistelyä | jos vienti siirtyisi käsittelyn jälkeen |
| kuitissa raaka-avain ja sha256 per variantti | jos kuitti lakkaisi kertomasta mistä alkuperäinen löytyy |
| **myös hylätyn variantin raaka kirjataan** | jos hylkäys ohittaisi kuitin |
| viimeistely koodaa 320 kbps:llä | jos bittinopeus palaisi 128:aan |
| syntetisoitu kuivan ajon lähde pysyy 128 kbps:ssä | jos kuiva ajo alkaisi mitata eri ketjua kuin oikea ajo |
| **NORMALISOINTI SÄILYY** | jos tasonmittaus, korjaus tai tasoportti katoaisi 320 kbps:n mukana |
| kuitti kertoo koodauksen ja tason | jos kuitti kertoisi vanhoja arvoja |

Yhtäkään olemassa olevaa vartiota ei poistettu eikä muutettu — tehosteputkella ei
ollut ennestään omaa testiä lainkaan.

## 6. Portit

```
npm test                                → # pass 3363  # fail 0
node tools/tarkista-kaksoisavaimet.mjs  → ei kaksoisavaimia
node tools/tarkista-niputus.mjs         → 387 moduulia, 4221 julistusta, ei törmäyksiä
node tools/tarkista-savukkeet.mjs       → 1651 ui-viittausta, 405 metodia
python3 yaml.safe_load generoi-tehosteet.yml → jäsentyy, workflow_dispatch näkyy
```

## 7. Mitä seuraavaksi

**Vanhoja neljää kohahdusvarianttia ei tarvitse ajaa uusiksi** pelkän
bittinopeuden vuoksi: ne ovat pelissä −30 LUFS:ssa ja soivat vielä
`KOHAHDUS_VOIMA = 0,35` × linssiraidan voima -kertoimella, eli hyvin hiljaa
musiikin seassa. Muutos koskee seuraavia ajoja. Jos omistaja kuitenkin haluaa ne
uusiksi, se on **4 maksullista kutsua** — ja tästä eteenpäin niiden raaka jää
talteen, joten kolmatta kertaa ei tarvita.

**Sama puute on yhä muissa ääniputkissa** (`generoi-musiikki.mjs`,
`generoi-siirtymamusiikki.mjs`, `generoi-linssiluennat.mjs`, `generoi-kaari.mjs`,
`generoi-avaus.mjs`, `generoi-hihkaisut.mjs`, `generoi-kohtaamiset.mjs`). En
koskenut niihin: osa on muiden agenttien aluetta, ja musiikkiputkilla on oma
mutkansa — ne **ompelevat** tuotoksesta saumattoman loopin, joten raaka ja
valmis eivät ole sama ääni edes periaatteessa. Tämän PR:n kuvio (eräkohtainen
raaka-avain + kuitti + kieltäytyminen) sopii niihin sellaisenaan.

## 8. Mitä ei tehty

Ei ElevenLabs-kutsuja, ei veloittavia työnkulkuajoja, ei R2-vientiä, ei promptin,
lajin, `prompt_influence`-arvon, tasotavoitteen tai kestorajojen muutoksia, ei
pelin datan muutoksia, ei Raamattuun kirjoittamista, ei versionostoa, ei mergeä,
ei `dist/`-kansiota, ei mediatiedostoja repoon, ei avaimia lokiin. Ei koskettu
muihin ääniputkiin eikä `js/tehosteet.js`:ään.
