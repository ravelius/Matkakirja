# Siirtymämusiikki ja pelin äänet — tuotanto-ohje

Sitovat linjaukset ovat Raamatussa (js/tyohuone-raamattu.js). Tämä
dokumentti kertoo, miten musiikkiraidat (siirtymät ja linssit) ja
ämpärissä asuvat ääniefektit tuotetaan ja viedään. Koodin kuvaus on
moduulien js/siirtymamusiikki.js ja js/tehosteet.js
otsikkokommenteissa.

## Siirtymämusiikki (omistaja 2.9.2026)

Kolme raitaa, yksi per kulkumuoto: `siirtyma-jalan-lyria.mp3`,
`siirtyma-laiva-lyria.mp3`, `siirtyma-lento-lyria.mp3` (pääte on
moottorin nimi, ks. Generointi).

| ominaisuus | vaatimus |
|---|---|
| kesto | 10–20 s; pisin siirto on n. 5,7 s, lyhin n. 1,4 s |
| looppi | saumaton äänitteessä itsessään (alku ja loppu samaan lepoon, ei häntää, ei hiljaisuutta) — peli ei ristihäivytä |
| taso | −33 LUFS, mittaus `node tools/mittaa-aanet.mjs` |
| formaatti | mp3, mono, 128 kbps, 44,1 kHz |
| luonne | jalan = kävelyn rytmi, kevyt ja etenevä; laiva = aallokon huojunta, hitaampi ja leveämpi; lento = ilmava ja liikkumaton, soi kabiiniäänen alla |
| ei tekstiä, ei laulua | instrumentaali |

Peli feidaa sisään 300 ms ja ulos 500 ms; voima jalan/laiva 0,11,
lento 0,06. Musiikki väistyy pöllön, kertojan ja lukijan alta.

## Linssien musiikki (omistaja 2.9.2026 ilta)

Omistajan tilaus: *"Generoi linssille oma musiikki"*. Aikajanalinssi
(js/aikajana.js + js/linssit/keksinnot.js) soittaa omaa raitaansa koko
ajon ajan. Raita on saman moduulin (js/siirtymamusiikki.js) laji siinä
missä siirtymätkin — koneisto, kaksi polkua, väistö ja puuttuvan
raidan sietäminen ovat samat — mutta mitat ovat toiset.

| ominaisuus | vaatimus |
|---|---|
| tiedosto | `linssi-keksinnot-lyria.mp3` (laji `keksinnot`) |
| kesto | 45–60 s; linssi kestää minuutteja (25 pysäkkiä), joten lyhyt kierto alkaisi kuulua silmukaksi |
| looppi | saumaton äänitteessä itsessään, kuten siirtymäraidoilla |
| taso ja formaatti | −33 LUFS; mp3, mono, 128 kbps, 44,1 kHz |
| luonne | pohjalla levossa olevan **sydämen syke** (n. 60 bpm, omistajan tarkennus 3.9.2026) ja sen päällä hillitty 1800-luvun kellokoneisto: tikitys, uteliaisuus ja odotus; akustinen (jouset, puupuhaltimet, kevyt vasarapiano tai cembalo) |
| ei | ei elektronista, ei laulua, ei tekstiä, ei liian tunnelmoivaa — kello ja filminauha liikkuvat musiikin päällä |

Peli feidaa sisään 600 ms ja ulos 800 ms (siirtymää rauhallisemmin:
linssi avataan kerran), voima 0,11, looppi päällä koko ajon ajan.
Musiikki alkaa, kun linssi käynnistyy (kamera-ajon kanssa, ennen
kelloa), **jatkuu tauon yli puoleen tasoon hiljennettynä** (napautus
kelloon tai korttiin) ja feidataan pois, kun linssi suljetaan tai
juttu avataan nähtävyyskorttina — kortin sulkeutuessa se palaa.
Kaari kertoo raidan kentässä `aikajana.musiikki`; ilman kenttää ajo
on hiljainen.

Generointi on sama työkalu: `--laji keksinnot`. Valinta `kaikki` EI
sisällä sitä (ks. alla).

## Linssitilan äänimaailma (omistaja 3.9.2026)

Omistajan tilaus: *"Kun linssitila menee päälle, niin kaikki muut
äänet saisi vaieta taustalta ja oma linssin generoitu musiikki saisi
alkaa toistua taustalla."*

| hetki | mitä tapahtuu |
|---|---|
| linssi käynnistyy | `hiljennaAmbienssi('linssi')` vie kaupunkiäänet, pohjavireen, visamusiikin ja radion alas yhdellä syyllä; `pysaytaLukija()` vaientaa kesken olevan luennan |
| linssin oma raita | alkaa samalla hetkellä eikä väisty omaa hiljennystään (js/siirtymamusiikki.js `lajinVaisto`) — pöllö, kertoja ja lukija vaimentavat sen yhä |
| vuosi vaihtuu | **kohahdus** ämpäristä (alla); jos varianttia ei ole, kellon oma syntetisoitu naksahdus (js/sound.js `vuosi`) |
| linssi suljetaan | `palautaAmbienssi('linssi')` samalla syyllä purussa |

## Ääniefektit: kohahdus (omistaja 3.9.2026)

Omistajan tilaus: *"se efektiääni vuodenvaihtuessa voisi olla joku
uuu-huudahdus, aivan kuin yleisö kohahtaisi, kun uusi hieno keksintö
saapuu maailmaan. Niitä vain pitäisi sitten generoida useampia
variantteja, jotta sama ääniefekti ei toistuisi peräjälkeen. Ne
voisivat kuitenkin olla aika lähellä toisiaan."*

| ominaisuus | vaatimus |
|---|---|
| tiedostot | `aanet/tehosteet/kohahdus-1.mp3` … `kohahdus-4.mp3` |
| kesto | n. 1,5 s (hyväksytään 1,0–2,4 s) |
| taso ja formaatti | −30 LUFS (3 dB musiikkia kovempi); mp3, mono, 128 kbps, 44,1 kHz |
| luonne | pienen 1800-luvun luentosalin yleisö, hillitty ihastunut "uuu"; ei aplodeja, ei puhetta, kuiva sisätila |
| variantit | neljä samasta promptista — *"aika lähellä toisiaan"*, ero mallin omasta satunnaisuudesta |
| päät | hiljaisuus leikattu pois, 30 ms häivytykset |

Peli (js/tehosteet.js) esilataa variantit `preload="metadata"`
-elementteinä, arpoo yhden eikä koskaan soita samaa kahdesti
peräkkäin, ei aloita uutta ennen kuin edellinen on soinut loppuun ja
kunnioittaa mykistystä ja taustatilaa. Voimakkuus on 0,35 ×
linssiraidan voima — omistaja: *"ei tarvitse nousta merkittävästi
taustamusiikin päälle"*.

```
node tools/generoi-tehosteet.mjs --laji kohahdus
node tools/generoi-tehosteet.mjs --laji kohahdus --maara 1 --ei-vientia
node tools/generoi-tehosteet.mjs --laji kohahdus --kuiva
```

| lippu | merkitys |
|---|---|
| `--laji kohahdus` | pakollinen (toistaiseksi ainoa laji) |
| `--maara N` | montako varianttia, 1–8 (oletus 4). **Jokainen on oma maksullinen kutsunsa.** |
| `--kuiva` | ei APIa eikä vientiä: tulostaa promptin ja ajaa ffmpeg-ketjun syntetisoidulla äänellä |
| `--ei-vientia` | generoi ja viimeistele, mutta jätä tiedostot levylle |

Rajapinta on ElevenLabsin **sound-generation**
(`POST /v1/sound-generation`, kentät `text`, `duration_seconds`,
`prompt_influence`) — eri kuin musiikin `/v1/music`. Ketju: kutsu per
variantti, hiljaisuus pois päistä (`silenceremove` molempiin suuntiin),
30 ms häivytykset, taso mitataan loudnormilla ja korjataan yhdellä
lineaarisella vahvistuksella −30 LUFSiin. Tiedostot kirjoitetaan
`media/tehosteet/`-kansioon (.gitignoressa) ja viedään ämpärin
`aanet/tehosteet/`-kansioon; raakatuotos jää `media/tehosteet-raaka/`.
Ajo: `.github/workflows/generoi-tehosteet.yml` (workflow_dispatch,
inputit `laji` ja `maara`, samat salaisuudet kuin musiikkiajolla).

## Vienti

1. Ensisijainen: raita ämpärin `aanet/`-kansioon (ei mediaa repoon,
   Raamatun "kaikki aina ämpäriin").
2. Vaihtoehto: `assets/audio/`-kansioon, jolloin
   `.github/workflows/vie-aanet.yml` vie sen ämpärin `audio/`-kansioon.
   Peli osaa molemmat polut.

Järjestys koskee **siirtymä- ja linssiraitoja**: juuri niille peli
kokeilee ensin `aanet/`-polkua. Musiikkipaletti kulkee aina kohdan 2
kautta, koska sen soittokohdat pyytävät `assets/audio/`-polkua eivätkä
kysy `aanet/`-kansiota lainkaan (ks. Generointi → Musiikkipaletti).

Puuttuva raita ei aiheuta virhettä: soitto lähtee optimistina ja 404
merkitsee lajin hiljaiseksi. Kehittäjävalikon rivi "siirtymämusiikki"
kertoo, mitkä raidat löytyvät; kytkin "varamusiikki" (oletus pois)
soittaa syntetisoidun kuvion vain, jos oikea raita puuttuu.

## Generointi

**KAIKKI MUSIIKKI LYRIALLA (omistajan linjaus 5.9.2026 illalla,
sanatarkasti: *"kaikki musiikki lyrialla"*).** Aiemmin samana päivänä
omistaja kuunteli ElevenLabs Musicin ja Lyria 3.5:n siirtymäraidat
rinnakkain ja valitsi Lyrian (*"ota lyra musiikit käyttöön peliin ja
poista vanha"*); iltalinjaus laajensi saman koko musiikkiin, myös
musiikkipalettiin. Molemmat työkalut ottavat siis
`--moottori lyria|eleven`, **oletus `lyria`**, ja jakavat saman
Lyria-haun moduulista `tools/lyria.mjs` (osoite, malli `lyria-3.5`,
kehotteen muoto, `-lyria`-pääte, avaimen luku `GOOGLE_API_KEY`).
ElevenLabs jää vertailumoottoriksi: sen raidat kirjoitetaan paljaalla
nimellä eivätkä ne soi pelissä.

### Siirtymä- ja linssiraidat

Työkalu `tools/generoi-siirtymamusiikki.mjs`. Lyrian raidat viedään päätteellä
`-lyria`, ja peli soittaa ne. Promptit ovat työkalussa
vakioina, yhteinen tyylilause kaikille lajeille.

```
node tools/generoi-siirtymamusiikki.mjs --laji kaikki
node tools/generoi-siirtymamusiikki.mjs --laji laiva --ei-vientia
node tools/generoi-siirtymamusiikki.mjs --laji keksinnot --kuiva
```

| lippu | merkitys |
|---|---|
| `--laji jalan\|laiva\|lento\|keksinnot\|kaikki` | pakollinen; `kaikki` = kolme **siirtymäraitaa**, ei linssiraitaa |
| `--kuiva` | ei API-kutsua eikä vientiä: tulostaa suunnitelman ja promptit ja ajaa koko ffmpeg-ketjun syntetisoidulla siniäänellä |
| `--ei-vientia` | generoi ja leikkaa, mutta jätä tiedosto vain levylle |

Ketju: mallilta tilataan 24 s (linssiraidalle 66 s), siitä leikataan
keskeltä looppi (jalan 12 s, laiva ja lento 16 s, keksinnöt 50 s) ja
sauma ommellaan ffmpegillä ristihäivytyksellä niin, että loopin loppu
jatkuu lähteessä sen alkuun. Taso mitataan loudnormilla ja korjataan yhdellä lineaarisella
vahvistuksella −33 LUFSiin — dynaaminen normalisointi rikkoisi juuri
tehdyn sauman. Valmis mp3 (mono, 128 kbps, 44,1 kHz) tarkistetaan:
kesto lajin rajoissa (siirtymät 10–20 s, linssi 45–60 s), taso ±1 LU
tavoitteesta, ei hiljaisuutta päissä (`silencedetect`). Kelvoton raita
jää viemättä.

Tiedostot kirjoitetaan `media/`-kansioon (.gitignoressa, tarkistetaan
ennen ensimmäistäkään maksullista kutsua) ja viedään sieltä ämpärin
`aanet/`-kansioon samalla `aws s3 cp` -komennolla kuin
`vie-aanet.yml`. Lopuksi ajo tulostaa julkiset osoitteet ja
HEAD-tarkistuksen. Raakatuotos jää talteen kansioon
`media/siirtymamusiikki-raaka/`, joten loopin voi leikata uudelleen
ilman uutta kutsua.

Ajo: `.github/workflows/generoi-siirtymamusiikki.yml`
(workflow_dispatch, input `laji`: `kaikki`, `jalan`, `laiva`, `lento`
tai `keksinnot`). Linssiraita pyydetään nimeltä, koska `kaikki` on
vain kolme siirtymäraitaa — näin valmiita raitoja ei generoida
vahingossa uudestaan, ja jokainen kutsu maksaa. Ajo asentaa ffmpegin,
ajaa ensin kuivan ajon, sitten oikean, eikä committoi repoon mitään. Ei
automaattista triggeriä: musiikki maksaa rahaa. Salaisuudet ovat
Actions-asetuksissa: `ELEVEN_API_KEY` ja neljä R2-salaisuutta.
API-avain vain ympäristömuuttujana, ei koskaan repoon eikä lokiin.

Koneellinen tarkistus ei kuule saumaa: raidat **kuunnellaan** ajon
jälkeen, ja loopin on kierrettävä ilman naksahdusta.
Leikkauslaskennan vartija on `tests/siirtymaraidat.test.mjs`.

### Musiikkipaletti

Neljä raitaa, jotka soivat muualla kuin siirtymissä:

| avain | tiedosto (Lyria) | mitä | looppi |
|---|---|---|---|
| `pohja` | `musa-pohja-lyria.mp3` | pohjavire ambienssin alla, 80 s | kyllä |
| `visa` | `musa-visa-2-lyria.mp3` | tietovisan tikittävä uteliaisuus, 45 s | kyllä |
| `aarre` | `musa-aarre-lyria.mp3` | tavallisen aarteen lämmin aihe, 10 s | ei |
| `paaaarre` | `musa-paaaarre-lyria.mp3` | sama aihe juhlavampana, 13 s | ei |

Aarre ja pääaarre ovat **pari**: sama sävelaihe kahdessa asussa. Jos
toinen generoidaan uusiksi, generoi molemmat — muuten sukulaisuus
katoaa. ElevenLabsilla samat nimet ilman `-lyria`-päätettä.

```
node tools/generoi-musiikki.mjs kaikki
node tools/generoi-musiikki.mjs pohja visa --kuiva
node tools/generoi-musiikki.mjs aarre paaaarre --moottori eleven
```

| lippu | merkitys |
|---|---|
| (paljas argumentti) | raitojen avaimet välilyönnein tai `kaikki` |
| `--moottori lyria\|eleven` | oletus `lyria` |
| `--kuiva` | ei API-kutsua: tulostaa kohdetiedostot, kestot ja promptit (myös `ELEVEN_KUIVA=1`) |

**Looppia EI leikata.** Siirtymäraidat ommellaan ffmpegillä
saumattomiksi; paletti ei kulje sen koneiston läpi, vaan mallin tuotos
menee levylle sellaisenaan. Syy on kolmiosainen: kaksi neljästä
raidasta ei ole looppi lainkaan (aarreaiheilla on alku ja loppu), kaksi
looppiraitaa soivat pelin hiljaisimmalla tasolla ja pyytävät sauman jo
promptissa, ja kelvottoman paletin raidan päättää kuuntelija PR:ssä
eikä mittari. Jos sauma joskus naksahtaa, oikea korjaus on ajaa raita
saman leikkurin läpi — ei rakentaa toista.

**Vienti kulkee repon kautta, ei suoraan ämpäriin.** Raita
kirjoitetaan `assets/audio/`-kansioon, ajo committoi sen haaralle
`claude/musiikki-<ajonumero>`, ja kun PR on mainissa,
`.github/workflows/vie-aanet.yml` vie tiedoston ämpärin
`audio/`-kansioon. Juuri sitä polkua peli hakee: `js/media.js`
`aaniUrl` kääntää `assets/audio/x.mp3` → `<ämpäri>/audio/x.mp3`.
Ämpärin `aanet/`-kansio olisi paletille umpikuja — yksikään paletin
soittokohta ei kysy sitä (toisin kuin siirtymäraidat, jotka kokeilevat
ensin `aanet/`).

Ajo: `.github/workflows/generoi-musiikki.yml` (workflow_dispatch,
inputit `raidat` ja `moottori`). Salaisuus on `GOOGLE_API_KEY`
(Lyria) tai `ELEVEN_API_KEY` (vertailu); avain vain
ympäristömuuttujana, ei koskaan repoon eikä lokiin. Vartija:
`tests/musiikkipaletti.test.mjs`.

### Pelin kytkin: `MUSIIKIN_PAATE`

Paletin neljä soittokohtaa — pohjavire (`js/ambience-stream.js`),
visamusiikki (`js/aani-ehdokkaat.js`) ja kaksi aarreaihetta
(`js/ui.js`) — sekä työhuoneen kuuntelulehti
(`js/tyohuone-musiikki.js`) rakentavat polkunsa apurilla `musaPolku`
(`js/media.js`). Apuri liittää tunnukseen vakion `MUSIIKIN_PAATE`,
joka on **`''`**, kunnes Lyrian raidat ovat ämpärissä.

> **Kun työnkulku `Generoi musiikki` on ajettu moottorilla `lyria`,
> PR on mergetty ja `HEAD` vastaa 200:lla osoitteisiin
> `<ämpäri>/audio/musa-pohja-lyria.mp3`, `…/musa-visa-2-lyria.mp3`,
> `…/musa-aarre-lyria.mp3` ja `…/musa-paaaarre-lyria.mp3`, käännä
> `js/media.js`: `MUSIIKIN_PAATE = '-lyria'`.** Se on yksi rivi ja
> kääntää kaikki neljä polkua sekä kuuntelulehden kerralla; paluu
> vanhaan on saman rivin vaihto takaisin.

Ennen kytkimen kääntämistä vanhat ElevenLabs-raidat soivat. Näin
paletti ei ehdi olla hetkeäkään hiljainen: puuttuva mp3 ei riko
äänipolkua, mutta hiljainen peli näyttää rikkinäiseltä.

## Kehittäjän voimakkuussäätimet (omistaja 3.9.2026)

Omistaja: *"kehittäjätilaan saisi hammasrattaan alle laittaa
äänenvoimakkuus säätimet taustaäänen ja taustamusiikin voimakkuuksille
(+/- arvot nykyisille arvoille)"*.

`js/kehittajan-voimat.js` pitää kahta kerrointa (`tausta`, `musiikki`),
oletus 1,0 = pelin nykyinen taso, askel 0,1, rajat 0,25–3,0, tallennus
localStorageen (`matkakirja-dev-voima-<laji>`). Hammasratasvalikon
(`#kehittaja-valikko`) kaksi riviä näyttävät arvon (`×1,0`) ja
säätävät sitä miinus- ja plusnapeilla. Kerroin kerrotaan päälle
ambienssin tasoon (`js/ambience-stream.js taso`) ja siirtymä- ja
linssiraitojen tasoon (`js/siirtymamusiikki.js raidanTaso`); molemmat
kuuntelevat muutosta ja liu'uttavat soivan äänen uuteen tasoon 200 ms:ssa.
Tavallisella pelaajalla kerroin on aina 1,0.

## Sarajevon äänimaisema (omistaja 3.9.2026)

Omistaja: *"sarajevon taustaäänimaisema pitää vaihtaa koska siinä
kilkattaa kokoajan kirkonkello"*. Aiempi äänite oli Pyhän Joosefin
kirkon kellot (aporee_72320_84455). Tilalla saman tallentajan (Haris
Sahačić, public domain) Ferhadija-kadun kävelykadun hälinä
(aporee_72317_84452, −31,3 LUFS → voima 0,82) ja Gazi Husrev-begin
moskeijan edustan suihkulähde (aporee_72314_84448, −33,9 LUFS → voima
1,11). Mittaukset `tools/aanitasot.json`.

## Jalankulkumusiikki soi nopanheittojen yli (omistaja 3.9.2026)

Omistaja: *"jalankulukumusiikki saisi olla rymikäs ja melkein laukkaava
rytmi ja se saisi soida myös välinopanheittojen ajan kunnes pelaaja
pääsee seuraavaan kaupunkiin"*. Raidan `jalan` prompti on uusittu
(laukkaava 1870-luvun matkasvengi, ei raskaita rumpuja; ajo workflow
`generoi-siirtymamusiikki` laji `jalan`). Pelissä `js/ui.js
animatePawnSisalla` ei enää sammuta jalan-raitaa siirron päättyessä, jos
pelaaja jäi reitin välipisteeseen (`player.pos.type === 'edge'`): raita
jatkaa seuraavan heiton ja siirron yli ja feidaa vasta kaupunkiin
saavuttaessa. Laiva ja lento sammuvat siirron päättyessä kuten ennen.

## Keksintölinssin luennat (omistaja 4.9.2026)

Omistaja: *"Generoi selostajan äänellä jokaiseen kohtaan vuosiluku,
keksijän nimi ja keksintö, eli se tulisi aina Keksinnön vaihtoessa
lukijan äänellä."*

**Teksti ja tiedostonimi tulevat datasta.** `js/linssipuhe.js` on
ainoa paikka, jossa molemmat ladotaan, ja sekä peli että
generointityökalu lukevat samat funktiot:

- `luennanTeksti(t)` → `"<vuosi>. <henkilö>. <keksintö>."`, esimerkiksi
  `"1769. James Watt. Höyrykoneen lauhdutin."` Kaksoispysäkillä
  henkilö on jo datassa yhtenä nimenä (*Montgolfier-veljekset*).
  Merkkipaalu 1873 luetaan ilman henkilöä: `"1873. Matkakirjan vuosi."`
- `luennanPuhe(t)` on sama teksti mallille: pisteiden kohdalla
  `<break time="0.4s" />` (eleven_v3 tukee break-tagia).
- `luennanRunko(t)` → tiedostorunko = **muotokuvan runko** eli pysäkin
  `kuva.osoite`-tiedostonimi ilman päätettä (`1769-james-watt`). Vuosi
  yksin ei kelpaa: kaaressa on kolme vuoden 1895 pysäkkiä (Marconi,
  Röntgen, Lumière). Kuvaton merkkipaalu saa rungon vuodesta ja
  otsikosta (`1873-matkakirjan-vuosi`).

Osoite on muotokuvien sisarkansio ämpärissä:
`aikajana/keksinnot/puhe/<runko>.mp3`.

**Pelissä.** `soitaLinssiluenta(ui, t)` kutsutaan yhdeltä riviltä
`js/aikajana.js`:n `sytyta(i)`:n lopussa — siis vain ELÄVÄSTÄ
syttymisestä. Pysäytetyn kellon selailu (`siirry(i)`, kortin tai lampun
napautus) ei lue ääneen. Kilahdus (`keksinnonAani`) soi ensin ja luenta
alkaa 350 ms sen jälkeen (`LUENNAN_VIIVE_MS`). `pura()` ja `alusta()`
kutsuvat `pysaytaLinssiluenta(ui)`.

Luenta noudattaa kertojan kytkintä (`js/luenta.js luentaKytkinPaalla`)
ja puheen voimakkuutta (`puheVoima`), ja `merkitsePuhuja` hoitaa
väistön: puhujalaskuri nostaa ambienssin väistön, ja koska väistö menee
myös ulkoisille väistäjille, **linssin oma raita hiljenee samalla**
(`js/siirtymamusiikki.js lajinVaisto` sivuuttaa vain oman
linssihiljennyksensä, ei puheen väistöä). Soitin on oma eikä
`playDiaryVoice`, koska tuo yrittää peilin pettäessä repon
`assets/audio`-varareittiä ja kutsuisi `peiliPetti('aanet')` — puuttuva
luenta kaataisi äänipeilin katkaisijan koko istunnoksi. Puuttuva
tiedosto (404) on hiljainen, ei virhe.

**Generointi.** `tools/generoi-linssiluennat.mjs`, sama resepti kuin
matkakirjaluennoilla (Viisas Kertoja, `eleven_v3`,
`/v1/text-to-dialogue`, mp3_44100_128, stability 0,5). Viimeistely
ffmpegillä: hiljaisuus pois molemmista päistä, 30 ms häivytykset,
taso **−17 LUFS** (mitattu 4.9.2026 ämpärin muista kertojaluennoista:
intro-puhe −17,1 · puhe-lento-alku −17,4 · puhe-fokus-matkakirja-lontoo
−17,1) yhtenä lineaarisena vahvistuksena, 150 ms hiljainen häntä, mono
44,1 kHz 128 kbit. Liput: `--kuiva` (tekstit ja kohteet, ei APIa),
`--pysakit 1769,1783` (tyhjä = kaikki 26), `--pakota` (ohittaa HEAD-
tarkistuksen, joka muuten jättää ämpärissä jo olevat generoimatta),
`--ei-vientia`.

Tuotos menee **vain ämpäriin**, ei repoon: työkalu kirjoittaa
`media/linssiluennat/`-kansioon (.gitignoressa, tarkistetaan ennen
ensimmäistäkään maksullista kutsua) ja vie tiedostot `aws s3 cp`
-komennolla. Ajo on `.github/workflows/generoi-linssiluennat.yml`
(workflow_dispatch, syötteet `pysakit` ja `kuiva`), salaisuudet
`ELEVEN_API_KEY` + neljä R2-salaisuutta. Vartija:
`tests/linssipuhe.test.mjs`.

## Tehosteketjut: Tuna (omistaja 5.9.2026)

Omistajan päätös kirjastokartoituksen
(docs/raportit/valmiit-palikat-2026-09-04.md) TOP 6:sta, sanatarkasti
*"Tee 2. Ensin"* → *"Sitten 5. Sitten 6. Ja 3."*: kohta 5 on Tuna 1.1.3
(MIT). `js/tehosteketju.js` lataa kirjaston laiskasti ämpärin
`vendor/tuna-1.1.3.js`-polusta (virhehaara: ääni kulkee suoraan) ja
rakentaa nimetyt ketjut `megafoni`, `radio`, `puhelin`, `luola` ja
`ulkoilma` (`tehosteketju(ctx, nimi, pääte)` → `{ input, output,
pura() }`, ristihäivytys 200 ms kumpaankin suuntaan). Kytkentä:
kohdekortti asettaa puhujan akustiikan (`asetaAkustiikka`; pakkien
`akustiikka: 'luola'` viidellä kohteella: Vjetrenica, Aggtelek, Turda,
Capri, Kappadokia) ja lukijaääni (`js/puhe.js luoPuheSoitin`) kysyy sen
palaa aikatauluttaessaan — Livian vastaus ja kertojan luenta kuuluvat
luolasta, kun luolan kortti on auki. Radion suora lähetys EI kulje
ketjun läpi (se ei kulje Web Audion läpi lainkaan, ks.
js/linssit/radio.js), eikä megafonille ole vielä kutsupaikkaa
(siirtomaalinssi). Kuuntelu: hammasratasvalikon *tehosteketjut*-nappi
soittaa testiäänen suoraan ja jokaisen ketjun läpi. Kirjasto säilyy
offline `sw.js`:n `VENDORCACHE`-korissa. Vartijat:
`tests/tehosteketju.test.mjs`, `tools/savukkeet/savuke-tehosteketju.mjs`.
