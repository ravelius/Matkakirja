# Natiivisepän luovutus 9.11.2026 klo 12.37

Edellinen: git show cfc02bd0e:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1213.md (tausta: paluun p-5a, FPV-kamerakulma).
Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 25 % (7.37).
Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd,
NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (prompt: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md rivit 6–7).

## TEHTY JA KUITATTU TÄLLÄ VUOROLLA (12.15–12.37)
1. PALUUN ESILATAUS (PT 12.2x A) – PT KUITTASI 12.4x. d554280c0 (wt proto-natiiviseppa-nostolento, haara natiiviseppa/noston-lento,
   pushattu natiivi-backup). PalloKierto.PaluuOdottaa/PaluuPois/PaluunEsiAsento, AjoEnnakko.PaivitaPaluu (0,3/0,45/0,6), komento
   `maasto paluu`. iPhone-ajo lokit/natiiviseppa-paluu-esilataus-iphone: p-5a terävä, esiladattu 8,3 s, muisti +91 Mt (NS-arvio.md).
   NUI yhdisti kutsun paikkapalkkiin 027326c38 (JU ajaa 3 kokoa) → ei tehtävää, ellei JU/NUI löydä vikaa.
2. FPV-KAMERAKULMA e3379a7de – PT KUITTASI 12.3x (lokit/natiiviseppa-fpv-kamerakulma-iphone, NS-arvio.md).
3. FPV HOVER-KAASU (PT 12.3x käski) 95b65cbe4 (wt proto-natiiviseppa-fpvkamera, haara natiiviseppa/fpv-kamerakulma, pushattu):
   tikut eivät olleet kytkettyinä lentoon (FpvNakyma kirjoittaa nyt FpvLento.Tikut; komennon `fpv syote` voittaa) ja
   FpvParametrit.Leijuntakaasu 0,25 → 0,5 (tikku keskellä = leijunta). Testit 894/894, uusi ManuaaliTikkuKeskellaLeijuu.
   Ajo lokit/natiiviseppa-fpv-hover-iphone: 10 s manuaalissa 4 903 m, 0 km/h. Lähetetty PT:lle 12.37 (odottaa kuittausta);
   NUI yhdistää fpv-nappeihin (viesti jonossa), PK:lle tieto lentomallin muutoksesta.
   Huom PT:lle annettu: leijuessa manuaalin 30° näyttää lähinnä taivasta (FPV:n tapaan) – jos PT haluaa muutosta, se on uusi tehtävä.

## JONO
1. PT:n kuittaus hover-kaasuun (vain vastaanotto; ei tehtävää, ellei PT pyydä).
2. FPV-latauskuva puhelimelle: Codexin puhelinmuodot (posti/drone-vastavalo-puhelin-20261109/) EIVÄT vielä postilaatikossa (vain tilaus
   posti/paatoimittaja-codex-kuvat-drone-vastavalo-puhelinmuodot-20261109.md). Tarkista: git ls-tree -r --name-only origin/claude/postilaatikko | grep drone-vastavalo-puhelin
- unity-tarkistus: `sh Peli-testit/unity-tarkistus.sh` (EI zsh); testit `sh Peli-testit/kaanna.sh [nimi]`.
