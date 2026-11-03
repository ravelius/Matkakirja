# Natiivisepän luovutus 3.11.2026 klo 00.15 (konteksti 35 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261102-2316.md (PR 6042, tämä korvaa sen).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. Rungon 8d9951aa7 testit läpi, peili ajan tasalla.

## JONO
1. **OSA C: KK:N PÄÄTÖS 23.29 (omistajan puolesta, PT:n kautta) TOTEUTETTU HAARAAN, MITTAUS KESKEN.**
   Päätös: (a) zoomaus alkaa vasta, kun tasot valmiina; (b) EI. Tavoite: pelaaja ei tavallisesti odota → esilataus jo kohteen
   valinnasta, kaupungissa hiljainen taustalataus todennäköisimmille kohteille, lopullinen lähikuva ensin; 20 ms:n vahti pätee;
   latausilmaisin (NUI, olemassa oleva) vain jos myöhästyy. Jos odotus jää yleiseksi → rivi PT:lle, video molemmista aamulla omistajalle.
   Haara natiiviseppa/esilataus-218 (työpuu wt/proto-natiiviseppa-esilataus, peili peili/proto/natiiviseppa/esilataus-218), kärki 2cf83b7c3:
   - 1a42f9103 zoomauksen kameraloki ("zoomaus <k> kamera t (lat, lon) korkeus, kallistus") 0,25 s välein.
   - f59bc6839 Laattapalvelin.ValmiiksiValmis(k) (ValmiiksiKaupunki-tila), PeliOhjain.OdotaLahinakyma (zoomaus odottaa, enintään 30 s,
     ValmiiksiKiire = kaikki piirtopaikat), tapahtuma PeliOhjain.SaapumisKarttaOdottaa(k, alkaa) NUI:n latausilmaisimelle (NUI EI vielä
     kytketty: kerro NUI:lle PT:n kautta, kun mitattu), KarttaKerrokset.EnnakoiElava (PeliOhjain.EnnakoiKaupunki: siirtokohteet ja nopan
     päässä → hiljainen valmiiksipiirto, pala kerrallaan vain levossa, ei laajaa vektoridataa; vahvistettu kohde ohittaa), lähin taso ensin.
   - 19da77e59 käytävä: Nappula.SaatonLoppu ennustaa zoomauksen alun (ennakkozoomi + nappulan siirtymä); ennakoinnissa arvio kamerasta.
     Karkeat tasot luetaan vasta lähitasojen jälkeen. 2cf83b7c3 käytävä kaikille karkeille tasoille (ElavaEsilataus.Karkeat).
   - Testit 2cf83b7c3:lla Kartta 589/589 (uusi LahinakymaKattaaZoomauksenPyynnot: D+F+H:n pyynnöt ≥ 90 %), tarkista 0; Linssit/Peli
     ajettu f59bc6839:llä 2223/793.
   MITTAUKSET (Iso iPad, Pariisi→Lontoo bussi kylmänä, TYHJENNA=1 LAHI=paalle; lokit/natiiviseppa-saapuminen-kohde-<x>-…):
   - E 9fd2803fd: lähinäkymä ehti ennen zoomausta 13 palaa (pois 0); vahti HYLÄTTY (44/125 ms vs pois 85/101 ms).
   - F 1a42f9103 kameraloki: zoomaus alkaa saaton lopusta (52,6022, -0,6086) 769 km, kallistus 0, suora reitti keskustaan 2,5 s.
     Pyyntöloki EI etelästä (edellisen luovutuksen virhe) vaan saaton lopun suunnasta (pohjois-luode).
   - G f59bc6839: odotus 14,0 s (442 palaa), zoomauksessa silti pyydettäessä 115 (käytävä puuttui). Ennakointi toimii: Lontoossa
     "valmiiksipiirto edinburgh (ennakointi) 528 palaa 124,9 s".
   - H 19da77e59: 789 palaa, odotus 26,9 s, zoomauksessa pyydettäessä 109: levyltä tulevat palat → Cesium tarkentaa syvemmälle
     (z12 käytävältä 105 km, z14 34 km, z15 2,5 km) → 2cf83b7c3 (EI vielä mitattu; listassa arviolta ~1000+ palaa).
   - TÄRKEÄ: H:ssa zoomausliike HYLÄTTY silti (38 pitkää, suurin 88 ms) vaikka 789 palaa valmiina → esilataus ei yksin korjaa
     nykäystä; pitkät ruudut ovat muuta (GC, Nimikerros, "muu merkitsemätön", kohta 2). PT:lle kerrottu.
   SEURAAVAKSI: (1) käännä 2cf83b7c3 ja mittaa YHDELLÄ asennuksella (PT: CoreDevicen välimuisti) kylmä + lämmin (toinen ajo ilman
   TYHJENNA): pyydettäessä ~0? odotus? (2) Mittaa ennakoinnin hyöty: Lontoossa joutilaana → matka ennakoituun kohteeseen (odotus ~0?).
   (3) Kylmä odotus ~30 s on pitkä: PT:lle rivi "odotus kylmänä X s, ennakoituna Y s"; jos yleinen → video aamulla omistajalle.
   (4) NUI: SaapumisKarttaOdottaa → olemassa oleva latausilmaisin (PT:n kautta). (5) EI runkoon ennen PT:n kuittausta ja NUI:n 93ac209c8
   kuittausta (haarassa merge c5379f5cf).
2. **GC-korjaus jatkuu (PT:n kohta 1).** Uusi kutsupinoprofiili 1bb4a6337 (paikannus-218 kärki = osa 1 + osa 2) tehty:
   lokit/natiiviseppa-saapuminen-kutsupinot-1bb4a6337-20261102/saapuminen-profiili.raw.varaukset.txt (.raw poistettu). Vahti HYLÄTTY 84.
   Taustasäie 1,12 Gt / 30 s (oli 1,2), pääsäie 161 Mt. Suurimmat: ElavaMaski.Vuokraa 214 Mt (587× — heikkoviiteallas tyhjenee GC:ssä
   → vahva rajattu allas), ElavaMvt.LueKohde 91 Mt, ElavaTyyli.Suurenna 85 Mt, ElavaMaski.LisaaRengas 83 Mt ja Ympyra 68 Mt,
   ElavaHaku (pääsäie) 63 Mt, Pakatut 57, Valmis 50, LueArvo 50. Seuraavaksi: Vuokraa-allas vahvaksi, sitten Suurenna/LisaaRengas.
   Pääsäikeen pitkät ruudut: "muu (merkitsemätön)" 2288 ms/80 → katso "PITKÄ … | ali:" -rivit. PT:n kohdat 2 (ulkona/GPU) ja 3 odottavat.
3. **VS:n/NUI:n/KS:n merget** sitä mukaa kuin PT kuittaa (tarkista media ämpärissä curl -I:llä, jos TasoVersio/LeikeVersio/SiltaVersio
   tai katalogikuvat vaihtuvat).
4. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus kuten 217: tagi `natiiviseppa/runko-218-tf`, peili, TF-tilaus JU:lle "kaikille",
   rivi PT:lle. Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".
5. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n leikehaara
   7280634c4 EI. Pariisin vieritys osa 3 EI NYT (PT). Pariisin piirros tehdään alusta (omistaja 17.42): ÄLÄ optimoi sen laattoja.
6. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- **TF 217 testaajilla** (runko 60bd5c356, tagi natiiviseppa/runko-217-tf). Pieni iPad: asennettu 17.13 (PT), ei odota nykäyskorjausta.
- **Juna 218 runko = 8d9951aa7** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218; 22.33: 0ffb7e562 → GC-korjaus 9be37e4f2 →
  maskivuokra 8d9951aa7, molemmat fast-forward natiiviseppa/gc-mvt-218:sta, työpuu wt/proto-natiiviseppa-gcmvt). Aiemmin tänään a7cdb4478:n jälkeen:
  NUI piirros-nostot-218 c94645ac3 → c4953bfae; NUI pelikuvat-218 ddce40e7c → eb035c8c4; VS kattoalla 32fbecda3 (cherry-pick -x)
  → 0ffb7e562. PT:lle ja tekijöille kerrottu (VS:lle viesti jonossa 17.4x).
- Nykäysvahti 4.24 (koko liike + 1 s, yksikin yli 20 ms = hylkäys) on omistajan sitova sääntö; rajaa ei muuteta.
- Kansiot rungossa ennallaan: rakennukset-v98, tausta-v100, palatsi-esto-v25, c2-v34, muurikate-v38, osamallit791-v10; piirros
  TasoVersio haamu3-20261102, LeikeVersio leikkeet-20261102, SiltaVersio leikkeet-sillat-20261102.
- Laiteäpit (lokit/natiiviseppa-app-210-runko-<sha>-laite): VAIN 8d9951aa7 (runko), 1a42f9103, f59bc6839 (19da77e59 käännetty mittaukseen H).
  PT 3.11.: pidä 2 uusinta + käytössä; jokainen devicectl-asennus jättää ~0,5 Gt CoreDevicen välimuistiin → yhdistä mittaukset yhteen asennukseen.
- Mittausskriptit proto-3d/tyokalut/natiiviseppa-skriptit/juna218/: saapuminen-matka218.sh (Release), saapuminen-profiili218.sh
  (Development + Profiler-loki, PROFIILI_S=30 riittää: saapuminen ~6 s matkakomennosta), profiili-varaukset218.sh <.raw> <sha9>
  (editori b6-kopiossa käännöslukon alla, ~10 min / 1 Gt).
- Cron Unity-beeta (luotu uudelleen 2.11. 23.2x tähän sessioon) "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt eikä T7-kopioita. Levy 26 Gi (3.11. 00.0x): NS vapautti ~24 Gt; vanhat lokikansiot T7:llä (/Volumes/T7 4TB/koodaus/proto-lokit-arkisto, symlinkit lokit/:ssa). Uusi worktree -esilataus (ÄLÄ poista ennen osa C:n mergeä).

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~4 min; peili käsin: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- Laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>`
  (commit peiliin ensin; ~17 min). Development: lisää `PROTO_KEHITYS=1` ja nimeksi runko-<sha9>-kehitys.
- Saapumismittaus: `zsh .../juna218/saapuminen-matka218.sh natiiviseppa-saapuminen-matka-<nimi>-<pvm> <sha9>` (~4 min, Iso iPad);
  yhteenveto: `grep -a -h "MATKAKIRJA nykäysvahti" konsoli-*.txt; python3 <työpuu>/tyokalut/nykaysvahti.py konsoli-*.txt`.
- Profiili: `PROFIILI_S=30 zsh .../juna218/saapuminen-profiili218.sh <kansio> <sha9>` → `zsh .../juna218/profiili-varaukset218.sh
  <kansio>/saapuminen-profiili.raw <sha9>`.
- Puhtaus `git merge-tree --write-tree HEAD <sha>`; tarkista rc=1 tai testi punainen → korjaus tekijän haaraan.
- A/B saapuminen: `zsh .../juna218/ab-saapuminen218.sh <nimi> <runko sha9> <korjaus sha9> <korjauksen työpuu>` (testit + käännökset +
  A/B ×2, ~60 min); epäonnistunut ajo (VIKA lähetys peli-komento.txt → vain 1 liike) korvataan `ab-lisapari218.sh <nimi> <A> <B> <n>`.
- Kutsupinoprofiili: `zsh .../juna218/kutsupinot218.sh <sha9>` (Development-käännös + profiili + analyysi, ~45 min).
- Kartta-testit nopeasti: `bash <työpuu>/Kartta-testit/kaanna.sh` (bash, ei zsh; ~1 min).
