# Tuotantopohja: uusi linssi

*(LUONNOS 17.10.2026, päivitetty 19.10.2026, Linssiseppä, PT:n toimeksianto. Raamattu 4.21 TUOTANTOPOHJAT, 8.1 VALMIIN
MÄÄRITELMÄ ja TUOTANTOPOHJIEN SANASTO. Tähän on koottu vain nykyisten ohjeiden, lokin ja luovutusten opit (Kiinan dynastiat
-linssi 16.–17.10., taidemuseo-linssin kamerajohtaja ja Kööpenhaminan kippi 18.–19.10.2026); uusia sääntöjä ei ole. Jos tämä ja
Raamattu ovat ristiriidassa, Raamattu voittaa. Koodin, kameran ja todistuksen osuuden omistaa Linssiseppä; aineisto, kehys,
tekstit ja ääni täydentävät omat osansa otsikoilla "TÄYDENTÄÄ: <rooli>". PT hyväksyy muutokset. Ei vielä dokumenttikartalla.)*

**Napit, tyylit ja toimintalogiikka (omistaja 20.10.2026 klo 22.58; Raamattu 2.70 ja kohta 2 UI-POHJAT):** pohja ei kuvaa omia nappeja, värejä eikä sisään- ja ulostuloa. Käytä tyylikirjaa (`tools/tyylikirja.mjs`, `tyylikirja/`) ja yhteisiä linssien ja pelien sääntöjä (2.70, 2.201). Käytä ensin yhteistä osaa; uusi osa tehdään yhteiseksi kaikille (omistaja 23.25), ja puuttuva pohja kysytään PT:ltä.

**Koko työ ideasta junaan (omistaja 20.10.2026 klo 22.53, Raamattu 4.21):** pohja kattaa työn ideasta junaan. Työ alkaa tavoitekuvasta, ja omistaja näkee tavoitekuvan ja valmiin näköisyyden rinnakkain KK:n kautta ennen junaa.

Uusi linssi = oma näkymä pelin karttapallolle tai omaan näyttämöönsä, joka kertoo yhden aiheen ajassa, kartalla tai tilassa
(linssikatalogin moottorit: aikajana, alue, virta, data, esitysmoottori, pohjakartat; `docs/linssikatalogi.md`; myös
näyttämölinssit kuten taidemuseo ja elävä opas). Pohja kattaa linssin tavoitteen, aineiston muodon, koodin natiivissa pelissä
(proto-git), kameran, kehyksen, todistusajot ja junaan viennin. Se ei kata historiapeliä (`historiapeli.md`), kertojan tekstiä
ja ääntä yleisesti (`kertojan-teksti-ja-aani.md`), 3D-malleja (`3d-maamerkki.md`, `codex-3d-toimitus.md`) eikä taidemuseon
maan sisältöä (`taidemuseon-maa.md`). Webin linssisopimus (`docs/moduulit/linssit.md`) koskee webin tasokarttaa; natiivin
linssit tehdään tämän pohjan mukaan.

**Rajaus:** linssit eivät kuulu maanosarajaukseen (Raamattu, LINSSIT EIVÄT KUULU RAJAUKSEEN; Kiinan dynastiat on koko maailman
linssi). Uusi linssi aloitetaan vain omistajan päätöksellä (kortti tai KK:n "OMISTAJAN PÄÄTÖS klo …"), ja se kytketään
pelaajalle Linssit-napista tai laukun Varusteista (Raamattu 2.62). Keskeneräinen linssi on Linssit/Pelit ›
Keskeneräiset -osassa, ei Kehittäjä › Kokeet -valikossa.

## 0. Tavoitteen muoto (ensimmäinen mietintäkierros)

Raamattu 4.21 (omistaja 19.10.2026 klo 14.50): ensin TAVOITE niin määriteltynä, että kaikki ymmärtävät sen samoin, sitten
KUSTANNUSTEHOKKAIN POLKU siihen laadun pysyessä korkeana. Linssissä tavoite määritellään ennen aineistoa ja koodia kolmella
muodolla, yksi kullekin osalle. Sanallinen kuvaus ei yksin riitä, koska sen jokainen rooli ymmärtää eri tavalla.

| Osa | Tavoitteen muoto | Kuka tekee | Missä hyväksytään |
|---|---|---|---|
| Grafiikka (pallo, pohja, värit, kerrokset, näyttämö) | **Havainnekuva** pelin näkymästä: pelin pallo tai näyttämö, kehys ja yksi avainhetki | Codex (kaikki kuvat Codexilta, Claude koodaa ja kokoaa; omistaja 19.10. 08.28), tilaus PT:n kautta | KK/omistaja täysikokoisena; PT tarkistaa kuvan kohta kohdalta ennen suositusta |
| Kamera (avaus, siirtymät, kierros, saapuminen) | **Viitevideo tai kuvakäsikirjoitus**: kohtauslista, jossa jokaisella otolla 4.24:n liike (paikallaan, kisko, orbit, moniakselinen kääntö), kesto ja mitä ruudussa näkyy lopussa | Linssiseppä (kuvakäsikirjoitus; malli `docs/kohtaukset/pallokierros/pariisi-nykyintro.md`), viitevideo nimetystä esikuvasta | PT, sitten KK/omistaja |
| Käyttöliittymä (kehys, aikaselain, napit, kortit) | **Piirretty kuvakaappaus**: pelin kuvakaappaus, johon uusi osa on piirretty yhteisillä UI-pohjilla (4.1), iPhone pysty ja iPad | Natiivi-UI (Codex piirtää tarvittaessa) | PT, sitten KK/omistaja |

Säännöt:
- Tavoitteen muoto tehdään vain uudelle asialle; olemassa olevat pohjat (UI-POHJAT, kehykset, Kamerajohtajan liikkeet) eivät
  tarvitse uutta kuvaa. Kierroksia ei tehdä joka työssä uudelleen (4.21).
- Hyväksytty havainnekuva, kuvakäsikirjoitus ja kuvakaappaus tallennetaan `_valmiit/<linssi>-tavoite-<pvm>/` ja mainitaan
  linssikatalogin rivillä. Valmista linssiä verrataan niihin rinnakkain (luku 4).
- Kuvateksti on aina kuvan ulkopuolella omalla raidallaan, ei kuvan päällä (omistaja 18.10. 12.14).
- Toinen mietintäkierros: kirjaa tavoitteen viereen polku, joka tuottaa sen halvimmin (olemassa olevat pohjat, QA-komennot,
  yksi käännös ja simu kerrallaan); jos polku ei yllä tavoitteeseen, palaa tavoitteeseen PT:n kanssa, älä laske laatua hiljaa.

## 1. Tuotantoputki ja roolit

```
omistaja (KK:n kautta): aihe ja kokemus yhdellä lauseella
  → tavoitteen muoto (luku 0): havainnekuva (Codex), kuvakäsikirjoitus (Linssiseppä), piirretty kuvakaappaus (Natiivi-UI)
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
| 1b. Tavoitteen muoto | Codex, Linssiseppä, Natiivi-UI → PT → KK/omistaja | Havainnekuva, kuvakäsikirjoitus/viitevideo ja piirretty kuvakaappaus (luku 0), `_valmiit/<linssi>-tavoite-<pvm>/` |
| 2. Muoto | Linssiseppä → Karttaseppä | Muotoehdotus viestinä; Karttasepän `MUOTO-*.md` on sitova muoto |
| 3. Aineisto | Karttaseppä | `data/linssit/<linssi>/<linssi>.json`, lähteet ja lisenssit kentässä, työkalut `tools/<linssi>/` |
| 4. Tekstit | Sisältökirjuri | Tarinarivit (yksi virke per avainvuosi + muutos), faktatarkistus `docs/raportit/<linssi>-faktatarkistus-*.md` |
| 5. Koodi | Linssiseppä | proto-git `linssiseppa/<linssi>-<juna>`: `Linssit/Ydin/<Aihe>/` + `Linssit/Unity/<Aihe>*.cs`, testit `Linssit-testit/Testit/<Aihe>Testit.cs` |
| 5b. Kamera | Linssiseppä | Kuvakäsikirjoituksen otot Kamerajohtajan liikkeinä + kameratestit (luku 3) |
| 6. Kehys ja UI | Natiivi-UI | Kehys yhteisistä pohjista (lasipohja tai KEHYS-KÄÄRÖ), aikaselain, sinettileima |
| 7. Ääni | Äänittäjä | Kertoja ja äänimaisema vain luvalla (`kertojan-teksti-ja-aani.md`) |
| 8. Todistus | Linssiseppä + Julkaisija | Skenaario `sk-<linssi>-<laite>.txt`, ajo iPad + iPhone pysty, `_valmiit/<linssi>-<pvm>/` |
| 9. Hyväksyntä ja juna | PT → KK/omistaja → Natiiviseppä | Kuittaus, haara junaan |
| 10. Retrospektiivi | Linssiseppä | Kirjaus lukuun 9 |

Kanavat: viestit `send_message` session id:llä (osoitekirja), PT:lle enintään 3 riviä ja absoluuttiset polut; yksityiskohdat
luovutukseen. Agentit vain Opus ja Sonnet. Raskaat ajot (Unity-käännös, simu) vain Julkaisijan vuorolla: pyydä vuoro ennen jokaista.

## 2. Kultainen polku (oletustapa)

1. **Tavoite ja kokemus ensin, data sitten** (luku 0). Kirjoita yhdellä lauseella, mitä pelaaja näkee tapahtuvan, ja nimeä referenssit ennen
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
   ja Qing sukulaisvärein" (omistaja 16.10. klo 20.35). Värit hyväksyy PT; omistajalle kuvaparina vain värit, joista on erimielisyyttä tai jotka poikkeavat tyylikirjasta (omistaja 20.10.2026 klo 22.55).
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
13. **Kamera kuvakäsikirjoituksesta.** Jokainen otto tehdään Kamerajohtajan nimetyllä liikkeellä ja testataan (luku 3); kamera ei
    koskaan liiku sovittimen omalla koodilla.

## 3. Kamera: Kamerajohtajan opit

Raamattu 4.24 KAMERALIIKKEET (omistaja 19.10.2026 klo 08.20), 2.68 KAMERA-AJOT ja 2.69 EI PYÖRITYSTÄ. Toteutus proto-gitissä:
`Linssit/Ydin/Kamera/Kamerajohtaja.cs` (liikkeet ja jono), `Kameratarkastus.cs` (jatkuvuus ja pehmeys), `Liikepohja.cs`
(käyrät), testit `Linssit-testit/Testit/KameraliikeTestit.cs`, vahti `tyokalut/kameravahti.py` (`tarkista.sh` ajaa sen).
Ensimmäinen käyttäjä on taidemuseo-linssi (museo-kamerajohtaja-204), mallina sen `MuseoKierros.Osoitus.cs` ja `MuseoSovitin.cs`.

1. **Yksi kameran lähde.** Linssin kamera liikkuu vain Kamerajohtajan jonon kautta (`Paivita(dt)` joka ruutu); suora asennon
   kirjoitus on kielletty, ja kameravahti hylkää uudet suorat kirjoitukset (lähtötaso `tyylikirja/kameravahti.json` saa vain
   pienentyä). Yhteinen kirjoituspiste muille kuin linsseille: `Assets/Matkakirja/Kartta/KameraKirjoittaja`.
2. **Vain nimetyt liikkeet.** `Paikallaan` (harkittu pysähdys), `Kisko` (ajo pisteiden kautta keskeis-Catmull–Romina, tasainen
   vauhti pehmein rampein, mutkassa hidastus), `Orbit` (kohteen ympäri), `Kaanto` (moniakselinen, huippu 60 °/s), `Zoom`
   (logaritmisesti tasainen) ja `Leikkaus`. Jokainen alkaa edellisen loppuasennosta ja -nopeudesta; uutta liikettä ei kirjoiteta
   sovittimeen vaan Ytimeen testeineen.
3. **Leikkaus vain peitettynä.** Kamera saa hypätä vain mustan tai tumman välähdyksen alla (< 250 ms, 2.69). Pitkä siirto
   (museossa napautusliuku yli 12 m) = tumma leikkaus lähelle kohdetta (4 m) + lyhyt liuku perille; omistaja 19.10. 08.20:
   "55 m/s liuku ei ole hyväksyttävä kokemus".
4. **Perillä tarvittava ladataan ennen liikettä.** `Kamerasiirto.Valmistele` käynnistää esilataukset, kun liike lisätään jonoon,
   ja `Valmis` pitää kameran paikallaan (tai mustan päällä), kunnes kaikki on valmiina. Saapumisnäkymän pääkohde (kohdepatsas,
   kohdekuva) ladataan ENSIN ja sitä odotetaan pidempään kuin muuta: Leiden 19.10.: muu sisältö 4 s, kohdepatsas enintään
   10 s (kuormassa 4 s ei riittänyt → tyhjä jalusta perillä, cb166ad2b). Juuri ladattua kohdetta ei pureta leikkauksen
   jälkeen (budjetti piti valinnan kamerasta → latasi uudelleen perillä, da9bdd2f9). Lokiin aina rivi
   "esilataus valmis X s, kohde Y ladattu/EI ladattu", josta todistus tarkistetaan.
5. **Saapumiskatse sisältöön.** Pitkän siirron lopussa kamera katsoo kohteeseen sen katseluasennosta (veistos ≤ 4 m:n päässä
   liu'un lopusta → veistoksen katseluasento), ei tyhjään seinään eikä lähikuvaan jalustasta.
6. **Ei pyöritystä.** Kokonaiskääntö ja kesto testataan (`KameraliikeTestit`); iso suunnanmuutos mustalla välähdyksellä, kävelyssä
   katse kääntyy menosuuntaan vain vähän. Napautusliu'un kääntöhuippu 150 °/s (ennen 1 s:n liuku 180° = 512 °/s).
7. **Jokaiselle liikkeelle testi ja vahti.** CI-testi (jatkuvuus, pehmeä alku ja loppu, kesto) koko käsikirjoitetulle
   kierrokselle; todistusajossa ruutuaikavahti koko liike + 1 s (yli 20 ms:n ruutu = hylkäys) ja `ruutuvahti` (näytön ja pelin
   kuvan tiivisteet) sekä kameraloki (`museo: KAMERAHYPPY …`).
8. **Simuvideon hyppy ei ole todiste pelin hypystä.** Ennen kamerakorjausta todista kameralokilla ja ruutuvahdilla, että hyppy on
   pelissä; kuormassa (load > 100) simulaattorin kuva jumittaa ja video katkeaa (Mona Lisa 18.–19.10.: pelin kuva tasainen
   60 fps, hyppy oli simulaattorin).
9. **QA-komento jokaiselle kameran tilalle**, jotta kuva on toistettava: `linssi <aihe> paikka …`, `… kavele …`, `… autozoom 0`,
   `… ruutuvahti 1`; todistusskenaario käyttää komentoja koordinaattinapautusten sijaan (luku 7, virheet 9–11).

## 4. Valmiin määritelmä (tarkistuslista)

Raamattu 8.1: paketti ei ole valmis ennen tätä listaa, ja se on valmis vasta, kun sen opit on viety tähän pohjaan (luku 9).

**Tavoite**
- [ ] Tavoitteen muodot (luku 0) hyväksytty ja tallennettu; valmiin linssin kuva on rinnakkain havainnekuvan kanssa
      täysikokoisena, ja poikkeamat on kirjattu tai korjattu.

**Pelaaja**
- [ ] Pelaaja löytää linssin matkalaukusta ja pääsee sisään; linssi aukeaa oikealla pohjalla ja kehyksellä (iPhone pysty, iPad).
- [ ] Pelaaja pääsee ulos ja takaisin samaan tilaan; ✕ ja ☰ yhteisten pohjien mukaan, yksi ✕ kerrallaan päällekkäisissä ikkunoissa.

**Aineisto ja teksti**
- [ ] Jokaisella avainvuodella (tai pysäkillä) on aineisto ja tarinarivi (testi); ensimmäinen ja viimeinen mukana, myös
      negatiiviset vuodet.
- [ ] Nimet ovat omalla alueellaan eivätkä leikkaudu (testi), värisääntö hyväksytty.
- [ ] Kerrokset näkyvät oikeina vuosina; epävarmat paikat merkitty, lähteet `kerrokset_lahteet`-kentässä.
- [ ] Lisenssit PD/CC0/CC BY (tai jakoehtoinen johdettu aineisto samalla lisenssillä, esim. havainnekuva CC BY-SA -valokuvan
      pohjalta); ei NC-lisenssejä; tekijät Lähteissä.
- [ ] Proton aineisto on tavulleen sama kuin mainin (`cmp`); kuvalistan uusi versio uudessa polussa (`kuvat-vN`), ämpärissä
      (Julkaisija vie, SHA tarkistettu) ennen kuin haara pyydetään junaan.
- [ ] Uusi teksti luettu pelinäkymässä (kuva pelistä tekstin kanssa) tuoreella lukijalla ennen PT:n kuittausta (Raamattu 9.11).
- [ ] Tekstit Sisältökirjurin tarkistamia; ääni vain luvalla.

**Kamera (luku 3)**
- [ ] Kaikki kameran liikkeet Kamerajohtajan kautta; `kameravahti.py` ei löydä uusia suoria kirjoituksia.
- [ ] Jokaisella käsikirjoitetulla liikkeellä CI-testi; todistusajossa ei yli 20 ms:n ruutuja liikkeen aikana + 1 s eikä
      KAMERAHYPPY-rivejä.
- [ ] Saapumisessa pääkohde on ladattu ennen paljastusta (lokirivi "… ladattu"), ei tyhjiä jalustoja eikä sumeita kuvia.

**Todistus ja juna**
- [ ] `tarkista.sh` 0 virhettä, aiheen testit ja koko `Linssit-testit` läpi.
- [ ] Todistusajo iPad + iPhone pysty: `tulokset.tsv` ilman PUUTE/VIRHE-rivejä, poikkeukset 0, `kaannos.txt` = uusi käännös;
      jokainen `kuva`-rivi kertoo tarkistettavan väitteen ja kuva on tarkistettu täysikokoisena.
- [ ] Ennen/jälkeen-kuvat PT:lle (kuvatekstit omalla raidallaan), PT:n kuittaus ja KK:n tai omistajan hyväksyntä; haara junaan
      Natiivisepän kautta. Omistaja ei ole ensimmäinen tarkistaja: yöjunassa Laitetestaaja pelaa lukitun käännöksen ennen ulkoisia
      testaajia; päiväjunassa PT ja KK katsovat simutodisteet heti (Raamattu 9.11).
- [ ] Opit kirjattu tämän pohjan lukuun 9.

## 5. Poikkeaminen

Kultaisesta polusta poiketaan vain PT:n hyväksynnällä; poikkeama joko kirjataan uudeksi poluksi tähän pohjaan tai jätetään pois
(Raamattu, TUOTANTOPOHJIEN SANASTO: KULTAINEN POLKU).

## 6. Hyväksyntäpolku

| Asia | Hyväksyjä | Missä |
|---|---|---|
| Uusi linssi ja sen kokemus | omistaja | KK:n "OMISTAJAN PÄÄTÖS klo …", loki |
| Tavoitteen muoto (havainnekuva, kuvakäsikirjoitus, kuvakaappaus) | PT, sitten KK/omistaja täysikokoisena | `_valmiit/<linssi>-tavoite-<pvm>/` |
| Värit ja pohjakuva | PT; omistaja kuvaparilla vain kiistanalaiset ja tyylikirjasta poikkeavat (omistaja 20.10. 22.55) | kortti vain kiistanalaisista |
| Aineiston muoto | Karttaseppä + Linssiseppä, PT kuittaa | `MUOTO-*.md` |
| Tarinarivit ja faktat | PT riippumattoman tarkistuksen jälkeen; uusi teksti pelinäkymässä tuoreella lukijalla (9.11) | `historiapeli.md` luku 2 (merkinnät) |
| Koodi ja kuvat | PT, sitten KK/omistaja | `_valmiit/<linssi>-<pvm>/` |
| Uusi yhteinen UI-pohja (esim. KEHYS-KÄÄRÖ) | omistaja tai KK yövaltuutuksella | UI-POHJAT |

## 7. Tyypilliset virheet (tarkistajan lista)

1. **Data korjattu protossa** eikä mainissa: seuraava kopio kumoaa korjauksen. Palauta Karttasepälle.
2. **Staattinen alustusjärjestys** C#:ssa: kenttä luki toisen, vielä tyhjän staattisen taulukon → TypeInitializationException
   ja koko näkymä ei avautunut (opaslinssi 17.10.). Testaa uudet staattiset taulukot yksikkötestillä.
3. **Vanha käännös todistuksena:** epäonnistunut käännös jättää edellisen sovelluksen paikalleen; tarkista `kaannos.txt`.
4. **Luonnoslippu jäi päälle:** `luonnos: true` piilottaa aineiston pelissä (QA-lippu näyttää sen) — tarkista ennen junaa.
5. **Liian monta kerrosta yhtä aikaa:** kartta täyttyy; himmennä vanhat, näytä vain avainvuoden kerrokset.
6. **Vuosiluvut ennen ajanlaskun alkua** positiivisina tai ilman `tausta`-merkintää.
7. **Uusi UI-osa yhteisen pohjan sijaan** (oma leima, oma kehys): käytä UI-POHJIA.
8. **Kuvat ilman tarkistettavaa väitettä:** skenaarion kuvateksti ei kerro, mitä pitää näkyä → kuvasta ei voi päättää.
9. **Koordinaattinapautus todistusskenaariossa:** asettelu muuttuu ja napautus osuu ohi tai väärään kohtaan (kipin kuvakortti
   19.10.: pikkukuva siirtyi 600 → 722 pt; yksi napautus avasi kartalta museolinssin). Käytä `tap-teksti <nimi>` tai linssin
   QA-komentoa (esim. `ui opasvalikko suurenna`); tarkista komennon reitti (`linssi opas …` ja `ui opasvalikko …` ovat eri reittejä).
10. **Himmeät kehysnapit:** ensimmäinen napautus vain tuo napit esiin ("kehysnapit: UI-klikkaus nielty"), toinen painaa.
    Skenaariossa joko QA-komento tai herätys + odota 1 + napautus; `ui sulje` ei sulje kokoruudun kuvaselainta (alasveto sulkee).
11. **Napautus ennen kuin näkymä on valmis:** kuormassa lista tai sivu ei ole vielä ui-puussa ("elementtiä … ei ui-puussa"), ja
    video kuvaa väärää tilaa (Leiden 15.04). Odota tila (`oleta …`) tai `odota 6` ennen napautusta, ja katso video ennen raporttia.
12. **Kuorman unohtaminen:** esilataus, joka riittää kevyellä koneella, aikakatkaisee kuormassa (load > 100). Pidä pääkohteelle
    oma, pidempi odotus (luku 3, kohta 4) ja lue lokin "esilataus valmis" -rivi jokaisesta todistuksesta.

## 8. TÄYDENTÄÄ

### Karttaseppä
*(Karttaseppä 17.10.2026, Kiinan dynastiat -linssin aineistotyön pohjalta (19 avainvuotta, 241 kerrosta, epävarmat
taistelupaikat alueina); ei uusia sääntöjä. Malli: `data/linssit/kiinan-dynastiat/` ja `tools/kiinan-dynastiat/`.)*

**Tuotokset linssiä kohti (tässä järjestyksessä):**
1. **Lähdeselvitys ennen piirtoa.** Jokaiselle aineistolle lisenssi ja käyttötapa `docs/raportit/<linssi>-lahteet-<pvm>.md`:hen.
   Kiina: rajat omina käsin piirrettyinä kärkilistoina (CC0), rannikko Natural Earthin maasta (PD), Cliopatria (CC BY 4.0) vain
   vertailukuvan katkoviivana, ei geometrian lähteenä (krediitti annetaan silti `attribuutio`-kenttään). Ei OSM:ää (ODbL on
   jakoehtoinen, ei pysyvässä latausluvassa), ei NC-lisenssejä; skriptattu haku vain robots.txt:n salliessa.
2. **Muoto kirjataan, ennen kuin aineisto tehdään.** Linssisepän muotoehdotus → `MUOTO.md` (LS lukitsee proto-sha:lla). Lukittuun
   muotoon ei kosketa: lisäykset uutena päätason avaimena (`kerrokset`, `kerrokset_lahteet`) ja oma `MUOTO-<osa>.md`, uudet
   tiedot lisäkenttinä, joita vanha lukija ei tarvitse (taistelun `alue` tuli myöhemmin ilman muutosta muuhun).
3. **Geometrian säännöt** (pelin pallo, Isoisä 1873 -muoto): WGS84 `[lon, lat]`, 3 desimaalia; linssin alue rajataan niin, ettei
   antimeridiaania ylitetä (Kiina 60–145° I); viivat tihennetty ≤ 0,25° ja täyttöjen reunat ≤ 0,5°, ettei pitkä jakso painu
   pallon pinnan alle; monikulmio = ulkokehä + reiät; alueet eivät mene päällekkäin (aiempi voittaa, naapurit vähennetään
   järjestyksessä); rannikko tulee pohjasta, viivoissa vain maarajat (luokka 1 valtio, 2 protektoraatti/vasalli); sievennys ~3 km.
4. **Työkalut toistettaviksi** `tools/<linssi>/`: piirto (`piirra.py`, GeoJSON per vuosi + vertailukuva), vienti (`vie.py`, koko
   pelin JSON) ja kerrokset (`kerrokset.py` + `kerrokset_data.py`, ajetaan viennin jälkeen ja kirjoittaa vain oman avaimensa).
   Käsin piirretty data osamoduuleihin (`vuodet_a/b/c.py`), ankkurit kommentteina (vuori, joki, kaupunki). JSON kirjoitetaan
   väliaikaisen kautta (`.tmp` + `os.replace`); assertit alueen rajoille, ja tuloste kertoo kerrosmäärät ja koon tavuina.
5. **Epävarmuus muotoon, ei tekstiin.** `epavarma` (paikka kiistanalainen), `tausta` (ennen linssin alkua, näytetään alusta),
   `alue` + `alue_km` (mahdollisten paikkojen vyöhyke suljettuna renkaana: kupera verho säteen ympyröistä paikkaviivan ympärillä;
   Punainen kallio Jangtse Baqiu–Wuhan 12 km, Fei-joki Shouchun 15 km). Piste jää yleisimmin mainittuun paikkaan. Arviot
   merkitään (`arvio`: true, väestön alueosuudet "Karttasepän arvio") ja kaikki lähteet `kerrokset_lahteet`-kenttään.
6. **Luonnoskuva ennen PR:ää.** Litteä 2 × 2 -välikuva (`valikuva.py`) neljästä avainvuodesta PT:lle rajojen ja värien
   tarkistukseen; varsinainen hyväksyntä tehdään pelin pallokuvasta (kultainen polku 2).
7. **PR mainiin, sha Linssisepälle.** Vain `data/linssit/<linssi>/` ja `tools/<linssi>/` (datamuutos ei nosta versiota, vihreä PR
   mergetään ilman korttia). LS kopioi tiedoston proton `Linssit/Resources/<Aihe>/` ja tarkistaa `cmp`:llä. Korjaukset tehdään aina
   mainiin uudella ajolla, ei käsin JSONiin eikä protoon (tyypilliset virheet 1).

**Yhteistyö:** Sisältökirjuri ottaa pääkaupungit ja paikat datasta; SK:n tarkistamat koordinaatit ja km-tarkkuudet palautuvat
Karttasepälle, joka päivittää datan (kiistanalainen paikka `alue`-kenttään). Värit ovat suunnitelman ja omistajan (yksittäinen
väri kuvaparilla), Karttaseppä vain kirjaa ne `vari`-kenttiin ja `MUOTO.md`:hen.

**Aineiston valmiin määritelmä (täydentää lukua 4):** jokaisella avainvuodella alueet, maarajat, nimet ja pääkaupungit; alueet
eivät ole päällekkäin; jokaisella kerroksella `alku`–`loppu`, `vari` ja lähde; epävarmat paikat merkitty (`epavarma`, `alue`);
lisenssit `LAHTEET.md`:ssä ja `attribuutio`-kentässä; työkalut tuottavat mainin JSONin tavulleen samana.

**Linssisepän täydennys 20.10.2026 (linssityön näkökulma; Karttaseppä ei ole tällä tilillä).** Karttaseppä tarkistaa merkityt kohdat
seuraavalla vuorollaan ja poistaa merkinnän.
- **Muodon lukitus:** Linssiseppä lukitsee `MUOTO.md`:n proto-sha:lla vasta, kun Ytimen lukija ja testi lukevat Karttasepän
  esimerkkitiedoston ilman virheitä; lukitsemisen jälkeen uusi kenttä tulee lisäkenttänä (kohta 2), eikä Ydintä muuteta arvaamalla.
- **Koko ja suorituskyky:** pelin JSON pidetään kokonaisena yhtenä tiedostona `Linssit/Resources/<Aihe>/`; ilmoita tuloksen koko
  tavuina PR:ssä. Jos tiedosto kasvaa niin, että avaus hidastuu laitteella, jako vuosittain sovitaan muodossa ennen dataa.
  *PT 20.10.2026: jako vuosittain, kun tiedosto ylittää 5 Mt tai linssin avaus laitteella hidastuu mitattavasti (Kiina 0,56 Mt on yksi tiedosto).*
- **Tihennys ja kolmiointi:** Ydin kolmioi monikulmiot itse; reiät ja päällekkäisyydet rikkovat kolmioinnin, joten kohdan 3 säännöt
  ovat kolmioinnin ehtoja, ja Linssiseppä tarkistaa ne Ytimen testillä ennen kytkentää. *PT 20.10.2026: Ytimen testi on totuus;
  piirtotyökalun assert tarkistaa samat ehdot, ja ristiriidassa työkalu korjataan Ytimen mukaiseksi.*
- **Kopio protoon:** `cmp` mainin ja proton tiedostosta ennen jokaista junapyyntöä; ero = palautus Karttasepälle, ei käsikorjausta.

### Natiivi-UI
*(kehys (lasipohja, KEHYS-KÄÄRÖ alle 250 ms), aikaselain, nimikkeet ja sinettileima, iPhone pysty ja iPad. Täydentää Natiivi-UI.)*

### Sisältökirjuri
*(Sisältökirjuri 17.10.2026, Kiinan dynastiat -linssin tekstityön pohjalta; ei uusia sääntöjä. Tekstien yleinen tuotanto: `kertojan-teksti-ja-aani.md`,
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
6. **Ääni** (Äänittäjä, ääniportti): kertojaäänillä on omistajan pysyvä lupa. Muissa generoinneissa (musiikki, äänimaisema, muut
   äänet) määrä ja tekstit viedään ensin omistajalle KK:n kautta, eikä generoida ennen lupaa. Numerot kirjoitetaan sanoiksi ennen merkkimäärän laskemista; "eaa." kirjoitetaan "ennen ajanlaskun alkua".

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

**Tekstin valmiin määritelmä (täydentää lukua 4):** jokaisella avainvuodella tarinarivi; tarkistus tehty ja tallennettu;
Tekstit-osastossa kaikki tekstit tilalla "odottaa hyväksyntää" tai "hyväksytty"; ääni lupasääntöjen mukaan (kertoja pysyvä lupa, muu KK:n kautta); `.md`, `.json` ja Tekstit-osasto
ovat samat sanatarkasti.

**Aikataulu:** tekstit ehtivät rinnan koodin kanssa (vaiheet 3–5); aloita tarinariveistä heti, kun Karttasepän `MUOTO-*.md` on
valmis. Faktatarkistus ja riippumaton tarkistus ajetaan agenteilla (vain Opus/Sonnet); levyhädän aikana ei agentteja.

**Linssisepän täydennys 20.10.2026 (linssityön näkökulma; Sisältökirjuri ei ole tällä tilillä).** Sisältökirjuri tarkistaa merkityt
kohdat seuraavalla vuorollaan ja poistaa merkinnän.
- **Tunnukset kytkentää varten:** jokaisella tarinarivillä ja kortilla on pysyvä tunnus (`<linssi>-<vuosi>` tai `<linssi>-<aihe>`),
  jota Linssiseppä käyttää koodissa; tunnusta ei vaihdeta tekstin muuttuessa (uusi versio = sama tunnus, uusi teksti Tekstit-osastossa).
- **Pituus näkymään:** rivin pituus tarkistetaan pelinäkymässä iPhone pystyssä ja iPadilla (luku 4, tuore lukija); jos rivi ei mahdu
  kehykseen, Linssiseppä palauttaa sen lyhennettäväksi, ei lyhennä itse. *PT 20.10.2026: raja on se, mikä mahtuu
  KEHYS-KÄÄRÖÖN ja lasipohjaan iPhonella pystyssä; Linssiseppä mittaa sen ensimmäisistä esimerkkiriveistä (UUDET TEKSTITYYPIT) ja kirjaa luvun tähän.*
- **Lukeeko peli tekstin:** kortit ja rivit luetaan `KortinLukija` → `Puhe.Lue`; Linssiseppä kertoo SK:lle ja Äänittäjälle ennen
  äänitilausta, lukeeko linssi tekstin suoraan (Äänittäjän kohta 1).
- **Yksi totuus:** Linssiseppä lukee `.json`:n sellaisenaan protoon (kuten aineisto, `cmp`); `.md` ei ole kytkennän lähde.
  *PT 20.10.2026: `data/linssit/<linssi>/<linssi>-puherivit.json` (malli `kiina-puherivit.json`), kentät tunnus, teksti, lähteet ja tarkistustila.*

### Äänittäjä
*(kertoja ja äänimaisema linssille, ääniportti; ks. `kertojan-teksti-ja-aani.md`. Täydentää Äänittäjä 17.10.2026; vain nykyisten ohjeiden ja Kiinan dynastiat -linssin (30 tekstiä) opit, ei uusia sääntöjä.)*

Äänittäjän osuus alkaa vasta, kun Sisältökirjuri on viimeistellyt tekstit (vaihe 4) ja PT on hyväksynyt ne; Äänittäjä ei kirjoita tarinatekstiä eikä tee pelikytkentää.

1. **Lukutarkistus ensin.** Kysy kytkijältä, lukeeko peli linssin kortit ja kertorivit jo suoralla lukijalla (`KortinLukija` →
   `Puhe.Lue`, kertoja William). Jos lukee, esiäänitystä ei tehdä eikä lupaa pyydetä (`kertojan-teksti-ja-aani.md` kohta 2.1).
   Tarvitaan vain, jos linssi soittaa tiedoston manifestista (kuten luennat tai kertoja-nauha).
2. **Teksti = Tekstit-osaston `.json`-totuus.** Äänitettävä teksti otetaan sanatarkasti Tekstit-osastosta tunnuksilla
   `<linssi>-<aihe>` (Kiina: 30 tekstiä, tunnukset `kiinan-dynastiat-*`), tilana "hyväksytty". Tilassa "odottaa KK:n
   hyväksyntää" olevia ei äänitetä. Muuttunut teksti → vanha luenta `mykistetyt`-kenttään (kohta 9) ja uusi nimi (`-v2`).
3. **Puhuttu muoto ja merkkimäärä.** Luvut sanoiksi, "eaa." = "ennen ajanlaskun alkua" (`\beaa\.`), nimien ääntämysvihjeet; kaikki
   ENNEN merkkimäärän laskua. Lupapyynnön merkkimäärä lasketaan puhutusta muodosta (Kiina: laske kaikki 30 tekstiä yhtenä
   lukuna ja lisää varaus uusintaan).
4. **Lupa.** Kertojaäänellä (William, `eleven_v4_turbo`) on pysyvä lupa PT:n hyväksymiin teksteihin; muut äänet (musiikki,
   äänimaisema, Pulu, isoisä) vain KK:n suoralla "OMISTAJAN PÄÄTÖS klo …" -rivillä, jossa on tekstit, leikemäärä ja
   merkkimäärä. Jokainen lisäys tai ylitys vaatii uuden luvan.
5. **Lukumäärän ja merkkien katto ajossa.** Aja generointi skriptillä, jossa on kaksi estoa: merkkiraja (`RAJA`) ja leikemäärän
   katto (`KATTO`, viety + uudet). Ajo pysähtyy ENNEN ylitystä (luentaerät 17.10.: merkkiraja piti, mutta lukumäärää ei
   tarkistettu ja katto ylittyi 6 kappaleella; `docs/raportit/luennat-era4-oppaat-kaupunkilehdet-20261017.md`). Kuiva ajo
   ensin: kappaleet, puhutut merkit ja kustannus mitatulla hinnalla (n. 0,23 krediittiä/merkki, `curl /v1/user/subscription`
   ennen ja jälkeen); vertaa manifestiin ja säilöön, ettei jo olemassa olevaa generoida uudelleen.
6. **Pieninä erinä.** Jaa kappaleet pieniin eriin (kuiva → ajo → paketti → vienti), jotta omistajan kehys ja kattomäärä pitävät
   ja virhe maksaa vain yhden erän. Raaka PCM talteen T7:lle (`Matkakirja-aanimasterit/`), ei poisteta.
7. **Manifesti kumulatiivisena, uusi polku joka kerta.** Uusi manifesti = uusi versiopolku (`v5`, `v6`…) ja sisältää edelliset
   rivit täysillä osoitteilla + uudet; peli lukee yhden manifestin. Ilmoita Siirtosepälle (tai kytkijälle) täsmällinen vaihto
   (asetus ja URL) ja varmista ämpärin vastaus 200.
8. **Ääniportti ja vienti.** `vie-paketti.sh` ajaa ääniportin (true peak, kovuus) ja kieltäytyy ylikirjoittamasta; paketissa
   `LAHTEET.md` (lisenssi, malli, ääni, nopeus, omistajan päätöksen aikaleima) ja `SHA256SUMS`. Kuuntelu ei ole portti.
9. **Raportti PT:lle.** Yksi rivi (3 riviä enintään): kappaleet, merkit, krediitit, manifestin URL, sha; yksityiskohdat
   tiedostoon `docs/raportit/`.

## 9. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttui pohjassa.

- **19.10.2026, taidemuseon Leiden ja Kööpenhaminan kippi (juna 204).** Kohdepatsaan esilataus (4 s) riitti kevyellä koneella
  (12.43) mutta ei kuormassa (13.49, load 110): perillä tyhjä jalusta. Muuttui: pääkohteelle oma 10 s:n odotus mustan alla
  (cb166ad2b), ja todistus luetaan lokin "esilataus valmis … ladattu" -rivistä eikä vain kuvasta. Kipin havainnekuvan todistus vaati
  viisi simuajoa koordinaattinapautusten takia (pikkukuva siirtyi, himmeät napit, väärä komentoreitti). Muuttui: skenaariot QA-
  komennoilla ja nimillä (luku 7, virheet 9–11). KK:n katselmus löysi k8:sta samat viat kuin hylätyistä Tivoli-kuvista, koska
  tilaus tehtiin ilman aiemmin hyväksyttyä aitousvaatimusta. Muuttui: tavoitteen muoto ja sen hyväksytyt vaatimukset tilauksen
  pohjaksi (luku 0).
- **19.10.2026, Kamerajohtaja (omistaja 08.20).** Mona Lisan nykäys johti yhteen kamerajärjestelmään: nimetyt liikkeet, leikkaus
  vain peitettynä, esilataus ennen liikettä, kameravahti `tarkista.sh`:ssa ja kameratestit CI:ssä (luku 3). Opittu: simuvideon
  hyppy ei todista pelin hyppyä; kameraloki ja ruutuvahti ensin.
- **17.10.2026, Kiinan dynastiat valmiiksi (juna 198).** Muotoehdotus Karttasepälle ennen dataa toimi: 241 kerrosta tuli kerralla
  oikeassa muodossa, ja epävarmat taistelupaikat lisättiin myöhemmin kenttänä (`alue`) ilman muutosta muuhun. Hidasti: käännös- ja
  simuvuorot yöllä (yksi kerrallaan), joten koodi valmistui tuntia ennen ensimmäistä kuvaa. Muuttuu: QA-komento jokaiselle
  siirtymän tilalle (`siirtyma 0,3`) heti, jolloin yksi simuajo todistaa koko animaation (kultainen polku 9).
- **17.10.2026, Kiinan dynastiat, tekstit (SK).** Kolmen tarkistajan faktatarkistus (16.10.) ei riittänyt kertojateksteille: riippumaton
  tarkistus 17.10. löysi 7/19 kertorivistä ja 4/9 kortista korjattavaa (pääkaupungin siirtäjä, "laajimmillaan", ruutireseptikirja,
  puupainannan alku). Muuttuu: riippumaton tarkistus on oma vaiheensa (SK-osuus kohta 4), ja `.json` on tekstien yksi totuus.
- **16.10.2026, Kiinan dynastiat pallolle.** Ensimmäinen versio oli litteä kuva; omistaja halusi pelin pallon. Muuttuu:
  ensimmäinen kuva pelistä pallolla (kultainen polku 2), ja värit kysytään pallokuvilla (Qing viileä sininen).

## 10. Lähteet

Raamattu: TUOTANTOPOHJAT, TUOTANTOPOHJIEN SANASTO, LINSSIT — YHTEISET SÄÄNNÖT, LINSSIT EIVÄT KUULU RAJAUKSEEN, LINSSIT KYTKETÄÄN
VAIN MATKALAUKUSTA, UI-POHJAT, DATALINSSIT (lisenssit); loki `docs/raamattu-loki/paatokset-2026-10.md` #PAATOKSET 16.10.2026 klo
18.3x: KIINAN DYNASTIAT -LINSSI, #… klo 19.19: KIINAN DYNASTIAT -LINSSI KARTTAPALLOLLE, #… klo 20.35: QINGIN VÄRI VIILEÄ, ja
`#OMISTAJAN PAATOKSET 17.10. YO`: JULKAISU, KIINAN DYNASTIAT, KEHYS-KAARO; `docs/linssikatalogi.md`;
`data/linssit/kiinan-dynastiat/MUOTO-KERROKSET.md`; `docs/moduulit/linssit.md` (webin linssisopimus);
`docs/moduulit/tuotantopohjat/historiapeli.md`, `kertojan-teksti-ja-aani.md`; Linssisepän luovutukset 16.–17.10.2026
haarassa `linssiseppa-tyo-20260923` (`docs/raportit/viesti-linssiseppa-luovutus-20261016-2349.md`, `…-20261017-0157.md`).

Lisäykset 19.10.2026: Raamattu 4.1 UI-POHJAT, 4.21 TUOTANTOPOHJAT (kaksi mietintäkierrosta, omistaja 14.50), 4.24 KAMERALIIKKEET,
2.68 KAMERA-AJOT, 2.69 EI PYÖRITYSTÄ, 8.1 VALMIIN MÄÄRITELMÄ, 9.11 (omistaja ei ensimmäinen tarkistaja); loki
`docs/raamattu-loki/paatokset-2026-10.md` #KAMERALIIKKEET ILMAN NYKAYKSIA (19.10.2026 klo 08.24), #CODEX KAIKEN GRAFIIKAN
TYOSTAJANA (klo 08.31); kuvakäsikirjoituksen malli `docs/kohtaukset/pallokierros/pariisi-nykyintro.md`; Linssisepän luovutukset
18.–19.10.2026 haarassa `linssiseppa-tyo-20260923` (`docs/raportit/viesti-linssiseppa-luovutus-20261018-1405.md`, `…-20261019-1141.md`, `…-20261019-1337.md`);
proto-git haarat `linssiseppa/kamerajohtaja-204`, `linssiseppa/museo-kamerajohtaja-204`, `linssiseppa/koopenhamina-kuvat-204`.
