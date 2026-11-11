# Natiivi-UI: luovutus 11.11.2026 klo 20.25 (kontekstivahti 25 %; korvaa -1922:n, haara natiivi-ui/luovutus-20261111-1922 011c6cb5e)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a,
Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f. Näkyvät suoraan KK:lle, PT kopiona.
Natiivikoodi: worktree /Users/Shared/Claude/wt/proto-nui-pallo (remote natiivi-backup; nyt haarassa natiivi-ui/intro-nimet).
Tarkistus: `sh Peli-testit/unity-tarkistus.sh </dev/null`; Linssit-testit: `sh Linssit-testit/kaanna.sh </dev/null` (2289/2289). ÄLÄ KOSKAAN pkill -f.
Kaikki Mac-ajot JU:n kautta. Skriptit /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/sk-*.txt; lokit /Users/Shared/Claude/proto-3d/lokit/nui-*.
Liikemittaus: `python3 /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kehysero.py <kansio> <alku_s> <loppu_s> 50` (EI -I: numpy käyttäjän paketeissa).
Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-omistaja-1958-saapuminen-ja-tekstit.md (A, B, D).

## B: NAPAUTUSLENNON TOINEN LÄHESTYMINEN POIS (omistaja 19.58, KK 20.00) — KK:LLA
- 14d331f06 (natiivi-ui/napautus-yksi-etaisyys = juna-224 a6cfb77b0 + korjaus). Syy: tabletin MitattuZoomi "asettuu" kasvatti zoomia
  ~3 s lennon jälkeen (ND 1,00 → 1,26). Nyt NahtavyysEsittely.MittausKasvaa = false (zoomi vain pienenee); `ui nahtavyysesittely kasvaa 0|1`.
- Ajo lokit/nui-yksi-etaisyys-1-14d331f06 KATSOTTU: arkki-yksi-etaisyys.jpg + a/b/c mp4; ND 274 m ja Louvre 1094 m koko kierron, zoomi 1,00;
  kehysero: ei toista piikkiä (vanha c: 4,5–5 s max 10,1). Viesti KK:lle + PT kopio 20.2x (KK:n jonossa).
- SEURAAVA: KK:n sana → PT:lle "14d331f06 JUNAAN" (JU merge juna-224) → linkissä työlistarivi "Napautuslento: toinen lähestyminen pois" valmiiksi.

## A: SAAPUMISINTRO (omistaja 19.58 A, KK 20.00; ajastus KK 20.21 HYVÄKSYTTY) — AJO JU:N JONOSSA
- natiivi-ui/intro-nimet: ed3045d1e + 25ab7e0ff (juna-224 a6cfb77b0:n päällä, unity 0):
  - SaapumisKuvat.IntroNimet + LisaaIntroNimi: "Nimi · vuosi" kuvan keskellä (Pariisi: SK:n vuodet, KK 20.04). Muut kaupungit: esittelypaikan
    nimi ilman vuotta. ERÄ 1 (10 kaupunkia) vuosirivit VAIN SK:n lopullisesta taulukosta (KK 20.24), ei luonnoksesta: päätökset
    /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-introvuodet-era1-paatokset.md. Taulukko IntroNimet (avain tiedostonimi).
  - NousukuvaLiike: ViimeinenKasvuS 1,0, PaluuS 0,9, LimitysS 0,14 (ruudulla 4,4 → 3,0 s); koskee myös Pulun nousukuvia (KK hyväksyi 20.21). Testit päivitetty.
  - Saapumisesitys.IsoisanKuvatIntrossa = false: isoisän kuvat eivät nouse, ei isoa luentakuvaa, kortti vasta luennalla (`ui saapumisintro isoisankuvat 0|1`).
  - 25ab7e0ff: TrailerinKuvat: sama rakennus (esittelypaikan kohde) vain kerran (KK 20.24 sääntö 9). EI vielä ajettu.
- Ajo sk-intro-nimet-1 (ed3045d1e; Pulun kuvat lisätty 20.23) JU:n jonossa → lokit/nui-intro-nimet-1-ed3045d1e.
  SEURAAVA: katso a1–a5 (rajaukset nimi · vuosi täysikokoisina), a6–a7 (kortti vasta luennalla, ei mustavalkokuvia), a8–a10 (Pulu), b1–b4 Lontoo;
  loki: "ui kuvateksti: traileri kuva N … nimi", "isoisän luenta esittelyn jälkeen alkaa". Näyttö KK:lle (KK 20.21): tallenne Pariisista + Lontoo
  + täysikokoiset rajaukset viidestä kuvasta. KK:n sanan jälkeen: PT:lle "25ab7e0ff (intro-nimet) JUNAAN".

## PETIT PALAIS (KK 19.08)
- 50ea00f74 (natiivi-ui/petit-palais-kyltti = c75a7f41c + nimipalkki ilman juttua: Nahtavyysarkki.AvaaNimiPalkkina). -2:ssa kyltti ok, mutta "ei esittelyä",
  koska AvaaKohdePalkkina vaati jutun. Ajo sk-petit-palais-3 JU:n jonossa (intro-nimet-1:n jälkeen) → lokit/nui-petit-palais-3-50ea00f74.
- PT 20.21: Petit Palais'n juttuteksti tulee SK:lta (KK hyväksyy); kytke B:n ja A:n jälkeen (main-PR 6579 maakartat.js; juttu nahtavyysjutut).
- Tarkista -3:sta "nähtävyys: Petit Palais palkkina ilman juttua" + "nähtävyysesittely: … esitellään"; kuvat 0-kyltti + 5 kulmaa → KK.

## SEN JÄLKEEN: ohjaussauvat isommiksi ja vähemmän herkiksi (KK 19.22) — ensin mitat + ehdotus KK:lle (LiikeTappi.cs, KameraTappi.cs, OpasTapit).
D (aarrekysymys saapuessa) odottaa KK:n suunnitelmaa.

## Muut
- Työlista: "Esittelyn rajaus päärakennuksen rungosta" valmis (224.81 linkissä 19.56). Napautuslennon tilanne kirjattu 20.2x.
- KK:n huomio (ei estä): pienellä iPadilla noston valokuva peittää Concorden aukion kyltin alun.

## LISÄYS 20.3x
- B: KK 20.26 HYVÄKSYI; JU: MR77 = 224.82 (14d331f06) käynnissä; linkin jälkeen junan ehtoajo sk-yksi-etaisyys-2 (12 kohdetta 6 s:ssa) →
  lokit/juna-yksi-etaisyys-2-<sha> (JU tekee arkki-6s.png). SEURAAVA: katso arkki, erityisesti Orsay (0,27) ja Louvre (0,38) → KK + PT kopio.
  Jos Orsay liian pieni: korjaus sen OMA ensimmäinen etäisyys (yksi lento), EI kasvun palautus (KK 20.26).
- A: 7377430b3 (intro-nimet): erän 1 rivit 87/93 IntroNimet-taulukkoon (SK f2680ef27); 6 katselua odottavaa tyhjinä (ei riviä). Ei vielä ajettu
  (intro-nimet-1 ajaa ed3045d1e:tä). Seuraava ajo kattaa 25ab7e0ff (sääntö 9) + 7377430b3.
- Petit Palais: lopullinen lohko + kuva SK 5e3d8353a /Users/Shared/Claude/Matkakirja-sisaltokirjuri/docs/raportit/petit-palais-juttu-20261111.md
  (introrivi "Petit Palais · 1900"). Kytke teksti + kuva + ääni SAMAAN versioon, kun Äänittäjän ääni valmis (PT 20.26). Nimipalkki 50ea00f74 jää varaksi.
