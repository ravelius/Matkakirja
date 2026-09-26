# Natiivisepän luovutus 26.9.2026 (f)

Luovuttaja: Natiiviseppä (Opus 5.5, sessio local_bf20055b, Macin käyttäjä koodaus). Syy: konteksti ~70 % (Fablen käsky).
Edellinen: -e.md. Löydöslista: docs/raportit/omistajan-loydokset-b13-20260925.md (Fablen haara; rivimerkinnät Fablelle
VIESTINÄ, ei omaa haaraa Fablen haaran päälle).

## Tila

- **BUILD 16** = proto-master **bf70290d** (juna/b13 1aa7c558, puu = käännöspalvelun 7f3979b0) = TF **1.0.16** (vienti 21.22).
- **BUILD 17 -juna leikattu** klo 03.43 (Fable: kiintiö) = juna/b13 **d04841a0**; käännös: katso alin rivi. Juna ei ota muuta ennen
  Laitetestaajan savukierrosta ja master-mergeä; muut merget build 18:aan.
  Junassa build 16:n jälkeen: esilataaja-4, Linssisepän sumu (II erä 3) ja linssien esilataus adca3817, Pelikoodarin
  cpu-mittari + kehys-cpu, 134 nosto-avaus, 145, Natiivi-UI 124 / 121–123 / 138–140 / nostot-130 (130–137) / kartussi-141
  (141–143) / im2-147-148, jumivahti (c6f09ec3), KEHYKSEN HINTA -korjaus (3c636115: portin piilotetut suotimet pois,
  laattojen alpha-testi pois, idle-syke jatkuvaksi, PiiloVartija; iPad 50,1 → 12,9 ms p50, GPU 14,1 ms), linssi-aani,
  126–128 + 113 (286477eb, maamaa-26), 125 kokonaan (Kartta 85039576 + UI 7a4a84f5) ja 146 v2 (e137d243).
- BUILD 17 -merge masteriin vasta Laitetestaajan savukierroksen jälkeen (sama puu kuin käännöspalvelun käännös, SHA Fablelle +
  Julkaisijalle). Unity kiinni viennin ajan.

## Omistajan valinnat odottavat (kuvat lähetetty Fablelle ja omistajalle)

- 127 maarajan paino Kevyt (oletus) / Kevein / Web → `Maaraja.OletusPaino` (proto-3d/lokit/rajat-126-128/kuvat/127-saksa-painot.png).
- 128 kerma p080 (oletus) / p060 / p045 → `Kermasarja.Oletus` (kuvat/128-kerma-laaja.png). Karttaseppä polttaa valitun
  peiton uudelleen 26-pohjasta (resepti 26).
- Avoin: rantaviiva-aineisto (~3 Mt) yhä pohjapaketissa ja offline-listoissa — poistetaanko, jos 126 on lopullinen?

## Tulossa merge-pyyntöinä (build 18)

- Pelikoodari: pelikoodari/vieritys (137), pelikoodari/loydos149.
- Linssiseppä: linssiseppa/esilataus 05e54878 (laatat ±1; mergetään simulaattorilukujen jälkeen), II erät 148/151/152.
- Siirtoseppä: siirtoseppa/paketti-paivitys f7cea0cb (taustapäivitys vaihe 2; Kartta/PakettiPaivitys.cs + 2 riviä Sisalto.cs:ään;
  merge simulaattorilokin jälkeen).

## BUILD 18 -jono (Natiivisepän omat ja katselmoidut)

1. linssiseppa/radio-esikuuntelu 642e1782 (+ b08ed1e3 testikomento, 9434b244 RAJAPINTA.md) — katselmoitu OK, merge build 17:n
   master-mergen jälkeen.
2. **132** kokoruudun kuvan taustan sumennus (Fable hyväksyi kaavan): sumennuksen tasoparametri (kortti < kokoruutu < portti 6 pt;
   nyt UiNakymat.KuvaSumea → PalloKierto.KuvaSumea 2,25 pt) + kokoruudun kuvan ajaksi taustan kaappaus kerran sumennettuna
   tekstuuriksi ja pallon kamera pois (lämpö). Rajapinta Natiivi-UI:lle ennen toteutusta.
3. **144** liput aaltoilemaan: sovittu Natiivi-UI:n kanssa `Liput.Aalto(Texture, w, h)` → `a.Kuva` (RenderTexture), `a.Paivittyi`
   (MarkDirtyRepaint), `a.Nakyy`, `Liput.Vapauta(a)`; Graphics.Blit + aaltovarjostin pieneen RT:hen (ei kameraa), ≤ 30 fps vain
   näkyessä, 2 aaltoa, jakso ~3 s, amplitudi ~4 %. Koevideo Fablelle/omistajalle ENNEN tuotantoa (pysäytyskuvat ensisijaisesti).
4. **ELÄVÄ KARTTA — ISOISÄN MUSTE** (omistaja 26.9. klo 00.0x, docs/raportit/elava-kartta-suunnitelma-20260926.md): pallon 7
   rajapintaa Linssisepän videolle, tuotanto build 18: hunnun radiaalinen kuivuminen saapumiskaupungista, vektoriviivojen
   piirtoanimaatio, maakuntatäytön syttyminen (järjestys etäisyydestä saapumiskaupunkiin, Siirtosepän 1.45 kokoluokka/maakunta),
   nostomerkkien pudotus kokoluokittain + musteen jälki, auringon pyyhkäisy, Black Marble -maski käytyihin, boidit ja 1873-laiva
   (Siirtosepän 1.46 reitit1873). Tapahtumaohjattu, lepopiirto säilyy. Sovi rajapinnat Linssisepän kanssa ennen koodia.
5. Cesium3DTileset.suspendUpdate piirtämättömissä kehyksissä, kun PallonLepo lepäsi edellisessä (Pelikoodari: traversal 0,5–1,5 ms
   levossa). PallonLepoon "edellinen lepo" -tila; ensimmäinen piirrettävä kehys avaa.
6. Lennon MUSTA VERHO (tavoite ≤ 2 s lämmin / ≤ 3 s kylmä, nyt 5 s katto): natiiviseppa/lento-esilataus 34d31dbd (EI junassa):
   reitin esilataus (irtautumisen vaalea laatta poissa kylmässä ajossa) + kokeet PlayerPrefsillä. A/B 26.9. klo 01 (verho-b16/
   TULOS.md): Cesiumin rinnakkaisuus 40/64 ei auta; ESIKAMERA (Lontoo 450 km) lataa pallon 100 %:iin, mutta verho odottaa silti
   4,4 s katon → selvitä, mikä valmiusehto pitää verhoa (Valmius.Tasaantunut / portti / reitti / "s2 luotu nyt"). Pysyvä
   esikamera vaatii kohteesta riippumattoman avaussuunnan (Fable/omistaja). Aloitusverho 4,6–7,1 s (tavoite ≤ 3 s).

7. Napakansi hämärässä (Linssisepän elävän kartan video, Fable 26.9.): vetäytymisen hämärässä pohjoisnavan kansi näkyy tummana
   kiekkona (napakalotit + PallonSavy/hämärä) → kansi samaan hämärään kuin laatat. Build 18.

## Työkalut ja käytännöt (uutta)

- Junamerge koemergellä: `git branch -f testi/juna-x juna/b13` → juna-merge.sh haarat → git archive + `Peli-testit/unity-tarkistus.sh`
  + Kartta/Peli/Linssit-testit → `git update-ref refs/heads/juna/b13 <uusi> <vanha>`.
- Jumivahti juna-ajo.sh:ssa: lukko > 15 min, ei il2cpp:tä, Unity-puu ilman CPU:ta 20 s → tapa, kirjaa, juna uudelleen kerran.
- Simulaattori FBBD41D7: mutex /tmp/natiiviseppa-simu.lukko, ikkunalippu /tmp/natiiviseppa-simu-ikkuna-auki (vuoro Julkaisijalta),
  booted < 2, proto-kaanna.sh ILMAN UDID:tä ja .app talteen heti. Vientilippu /tmp/natiiviseppa-vienti-tulossa (agentit lopettavat
  Unity-ajot).
- Omistajan media: pysäytyskuvat/kuvaparit ensisijaisesti, laitteen ruutu rajattuna ilman reunoja (muisti omistajan-media-rajaus).
- Levy: lokit-kansioiden vanhat .app-kopiot ja Build/dd-laite + laite poistettu Fablen luvalla (vapauta-levy-natiiviseppa-20260925b.sh).

## Worktreet (katto 3) — kaikki vapaana

wt/proto-natiiviseppa-nimikerros (natiiviseppa/nostot-125, mergetty), -loydos46 (natiiviseppa/rajat-126-128, mergetty),
-saapuminen (natiiviseppa/lento-esilataus, EI mergetty). Unity-työkopio Matkakirja-proto: puhdas master bf70290d.

**Alin rivi:** BUILD 17 -juna d04841a0 käännetty 6fd19114 (26.9. klo 03.48), SHA Fablelle ja Laitetestaajalle. Seuraavaksi: Laitetestaajan
PASS → `git merge --no-ff juna/b13` Matkakirja-proto-masteriin (tarkista puu = 6fd19114:n puu) → SHA Fablelle + Julkaisijalle →
build 18 -merget (radio-esikuuntelu, Pelikoodarin 137/149, Linssisepän esilataus/II, Siirtosepän paketti-paivitys).
