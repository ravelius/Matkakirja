# Natiivi-UI: luovutus 9.11.2026 klo 13.15 (kontekstivahti 25 %; korvaa -1310:n, lue myös sen kohdat 2, 5 ja "Muuta")

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870,
PK local_d3bb1f78-e2ea-4089-8bae-d106bb1f9ff7. Kuvat ensin PT:lle (3 riviä: mitä, sha, arkin polku).
Arkki: python3 -I /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/1bc73057-62ff-4b74-a5f3-0ed4b3ef4dbf/scratchpad/arkki.py
ulos.jpg sarakkeet otsikko kuva1 nimi1 … Tarkistus `sh Linssit-testit/unity-tarkistus.sh`, `python3 -I tyokalut/pohjavahti.py`.

## 1. PALKKI AINA – korjaus 74e72a4a4, JU ajaa sk-2:ta (SEURAAVA ASKEL)
- sk-1 iphone f5aca4541 katsottu (arkki proto-3d/lokit/nui-palkki-aina-1-iphone-f5aca4541/arkki-palkki-aina-iphone.jpg, PT:llä):
  a) kortti mitoittui pienen palkin alareunaan (136 pt) ennen kuin palkki kasvoi kaksiriviseksi (206 pt) → kortti palkin päällä (a-2);
  b) palkin › osui kortin vetoalueeseen (USS .mk-vetokahva top −16, kerros 40) → a-3 "seuraava" ei toiminut;
  c) sk-virhe: `ui nostovalikko kategoria 0` (1-pohjainen) → a-5 ei valinnut mitään; a-6 kaksi napautusta avasi uudelleen.
- KORJATTU 74e72a4a4 (natiivi-backup natiivi-ui/palkki-aina, wt/proto-natiivi-ui-palkki-aina; tarkistus 0, pohjavahti ok):
  Pinnaus.PalkkiSiirtyi (palkin GeometryChanged) → Nostokortti.Pystypaikka; palkin alla vetoalue top = −Vali.S.
- JU:lle pyydetty 13.1x: sk proto-3d/_tyo/natiivi-ui/sk-palkki-aina-2.txt sha 74e72a4a4 koot iphone, ipad, iphone-vaaka, ipad-pysty →
  lokit/nui-palkki-aina-2-<koko>-74e72a4a4; sk-1:n iphone-vaaka ja ipad-pysty peruttu (ipad sk-1 sai valmistua).
- KATSO: a-2 kortti palkin alla heti (ei päällä), lokissa "alla True"; a-3 `napauta-seuraava` osuma mk-pinpalkki (ei mk-nosto__vetoalue);
  a-4 valikko; a-5 valinta perillä (uusi nosto palkissa); a-6 kiinni (alla False, pienenä True); a-7. Grep unity.log
  "ui-komento: ui pinnaus\|ui pinnaus: \|ui nostovalikko" → arkki → PT (→ KK → omistaja ennen junaa, osa 4).
- HUOMIO PT:lle (ei korjattu, KK:n päätös): nostovalikon tumma pohja on läpikuultava, ja palkin alle avatun kortin pin/≡/kaiutin-rivi
  näkyy valikon läpi (a-4). Palkissa "Marseille" myös Ranskan tasolla (a-7).

## 2. OPAS-M 6ce1efd49 – VALMIS, PT:llä
- iPhone + iPad 8/8 katsottu; iPadilla otsikko oli M:n päällä (pk-lontoo-m2-ipad-734ed685d), nyt alla. Arkki
  nui-opas-m-ipad-6ce1efd49/arkki-opas-m-ipad.jpg (ennen/jälkeen) + iphone-arkki → PT 13.07 ("valmis junaan kuittauksellasi").
  iPadilla vain otsikko (ei pysäkkilistaa) kuten ennenkin. iPhonen listan alarivit valkoisten Mac-laattojen päällä heikkoja (ei estä).

## 3. P-5A fb77e12b1 – JU:n jonossa (ennallaan -1310:n lisäyksen mukaan)
- lokit/nui-paikkapalkki-p5a-iphone-fb77e12b1 ei vielä ollut 13.15. Katso terävä? + "osuudet 9" ja "muistihuippu" → NS + PT; jos terävä:
  sk-paikkapalkki-1 kolmella koolla fb77e12b1 → PT → KK. HUOM palkki-aina-haara on nyt 74e72a4a4 (sis. fb77e12b1).

## 4. FPV-KOE a–e (OMISTAJA 12.57 + 13.00; KOE, ei junaan) – EI ALOITETTU KOODIA, suunnitelma valmis
Kärki b57df8ec6 (wt/proto-natiivi-ui-fpv-napit, puhdas). Tiedostot: UI/Linssit/FpvNakyma.cs (368 r), FpvTikut.cs (82 r), LinssiUi.cs
(Asettele r. 252–264, ☰-kytkimet r. 146–167), Sijaintipallo.cs, Linssit.uss (.mk-isskyyti__*), Tekstit/ui.fi.json (ui.fpv.*).
ÄLÄ KOSKE: KameraTappi.cs, ohjausnappi.uss (PK), Kartta/FpvLento.cs (NS; vain julkinen API).
- a) FpvTikut: UiKerros.Tabletti → bottom ≈ 30 % turvan korkeudesta, sivu ≈ 56 pt (nyt Ala 28, Sivu 20); laske isän GeometryChangedissa.
- b) Pallo (malli AstronautinNakyma 184–260 ja 784–840: PalloIsoksi/PalloTelineeseen, Telineeseen(kerroin, 0, 0.6), Napautettu,
  Tartuttu, Ehdokkaat, Valittu): levossa Telineeseen(~0.6) + palloTurva opacity ~0.55; napautus → Telineeseen(~1.2) + opacity 1, 10 s
  ajastin (Tartuttu true = pysyy iso); Ehdokkaat = MinipalloPisteet.Ehdokkaat(null) (kohokohdat + pääkaupungit); Valittu →
  FpvLento.Aloita(k.Lat, k.Lon) + lataus.Avaa() (drone leijuu latauskuvan ajan) → pieneksi. Manuaalissa napautus ensin
  FpvNakyma.Tila = Automaatti.
- c) LinssiUi.Asettele fpvTila: iPhone pysty (ei Tabletti, korkeus > leveys, r.y ≥ 44) ☰ Islandin oikealle samalle korkeudelle
  (Island ~126 × 37 pt, yläreuna ~11; vrt. OpasValikko.cs 731 IslandOikeaPt): left = W/2 + 63 + 12 − r.x, top = 29.5 − 20 − r.y.
- d) Tietorivi keskelle: iPhone pysty heti Islandin alle (top = 48 + 8 − r.y), vaaka ja iPad yläreunan keskelle (top 12);
  rivit left 0 right 0 align-items center (nyt vasemmalla + right-väistö pallolle). Luettavuus: Raamattu 4.4 kieltää paksun ääriviivan
  ja hehkun, ja tekstilaatikot ovat läpinäkyviä (omistaja 14.10.) → ehdotus: tieto lihavaksi + kilven pohja --tk-harmaa-kuulto-toiminto
  (läpikuultava, nappien pinta); jos PT/KK haluaa tumman LCD-pohjan, --tk-lasi-avaruus-pinta. Tarkista FpvHud.Paivita(tietorivi, …),
  että viivat eivät oleta riviä vasempaan yläkulmaan.
- e) AUTO/MANUAL-nappi oikean tikun yläpuolelle (FpvTikut: right = tikun right, bottom = tikun bottom + 64 + 12), pohja kuten ISS:n
  EXTEND (mk-ohjausnappi mk-ohjausnappi--teksti tk-teema-harmaa, Kirjasin.ModerniLihava), teksti nykyinen tila (uudet avaimet
  ui.fpv.auto "AUTO", ui.fpv.manual "MANUAL"), napautus vaihtaa FpvNakyma.Tila; ☰:n Manuaaliohjaus-kytkin ja OmaRivi pois LinssiUi:sta.
- Kuvat: sk uusi (pohja sk-fpv-hud-1, proto-3d/_tyo/natiivi-ui/) iPhone pysty + vaaka + iPad, myös MANUAL ja pallo iso → PT.

## 5. FPV-HUD b57df8ec6 ja huudot: ennallaan (-1245:n kohdat 3 ja 5); odota PT/KK.

## Lisäys 13.2x: sk-2 iphone 74e72a4a4 katsottu (arkki lokit/nui-palkki-aina-2-iphone-74e72a4a4/arkki-palkki-aina-2-iphone.jpg)
- KORJAUS TOIMII: a-2 kortti palkin alla; a-3 `napauta-seuraava` osuma mk-pinpalkki__askel → nosto vaihtui (cosquer → tuileriat,
  alla True); a-4 valikko palkin alle; a-5 valinta toimi (MuCEM).
- UUDET LÖYDÖKSET (seuraava sessio korjaa, kun ipad/vaaka/pysty katsottu):
  1) Valikosta valittu NÄHTÄVYYS (nahtavyys:marseille:2:MuCEM) ei ole palkki aina -kohde: palkki pieni (181×40), ja a-6 palkin
     napautus avasi nähtävyyskortin vanhaan tapaan → palkki katosi ("palkki 0×0", napauta-nimi "ei palkkia"). AinaNakyvissa vain
     Nostokortissa; nähtävyyskortin Pinnaus.Vaihda (git grep "Pinnaus.Vaihda") tarvitsee saman (+ PalkinAlle-paikka) – kysy PT:ltä,
     kuuluuko KK:n suunnitelman osiin.
  2) a-5: valinnan jälkeen edellinen nostokortti (Tuileriain rauniot) jäi auki vanhaan paikkaan vasempaan alakulmaan ✕:n kanssa
     (pinnaus siirtyi MuCEMiin → PinNakyvissa false → Pystypaikka pohjan paikalle). Valinnan pitäisi sulkea palkin alla ollut kortti.
  3) Sivuhuomio: › Marseillessa vaihtoi Pariisin Tuileriain raunioihin (selaimen naapurilista ei rajaudu kaupunkiin).
- PT:N TULKINTA 13.2x (sitova seuraavalle): nähtävyys KUULUU palkki aina -työhön. OMISTAJA 12.45: "Palkki ei katoa koskaan. Nosto ja
  valikko avautuvat sen alle, ja kaikkea ohjataan palkista." → valikosta valittu nähtävyys (MuCEM) avautuu palkin alle kuten nosto
  (AinaNakyvissa + PalkinAlle-paikka nähtävyyskortille), palkki jää, ja edellinen (palkin alla ollut) kortti suljetaan valinnassa.
  Tee löydökset 1 ja 2 tällä linjalla samaan palkki-aina-haaraan (74e72a4a4:n päälle) → sk-palkki-aina-3 (a-5/a-6 nähtävyydellä) → PT.
