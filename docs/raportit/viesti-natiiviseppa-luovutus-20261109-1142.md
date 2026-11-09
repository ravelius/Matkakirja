# Natiivisepän luovutus 9.11.2026 klo 11.42

Edellinen: git show 7f5c82328:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1121.md (tausta: FPV-latauskuva, paluulento).
Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 25 % (7.37).
Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd,
NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (prompt: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md rivit 6–7).

## 1. PALUULENTO (wt /Users/Shared/Claude/wt/proto-natiiviseppa-nostolento, haara natiiviseppa/noston-lento, push natiivi-backup)
- TEHTY 1111b681e: AjoEnnakko vain lennon ajan (PalloKierto.cs ~865: ajo.aika < ajo.pallo.Kesto). Syy: nähtävyyden 40 s kohdekierto
  jatkoi samaa ajoa, ennakkokamerat jäivät lennon loppuasentoon → perillä pallo 20 % (NUI 818e32b61) vs 95–99 % (d87530c60).
  NUI yhdisti (5f8860254): p-4 KORJAANTUI.
- Oma toisto lokit/natiiviseppa-matkalento-paluu-2 (2abaa79d0, 1,68 km 50°, ei kiertoa): paluu terävä mp-2 (t~1 s) ja mp-3 (t~3 s).
- AVOIN: NUI 5f8860254 p-5a (lokit/nui-paikkapalkki-1-iphone-5f8860254) sumea: kuva t ~2 s (8→86 km, kallistus ~28–33°, usvan raja
  0,10 → ei usva). Nousu ohittaa tarkkuustason ~0,2 s:ssa → karkeampi taso. PT:lle ehdotettu (11.4x, jonossa): ennakot matkalennolla
  0,6/1,2 s (nyt AjoEnnakko.Ennakot 0,3/0,7) yhdellä Mac-ajolla, tai hyväksytään liike-epäterävyytenä. Odota PT:n kuittaus ennen työtä.
  iPad- ja vaaka-ajot 5f8860254:stä tulossa JU:lta (NUI:n tilaus) – katso p-5a niistäkin.
- Kulkuloki 2abaa79d0 ("MATKAKIRJA matkalento: t …" 0,5 s välein) on haarassa; poista ennen junaa tai jätä kehittäjälokiksi.

## 2. ODOTTAA: FPV-LATAUSKUVA PUHELIMELLE (ennallaan, ks. edellinen luovutus kohta 2)
- Codexin kuvia ei vielä postilaatikossa (origin/claude/postilaatikko: vain tilaus posti/paatoimittaja-codex-kuvat-drone-vastavalo-puhelinmuodot-20261109.md).

## JONO
1. PT:n vastaus ennakon aikaistukseen (yllä 1, AVOIN). 2. FPV-puhelinkuvat.
