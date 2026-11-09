# Natiivi-UI: luovutus 9.11.2026 klo 14.40 (kontekstivahti 25 %; korvaa -1315:n, jonka kohdat 2–5 ennallaan)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd. Kuvat ensin PT:lle (3 riviä).
Arkki: python3 -I /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/9c1a5623-3b97-4844-91cc-7c2537a97060/scratchpad/arkki.py
ulos.jpg sarakkeet otsikko kuva1 nimi1 … (kopio myös 1bc73057-…/scratchpad/arkki.py). Tarkistus `sh Linssit-testit/unity-tarkistus.sh`,
`python3 -I tyokalut/pohjavahti.py` (worktreessä).

## 1. PALKKI AINA – kärki ed65f5b34 (natiivi-backup natiivi-ui/palkki-aina, wt/proto-natiivi-ui-palkki-aina) – SEURAAVA ASKEL
- e516f3fe1: Kosketusnappi lisää 44 pt kosketusalan ENSIMMÄISEKSI lapseksi (Rakenne.cs). Leveillä ruuduilla 40 pt palkin ala oli viimeinen
  lapsi ja peitti ‹ › ▾ ⏸ → › napautti palkkia ja sulki kortin ("kortti katoaa" -vika; koskee myös sormea). Lisäksi Nostokortti.PaivitaPin
  sulkee palkin alla olleen kortin myös kun Nykyinen == null (uusi luenta irrottaa ennen Vaihtaa), Nahtavyysarkki.Irti sulkee arkin samoin.
- e516f3fe1 katsottu iPhone + iPad: › toimii, a-5 Tuileriat kiinni, MuCEM palkin alle ja palkiksi. Arkit lokit/nui-palkki-aina-3-{iphone,ipad}-
  e516f3fe1/arkki-palkki-aina-3-*.jpg.
- ed65f5b34: iPadilla MuCEM-arkki avautui keskelle (palkki oikealla) → leveällä ruudulla arkki palkin oikeaan reunaan (Pinnaus.PalkinOikea,
  peite align-items flex-end + paddingRight). JU:n ketju DQ: ed65f5b34 iphone-vaaka → ipad-pysty → ipad → lokit/nui-palkki-aina-3-<koko>-ed65f5b34.
- KATSO: a-3 kortti palkin alla (› osuma mk-pinpalkki__askel), a-5 edellinen kiinni, a-6 MuCEM palkin alla oikeassa reunassa, a-6b palkiksi.
  Sitten YKSI arkki neljästä koosta (iphone e516f3fe1 + muut ed65f5b34) → PT. PT vie KK:lle nostokorjaukset-kokonaisuutena (paikkapalkki +
  maisemakaari 7a560e725 + palkki aina).
- Avoin (ei korjattu, mainitse PT:lle): kun nähtävyys on palkissa, palkissa ei ole selausta eikä kaupunkinimeä (a-7 "napauta-nimi ei
  näkyvissä"); kaupunkipilleri näkyy palkin vieressä erikseen.

## 2. PAIKKAPALKKI-1 fb77e12b1 – VALMIS, PT kuittasi 14.3x (kelpaa; KK:lle yllä mainitussa kokonaisuudessa)
- Arkit lokit/nui-paikkapalkki-1-{iphone,iphone-vaaka,ipad}-fb77e12b1/arkki-paikkapalkki-1-{iphone,vaaka,ipad}.jpg.

## 3. FPV-KOE – kärki efba65386 (natiivi-backup natiivi-ui/fpv-napit, wt/proto-natiivi-ui-fpv-napit)
- 4a635aeee katsottu iphone/vaaka/ipad (arkit lokit/nui-fpv-koe-1-<koko>-4a635aeee/arkki-fpv-koe-1-*.jpg): vaaka ja iPad odotusten mukaan.
  iPhone pystyssä ☰ PUUTTUI: IslandYlhaalla laski leveyden ScreenToPanel(UiRuutu):lla, Mac-esikatselussa (Screen 640×480) liian leveä →
  ☰ ruudun ulkopuolella. 4967731c8 korjaa (panel.visualTree.layout) + lokirivi "fpv-näkymä: ☰ Islandin vieressä: left … top …".
- efba65386: PT 14.5x: pallo ei näyttänyt läpikuultavalta → peitto 0,55 → 0,35. JU:lle iphone + ipad efba65386 → lokit/nui-fpv-koe-1-<koko>-efba65386.
- KATSO iPhone k-1: ☰ Islandin oikealla (lokirivi), pallo selvästi läpikuultava; → arkki PT:lle (KOE).
- PT pyysi "E" → "S" suuntanauhaan; vastasin, että E = etelä (P/I/E/L suomeksi, ui.fpv.hud-*), en muuta ilman PT:n vahvistusta. Odota vastaus.
- Avoin löydös: iPhone vaaka k-3 iso pallo (1,2 ×) peittää AUTO-napin – kerro PT:lle, korjaa jos PT pyytää.

## 4. Vahti
- Taustavahti (Monitor) pysäytetty luovutuksessa; käynnistä oma: odota kansioita lokit/nui-palkki-aina-3-*-ed65f5b34 ja
  lokit/nui-fpv-koe-1-*-efba65386 (loki.txt valmiina). Esimerkki: scratchpadin vahti.sh (bash, nullglob).

## Lisäys 14.5x: PT vahvisti E = etelä (ei muutosta). FPV-kärki 5efe9e346
- 5efe9e346 (efba65386 + iso kulmapallo rajataan AUTO/MANUAL-napin yläpuolelle: FpvNakyma.IsoKerroin, FpvTikut.NappiRajat; tila-lokissa
  todellinen kerroin). JU:lle: alkamattomat efba65386-koot 5efe9e346:llä + iphone-vaaka → lokit/nui-fpv-koe-1-<koko>-5efe9e346.
  KATSO vaaka k-3: pallo ei peitä AUTOa; iPhone k-1 ☰ ja läpikuultava pallo → arkki PT:lle.
- 14.4x: FPV iPhone efba65386 KATSOTTU ja arkki PT:lle (lokit/nui-fpv-koe-1-iphone-efba65386/arkki-fpv-koe-1-iphone.jpg): ☰, pallo, tietorivi ok.
  Jäljellä: JU:n ketju DT 5efe9e346 ipad + iphone-vaaka → katso k-3 (pallo ei peitä AUTOa) → arkki PT:lle.
- 14.43: palkki-aina-3 iphone-vaaka ed65f5b34 valmis (ei vielä katsottu); ipad-pysty ja ipad ed65f5b34 tulossa.
