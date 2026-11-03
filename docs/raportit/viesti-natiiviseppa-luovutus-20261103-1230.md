# Natiivisepän luovutus 3.11.2026 klo 12.30 (konteksti 28 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1200.md (sen jono käsitelty alla).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä eikä omia käynnissä olevia ajoja.

## TEHTY TÄLLÄ VUOROLLA
1. **Juna 218 runko 1420265d7** (lähtö/tulo 9613f5ad7+ca505e175+299b767f4): testit 2225/793/591 tarkista 0, peili
   natiivi-backup peili/proto/natiiviseppa/juna-218, rivi JU:lle. JU asensi 1420265d7:n isoon iPadiin 12.16 (omistaja katsoo).
2. **PT:n työ 2 selvitetty** (proto-3d/_tyo/natiiviseppa/lahto-tulo/SELVITYS-kartussi-konsoli-20261103.md, kuvat samassa kansiossa):
   punainen laatikko = Unityn Development Console (simukäännökset Development, laite/TF Release → ei näy laitteella);
   ISO-BRITANNIA = NUI:n kartussi (Kartuscha.TodellinenMaa) vaihtuu kohdemaahan jo valinnassa (näkyy myös laitteella) → NUI:lle
   PT:n päätöksellä. Simun RenderTexture 8256×11008 -virhe (LiikeLaatat.PaivitaVarjo kerroin 4) – ehdotus rajata maxRenderTextureSizeen, ei tehty.
3. **PT:n työ 1 (kylmä tulo, kiireellisin; KK 12.16: Lontoo sumea 7,0–9,0 s, Tower Bridge sumean päälle 8,5 s)**, haara
   natiiviseppa/lahto-tulo-218 (wt/proto-natiiviseppa-esilataus), peili natiivi-backup peili/proto/natiiviseppa/lahto-tulo-218:
   - **e38d5d1ff**: syy = lennon 4 s aikana valmiiksipiirto odotti vektoripaloja kahdella taustapaikalla (< 20 palaa valmiina,
     Cesium joutilas). Nyt valinnassa kohteen kaikki datapalat (Lontoo 84, ~16 Mt; ElavaEsilataus.DataPalat, keskustan z14 ensin)
     jonoon, kohdehaut 5/6 verkkopaikkaa (ElavaKohdePaikat), lähinäkymä 4 piirtopaikkaa kun Cesium ei hae. Matkaseurantaan
     "valmiiksi +N, data kohde +N jono N haussa N". Testi KohteenDataPalatZ14Ensin.
   - **ff04040e7**: KarttaKerrokset.SaapumisTerava(kaupunki) (lataus ≥ 99 %) NUI:n trailerille; NUI kytki sen c3f3e8ec8:ssa
     (Saapumistraileri.KarttaTerava, katto 3 s NUI:lla). Oma PeliOhjain-odotus (af33a29ba) poistettu ff04040e7:ssä.
   - Testit ff04040e7-tasolla 2225/793/592 tarkista 0. Analyysi: proto-3d/_tyo/natiiviseppa/lahto-tulo/MITTAUS-ca505e175.md (loppu).
   - Piirtonopeus Macilla (ElavaKoe, Lontoon z14 8186/5447): z17 56 ms/pala, z16 110 ms. Koeaineisto scratchpadissa (häviää).

## JONO
0. **MITTAUS (JU:n vuorolla, PT 12.2x hyväksynyt myös ison iPadin)**: JU lähettää "KÄÄNNÖS NYT L2" VS:n jälkeen →
   `LINJA=2 zsh /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/lahto-tulo/ketju.zsh 7c4ade934` (JU:n täysi yhdistelmä =
   1420265d7 + KS Big Ben 9b442edc5 + NUI e9e815017 + c3f3e8ec8 [sis. ff04040e7]; commit linja2-kopiossa). Taustalle lokiin.
   Tulos: ruudukko tulo-6_5-9.jpg + matkaseuranta.txt (kylmä). Sitten iso iPad: L1-laitekäännös (JU antaa L1:n PK 218ac:n jälkeen
   tai L2:n simun jälkeen; `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh 7c4ade934 lahto-7c4ade934`
   → äppi lokit/natiiviseppa-app-210-lahto-7c4ade934-laite) ja `zsh tyokalut/ipad-lukko.sh kaari natiiviseppa -- zsh
   proto-3d/_tyo/natiiviseppa/lahto-tulo/ipad-kylma.zsh 7c4ade934` (palauttaa runkoäpin 1420265d7, RUNKO_SHA-muuttuja).
   Ilmoita JU:lle ja PT:lle: terävä/ei (valinnasta s), PT haluaa e38d5d1ff+ff04040e7 pienen iPadin yhdistelmään, jos terävä.
1. Jos ei vielä terävä laskeutuessa (z16+z17 ~230 palaa piirto pullonkaulana): seuraava keino z17:n SS 4 → 3 (kuvapari PT:lle,
   näkyvä muutos) tai z17-reunus 1 → 0 (ElavaEsilataus.Lahinakyma). Matkaseurannan "data kohde"/"jono" kertoo, jäikö verkko vielä.
2. Laitemittaukset 60 fps (Time Profiler): zsh _tyo/natiiviseppa/fps60/fps218.zsh ipad <.app> (JU:n vuoro). iPhone vain PT:n luvalla.
3. Osa D (20 ms ruutuvahti + muistimittaus isolla iPadilla Lontoo/Pariisi) kun NUI:n A+C rungossa.
4. GC-haara runkoon vasta PT:n luvalla (2856c5cc3, natiiviseppa/gc-mvt-218). Merget (VS/NUI/KS) PT:n kuittausten mukaan.
5. Avoin riski PT:lle: UITK-sumennuksen liuku muissa Kokoruutu-tilanteissa (+1 Gt). Lukitus/TF vain "OMISTAJA PYYSI JULKAISUA".
6. Odottavat ennallaan: LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:tä; PK bugi 2; NUI:n leikehaara 7280634c4 EI;
   Pariisin vieritys osa 3 EI NYT; Pariisin piirrosta EI optimoida; KS:n tasankoresepti → uusi SileaUrl-kierros; Z11–Z12-välitasoa EI.
7. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Juna 218 runko = 1420265d7 (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218; peili natiivi-backup). Isossa iPadissa
  1420265d7 (JU 12.16). TF 217 testaajilla.
- Simu ketju: LINJA=<n> zsh proto-3d/_tyo/natiiviseppa/lahto-tulo/ketju.zsh <sha9> (oletus L2; tulos myös matkaseuranta.txt).
- Testit ajetaan AINA yksi kerrallaan (rinnakkaiset testit210-rinn.sh-ajot jakavat $TMPDIR/natiiviseppa-testit210-rinn:n → väärä tulos).
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus (natiiviseppa/lahto-tulo-218), -introkoe eikä
  T7-kopioita. natiiviseppa-luovutus-20261103-1230 saa poistaa mergen jälkeen (tools/uusi-worktree.sh --poista <nimi>).
- Cron Unity-beeta ("4 9 * * *") sessiokohtainen → luo uudelleen nollauksen jälkeen.
- Testiskriptin "VIKA Pariisin intro ei päättynyt 120 s:ssa" toistuu (video silti ok) – selvitä, jos aikaa.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>` (~5 min).
- Muistikoe: `zsh .../juna218/muisti-koe218.sh <sha9>`. Pitkät ajot Bash run_in_background lokitiedostoon.
