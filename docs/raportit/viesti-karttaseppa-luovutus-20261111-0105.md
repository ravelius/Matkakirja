# Karttaseppä: luovutus 11.11.2026 klo 01.05 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -0010:n; taustat, työkalut, polut ja vahdit:
`git show 99bb5c0a1:docs/raportit/viesti-karttaseppa-luovutus-20261111-0010.md` (LUE KOKONAAN: tyyliohje, worktree, testikomennot, Monitor-vahti).
HUOM kello: aja `date` ennen jokaista aikaleimaa. HUOM zsh: `$c:A…`/`$C:r…` ovat muuntimia → kirjoita `"${c}:polku"`.

## Valmista tässä erässä
- MR43 Opéra + talot v6 linkissä 224.50 = adccf01fa (JU). Suljettu.
- LÄHIN KAMERA (NUI 00.45: ea9e6c633 ei lähentänyt): syy striimikartta (ElavaTyyli.Striimi = true) → piirros pois → LahinLeveysPaikassa null →
  MinKorkeus = ElavaLahinLeveys 0,625 (640×480: 1,679 km). Korjaus: PiirrosKerros.StriimiLahinLeveysPaikassa + PalloKierto.MinKorkeus else-haara.
  PT 01.0x: arvo 0,231 (= KK:n parin näkymä, striimin 0,625/2,7). Haara karttaseppa/lahin-striimi kärki c032134e7 (natiivi-backup; pohja ea9e6c633,
  EI junassa). Kartta 754/754, unity (sh) 0. NUI uusii tarkistuskuvat (odotus eletila "lähin 0.620 km", leveys ~0,78 km) → NUI vie KK:lle.
  Kun NUI:n kuvat OK (KK): PT:lle junaehdokas c032134e7 (JU yhdistää junaan; muutos vain 3 tiedostoa: PiirrosKerros.cs, PalloKierto.cs, PiirrosLahinTestit.cs).
- KJ14–16 katsottu, ruudukot KK:lle: _tyo/karttaseppa/koodijuna/parit-kj14-16-4eed281af/ (ruudukko-*-tripo-koodi.jpg). Apuskriptit (PIL):
  scratchpad ruudukko.py/rajaa.py – tee uudet tarvittaessa (ruudukko: tripo | koodi rivi per näkymä, 1376 px sarake).

## KK:N PALAUTE 00.5x (sitova, järjestys): ND-puu (KJ17) ja Invalidit (KJ19) JU:lla → LOUVRE → SACRÉ-CŒUR → SAINTE-CHAPELLE. Ei yhtäkään junaan vielä.
1) Lähikuvat kaikista kolmesta Opéran op13-koodi-lahi -reseptillä (lahizoomi 8, kallista 45, kohde keskellä ~½ ruutua, viistosti edestä, katto ja
   huippu kokonaan) + yksi kuva lähimmästä pelikamerasta (2,7× mukana = käännös, jossa c032134e7). TARKISTA kuva itse ennen KK:lle: kohde kuvassa.
2) Ympäristö: vanha Tripo-raivaus jää tyhjäksi kentäksi → raivaus mallin omaan pohjaan, korttelit/puisto/aukio takaisin kuten Panthéon (KJ10).
   Sainte-Chapelle Palais de Justicen pihaan: talot saavat olla vieressä, kunhan katto ja torni nousevat yli.
3) Louvre tärkein: julkisivu, paviljonkien korkeat katot, lasipyramidi lähikuvasta.
4) Sacré-Cœurin mäki: EI ratkaista nyt. Lähikuva kamerasta mäen yläpuolelta (aja-korkeus > mäki ~130 m) + YKSI rivi KK:lle, mitä mäen ratkaisu vaatisi.

## Käynnissä / seuraavat
- KJ20 LOUVRE JU:lla (KJ19:n jälkeen): käännös a09d91c95 (karttaseppa/kj20-louvre = 1c5ddb667 + lahin-striimi; natiivi-backup; 754/754, unity 0),
  skenaario _tyo/karttaseppa/koodijuna/sk-mac-louvre-kj20.txt, loki lokit/karttaseppa-louvre-kj20-a09d91c95: lv20-koodi-lahi-{lansi,ita,seine,pyramidi},
  lahin-pelikamera, ylhaalta-talot, ylhaalta-ilman-taloja. Aja-etäisyys 0,0075 on arvaus (Louvre ~4× Opéra) – tarkista kuvista, säädä ja uusi tarvittaessa.
- LOUVREN TYHJÄ ALUE – diagnoosi kesken: KJ14:n yleiskuvassa (lv14-koodi-yleis) Cour Carrée'n itäpuoli (St-Germain-l'Auxerrois, rue du Louvre) beige,
  haaleat jalanjäljet. EI talomaski: 1:1-maski (raivaus-1-1-louvre/louvre-tarkistus.jpg) poistaa vain 7 taloa, palat-v25-louvre-opera-1-1 = ulos-lv (cmp sama).
  EI Tripo-pohja: Nahtavyysalue louvre PohjaPoisKoodilla = LvKoodi (c735240ae). EI siisti.json _pois (vain Les Halles 2.344). OSM:ssä talot on.
  → KJ20:n ylhaalta-talot vs -ilman-taloja näyttää, puuttuuko 3D-talo vai onko kyse maan värityksestä. Jatka siitä.
- SAINTE-CHAPELLE: aja-palat.sh käyttää KSC=2 (Tripon korostettu ala + VARA 3) → "tyhjä laikku" kappelin vieressä. 1:1:llä KSC=1 (tai jalanjälki).
  Lähikuva: malli näkyy ~70 px tähtäyspisteen (48.85546 2.34484) pohjoispuolella → tähtää mallin kohdalle; Palais'n talot peittivät.
- SACRÉ-CŒUR: sc15-koodi-lahi tyhjä (kamera mäen sisällä, aja 0.0022). Raivaus: alueilla sacre-coeur 169 taloa (palat-lv.log) → pienennä 1:1-maskiin.
- AVOIMET -0010:stä yhä: NUI:n paisunta-haaran katselmointi (natiivi-ui/nahtavyys-paisuu 714266606 + 7b1605f21; kuittaus NUI:lle), Panthéonin
  KK-huomiot (kiveys, pylväsvälit), palojen ketju v6 → invalides v27.

## LISÄYS 01.1x
- NUI: c032134e7 ajettu, eletila "lähin 0.620 km" ND ja RK ✓; kuvat KK:lle 00.57. NUI kertoo KK:n vastauksen → KS vie junaan (PT:lle junaehdokas c032134e7).
- KK 01.0x: lähin c032134e7 hyväksytty junaan (JU: MR44 → 224.51 testeissä; PT:lle pt-ok-pyyntö lähetetty). KK:N EHTO: ND:n itäpuolen kellertävä
  läpikuultava kolmio (NUI: proto-3d/_tyo/natiivi-ui/paisunta/lahin-2-7x-4-pari-nd-vanha-uusi.jpg oikea puoli) ei saa tulla mukaan – NUI: tulee jo
  224.47-pohjasta (440d3e8d6), ei c032134e7:stä. SELVITÄ mikä se on (kartta-asia); jos vika, erillinen korjaus.
- KK 01.0x: KJ17 ND-puisto 0aad16c3f NÄYTTÄÄ OIKEALTA → junaan (PT:lle junaehdokas lähetetty; nd-puisto-2 on 440d3e8d6:n päällä ilman Opéraa → JU yhdistää).
  Seuraavaan kierrokseen: 1) puiston nurmella irtonainen kapea talo pois; 2) parvisin hakasen muotoiset tummat jäljet + etelärannan sumea vihreä kaista:
  YKSI rivi KK:lle (piirroskartan pohjaa vai varjoja, voiko siistiä); 3) ND-lähikuva rajaa tornit pois → Opéran resepti hieman kauempaa.
- JU: KJ17 valmis (lokit/karttaseppa-nd-puisto-kj17-0aad16c3f), KJ19 seuraavaksi, sitten KJ20.
- PT 01.1x: c032134e7 pt-ok annettu (224.51). ND-puisto 0aad16c3f: PT kysyi KK:lta, saako mennä ennen kolmion selvitystä – KK kutsui kolmiota
  "keskeneräiseksi puistoksi" → VIHJE: kolmio on todennäköisesti ND:n itäpuolen puisto (Square Jean-XXIII) junan vanhassa tilassa; vertaa 224.47-kuvaa ja
  KJ17:n nd17-*-kuvia: jos 0aad16c3f korvaa kolmion, puisto ratkaisee ehdon (kerro PT:lle ja KK:lle yhdellä rivillä).
- JU 01.2x: 224.51 = 29768b6cb (lähin c032134e7) LINKISSÄ – lähin-kohta SULJETTU. ND-puisto 0aad16c3f → 224.52 testeissä (pt-ok odottaa KK:n vastausta PT:lle).
