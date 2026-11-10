# Natiivi-UI: luovutus 10.11.2026 klo 19.45 (kontekstivahti 25 %; korvaa -1927:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671.
Natiivin haarat natiivi-backup-remotessa, worktree /Users/Shared/Claude/wt/proto-nui-nimizoom (nyt haaralla natiivi-ui/nimet-ei-jaady, puhdas).
Unity `sh Peli-testit/unity-tarkistus.sh`, testit `sh Peli-testit/kaanna.sh` + `sh Kartta-testit/kaanna.sh`. Mac-esikatselu AINA
ESIKATSELU_PISTEKERROIN=0.465 + `ui kamerasuhde laite` + `komento maasto siirtyma 5 0 30`. Edellinen: -1927 (94d28dd38).
Juna 224 kärki nyt 271e46fd9 (191aaeaf2 perui KS:n korostuksen ac292ac12 = 224.36: jättinimet + 3D puuttui vain 224.36:ssa; 224.35 kunnossa, omistajan kuva 19.30).

## 1. JÄTTINIMET (PT KIIREELLINEN) — SUOJAUS TEHTY, SYY VARMISTAMATTA
- Omistajan kuva 18.53 (224.36): kamera korkealla, tasojen 11–13 rivit (Panthéon, Luxembourgin palatsi) näkyvissä ~3× liian isoina, 3D-mallit puuttuvat.
  Mac vaaka-1 (kamera lähellä, taso 16) ei toistanut.
- EPÄILTY MEKANISMI (koodista): Nahtavyysalue.Vapauta nollaa m.T mutta jättää m.Aariviivan; jos LuoMalli kaatuu (3D puuttuu), luotu = true ja
  KeraaRuudut heittää NRE:n (m.T.TransformPoint) joka Nimikerros.Lado-kutsussa → Lado ja Piirra jäävät tekemättä → saapumisen tason nimet
  jäävät maailmaan ja kasvavat kameran laskeutuessa. Selittää molemmat oireet.
- KORJAUS 2592bf839 natiivi-ui/nimet-ei-jaady (juna 224 271e46fd9 päällä): KeraaRuudut ohittaa mallin ilman T:tä; Nimikerros: esteet try/catch,
  EsteVirhe lokiin (ensimmäinen pinon kanssa, `komento nimet` näyttää "estevirheitä N"). 899/899 + 740/740, unity 0. PT:lle kerrottu 19.4x
  (ei vielä pt-ok:ta / junapyyntöä). KS:lle ehdotettu: Vapauta nollaa myös Aariviivan + LuoMalli-virhe lokiin (KS:n tiedosto).
- JONOSSA JU:lla: sk-jattinimet-pysty-2 (/Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-jattinimet-pysty-2.txt, 04a986a1b, ipad-pysty, 0.465,
  ei talot kansiota) → lokit/nui-jattinimet-pysty-2-04a986a1b: katso 1-korkea-60 ja `nimet`-rivit (taso/jatkuva/korkeus). pysty-1-u korvattu.
- Varmistus vaatii laitelokin 224.36:sta (JU:n iPad-ajo lokit/julkaisija-pariisi-22436-iso-ac292ac12 EI käynnistynyt: failed to launch).
- KS:n kaupunginvaihtoajo (lokit/esikatselu-20261110-193305, ac292ac12): purku päällä v2:ssa, mutta opas oli yhä auki (ui sulje ei sulkenut) → ei ratkaise.

## 2. KIRJA-KUVAKE JA LIIKU KONTRASTI (PT 19.3x, omistaja: haaleat myös 224.35:ssä) — TEHTY, PARI JU:N JONOSSA
- f4ddf1655 natiivi-ui/kontrasti-kirja-liiku (juna 224 191aaeaf2 päällä): M-nappi (.mk-mnappi, Pulu.uss) paperipohja 45 % + reuna map-ink-40 +
  kuvake map-ink-85; Liiku (.mk-liiku__nappi, Matkakirja.uss) väri map-ink, hehku 4 px täysi. 898/898, unity 0. Pohjavahdin "Matkakirja.uss vari 1"
  on jo pohjahaarassa (ei tästä).
- JU ajaa sk-kontrasti-1.txt kahdesti: 191aaeaf2 ja f4ddf1655 → lokit/nui-kontrasti-1-<sha>. Tee: katso → pari PT:lle → pt-ok-pyyntö.

## 3. TAPIT SAMALLE KORKEUDELLE — PARI JU:N JONOSSA (ennallaan -1927:stä)
- c3e1e6741 natiivi-ui/tapit-samalle-korkeudelle; JU ajaa sk-tapit-korkeus-1 → lokit/nui-tapit-korkeus-1-pysty-c3e1e6741 ja -vaaka-. Tee: katso → pari PT:lle.

## 4. TAVOITEPALKKI — MR29 → 224.39 (ennallaan): PT-OK-pyyntö lähetetty; tee: versionumero KK:lle kun linkki tulee.

## JONO
Tulokset 1 (pysty-2), 2 (kontrasti-pari), 3 (tapit-pari); sitten rivi PT:lle "JONO TYHJÄ: Natiivi-UI". Avoin (vain pyydettäessä): kuvakyltin reunarajaus.

## LISÄYS 19.5x (PT: "hyvä"; ND puuttui omistajalla myös 224.35:ssä → todennäköisesti ND:n LuoMalli kaatuu laitteella = jättinimien juurisyy)
- Yhdistelmä 033ba90b5 natiivi-ui/nimet-ja-kontrasti (2592bf839 + f4ddf1655). iPad-pari JU:lla kun iso iPad palaa: sk-ipad-nimet-kontrasti-1.txt
  (_tyo/natiivi-ui) 271e46fd9 vs 033ba90b5 konsolilokilla → lokit/nui-ipad-nimet-kontrasti-1-<sha>. Tee: grep "esteet ohitettu|estevirheitä|
  nähtävyyslataus|Exception", kuvat n1/n2 → pari PT:lle (+ KS:lle loki).
- KS:lle lähetetty: ND:n mallin luonti laitteella (normaalikartta/ASTC-epäily), LuoMalliin try/catch + loki. Selvitä KS:n kanssa suoraan.
- Mac-kontrastipari (sk-kontrasti-1) → PT kun valmis.

## LISÄYS 19.5x/2 (PT): EI erillistä 033ba90b5-iPad-paria
- KS yhdistää 71c52a6c0 (karttaseppa/luomalli-kestava, LuoOsat kestäväksi) + 033ba90b5 yhdeksi kärjeksi; JU ajaa sen ensimmäisenä isolla iPadilla
  (Pariisi + loki). JU:lle pyydetty poistamaan nui-ipad-nimet-kontrasti-1 (sk kelpaa yhdistelmälle). pt-ok vasta laitelokin jälkeen.
- Tee: kun yhdistelmän loki tulee, katso nimet + ND + kirja/Liiku → PT:lle. Mac-kontrastipari sk-kontrasti-1 yhä JU:lla → PT.

## LISÄYS 19.5x/3 (PT)
- KS yhdistää f4ddf1655:n haaraan karttaseppa/luomalli-kestava (9c1f51eb6:ssä oli vain 2592bf839); uusi kärki = JU:n iPad-ajo (Pariisi-sk + sk-ipad-nimet-kontrasti-1).
- PT:lle menevään kuvapariin MYÖS kirja + Liiku -rajaus (sama rajaus ennen/jälkeen; kirja ylävasen, Liiku alakeskellä), sekä Mac- että iPad-parista.

## LISÄYS 19.5x/4
- KS:n yhdistelmäkärki = 0f0f950a6 (karttaseppa/luomalli-kestava): sisältää 2592bf839 + f4ddf1655 + 71c52a6c0 (tarkistettu merge-base). JU ajaa sillä → lokit/nui-ipad-nimet-kontrasti-1-0f0f950a6 (kärjen lyhyt sha voi poiketa).
