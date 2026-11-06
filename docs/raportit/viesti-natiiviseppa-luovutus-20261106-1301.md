# Natiivisepän luovutus 6.11.2026 klo 13.01 (konteksti 28 %, 7.37)

Korvaa -1247:n SEURAAVA TYÖ:n. -1247:n "Mitä tässä sessiossa nähtiin" ja "Opit" sekä -1231:n "Mitä koodissa on" pätevät. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja.
ENSIN: luo cron "4 9 * * *" (session-only, Raamattu 7.41). Skripti: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe. Python numpyllä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä.

## Tila
- iPad 2 e1b50940b käynnistyi 12.59 (lokit/natiiviseppa-palikka-ipad2-e1b50940b). ÄLÄ commitoi tai muuta työpuuta wt/proto-natiiviseppa-palikka ennen JU:n ilmoitusta (PT 12.5x). Tulos tulee viestinä, älä pyydä uudelleen.
- Kerro PT:lle, kun iPad-ajot ovat loppuneet: JU kääntää sitten rungon.
- KK on vaihtumassa. Tulokset uudelle KK:lle samalla tavalla (id osoitekirjasta tai ListAgents; nimellä lähetys vaatii ref:n).

## Valmiina työpuun ulkopuolella (ei ajettu, ei nähty)
Kansio P/valmis-korvaus. C#:n tyyppitarkistus 0 virhettä (P/tyyppitarkistus.zsh:n muunnos, luo uudelleen: scratchpad vaihtuu). Varjostinta ei ole käännetty.
- TaloKerros.cs: KorvausKansio, AsetaKorvaus, VaihdaKorvaus. Vapauttaa ja lataa uudelleen vain korvattavat palat, loki "korvauspala ... ladattu X s vaihdosta".
- PalikkaKerros.cs: tavat KA0, KB2, B2T; komento `palikat korvaus <polku>`; piirre tripo; Tripo-puut (LataaPuuMallit, PuutLajeittain). Tripo vain B2:lla, B3 pitää kortin.
- Palikka.shader: kärjen alfa 240 = atlas, väripolku kuten nähtävyyspuilla (haalistus 0,35, savy 0,68 0,62 0,56). Luminanssirivillä sama valopoikkeus-kommentti kuin NotreDameKirkko.shaderissa, PT ei ole erikseen hyväksynyt sitä tähän kokeeseen.
- asenna.py vie työpuuhun nämä, PalikkaData-v4:n, Ultra_Renderer_F:n (uusi guid, Forward) ja lisää sen Ultra_RPAsset-listan toiseksi. Ei commitoi.
- Muokkaukset on jo tehty kopioihin: muokkaa.py ja muokkaa2.py on ajettu, älä aja uudelleen. Tarkista ennen asennusta, ettei työpuun kärki ole muuttunut e1b50940b:stä (kopiot on otettu siitä).

## SEURAAVA TYÖ, järjestyksessä
1. IPAD 2 -TULOS: -1247:n kohta 1 (P/taulukko-ipad.py, omatKutsut > 0, kuvamäärän trendi, aloitusaika). B2L:n luku koskee korttia, joka korvautuu Tripo-puulla: kerro se. Tulos KK:lle (hinta erikseen, lupaus), tiivistys PT:lle.
2. Työpuussa: git merge --ff-only 09cfa17c4 (VS:n puut, linssiseppa2/puut-kevyet), sitten python3 P/valmis-korvaus/asenna.py. .metat puut-kevyet-tiedostoille tulevat VS:n commitista; tarkista Ultra_Renderer_F.asset.meta, että guid on uusi. git add polulla, ei settings-tiedostoja. Commit, sha JU:lle.
3. MAC-6: P/sk-mac-6.txt on valmis, tee ajopyyntö JU:lle (sk-mac-5:n mallilla, lokit natiiviseppa-palikka-mac6-<sha>). Kuvat täysikokoisina itse ennen KK:ta, parit P/parit-mac5.py:n ja varit-mac5.py:n mallilla, kansio selvitys-mac6. Katso:
   - Varjostinvirheet 0; Tripo-puiden muoto, väri kartan paletissa, ei liian isoja, käännös (Cull Back, GLB:n kierto on näkemättä).
   - Puu-3:n 80 kolmion vaaleat laikut pelin etäisyydeltä (PT): jos näkyvät, kerro VS:lle, VS korjaa. Puu-3 on neljännes puista; arvioi myös, näyttääkö se oudolta kadulla.
   - Vesiraja: c-b2-vasen ja l-b2 (Hôtel de Villen ranta). Lopuksi lokista korvauspalat ja `palikat tila`: KB2 Macilla.
   Kuvapari KK:lle: Tripo-puu + Seine, kolmiot puuta kohden (300 tasolla 0 eli alle 400 m, muuten 80; taso valitaan palan keskipisteestä), umpinainen malli ilman alfaleikkausta, tiivistys PT:lle.
4. IPAD 3: P/ajopyynto-ipad-3.md on luonnos, lisää sha. A0|KA0, A0|KB2, A0|A1 (A1 = Forward isolla iPadilla, Mobile-tasolla päinvastoin; kirjaa), B2L|B2T. KK kuittasi Forward+ | Forward 12.5x. Vahvista jsonl:n kolmioista KA0 < A0. Tarkista korvauspalojen ajoista, ehtivätkö 7 palaa ohitukseen 3 s, pidennä jaksoa tarvittaessa. Kirjaa laitteen palaversio (v9/v10; korvaukset tehty v9:stä). Tuloksessa: korvaus koskee vain 2 000 Marais'n taloa, 20 000 puuta, 5 000 valoa, mastot ja sillat ovat kokonaan lisäkuormaa. Tripo-puut lisäävät kolmioita selvästi (enintään noin 1,6 M, 20 000 × 80, jos kaikki näkyvissä): kerro hinta suoraan. Mittari suurinP95Ero ei yksin riitä, kerro myös ruudun P95 ja kuvamäärä.
5. C1 ja D2 -1247:n kohdan 6 mukaan. Forward-kopio pois listalta ennen C1:tä: RD vaatii Forward+:n kaikilla renderöijillä. Ilman renderöijän vaihtoa (KK).

## Mitä tässä sessiossa nähtiin
- Vesikorjaus: P/PalikkaData-v4.bytes (a6780856d18e315c). tee-palikat.py: puut ≥ 10 m ja tolpat ≥ 5 m OSM-rannasta (relaatio 2191006), silloilla olevat valot jäävät; suodatus ennen määrien leikkausta. Koko alueelta 995 puuta ja 73 valoa pois, määrät 20 000, 5 000, 100 säilyivät. palat-ilman-marais ennallaan. Pelissä näkemättä.
- Juuret v3:ssa (selvitys-vesi/juuret.py, etaisyydet.py, kartta-hdv.png): puita OSM-vedessä 27/20 000, enintään 4 m; mastoja 0; valoja 111/5 000, 105 alle 20 m siltapätkän keskeltä. v4:ssä 110 valoa vedessä, kaikki sillan kaistalla; niitä ei ole verrattu kokeen 200 piirrettyyn siltaan, katso kuvasta. c-b2:n rannan puut ovat OSM:n mukaan maalla, lähimmät 2,8 m rannasta. KK:lla ja PT:llä.
- Kuvan veden syy on todistamatta: näkyvä vesi on OpenFreeMapia, ero OSM:ään mittaamatta. 10 m on varovainen arvaus. KK:lle mennyt viimeinen lause oli kömpelö; oikea sisältö: jos Mac-6:ssa puita on yhä vedessä, syy on korkeus tai kallistus eikä lisää poisteta. Täsmennä se uudelle KK:lle Mac-6:n yhteydessä.
- Koko rajataan datasta: s = min(korkeus / mallin korkeus, latvus / mallin leveys), joten KK:n 14 m ja 0,6 × korkeus pätevät, leveät mallit jäävät matalammiksi. Laji ja kierto tiivisteestä, lajit tasan.

## Opit
- OpenFreeMapin robots.txt = 403. PT: ei hakuja OFM:ltä, TileJSONin tulosta ei käytetä, laattoja ei haeta. Luin robotsin ja TileJSONin samassa komennossa vastoin sääntöä, kerrottu PT:lle: robots aina ensin omassa komennossaan.
- Levyllä ei ole elava/mvt-välimuistia Macin kansioissa, joita tutkin (Library, DARWIN_USER_CACHE_DIR, TEMP).
- Tripo-mallit ovat 50–86 m korkeita mallin yksiköissä: skaalaus tehtävä aina datasta.

## Huomiot
- NS:n työpuita wt/-kansiossa 8 (raja 3): kerro PT:lle ennen poistoja.
- Canopéen välke liikkeessä edelleen katsomatta.
