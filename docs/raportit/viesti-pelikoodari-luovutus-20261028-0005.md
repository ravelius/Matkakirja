# Pelikoodari: luovutus 28.10.2026 klo 00.05

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN; vanha sisältö arkisto/pelikoodari-tila-20261027-ilta.md).
Edellinen luovutus: cb2d92f5d (-20261027-2138).

## Haara
- Proto `pelikoodari/liikkeet-213` (wt /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211, paikallinen proto-git), pää 05ed8f1c0.
  Peli 766/766, unity-tarkistus 0 virhettä. EI JUNAAN ennen KK:n/omistajan arviota parkour-videosta.
- NRE-korjaus erikseen junassa 213: pelikoodari/nre-213 f632e43bb (NS ff, runko vihreä 2213/761/563).

## Parkour-pelikoe (tänä iltana, KK:n ruututarkistuksin)
Ketju 12252cb31 → eb614c4ba → e376b135a → 9c41e787d → c4789ca00 → 6a3ad7317 → 05ed8f1c0:
- Ylitys esteen mallin mukaan (laatikot → vault_hand, penkki/ruukut → vault_low); juurikäyrän korkeuskerroin esteen todellisesta
  pinnasta (JuoksuLiikesarja.KorkeusKerroin, EsteenPinta; kämmen Codexin kohdassa 0,2 m vasemmalla / 0,23 m ennen keskikohtaa).
- Liikesarjan aikana ei juoksun lisäliikkeitä (juoksee &= tanko == null) ja suunta pysyy ponnistuksen suunnassa (sarjaYaw):
  tangon sivukippaus johtui puomin jälkeisestä käännöksestä, vault_handin "selälleen" on Codexin sivuylitys (vahvistettu QA-kuvista).
- Codexin reitillä (sokkelo 0, vain QA): parkour-kamera 4,8 m / 3,2 m koko reitillä (QA parkourkamera 0|1), liukuesteet 3,2 m
  ylemmäs (KoristeetYlos), kameran tieltä pehmeä häivytys 0,35 s (JUOKSU_HAIVYTYS-kopio, kopiot pois Tuhoassa).
- Videot _tyo/pelikoodari/parkour-20261027/: parkourvideo7-05ed8f1c0.mp4 (koko 35,3 s) ja parkourvideo7-omistaja-05ed8f1c0.mp4
  (10,4–33,5 s) → KK 00.0x. Ajo: aja-parkour9.zsh + simu-parkour2.txt (5 s käsitukiylityksen jälkeen).
- Tunnetut: koko videon lopussa 33,7 s → koereitin drone räystääseen/tolppaan (vilkkuu) → omistajan versio rajattu; kysytty KK:lta.
  Heilautus 0,24 s = Codexin leike (KK hyväksyi huomautuksena). Pelaajan lähikamera vain sokkelossa, jossa ei puomeja.

## Codex-posti (claude/postilaatikko)
- Kivet 2D-pintoina (OMISTAJAN PÄÄTÖS 21.51) bead49937 + LR:n pintamitat bba13fd6b; Codex toimitti c56b5c011, kuitattu 31433f5aa
  (SHA 110/110), LR kokoaa.
- Katot, friisit, rappaus (OMISTAJAN PÄÄTÖS 21.54) 2258b56d1 + LR:n mitat 7eb80206c (friisi 2048 × 512 ≈ 496 px/m, poikkeus).
- Penkki valkoisena marmorina (KK 23.4x) 004c90cc6 – vastaanotto PK (asetus peliin).

## Seuraavaksi
1. KK:n vastaus v7:stä (loppu korjataan vai rajaus riittää) → omistajalle aamulla KK:n kautta → merge-pyyntö liikkeet-213 junaan
   (liiketiedostot ämpäriin JU:lla, LiikkeetPerus/Viitta-oletus).
2. Marmoripenkki Codexilta → esteet-v2 hyppy-penkki (JU ämpäriin) → uusi video.
3. Kaavun morfi (robe-motion-review-v2 weights), run_upstairs, jump_down (PT) – edellisen luovutuksen listalta.

## Opit
- Codexin reitin drone laskeutuu porteissa 2,2 m:iin (oviaukko) pitkiksi jaksoiksi → esteet kameran tiellä; tarkista loki "drone laskeutuu".
- Ruututarkistuksen ajat vaihtelevat ajosta toiseen ~1–2 s: pyydä agenttia varmistamaan liikkeiden ajat yleiskuvasta.
