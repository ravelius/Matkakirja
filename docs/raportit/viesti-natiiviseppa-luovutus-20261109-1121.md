# Natiivisepän luovutus 9.11.2026 klo 11.21

Edellinen: git show a8b4233b9:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1035.md.
Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 28 % ≥ 25 % (7.37).
Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd,
NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (prompt: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md rivit 6–7).

## 1. KESKEN: PALUULENNON BEIGE (PT 10.5x; worktree /Users/Shared/Claude/wt/proto-natiiviseppa-nostolento, haara natiiviseppa/noston-lento)
- ccbdaef0a: matkalento ilman huippua (MitoitaMatka → Aja samassa kehyksessä = ajo.matka) käynnistää AjoEnnakon. PT kuittasi
  (oma ajo lokit/natiiviseppa-matkalento-paluu: lähtö 15 km, kallistus 0 → mp-3 ei beigeä). NUI yhdisti: paikkapalkki 818e32b61.
- MUTTA NUI 11.2x: lokit/nui-paikkapalkki-1-iphone-818e32b61/p-5a-paluulento.png yhä TÄYSI beige (ei karttaa, ei nimiä,
  yläosassa usvamainen vaalea kaista), vaikka "ajoennakko: päällä". Ero omaan ajooni: lähtö Cosquer 1,68 km, kallistus 50°
  (KohdeKierto 40 s kierto käynnissä), paluu NostonLento.cs:176 AjaMatka(n.Lat, n.Lon, 835,5 km, n.Kallistus, n.Suuntima), huippu 0.
- Epäily: ei laattoja vaan kallistus/usva (paluussa kallistus 50° → 0 PalloAjo-sekoituksella, raja KaytettyRaja/KallistusRaja +
  Horisonttiusva.KallistusKatto; kiertoLiuku 0,8 s). Lisäsin 2abaa79d0: loki "MATKAKIRJA matkalento: t …" 0,5 s välein
  (korkeus, kallistus/käytetty/raja, usvan RuutuRajaY/voima/syvyys).
- ODOTTAA: JU:n Mac-ajo 2abaa79d0 iphone, skenaario _tyo/natiiviseppa/matkalento-paluu/sk-matkalento-paluu-2.txt
  → lokit/natiiviseppa-matkalento-paluu-2 (pyydetty 11.2x). Katso mp-2/mp-3 täysikokoisina + grep "matkalento: t" unity.log.
  Toistuu → korjaa syy (esim. paluun kallistus nollaan ennen nousua tai usva pois korkealla), uusinta; valmis-rivi PT:lle + NUI:lle.
  Ei toistu → ero NUI:n polussa (NahtavyysEsittely/NostonLento: tarkista n.Kallistus ja KohdeKierto-tila paluun alussa).

## 2. ODOTTAA: FPV-LATAUSKUVA PUHELIMELLE (PT 10.4x; wt /Users/Shared/Claude/wt/proto-natiiviseppa-fpv-lataus, natiiviseppa/fpv-latauskuva)
- a88e3648b PT:lle valmiina (vaaka iPad + pysty, kuvat katsottu). KK: puhelimessa potkurit leikkautuvat → Codex tilattu (85c59f2ee)
  1206×2622 pysty ja 2622×1206 vaaka, toimitus posti/drone-vastavalo-puhelin-20261109/ (postilaatikkohaara).
- c96b69bbb: FpvLatauskuva valitsee kuvan ruudun suhteesta (≥ 1,6 = puhelin): KuvaPuhelinVaaka/KuvaPuhelinPysty tyhjinä → iPadin kuvat.
- KUN KUVAT TULEVAT: katso että koko drone potkureineen näkyy → JU vie julisteet/fpv/drone-vastavalo/20261109/ (tai uusi kansio) →
  URL:t + sha256 vakioihin → unity-tarkistus sh → JU Mac-ajo sk-fpv-latauskuva.txt kolmella koolla (ipad, iphone, iphone-vaaka)
  → katso → PT:lle valmis-rivi. Ei omistajalle eikä junaan ennen PT:tä.
- Havainto PT:lle jo kerrottu: NUI:n FPV-näkymä puhelin pystyssä päällekkäin (pallo linssinappien/tietorivin/Manuaalin päällä).

## JONO
1. Paluulennon beige (yllä 1). 2. FPV-puhelinkuvat (yllä 2).
