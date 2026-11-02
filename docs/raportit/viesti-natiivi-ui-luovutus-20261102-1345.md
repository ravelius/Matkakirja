# Natiivi-UI: luovutus 2.11.2026 klo 13.45 (kortti, aarrepiste, pallo, nimet; kylttipari kuitattu ja mergepyynnössä)

Edellinen: viesti-natiivi-ui-luovutus-20261102-1251.md (PR 5983). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## Proto-haara natiivi-ui/piirros-tahdet-218 (wt/proto-natiivi-ui-piirros-tahti, rungon 52ba93dea päällä)
- **a24a6acd8 asti PT KUITTASI 13.3x → MERGEPYYNTÖ NS:llä** (tähdet, info/kioski, ydin, haamu2, kylttikorjaus 6305829dd, haamu3
  a24a6acd8). NS: merge-tree puhdas rungon b0fd44819 päälle; JU VIETY 13.27 tahti-20261102 (72 + hehku) ja leikkeet-20261102 (2).
  Todistukset: proto-3d/lokit/todistus-tahdet-a-1fd576f02-20261102-1245 ja todistus-tahdet-b-6305829dd-20261102-1320 (pari-kyltit.png).
- **38b32b860 lukittu aarrepiste ei näy** (omistaja 13.19 kohta 2): PeliOhjain.PaivitaAarrepiste: lukittu → Poista, auki → Aseta.
- **bd3f39962 kuumailmapallo ei hypi** (13.19 kohta 4): KaupunkiPallot heilahdus näkyvällä koolla (ks < 1: ennen täysikokoinen
  näkymätön pallo osui nappulaan/korttiin ja kulma vaihtui 5°:n portain). Toisto ilman korjausta iPad 13 vaaka ei näyttänyt hyppyä
  (todistus-pallo-a-6305829dd-20261102-1325); omistajan laite on iPad 11 pysty.
- **3c2f34519 Pariisin kutsukortti pois** (OMISTAJAN PÄÄTÖS 13.30): Kutsuminiatyyri.EiKutsua = "pariisi". PT haluaa erillisen ilmoituksen,
  kun kortti on poistettu ja todistettu.
- **394a5b467 kohdenoston nimi kokonaan** (PT 13.4x, kohta 6): ei web-lyhennystä kohdenostoille myös karikatyyri pois (Les Hallesin hallit,
  Palais de l'Industrie, Galerie des Machines, Tuileries'n palatsi). ÄLÄ nimeä avaimia uudelleen. PT: tarvittaessa kahdelle riville
  (tehty: yksi rivi koko nimellä; jos laatta liian leveä, kaksi riviä samalla kylttipohjalla).
- Käännös 394a5b467 linja 2 → proto-3d/app-jako/natiivi-ui-pallo-aarre-a. Todistus pallo-aarre-b (yhteinen-iPad11 pysty):
  OK 0 poikkeusta: proto-3d/lokit/todistus-pallo-aarre-b-394a5b467-20261102-1339 — kortti pois (0, syy-rivi), aarre lukittu 0 pistettä → auki näkyy (1, 2),
  Tuileries'n palatsi koko nimellä karikatyyri pois (2b; Les Hallesin hallit tässä kuvassa väistön takia ilman nimiötä — tarkista eri zoomilla),
  pallo: pallo-panorointi-b.mp4 + 3–4 (videota EI vielä katsottu ruutu ruudulta). PT:lle ilmoitettu 13.4x (kortti erikseen).

## SEURAAJAN JONO (PT:n järjestys)
1. Todistus pallo-aarre-b → kuvat PT:lle: kortti pois (kuva 0), aarre lukittu/auki (1, 2), nimet (2b), pallo (video pallo-panorointi-b).
   Ilmoita PT:lle kortista ERIKSEEN. Kuittaus → mergepyyntö NS:lle 38b32b860…394a5b467 (pieni iPad päivitetään, kun junassa 218 ovat
   kioski + info + kortti pois + kaikki 13.19–13.27-korjaukset).
2. (7) Liiku-nappi: OMISTAJAN PÄÄTÖS 13.30 kuuluu näkyä → EI piiloon; PT: korjaa asu webin pohjan mukaiseksi (kompassi + napin pohja;
   web ui.js piirraToimintorivi iconButton('kompassi','Liiku'), natiivi Matkavalinta.cs liikuNappi + Kartta.uss/.mk-liiku). Omistajan
   kuvissa (Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261102/1321-*, 1327-*) näkyy pelkkä teksti "Liiku".
3. (5) Karikatyyri pois: nimet ja piirretyt kohteet (nostot) liikkuvat hieman panoroitaessa → kiinni karttaan. Pari ennen/jälkeen PT:lle.
4. (3) Sillat leikkeinä veneiden päälle (PT ok): pyydetty KS:ltä 13.2x; KS kirjasi määrittelyn luovutukseensa (4999d7ed0, AVOIN 0a),
   seuraava KS tekee ensimmäisenä ja ilmoittaa NUI:lle (paketti _valmiit/pariisi-sillat-<pvm>/, nui-rivit.txt). Koodi:
   rivit PiirrosKerros.Leikkeet-taulukkoon + jono Tasot.Length + 2 (veneet +1). NS muokkaa PiirrosKerros.cs:ää haarassa
   natiiviseppa/piirros-striimi-218 → tee siltojen koodi vasta NS:n ilmoituksen jälkeen hänen haaransa päälle. Lopuksi veneiden pari + video.
5. OMISTAJAN PYYNTÖ 13.31 (PT): PELIT-välilehden 4 viivakuvaketta (Pallokisa, Viimeinen keisari – karkuteillä, Katso ja löydä,
   Rakettimatka ISS:lle) Codexin minikuviksi Myllyn ja Tavlin pohjalla. Tilaus postilaatikossa f670c1140 (R2 linssikatalogi/<tunnus>-havainne.jpg:
   pallokisa, keisari-karkuteilla, katso-ja-loyda, raketti-iss). Kun Codex toimittaa: kytke FotoMinit/CodexFotot-tauluun, kuva ennen/jälkeen PT:lle.
6. PT:n vanha jono: B nostot lajimerkein piirrokselle, E saapumiszoomaus (luovutus 0930 kohdat 2–4; F kortti tehty Pariisille).
7. Jos jono tyhjä: rivi PT:lle "JONO TYHJÄ: Natiivi-UI".
