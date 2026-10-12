# Laitetestaaja: pallokisa pelaajana, TF 185 -sisältö (12.10.2026 ilta)

App: `lokit/natiiviseppa-app-1841` (67c88856e, = TF 185). iPhone `0AC1815C` (A, Utelias Ilves) + iPad Pro 13 `3622D89D` (B, Rohkea Kompassi), Pariisi, retkikunta KLBDMB. Kuvat ja videot `proto-3d/lokit/laitetestaaja-pallokisa-185-20261012/` (MERKITTY-1…5 täysikokoisina, `iphone-pallokisa.mp4`, `ipad-pallokisa.mp4`); pienennetyt kopiot `docs/raportit/kuvat/pallokisa185-*.jpg`, lokit `docs/raportit/kuvat/peli-loki-pallokisa185-{P,I}.txt`.

**Tulos: kisa toimii päästä päähän, 4 huomiota.**

| # | Askel | Tulos |
|---|---|---|
| 1 | Sähke: A `sahke perusta`, B `sahke liity` | OK (koodi KLBDMB) |
| 2 | Pelaajan polku: kartta → Pariisin kuumailmapallo → kaupunkinäkymä → ☰ → **Aloita kisa** | OK molemmilla; "alku pariisi, 8 palloa, retkikunta KLBDMB" + "huone auki" |
| 3 | Taulu | OK: iPadilla molemmat pelaajat värilippuineen (sininen/oranssi) ja pallolaskuri 0/8 |
| 4 | Yhteislähtö (`pallokisa lahto`, A) | OK: molemmissa "yhteislähtö 4,9 s kuluttua", sama selostus lähtölaskenta → alku |
| 5 | Noudot (`opas kisa keraa <i>`, 8 palloa) | OK: vastapuolen noutoviesti **60–89 ms** (tavoite < 500 ms), selostukset oikein |
| 6 | Katkos: B appi taustalle ~11 s | OK: paluussa "huone auki 6/8", ohitettu nouto saapui (viive 8822 ms), **ei kaksoislaskentaa** |
| 7 | Maali: B 8/8 | OK: "maali 147,1 s, palkinto 30", molemmille "maalissa", selostus voitto-sininen |
| 8 | `pallokisa lopeta` | OK: "loppu pariisi (2/8, 271,0 s)" |
| 9 | Googlen laatat -kytkin kisan aikana (A) | kytkin näkyy ☰:ssä ("päällä"/"pois"), takaisin päälle palauttaa kaupungin, mutta **pois-tilassa** ks. huomio 4 |

## Huomiot
1. **Kello ei yhdisty yhteislähdössä.** Yhteislähdön jälkeen A:n kello 2:01 ja B:n 0:51 samalla hetkellä (ero ~70 s = pelaajien omien aloitusten väli); noutoaikalukemat (A 140,2 s vs B 57,5 s) samasta syystä. Kisa-aika näyttää alkavan jokaisen omasta "Aloita kisa" -napista, ei yhteislähdöstä. Merkitty: MERKITTY-2.
2. **Kello ei pysähdy muiden maaliin; loppukorttia ei näy.** Kun B on maalissa (8/8, 2:27), A:n kello jatkaa (3:59 → 4:21) ja kummallakaan näytöllä ei näkynyt tulos-/loppukorttia 6–14 s maalin jälkeen (voitto vain selostuksena ja lokissa). MERKITTY-3, 4.
3. **Pistetaulu peittää kaupunkikierroksen otsikot iPhonella** (Notre-Dame, "Pariisin goottilainen katedraali", Louvre päällekkäin kellon kanssa). MERKITTY-1.
4. **Googlen laatat POIS kisan aikana:** 27 s kytkimestä kaupunki lähes tyhjä (vain puita, ei rakennuksia eikä maata, kermanvärinen tausta), ionin varadata ei näy. Takaisin PÄÄLLE: kaupunki palaa ~20 s, kamera jää joen päälle. MERKITTY-5. (Kippiä ei vielä testattu tällä kierroksella.)

Lisää: iPadin ilmapallo lentää kaupunkikierrosta itse (nouti pallon 1 ilman komentoa); iPhonella pallo seisoo "Notre-Dame"-kohdassa kunnes `Jatka kierrosta` painetaan.

## Ei vielä testattu 185:ssä
Kisan kuvakkeet / muiden maiden eläinmerkit, kipistä paluu (aukot), kehittäjätilan kohdekaupungit kaikissa näkymissä, Googlen laatat -kytkin kipissä; raketti, Olavinlinna 5, ISS. Jatkan samassa vuorossa.
