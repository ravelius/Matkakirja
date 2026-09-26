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
