# Tuotantopohja: uusi linssi

*(LUONNOS 17.10.2026, Linssiseppä, PT:n toimeksianto. Raamattu, TUOTANTOPOHJAT ja TUOTANTOPOHJIEN SANASTO. Tähän on koottu
vain nykyisten ohjeiden ja luovutusten opit (Kiinan dynastiat -linssi 16.–17.10.2026 pohjana); uusia sääntöjä ei ole. Jos tämä
ja Raamattu ovat ristiriidassa, Raamattu voittaa. Koodin ja todistuksen osuuden omistaa Linssiseppä; aineisto, kehys, tekstit
ja ääni täydentävät omat osansa otsikoilla "TÄYDENTÄÄ: <rooli>". PT hyväksyy muutokset. Ei vielä dokumenttikartalla.)*

Uusi linssi = oma näkymä pelin karttapallolle, joka kertoo yhden aiheen ajassa tai kartalla (linssikatalogin moottorit:
aikajana, alue, virta, data, esitysmoottori, pohjakartat; `docs/linssikatalogi.md`). Pohja kattaa linssin kokemuksen,
aineiston muodon, koodin natiivissa pelissä (proto-git), kehyksen, todistusajot ja junaan viennin. Se ei kata
historiapeliä (`historiapeli.md`), kertojan tekstiä ja ääntä yleisesti (`kertojan-teksti-ja-aani.md`) eikä 3D-malleja
(`3d-maamerkki.md`). Webin linssisopimus (`docs/moduulit/linssit.md`) koskee webin tasokarttaa; natiivin linssit tehdään tämän
pohjan mukaan.

**Rajaus:** linssit eivät kuulu VAIN EUROOPPA -rajaukseen (Raamattu, LINSSIT EIVÄT KUULU RAJAUKSEEN; Kiinan dynastiat on
koko maailman linssi). Uusi linssi aloitetaan vain omistajan päätöksellä (kortti tai KK:n "OMISTAJAN PÄÄTÖS klo …"), ja se
kytketään pelaajalle matkalaukusta (Raamattu, LINSSIT KYTKETÄÄN VAIN MATKALAUKUSTA).

## 1. Tuotantoputki ja roolit

```
omistaja (KK:n kautta): aihe ja kokemus yhdellä lauseella
  → PT: linssikatalogin rivi (mitä opitaan, pelikytkös, 1873-sidos, aineisto), referenssit KK:lta
  → Linssiseppä: muotoehdotus Karttasepälle (kentät, avainvuodet, kerrokset) ja ensimmäinen pallokuva
  → Karttaseppä: aineisto CC0-rajoista (data/linssit/<linssi>/, MUOTO-*.md, tools/<linssi>/) → PR mainiin
  → Sisältökirjuri: tarinarivit avainvuosittain + riippumaton faktatarkistus → PT
  → Linssiseppä: Ydin + Unity-sovitin proto-gitissä, QA-komennot, testit, todistusskenaario
  → Natiivi-UI: kehys (UI-POHJAT), aikaselain, yhteiset leimat
  → Julkaisija: KÄÄNNÖS NYT → SIMU NYT (yöllä 1 käännös + 1 simu) → kuvat _valmiit/
  → PT (3 riviä) → KK / omistaja (kuvapari) → Natiiviseppä: junaan
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Aihe ja kokemus | omistaja → KK → PT | Päätös lokissa; kokemus yhdellä lauseella (Kiina: "laajenee, hajoaa ja yhdistyy, pohjoisen kansat tulevat hallitsemaan, pääkaupunki siirtyy") |
| 1. Referenssit | KK, PT, Linssiseppä | 3–6 nimettyä esikuvaa (Kiina: Kings and Generals -karttakerronta, Minardin 1869 virtausnuolet, "valta leviää kuin muste") |
| 2. Muoto | Linssiseppä → Karttaseppä | Muotoehdotus viestinä; Karttasepän `MUOTO-*.md` on sitova muoto |
| 3. Aineisto | Karttaseppä | `data/linssit/<linssi>/<linssi>.json`, lähteet ja lisenssit kentässä, työkalut `tools/<linssi>/` |
| 4. Tekstit | Sisältökirjuri | Tarinarivit (yksi virke per avainvuosi + muutos), faktatarkistus `docs/raportit/<linssi>-faktatarkistus-*.md` |
| 5. Koodi | Linssiseppä | proto-git `linssiseppa/<linssi>-<juna>`: `Linssit/Ydin/<Aihe>/` + `Linssit/Unity/<Aihe>*.cs`, testit `Linssit-testit/Testit/<Aihe>Testit.cs` |
| 6. Kehys ja UI | Natiivi-UI | Kehys yhteisistä pohjista (lasipohja tai KEHYS-KÄÄRÖ), aikaselain, sinettileima |
| 7. Ääni | Äänittäjä | Kertoja ja äänimaisema vain luvalla (`kertojan-teksti-ja-aani.md`) |
| 8. Todistus | Linssiseppä + Julkaisija | Skenaario `sk-<linssi>-<laite>.txt`, ajo iPad + iPhone pysty, `_valmiit/<linssi>-<pvm>/` |
| 9. Hyväksyntä ja juna | PT → KK/omistaja → Natiiviseppä | Kuittaus, haara junaan |
| 10. Retrospektiivi | Linssiseppä | Kirjaus lukuun 8 |

Kanavat: viestit `send_message` session id:llä (osoitekirja), PT:lle enintään 3 riviä ja absoluuttiset polut; yksityiskohdat
luovutukseen. Agentit vain Opus ja Sonnet.

## 2. Kultainen polku (oletustapa)

1. **Kokemus ensin, data sitten.** Kirjoita yhdellä lauseella, mitä pelaaja näkee tapahtuvan, ja nimeä referenssit ennen
   kuin aineistoa haetaan. Kiinassa kokemus ("muste leviää ja vetäytyy") ratkaisi piirtotavan, ei aineisto.
2. **Pelin oma pallo ja pohja.** Linssi piirretään pelin karttapallolle Isoisän linssin 1873 pohjalla (UI-POHJAT); litteä kuva
   on vain rajojen ja värien luonnos (omistaja 16.10. klo 19.19). Ensimmäinen pallokuva pelistä näytetään ennen hiomista.
3. **Muoto ennen dataa.** Linssiseppä ehdottaa muodon (kentät, avainvuodet, kerrokset, lajit `viiva`/`virtaus`/`piste`),
   Karttaseppä kirjaa sen `MUOTO-*.md`:hen ja tekee aineiston. Epävarmuus kuuluu muotoon: `epavarma`, `tausta` (ennen linssin
   alkua), `alue` + `alue_km` (kiistanalainen paikka vyöhykkeenä). Uusi kenttä = muodon päivitys, ei koodin arvaus.
4. **Aineisto mainista, kopio protoon tavu tavulta.** Karttasepän PR mainiin, Linssiseppä kopioi tiedoston proton
   `Linssit/Resources/<Aihe>/` ja tarkistaa `cmp`:llä. Protossa ei korjata dataa käsin; virhe palautetaan Karttasepälle.
5. **Avainvuodet, ei jatkuvaa aikaa.** Linssi näyttää avainvuodet (Kiina 19 vuotta); aikaselain hakee lähimmän. Vuodesta
   toiseen siirrytään animaatiolla (uusi leviää, vanha vetäytyy), ja järjestys on sama joka kerta: muoto → rajat → nimet.
   Ennen ajanlaskun alkua olevat vuodet negatiivisina (−221), ja testi kattaa ne.
6. **Värisääntö yhdellä lauseella.** Esim. "ulkoiset hallitsijat viileillä, kiinalaiset dynastiat lämpimillä väreillä; Jin
   ja Qing sukulaisvärein" (omistaja 16.10. klo 20.35). Yksittäinen kiistanalainen väri kysytään omistajalta kuvaparilla.
7. **Kerrokset harkiten.** Jokainen kerros vastaa kokemuksen kysymykseen; himmeä jatko vanhalle (muuri), Minardin
   virtausnuoli määrille, risti tapahtumalle, epävarma paikka katkoviiva-alueena. Kerros näkyy avainvuosina alku ≤ vuosi ≤ loppu.
8. **Yhteiset pohjat, ei uusia osia.** Leima `iss-sinetti`-leimapohjalla, kehys UI-POHJISTA (lasipohja; historialinsseille
   KEHYS-KÄÄRÖ). Jos uusi kehys ei valmistu tai läpäise tarkistusta, linssi valmistuu lasipohjalla (omistaja 17.10. klo 01.25).
9. **Ydin ja ohut sovitin.** Logiikka (aineiston luku, kolmiointi, siirtymän tila, kerrosten tyyli) `Linssit/Ydin`-kokoonpanoon
   ilman UnityEnginea, jolloin se testataan `sh Linssit-testit/kaanna.sh <Aihe>`; Unity-kerros vain piirtää. Jokaiselle
   näkyvälle tilalle QA-komento (`linssi <aihe> vuosi <v>`, `… siirtyma <0…1|pois>`, `… tila`), jotta kuvat ovat toistettavia.
10. **Tarkistus ennen jonoa.** `zsh tyokalut/tarkista.sh` (csc-käännös ja vahdit) 0 virhettä ja aiheen testit läpi ennen kuin
    Julkaisijalta pyydetään käännöstä. Käännös on yöllä niukka: yksi käännös ja yksi simu kerrallaan Julkaisijan jonossa.
11. **Todistusskenaario kuvaa, mitä pitää näkyä.** Jokainen `kuva`-rivi kertoo tarkistettavan asian ("Sui leviää Daxingista
    (t 0,3): märkä musterintama"). Ajo iPadilla ja iPhone pystyssä; `tulokset.tsv` ilman PUUTE/VIRHE-rivejä, poikkeukset 0.
    Ajo-skripti tarkistaa, että sovelluksen `kaannos.txt` on uusi käännös, ei edellinen.
12. **Tekstit ja ääni eivät ole Linssisepän.** Tarinarivit ja kertojan teksti Sisältökirjurilta tarkistettuina; ääni vain
    luvalla. Linssiseppä kytkee valmiin aineiston eikä muotoile faktoja.

## 3. Valmiin määritelmä (tarkistuslista)

- [ ] Pelaaja löytää linssin matkalaukusta ja pääsee sisään; linssi aukeaa pelin pallolle oikealla pohjalla ja kehyksellä.
- [ ] Jokaisella avainvuodella on aineisto ja tarinarivi (testi); ensimmäinen ja viimeinen vuosi (myös negatiiviset) mukana.
- [ ] Siirtymä jokaisen vuoden välillä ilman hyppyä, myös taaksepäin kelatessa; rajat ja nimet piirtyvät muodon jälkeen.
- [ ] Nimet ovat omalla alueellaan eivätkä leikkaudu (testi), värisääntö on hyväksytty.
- [ ] Kerrokset näkyvät oikeina vuosina; epävarmat paikat merkitty (alue tai merkintä), lähteet `kerrokset_lahteet`-kentässä.
- [ ] Aineiston lisenssit PD/CC0/CC BY (tai jakoehtoinen johdettu aineisto samalla lisenssillä); ei NC-lisenssejä.
- [ ] Proton aineisto on tavulleen sama kuin mainin (`cmp`).
- [ ] Tekstit Sisältökirjurin tarkistamia; kertojan ääni vain luvalla.
- [ ] `tarkista.sh` 0 virhettä, aiheen testit läpi; todistusajo iPad + iPhone pysty ilman PUUTE/VIRHE-rivejä, poikkeukset 0.
- [ ] Kuvat `_valmiit/<linssi>-<pvm>/`, PT:n kuittaus ja KK:n tai omistajan hyväksyntä; haara junaan Natiivisepän kautta.
- [ ] Opit kirjattu tämän pohjan lukuun 8.

## 4. Poikkeaminen

Kultaisesta polusta poiketaan vain PT:n hyväksynnällä; poikkeama joko kirjataan uudeksi poluksi tähän pohjaan tai jätetään pois
(Raamattu, TUOTANTOPOHJIEN SANASTO: KULTAINEN POLKU).

## 5. Hyväksyntäpolku

| Asia | Hyväksyjä | Missä |
|---|---|---|
| Uusi linssi ja sen kokemus | omistaja | KK:n "OMISTAJAN PÄÄTÖS klo …", loki |
| Värit ja pohjakuva | omistaja kuvaparilla (KK yöllä yövaltuutuksella) | kortti |
| Aineiston muoto | Karttaseppä + Linssiseppä, PT kuittaa | `MUOTO-*.md` |
| Tarinarivit ja faktat | PT riippumattoman tarkistuksen jälkeen | `historiapeli.md` luku 2 (merkinnät) |
| Koodi ja kuvat | PT, sitten KK/omistaja | `_valmiit/<linssi>-<pvm>/` |
| Uusi yhteinen UI-pohja (esim. KEHYS-KÄÄRÖ) | omistaja tai KK yövaltuutuksella | UI-POHJAT |

## 6. Tyypilliset virheet (tarkistajan lista)

1. **Data korjattu protossa** eikä mainissa: seuraava kopio kumoaa korjauksen. Palauta Karttasepälle.
2. **Staattinen alustusjärjestys** C#:ssa: kenttä luki toisen, vielä tyhjän staattisen taulukon → TypeInitializationException
   ja koko näkymä ei avautunut (opaslinssi 17.10.). Testaa uudet staattiset taulukot yksikkötestillä.
3. **Vanha käännös todistuksena:** epäonnistunut käännös jättää edellisen sovelluksen paikalleen; tarkista `kaannos.txt`.
4. **Luonnoslippu jäi päälle:** `luonnos: true` piilottaa aineiston pelissä (QA-lippu näyttää sen) — tarkista ennen junaa.
5. **Liian monta kerrosta yhtä aikaa:** kartta täyttyy; himmennä vanhat, näytä vain avainvuoden kerrokset.
6. **Vuosiluvut ennen ajanlaskun alkua** positiivisina tai ilman `tausta`-merkintää.
7. **Uusi UI-osa yhteisen pohjan sijaan** (oma leima, oma kehys): käytä UI-POHJIA.
8. **Kuvat ilman tarkistettavaa väitettä:** skenaarion kuvateksti ei kerro, mitä pitää näkyä → kuvasta ei voi päättää.

## 7. TÄYDENTÄÄ

### Karttaseppä
*(rajadata ja kerrokset: CC0-lähteet, `MUOTO-*.md`, kolmiointi ja renkaat, epävarmat paikat alueena, lähteet-kenttä. Täydentää
Karttaseppä.)*

### Natiivi-UI
*(kehys (lasipohja, KEHYS-KÄÄRÖ alle 250 ms), aikaselain, nimikkeet ja sinettileima, iPhone pysty ja iPad. Täydentää Natiivi-UI.)*

### Sisältökirjuri
*(tarinarivit avainvuosittain: yksi virke ja muutossarake, kolme tarkistajaa, merkinnät; ks. `historiapeli.md` luku 2. Täydentää
Sisältökirjuri.)*

### Äänittäjä
*(kertoja ja äänimaisema linssille, ääniportti; ks. `kertojan-teksti-ja-aani.md`. Täydentää Äänittäjä.)*

## 8. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttui pohjassa.

- **17.10.2026, Kiinan dynastiat valmiiksi (juna 198).** Muotoehdotus Karttasepälle ennen dataa toimi: 241 kerrosta tuli kerralla
  oikeassa muodossa, ja epävarmat taistelupaikat lisättiin myöhemmin kenttänä (`alue`) ilman muutosta muuhun. Hidasti: käännös- ja
  simuvuorot yöllä (yksi kerrallaan), joten koodi valmistui tuntia ennen ensimmäistä kuvaa. Muuttuu: QA-komento jokaiselle
  siirtymän tilalle (`siirtyma 0,3`) heti, jolloin yksi simuajo todistaa koko animaation (kultainen polku 9).
- **16.10.2026, Kiinan dynastiat pallolle.** Ensimmäinen versio oli litteä kuva; omistaja halusi pelin pallon. Muuttuu:
  ensimmäinen kuva pelistä pallolla (kultainen polku 2), ja värit kysytään pallokuvilla (Qing viileä sininen).

## 9. Lähteet

Raamattu: TUOTANTOPOHJAT, TUOTANTOPOHJIEN SANASTO, LINSSIT — YHTEISET SÄÄNNÖT, LINSSIT EIVÄT KUULU RAJAUKSEEN, LINSSIT KYTKETÄÄN
VAIN MATKALAUKUSTA, UI-POHJAT, DATALINSSIT (lisenssit); loki `docs/raamattu-loki/paatokset-2026-10.md` #PAATOKSET 16.10.2026 klo
18.3x: KIINAN DYNASTIAT -LINSSI, #… klo 19.19: KIINAN DYNASTIAT -LINSSI KARTTAPALLOLLE, #… klo 20.35: QINGIN VÄRI VIILEÄ,
#OMISTAJAN PAATOKSET 17.10. YO: JULKAISU, KIINAN DYNASTIAT, KEHYS-KAARO; `docs/linssikatalogi.md`;
`data/linssit/kiinan-dynastiat/MUOTO-KERROKSET.md`; `docs/moduulit/linssit.md` (webin linssisopimus);
`docs/moduulit/tuotantopohjat/historiapeli.md`, `kertojan-teksti-ja-aani.md`; Linssisepän luovutukset 16.–17.10.2026
haarassa `linssiseppa-tyo-20260923` (`docs/raportit/viesti-linssiseppa-luovutus-20261016-2349.md`, `…-20261017-0157.md`).
