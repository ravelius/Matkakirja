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
*(TÄYDENTÄÄ: SK, 17.10.2026, Kiinan dynastiat -linssin tekstityön pohjalta; ei uusia sääntöjä. Tekstien yleinen tuotanto: `kertojan-teksti-ja-aani.md`,
historiaosuus: `historiapeli.md` luku 2.)*

**Tuotokset linssiä kohti (tässä järjestyksessä):**
1. **Tarinarivit avainvuosittain** (vaihe 4): yksi virke per avainvuosi, taulukko `docs/kohtaukset/<linssi>/tarinarivit-<pvm>.md`
   sarakkein vuosi, rivi, Muutos ("–" jos rivi säilyi). Pohjana Karttasepän `<linssi>.json` (pääkaupunki-sarake sen mukaan, ei
   muistista) ja linssin suunnitelma. Pelitekstiin vain varmistetut faktat; [EPÄVARMA] pehmennetään tai jätetään pois.
2. **Faktatarkistus ennen PT:tä:** kolme Sonnet-agenttia jakaa vuodet (Kiina: 19 vuotta → A/B/C), kukin hakee omat lähteensä
   (kaksi riippumatonta per väite; 403-sivut luetaan hakutiivistelmästä, ei kierretä; AI-merkitty wikisivu ei ole todiste).
   Tulos `docs/raportit/<linssi>-faktatarkistus-<pvm>.md` + `…-lahteet-<pvm>.md`; rivit hiotaan tuloksen mukaan.
3. **Kertojatekstit** (jos linssi kertoo ääneen): rivit, taistelu- ja keksintökortit tarvittaessa, `docs/kohtaukset/<linssi>/
   kertojatekstit-<pvm>.md` + `.json` (jokaisella kortilla lähteet; valmis teksti ja tarkistusmerkinnät samassa tiedostossa).
4. **Riippumaton tarkistus kertojateksteille** ja korteille: eri agentti kuin kirjoittaja, ohje "oleta että jotain on pielessä",
   omat haut ENNEN aineiston lukua, tuomio OK / KORJAA / EPÄVARMA ja täsmällinen korvaava teksti. Kokemus: kirjoittajan oma
   tarkistus ei löydä kaikkea (Kiina 17.10.: 19 kertorivistä 7 vaati korjausta, 9 kortista 4); älä ohita tätä vaihetta.
   Korjaukset tiedostoon ja tarkistuksen lähteet/koordinaattitarkkuudet `.json`:iin (`riippumaton_tarkistus_<pvm>`).
5. **Tekstit-osasto omistajan hyväksyttäväksi:** teksti äänisivun Tekstit-osastoon (tunnus `<linssi>-<aihe>`, kertoja ehdotuksena,
   rivillä merkkimäärä ja tarkistustila "odottaa KK:n hyväksyntää"). Varmuuskopio ensin (`index.html.ennen-<aihe>-<pvm>`),
   julkaisu `zsh tools/tyotavat/julkaisija/aanisivu-julkaise.zsh`; skripti keskeyttää, ellei Access-suoja ole voimassa. Muutoksen
   jälkeen teksti, merkkimäärä ja tarkistustila päivitetään myös Tekstit-osastoon.
6. **Ääni vasta luvalla** (Äänittäjä, ääniportti): ei äänitystä ennen KK:n/omistajan hyväksyntää eikä ennen generointilupaa.
   Numerot kirjoitetaan sanoiksi ennen merkkimäärän laskemista; "eaa." kirjoitetaan "ennen ajanlaskun alkua".

**Tekstin säännöt (poimittu Kiinan opeista):**
- Pelitekstissä ei lyhenteitä "eaa."/"jaa."; vuosiluvut numeroina. Pelaaja on 13+ ja aikuinen: ei lastentekstiä, ei väkivallan
  kuvausta eikä hehkutusta; sama sävy kuin muissa kertojateksteissä.
- Kiistanalainen tai yhden lähteen väite: "on arveltu" / "lähteiden mukaan" tai pois; älä väitä tarkempaa kuin lähde. Wikipedia
  on yksi lähde, ei kaksi. Hyvin tunnettu legenda (Talas 751, romaanin olkiveneet) kerrotaan legendana tai jätetään pois.
- Pääkaupungit, rajat ja koordinaatit otetaan Karttasepän datasta; jos teksti ja data ovat ristiriidassa, palauta kysymys
  Karttasepälle (SK ei korjaa dataa) ja kirjaa havainto `huomiot`-kenttään.
- Epävarma paikka ilmoitetaan tarkkuutena (km) kortissa ja siirretään Karttasepälle (taistelupisteet, `alue`); kiistanalainen
  paikka on kentässä `paikka_varmuus`.
- Kun teksti muuttuu tarkistuksen jälkeen, päivitä VAIN yksi totuus (`.json`) ja johda `.md` ja Tekstit-osasto siitä, ettei
  versioita ole kolmea.

**Tekstin valmiin määritelmä (täydentää lukua 3):** jokaisella avainvuodella tarinarivi; tarkistus tehty ja tallennettu;
Tekstit-osastossa kaikki tekstit tilalla "odottaa hyväksyntää" tai "hyväksytty"; ääni vasta luvalla; `.md`, `.json` ja Tekstit-osasto
ovat samat sanatarkasti.

**Aikataulu:** tekstit ehtivät rinnan koodin kanssa (vaiheet 3–5); aloita tarinariveistä heti, kun Karttasepän `MUOTO-*.md` on
valmis. Faktatarkistus ja riippumaton tarkistus ajetaan agenteilla (vain Opus/Sonnet); levyhädän aikana ei agentteja.

### Äänittäjä
*(kertoja ja äänimaisema linssille, ääniportti; ks. `kertojan-teksti-ja-aani.md`. Täydentää Äänittäjä.)*

## 8. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttui pohjassa.

- **17.10.2026, Kiinan dynastiat valmiiksi (juna 198).** Muotoehdotus Karttasepälle ennen dataa toimi: 241 kerrosta tuli kerralla
  oikeassa muodossa, ja epävarmat taistelupaikat lisättiin myöhemmin kenttänä (`alue`) ilman muutosta muuhun. Hidasti: käännös- ja
  simuvuorot yöllä (yksi kerrallaan), joten koodi valmistui tuntia ennen ensimmäistä kuvaa. Muuttuu: QA-komento jokaiselle
  siirtymän tilalle (`siirtyma 0,3`) heti, jolloin yksi simuajo todistaa koko animaation (kultainen polku 9).
- **17.10.2026, Kiinan dynastiat, tekstit (SK).** Kolmen tarkistajan faktatarkistus (16.10.) ei riittänyt kertojateksteille: riippumaton
  tarkistus 17.10. löysi 7/19 kertorivistä ja 4/9 kortista korjattavaa (pääkaupungin siirtäjä, "laajimmillaan", ruutireseptikirja,
  puupainannan alku). Muuttuu: riippumaton tarkistus on oma vaiheensa (SK-osuus kohta 4), ja `.json` on tekstien yksi totuus.
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
