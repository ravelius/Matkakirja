# Natiivi-UI: luovutus 11.11.2026 klo 21.35 (kontekstivahti 25 %; jatkaa -2115:tä, haara natiivi-ui/luovutus-20261111-2115 205f530a6)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f. Lue ENSIN -2115 (git show 205f530a6:docs/raportit/viesti-natiivi-ui-luovutus-20261111-2115.md):
worktreet, tarkistukset, A:n tila, KK:n ehdot. Tämä tiedosto kertoo vain, mitä 21.2x–21.35 tehtiin ja mitä odottaa.

## JU:N JONO (kaikki lähetetty JU:lle; Mac-järjestys tämä)
1. intro-nimet-3 (bfaafec8c) → lokit/nui-intro-nimet-3-bfaafec8c — KÄYNNISSÄ 21.35. Katso ja tee KK:n näyttö -2115:n "LISÄYS 21.2x" mukaan
   (5 täysikokoista rajausta asettuneesta kuvasta + kirjainten lento + Lontoo) → KK, PT kopio. KK:n sanalla PT:lle "JUNAAN bfaafec8c" + taitto (alla).
2. pulu-rajaus-2 (sk-pulu-rajaus-2.txt; ec3aaa575 tai ab6949202) → lokit/nui-pulu-rajaus-2-*. -1 KATSOTTU: loki kunnossa ("fokusvirrat: luettu
   levyltä", "Pulun kuva pyöreänä … halkaisija 541 pt, keskipiste 0.742,0.504", "pieni Pulun kuva pyöreällä rajauksella", EI "ei karttapaikkaa");
   p1/p2 OK (ympyrä, kultakehys, pallo + puut + joki). p3 jäi ottamatta: seinäkello-odotus, kuva vielä ilmassa → -2 odottaa
   "pieni kuva kartalle pariisi 48.8417,2.2736" + odota-peli 1. Katso p3 (pieni pyöreä kultareunainen kuva kartalla) → SHA + kuvat p1–p3 KK:lle.
3. taitto-1 (sk-taitto-1.txt; ec3aaa575) → lokit/nui-taitto-1-ec3aaa575: ISOISÄN KUVA TAITETTUNA. t1 vieressä, t2 jaon kohdalla, t3 valmis,
   t4 lappu, t5 avattu, t6 lyhyt 249 merkkiä, t7 ilman kuvaa. Lokista "kuva taitettu, N riviä kuvan vieressä, jako sanassa J/K, leveys …",
   "kirjoitus jatkuu kuvan alle sanasta", "taitettu teksti kirjoitettu". Tarkista ehdot 1–5 (-2115) TÄYSIKOKOISISTA rajauksista; jos väli kuvaan
   väärä: sivu = 1 rivinaskel, ala = 0,6 askelta (Matkakirjakortti.TaitaKuva). Näyttö KK:lle: rajaukset t1–t3 + t5 (+ t6, t7). Junaan KK:n sanalla.
4. petit-palais-5 (sk-petit-palais-5.txt; a0c49d779, haara natiivi-ui/petit-palais-v10) → lokit/nui-petit-palais-5-a0c49d779.
   SYY LÖYTYI: -4:ssä kohdenostot laskettiin ennen kohdekarttojen juuren vaihtoa, ja Kohdenostot.Valitse palautti vanhan kartta-olion rajojensa
   sisällä → Vaihda ei ajanut, "merkkejä 25", "mallilla Petit Palais ei kohdenostoa". Korjaus: Kohdekartat.AsetaKehittajanJuuri →
   Kohdenostot.KartatVaihtuvat() (kartta = null, linkitetyt = null). Tarkista "kohdekartat vaihtuvat", "merkkejä 26", "Petit Palais esitellään",
   "ui lukija: aloita pala" → arkin rivi kuten muilla → KK. Junaan: a0c49d779 c650f3ca6:n tilalle (PT:n sanalla; korjaus koskee vain kehittäjän juurta).
5. VAKIOAJO (työkalu 3): 210c842ad (natiivi-backup natiivi-ui/vakioajo = NS tyokalu3-rivit c1841699a + NUI + KS:n vakiokuvat-json) → JU ajaa
   Pariisi + Lontoo sk-vakioajo.txt:llä (viesti jonossa JU:lla 21.35). Katso arkit: Pariisissa pitää tulla 14 kohdetta (säde 30 km keskipisteestä,
   Nahtavyysalue.Kylttikohteet nimen mukaan, aakkosjärjestys); "VAKIO PUUTE" -rivit = korjattavat. Valmis = Pariisin + Lontoon arkki → KK.

## UUSI KOODI (kaikki käännetty, unity-tarkistus 0 virhettä, Peli-testit 912/912)
- JUNAN haara natiivi-ui/intro-nimet-kortti = 8f52cb9d5 (bfaafec8c + taitto 1a9d7bd8b + lokit/taittokoe 8f52cb9d5). Pulun haara natiivi-ui/intro-nimet
  = ec3aaa575 (7fc22116c + samat kaksi). Taitto: teksti (kuvan vieressä) + tekstiAla (koko leveys) kahtena Labelina; jako = suurin sanamäärä, joka
  mahtuu N riviin (MeasureTextSize, binäärihaku), N = round((4 + kuvan korkeus + ala-väli) / rivinaskel); lasketaan uudelleen vain leveyden tai
  kuvan muuttuessa (GeometryChanged). Kehittäjän `ui matkakirja taitto lyhyt|pitka|ilman` (vain Mac-näyttöön).
- Vakioajo.cs (Assets/Matkakirja/UI): ui vakio kohteet|yleis <kaukaa|45-pohjoinen|45-ita|45-etela|45-lansi|lahin>|kohde <i>|kohdekulma <180|lahin>|
  sulje|kuva <i>|juuri <polku>. 45-pohjoinen = kamera pohjoispuolella, katse etelään. Kohde: aja 0.02° kaarelle → NapautaMalli → "valmis" kun
  NahtavyysEsittely.AsettuuS (lento + 1 s + 1,5 s) kulunut. Kohdekulma: PalloKierto.VakioKulma (suuntimaSiirto + 180, lahin = KierronZoom LahinSallittu).
  Vakiokuvat 1–3 kadut, 4–9 merkit (tyhjä → puuttuu). Kaukaa: kohteiden laatikko × 1,25, KorkeusKaarelle.

## TYÖLISTA
- "Napautuslento: toinen lähestyminen pois" (= B, 224.82) oli jo valmis.
- "Isoisän kuva taitettuna tekstin sekaan": tilanne päivitetty 21.28 (toteutettu, Mac-ajo JU:lla).

## SEURAAVA (järjestys)
intro-nimet-3 katso → KK; pulu-rajaus-2 katso → KK; taitto-1 katso → KK; petit-palais-5 katso → KK; vakioajon arkit → KK;
sitten OHJAUSSAUVAT (KK 19.22: ensin mitat + ehdotus KK:lle; tehtävänanto KK:n viestissä 19.22 / -2053) → D (aarrekysymys, -2053).
Worktree /Users/Shared/Claude/wt/nui-vakio (natiivi-ui/vakioajo) uusi; /Users/Shared/Claude/wt/nui-sk-vienti voi poistaa (git worktree remove), kun pulu-rajaus-2 katsottu.
