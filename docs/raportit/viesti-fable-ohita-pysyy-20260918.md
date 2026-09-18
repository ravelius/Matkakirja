# Viesti Fablelle: Ohita pysyy kunnes kumpikin luenta on loppu (18.9.2026)

Raamattu **KARTTAUUDISTUKSEN PAATOKSET 43 kohta 10** (omistaja 18.9.2026 klo
22.50, puhelintestin v1946 löydös 10), sanatarkasti:
*"Ohita nappi ei saisi havita vaikka pelaaja painaa jostain muualta ennen kuin
kumpikin luenta on loppu."*

Liittyvät osiot: PAATOKSET 35 kohdat 3 ja 6 (Ohita ja yksi pysäytys) sekä
PAATOKSET 38 (kuvat lentävät lappuun; raportti
`docs/raportit/viesti-fable-kuvat-lentavat-20260918.md`).

Haara: `claude/bold-ride-vow4ki-ohita-pysyy` (pohja
`claude/bold-ride-vow4ki-v1947`). Versiota EI nostettu. PR:ää ei avattu ohjeen
mukaan.

## 1. Juurisyy

Ohita oli ison kuvan päällyksen (`.fokusvirta-isokuva`) LAPSI, joten sen
elinkaari oli KUVAN elinkaari eikä LUENNAN. Päällys purkautuu kolmesta
tapahtumasta, joista yksikään ei ole luennan loppu:

1. kartan liike tai napautus — `kytkeSarjanKartanLiike` → `paataLuentakuvasarja`,
2. ankkuroidun paneelin pienennys — `pienennaLuentakuva`,
3. kuvien lento matkakirjalappuun (PAATOKSET 38, v1946) — sama kaksi kohtaa,
   mutta nyt päällys poistetaan HETI lennon lähdettyä.

Napautus karttaan, lappuun tai puluun vei siis Ohitan mukanaan, vaikka isoisän
ääni ja pulun luenta jatkoivat — eikä pelaajalla ollut enää mitään, mistä
pysäyttää. Kohdan 3 myötä (v1946) vika näkyi entistä selvemmin, koska päällys
lähtee nyt välittömästi eikä 700 ms:n häivytyksellä.

## 2. Mitä muuttui

### js/fokusvirta.js — Ohita irrotettiin omaksi kelluvaksi napiksi

Uusi osio `OHITA PYSYY KUNNES KUMPIKIN LUENTA ON LOPPU`:

- `naytaOhitaNappi(ui, city)` rakentaa napin omaksi solmukseen samaan kotiin
  (`isokuvanKoti()`, `.stage`) kuin päällys. Idempotentti: saman kaupungin
  toinen kutsu (pulun oma päällys, `aloitaMyohastynytPuluSarja`) palauttaa
  saman napin eikä nollaa vahtia.
- `piilotaOhitaNappi(ui, { heti })` poistaa napin. `heti` on pelaajan oma teko
  (Ohitan painallus, kaupungista lähtö) — luentojen luonnollinen loppu saa
  700 ms:n häivytyksen (`ISON_KUVAN_POISTUMA_MS`), ettei sana napsahda pois.
- `vahtiOhitanLoppua` on ainoa uusi kello. Sama kaksivaiheinen luku kuin
  sarjan omalla vahdilla (`vahtiLuennanLoppua`): 250 ms:n kysely
  (`SARJAN_LUENTAVAHTI_MS`), odotus luennan alkuun
  (`SARJAN_LUENNAN_ALKUKATTO_MS` 4 s — mykistys ja kertojatila 'ei' eivät saa
  jättää nappia roikkumaan), sitten hiljaisuuden mittaus. Varoventtiili
  `SARJAN_LUENNAN_KATTO_MS` (180 s).
- `pulunVuoroKesken(ui)` lukee kaksi OLEMASSA OLEVAA merkkiä: soiva repliikki
  `ui.liviaAani` (js/liviapuhe.js `soitaLivianAani`) ja pulun oma kuvasarja
  `ui.luentakuvasarja.puluAlkoi` (`aloitaPuluCamSarja`). Uutta rinnakkaista
  tilaa ei synny.
- Pulun osien välinen tauko ei ole loppu: hiljaisuuskatto on sama
  `PULUN_KUVAN_HILJAISUUSKATTO_MS` (1,5 s), jota `vahtiPulunLoppua` käyttää.

Kutsupaikat (neljä, kaikki olemassa olevia):

| Paikka | Mitä tekee |
| --- | --- |
| `avaaIsokuvaPaallys` | `naytaOhitaNappi` — sama hetki kuin ennen, mutta päällyksen JÄLKEEN ladottuna, jotta nappi jää kuvien päälle useamman päällyksen yli |
| `ohitaSaapumisluenta` | `piilotaOhitaNappi(heti)` heti ohituslipun jälkeen — ei jätetä vahdin varaan (vahti kysyisi vasta 250 ms:n päästä) |
| `vaiennaLivianKaupunkipuhe` | `piilotaOhitaNappi(heti)` — kaupungista lähtö on sen puheenvuoron loppu, jonka ajaksi nappi nousi |
| `kytkeSarjanKartanLiike` | poikkeusvalitsimeen `.fokusvirta-ohitanappi`: napin oma napautus ei ole kartan liike |

`piilotaLuentakuva`, `piilotaLuentakuvasarja` ja `paataLuentakuvasarja` EIVÄT
koske nappiin — juuri se on koko korjauksen idea.

### css/fokusvirta.css — sama kohta ruudulla, eri vanhempi

Uusi `.fokusvirta-ohitanappi` (nappi kantaa molemmat luokat, joten vanha
`.fokusvirta-isokuva-ohita`-ulkoasu ja kaikki olemassa olevat valitsimet
säilyvät sellaisenaan):

```css
.fokusvirta-ohitanappi { position: fixed; z-index: 3; opacity: 0;
  transition: opacity 700ms ease; }
.fokusvirta-ohitanappi.nakyy { opacity: 1; }
```

Vanha sääntö oli `position: absolute` + `bottom: max(9vh, 56px)` KOKO RUUDUN
kokoisessa päällyksessä (`.fokusvirta-isokuva`: `fixed; inset: 0`), joten sama
luku `position: fixed` -solmussa osuu pikselilleen samaan paikkaan. `z-index: 3`
on sama kuin päällyksellä: kartan päällä, matkakirjakortin (`.rail`, 4) alla.

**Miksi nappi jää samaan kohtaan eikä siirry lapun alle** (tehtävänannon
valinta, perustelu): mittaus näyttää, että nappi ei liikahda pikseliäkään, kun
kuvat lentävät sen ylitse lappuun (390 px: y 726 → 726; 1400 px: y 777 → 777).
Lapun alle siirtyvä nappi hyppäisi kesken luennan ruudun toiseen laitaan ja
pelaajan sormen alta — ja lappu on puhelimessa ruudun ylälaidassa, eli Ohita
päätyisi ylös samaan nurkkaan ylapalkin kanssa. Paikallaan pysyvä nappi on
myös se, jonka omistaja on jo hyväksynyt (PAATOKSET 35, v1934).

Reduced motion: `.fokusvirta-ohitanappi` lisättiin samaan
`prefers-reduced-motion: reduce` -sääntöön kuin päällys (500 ms), ja
`piilotaOhitaNappi` poistaa napin ilman häivytystä, kun `liikeVahennetty()`.

## 3. Mittaus

`tools/savukkeet/savuke-luentakuvat.mjs`, Pariisin saapuminen, PORTTI=8833,
Mac Studio, Chromium:

```
77/77 vartiota läpi   (ennen 53/53; +24 = 12 uutta x 2 ruutua)
```

Uudet vartiot 13–16 ajetaan MOLEMMILLA ruuduilla (390 x 844 ja 1400 x 900)
`mittaaPaatokset38`-funktiossa, koska siellä on jo oikea luenta
(`merkitsePuhuja` / `vapautaPuhuja`), avattu kortti ja kartta.

| # | Vartio | 390 px | 1400 px |
| --- | --- | --- | --- |
| 13 | Ohita on kelluva solmu, ei päällyksen lapsi | `kelluva:true, paallyksessa:false` | sama |
| 13 | Ohita näkyy luennan aikana | opacity 1, 72 x 42 px | opacity 1, 72 x 42 px |
| 14 | kartan OIKEA napautus (`s.mouse.click`) laukaisee lennon | lentoja 1 | lentoja 1 |
| 14 | Ohita on yhä DOMissa heti napautuksen jälkeen | kyllä | kyllä |
| 14 | kuvat todella lensivät pois (päällys purettu) | ruutuja 0, päällyksiä 0 | ruutuja 0, päällyksiä 0 |
| 14 | Ohita näkyy yhä, kun kuva on lentänyt lappuun | opacity 1, 72 x 42 px | opacity 1, 72 x 42 px |
| 14 | Ohita ei liikahtanut lennon aikana | y 726 → 726 | y 777 → 777 |
| 15 | Ohita poistuu, kun kumpikin luenta on loppu | `domissa:false` | `domissa:false` |
| 16 | kelluva Ohita pysäyttää luennan sekunnissa | kyllä | kyllä |
| 16 | kelluvan Ohitan jälkeen yksikään `<audio>` ei soi | 0/0 | 0/0 |
| 16 | kelluva Ohita poistuu itse painalluksesta | kyllä, isoja 0 | kyllä, isoja 0 |

Napautuspiste haetaan `elementFromPointilla`, jotta se osuu karttaan eikä
kaupunkimerkkiin tai kelluvaan nappiin — mittari raportoi pisteen (390 px:
31,231; 1400 px: 34,248), joten se ei mittaa tyhjää.

**Pysäytysketju (PAATOKSET 35 kohta 6) mitataan edelleen vahvana ensimmäisessä
kontekstissa** (vartiot 5 ja 5b, ennallaan vihreinä): siellä on `HTMLMediaElement.play`-
ja `AudioBufferSourceNode.start`-vakooja, viritetty saapumisketju ja 10 s:n
jälkitarkistus. Vartio 16 on sen kevyt toisinto uudessa rakenteessa —
`audioita: 0` tuossa kontekstissa, eli sen todistusvoima on nimenomaan siinä,
että *irrotetun* napin klikkaus yhä kulkee koko `ohitaSaapumisluenta`-ketjun
läpi (luenta pysähtyi, kuvat pois, nappi pois).

Kaappaukset katsottu: `ohita-pysyy-kartan-napautuksen-jalkeen.png` (kartan
napautuksen jälkeen kuvat ovat poissa, lappu on ylhäällä pienenä ja Ohita on
yhä paikallaan alhaalla) ja `luentakuva-paperi-ohita.png` (Ohita täsmälleen
entisessä kohdassaan kuvan ja kuvatekstin alla).

Muu kaava: `node --test tests/*.test.mjs` → **# pass 3628, # fail 0** (skipped
13); `node tools/build-standalone.mjs` → dist 32766 kt. Versiota ei nostettu.

## 4. Rajaus, jonka Fable päättää

**Kuuden sekunnin odotus pulun vuorolle.** Kun isoisän luenta päättyy eikä
pulu ala, nappi jää ruudulle `OHITAN_PULUN_ODOTUS_MS` = `ISON_KUVAN_LOPPU_MS`
= 6 s ja häipyy sitten. Luku on sama kuin isoisän kuvan omalla kellolla, ja
pulun kommentti nousee normaalisti 0,9 s tauon jälkeen
(`SAAPUMISKUPLAN_TAUKO_MS`), joten tavallinen kulku mahtuu reilusti.

Jos pulun vuoro alkaa vasta paljastussarjan tai linssin jälkeen (Venetsiassa
mitattu 12.9.2026: 9 s), nappi ehtii häipyä välissä ja palaa pulun oman
päällyksen mukana (`aloitaMyohastynytPuluSarja` → `avaaIsokuvaPaallys`) — sama
käytös kuin ennen tätä erää. En laajentanut odotusta `livianPaljastusKesken`-
lipulla, koska se on tosi myös pelaajalla, joka ei ole vielä KOSKAAN nähnyt
paljastusta: nappi jäisi silloin roikkumaan minuutiksi. Jos omistaja haluaa
Ohitan pysyvän myös tuon välin yli, se on oma pieni eränsä (rajattu kello
`SAAPUMISKUPLAN_PALJASTUSKATTO_MS`:n sisään).

## 5. Ei tehty (Kustannuskuri kohta 1)

- PAATOKSET 43 kohdat 7, 8, 9 ja 11 (pilvisumu, muiden maiden kaupungit,
  iPadin yläpalkki, saaton suunta) eivät kuuluneet tähän erään.
- `.fokusvirta-isokuva-ohita` -luokkanimeä ei vaihdettu, vaikka nappi ei enää
  asu isokuvassa: nimi on kahdessa savukkeessa
  (`savuke-luentakuvat.mjs`, `savuke-reittihelmet.mjs`) ja vaihto olisi ollut
  turhaa kohinaa. Nappi kantaa molemmat luokat, ja uusi
  `.fokusvirta-ohitanappi` kertoo rakenteen.
