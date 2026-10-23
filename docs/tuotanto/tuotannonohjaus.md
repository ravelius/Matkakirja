# Tuotannonohjaus (D): vaiheet, portit ja luvat

*(Päätoimittaja 21.10.2026, studiojako (Raamattu 4.21), osa D.)*

Tämä on ainoa paikka, jossa tuotannon vaiheet, portit ja luvat kerrotaan. Suunta (A), tekotavat (B) ja reseptit (C)
viittaavat tänne eivätkä toista lupia. Täysi sääntö on aina Raamatussa (`js/tyohuone-raamattu.js`, kohdan numero
suluissa); jos tämä ja Raamattu eroavat, Raamattu voittaa ja tämä korjataan.

Periaate on sama kuin ammattimaisessa peliyhtiössä: tavoite sovitaan ensin, sitten tehdään karkea pelattava versio,
sitten viimeistellään, tarkistetaan itse ja vasta lopuksi näytetään omistajalle. Kysymättä tehdään kaikki, mihin on
pysyvä lupa; omistajalle tuodaan vain uudet asiat, makuvalinnat ja maksulliset generoinnit.

## 1. Vaiheet: yksi putki kaikille tuotteille

Jokainen tuote (linssi, historiapeli, museo, avaus, pallokierros, 3D-maamerkki, video) kulkee samat seitsemän vaihetta
(omistaja 21.10.2026 klo 18.16; 4.21). Vaihetta ei ohiteta; pieni korjaus voi kulkea kevyesti. Omistaja hyväksyy idean
ja tavoitteen tekstinä korteilla sekä valmiin pelistä; kaiken muun hyväksyy PT.

| Vaihe | Mitä syntyy | Kuka tekee | Kuka hyväksyy |
|---|---|---|---|
| 1. Idea | Lyhyt kuvaus: mitä, kenelle, miksi | PT tai rooli | omistaja tekstinä kortilla |
| 2. Tavoite | Tavoite sellaisessa muodossa, että kaikki ymmärtävät sen samoin (taulukko alla) | tyypin rakentaja; kuvat Codex (7.15) | omistaja tekstinä kortilla |
| 3. Koeversio | Karkea pelattava versio ilman viimeistelyä; tuntuma, liike ja kulku kunnossa | Pelikoodari, Linssiseppä, Natiiviseppä alan mukaan | PT |
| 4. Tuotanto | Mallit, kuvat, valo, käyttöliittymä, tekstit ja äänet | Codex (kuvat, Tripo), Lavastaja, Valoseppä, Natiivi-UI, Sisältökirjuri, Äänittäjä (7.4) | PT |
| 5. Viimeistely | Tavoitetta vastaan hiottu kokonaisuus (tavoiteluuppi 7.20) | sama kuin tuotanto | PT |
| 6. Testaus | Oma tarkistus, sokkotarkistukset, automaatit, laitemittaus (tekotavat/testaus.md) | tekijä itse (9.5), Gemini, Laitetestaaja | PT; omistaja ei ole ensimmäinen tarkistaja (9.11) |
| 7. Juna | Työ avoimeen junaan; lukitus ja TestFlight omistajan pyynnöstä | Natiiviseppä (runko), Julkaisija | omistaja hyväksyy valmiin pelistä; julkaisun hän pyytää (10.2) |

**Tavoitteen muoto aloittain** (4.21 TAVOITTEEN MUOTO PUTKITTAIN; kirjataan jokaisen reseptin alkuun):

| Ala | Tavoite on |
|---|---|
| Grafiikka ja 3D | havainnekuva (Codex); tilaukseen aitousvaatimus: mikä on todellista, mikä saa olla tulkintaa |
| Äänet | mallinäyte ja lyhyt kuvaus siitä, miltä pitää kuulostaa (Gemini vertaa valmista sokkona) |
| Uudet tekstityypit | muutama esimerkki pelinäkymässä ennen koko erää |
| Kamera | viitevideo tai kuvakäsikirjoitus ennen koodausta |
| Käyttöliittymä | kuvakaappaus, johon muutos on piirretty |

Tavoite ja halvin hyvälaatuinen tie siihen mietitään kerran putken alussa, ei joka työssä uudelleen (4.21 KAKSI
MIETINTÄKIERROSTA). Grafiikassa tavoiteluuppi: kierros kerrallaan havainnekuvaa vastaan, pysähdys kun kaksi
kierrosta ei paranna tai kymmenen kierroksen jälkeen (7.20).

**Roolit lyhyesti** (7.4): PT päättää, jakaa erät, kuittaa ja vie junat, ei koodaa. KK on omistajan ainoa keskustelu-
kanava ja näyttää kortit. Codex tekee kaikki kuvat ja 3D-mallit; Claude tekee kaiken pelissä ajettavan ja tarkistaa
Codexin toimitukset täysikokoisina (7.15). Laitetestaaja pelaa yöjunan käännöksen (9.11).

## 2. Portit

Portti on kohta, josta työ ei jatku ennen kuin ehto täyttyy.

1. **Idea ja tavoite hyväksytty.** Omistaja hyväksyy idean ja tavoitteen tekstinä korteilla (4.21, 18.16). Kysymys
   omistajalle kulkee KK:n kautta (kohta 4).
2. **Koeversio hyväksytty.** Tuntuma ja kulku hyväksytään ennen grafiikkaa; näköisyyttä ei viimeistellä rikkinäisen
   pelattavuuden päälle (4.21).
3. **Valmiin määritelmä** (luku 8):
   - reseptin lopun tarkistuslista täyttyy ja opit on viety reseptiin tai tekotapaan; oppi, joka jää vain lokiin tai
     muistiin, ei ole kirjattu (8.1);
   - oletustavasta poiketaan vain PT:n luvalla, ja poikkeama kirjataan uudeksi tavaksi tai jätetään pois; työn lopussa
     lyhyt retrospektiivi: mikä toimi, mikä hidasti, mikä muuttuu ohjeessa (8.2);
   - erä: yksi erä = yksi haara, testit 0 fail, tulos tarkistettu itse pelistä, korjattu ja tarkistettu uudelleen,
     vika toistettu ennen korjausta, vanhat appit eivät rikkoudu, PT:lle yksi valmis-rivi (8.3);
   - sisältö: lisenssit kunnossa, media ämpärissä eikä repossa, puhe luvalla ja suomi pakotettuna, olemassa olevat
     UI-pohjat, kameraliikkeet yhteisellä kamerajärjestelmällä testeineen (8.4);
   - juna: lähti omistajan pyynnöstä, vain automaattiset testit ja käännös, TF sisäisillä testaajilla, rivi PT:lle ja
     KK:lle, junakortissa yksi Uutta-lista (8.5).
4. **PT:n hyväksyntä.** PT kuittaa yhden rivin perusteella (mitä muuttui, testit, commit); uudet näkymät, äänet ja
   sisällön PT tarkistaa itse täysikokoisina ennen KK:ta, ja vika palauttaa työn tekijälle (9.2, 9.5).
5. **Omistajalle vain hänen asiansa** (7.31, 7.27): päätökset, toimet, hyväksynnät ja valmiina näkyvät asiat.
   Kortti vain lyhyisiin valintoihin; tekstit ja äänet viestinä numeroituna listana tai tiedostoina, ei korttina.
   Yksi suositus, ei numeroparametreja eikä A/B-vertailuja. Yöllä PT jatkaa oletuksella.
6. **Junan lukitus** (luku 10): auki on yksi juna, ja kaikki kuitattu kerätään siihen; keskeneräinen ei pidätä junaa
   (10.2). Lukitus ja TestFlight vasta merkinnällä "OMISTAJA PYYSI JULKAISUA" (PT välittää, ehdollisessa pyynnössä
   "LUKITSE N"), enintään kaksi junaa päivässä (10.1, 10.2). Junaan vain automaattiset testit ja käännös (9.2, 9.3).
   Ennen päiväjunaa KK kysyy omistajalta, ajetaanko tarkistusajo; yöjunassa se ja laitekierros ajetaan aina (9.11).

## 3. Lupataulukko

"Pysyvä lupa" = tehdään kysymättä ja kerrotaan tarvittaessa jälkikäteen yhdellä rivillä. "Vaatii luvan" = omistajan
lupa KK:n kautta ennen työtä: muut asiat kortilla, äänet ja tekstit tekstinä (7.27 ÄÄNISTÄ EI KORTTEJA).

| Asia | Pysyvä lupa (ei kysytä) | Vaatii omistajan luvan (KK:n kautta) | Raamattu |
|---|---|---|---|
| Codexin kuvat ja havainnekuvat | tarpeen mukaan, ei määrä- eikä ottokorttia | – | 7.15, 12.24 |
| Tripo-mallit | Codex tekee tarpeen mukaan; hyväksytyt mallit saa ladata omistajan tililtä | tilin muut tiedostot; Clauden roolit eivät aja Tripoa itse | 7.15, 11.6, 12.24 |
| Musiikki (Lyria) | – | jokainen Lyria-kutsu; valmis tai vapaa kappale musiikiksi. Juoksupeliin ei nyt lisää musiikkia, nykyiset raidat myös muille tasoille (omistaja 21.10. klo 18.02) | 5.15 |
| Kertojaääni (ElevenLabs) | PT:n hyväksymät käsikirjoitukset jo hyväksytyllä lukijaäänellä, alle 3 % kuukauden kiintiöstä per ajo, yksi otto per teksti (omistaja 24.10. klo 02.12) | uusi lukijaääni tai yli 3 % | 5.1 |
| Hahmo- ja muut puheäänet (ElevenLabs) | jo hyväksytyllä äänellä, kun yksi ajo jää alle 3 %:n kuukauden krediiteistä; kulutus KK:lle jälkikäteen | yli 3 %:n ajo; uusi henkilö tai uusi ääni aina | 5.1, 5.2 |
| Ääni- ja tehosteet, äänimaisemat | Soundly Pro ja Sonniss ensin, Freesound alkuperäisinä aukkoihin | tekoälyllä tehty uusi ääni | 5.27, 5.20, 12.24 |
| Generointien ottomäärä | – (Tripo ja Codexin kuvat eivät kuulu tähän) | luvan ottomäärä sitoo kuten merkkimäärä; uusinta = uusi otto = uusi lupa, vaikka merkkejä jäisi | 5.2, 7.15 |
| Lataukset | CC0, CC BY, PD ja Commonsin CC BY-SA -kuvat; CC BY:stä tekijä LAHTEET.md:hen | NC-, ND- ja muu SA-aineisto ladataan vain omistajan päätöksellä (oletus: ei ladata) | 11.1, 11.5 |
| Ostot | maksettujen tilausten käyttö ei ole ostamista | uudet ostot kielletty toistaiseksi; ehdotuksia ei tuoda ennen kuin omistaja avaa asian | 11.5, 12.24 |
| Julkaisu ja TestFlight | vihreän PR:n kaavan askeleet avoimeen junaan | lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA" | 10.1, 10.2, 9.3 |
| Simulaattori ja laitteet | iso iPad aina; simu uudelle tekniikalle, pyydettyihin kuviin ja yöjunaan | iPad Pro 11 ja omistajan iPhone vain hänen pyynnöstään | 9.11 |
| CLAUDE.md, lupa-asetukset, avaimet, tunnukset | – | vain omistajan oma viesti roolin omassa ikkunassa; KK tai PT ei voi välittää | 7.1, 11.5, 12.5 |
| Poistot | oma checkout ja erä-worktree, valmiilla työkaluilla | oman työtilan ulkopuolelta ei poisteta lainkaan (yösiivous hoitaa) | 12.9 |

Raskaat ajot (testit, poltot, agentit) odottavat, kun omistaja käyttää Macia (12.13). Huomiselle merkittyä ei
aikaisteta, ei myöskään sen lupia (10.1).

## 4. Tarkista ennen kuin kysyt

Kokoaa reseptien entiset "Tarkista ennen" -osiot (omistaja 21.10. klo 17.31); reseptissä on vain tyypin omat rivit.

- AINA: onko asia jo päätetty: `node tools/loki-hae.mjs <hakusana>` ja Raamattu; jos on, toimi sen mukaan (7.27).
- AINA: työ alkaa reseptistä ja tavoitteesta; opit viedään reseptiin tai tekotapaan ennen valmista (4.21, 8.1).
- AINA: olemassa olevat UI-pohjat ja tyylikirja; puuttuva osa kysytään PT:ltä, ei omaa ratkaisua (4.1).
- AINA: kuvat ja 3D Codexilta, Claude koodaa ja tarkistaa toimitukset täysikokoisina (7.15).
- AINA: kuvat vain PD/CC, tekijä ja lisenssi näkyvissä; media ämpäriin, ei repoon (11.1, 5.14).
- AINA: maailma nykyajassa, vain estetiikka vanhaa; uutta työtä vain Euroopalle (1.10, 1.11).
- AINA: ääneen luettava teksti suomeksi pakotettuna ja suomenkielisellä sanalla alkaen; faktat riippumattomalla
  tarkistajalla ennen ääntä (5.4, 2.76).
- AINA: kameraliikkeet yhteisellä kamerajärjestelmällä, kameratesti ja ruutuaikavahti (4.24, 9.1).
- AINA: oma tulos tarkistetaan pelistä ennen PT:tä; vika toistetaan ennen korjausta (9.5, 9.7).
- EI: lupaa vaativaa ilman lupaa (taulukko yllä); ei uusintaa luvatta (5.2).
- EI: kysymystä ilman yhtä suositusta; kysymys vain KK:lle muodossa "KYSYMYS <tunnus>", työ jatkuu (7.27).
- AINA: kaikki omistajalle näkyvä suomeksi, ei selittämätöntä ammattikieltä (7.33). Pohja:
  `docs/moduulit/tuotantopohjat/kysymys-omistajalle.md`.

## 5. Viittaukset

- Laatutaso (A): `docs/tuotanto/suunta/<ala>.md` (taide, ääni, kerronta, kamera).
- Käytännön tekotapa (B): `docs/tuotanto/tekotavat/<ala>.md` (3D, kuvat, kamera ja video, tekstit, ääni, UI, koodi,
  testaus, julkaisu).
- Tuotetyypin kooste (C): `docs/tuotanto/reseptit/<tyyppi>.md`.
- Siirtymäaika: `docs/moduulit/tuotantopohjat/*.md` ovat voimassa, kunnes ne on siirretty resepteiksi ja tekotapoihin
  (4.21); junan tarkistusajo `tuotantoputken-tarkistukset.md`, Codexin 3D-tuonti `codex-3d-toimitus.md`.
- Omistaja D:lle: Päätoimittaja (4.21 TEKIJÄT). Muutokset tähän vain PT:n kautta.
