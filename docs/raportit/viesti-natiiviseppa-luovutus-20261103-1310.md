# Natiivisepän luovutus 3.11.2026 klo 13.10 (7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1230.md (sen jonon kohta 0 tehty, kohta 1 osin).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä eikä omia käynnissä olevia ajoja.

## TEHTY TÄLLÄ VUOROLLA
1. **Simumittaus 7c4ade934** (JU:n täysi yhdistelmä, L2, ketju.zsh): kylmä Lontoo EI terävä laskeutuessa – Westminsterin puoli
   sumea 6,5–8,8 s, terävä ~9 s, lähinäkymä 14,2 s. Data heti (+85), pullonkaula piirto (jono 353 @6,4 s → 162 @12 s, ~30 palaa/s
   simulla). Ennakoitu: jono 0 @9,1 s. Kuvat: proto-3d/lokit/natiiviseppa-esilataus-kylma-7c4ade934-20261103-1241/ruudut/tulo-6_5-9.jpg.
2. **Iso iPad kylmä Lontoo 7c4ade934** (laitekäännös L2 12.47–12.55, ipad-lukossa 12.56–13.00, runko 1420265d7 palautettu):
   laskeutuminen 6,6 s, "kartta terävä" 2584 ms zoomauksesta (~9,3 s valinnasta; pallo 83 → 68 % z17-hauissa → 99 % 9,3 s),
   lähinäkymä valmis 10,2 s. Loki: proto-3d/lokit/natiiviseppa-fps-lontoo-kylma-7c4ade934-ipad-20261103-1256/matkaseuranta.txt.
   → PT:n ehto "sumea > 1 s" täyttyi → kohta 4.
3. **883d4931e – Pariisin paluu (PT 12.5x, kiireellinen, pienen iPadin yhdistelmään)**: NUI-simussa 7c4ade934 paluu Pariisiin ei
   antanut terävä-signaalia (katto 3 s) ja piirroksen alaosa oli sumea 8 s. Nyt PiirrosKerros.Saapuu(kaupunki) valinnasta
   (PeliOhjain, LahtoAlkaa-kohta): piirroskaupungin laaja taso + keskustan (48,857, 2,351) 3,5 km:n säteellä kaikki tasot ja leikkeet
   ladataan lennon aikana; PiirrosKerros.Terava (tarvittavat laatat muistissa; epäonnistunutta hakua ei odoteta) ja
   KarttaKerrokset.SaapumisTerava odottaa sitä. Ennakko päättyy, kun kamera levossa piirroksella tai valitaan muu kohde.
   Matkaseurantaan "piirros … puuttuu N".
4. **8e855c8d9 – z17-reunus 1 → 0** (ElavaEsilataus.LahiReunus): Lontoossa ~56 palaa (~16 %) vähemmän, laskeutumisruutu sama → ei
   kuvaparia. SS 4 → 3 jätetty: SS on ElavaTyylin yhteinen vakio (43 käyttöä), z17-kohtainen SS vaatisi muuttujan läpivientiä.
   - Testit 8e855c8d9: 2225/793/592, tarkista 0. Peili natiivi-backup peili/proto/natiiviseppa/lahto-tulo-218 = 8e855c8d9.
   - Haara natiiviseppa/lahto-tulo-218 (wt/proto-natiiviseppa-esilataus): e38d5d1ff → ff04040e7 → 883d4931e → 8e855c8d9.

## JONO
0. **SIMU (JU:n vuoro, JONOSSA 3: VS k5 → KS → NS)**: JU:lle pyydetty 13.09 yhdistäminen pienen iPadin yhdistelmään
   221739243 (1420265d7 + KS 347711dd9 + NUI c3f3e8ec8/ff04040e7) + 8e855c8d9. JU:n KÄÄNNÖS NYT -viestillä:
   `LINJA=2 zsh /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/lahto-tulo/ketju.zsh <yhdistelmän sha9>` (kylmä Lontoo) ja
   paluu Pariisiin (NUI:n skenaario: proto-3d/lokit/nui-pallot-kartussi-b5aead9f6-20261103/, koonti-paluu-pariisi.png; kysy NUI:lta
   skenaariotiedosto). Tarkista matkaseurannasta "piirros … puuttuu N" → 0 ennen laskeutumista ja "kartta terävä" < 3 s.
   Tulos PT:lle (≤ 3 riviä) ja JU:lle (VAPAA L2).
1. Jos Lontoo yhä sumea > 1 s laskeutumisesta iPadilla yhdistelmän jälkeen: z17-kohtainen SS 4 → 3 (ElavaTyyli: SS-parametri
   tasolle) – näkyvä muutos → kuvapari PT:lle ennen junaa.
2. Laitemittaukset 60 fps (Time Profiler): zsh _tyo/natiiviseppa/fps60/fps218.zsh ipad <.app> (JU:n vuoro). iPhone vain PT:n luvalla.
3. Osa D (20 ms ruutuvahti + muistimittaus isolla iPadilla Lontoo/Pariisi) kun NUI:n A+C rungossa.
4. GC-haara runkoon vasta PT:n luvalla (2856c5cc3, natiiviseppa/gc-mvt-218). Merget (VS/NUI/KS) PT:n kuittausten mukaan.
5. Avoin riski PT:lle: UITK-sumennuksen liuku muissa Kokoruutu-tilanteissa (+1 Gt). Lukitus/TF vain "OMISTAJA PYYSI JULKAISUA".
6. Odottavat ennallaan: LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:tä; PK bugi 2; NUI:n leikehaara 7280634c4 EI;
   Pariisin vieritys osa 3 EI NYT; Pariisin piirrosta EI optimoida; KS:n tasankoresepti → uusi SileaUrl-kierros; Z11–Z12-välitasoa EI.
   Simun RenderTexture 8256×11008 -virhe (LiikeLaatat.PaivitaVarjo kerroin 4): ehdotus rajata maxRenderTextureSizeen, ei tehty.
7. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- Juna 218 runko = 1420265d7 (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218; peili natiivi-backup). Isossa iPadissa
  1420265d7. TF 217 testaajilla.
- iPad-lukko: `zsh /Users/Shared/Claude/proto-3d/Matkakirja-proto-esikatselu/tyokalut/ipad-lukko.sh kaari natiiviseppa -- …`
  (EI proto-3d/tyokalut/ – siellä ei ole ipad-lukko.sh:ta). simu-lukko.sh on proto-3d/tyokalut/.
- Laitekäännös linjalla 2: laite210.sh pakottaa PROTO_LINJA=1 → L2:lla suoraan
  `PROTO_LINJA=2 PROTO_LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh proto-3d/tyokalut/natiiviseppa-skriptit/laite-sha.sh <sha9> <lokikansio>`
  (lokikansio lokit/natiiviseppa-app-210-lahto-<sha9>-laite, jota ipad-kylma.zsh odottaa). Tehtiin 12.47 (8 min).
- Testit ajetaan AINA yksi kerrallaan (testit210-rinn.sh kääntää suoraan työpuusta: älä muokkaa työpuuta ajon aikana).
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus (natiiviseppa/lahto-tulo-218), -introkoe eikä
  T7-kopioita. natiiviseppa-luovutus-20261103-1310 saa poistaa mergen jälkeen (tools/uusi-worktree.sh --poista <nimi>).
- Cron Unity-beeta ("4 9 * * *") sessiokohtainen → luo uudelleen nollauksen jälkeen.
- Testiskriptin "VIKA Pariisin intro ei päättynyt 120 s:ssa" toistuu (video silti ok) – selvitä, jos aikaa.

## JATKOKOMENNOT
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>` (~5 min).
- iPad kylmä: `zsh …/ipad-lukko.sh kaari natiiviseppa -- zsh proto-3d/_tyo/natiiviseppa/lahto-tulo/ipad-kylma.zsh <sha9>` (RUNKO_SHA-muuttuja).
- Muistikoe: `zsh .../juna218/muisti-koe218.sh <sha9>`. Pitkät ajot Bash run_in_background lokitiedostoon.
