# Natiivisepän luovutus 9.11.2026 klo 23.04

Edellinen: git show ac6616a2f:docs/raportit/viesti-natiiviseppa-luovutus-20261109-2226.md (KATTOKUVIO-tauko ja vanhat taustat siellä).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Syy: kontekstivahti 25 % (7.37).
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").

## VALMIS TÄSSÄ SESSIOSSA
- TÄRINÄ: valittu PK:n LÄHIORIGO (dc2605d31); oma A2 jätetty (sama siirtomekanismi, PK:n yleinen ja valmis). Kartan ~30 ECEF-kutsukohtaa
  tarkistettu: kaikki seuraavat siirtoa. Mac A/B (JU 22.35, lokit/pk-kierto-tarina-dc2605d31): kamera vanha 340 mm / lähiorigo 0,1 mm;
  vanhalla katot repeävät (float-kärjet), lähiorigolla ehjä → KK:n float-oletus mitattu oikeaksi. Raportti + kuvat:
  /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/nollapiste/ (valinta-lahiorigo.md, rajaus-pois-vanha.png, rajaus-lahiorigo.png).
  KEHITYSVERSIO pyydetty JU:lta 22.47 ja hyväksytty: natiivi-backup natiiviseppa/nollapiste cad1fe5b1 (= 21069f8df + dc2605d31), lisämuisti,
  asennuslinkkiin, ei junaan; JU rivi KK:lle. PT 23.0x: tärinä odottaa omistajan Kelpaa-korttia. → Kelpaa tullessa: PT päättää junan.
- PELIN KOKO OSA 3 / ISS: natiiviseppa/iso-sisalto d88f290b0, PT kuittasi 23.0x, JU vie (junaan + ämpäripaketti iso_paketti.py iss ... 1).
  Mac iso-1 (vika: <tunnus>.json palvelimella) → 0f91e5b16; iso-2 (viivat vasta 3. avauksella) → d88f290b0 (IsoSisalto.Ennakoi); iso-3 ✓.
  Raportti /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/iso/raportti-osa3.md (sis. siirtojärjestyksen, PT hyväksyi).

## KESKEN: OSA 3 NÄHTÄVYYDET (PT 23.0x "jatka nähtävyyksistä")
- HAARA natiivi-backup natiiviseppa/iso-nahtavyydet = 4b332e927 (d88f290b0 + merge 21069f8df + muutos). Worktree /Users/Shared/Claude/wt/proto-natiiviseppa-iso.
- Tehty: Resources/NotreDameKoe/astc (36 tiedostoa, 110 Mt) → Kartta/Palvelimelta/NotreDameKoe/astc; osa nahtavyydet v1 70,9 Mt / 114,9 Mt;
  NahtavyysAstc tavuina IsoSisalto.Tavut + Valmis(); Nahtavyysalue rakentaa alueen vasta kun Valmis (pyydetään lähellä LatausSade, 30 kehyksen
  välein; loki "odottaa mallien tiedostoja palvelimelta" / "mallien tiedostot levyllä"); IsoSisalto.Saatavilla; nahtavyys-astc.py → Palvelimelta.
  unity-tarkistus 0, Kartta-testit 729/729. Koe-ämpäri /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/iso/ampari-nahtavyydet-koe-1
  (nahtavyydet.json kopioitu julisteet/iso/:hon).
- SEURAAVAKSI: (1) Mac-skenaario sk-nahtavyydet-1 (malli sk-iso-1.txt): iso ampari <koe-1>/julisteet/iso, iso lataus tyhjenna, Pariisi lähelle
  Notre-Damea → lokissa "odottaa…" ja sitten "tiedostot levyllä" + "koe luotu"; kuva kylmästä ja levyltä, nähtävyys ehjä. HUOM Mac-esikatselussa
  ASTC-tuki? Tarkista lokista "nähtävyydet: ASTC käytössä" – jos ei, polku ei testaudu Macilla → laitekäännös (JU) tai simu ei käy.
  (2) iOS-laite: osa 1:n siivous poisti alkuperäiset mallit laiteversiosta → ilman ladattuja tiedostoja alue ei rakennu (ei kaadu). (3) Raportti PT:lle.
- Pohjakuvat (png, Texture2D) ja puut jäivät ytimeen: siirto vaatii ASTC-muunnoksen (nahtavyys-astc.py:n laajennus), ei vielä tehty.
- Koemalli-komento (Nahtavyysalue ~945) lukee yhä Resources-polkua: vain kehityskäyttö.

## KESKEN: PELIN KOKO OSA 4 (koodi) – ennallaan
- natiiviseppa/koodikoko 7a8f024ed; JU:lla 4 Release-mittauskäännöstä ajossa (22.45 alkaen) → tulos NS:lle; nopeusajo vain selvästi pienentäville.

## SIVUHAVAINTO (ei NS:n)
- Revontulet.PaivitaNakyvyys:207 MissingReference (Renderer tuhottu) astronauttilinssin sulkemisessa (iso-1-ajo) → linssipuolen tekijälle (VS/LS), ei raportoitu vielä erikseen.
