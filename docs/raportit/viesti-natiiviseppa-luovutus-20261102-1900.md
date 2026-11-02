# Natiivisepän luovutus 2.11.2026 klo 19.00 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Edellinen: viesti-natiiviseppa-luovutus-20261102-1710.md (PR 6014, tämä korvaa sen).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. Rungon 0ffb7e562 testit läpi (2223/793/586, tarkista 0), peili ajan tasalla.

## JONO
1. **GC-KORJAUS SAAPUMISEEN (PT 18.3x: "korjaa 1"), KESKEN.** Järjestys PT:ltä: a) allokaatioiden lähde ja kolme suurinta pois
   (välimuisti, poolit, ei LINQ:ia, ei merkkijonoja ruutusilmukassa); b) GCMode.Disabled liikkeen ajaksi + Collect zoomin jälkeen VAIN,
   jos a) ei riitä (silloin muistikatto valvontaan pienen iPadin takia). Mittaus samalla skriptillä runkoa vastaan; runkoon vain, jos
   pitkät ruudut JA suurin ruutu paranevat. PT:n kohdat 2 (ulkona/GPU) ja 3 (skriptityö) odottavat tätä tulosta.
   - **LÖYDÖS 18.55 (Development-profiili, Pariisin saapuminen 30 s):** GC.Alloc yhteensä 3,5 Gt, josta **taustasäie
     "Scripting Threads/#0" 3371 Mt / 22,8 milj. varausta 413 ruudussa** (keskim. ~150 t/varaus = jäsennystä: MiniJson/laatat?).
     Pääsäie vain 129 Mt / 1098 ruutua: Nimikerros.LateUpdate 40 Mt, Cesium3DTileset.Update 30 Mt, Laattapalvelin.Update 17 Mt
     (josta Texture2D.GetPixels32 7 Mt), Esilataaja 4,5 Mt, PiiloVartija 3,8 Mt, UiKerros 3,3 Mt, NostoKerros 3,0 Mt.
     → Keruiden syy on taustasäikeen jäsennys, ei ruutusilmukka. Raportti:
     proto-3d/lokit/natiiviseppa-saapuminen-profiili-20261102/saapuminen-profiili.raw.varaukset.txt (.raw 1,1 Gt samassa kansiossa).
   - **Seuraava askel:** tunnista taustatyö: lisää `ProfilerMarker.Auto()` jokaiseen saapumisessa ajettavaan Task.Run-runkoon
     (ehdokkaat: Laattapalvelin.Elava.cs MVT-haut ~r.304, Kohdekartat.cs:150, KaupunkiNostot.cs:276, UiSisalto.cs:171/222/274,
     NostoSisalto.cs:601/1133, LehtiSisalto.cs:168, Kuvat.cs, ElavaKartta.cs:296/348, Levytausta.cs:35, Fokusvirrat.cs:88,
     Matkakirjamerkinnat.cs:110, Tilastot.cs:373, MaaNumeroina.cs:212), sitten uusi Development-ajo ja analyysi (alla). Korjaa suurin
     (todennäköisesti jäsennyksen boksaukset/merkkijonot → välimuisti tai valmiiksi jäsennetty muoto).
   - Haara **natiiviseppa/paikannus-218** (työpuu wt/proto-natiiviseppa-saapuminen, peilissä), kärki 9be55d9ea:
     29d0dfb63 = runko 0ffb7e562 + purkukorjaus ilman esilatausta (b114da50a); 4fff097b6 merkinnät (pelisilmukan alivaiheet "| ali:",
     "gc N" merkintöihin, Nimikerros.Elavat/Lado/Piirra, Kohdenostot, NostotKartalla; nykaysvahti.py ALIVAIHEET); 2a02b6ed3 peli-komento
     "cpu loki <nimi|pois>" + Editor/ProfiiliVaraukset.cs; 9be55d9ea null-korjaus. Merkinnät eivät ole korjauksia: runkoon vain
     korjauksen mukana PT:n kuittauksella (tai merkinnät pois ennen sitä).
   - Mittaukset tähän asti (zoom pitkiä/suurin): runko 8b81a3f29 70/225; purku+esilataus e48588e37 90/150; purku ilman esilatausta
     b114da50a 66/267 ja 76/167 (HYLÄTTY, ei selvää parannusta); 4fff097b6 76/133. Paikannusraportti (GC 52 % pitkien ruutujen
     ajasta, Pariisissa 27–39 keruuta/2,6 s, ~26 ms/keruu): lokit/natiiviseppa-saapuminen-paikannus-20261102/paikannus-raportti.txt.
   - Purkukorjaus (286 → ≤ 12 ms) jää haaraan; otetaan mukaan, kun kokonaisuus paranee (PT). Pariisin piirros tehdään alusta
     yksinkertaisemmaksi (omistaja 17.42): ÄLÄ optimoi nykyisen piirroksen laattoja.
2. **VS:n/NUI:n/KS:n merget** sitä mukaa kuin PT kuittaa (tarkista media ämpärissä curl -I:llä, jos TasoVersio/LeikeVersio/SiltaVersio
   tai katalogikuvat vaihtuvat; esim. NUI:n pelikuvat 4× 200 OK 17.4x).
3. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus kuten 217: tagi `natiiviseppa/runko-218-tf`, peili, TF-tilaus JU:lle "kaikille",
   rivi PT:lle. Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA".
4. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n leikehaara
   7280634c4 EI. Pariisin vieritys osa 3 EI NYT (PT).
5. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- **TF 217 testaajilla** (runko 60bd5c356, tagi natiiviseppa/runko-217-tf). Pieni iPad: asennettu 17.13 (PT), ei odota nykäyskorjausta.
- **Juna 218 runko = 0ffb7e562** (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218). Tänään a7cdb4478:n jälkeen:
  NUI piirros-nostot-218 c94645ac3 → c4953bfae; NUI pelikuvat-218 ddce40e7c → eb035c8c4; VS kattoalla 32fbecda3 (cherry-pick -x)
  → 0ffb7e562. PT:lle ja tekijöille kerrottu (VS:lle viesti jonossa 17.4x).
- Nykäysvahti 4.24 (koko liike + 1 s, yksikin yli 20 ms = hylkäys) on omistajan sitova sääntö; rajaa ei muuteta.
- Kansiot rungossa ennallaan: rakennukset-v98, tausta-v100, palatsi-esto-v25, c2-v34, muurikate-v38, osamallit791-v10; piirros
  TasoVersio haamu3-20261102, LeikeVersio leikkeet-20261102, SiltaVersio leikkeet-sillat-20261102.
- Laiteäpit (lokit/natiiviseppa-app-210-runko-<sha>-laite): b114da50a, 4fff097b6; Development: runko-2a02b6ed3-kehitys-laite.
- Mittausskriptit proto-3d/tyokalut/natiiviseppa-skriptit/juna218/: saapuminen-matka218.sh (Release), saapuminen-profiili218.sh
  (Development + Profiler-loki, PROFIILI_S=30 riittää: saapuminen ~6 s matkakomennosta), profiili-varaukset218.sh <.raw> <sha9>
  (editori b6-kopiossa käännöslukon alla, ~10 min / 1 Gt).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen eikä T7-kopioita. Levy: .raw 1,1 Gt lokit-kansiossa, poista kun analysoitu.

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
