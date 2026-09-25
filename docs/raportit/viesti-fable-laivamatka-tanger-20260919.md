# Tangerin laivamatkan noppa-jumi — toisto, juurisyy, korjaus

**Erä:** TANGERIN LAIVAMATKAN NOPPA-JUMI
**Tekijä:** Opus-kehitysagentti, haara `claude/bold-ride-vow4ki-laivamatka-tanger`
**Aloitus:** 19.9.2026 klo 11.09 Suomen aikaa
**Lopetus:** 19.9.2026 klo 11.30 Suomen aikaa
**Lähtölöydös:** `docs/raportit/viesti-fable-ranska-testipeli-20260919.md`
löydös 2 (Sonnet-testaaja, iPhone 18 Pro -simulaattori, tuotanto v1949)

---

## 1. Toistuiko? Kyllä — ensimmäisellä yrityksellä, molemmilla selaimilla

Toistui **WebKitillä ja Chromiumilla** 390 x 844 -ruudulla paikallista
palvelinta vasten, täsmälleen raportoidulla polulla: Tanger → "Liiku" →
laiva-kuvake → "Laivalla (100 p)" → noppa ruudulle → napautus ei tee
mitään.

Mitattu tila jumissa (WebKit, ennen korjausta):

```
vaihe roll, tapa sea, busy false, data-busy ei
toimintorivin luokat:  "toimintorivi rivi-yksi"        ← ei liuku-auki
noppanapin pointer-events:  none
noppanapin säiliön opacity: 0
napautus napin keskipisteeseen osuu: CANVAS (karttapallo)
```

Napautus meni siis **nopan läpi karttapallolle**. Sama tila säilyi
sivun uudelleenlatauksen jälkeen (väite 3c vastakokeessa myös FAIL),
mikä vastaa raportin havaintoa *"sivun uudelleenlataus ei auttanut"*.

**Kertomuksen toisto** ("Voi että — Tanger!") on saman jumin toinen
puoli, ei eri vika: peli jäi vaiheeseen `roll` Tangeriin, `arrivalFact`
osoitti yhä Tangeriin, joten matkakirjakortti piirsi saman merkinnän
uudestaan joka kerta. Kun noppa saatiin toimimaan, toisto loppui
itsestään.

## 2. Juurisyy

`js/ui.js` `renderActions` piirtää vaiheessa `roll` noppanapin ja
"Vaihda matkustustapa" -napin funktiolla `piirraToimintorivi`, joka
latoo ne **monitoiminapin liukuun** (`.toimintorivi-liuku`). Liuku on
suljettuna `opacity: 0; pointer-events: none` (css/styles.css rivi
~20506) ja avautuu vain luokalla `liuku-auki`, jonka
`piirraToimintorivi` asettaa vain jos `this.liukuAuki` on tosi.

Vaiheeseen `roll` tultaessa `liukuAuki` on **aina epätosi**:

- liu'un oma napautuskuuntelija nollaa sen heti kun jokin matkanappi
  valitaan (`liuku.addEventListener('click', () => { this.liukuAuki = false; })`);
- laivalippu valitaan vieläpä kokonaan liu'un ulkopuolelta, vaiheen B
  listasta (`renderTravelChoice`), joka latoo nappinsa suoraan
  `#actions`-elementtiin.

Noppa siis **piirtyi DOM:iin mutta jäi näkymättömän, napautusta
läpäisemättömän liu'un sisään**. Fokusnäkymässä päälle tuli vielä
toinen kerros: `rivi-yksi` (`fokusLaattaTutkii()` on tosi myös
vaiheessa `roll`) asettaa `pointer-events: none` koko `#actions`-
laatikolle, ja ainoaksi napautettavaksi jää `.monitoimi-nappi` eli
Liiku.

**Miksi vika näkyi vain laivalla.** Liftaus (`doWalk`), bussi
(`doBus`) ja lento (`doFly`) tekevät valinnan JA heiton/siirron samassa
eleessä — peli ei jää vaiheeseen `roll` lainkaan. Laiva on ainoa
kulkutapa, joka valitsee tavan (`actionTravel('sea')`) ja jättää heiton
pelaajalle. Sama umpikuja odotti myös kahta muuta polkua, joita
testaaja ei osunut kokeilemaan:

- vuoron alussa esivalittu ainoa noppatapa (`game.beginTurn`
  `autoTravel`) kaupungissa, ja
- kesken reittiä pysähtynyt matka, jos automaattiheitto ei lähtenyt
  (`jatkaMatkaaItsestaan` epätosi).

Pelisäännöissä ei ollut mitään vikaa: Nodessa Tangerista lähtee
merikaari `tanger|dakar` (3 askelta, 100 p) ja `findMoves` antaa
jokaiselle silmäluvulle 1–6 lailliset siirrot.

## 3. Muutokset tiedostoittain

| Tiedosto | Muutos |
|---|---|
| `js/ui.js` | `renderActions`, vaiheen `roll` haara: yksi rivi `this.liukuAuki = true;` ennen `piirraToimintorivi`-kutsua, ja sen perusteluleipä (juurisyy, miksi vain laiva näytti vian, miksi muut kulkutavat eivät muutu). Vaiheessa `roll` rivin sisältö ON liuku, joten liuku on auki — muut vaiheet eivät tätä haaraa näe. |
| `tools/savukkeet/savuke-laivamatka-tanger.mjs` | UUSI kohdemittaus, 3 väitettä x 2 selainta. |

Mitään muuta ei muutettu. Liftaus, bussi, kyyhky ja lento kulkevat eri
haaran kautta eivätkä koske tähän riviin. Erillistä tallennuksen
palautusta ei tarvittu: kun vaihe `roll` on jälleen pelattava, myös
tallennuksesta ladattu `roll`-tila jatkuu oikein (väite 3).

## 4. Mittaustulokset

Savuke `tools/savukkeet/savuke-laivamatka-tanger.mjs`, 390 x 844,
ämpäri Noden route-välityksellä, enintään yksi selain kerrallaan.
Noppaa napautetaan **oikealla hiirieleellä** napin keskipisteeseen ja
osuma varmistetaan `elementFromPoint`-luvulla — `element.click()` olisi
mennyt läpi jumistakin ja mitannut väärää asiaa.

| Väite | WebKit | Chromium |
|---|---|---|
| 1. Laivalippu vie nopanheittoon ja toimintorivi elää | OK | OK |
| 2. Nopan napautus vie siirron eteenpäin alle 3 s | OK, **49 ms** | OK, **88 ms** |
| 3a. Uudelleenlataus merellä ei toista saapumiskertomusta | OK | OK |
| 3b. Nappula on yhä merellä (ei palannut satamaan) | OK | OK |
| 3c. Nopan napautus merellä vie eteenpäin alle 3 s | OK, **72 ms** | OK, **79 ms** |
| Ei sivuvirheitä (satamassa / merellä) | OK / OK | OK / OK |

**7/7 läpi kummallakin selaimella.** Yksi ajo per väite, ei uusintoja —
mikään väite ei häilynyt.

**Vastakoe.** Sama savuke korjausrivi kommentoituna, WebKit: **5/7**,
ja kaatuvat juuri väitteet 2 ja 3c samalla oireella kuin tuotannossa
(`noppanapin pointer-events: none`, säiliön `opacity: 0`, napautus osuu
karttapalloon tai Liiku-nappiin). Ero yhden rivin välillä on siis
mitattu molempiin suuntiin.

**Yksikkötestit.** `node --test tests/*.test.mjs` →
**# pass 3650, # fail 0, # skipped 13** (3663 testiä, 79,6 s).
Uutta yksikkötestiä ei lisätty: juurisyy ei ole pelin tilakone vaan
CSS-kerroksen ja DOM-ladonnan kohtaaminen, jota ei ole Nodessa
olemassa. Savuke on oikea vartio.

## 5. Sivulöydökset

### Löydös 1 (Lontoon "kiinteä viiden kohteen valikoima") ei ole bugi — eikä liikkumisvalikko

Mitattu Nodesta, Lontoo, £300 alkurahalla:

```
travelModes  land, bus, sea, fly, stay
bussi        Edinburgh, PARIISI (50 p)
laiva        Amsterdam, Dublin
lento        Madrid, Berliini, Tukholma
```

**Pariisiin pääsee Lontoosta yhdellä siirrolla** — bussilla 50 punnalla
tai liftaamalla (kaari `lontoo–pariisi`, maareitti). Raamatun oletus
"Pariisi yleensä tarjolla" pitää siis paikkansa.

Testaajan näkemä "Moskova, Istanbul, Ateena, Kairo, Tanger" ei ole
liikkumisvalikko vaan **aloituskaupungin valinta** (`phase:
'pickstart'`). Laudan `start: true` -kaupungit ovat: lontoo, istanbul,
ateena, moskova, tanger, kairo, kapkaupunki, dubai, tokio, peking,
singapore, mumbai, newyork, sanfrancisco, losangeles, buenosaires, rio,
sydney, perth — eli avausnäkymässä näkyvät Euroopan ja Afrikan viisi
muuta ovat täsmälleen testaajan lista. Hän **aloitti pelin Tangerista**,
ei matkustanut sinne Lontoosta.

**Tämä on silti käytettävyyshavainto:** aloitusvalinnan ruutu näyttää
kokeneenkin testaajan silmään liikkumisvalikolta, ja Lontoo jäi siinä
tulkituksi "nykyiseksi kaupungiksi". Fablen päätettäväksi, tarvitseeko
aloitusvalinta selvemmän otsikon tai erilaisen merkkien ulkoasun. Tämä
selittää myös, miksi kierros meni kokonaan matkustamiseen: Tangerista
Ranskaan on pitkä matka, kun Lontoosta olisi ollut yksi bussilippu.

### Löydös 8 (nappulan napautus vaihteli) on saman jumin oire

Jumissa pelaaja oli vaiheessa `roll` Tangerissa. Siinä tilassa sama
kosketusalue voi osua kolmeen eri asiaan: kaupungin laattaan
(fokusnäkymän `fokusLaattaTutkii` napautusalue — "Nähtävyydet /
Turistiopas"), matkakirjakorttiin (sama `arrivalFact` → sama teksti
uudestaan) tai läpäisevään liukuun (ei mitään). Kun noppa toimii, tästä
tilasta päästään pois normaalisti eikä samaa kosketusaluetta paineta
uudestaan ja uudestaan. **En tehnyt tähän erillistä muutosta** — jos
ilmiö näkyy vielä korjatussa versiossa, se kannattaa mitata omana
eränään, koska korjaus olisi laattaan ja korttiin, ei liukuun.

### Ehdotus erälle D (QA-oikotie)

Kannatan raportin ehdotusta: tässä erässä sama tarve ratkaistiin
kylvämällä pelitila `localStorage`-avaimeen `matkakirja-save-v1`
savukkeesta (`Game`-olio Nodessa → `toJSON`). Sama kaava toimisi
testausagentilla ilman koodimuutosta, jos se saisi ajaa pätkän JS:ää
konsolista — URL-parametria ei siis välttämättä tarvita.

---

Haara: `claude/bold-ride-vow4ki-laivamatka-tanger`
Ei PR:ää, ei versionostoa, ei Raamattu-muutoksia (ohjeen mukaan).
