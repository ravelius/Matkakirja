# Natiivi-UI: luovutus 11.11.2026 klo 19.22 (kontekstivahti 25 %; korvaa -1812:n, haara natiivi-ui/luovutus-20261111-1812 f4dd3361b)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f. Näkyvät suoraan KK:lle, PT kopiona.
Natiivikoodi: worktree /Users/Shared/Claude/wt/proto-nui-pallo (remote natiivi-backup; nyt haarassa natiivi-ui/petit-palais-kyltti).
Tarkistus: `sh Peli-testit/unity-tarkistus.sh </dev/null`; Kartta-testit: `sh Kartta-testit/kaanna.sh </dev/null`. ÄLÄ KOSKAAN pkill -f.
Kaikki Mac-ajot JU:n kautta. Skriptit /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-*.txt; lokit /Users/Shared/Claude/proto-3d/lokit/nui-*.

## JUNASSA (ei toimia, ellei PT/JU kysy)
- 224.79 LINKISSÄ (5d382cb02): napautuslento d520120aa + sulun lopun liikahdus e0f7d6a7d. Työlistan tilanne kirjattu.
- 224.80 (MR75): pallo-kyltti juna-224:n päällä 652653bc7 (natiivi-ui/pallo-kyltti-224 = bd9a95a9d + merge 9c6a6f864; KS:n Oletus "kuumailmapallo" mukana).
  Kun 224.80 linkissä: työlistan kyltti-rivi valmiiksi, jos sellainen on (KK: "Kuumailmapallo liikkuu" sulkeutuu 224.80:n tallenteesta).
- 224.81 (MR76): RUNGON RAJAT d13160204 (natiivi-ui/rungon-rajat; KK 19.08 HYVÄKSYI). Esittely, Naytteet ja Paisunta (MahtuvaKerroin,
  OsuusRuudulla, Mitat) käyttävät OhjelmaKohteet.RungonRajat(verkko) (KS 2743a6ebd). Sacré-Cœur säde 138 → 54 m. Kuvat lokit/nui-rungon-rajat-1-d13160204/{parit,arkit}.
  Työlistarivin "Esittelyn rajaus päärakennuksen rungosta" tilanne kirjattu; valmiiksi kun 224.81 linkissä.

## KESKEN: PETIT PALAIS KYLTTI + ESITTELY (KK 19.08; sääntö: jokaisella koodimallilla nimikyltti ja esittely; juttua ei kirjoiteta)
- Natiivi c75a7f41c (natiivi-ui/petit-palais-kyltti = d13160204 + kyltti): OhjelmaKohteet.PariisiKylttiQidt {"Petit Palais": Q820892}
  + PariisiKyltit() → Nahtavyysalue.Kylttikohteet; Kylttikohde.TRajat ilman aluetta: LontooMalli || KoodiMalli. unity 0.
- Sisältö: main-PR https://github.com/ravelius/Matkakirja/pull/6579 (d3dfb8ec0, js/packs/maakartat.js Pariisi 'Petit Palais' Grand Palais'n
  jälkeen; maakartat-testit 343/343; CI kesken 19.2x). EI YHDISTETÄ ennen KK:n kuvahyväksyntää. Tarvitsee sisältöviennin ämpäriin (JU) ennen kuin
  nosto toimii pelissä; ilman nostoa kyltin napautus avaa tietokortin (vanha käytös), ei esittelyä.
- Valmista juttua ei ole (nahtavyysjutut.js mainitsee Petit Palais'n vain toisen museon tekstissä) → KK:lle: vain kyltti + esittely.
- Mac-ajo 1 (lokit/nui-petit-palais-1-c75a7f41c): KYLTTI TOIMII ("Petit Palais" mallin alla, rajaus pp-lahin-kyltti.jpg), mutta
  "kohdekartat: lataus kesken" → nosto puuttui → "ei kohdenostoa", ei esittelyä (skriptivika).
- Mac-ajo 2 JU:n JONOSSA: sk-petit-palais-2.txt (juuri vaihdetaan odota 75:n jälkeen) → lokit/nui-petit-palais-2-c75a7f41c.
  SEURAAVA: katso 6 kuvaa (0-kyltti + 5 kulmaa), tarkista unity.log "nähtävyysesittely: … esitellään"; montage 3x2 → KK:lle (PT kopiona).
  Jos esittely yhä puuttuu: tarkista unity.log "kohdekartat: ladattu uudelleen" ja Kohdenostot.Kohde("Q820892","Petit Palais").
  KK:n hyväksynnän jälkeen: PR 6579 yhdistetään (checks pass) + c75a7f41c PT:lle "JUNAAN" + JU:lle sisältövienti-maininta.

## SEURAAVA TYÖ (KK 19.22): "Ohjaussauvat isommiksi ja vähemmän herkiksi" (omistajan pyyntö 11.11. aamulla)
- ENNEN TYÖTÄ yksi viesti KK:lle: nykyiset mitat ja herkkyys + ehdotus → KK antaa tavoitteen. Näyttö Mac-tallenne ohjauksesta.
- Koodi: Assets/Matkakirja/UI/LiikeTappi.cs (141 r), KameraTappi.cs (385 r); koko OpasTapit.Halkaisija; herkkyys ei näissä vakioina → etsi
  (OpasTapit, PalloKierto). Selvitys aloittamatta.
- ÄLÄ TEE: "Nähtävyys paisuu hetkeksi (koe)" (toinen kierros, omistaja lukitsi Pariisin loppulistan 19.16). Tarinamerkkien 2. kierros odottaa KK:n tavoitekuvaa.

## Muut
- KK:n huomio (ei estä): pienellä iPadilla noston valokuva peittää Concorden aukion kyltin alun.
- Pariisin koodimalleista ilman kylttiä muitakin (esim. Orsay kohdenostolla mutta ilman 3D-kylttiä): PariisiKylttiQidt-listaan yksi rivi/kohde, vain KK:n pyynnöstä.
