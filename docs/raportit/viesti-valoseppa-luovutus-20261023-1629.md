# Valoseppä: luovutus 23.10.2026 klo 16.29 (kova raja 37 %, Postivahti)

Tili vvi＠vvi.fi. PT: local_5df52e10-10e4-4b72-9554-0049db300dfe, NS: local_8254cd90-9a85-4d61-8a06-085e7562f05f,
JU: local_d8cad7de-3ff8-4f4b-8787-baa80836e175. Päiväkirja `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md`
(rivit 15.58–16.3x). Lue tämä kokonaan ennen jatkoa.

## 1. TIILET ENSIN (PT 16.0x/16.2x): juoksu-210:n J-regressio

- LT fd109267f: `valo tiilet 0` → J 11,63 ms (vihreä), perus 19,13. Muut kytkimet punaisia.
- **kevyt2 eac7b7f2c (pihan sin → hash12) on rungossa 187277a13 mutta PUNAINEN** (LT (f) 9538d76bf: J 19,12). Sin ei ollut syy.
- `tiilet` kytkee pois vain JuoksuLattia.shaderin pääpassista: (1) katot ja muurin harjat (Laji 12–14): KattoTiilet-rivien
  normaali/AO pikselissä + kate-kuva mip 6:sta; (2) pihan k3-yksityiskohdat (vivahde, suonet, lohkeamat, kiilto). Ei verkkoja,
  piirtokutsuja, läpinäkyvyyttä eikä C#-työtä (vain globaali _JuoksuTiilet). Tämä kerrottu PT:lle.
- **Odottaa: LT:n (h) d97bca990 (= runko ilman kevyt2:ta + fd3ba189f): `valo tiilet 2/4/3/0`** (2 kevyt, 3 vain katot k3,
  4 vain piha k3). Tulos NS:n/PT:n kautta → tee kevennys sen osan mukaan, joka maksaa.
- Epäily: koska ALU-kevennys (sin) ei auttanut, hinta voi olla rekisteripaine/spill tiilet-haarassa (vain suoritettaessa) →
  korjaus: katoille rivinormaali valmiiksi leivottuna (tekstuuri) tai pihan yksityiskohdat tekstuurista (vähemmän eläviä arvoja).
- Haarat (wt `/Users/Shared/Claude/wt/proto-linssiseppa2-grafiikka`, nyt checkoutattuna `linssiseppa2/grafiikka-210-tiilet-kevyt`):
  - `linssiseppa2/grafiikka-210-tiilet-kevyt` fd3ba189f (18b47ba05:n päällä, ilman kevyt2:ta): `valo tiilet 0–4`.
  - `linssiseppa2/grafiikka-210-tiilet-kevyt-k2` 531741763 (= kevyt2 + k8 ec85ff119 + k8b 3c90d817c + tiilet kevyt), ristiriidaton
    rungon kevyt2:n kanssa. NS:llä varalla.
- Simuparit: kierros2/sk-tk.txt + aja-tk.zsh (a kevyt, b k3, c k2; samat paikat kuin kierros2) valmiina; käynnistys
  `zsh kierros2/kaanna-l2.zsh <sha>` → `zsh kierros2/aja-tk.zsh <sha>` (parit kierros2/tk-<sha>/). kv2-ketju peruttu (ei tarpeen).
  **Simupari PT:lle ennen junaa.**

## 2. RAKETTIVIDEO (omistajan päätös 15.5x "Jatka videota"; haara linssiseppa2/rakettivideo-210, wt proto-linssiseppa2-rakettivideo)

- 374acfcf4 (a65fa8e10:n päällä): pilvi päivän muodossa yön valolla × 1,6, meren liekkikajo + leveä juova, laaja kuva
  (lähikuvat pois video-tilassa, kuva-ala ≥ 0,75, `valas hyppy` siirtää avauksen pelin hypyn 1 kohtaan). Ajo
  `rakettivideo/ajo-20261023-1559-pysty/` (video + vertailu/ + NAYTE.md) → PT 16.2x: **selvä edistys**, mutta T+6…9 pilvi tumma.
- **962139005** (PT 16.3x): pohjavalo 0,22, tummuminen loiva (≥ 220 m, kauko 0,75, harmaus 0,45), sisävalon säde × 2,6,
  emissio täysi T+7:ään, hiipuu 5 s, 1,5 km:iin. JU käänsi Mac 16.23. **Ketju `rakettivideo/ketju-9621.zsh` taustalla**
  (loki ajo-9621.log: odota-sha → aja-mac → vertailu.py). Jos lokissa ei ole ajoa (sessio nollattu), aja ketju uudelleen.
- Seuraava: katso `vertailu/peli-vs-video.jpg` + `nasa-vertailu.jpg` uudesta ajokansiosta; jos pilvi T+6…9 lämmin ja vaaleareunainen
  → 3 rivin näyte PT:lle (video, vertailut). Säätö ilman käännöstä: `linssi raketti savu pohja|kauko|tummam|harmaus <x>`,
  `linssi raketti video pilvikoko|merivoima|merileveys|merikajo <x>` (lisää aja-mac.zsh:iin ennen laukaisua).
- Huom vertailusta: pelin T+6/T+9 = lentoaika (HUD); videon näyttöaika on alussa tiivistetty (vertailu.py: T0 + 2,7 s / 3,5 s).

## Jono

1. Tiilet: (h)-tulos → kevennys oikeaan osaan → NS → LT J; simupari PT:lle.
2. Rakettivideo 962139005 -ajon tarkistus → näyte PT:lle.
3. 18b47ba05 (k8b) junaan vasta J:n jälkeen (PT). Harjakoristeet odottavat Codexia. taide.md PR #5186 ennallaan.

## Opit

- Sinin poisto ei korjannut J:tä → iPad-GPU:n hinta ei aina ole ALU:ta; mittaa puolitus samalla käännöksellä (QA-tilat).
- Videon laukaisu: näyttöaika ≠ lentoaika (alussa tiivistetty); vertaile HUD:n lentoajalla.
- `out var` -nimet törmäävät pitkässä if-else-ketjussa (CS0136): käytä yksilöllisiä nimiä.
