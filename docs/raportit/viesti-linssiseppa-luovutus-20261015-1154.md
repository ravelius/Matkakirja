# Linssisepän luovutus 15.10.2026 klo 11.54 (tilinvaihto, Postivahdin pyyntö)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/ (ketju `ajo-<nimi>.zsh`,
Julkaisija antaa `kaannos-<nimi>.nyt` (sisältö 1/2 = linja) / `simu-<nimi>.nyt`; merge-base-vahti ketjussa). Irrotus perl setsid. Testit
`sh Linssit-testit/kaanna.sh [suodatin]`, `zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"` (zsh, ei sh). Viestit AINA send_message id:llä
(/Users/Shared/Claude/osoitekirja.md); PT local_74630a27-8c1b-4ac3-9143-538efab8cbcd ≤ 3 riviä; Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97;
NS local_bf20055b-d582-4812-ba2b-b59c37a5e7b8; NUI local_33ba1387-d688-4e44-8e05-10951e61efc0; Äänittäjä local_846757a4-5dce-40d7-b43b-12bfa7008396;
PK local_97810d35-a79c-484b-8573-660a4c40eaa6. Simu iPad 00CF62C2-2FE6-4993-8475-5786CC40A7A3 (todistusajo.sh wt/proto-natiiviseppa-tyokalut).
OMISTAJA 09.36: "Ei testejä junaan" → junaan menevät erät suoraan NS:lle, kun unity-tarkistus 0 (ei simua/videota).

## 1. ODOTTAA: RANSKAN MUSEOKOHTIEN AJOITUS (Äänittäjän vastaus)
- Ranskan 68 kohtaa (43 teosta) on Resources/Museo/ranska/kohtazoom.json:ssa ilman aikoja (juna 192:ssa harmittomina, testi befd1cb5d).
- Sana-ajat ovat jo paikallisesti: proto-3d/_tyo/ranska-kohdat-20261014/ajat-v2/kohdat/<id>.json (51, tempo 1,10×). Kuivaharjoitus: kaikki 68 ajoittuvat.
- Äänet EIVÄT ole ämpärissä (taidemuseo-kertoja-v2/kohdat/louvre-inv-142.mp3 → 404; manifest-189b vain ranska-*-puhe). Kysytty Äänittäjältä
  aikataulu, manifestin nimi ja ovatko ajat-v2 lopulliset (orsay-rf-2849 vain 0,8 s). EI VASTAUSTA vielä.
- Kun vahvistus tulee: worktree /Users/Shared/Claude/wt/proto-linssiseppa-museokohdat191 (haara linssiseppa/museo-kohdat-193, befd1cb5d, junassa 192) →
  rebase/uusi haara juna-192:n päälle → `python3 -I tyokalut/museo_kohtazoom.py Assets/Matkakirja/Linssit/Resources/Museo/ranska/kohtazoom.json ei-ole.json
  /Users/Shared/Claude/proto-3d/_tyo/ranska-kohdat-20261014/ajat-v2` → testi (Ranskan ajoitettuja 0 → > 0) → tarkista.sh → NS. MuseoKertoja.Manifest
  pitää vaihtaa Äänittäjän uuteen manifestiin (MuseoSovitin.cs ~rivi 975), muuten kohdat eivät soi.

## 2. VALMIIT TÄNÄÄN (kaikki junassa 192: NS merge, tarkistettu merge-base)
- Andøyan lokit (omistaja 09.09): linssiseppa/andoya-lokit-192 eb0ee6c7f. RakettiLokit.cs + Ydin/Iss/AvausLokit.cs + AvausLokitTestit; kaartelijat valaan
  yllä, ylilentoparvi avauksen 8–11,4 s, Soundly lokki-huuto-01…06 3D:nä (hiipuvat). Simu 1: kaartelijat ja huudot OK (huutopurske ääniraidalla);
  ylilento leikkautui lähileikkaukseen → korjattu (mittakaava lähileikkauksen mukaan), korjausta EI ajettu simussa (omistaja: ei testejä).
- Museo: museo-kohdat-191 3811f47f5 ja -193 befd1cb5d (kaarimaski, taivas vain osissa, tummat kulmat, 5 bbox-korjausta, kohtazoom per maa).
- Praha v5 8753ce800.
- NUI:lle tarkistuslista "nimi kankaan päällä" Ranskan salista: 37 osuu / 4 rajalla / 10 vapaa,
  proto-3d/lokit/todistus-ranskasali2-ipad-20261015-0120/nimikyltit/TARKISTUSLISTA.md (älä siirrä kansiota ennen kuin NUI on käsitellyt).

## 3. MUUT
- Levy: omat app-kopiot poistettu paitsi lokit/linssiseppa-app/pallot-testi190c (LT); todistuskansiot NAS:lle
  /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/lokit/linssiseppa-20261015/.
- Numpy vain /opt/homebrew/bin/python3:lla (ilman -I).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).
- Puut omissa malleissa (linssiseppa/puut-omat-191 a239512e3) pysäköity, PT perui.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261015-1154.md).
Jono on muuten tyhjä: odota Äänittäjän vastausta Ranskan kertoja-äänistä (kohta 1) ja tee ajoitus heti vahvistuksen jälkeen; muuten "JONO TYHJÄ: Linssiseppä" PT:lle.
