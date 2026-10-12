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

## Raketin oikea polku + ISS + kippi (samassa vuorossa, iPad / iPhone)

| # | Askel | Tulos |
|---|---|---|
| R1 | `uusi-peli 5 tromssa`, `koetila raha 800`, napautus Andøyan raketti-nappiin kartalla | **OK**: raketti käynnistyy suoraan, £800 → **£300** (£500 veloitettu), ISS-ohjaamo "T+ 0:00 · 1,2 G"; NUI:n vinkkiteksti ylhäällä ("ISS:lle lennetään Floridasta tai Baikonurista… Andøyalta raketit kiertävät napojen yli"). MERKITTY-6 |
| R2 | Lento: nousu → 200 km → ISS-ohjaamo (Tyynimeri, laaja/tele, suunta) | OK, ei jumeja; "Ohita"-teksti pieni ja osin paneelin reunan päällä (alaoikealla) |
| R3 | ISS:stä pois: Pulu ("Napauta Pulua palataksesi") → taulu "Minne katsotaan?" → Poistu | **OK** (kosketusalue korjattu): kartta palaa, raha 300 |
| K1 | Kippi (kaupunkikierros ilman kisaa): Googlen laatat pois/päällä | Sama kuin kisassa: pois → vain puita, ei rakennuksia; päällä → palaa |
| K2 | Poistu linssistä Pariisista kartalle | Kartta palaa, raha 300 → 100 (£200 pallo). **Pelinappula ei näy kartalla** ja alareunassa (Liiku-napin takana) on vaalea suorakulmainen laikku — MERKITTY-8, epävarma (voi olla animaatio kesken tai tyylivalinta) |
| E1 | Muiden maiden eläinmerkit kartalla (Ranska, Norja) | Ei havaittu vääriä merkkejä (Norjassa vain Dovrefjellin tassut) |

Ei vielä testattu: raketin hintalappu "ISS £500" kun pelaaja EI ole Tromssassa; "ei aukkoja kipistä palatessa" muissa kaupungeissa; kisan kuvakkeet erikseen (pallot näkyvät pistetaulun lukuina 0/8, ei erillistä katselukuvaa); kehittäjätilan kohdekaupungit kaikissa näkymissä; Olavinlinna 5 (odottaa PT:n askel 0 -kuittausta).

## Ei vielä testattu 185:ssä (jäljellä)
Olavinlinna 5; yllä mainitut. Jatkan ohjeen mukaan.
