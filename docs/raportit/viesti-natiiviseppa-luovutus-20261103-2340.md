# Natiivisepän luovutus 3.11.2026 klo 23.40 (konteksti 27 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen -20261103-2315; siitä yhä voimassa kohdat "Päätökset", "Työkalut" ja "TILA": `git show dd0c493b6:docs/raportit/viesti-natiiviseppa-luovutus-20261103-2315.md`. 1622:n TILA: `git show afbe75860:docs/raportit/viesti-natiiviseppa-luovutus-20261103-1622.md`. Id:t: /Users/Shared/Claude/osoitekirja.md.
Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).
EI testejä, kun `pgrep -fl "[e]sikatselu.sh|[U]nity -batchmode"` näyttää ajon.

## YÖTYÖ (PT, omistaja 22.31 "Koita saada Pariisin kartta tehtyä kokonaan")
Sijoita KK:n hyväksymät peliin sitä mukaa kuin KS/PT ilmoittaa. Pelikuvat JU:lta → PT → KK.

## ENSIMMÄISENÄ
1. **Kartta-testit EDELLEEN AJAMATTA** (PT: ennen kuittausta; kone on ollut varattu): `sh Kartta-testit/kaanna.sh` ensimmäisessä välissä kärjessä 95a733ace (koko-koe-218) ja 5f8b18b5c (nahtavyydet-218). Tulos PT:lle ja JU:lle. Viimeksi läpi 4819cd07b 603/603.
2. **Koeajo 95a733ace JU-jonossa** (sk _tyo/natiiviseppa/aluekuva-koko/sk-sillat-v2.txt; korvasi 1750f3d00:n ja 159acdf0c:n; viesti JU:lle 23.39 toimitettu, JU:n kuittausta ei vielä tullut). Kuvat PT:lle "k11 koe". C# on kääntämätön: KaupunkiMerkit + PiirrosKerros.Esineet. Katso kuvista:
   - nd-louvre (KK haluaa ND:n ja Louvren samassa kuvassa, PT:n kautta), nd-keski/-lahi: ND 0,8, raivaus uuden ääriviivan mukaan, ei tyhjää keltaista; HdV-pala ja soikio poissa; mitä tornin ja huipun välistä nyt paljastuu.
   - silta-*: kannen leveys kadun leveyteen (KK), kannet rannasta rantaan, pohjan omat sillat eivät pilko vinon sillan vieressä.
   - sainte-chapelle, puut-boulogne, puut-keski: tiheys ja kehysajat (86 783 puuta, entinen 2458; KK 2.11. "liikaa puita": harvenna tarvittaessa saannot-isoisa-2029-60.json).
3. a94d8e7fb:n ajo esikatselu-20261103-232150 on valmis, kuvia katsottu vain nd-keski. Handoverin kysymykset (Montparnassen ruskea, Eiffel, vene-0…3) ovat auki, jos uusi ajo ei vastaa niihin; JU ajoi lisäksi PT:lle Eiffelin kokonaan.
4. Ämpäriin pyydetty notre-dame-alue-v4 ja sainte-chapelle-alue-v1; silta-* viety 23.26 (JU). Varmista.

## HAARAT (proto-repo, wt/proto-natiiviseppa-maskik4, peili natiivi-backup; worktree nyt koko-koe-218)
- **natiiviseppa/nahtavyydet-218 kärki 5f8b18b5c = hyväksytyt ilman k11:tä**: 7ee81d262 → 53b34a340 sillat → 48ba7cf88 Sainte-Chapelle → 99d7be691 aukiot pois → 9ac73a6e4 ND 0,8 (v4) → 6c283e719 HdV pois → 5f8b18b5c merkki piiloon + NahtavyysRuudulla.
- **natiiviseppa/koko-koe-218 kärki 95a733ace = edellinen + k11 + koko Pariisin puut. EI junaan eikä ämpäriin ennen KK:ta.**
- **Merge-sääntö:** Esineet/pariisi.json riitelee joka mergessä, koska haaroilla on eri määrittely. Ratkaisu: merge → `python3 -I tee-esineet.py kaupunki-pariisi-koko.json <checkout>` → add → commit. Nahtavyydet-218:aan aina `kaupunki-pariisi-k4vt-alue.json`. Muutos kp:hen tehdään AINA molempiin (koko = k4vt-alue + esinepaikat/puut KS:n pariisi-koko-esinepaikat-20261103, nahtavyydet_lisa []). Koko-ajo 90 s.

## Päätökset 23.15–23.40
- Sillat: 33 siltaa, 37 uoman ylitystä (Beauvoir oma lisäykseni KS:n 32:n päälle; PT tietää). Tool `sillat-osm.py` → sillat-pariisi.json, kp "sillat", saannot "silta". Lähin suunta a tai b, ei kiertoa; "lahin_kaikista" kertoo vaihdon. Pituus uoman ylitys + 12 m, kaaret ≤70 m 2, ≤125 m 3, muuten 6.
- **90°/30° arkin tullessa** (Codex, posti 446537cc8; KS:n lista + Beauvoir): 11 siltaa vaihtuu. Lisää kirjastosta, laajenna SUUNNAT sillat-osm.py:ssä, aja molemmat kp:t.
- Aukiot ja suihkulähteet pois Pariisista kp:n "ryhmat_pois" (VS: KK:n harmaat kiekot, 6/6 todennettu). Takaisin vain PT:n luvalla ja oikeille aukioille; KS:n data merkitsee `nahtavyys_kohdalla`, joka jo suodatetaan.
- ND: KK 23.26 0,8 (taso sha 8589240ae981, irtopala poistettu), maski alfasta.
- HdV:n vanha kuva pois datasta (KK 23.29 pala tornin takana). TSJ jäi, mutta se on ND:n takana piilossa. Uusi HdV vain KS:n aluekuvalla.
- Soikio/kiekko (KK 23.29, AVOIN 0): EPÄILY Pariisin kaupunkimerkki, ei todennettu. Piilotettu `EsineetKohdassa` alle 20 km koealueella (myös valintamerkki). Jos soikio näkyy yhä 95a733ace:n kuvissa, syy on muu: selvitä.
- Nimet (KK 23.29): KS:n, annoin `NahtavyysRuudulla(Rect, Camera)` (instanssi; KS:lle kirjoitin sen muodossa PiirrosKerros.NahtavyysRuudulla). Odota KS:ää.
- NUI:n 4a24938fc välitetty JU:lle: juna-218 (1420265d7) ei ole nykyinen paketti, 40ed9da3c on JU:n 4397cf20d:ssä.

## AVOIMET
1. Kartta-testit (yllä). 2. Sillat 90°/30°. 3. Sainte-Chapelle: tarkista, peittääkö ND:n vasen reuna. 4. JU 23.2x: "Notre-Dame peittää saaren itäpään": katso 0,8:lla. 5. Moni kaupunki: toiselle ElavaKoealueelle KoealueenRaivaus-kutsu Laattapalvelin.Awakeen. 6. Vanha jono: 354 ms PostLateUpdate → xctrace; GC-haara vasta PT:n luvalla. 7. Hylätyt, älä yhdistä: natiiviseppa/kertoimet-takana-218, abc7c5ae5, natiiviseppa/maskiraivaus-218, natiiviseppa/maskiraivaus-k4-218.
