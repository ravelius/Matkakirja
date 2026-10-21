# B Tekotavat: tekstit

*(Sisältökirjuri 21.10.2026, studiojako (omistaja 18.02, Raamattu 4.21). Käytännön vaiheet, faktantarkistus ja tyypilliset virheet kaikille tekstityypeille. Suunta (ääni, sävy, pituudet): `docs/tuotanto/suunta/kerronta.md`. Luvat, portit ja hyväksyjät: `docs/tuotanto/tuotannonohjaus.md`; niitä ei toisteta tässä. Koottu pohjista `kertojan-teksti-ja-aani.md`, `paakaupungin-avaus.md`, `kuumailmapallokierros.md`, `taidemuseon-maa.md`, `historiapeli.md`, `uusi-linssi.md` ja `tarinakaari.md`. Agentit vain Opus ja Sonnet.)*

## 1. Ennen kirjoittamista

1. **Tarkista, mitä on jo.** `node tools/loki-hae.mjs <aihe>` (ei grep lokia), aineistokansiot (`docs/kohtaukset/`) ja onko peli jo lukemassa tekstin itse (`KortinLukija` / `Puhe.Lue`). Älä kirjoita sitä, minkä pelaaja saa jo.
2. **Määritä tavoite.** Uusi tekstityyppi: 2–3 esimerkkiä pelinäkymässä ennen koko erää (Raamattu 4.21). Muu teksti: suunta `kerronta.md` määrää äänen ja pituuden.
3. **Aikaikkuna ja kieltolista** historialliselle tekstille: kirjaa ennen tutkimusta, mitkä asiat eivät ole vielä olemassa (anakronismit) ja mitkä ovat turvallisia.
4. **Kohteet tulevat muilta.** Karttaseppä antaa kohdelistan ja järjestyksen; kirjoittaja ei valitse eikä vaihda niitä.

## 2. Faktapohja

1. **Tutkimus ennen tekstiä.** Sonnet-tutkijat hakevat omat lähteensä; tulos tiedostoon (`docs/raportit/` tai `docs/kohtaukset/<kohde>/…-faktat.md`) merkintöineen.
2. **Kaksi itsenäistä lähdettä per väite.** Wikipedian kieliversiot ja saman julkaisijan sivut eivät ole riippumattomia. Yksi lähde: muotoile varovasti ("noin", haarukka, "kerrotaan") tai pudota.
3. **Merkinnät:** [V] kaksi lähdettä, [1L] yksi lähde, [EPÄVARMA], [LEGENDA] tai [FIKTIO], [EI LÖYDETTY], [EI PELIIN] (totta mutta ei sovi sävyyn: väkivalta, kurinpito). Pelitekstiin menevät vain faktat ilman [EPÄVARMA]-merkintää; [LEGENDA] vain sanottuna taruksi.
4. **Estetty sivu ei ole este.** Kun sivu antaa 403/404, ei kierretä: ota toinen lähde tai lataa vapaa PDF/kokoteksti ja lue se. Hakutuloksen tiivistelmä merkitään "hakutulos". Tekoälyn tuottamaa sivua ei käytetä todisteena.
5. **Tutkimus ei kopioidu sellaisenaan.** Yksi englanninkielinen matkasivu ei ole lähde kolmeen väitteeseen: tarkista museo- ja alkuperäiskielinen lähde (esimerkki: harjahahmojen selitykset 21.10. olivat yhden sivun varassa ja korjattiin museolähteisiin).
6. **Aineistoaukko kirjataan avoimesti**; analogia merkitään arvioksi. Totta ja FIKTIO erotetaan jokaisessa tarinassa.
7. **Ikä ja ajanlasku:** kiinalainen ikälaskenta (vuosi = 1 v) ei ole länsimainen; vuosiluvut gregoriaanisina; vuosi, johon fakta pätee, aina näkyviin.

## 3. Kirjoitus

1. **Puhtaalta pöydältä.** Vanhasta tekstistä vain raaka-aineet (faktat, beatit, persoonat), ei lauseita.
2. **Ääni ja pituus** suunnan mukaan (`kerronta.md`). Laske merkit tai sanat, kun kirjoitat, ei jälkikäteen.
3. **Pelaaja on sukupuoleton.** "Sinä"; englanniksi Fogg / you / they, ei he/she kohtauskuvauksessa, alt-tekstissä, kortissa tai vihjeessä. Tarkista suomi ja englanninnettavuus erikseen.
4. **Kysymykset** (visa, aarretehtävä): kysymys nousee kaupungin omasta kohtauksesta; oikea vastaus ei saa olla ainoa uskottava vaihtoehto, eikä oikea ole aina pisin; väärät eivät ole puolitosia; vastauksen sanatarkka rivi ei saa olla tekstissä. Tarkista kaupungin oma kulttuurivisa ennen hyväksyntää.
5. **Luvut sanoiksi** ennen merkkimäärän laskemista ja ääntä; "eaa." lauseen keskellä ja luvut 100–199 merkitään Äänittäjälle erikseen. Ääneen luettava teksti alkaa suomenkielisellä sanalla (Raamattu 5.4).
6. **Nimet:** Wikidata-nimi, kartan nimi ja vakiintunut suomalainen nimi voivat erota. Kirjaa, kumpi viedään; kerronta käyttää vakiintunutta suomalaista nimeä.
7. **Kuvat vain PD/CC**, katsottu silmin; `katsottu`-kenttä kuvaa sisällön omin sanoin; tekijämerkintä kuten Commons antaa (ei arvattua nimeä käyttäjänimen takaa).

## 4. Rekvisiitta- ja kokoelmatekstit (juoksupeli, Rata v4)

1. **Vain valmiille, pelissä toimivalle rekvisiitalle** (omistaja 21.10. klo 10.18, VAIN VALMIIT PALAT). Kysy ensin Pelikoodarilta ja Lavastajalta lista valmiista paloista ja nimetyistä paikoista; älä kirjoita ennakkoon.
2. **Muoto:** nimi enintään 24 merkkiä (nimetyn paikan nimi on koodin kiinteä), faktavirke enintään 110, ruutuun tulevat rivit enintään 60 eikä niissä ohjeita (ohjaus kuuluu UI-pohjiin).
3. **Avaimet:** `juoksupeli.<laji>.<id>.nimi` ja `.teksti` litteänä avainpakettina (`docs/raportit/juoksupeli-paikat-avaimet-20261021.json` on malli); lähde ja merkintä sivutiedostossa. Muistelma ainoana lähteenä kirjataan avoimesti.
4. **Kokoelma näkyy juoksun jälkeen**, ei juoksun aikana. Huudot ovat omat: rivin mukana näytetään uneksinnan sisältö ("Uni: …, teksti: dynastia + vuosi").

## 5. Itsetarkistus ja koneellinen tarkistus

- [ ] Kaksi lähdettä per väite; merkinnät; pudotetut ja ristiriidat kirjattu.
- [ ] Pituudet rajoissa (`kerronta.md` kohta 4); koneellinen tarkistus, jos työkalu on (esim. `oppaan-esittelyt/tyokalut/tarkista.mjs`: pituudet, kierros = kohteiden id:t samassa järjestyksessä, 5 kysymystä, 8 kohdetta).
- [ ] Vaara ja käänne aukeavat ensilukemalla; mikään ei paljasta visan vastausta.
- [ ] Sukupuoleton pelaaja; ei poliittista tai kiistanalaista lisää (lempinimet, rajat, patsaat).
- [ ] Kirjoittajan oma tarkistus ei riitä: riippumaton tarkistus on pakollinen (kohta 6).

## 6. Riippumaton tarkistus

1. **Eri agentti kuin kirjoittaja** (Sonnet tai Opus). Anna vain tekstit ja lähdelista, **ei perusteluja**, ja sano "oleta että jotain on pielessä".
2. **Omat haut ennen aineiston lukua.** Tarkistaja hakee itse ennen kuin avaa faktapohjaa.
3. **Raportti väitteittäin:** OK / KORJAA / EPÄVARMA, perustelu yhdellä virkkeellä, kaksi lähde-URL:ia OK-tuomiolle ja täsmällinen korvaava teksti KORJAA-tuomiolle.
4. **Korjaus tehdään varovaisemmaksi muotoiluksi, ei uudeksi väitteeksi.** Kaikki korjaukset viedään tekstiin, avainpakettiin ja faktapohjaan.
5. **Kokemus:** kirjoittajan oma tarkistus ei löydä kaikkea. Kiina 17.10.: 19 kertorivistä 7 vaati korjausta, 9 kortista 4. Juoksupeli 21.10.: 31 tekstistä 7 korjattiin. Ohita tämä vaihe vain, jos teksti on sanatarkka toisinto jo tarkistetusta.
6. **Kolme tarkistajaa isossa erässä** (esim. 19 vuotta tai 8 pysäkkiä + 8 historiaosiota): jaa osat, ei sama tarkistaja kaikille.

## 7. Tyypilliset virheet (tarkistajan lista)

1. **Yksi lähde tai ristiriitaiset lähteet esitetty varmana** ("yksi suurimmista", perustamisvuosi, uhriluvut, pituudet). Korjaus: "noin", haarukka, alaraja tai pois.
2. **Lähdettä vahvempi muotoilu** ("vain keisari" vs. "keisari ja poikkeukset"; "vartioi" vs. "kunniavartio"). Pehmennä lähteen sanaan.
3. **Lisätty syy-yhteys** ("X johtuu Y:stä", vaikka lähde ei sano).
4. **Anakronismi** (omena Savossa 1500, polkupyörä 1914, englanti 1914).
5. **Muistelma tai elokuva ≠ historia.** Merkitse "elokuva ≠ historia" tai tarkista toisesta lähteestä.
6. **FIKTIO esitetty faktana** (kätketty kalkki, hopea, komero). Merkitse tietokerroksessa.
7. **Pelin aikana opetetaan** (vuosilukuja, nimiluetteloita). Siirrä tietokerrokseen.
8. **Väkivalta tai verinen kuvaus.** [EI PELIIN] tai pehmennys.
9. **Sukupuolitettu viittaus pelaajaan** englanninnoksessa (he/she).
10. **Yliveto** ("valtaa Silkkitien ja Tarimin", "yksi suurimmista"): käytä lähteen sanaa tai "noin".
11. **Maantieto- ja kielivirheet** (Ypres ei ole Ranskassa; pituuspiiri ≠ pituusaste).
12. **Kysymys osuu kaupungin omaan visaan** tai oikea vastaus paljastuu pituudesta.
13. **Kuvateksti ja kertoja kertovat saman** tai historiaosio toistaa pysäkin kertomuksen.
14. **Korjaus äänen jälkeen** maksaa uusintaotoksen. Tarkista kaikki ennen ääntä.
15. **Pulun hyväksyttyä riviä muokattu.** Epäselvä viittaus kirjataan huomiona, ei korjata itse.

## 8. Luovutus

Raportti `docs/raportit/`: tiedostopolut, heikoimmat kohdat, pudotetut väitteet, huomiot kytkijöille. PT:lle viesti enintään 3 riviä (mitä, sha, polku). Retrospektiivi: opit tähän ohjeeseen ja suuntaan, kun uusi virhetyyppi löytyy.
