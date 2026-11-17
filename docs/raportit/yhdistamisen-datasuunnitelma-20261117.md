# Yhdistämisen datasuunnitelma: yksi paikka = yksi merkki (SK 17.11.2026, KK:lle)

Pohja: lista PR 6959 (`docs/raportit/yksi-paikka-yksi-kohde-kaksoiskategoriat-20261117.md`), omistajan hyväksyntä 09.43, KK:n päätökset L5 ja R3, Kaulanauha PR 6964. **Vain suunnitelma; data-PR tehdään vasta KK:n sanasta.**

Omistajan ehdot: (1) tarina + kohde yhdeksi merkiksi, (2) kadonnut + nykyinen yhdeksi merkiksi (aarteen tähti, kortissa molemmat hologrammeineen), (3) Kaulanauha oikeaan paikkaan. **Jokainen tarina pysyy omana lyhyenä tekstinään ja pitää oman kysymystehtävänsä; mitään ei liitetä peräkkäin yhdeksi pitkäksi tekstiksi.**

## 1. Miten yhdistäminen tehdään (ei teksti-, vaan merkkitasolla)

Tämä on luettu koodista, ei oletettu:

- Kohdekartan piste voi jo kantaa **useita nostoja**: `nosto` on merkkijono tai taulukko (`js/fokuskohteet.js` `kohdekartanNostopaikat`, `kohdeKaupunkikartanNostot`; `js/nahtavyydet.js`). Jokainen tunnus kartoittuu samaan pisteeseen, ja jokainen nosto elää omassa rivissään (`FOKUSVIRRAT.<kaupunki>.takynostot` / `takyt` tai `KULTTUURI_KATEGORIAT` hetket). Teksti, kuva ja kysymykset ovat noston omia, joten **yhdistäminen ei kosketa niihin**.
- Kysymykset kulkevat tunnuksella: takynostoilla ja syvennyksillä `kysymykset`, historian hetkillä `tehtava`. Tunnukset eivät muutu, joten **kysymystehtävät säilyvät sellaisinaan** (omistajan toive "kysymys tehtävä on hyvä säilyttää").
- Muutos datassa on siis kolme asiaa per rivi:
  1. pää­piste jää (kadonnut kohde > nähtävyys > tarinapaikka; sama järjestys kuin säännössä "tähti voittaa"), ja sen `nosto` muuttuu taulukoksi: `[kohteen oma nosto (jos on), tarina 1, tarina 2 …]`;
  2. toisen pisteen rivi poistuu `maakartat.js`:stä (`tarinapaikka`-merkki ja oma merkki pois);
  3. jos toinen piste oli **nähtävyys tai museo** (ei tarina), sen oma kortti (`NAHTAVYYSJUTUT.<kaupunki>.<nimi>`) säilyy ja liitetään pääpisteeseen uudella kentällä `liittyy: ['<nimi>']`.
- **Ei pitkää tekstiä:** kortti näyttää pääkohteen oman tekstin ennallaan ja sen alla **lyhyen rivin per liitetty tarina** (otsikko + nappi, samat kuin noston nappi/otsikko tänään) ja **rivin per nykyinen kohde** (nimi + kuva); kukin rivi avaa oman korttinsa omine kysymyksineen. Tekstejä ei kopioida eikä yhdistetä. Sama malli kuin lehden nostolista ("saman aiheen nostot yksi merkki, joka avautuu listaksi", kartan-merkit-ja-nimet 11).
- **Kadonnut + nykyinen (omistajan kohta 2):** pääpisteen tähti pysyy; nykyisen kohteen kortti (`liittyy`) tulee kadonneen kortin alle omana osionaan **omana hologrammipaikkanaan**. Se on käyttöliittymän työ (NUI/NS): data antaa vain `liittyy`-linkin. Nykyisillä kohteilla on valmis `NAHTAVYYSJUTUT`-teksti (ja äänityskorttinsa), joten **äänitysjono ei muutu**, kun avain säilyy.
- **Avoin tekninen kysymys NUI:lle/NS:lle:** (a) `liittyy`-kenttä on uusi (tuettava piirrossa, listassa ja `tools/vienti/lehdet.mjs`:ssä); (b) lukeeko kortti useita `nosto`-tunnuksia riviksi jo nyt? Koodista näkyy, että taulukko kartoitetaan pisteeseen, mutta en ole nähnyt ruudulla, miltä lista näyttää, kun taulukossa on kolme tunnusta (Tuileries'lla niitä on kaksi). Tämä pitää nähdä ennen data-PR:ää.

Tarkistettavaa data-PR:ssä: `tools/tarkista-nostopaikat.mjs` (napautettavuus), `tests/nosto-kysymykset.test.mjs` (kysymykset per nosto), karttaselite (kartan-merkit-ja-nimet 15), Pulun kysymysten `kohde:`-tunnukset (eivät muutu), `npm test` ja `node tools/aanitysjono/tarkista.mjs`.

## 2. Malli 1: Tuileries (puuttui listalta, lisätty tähän ensimmäiseksi)

Omistajan kysymys: "miksi listalta puuttuu Tuileries?" Syy: se oli jo yksi piste (`nosto: ['syvennys-pariisi-tuileriat', 'tuileries']`, `maakartat.js`), eikä koordinaattihaku löytänyt toista pistettä lähelle, joten se meni "mallitapaus"-taulukkoon eikä ehdotuslistalle. Se on kuitenkin juuri se rivi, josta tapa nähdään:

| | Tuileries'n palatsi (Pariisi) |
|---|---|
| Pääpiste | Tuileries'n palatsi (48,8622 / 2,3325), kadonnut, tähti |
| Nosto 1 (oma) | `tuileries` (fokuskohde, `fokuskohteet-fra.js`): palatsi 1564–1871, oma ihmekuva ja oma kysymysrivi |
| Nosto 2 (tarina) | `syvennys-pariisi-tuileriat` (`takyt` `tuileriat`, `fokusvirta-pariisi.js`): "Tuileries 1883 — palatsin rauniot puretaan", noin 1200 merkkiä, **2 omaa kysymystä** |
| Mitä muuttuu | **ei mitään datassa**; riittää, että kortti näyttää nosto 2:n omana lyhyenä rivinään eikä liitä sitä palatsin tekstiin |
| Tehtävä NUI:lle | varmistaa ruudulla, että kaksi nostoa näkyy kahtena rivinä; tämä on esikuva kaikille alla oleville riveille |

Työnjako on jo kirjattu: palatsi = mikä se oli ja miten poltettiin; syvennys = rauniot ja purku (kommentti `fokusvirta-pariisi.js` takyt 'tuileriat'). Sama työnjako on pohja jokaiselle rivinä alla: kohteen oma kortti kertoo kohteen, tarinakortti vain sen tarinan.

## 3. Rivit

Kuvaus: **pää** = piste, joka jää; **nosto →** = `nosto`-taulukko sen jälkeen; **pois** = piste, joka poistuu; **liittyy** = kortti, joka liitetään riviksi (ei tekstiyhdistelmää). Kysymysmäärät luettu datasta (takynosto 3, syvennys 2–0, hetki 1 `tehtava`).

### Kadonnut + tarina (omistajan kohta 1, hologrammi näkyy)

| # | Pää | nosto → | pois | Kysymykset |
|---|---|---|---|---|
| T1 | Tuileries'n palatsi | `[tuileries, syvennys-pariisi-tuileriat]` | – | 1 + 2 (malli) |
| B1 | Bastilji | `[bastilji, hetki-ranskan-vallankumous-bastilji-1789]` | Bastilji 1789 (sama koordinaatti, `tarinapaikka: false`, nosto vain erillisenä pisteenä) | oma + hetken `tehtava` |
| L2 | Euston Arch | `[hahmotelma-euston-arch, nosto-sahkotin-euston-1837]` | Sähkötin 1837 | 3 |
| W1 | Kärntnertor-teatteri | `[hahmotelma-karntnertor, hetki-beethoven-yhdeksas-1824]` | Beethoven 1824 | hetken `tehtava` |
| W2 | Vanha Burgtheater | `[hetki-mozart-wien-1786]` (pisteellä ei ole omaa nostoa) | Mozart 1786 | hetken `tehtava` |
| A2 | Vanha raatihuone | `[syvennys-amsterdam-haikarat]` | Kuninkaanpalatsi (kortti liittyy, ks. alla) | **haikarat: 0 kysymystä**, huomio |

### Kadonnut + nykyinen kohde (omistajan kohta 2, "aarteen tähti, kortissa molemmat hologrammeineen")

| # | Pää (tähti) | liittyy (nykyinen) | pois | Huom. |
|---|---|---|---|---|
| P1 | Palais d'Orsay | Orsayn taidemuseo | Orsayn taidemuseo -piste | museo seisoo palatsin paikalla |
| P2 | Palais de l'Industrie | Grand Palais | Grand Palais -piste | |
| L1 | Greenwichin palatsi | Old Royal Naval College | ORNC-piste | Queen's House ja Observatory jäävät omiksi |
| L3 | Vanha Westminsterin palatsi | Westminsterin palatsi | piste | Big Ben ja Abbey jäävät omiksi |
| L5 (KK) | Pyhän Paavalin katedraali (`st-paulin-katedraali`) | Old St Paul's (kortti ja ääni säilyvät) | Old St Paul's -piste | KK:n päätös: yksi merkki; fokuskohteessa on jo molemmat ihmekuvat |
| A2 | Vanha raatihuone (kadonnut) | Kuninkaanpalatsi | Kuninkaanpalatsi-piste | nosto `haikarat` siirtyy pääpisteelle (ks. ylempi taulukko) |

### Nähtävyys + tarina

| # | Pää | nosto → | pois | Kysymykset |
|---|---|---|---|---|
| P3 | Eiffel-torni | `[nosto-pariisin-72-nimea, hetki-eiffel-torni-1888, nosto-lustig-eiffel]` | Eiffel-torni 1888, Lustig 1925 | 3 + hetki + 3 |
| P4 | Palais Garnier | `[nosto-pariisi-soi]` | Piaf ja Django | 3 |
| L4 | Trafalgar Square | `[nosto-neljas-jalusta]` | Neljäs jalusta | 3 |
| R1 | Trevin suihkulähde | `[nosto-rooman-kolikko, nosto-aqua-virgo]` | Kolikko olan yli, Aqua Virgo | 3 + 3 |
| R2 | Colosseum | `[colosseum, nosto-colosseumin-kellari]` | Areenan kellari | oma + 3 |
| R3 (KK) | Vatikaanin palatsi | `[syvennys-rooma-vatikaani, hetki-michelangelo-sikstus-1510]` | Michelangelo 1510 | oma + hetken `tehtava` |
| W3 | Jättiratas | `[nosto-praterin-ratas]` | Praterin jättiratas | 3 |
| A1 | Rijksmuseum | `[nosto-amsterdamin-maitotytto]` | Maitotyttö | 3 |

Yhteensä pisteitä poistuu 20; yksikään tarinateksti, kuva tai kysymys ei poistu eikä lyhene.

## 4. Kaulanauha 1785 (omistajan kohta 3; KK 09.45: valinta A)

**Päätös:** Kaulanauha 1785 on Sainte-Chapelle-kohteen tarina, Panthéon-piste pois. KK:n lause tarinan loppuun: "Tuomio annettiin toukokuussa 1786 Pariisin parlamentissa Palais de la Cité'ssä, samassa kuninkaanpalatsissa, jonka kappeli Sainte-Chapelle on."

**Lähteet lauseelle (itse avatut, PR 6964 + tämä):**

| Väite | Lähteet | Taso |
|---|---|---|
| Parlamentti istui Palais de la Cité'ssä (Grand'Chambre) | en-Wikipedia "Parlement of Paris" ja Hérodote.net "Demeure royale et prison" | 2L |
| Tuomio toukokuussa 1786 | Château de Versailles, marie-antoinette.org, historyskills.com | 2L (3) |
| Sainte-Chapelle oli Palais de la Cité'n kappeli, samassa kuninkaanpalatsissa | en-Wikipedia "Sainte-Chapelle" ("part of the medieval Palais de la Cité, the main residence of the Kings of France until the 14th century"); cometoparis.com (Ludvig IX:n kappeli "within the grounds of the former royal palace on the Île de la Cité"; yläkappeli kuninkaalliselle perheelle, alakappeli palatsin väelle); snippetsofparis.com (yläkappeli vain kuninkaalle ja hovin ylhäisille, pääsy suoraan palatsin asunnosta) | 2L (Wikipedia + kaksi oppaan sivua; virallinen sainte-chapelle.fr ei antanut tekstiä, worldhistory.org ja ancient-history-sites.com palauttivat 403) |

Muotoilu: sana "kuninkaanpalatsi" on perusteltu, koska lähde sanoo palatsin olleen Ranskan kuninkaiden päämaja 1300-luvulle asti; parlamentti jäi palatsiin kuninkaiden muutettua pois, joten "samassa kuninkaanpalatsissa" pitää paikkansa vain rakennuksena, ei vuoden 1786 asuinpaikkana. Lause ei väitä muuta, joten se kelpaa.

**Löytö, joka vaikuttaa suunnitelmaan:** nosto `pariisin-vuosisadat` sisältää **kaksi eri tarinaa** (Kaulanauha + Vrain-Lucas), ja sen kolmesta kysymyksestä kaksi on Kaulanauhasta ja yksi (+ minikysymys) Vrain-Lucasista. Jos nosto siirretään sellaisenaan Sainte-Chapelleen, Vrain-Lucasin teksti seuraa mukana. Siksi:

- jaetaan nosto kahdeksi: `nosto-kaulanauha-1785` (lunastus 1, kysymykset 1 ja 2, loppuun KK:n lause) ja nykyinen `pariisin-vuosisadat` jää Vrain-Lucasille (lunastus 2, kysymys 3 ja minikysymys). Tekstit siirretään sanatarkasti, lisäys on vain KK:n lause;
- uusi nosto liitetään Sainte-Chapelle-pisteen `nosto`-taulukkoon, Panthéon-piste poistuu, ja Vrain-Lucasin oma piste (48,8573 / 2,3372) pysyy;
- ääni: uuden noston teksti saa äänitysrivit (lause on uutta tekstiä).

## 5. Mitä KK:n pitää päättää ennen data-PR:ää

1. `liittyy`-kentän käyttöönotto (NUI/NS) ja kortin riviasettelu: katso ruudulta Tuileries-malli ensin.
2. Nostojaon hyväksyntä (luku 4); paikka on jo päätetty (A).
3. A2: onko Kuninkaanpalatsin `haikarat`-nostolla 0 kysymystä tarkoituksella; omistaja haluaa kysymykset säilytettäviksi, joten puuttuva voi olla seuraava SK-työ.
4. Järjestys: yksi PR per kaupunki (Pariisi → Lontoo → Rooma → Wien → Amsterdam), jotta jokaisen voi katsoa kartalta; ensimmäisenä Pariisin Tuileries (ei datamuutosta), Bastilji ja Eiffel.
