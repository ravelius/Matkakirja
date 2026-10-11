# e01 pääkaupunkilehtien lukutarkistus — raportti

Alku: 2026-10-11 01:41 UTC. Loppu: 2026-10-11 02:56 UTC.
Agenttiajot: 18 (Sonnet; 6 kaupunkia × lukuagentti L medium, kuvatekstiagentti K low, korjausagentti E low), ei Opusta. Tokenit yhteensä noin 2,41 milj. (L 1,29 milj., K 0,59 milj., E 0,53 milj.). Pääsession oma kulutus ei ole mukana.

Tarkistimen virheitä 0 kaikissa kahdeksassa kaupungissa (`tarkistus-kone.txt`, ajettu kaupungeittain `--verkko`, koska koko erän ajo kaatui Commonsin HTTP 429 -rajoitukseen).

## Yhteenveto

Rivi = yksi väiteryhmä `luvut.md`:ssä (sama luku usealla polulla on koottu yhdelle riville). Kuvatekstit: KORJATTU-rivit `kuvatekstit.md`:ssä, jotka E vei sisalto.json:iin. Minsk ja Podgorica: vain säärivin tarkistus.

| kaupunki | lukuja tarkistettu | OK | korjattu | pyöristetty | poistettu | laajuus nimetty | kuvatekstejä korjattu | kuvia vaihdettu | tarkistin virheet/varoitukset |
|---|---|---|---|---|---|---|---|---|---|
| zagreb | 109 | 64 | 4 | 30 | 11 | 3 | 2 | 0 | 0 / 1 |
| belgrad | 138 | 69 | 5 | 50 | 14 | 4 | 7 | 0 | 0 / 2 |
| tirana | 88 | 51 | 3 | 27 | 7 | 1 | 3 (+1 oma) | 0 | 0 / 7 |
| skopje | 120 | 56 | 12 | 38 | 14 | 3 | 0 | 0 | 0 / 2 |
| chisinau | 108 | 55 | 5 | 38 | 10 | 4 | 4 | 0 | 0 / 2 |
| bratislava | 100 | 61 | 5 | 28 | 6 | 3 | 5 | 0 | 0 / 0 |
| minsk | säärivi | – | – | – | – | – | – | – | 0 / 14 |
| podgorica | säärivi | – | – | – | – | – | – | – | 0 / 2 |

Rivit on laskettu ensisijaisen ratkaisun mukaan (yhdistelmäriveillä ensimmäinen). Kaikki kuvat katsottiin esikatselulla; yhtään kuvaa ei tarvinnut vaihtaa, joten `kuvat.md` ei muuttunut.

Säärivi: Minskin ja Podgorican `saatiedot` = `saa.json` (ilman `tausta`-kenttää) ja tekstien ilmastoluvut vastaavat sitä (vuosisateet: Minsk 686 mm → "noin 690", Podgorica 1 693 mm → "noin 1 700"). Muutoksia ei tehty. Muissa kuudessa kaupungissa L tarkisti saman; ainoat ristiriidat korjattiin: Chisinau `luonnehdinta` "noin 560 mm" → "noin 555 mm" ja oppaan "harvoin alle −10 astetta" → "tammikuun alin keskilämpötila on noin −4 astetta"; Skopjen `hyvaTietaa[1]` −13…39 °C korvattiin saatiedot-lukuihin sopivalla.

## Muutokset per kaupunki

Täysi lista (JSON-polku, väite, lähde 1, lähde 2, ratkaisu, sanatarkka korvaus) on tiedostoissa `<id>/luvut.md` ja kuvatekstit `<id>/kuvatekstit.md`; ennen → jälkeen -erot näkyvät myös gitin commit-historiassa (kaupunkikohtainen commit). Keskeisimmät:

**zagreb** — Vaijerihissin "suljettu, nykytila tarkistettava" → avattiin uudelleen 19.5.2026 (HRT, Hina, Croatia Week). Tuomiokirkon "pohjoinen torni purettiin" → pohjoisen tornin kärki poistettiin 17.4.2020 (Zagreb Holding, Croatia Week). Mirogojin arkadit: valmistuivat 1917, keskiosa 1929 (Zagreb Holding, absolute-croatia). Lentoasema 17 km → "noin 15 km" (lähteet 10–17). Poistettu yhden lähteen luvut: raitiovaunun 13 km/h, Lotrščakin kellon 1646, Taidepaviljongin 600 m² ja 700 näyttelyä, Tišovin katto 1911. Laajuus nimetty: Grad Zagreb 2025, 17 kaupunginosaa, Zrinjevac 12 540 m². Kuvat: kansikuva 1 (Alakaupunki, ei Yläkaupunki), Kansallisteatterin nosto (Elämän kaivo ei näy kuvassa).

**belgrad** — Vinča-kysymys (kysymykset[4]) korvattu kokonaan: "5300 eaa." ja "vanhempi kuin sumerit" koskevat vain kiistanalaisia Tărtăria-tauluja (EN Vinča script, DE Vinča). Pyhäinjäännösten poltto 1595 (EN/DE Church of Saint Sava), ei "1594 tai 1595". Metro 2028 → siirtynyt 2030 (n1info, seenews). Poistettu: kupolin 20 päivää (ristiriita 40 pv), 212 askelmaa, 16 jokisaarta, 37 suojeltua kohdetta ym. Laajuus: Grad Beograd 1 681 405 (2022), Kalemegdan, Suuri sotasaari, Ada Ciganlija. Kuvat: Zindan-portin selite kertoi legioonasta, jota kuvassa ei ole; Ada Ciganlijan lyhyt ilman vahvistamatonta padon sijaintia; "lähteen mukaan" pois kuudesta kuvatekstistä.

**tirana** — Laajuus: Tiranan kunta 598 176 (2023, INSTAT + citypopulation), ei "noin kolmannes kansasta" (kunta noin 25 %, prefektuuri 31,6 %). Lentoasema 11–17 km → noin 17 km (WV, ATG). Kellotornin valu 1838, päivämäärä ja halkaisija poistettu; kysymykset[3] kirjoitettu uusiksi. Poistettu yhden lähteen väitteet: pyramidin "kallein rakennus", aukion EU 2019 -palkinto, "Balkanin suurin jalankulkualue", Tate Modern, bulevardin vuosi 1930. Kuvat: bulevardi (vuosi pois), Snowfall (lyhyt mainitsee lumen), Kokonozin moskeija (näkyy vain taustalla); lisäksi kansi nosto 4 -kuvatekstin "Commonsin mukaan" -viittaus ja varmistamaton Lear 1848 -väite poistettu (selite: "Silta oli osa Tiranasta Debariin johtanutta vanhaa tietä.").

**skopje** — Jazz Festival 1981 → 1982 (festivaalin oma WP-artikkeli + matkaopas). Kozjak-pato 1994 → rakennus alkoi 1994, valmis 2004 (ESM, KHPP). Köysirata lähtee Keski-Vodnosta, ei keskustasta (WV, dmwc.org.mk). Dušanin kruunaus 1346 tapahtui Skopjessa, ei linnoituksessa (WP Serbian Empire). "Noin neljännes väestöstä" → "yli neljännes" (526 502 / 1 836 713 = 28,7 %, 2021). Laajuus: Grad Skopje 2021, pinta-ala 571,46 km² samaa aluetta; Wikidatan 422 540 ei vastaa SSO:n rajausta, ei käytetty. Poistettu: Kivisillan räjähteet 1944, linnoituskaivaukset 2006–07, JSP 1948 ym. "Suomenkielinen Wikipedia" -maininta lukijan tekstistä pois (kaupunkilehti[1].nostot[2]). Kuvat: kaikki 23 OK.

**chisinau** — kysymykset[4] (rautatie 1873) korvattu Tiraspol 1871 -kysymyksellä (neljä eri vaihtoehtoa, oikea 0). Nostot[0]: vuosi 1436 ja Tapani III:n lahjoitus erotettu. Ruusulaakson 9 ha oli järvien ala, ei puiston. Katedraalin "kuusi doorilaista pylvästä" → sisäänkäynnin portiikit. Ciuflean Anastasen kuolinvuosi 1870 (EN, VC). Riemukaaren ja kellotornin vuodet pyöristetty (visit.chisinau.md vs EN ristiriidassa); Nähtävyydet-aikakentät: Riemukaari "1840-luku", Kaupungintalo "noin 1901". Poistettu: "Venäjän viidenneksi suurin 1856", Valea Morilorin 2,5 km, englantia puhuu 30 %, Moldovan ainoa lentoasema ym. Laajuus: kunta 720 128 (2024), kaupunki 1862/1900, puisto 7 ha. Kuvat: Măzărache (kuvassa vain portti), katedraali (sisäkuva), keskustori (ei juustohalleja).

**bratislava** — Kruunun jäljennös asetettiin 1846 (ei 1847), huippu paloi 1833 (ei 1835), Donnerin patsas 1734 (ei 1744), uudelleengotisointi 1865–1877. Redutan "valmistui 1773" → nykyinen rakennus 1913–1919 (sk/de Reduta). Sinisen kirkon "1908–1913" → "rakennettiin 1900-luvun alussa, valmistui 1913" (aika-kenttä "1900-luvun alku–1913"). Hviezdoslavin aukio: "teatterirakennusta ei ollut 1873" oli väärin, Csákyn teatteri 1776–1884 (de SND). Linja 61:n tyyppi (johdinauto/bussi) poistettu. Poistettu: Hummelin patsas Grassalkovichin puistossa (siirretty 2002), 1842 pankki, 150 kg kruunu, joulutorin sata kojua, Barbaran kappelin 1769 ym. Laajuus: Bratislavan kaupunki (piirit I–V). Kuvat: valokuva (Tonavaa ei näy), Starý most, Slavín, Pálffyn palatsin laatta, Reduta.

**minsk, podgorica** — vain säärivi, ei muutoksia (ks. yllä).

## Korjaamatta jätetyt varoitukset

- **Lisenssimerkintä** (belgrad 2 kpl "CC BY-SA 3.0" vs Commons "CC BY-SA 3.0 rs"; tirana 3 kpl "CC BY 3.0" vs "CC BY 3.0 pl"): E:n mukaan Belgradin `kuvat.md` kirjaa muodon tietoisena; ei ole luku- tai kuvatekstivirhe. Päätoimittajan päätettävä.
- **Tekstin pituus alle/yli 440–660 mrk** (chisinau kansi nosto 1 ja 2: 439 ja 418; skopje kuvataiteen nosto 4: 429 mrk ja intro 1 129 mrk; tirana nykytaiteen nostot 1–3; minsk intro 1 129, nostot 4 kpl): pidentäminen vaatisi uusia lähdettyjä faktoja, tämä erä on vain tarkistus. Lyhyitä ei paisutettu täytteellä.
- **Pyöreät luvut** (minsk 7 kpl: 30 000, 40 000, 50 000, 300 000; podgorica 10 000 ja Millennium-sillan suuruusluokka; tirana "yli miljoona kirjaa"; skopje "noin 30 000"): Minsk ja Podgorica ohjeen mukaan koskemattomia (Sisältökirjuri on käsitellyt). Tiranan "yli miljoona kirjaa" ja Skopjen "noin 30 000" L arvioi OK:ksi (Skopjessa WHS antaa saman luvun).
- **Tirana (7 varoitusta):** nykytaiteen teemasivun nostot 1–3 ovat 382, 424 ja 412 mrk (440–660), yksi pyöreä suuruusluokka ja kolme lisenssimerkintää; kansi nosto 4:n lähdeviittaus on korjattu.
- **Zagreb: kohteita 5** (pohjataso 6): kuvapula, ks. erän RAPORTTI.md.
- **Chisinau oppaan jakso 5** ("−10 astetta") korjattu, ks. yllä.
- Tarkistuksen rajoitukset: Britannica, UNESCO ja Wikidata palauttivat usein 403; toisena lähteenä käytettiin muita Wikipedia-artikkeleita, viranomais- ja uutissivuja, Wikivoyagea ja matkaoppaita. Wikipedian kieliversiot, jotka olivat käännöksiä toisistaan, eivät kelvanneet toiseksi lähteeksi, joten monet luvut (noin 30–50 per kaupunki) ovat PYÖRISTETTY.
- Kohdekartan koordinaatteja, rajoja ja `valokuva.vuosi`-kenttiä ei tarkistettu (ei väitteitä lukijalle).

## Avoimet kysymykset Päätoimittajalle

1. Hyväksytäänkö PYÖRISTETTY/POISTETTU-linja tilanteessa, jossa vain yksi aidosti riippumaton lähde löytyi (Britannica/UNESCO eivät avautuneet)? Vaihtoehto: Macilla toinen kierros viralliseen lähteeseen (Tirana: INSTAT, Skopje: stat.gov.mk, Belgrad: SORS).
2. Lisenssimerkinnät "CC BY-SA 3.0 rs" ja "CC BY 3.0 pl": muutetaanko lähderivit Commonsin muotoon vai sallitaanko nykyinen? (belgrad 2, tirana 3 varoitusta)
3. Tiranan `konteksti.json`:in "noin kolmannes kansasta" on kunnalle väärin (noin 25 %; 31,6 % on prefektuuri): korjataanko konteksti ja Raamatun/pelin muu käyttö?
4. Bratislava: Redutan kuvan kohde on nykyrakennus (1913–1919), mutta Redutan "barokkiaikainen 1773" -tarina on poistettu — halutaanko nostoon uusi kulma, vai vaihdetaanko kuva? Samoin Hviezdoslavin aukion 1873-lause (vanha teatteri 1776–1884) kannattaa tarkistaa Macilla.
5. Pituusvaroitusten (chisinau 2, skopje 2, minsk 4 nostoa + intro) korjaus vaatisi uutta, lähdettyä tekstiä: tehdäänkö se Sisältökirjurin erässä?
