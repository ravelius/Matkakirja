# Natiivi-UI: luovutus 2.11.2026 klo 09.00 (nipistysvian syy löytyi ja korjattu; tähti, kytkimet ja leikekerros kirjoitettu)

Edellinen: viesti-natiivi-ui-luovutus-20261102-0831.md (+ lisäys ca18a36c6, ei mainissa; sisältö on tässä). Syy: konteksti
on pehmeällä rajalla (Raamattu 7.37).

## Proto-haarat (molemmat junan 218 rungon 63c2a05b5 päällä; NS: eleet vasta PT:n kuittauksen jälkeen)
- **natiivi-ui/piirros-eleet-218** (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-piirros-eleet), rebase 63c2a05b5:
  5469e06c1 liuku yhtä pitkään · c02b27f2c Temple-torni ym. avaavat noston · **26336318f** vianetsintä: `simkosketus nipistys x y v0 v1 [s]`
  (AITO kahden sormen ele, IndigoHID:n toinen piste; todistusajon rivi `nipistys …`), `komento eletila` (EleTila + lähin, katto, lukko,
  UI-peitto keskellä), lokirivi "pallo: ele UI:lla". **629ff9da9 KORJAUS kohta 3** (alla), EI VIELÄ SIMULLA.
- **natiivi-ui/piirros-tahti-218** (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-piirros-tahti), rebase eleet-haaran 629ff9da9 päälle,
  EI KÄÄNNETTY EIKÄ SIMULLA:
  - 3d093444a **tähti** (OMISTAJAN PÄÄTÖS 08.31): kadonneen ihmeen kylttiin kohdekartan ihmetähti (KohdekarttaNakyma.Tahti, USS-luokat
    mk-kohdekartta__ihmetahti-*), Kartta.uss --kadonnut + mk-nosto-merkki__tahti, Kohdenostot.Kadonnut(id) = nostolinkki hahmotelma-….
    `ui kohdenostot` näyttää "tähti".
  - 8840ff31c **kytkimet + suoristus**: KARTTA-välilehden rivit "Karikatyyrikartta" (taitekartta) ja "Kadonneet ihmeet" (tahti), oletus
    päällä, PlayerPrefs (PiirrosKerros.Karikatyyri/Kadonneet, SisaltokerroksetSilta). Karikatyyri pois → pariisissa false (striimi,
    LahinLeveysPaikassa ja PiirrosKulma null, ei Suorista-nappia). Kadonneet pois → Kohdenostot.Ruudulla ohittaa hahmotelma-nostot.
    Kohta 6: kun kamera laskee alle TaysiKorkeusM:n (25 km) käännettynä, Suorista eleen jälkeen kerran lähennystä kohden.
    Testi: `komento karikatyyri on|pois`, `komento karikatyyri kadonneet on|pois`.
  - 8ee9492b9 **leikekerros**: PiirrosKerros.Leikkeet (tunnus, p, e, l, i), RGBA-kuvat <kansio>/leikkeet-20261102/leike-<t>.png, sama
    varjostin, kaikkien tasojen päällä, Kadonneet pois → vapautetaan. LISTA TYHJÄ: KS täyttää Codexin kulmista (KS:lle kerrottu 08.47).

## Todistus 1 (proto-3d/lokit/todistus-eleet-26336318f-20261102-0844)
- Aito kahden sormen nipistys toimii (71,6 → 23,3 → 7,2 km), mutta `komento kaupunki pariisi` ei siirtänyt Pariisiin (pinch oli
  Saksassa): **kohta 3 ei vielä toistettu Pariisissa.**
- Liuku lähimmällä tasolla (1,68 km): heitto liukui noin 1 km 0,4 s:ssa ja pysähtyi ennen 1,6 s:a (ennen korjausta pysähtyi heti).
- Temple: `ui kohdenostot napauta` vaatii nimen **Temple-torni** (id pariisi:Temple-torni), ei temple-torni → PUUTE skenaariossa.
- 0 poikkeusta. Kone kuormassa (load 23).
**Uusinta 2** (proto-3d/lokit/todistus-eleet-b-26336318f-20261102-0849, sama käännös; skenaario eleet-b.txt kansiossa):
- Pariisi 53,7 km (kauimmalla tasolla): 1. nipistys toimi (→ 16,5 km). 2. nipistys HYLÄTTIIN: "pallo: ele UI:lla (sormia 2, ensimmäinen
  1376/872 px)" → piirroksen kyltti tai nostomerkki ensimmäisen sormen alla vei koko eleen UI:lle; panorointi siirsi kyltin pois →
  **SYY kohtaan 3**. KORJAUS 629ff9da9: kun eleUilla ja toinen sormi on kartalla, ele kuuluu kartalle (lokirivi "kahden sormen ele
  kartalle"). TARKISTA simulla sama skenaario + että kyltin napautus ei laukea nipistyksen lopussa (merkin Clickable).
- Liuku: kaukana (71,6 km) ja lähellä (1,68 km) heitto pysähtyi molemmissa ennen 1,6 s:a → yhtä pitkään (kohta 2 OK).
- Temple-torni: "kohdenostot: avaa kohdekartta:pariisi:Temple-torni → nosto kohde:hahmotelma-temple-torni" ✓ (kohta 4 OK), 0 poikkeusta.
- Kuvat kuvat/-kansiossa; kuvaparia PT:lle ei vielä lähetetty (seuraaja: korjauksen jälkeen pari + loki PT:lle).

## SEURAAJAN JONO (PT 08.44, järjestys)
1. Eleet: käännä 629ff9da9 (tai tahti-haara, jossa kaikki), simuta eleet-b.txt → kuvapari/loki PT:lle → kuittaus → NS.
2. Tähti (3d093444a) käännökseen ja simulle + **aarteen vihreä piste suoraan Pariisin piirroksella** (omistaja 08.40, PT: tähden yhteyteen).
3. Kytkimet + suoristus (8840ff31c) simulle (KARTTA-välilehden rivit: `tap-teksti Karikatyyrikartta`).
4. **OMISTAJAN PÄÄTÖS 08.42**: kadonnut ihme, jonka paikalla on nykyään toinen rakennus, ei saa leikettä: **toinen ★-kyltti nykyisen kyltin
   alle**, napautus avaa nostoruudun (havainnekuva = olemassa oleva hahmotelma + infoteksti). Ankkurit (KS KYLTIT-NUI.md, proto-3d/_tyo/
   karttaseppa/pariisi-pohja/codex-pseudo3d/ihmeet-20261102/): Palais d'Orsay → Orsayn taidemuseo Q23402; Palais de l'Industrie → Grand
   Palais Q457318; Trocadéron palatsi → Palais de Chaillot Q13360213; Les Hallesin hallit → uusi kyltti "Forum des Halles" 48.8625, 2.3450
   (PT 08.45). Leike + ★ vain viidelle: Grand Châtelet, Temple-torni, Tuileries'n palatsi, Galerie des Machines, Bastilji (leikkeen
   sijainnit KS:ltä; **nimikyltti leikkeen kohtaan, ei geopisteeseen**). Tuileries ja Bastilji eivät ole hahmotelma-nostoja (tarkista
   Kohdenostot.Kadonnut).
5. Raamattu 2.204 (OMISTAJAN PÄÄTÖKSET 08.44, 30d8a2570; 08.45, 8f393bb9b):
   a) Pariisin kaikki 38 karttakohdetta piirrokselle, kyltissä lajimerkki, kaukaa vain nähtävyydet, muut lähempänä. KS 08.5x:
      proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/kohteet-20261102/sijainnit.json (+ yleiskuva.jpg): lat_kuva/lon_kuva
      (kuvan lat → PiirroksenLat kuten nimet), ratkaisu = piste | leike (5 ihmettä) | kyltti (4 kadonnutta, ankkurikyltti), peruste;
      26/38 siirtyi geopisteestä (esim. Hôtel de Ville ja Grand Châtelet pois Notre-Damen päältä);
   b) saapuessa piirroksen tasot ladataan lähdöstä alkaen ja zoomaus lähitasolle alkaa, kun tasot ovat valmiina, isoisän lukiessa
      (kokeilu Pariisissa); **saapumiszoomaus AINA kaupungin keskustaan**, jolloin lehtikioski näkyy;
   c) Pariisin valokuva ja nähtävyyskartta pois piirroskaupungista; turistiinfo + lehtikioski napautettavina (kaupunkilehti /
      turistiinfo-liite), kuvat KS/Codex. Sitten ihmeiden kuvat (leikkeet).
6. Veneet Seinellä (OMISTAJAN PÄÄTÖS 08.17; KS:n reitti veneet-20261102/seine-reitti.json, Codexin palat odottavat; postilaatikko 7ad1059b5).

## Huomiot
- Palais d'Orsay ja Orsayn taidemuseo samassa pisteessä → kohdan 4 ★-kyltti ratkaisee (kadonnut alle).
- Todistusajon `ui kierto vaaka` + `tap 516 688` + `komento aja` -malli: kaanna-a.zsh / kaanna-b.zsh todistuskansioissa.
