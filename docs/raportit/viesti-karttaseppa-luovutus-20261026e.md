# Karttasepän luovutus 26.10.2026 klo 16.04 (Postivahti: kova raja 36 %)

Lue ensin CLAUDE.md, tuotannonohjauksen osio 0 (`git show origin/main:docs/tuotanto/tuotannonohjaus.md`) ja
`node tools/raamattu-luku.mjs 7.47`. Edellinen luovutus: e27a5979b (`viesti-karttaseppa-luovutus-20261026d.md`; sen Tasangot-
ja Avoimet-osiot ovat yhä voimassa). VIESTIT aina send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`), PT:lle
≤ 3 riviä. Käännökset ja simut vain Julkaisijan jonon kautta, kaikki b6:lla. AJA `zsh tyokalut/tarkista.sh` ENNEN JOKAISTA
KÄÄNNÖSPYYNTÖÄ ja palauta sen jälkeen `git checkout -- Assets/Matkakirja/UI/Resources/MatkakirjaUI/Tyylikirja.uss
Assets/Matkakirja/UI/Tyylikirja.cs tyylikirja/tyylikirja.json`. Kartta-testit: `sh Kartta-testit/kaanna.sh` 549/549.

## SEURAAJALLE ENSIN: omistajan iPad-palautteen (15.32) simuajo ennen/jälkeen
- PT:n jonon kärki (PT 15.3x): omistajan sanat ja tavoitteet PT:n viestissä; Raamattu 4.41 päivitetty haarassa
  fable/kartta-koko-20261026 (koko sidottu karttaan, häivytys, pienempi porras; nappula ja piste lukittuina).
- Proto-haara `karttaseppa/elava-kartta` (wt /Users/Shared/Claude/wt/proto-karttaseppa-elava-kartta), kärki **4fccd2490**,
  peilissä. Commitit 5dab5b434:n päälle:
  - 6922da400 Symbolimallit.Nollaa: Paalla = Karttaesineet.Oletus (sarjan 3D-merkit eivät piirtyneet lainkaan; NS:llä junaan 211).
  - 20dc596d2 rautatiet ohuina, rinnakkaiset raiteet yhdeksi (ElavaTyyli.Yhdista, 7 px), poikkiviivat Z13+, sivuraiteet Z14+, tyyli e7.
    Koekuva C#-piirtäjällä: `proto-3d/_tyo/karttaseppa/elava-kartta-20261025/rata-clapham-ennen-jalkeen.png` (tyokalut/koe-rata.sh,
    koe-rata-kuva.py, koealue.py).
  - 955348566 isot kaupungit aiemmin: ElavaNimet.KaupunginTaso (rank 1–3 → 8, 4–5 → 9, 6–7 → 10, muut 11; capital 2 → rank ≤ 3),
    nimet myös Z8–10-paloista (Laattapalvelin.ElavaNimetPalasta). Koe: Pariisi 8, Lyon 9, Reims 10.
  - f440e9681 nappula, kaupunkipiste ja siirtokohteet maanpinnalle (PisteenKorkeus(maa: true)); 5–10 km nosto liukui lähellä.
    Tarkista simulla: lennon lasku (lentoPohja → NaN) hyppää nyt 10 km → maa.
  - 70528e9ce 3D-koko sidottu karttaan: KarttaesineSaanto.PorrasPt (4× portaat, 30–120 pt, häivytys 0,14 portaan päissä),
    Karttaesineet.KarttaMitta; A Symbolimallit (ZoomPiilo, erikoismalleille suoraan lohkoihin + osat), C Maamerkit (näkyvyys ≤ peitto,
    ei pehmennystä), elävät. Galleria ja UI käyttävät yhä Mittaa.
  - d7e3df9de puretut Z9/Z10-vanhemmat muistiin (16 LRU) panoroinnin nykimiseen; komento `komento elavakartta` laskureineen.
  - 4fccd2490 sarjan elävät: häivytys _Tila.y:hyn (Symbolimalli-varjostimessa ei _Peittoa), ei 15 km:n alarajaa (LT Lontoo
    114803c2e: London Eye katosi 0,15°/0,04°).
- KÄÄNNÖS: JU L1:llä d7e3df9de (alkoi 15.58), sen perässä 4fccd2490 samaan `_tyo/karttaseppa/elava-kartta-app`. JU nollautuu:
  seuraa `julkaisija-tyokalut/ks-elava-ipad2-kaanna.log`; SIMU NYT 00CF62C2 on Karttasepän, kun lokissa on KÄÄNNETTY 4fccd2490
  (kirjoita `<app>/kaannos.out` rivi "KÄÄNNETTY 4fccd2490 …", jos puuttuu).
- AJO: `zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/elava-kartta-20261025/ajo-palaute.zsh molemmat` (taustalle, ~12 min):
  ENNEN = tripo-vertailu-app c3dbcfea5 (Tripo oletuksena pois), JÄLKEEN = elava-kartta-app; skenaario sk-palaute.txt (Lontoo Z1 22,
  Z2 8, Z3 3, Thames-lähikuva, zoomausvideo, 8 vetoa panorointiin, `elava elementit tila` -rivit). → SIMU VAPAA JU:lle.
- Raportoi: kuvaparit ennen | jälkeen samasta kohdasta (kuvat/raaka, selite kuvan ulkopuolelle; vrt. tyokalut/tripo-pari.py),
  videot, kehysajat (liike p95/max ennen vs jälkeen), `elävä kartta: … vanhempia purettu / muistista`, höyrylaivan tila.
  → haara+SHA NS:lle (junaan 211) ja PT:lle; PT tarkistaa 1:1 ennen KK:ta; LT:lle Lontoo-uusinta.
- AUKI: höyrylaiva ei piirry Lontoossa (syy tuntematon; sarjassa SarjaRoottorista, Animoi jakaa metrit juuren mittakaavalla) –
  katso Z3b-thames ja tila-rivi. Karuselli on Tivolissa (Kööpenhamina), ei Lontoossa (kerrottu PT:lle). Panoroinnin mittaus
  iPad Pro 11:llä vain omistajan pyynnöstä (muisti); Iso iPad vapaasti. Nimikerros (200 nimeä/ruutu) on toinen nykimisehdokas.

## Tripo-vertailu (PT 15.4x, EI JUNAAN)
- `karttaseppa/tripo-vertailu` c3dbcfea5 (wt /Users/Shared/Claude/wt/proto-karttaseppa-tripo-vertailu), ajo
  lokit/todistus-tripo-20261026-1531. Vain Colosseum vaihtui: Tripo-malli kääntynyt pystyyn (akseli/pohjoinen, #812 auki).
  Matterhornin vuori = KaupunkiPallot "pienoismalli-alpit" (B-polku) ja Kinderdijkin mylly ei Symbolimallit-polulla → koe ei
  koskenut niitä. Kuvat PT:lle: `_tyo/karttaseppa/elava-kartta-20261025/tripo-pari-20261026/pari-1-colosseum(-lahi).png`.
- Jatko omistajan palautteen jälkeen: Tripo-GLB:n akselikorjaus (−90° X?) ja B-polun Matterhorn.
