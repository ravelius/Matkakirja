# Natiivisepän luovutus 9.11.2026 klo 14.22

Edellinen: git show 8a7623400:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1327.md (tausta: maisemakaari, p-5a-portaat fb77e12b1, FPV).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 26 % (7.37), luonteva tauko.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (prompt: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md rivit 6–7;
/opt/homebrew/bin/python3.14 …/natiiviseppa-skriptit/unity-julkaisut.py ILMAN -I:tä, UUSI-rivit → PT "UNITY UUSI: …").

## TEHTY 13.30–14.22
- KORKEUSKOE LENNOILLE (omistaja 8.11. 11.19, PT 13.4x; KOE, ei junaan ilman korttia; PT 14.1x: pohja fb77e12b1, EI siirtoa 223:n päälle):
  haara natiiviseppa/lento-korkeuskoe (natiivi-backup) 7fd38ae8b → 1e55e642a → b998fa447, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-ennakkokoe.
  KorkeusKerroin: Perus (asetettu) + LentoKerroin (oletus 2 = pois) + LentoOsuus + LentoPito; AsetaLento ei laukaise Muuttui joka kehys (vain alku/loppu,
  RajaArvo PalloReiat-marginaaliin). PalloKierto.PaivitaLentoKorkeus: matka- tai saapumisajo, nousu t 0–0,15, lasku 0,8–1,0, perillä tasan 2; katkos liukuu 1,5/s.
  Topografia.KerroinNyt → Perus. Komennot `lentokorkeus <k>` ja `lentokorkeus pito 0|1|pois`. Aloituslento (Nappula) EI mukana. unity-tarkistus 0.
- Mac-ajot JU: 1 (1e55e642a) kuva pysäyttää pelin → lennon kohta ei toistu; 2 (b998fa447, sk-lentokorkeus-2.txt) KATSOTTU, parit PT:lle 14.2x:
  proto-3d/lokit/natiiviseppa-lentokorkeus-2-{ipad,iphone}-b998fa447/pari-{a,b}-k2-k4.png, RAPORTTI.md ipad-kansiossa.
  Puutteet (myös k2:ssa pienempinä): huippunimet 0 m:ssä (Nimikerros/MaanPinta.Hae 0 Pariisin ulkopuolella, paikat välimuistissa) ja harjanteiden sahalaita.
- PK:lle kerrottu PalloKierto.cs-muutos (1e55e642a; b998fa447 muutti samaa metodia).
- Työlistan tilanne päivitetty (Peruskartan korkeusliioittelu lennoilla).

## ODOTTAA
1. PT/KK/omistaja korkeuskokeen pareista: hyväksyntä → korjaa huippunimet (ele → Sovita, uusinta kertoimen muuttuessa) + sahalaita (tarkempi maastotaso lennon ajaksi,
   muisti mitataan) + mahdollinen aloituslento; hylkäys → haara jää.
2. NUI yhdistää fb77e12b1 paikkapalkki-paluuhun ja pyytää JU-ajon p-4 + p-5a (ks. edellinen luovutus kohta 1).
3. PK:n sauvan kierto: kerro PK:lle rivillä jokaisesta PalloKierto.cs-commitista.
4. FPV-puhelinkuvat: postilaatikossa vain tilaus (posti/paatoimittaja-codex-kuvat-drone-vastavalo-puhelinmuodot-20261109.md), ei kuvia 13.33.
- unity-tarkistus: `sh Peli-testit/unity-tarkistus.sh` (EI zsh).
