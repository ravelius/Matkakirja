# Pelikoodarin luovutus 25.9.2026 klo 21.0x (lepo 22.30:een, Fablen käsky)

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260925-yo2.md`. Merge-pyynnöt ja kuvaukset ovat tiedoston
`/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md` lopussa.

## 1. Valmista tällä sessiolla
- **Esilataaja erät 2+3** `pelikoodari/esilataaja-3` 64794fe8 (sis. esilataaja-2 eaf5b352 ja lampo-2 3cf6ae5b) → JUNASSA juna/b13 6cc01294; aiemmin merge-pyyntö
  Natiivisepälle. Raja "saapuminen 0 ms" PASS kylmänä ja lämpimänä (lokit/verkko-odotus/era2-*, era3-*); aloituspuhe
  515 → 0 ms, luenta 798 → 0 ms. Erä 3: `Esilataaja.Joutilas` (kohta 4) ja `SiirtoKohteetMuuttui`-ennakointi (kohta 5),
  `PeliOhjain.Esilataus.cs`; kylmän käynnistyksen kilpailutilanne korjattu (puheet odottavat luennat.json:ia).
  Raportti web #3240 (mergetty, esilataus-nykytila luku 5). Savuke: `ENNAKOINTI=1 Peli-testit/verkko-savuke.sh …`.
- **Esilataaja erä 4** `pelikoodari/esilataaja-4` 4e4fc18b (esilataaja-3:n päälle) → JUNASSA juna/b13 ac0aaadc (build 17):
  levysiivous 2 Gt (Levysiivous + LevyKarsinta, testit), kuvien LRU tavuina 200/300 Mt, Siirtosepän tiedostoväylä
  (`Kohde.Tiedosto`, `Pyyda`, `RyhmaValmis`, `PeruRyhma`; Range todennettu lokit/esilataaja-4-testi). Komennot `levy [Mt]`,
  `tiedosto osoite polku`. Siirtoseppälle ilmoitettu.
- **Lepopiirto todennettu** natiivi-ui/lampo d0a187db:n kanssa (käännös 318a3030): Ateena levossa Paikallaan,
  piirretty 2–3 / 150 kehystä, nosto aukeaa ja sulkeutuu levosta (lokit/lepopiirto/).

## 2. AVOINNA
1. **PallonLepo** kytketty Ruudunpaivitykseen Natiivisepän toimesta (165521fc, Fablen käsky) — ei Pelikoodarin työtä.
2. **Kohta 6 ja linssien joutilasdata**: Linssiseppä kytkee itse rajapinnan kautta (klo 22.30 jälkeen), kopio merge-pyynnöstä tulee.
3. **Fablen päätös tehty ja toteutettu**: paketin päivitys (Kohta.Kaynnistys) jatkaa kuumana ja virransäästössä (4e4fc18b,
   todennettu lokit/esilataaja-4-kuuma). ruutu/verkko/levy/lampo kirjautuvat ok-rivinä (Laitetestaajan havainto).
4. Lehtien kuvat joutilaana: WKWebView'n välimuisti (Natiivi-UI:n alue), ei tehty.
5. Laitemittaus (Natiiviseppä iPad Pro 13, Laitetestaajan vartija) kuten edellisessä luovutuksessa.

## 3. Opit
- Taso Muu odottaa aloitusnäkymän laattoja (Laattapalvelin.Kiireinen): testikomennon tulos voi viipyä; odota lokiriviä.
- `ui rauha erot` ei näe pelkkää MarkDirtyRepaintia; `ui rauha laskurit` kertoo kerroksen.
- Vertaa epäilyttävää lepokuvaa aina käännökseen ilman lepoa ennen kuin nimeät syyn (yläpalkin puuttuminen oli pelin tila).

## 4. Lisäys klo 23.1x: KEHYKSEN HINTA LEVOSSA, CPU (Fable 22.4x)
- Mittari `pelikoodari/cpu-mittari` (CpuMittari.cs; `cpu profiler | lista | mittaa [s] [-|suodatin|kaikki] [piirto]`;
  Development-simulaattorikäännös `MATKAKIRJA_KEHITYS=1 proto-kaanna.sh …`) ja korjaus `pelikoodari/kehys-cpu`
  (KaupunkiMerkit + Nimikerros eivät ladota piirtämättömässä kehyksessä) → merge-pyynnöt Natiivisepälle.
- Raportti web-PR #3250 `docs/raportit/kehyksen-hinta-20260925.md` osio CPU: pääsäie levossa 2,8 / 4,0 ms (PAIKALLAAN / LEPO,
  iPad11-simulaattori); CPU ei ole 16 ms:n este. Mittausskripti: lokit/kehyksen-hinta/ (ajo: lokit/kehyksen-hinta/cpu.sh; PROFILER=1 ODOTUS=60 KESTO=15 cpu.sh <app> <UDID> <kansio>).
- AVOINNA: Natiivisepän vastaus Cesium3DTileset.Updaten ohittamisesta levossa (0,5 ms); laitemittaus cpu-komennolla
  Development-laitekäännöksessä; laitemittauksen tuki (vartija + osuma-% laitteella) Fablen listalla toisena.
- Linssiseppä teki kohdan 6 osittain (linssiseppa/esilataus adca3817); radio, topografia ±1 ja mastot/yövalot jäivät hänen seuraajalleen.

## 5. Lisäys 26.9. klo 00.5x: omistajan löydökset (Fable 25.9. klo 23.x)
- 134 nosto aukeaa välittömästi: `pelikoodari/nosto-avaus` (Kartta/Korutiini.cs, Nostokortti.Avaa + avaus-lokirivi) → merge-pyyntö.
  Näkyvä 267 → 67 ms, valmis 466 → 267 ms (lokit/nosto-avaus/). Natiivi-UI tekee häivytyksen/kuvan osuuden.
- 145 kynnys 2 → 1: web-PR #3256, natiivi `pelikoodari/loydos145` → merge-pyyntö. Fablelle: ohjelause yksikössä, Raamattu rivi 2175.
- 125 symbolit: lista lokit/loydos125-symbolit.md → Natiiviseppä; Siirtoseppä lisäsi `karttavalot.laji` (PR #3260, skeema 1.44).
- 135 kortin koko: lista Natiivi-UI:lle, he tekivät (natiivi-ui/nostot-130). Fablelle: kumoaa E3:n, muuttuuko web.
- 137 vieritys: `pelikoodari/vieritys` (UI/VieritysHeratys.cs: ScrollViewin hitausliike herättää täyden taajuuden; komento
  `vieritys [koe|pois|paalle|nollaa]`) — MITTAUS KESKEN (käännös jonossa; simulaattorin kosketuslupaa ei ole, siksi `vieritys koe`).
- 122: odottaa Natiivi-UI:n tekstin piilotusta, sitten todennus että luenta kuuluu.
- Linssisepän äänitoiveet (linssien-aanitoiveet-20260925.md) tulivat minulle: Fablelta ei ole annettu äänisuunnitelmaa — kysy.

## 6. Lisäys 26.9. klo 04.0x
- Build 17 leikattiin 03.43 (d04841a0). Build 18:n ensimmäiseen erään (merge-pyynnöt Natiivisepällä):
  `pelikoodari/loydos149` 0e534bef (sis. `pelikoodari/vieritys` 059f7709; 137 mitattu 31 → 60 fps, 149 media.json/atominen
  levy/4xx ei uusita/vartija `nostokuvat ISO`) ja `pelikoodari/tehoste-rekisteri` ba1547ba (Aanet.RekisteroiTehoste).
- Junassa (build 17): linssi-aani f12c0448 (ILinssiYmparisto.Tehoste/Taustaaani, astro-humina), nosto-avaus, loydos145, cpu-mittari, kehys-cpu.
- 122 todennettu (lokit/loydos122): ei tekstiä lennolla, luenta kuuluu.
- Web-PR:t: #3272 musiikki- ja äänisuunnitelma (8 omistajan päätöstä), #3274 löydös 135 web (agentti), #3250 kehyksen hinta CPU.
- Datavirhe: GRC heraion ja korintin-apollon-temppeli puuttuvat ämpäristä (Sisältökirjuri).
- Opit: proto-kaanna.sh ei tulosta merge-konfliktia stdoutiin (exit 13) — katso kaannospalvelu/<aika>.log; Burst AotLinkerException oli ohimenevä.
- SEURAAVA: Elävä kartta — nostojen kokoluokat (pääkohde/kohde/pieni) ja "unohdettu" tila (himmeä musteen jälki), maakunnan
  laskuri ja salaisuus-nosto; logiikka web+natiivi, piirto Natiiviseppä, data Siirtoseppä (skeema 1.45), GRC-taulu #3263.

## 7. Lisäys 26.9. klo 04.3x
- Build 18 -junassa: loydos149 (+vieritys), tehoste-rekisteri, linssi-aani.
- ELÄVÄ KARTTA pelilogiikka: `pelikoodari/elava-kartta` 3ef13a97 (Peli/KarttaMuste.cs + PeliOhjain.Muste.cs, Pelitila.LoydetytNostot
  "nostotLoydetty", Natiivi-UI:n NostoAvattu-kytkentä mukana) → merge-pyyntö Natiivisepälle. Todennettu lokit/elava-kartta/.
  Data: skeema 1.45 (kokoluokka, maakunta) ja 1.47 (kokoelma maakuntasalaisuudet, Siirtoseppä #3285).
  Avoinna: piirto (Natiiviseppä), kartussi (Natiivi-UI), salaisuus-kortti NostoSisalto:n "salaisuus:"-etuliite (Natiivi-UI).
- Web-PR:t auki: #3272 musiikki- ja äänisuunnitelma, #3274 löydös 135 web, #3250 kehyksen hinta CPU.
- Jono tyhjä → kysytty Fablelta seuraava.

## 8. Lisäys 26.9. klo 04.4x
- Build 18 -junassa: elava-kartta 3ef13a97 (Fable kuittasi; WEB EI — Raamattu "vain natiivi").
- Merge-pyynnöt Natiivisepällä (build 18):
  - `pelikoodari/humina-muunnelmat` 7d41a3df: linssin taustaääni ilman maiseman kompressoria, ulosfeidi 600 ms (Linssisepän
    mittaus), Aanet.RekisteroiTehoste muunnelmalistalla.
  - `pelikoodari/verkko-raja` 0e3335e2: esilatauksen mittarit laitteelle (`verkko raja [vaihe]`, KehysMittari-rivi
    verkkoOdotusMs/saapuminenVerkkoMs/osumaPros). Mitattu b18: saapuminen 0 ms PASS kylmä+lämmin; istunto 1 214 / 313 ms,
    osuma 32 / 84 % (lokit/verkko-odotus/b18-*).
- Lepopiirto b17:ssä ei toteutunut (Laitetestaaja): Natiiviseppä korjasi build 18:aan (SykeJaatyy = true).
- Jono tyhjä; odotan Fablen seuraavaa.

## 9. Lisäys 26.9. klo 04.5x (LUOVUTUS, kiintiö täyttymässä)
- Build 19:n ensimmäiset (Fable: heti build 18 -kierroksen jälkeen, Natiiviseppä mergeää kun Fable ilmoittaa):
  `pelikoodari/verkko-raja` bd27ed1d (mittarit laitteelle + hakurivit) ja `pelikoodari/humina-muunnelmat` 7d41a3df.
- KOHTA 1 -analyysi valmis: proto-3d/lokit/kohta1-kaynnistys-20260926.md → Natiiviseppä (buildiin: nostotyyppien merkit,
  pulun kuva, aloitusnäytön perusdata, satelliitin Z5). Tarjottu Fablelle: uusin.json-tarkistus taustalle (1 259 ms estää
  käynnistystä) + Esilataajan yhteinen haku (kaupungit.json 4×). ODOTTAA Fablen päätöstä.
- Worktreet: proto-pelikoodari-{elava,humina,mittarit} (mergeämättömät / junassa, poista kun masterissa), web
  pelikoodari-{kehyksen-hinta-cpu,loydos135-web,musiikkisuunnitelma} (PR:t #3250/#3274/#3272 auki).

## 10. JONO build 19:ään (Fable 26.9. klo 04.5x, hyväksytty)
1. uusin.json-versiotarkistus taustalle (ei estä pelaamista, nyt 1 259 ms käynnistyksessä). TARKISTA ENSIN Siirtosepän
   taustapäivitys vaihe 2 (`siirtoseppa/paketti-paivitys` 99f049ec, merge-pyynnössä), ettei synny kahta mekanismia; jos se
   kattaa tarkistuksen, vain kytkentä.
2. Yhteinen haku Esilataajaan: sama osoite rinnakkain = yksi haku (kaupungit.json 4× → 1×, karttavalot/maarajat/reitit 2×).
3. Käynnistyksestä pois kohtien 3 ja 6 sisältö: kaupunkilehdet.json (16 Mt) vasta valitun kaupungin lennolla; linssien ~20
   datatiedostoa ja Ihmisen matka II:n kuvat vasta linssiä avattaessa (koko kaari pienenä heti, kaksi pysäkkiä täysinä).
Mittaus: `SIMCTL_CHILD_MATKAKIRJA_HAUT=1 Peli-testit/verkko-savuke.sh …` (haara verkko-raja) → verkko-haut.jsonl; vertailu
lokit/verkko-odotus/b18-kylma-haut/. Kohta 1 -paketointi on Natiivisepän.

## 11. Lisäys 26.9. klo 05.0x
- Build 19 -junassa: verkko-raja bd27ed1d, humina-muunnelmat 7d41a3df.
- JONO 1 TEHTY (merge-pyyntö): `pelikoodari/osoitin-taustalle` b74983a6 — lämmin käynnistys käyttää tallennettua osoitinta
  heti, tuore uusin.json taustalla; PakettiPaivitys valitsee kuten ennen. Toiminta todennettu lokista. AJOITUSVERTAILU
  MITTAAMATTA LUOTETTAVASTI (paketti v141 julkaistiin kesken) → mittaa vakaalla paketilla: kylmä ajo, sitten 3 lämmintä
  SAMALLA käännöksellä molemmille (LAMMIN=1 ei asenna uudelleen! ennen-käännös pitää asentaa kylmällä ajolla ensin).
- JONO 2 (yhteinen haku Esilataajaan) ja JONO 3 (kaupunkilehdet/linssidata/II-kuvat pois käynnistyksestä) AVOINNA.

## 12. Lisäys 26.9. klo 05.1x
- Build 19 -junassa myös osoitin-taustalle b74983a6. Natiiviseppä tekee kohdan 1 tilannekuvan (osoitin buildiin kylmälle).
- JONO 2 (yhteinen haku) koodattu: `pelikoodari/yhteinen-haku` 1967620d-käännös (Sisalto.HaePaketista jakaa käynnissä olevan
  haun; PeliOhjain.HaeTiedosto sen kautta). Päällekkäiset: kaupungit.json 4→1, karttavalot 2→1, reitit 2→1 (lokit/verkko-odotus/
  yhteinen-kylma). Jäljellä linssien oma reitti (LinssiSisalto: maarajat, maat, radiot) → Linssiseppä. Vertailuajot
  vert-{raja,yhteinen}-1..4 käynnissä: kylmä sisältöodotus 3,3 s yhdessä ajossa (paketti v143 vaihtui) → tarkista ennen
  merge-pyyntöä, ettei jaettu odotus pidennä käynnistystä.
- OMISTAJA HYVÄKSYI musiikki- ja äänisuunnitelman kaikki 8 suositusta (Fable 05.0x). GENEROINTI ERISSÄ: vaihe 1
  (johtoaihe + 3 koeraitaa: aloituslento, saapuminen Välimeri, loppu) ensin, jokainen erä omistajalle (mp3-linkit + rivi/raita)
  ennen seuraavaa. Avaimet vain Macin ympäristöstä (GOOGLE_API_KEY), ei lokiin. Työkalut tools/lyria.mjs, generoi-musiikki.mjs,
  generoi-siirtymamusiikki.mjs. Aloita kun kiintiö sallii.

## 13. Lisäys 26.9. klo 05.2x — JONO 2 EI VALMIS (taantuma)
- `pelikoodari/yhteinen-haku` 1967620d: päällekkäiset haut vähenivät (kaupungit 4→1), MUTTA kylmä sisältöodotus piteni:
  vuorotellen ajetut kylmät (lokit/verkko-odotus/vert-*): ennen 1 159 / 915 ms (30/35 hakua), jälkeen 1 438 / 1 496 ms (38/40).
  Todennäköinen syy: PeliOhjain.HaeTiedosto → Sisalto.HaePaketista tuo pelin haut käynnistyksen sisältöodotuksen ikkunaan
  (ja Taustalla-kierros). EI merge-pyyntöä. SEURAAVA KOE: pelkkä Sisalto-sisäinen jako (peru PeliOhjain-muutos, commit
  "Yhteinen haku: …" → jätä vain Sisalto.cs:n haussa/Jaa), mittaa samoin (4 vuorotellen kylmää, SIMCTL_CHILD_MATKAKIRJA_HAUT=1).
- JONO 3 (kaupunkilehdet/linssidata/II-kuvat pois käynnistyksestä) avoinna. Musiikin generointi vaihe 1 avoinna.

## 14. Lisäys 26.9. klo 05.4x — JONO 2 merge-pyynnössä
- `pelikoodari/yhteinen-haku` 7875bd13 (vain Sisalto-sisäinen jako; PeliOhjain-reititys peruttu): ajoitus neutraali
  (vert2-*: ennen 930/1 274, jälkeen 1 346/1 006 ms), kaksoishaut kaupungit 4→2, karttavalot 2→1 → merge-pyyntö Natiivisepälle.
- Jäljellä kaksoishaut: peli-reitti (kaupungit, reitit) ja LinssiSisalto (maarajat, maat, radiot) — kerro Linssisepälle.
- AVOINNA: jono 3 (kaupunkilehdet 16 Mt, linssidata, II-kuvat pois käynnistyksestä), musiikin generointi vaihe 1,
  osoitin-taustalle-ajoitusuusinta kun Natiivisepän kohta 1 -tilannekuva on junassa.

## 15. Lisäys 26.9. klo 05.5x
- JONO 3 (osa): `pelikoodari/lehdet-perassa` 37ad3444 (UiSisalto: kaupunkilehdet Valmis-tilan jälkeen, LehdetSaapuivat) →
  merge-pyyntö; kylmä aloitusverho 5 336 ms (aiemmin 8–9,8 s; mukana Natiivisepän kohta 1). Natiivi-UI: KaupunkiKortti
  kuuntelee LehdetSaapuivat. Seuraava: Siirtosepän skeema 1.48 kaupunkilehdet/<id>.json → vain valitun kaupungin lehti lennolla.
  Linssien käynnistyslataukset tekee Linssiseppä (lupasi); yhteinen-haku d2e21ee0 junassa → LinssiSisalto siirtyy siihen.
- MUSIIKKI VAIHE 1 GENEROITU ja ämpärissä (omistajalle Fablen kautta kuunneltavaksi): musa-{johtoaihe,aloituslento,
  saapuminen-valimeri,loppu}-lyria.mp3. Lyria EI noudattanut kestoja (63/62/100/72 s) → lyhyet tunnukset leikataan hyväksynnän
  jälkeen. Työkalu: web-haara pelikoodari-musiikki-vaihe1 (ryhmä vaihe1 + lyria.mjs mkdir-korjaus) — tee PR kun omistaja
  kuunnellut. Ajo: gh workflow run generoi-musiikki.yml -R ravelius/Matkakirja --ref <haara> -f raidat=vaihe1 -f moottori=lyria.

## 16. Lisäys 26.9. klo 07.2x
- Junassa: lehdet-perassa 0bdb771b (+ Natiivi-UI kortti-lehdet). Elävän kartan ketju todennettu tuotantodatalla v146/v149
  (lokit/elava-kartta-v146, -v149): 14 GRC-maakuntaa, kokoluokat datasta, Ayion Oros 1/1 → salaisuus "Athos-jättiläinen" näkyviin.
- `pelikoodari/lehti-kaupungeittain` 3779473c (skeema 1.48, v151) → merge-pyyntö: UiSisalto.LataaLehti(id) pelaajan kaupungille,
  lennon kohteelle, ennakoiduille ja avatulle kortille; 404 → koko kokoelma kerran. Kylmä: ateena 81 kt lennolla, aloitusverho 4 052 ms.
- Havainto Siirtosepälle: PakettiPaivitys lataa v151:n kokonaan taustalla (266 lehteä + koko 16 Mt) → kysytty rajausta.
- Musiikki vaihe 1: odottaa omistajan kuuntelua (Fablen kautta), PR työkalumuutoksista kun hyväksytty.
- Junassa: lehti-kaupungeittain 3779473c (Natiiviseppä). Siirtoseppä: taustapäivitys siirtää lehtiä pakattuna vain ~5 Mt (koko 2,1 +
  266 kpl 2,9 Mt), kerran per versio. Koko kaupunkilehdet.json jää, kunnes LehtiSisalto.cs:144 (kaupungin lehti → kaupungeittain)
  ja PuluHaku.cs:252 (indeksi kaikista 266) eivät enää lue sitä (Natiivi-UI); sitten Siirtoseppä ohittaa kokonaisen PakettiPaivityksessä.
- Linssisepän "maakunta puuttuu" oli väärä tunnus (nosto:marathon ↔ karttavalo kohde:marathon); v151: 2 782/2 963 riviä maakunnalla.

## 17. Lisäys 26.9. klo 08.2x — MUSIIKKI VAIHE 1 HYVÄKSYTTY, leikattu ja kytketty
- Omistaja hyväksyi vaiheen 1 (06.0x). Valmiit ämpärissä nimillä musa-{johtoaihe,aloituslento,saapuminen-valimeri,loppu}-lyria.mp3
  (60,5 / 26,0 / 9,4 / 69,1 s); raa'at -raaka.mp3. Cloudflare-reuna tyhjennetty (CLOUDFLARE_API_TOKEN Macin ympäristöstä).
- TASO −11 LUFS, EI −33 (Fable hyväksyi): pelin nykyiset musiikkiraidat mitattu noin −11 LUFS. Docs-PR #3302 (suunnitelma 1.3).
- Työkalu `tools/viimeistele-musiikki.mjs [nimi] [--vie]` (web-haara pelikoodari-musiikki-vaihe1): leikkaus RAIDAT-taulusta,
  häivytys, lineaarinen −11 LUFS, huippu ≤ −1 dBFS, raaka talteen -raaka, reunan tyhjennys. Uusi generointi samalle tunnukselle
  ylikirjoittaa valmiin → poista vanha -raaka ja aja työkalu perään.
- Natiivi: `pelikoodari/musiikki-vaihe1` bec3e2e2 (junan fdc47632 päällä) → build 20 (Fable: ei build 19). AaniTila.Aihe
  (aarreaiheen paikka), AloituslentoAlkoi, UusiKaupunki (vain ensimmäinen käynti, ei katkaise soivaa aihetta), MatkaLoppui
  (huipennuksen alla, UiNakymat.NaytaHuipennus). Paketin tuleva rivi `musiikkiaihe` (Siirtoseppä). Etusivun johtoaihe tulee
  paketin paikkaraita-rivistä, kun web julkaistaan (natiivin oletus jätetty musa-etusivuksi: kultaiset = web). 285/285, unity 0.
- Web-kytkentä: agentti samassa web-worktreessä (etusivu → musa-johtoaihe, aloituslento, saapuminen Välimeri, loppu) →
  PR Julkaisijan junaan.
- Vaihe 2: kysytty Fablelta laajuus (käsky "maanosat + tunnuskaupungit" vs suunnitelman §5 jako).

## 18. Lisäys 26.9. klo 08.5x — SEURAAJALLE (kiintiö ~98 %)
MERGE-PYYNNÖT NATIIVISEPÄLLE (build 20), kaikki juna/b13 fdc47632:n päällä, 285/285, unity 0:
- `pelikoodari/musiikki-vaihe1` 4218bbd8: musiikin vaihe 1 natiiviin. TODENNETTU simulaattorilla A2FD9C9F (f994e4eb,
  lokit/musiikki-v1/ajo1): aloituslento soi lennolla 0,07 pohjan väistäessä 0,01, Välimeren tunnus Ateenassa,
  Lontoossa ei mitään, loppu soi. Komento `aani aihe aloituslento|loppu|kaupunki <id>` (tulos lokiin). Merge-pyyntöä EI vielä lähetetty.
- `pelikoodari/kuljettu-reitti` e5ee31dc: Linssisepän rajapinta (PeliOhjain.KuljettuReitti, KuljettuReittiKasvoi(a,b,tapa)
  kamera perillä, tallennuskenttä "kuljettu"). Linssiseppä sai rajapinnan. Web EI pidä järjestettyä reittiä (vain visited).
- `pelikoodari/loydos153` e6a2f829: nostomerkit häipyvät horisonttiusvaan (Horisonttiusva.Peitto = webin paperiusvan
  kaava, Aurinko kirjoittaa RuutuRajaY/RuutuVoima). Käännös lokit/loydos153-kaanna.txt. TODENTAMATTA: aja uusi-matka ateena,
  `kallista 40` (Documents/komento.txt), kuvapari ennen/jälkeen (ennen = lokit/musiikki-v1/Matkakirja3D-f994.app), sitten
  merge-pyyntö Natiivisepälle (hän on kuitannut). Natiiviseppä: TMP-nimiöt (Distance Field Overlay) eivät ota sumua →
  Peitto sopii myös KaupunkiMerkit/Nimikerros-nimiöihin (seuraava askel).
LÖYDÖS 155 (Fablen päätös 09.0x): kuvamerkkien kynnys 4 → 2,5 webiin (js/pallolauta/nostot.js:498, :514–517) ja natiiviin
  (NostoSaannot.cs:272, :278) samalla erällä, kertoimella 2,5–4 merkki 70 % koosta, koelippu ?koe=symbolitkaukana pois,
  kuvapari (web + natiivi Kreikka kertoimella 3) omistajalle ennen tuotantoa. Taso 1 -kuvamerkit AINA näkyvissä (muste
  himmentää vain tasot 2–3; välitetty Natiivi-UI:lle ja Linssisepälle). Analyysi lokit/loydos155-symbolit.md. EI ALOITETTU.
WEB: PR #3304 (musiikki vaihe 1 peliin + työkalut, 4356/0) Julkaisijan junaan; docs-PR #3302 (−11 LUFS) Fable mergeää.
  PR #3301 (pallo 26-pohja) kuitattu Julkaisijalle.
MUSIIKKI VAIHE 2 (§5 kohta 2, 14 raitaa): ensimmäinen ajo 36221821019 teki 5 (kohtaaminen, ratkaisu, epäonnistuminen,
  saapuminen-lansi-eurooppa, -ita-eurooppa) ja kaatui Lyrian suodattimeen (lahi-ita-kehote, korjattu). Loput 9: ajo
  36222088349. Seuraavaksi: kestot ffprobella → RAIDAT-taulu tools/viimeistele-musiikki.mjs:ään (tunnukset 8–10 s,
  ratkaisu 4–6, epäonnistuminen 3–4, kohtaaminen ja maanosat looppeja: ei leikkausta, vain taso) → `--vie` → linkit + 1 rivi/raita
  Fablelle omistajalle. Vaihe 3 vasta kuuntelun jälkeen.

## 19. Lisäys 26.9. klo 08.5x (myöhempi) — viimeiset tilat
- Build 20 -junassa (Natiiviseppä): musiikki-vaihe1 (juna/b13 63984096) ja kuljettu-reitti 025f6507 (merge juna → haara,
  ristiriita PeliOhjain.Kytke ratkaistu, juna 2ab54860). Linssiseppä on yhdistänyt e5ee31dc:n haaraansa
  linssiseppa/elavat-hetket — ÄLÄ kirjoita historiaa uudelleen, korjaukset uusina committeina.
- 153: käännös 7b01113b valmis (lokit/loydos153/Matkakirja3D-153.app), ennen-kuva lokit/loydos153/ennen.png EI KELPAA:
  kartta sumennettu (kortti/pulun kupla auki) ja zoom koko Kreikka → nostomerkkejä ei näy. Korjaa kallistus-kuva.sh:
  `ui sulje` (ui-komento.txt) ja lähennys kertoimeen ~3 (Komennot.cs, esim. zoom-komento) ennen `kallista 40`, aja ennen
  (Matkakirja3D-f994.app) ja jälkeen (-153.app), kuvapari → merge-pyyntö Natiivisepälle (kuitannut odottavansa).
- Musiikki vaihe 2: ajo 36222088349 käynnissä klo 08.56 (loput 9 raitaa).
- Simulaattori A2FD9C9F sammutettu.

## 20. Lisäys 26.9. klo 09.5x (uusi sessio)
- MUSIIKKI VAIHE 2 VALMIS kuunneltavaksi: 14 raitaa ämpärissä, lista docs/raportit/musiikki-vaihe2-kuunneltavaksi.md
  (Fablelle lähetetty). Lyria hylkäsi myös maanosa-valimeri-kehotteen → uusi muotoilu. Työkalu (web-haara
  pelikoodari-musiikki-vaihe1 d3bdf38f5, PR #3304): RAIDAT-taulu vaihe 2, huippurajoitin ≤ 3 dB (RAJOITIN_DB),
  raa'an vienti paikallisesta kun ajo kaatui ennen vientiä. Tasot −11,3…−13,0 LUFS. Vaihe 3 vasta kuuntelun jälkeen.
- LÖYDÖS 155 TEHTY: web `pelikoodari-loydos155` 6ad5b1f65 (4355/0, savuke-nostojen-tyyppimerkit 13/13 uudella z7-tasolla),
  natiivi `pelikoodari/loydos155` c09aacc3 (288/288, unity 0; NostoSaannot nyt Peli-testeissä). Kynnys 2,5, koko 0,7
  kertoimilla 2,5–4, koelippu pois. Natiiviseppä ottaa c09aacc3 + 153 e6a2f829 junaan kun kuvapari omistajalla;
  Kaukana-kerrointa EI tehdä (sovittu). Web-kuvapari lokit/loydos155/web-kuvapari.png. PR webiin vasta omistajan kuvaparin jälkeen.
- 153+155 natiivikuvat: skriptit lokit/loydos155/kreikka-natiivi.sh (kerroin 3 iteroiden, valinnainen kallistus) ja
  lokit/loydos153/kallistus-kuva.sh (korjattu: ui sulje + aja kaari 6,2). Yhdistetty käännös proto-kaanna.sh
  pelikoodari/loydos153+pelikoodari/loydos155; ennen = lokit/musiikki-v1/Matkakirja3D-f994.app.

## 21. Lisäys 26.9. klo 10.4x
- #3304 mainissa (v2261), mukana vaihe 2 -työkalut; web-worktree musiikki-vaihe1 poistettu.
- 155 + 153 KUVAPARIT valmiit ja omistajalla (SendUserFile) + Fablella: lokit/loydos155/{web,natiivi}-kuvapari.png,
  lokit/loydos153/kuvapari-kallistus.png. Natiivikäännös 372cb505 (lokit/loydos155/Matkakirja3D-153-155.app).
  Web-savukkeeseen löytyi ja korjattiin: kuvamerkkiPieni piti kantaa GL-datumiin (nostot.js datumkopio). Web-PR vasta
  omistajan hyväksynnän jälkeen. Natiiviseppä otti 153+155 juna/b13 e86fd248:aan.
- Build 20 E (saapuminen-valimeri): EI VIKAA, todennettu (lokit/loydos155/e-musiikki.log); Laitetestaajan FAIL = edellisen
  testin loppu-aihe soi vielä (tunnus ei katkaise aihetta, kuten web). Natiivisepälle kerrottu.
- 160 (3D-symbolinostot, Natiiviseppä): data lokit/loydos160-arkkityypit.txt (GRC taso 1 + sääntöehdotus + 185 taso 1 -riviä).
- Skriptit: lokit/loydos155/kreikka-natiivi.sh (muste loyda kaikki GRC → aja → nipistys kerroin ~3 → [kallistus]),
  kreikka-web.mjs (web, kerroin iteroiden), e-musiikki.sh.

## 22. Lisäys 26.9. klo 11.2x — MUSIIKKI VAIHEET 2+3 KYTKETTY, 155 0,85
- 155: omistaja valitsi koon 0,85. Web #3311 mainissa (v2264). Natiivi pelikoodari/loydos155-085 4a5a7a4e → Natiiviseppä (build 20).
- Vaihe 3 generoitu ja hyväksytty (omistaja 11.0x): 8 maanosaa + 6 tunnuskaupunkia ämpärissä, lista
  docs/raportit/musiikki-vaihe3-kuunneltavaksi.md. Lyria hylkäsi Istanbulin nimen → kuvattu paikkana.
- KYTKENTÄ: web PR #3314 (pelikoodari-musiikki-kytkenta2 590eeb564, 4370/0) Julkaisijan jonossa; natiivi
  pelikoodari/musiikki-vaihe2 dab360d2 (297/297, unity 0) → Natiiviseppä build 21. Määrittely:
  proto-3d/lokit/musiikki-vaihe2-kytkenta-maarittely.md. Maanosa = alue→maanosa tai maa→maanosa (89 maata);
  maanosaraita alueraidan varareittinä; kohtaaminen tilaraita (visa voittaa, js/visa.js renderQuiz); ratkaisu/
  epäonnistuminen kohtaamisen tuloksesta (answerQuiz, timeUp). Natiivin kultainen aanijalki.json ajetaan:
  `node Peli-testit/Kultaiset/tee-aanijalki.mjs <web>/js`.
- AVOINNA: simulaattoritodennus lokit/musiikki-v23/todenna.sh (käännös proto-kaanna.sh pelikoodari/musiikki-vaihe2),
  vuoro Julkaisijalta. Docs-PR musiikkisuunnitelman tila "kaikki vaiheet tuotannossa", kun #3314 + natiivi mainissa.
  Siirtosepälle: vie musiikkiaihe/maanosa-taulut vasta #3314:n jälkeen (luvattu ilmoittaa).
- Worktreet poistettavissa mergen jälkeen: pelikoodari-loydos155, pelikoodari-musiikki-vaihe3, pelikoodari-musiikki-kytkenta2.
