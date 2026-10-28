# Pelikoodari: luovutus 28.10.2026 klo 02.00

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus: 7ce9c24da (-20261028-0051, PR 5394).

## Haara
- Proto `pelikoodari/liikkeet-213` (wt /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211, paikallinen proto-git), pää 6c8977774.
  tarkista.sh 0 virhettä, vahdit ok, Linssit-testit 12/12. EI JUNAAN ennen omistajan arviota.
- Ketju: 645084d33 (v8) → 48656761f (v9: jähmettymät + kääntöjousi) → b55d65b5b (v10: kova raja 0,3 m) → 6c8977774 (kaavun morfi).

## Tila
- Parkour v10 (b55d65b5b): KK HYVÄKSYI omistajan aamuvideoksi keskeneräisenä: _tyo/pelikoodari/parkour-20261027/
  parkourvideo11-omistaja-b55d65b5b.mp4 (koko parkourvideo11-b55d65b5b.mp4). Nykäyksiä 0, väläyksiä 0, ei pilarin sisään.
  Korjattu: muistokuplan LoadAll-diagnoosi (183 ms), esteiden JUOKSU_HAIVYTYS-lämmitys (148 ms), Codexin reitin kamerakääntö
  jousella (ParkourKaantoS 0,22 s, ei kovaa kattoa), etäisyysjousi + näkölinjan pito 0,6 s + kova raja NakoRajaM 0,3 m.
  Jäljellä (Sonnet): 26,3 s pilari peittää ~1/3 kuvasta ~0,1 s; 27,8 s käännöksen nopein vaihe rajatapaus.
- KAAVUN MORFI (6c8977774, Codexin robe-motion-review-v2): DioraamaGlb lukee weights-kanavat (GlbAnimaatio.Painot, erillään
  TRS-kanavista), GlbLeikeLainaus kohdistaa nimellä, DioraamaSekoitin.Muodot (leike ilman kanavaa = 0, crossFade),
  JuoksuHahmot: morfit blendshapeiksi + SetBlendShapeWeight. QA `ui juoksupeli kaapu 0|1` (hyppy = jump_robe, oletus POIS).
  Testi oikeilla tiedostoilla: JUOKSU_KAAPU=<kansio> Linssit-testit/kaanna.sh GlbLeikeLainaus → jump_robe 0,96 s, painon huippu 1,00.
  Data: _tyo/pelikoodari/hahmot-v11-koe = v10 + päämallit morfilla (apply_robe_morph v2, SHA-tarkistukset läpi) + v2-liikkeet.
- Kaapu-simuajo (aja-kaapu1.zsh, simu-kaapu1.txt; loki lokit/todistus-kaapu1-6c8977774-20261028-0154): morfi latautui
  ("Puyi: morfit 1 (robeHemLiftLeft)", myös perus), poikkeuksia 0. MUTTA nousua EI TODENNETTU: kamera takaa, kuvat 0,3 s
  "efekti hyppy" -rivistä näyttävät juoksua → epäselvää, soiko jump_robe (efekti-rivi voi tulla eri hetkellä kuin hyppyleike).

## Seuraavaksi
1. Kaapu: lisää lokirivi, kun jump_robe alkaa ja painon huippu (Hahmo.Aseta / V4Leike), ja kuva sivusta/edestä (QA-kamera tai
   kuvaruutu); uusi ajo → KK:lle. Ota käyttöön vasta KK:n/omistajan hyväksynnällä (stairs_robe portaisiin run_upstairsin kanssa).
2. Marmoripenkki Codexilta (tilattu 004c90cc6) → esteet-v2 hyppy-penkki ämpäriin JU:lla → uusi video.
3. run_upstairs portaisiin, jump_down (PT päättää). Merge-pyyntö liikkeet-213 junaan vasta omistajan arvion jälkeen
   (liiketiedostot + hahmot-v11 ämpäriin JU:lla).

## Jatko keskeytyksestä (Mac-uudelleenkäynnistys 28.10.)
- Pitkiä taustaajoja ei ole käynnissä. Ajot ovat kertaluonteisia: käännös JU:lta (KÄÄNNÖS/SIMU NYT), sitten
  `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/parkour-20261027/aja-kaapu1.zsh` (tai aja-parkour13.zsh) uudelleen alusta.

## Opit
- Codexin reitin kamerassa ei saa olla kovaa kulmakattoa eikä pelkkää jousta näköesteessä: jousi + kova raja osuman eteen.
- Todistusajon `oleta` ei näe ennen ikkunaa tullutta lokiriviä (PUUTE "morfi päämallissa" oli väärä hälytys).
- Ruututarkistuksessa kaapu näkyy vain sivulta/edestä: pyydä kuvakulma ennen ajoa.
