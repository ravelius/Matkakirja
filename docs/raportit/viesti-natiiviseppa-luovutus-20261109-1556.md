# Natiivisepän luovutus 9.11.2026 klo 15.56

Edellinen: git show c5ea06f6d:docs/raportit/viesti-natiiviseppa-luovutus-20261109-1503.md (lue kohdat 7 tiedostojako VS:n kanssa).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 25 % (7.37), ajot JU:lla.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (kuten edellisessä luovutuksessa; ILMAN -I:tä, UUSI-rivit → PT "UNITY UUSI: …").

## TEHTY 15.10–15.56 (kaikki KOE, ei junaan; proto-3d, paikalliset haarat, ei pushia)
- FPV-LATAUSKUVA a425b8868 katsottu (3 ruutua) → PT kelpaa. PT: iPadille merikallio → e0e61df24 (haara natiiviseppa/fpv-latauskuva):
  KuvaRuudulle käyttää merikallio vaaka/pysty kaikilla ruuduilla (iPad 4:3 peittävä keskirajaus), vastavalo varana. Ajo -3-ipad-e0e61df24 katsottu → PT kelpaa.
  PT: palkin paikka (0,8 korkeus, sama kuin juoksupelin latausruutu) pidetään, EI muutosta. → LATAUSKUVA VALMIS (koe).
- FPV-VUORET (haara natiiviseppa/fpv-vuoret, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-fpv-vuoret):
  c8963e7eb KEINO 1 liukuva kerroin: FpvLento.LiukuLahi (oletus 1) → LentoKerroin, 28–112 km TODELLISEN maaston yllä (smoothstep), pehmennys 0,7 s,
    porras 0,05, väli 0,4 s; alun kerroin kiintopisteestä; komento `fpv liuku kLähi [alaKm yläKm]`, 0 = pois. KorkeusKerroin: _fpvLahi.w päivittyy Asetassa.
  541089e8a LentoKerroin 3 → 2 (ajo -1-ipad-9edbc14a9: 2 pyöreät/luonnollisin, 3 teräväkärkinen, 5 piikit; PT: suunta hyvä).
  e6a9ae35d HUD-korkeuden mittakaava = kartan kerroin koko lennon (FpvLentomalli.Korostus = MittaKerroin): sama kamera = sama lukema.
  PT 15.5x: parit omistajalle vain SAMASTA KAMERASTA (sama korkeus ja rajaus) → skenaario _tyo/natiiviseppa/sk-fpv-vuoret-3.txt:
    yksi lento k15, sitten `fpv kerroin 2`, sitten `fpv liuku 1` (Automaatti pitää maailman korkeuden) → s-15 | s-2 | s-2-liuku.
  Ajo -2-ipad-c8963e7eb (eri lennot) katsottu: liuku 1 (k≈1,03 lähellä maata) tekee Alpeista matalia kumpuja, 1,5 lähes sama; k3 vuoristoisempi.
    ALUSTAVA SUOSITUS: vakio k2 ILMAN liukua (keino 1 ei paranna). Liuku "asetuksia 0" leijuessa = oikein (alun kiintopiste).
  Huom: samassa kamerassa (k15-korkeus) k2-liu'un kerroin on vain ≈1,5 (maan yllä oikea ~71 km) → ero s-2:een pieni; kerro PT:lle.
- VS 7ebd3e7c0 (oma haara): fpvLahi-lohko lukee elävän _korkeusKerroin; yhdistäessä tee_tileset.py uudelleen (ei käsin).
- HUIPPUNIMET (haara natiiviseppa/huippunimet, worktree /Users/Shared/Claude/wt/proto-natiiviseppa-huippunimet, juna 223:n päälle):
  31b609027 ajo -2: a-k2 nimet huipuilla hyvä, c-k2 4 nimeä vs ~25 → EI kelpaa (PT:lle kerrottu).
  1f89f4f0d koko rajattu merenpinnan kohdan kokoon (r.nosto, Aseta-skaala) – ajo -3: c-k2 yhä 4 nimeä. `nimet ehdokkaat`: syy "usva" 192 (jättikoko 32).
  49f7825ca horisonttiusva (Peitto ruutu-y + SyvyysPeitto) nostetulle nimelle merenpinnan kohdasta. unity-tarkistus 0, Kartta-testit 729/729.
  Skenaario _tyo/natiiviseppa/sk-huippunimet-2.txt (loppuun `nimet ehdokkaat` → unity.log "nimet hylatyt …|elava-huippu|syy").

## ODOTTAA (JU ajaa; lokit proto-3d/lokit/)
1. EF natiiviseppa-fpv-vuoret-3-ipad-e6a9ae35d (s-15, s-2, s-2-liuku samasta kamerasta): katso, tarkista lokista sama korkeus ja paikka kaikissa
   (`fpv tila` rivit) → kolmikko (pari.py tai PIL-rinnakkain, sama rajaus) PT:lle + YKSI suositus (todennäköisesti k2 ilman liukua; liuku pois = `LiukuLahi = 0f`).
   PT haluaa tämän ennen KK:ta.
2. EI natiiviseppa-huippunimet-4-jalkeen-ipad-49f7825ca: parit `/opt/homebrew/bin/python3.14 -P /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pari.py
   lokit/natiiviseppa-huippunimet-1-ennen-ipad-108246c2f/X.png lokit/…-4-…/X.png ulos "ENNEN 108246c2f" "JÄLKEEN 49f7825ca"` (X = a-k2, a-k4, c-k2).
   Kelpaa, jos c-k2:ssa suunnilleen yhtä monta nimeä kuin ennen JA huipuilla; arvioi myös, näyttääkö täysin peittävä nimi usvaisen vuoren päällä oudolta.
   Jos yhä katoaa: unity.log "nimet hylatyt" -rivi, `tr ';' '\n' | grep elava-huippu | awk -F'|' '{print $3}' | sort | uniq -c`.
   → PT 3 riviä.
- Ei muuta jonossa. Kuvat ≤ 1000 px (sips -Z 1000 kopio scratchpadiin).

## LISÄYS 15.59
- KOHTA 1 TEHTY: fpv-vuoret-3 katsottu (sama paikka, HUD 4 900 m kaikissa; liuku 1,52) → PT: suositus k2 ilman liukua, kolmikko lokit/natiiviseppa-fpv-vuoret-3-ipad-e6a9ae35d/kolmikko-s15-s2-liuku.png.
  Jos PT/KK hyväksyy: LiukuLahi = 0f oletukseksi (haara natiiviseppa/fpv-vuoret). Jäljellä vain kohta 2 (huippunimet-4, JU ajaa 15.57 alkaen).
