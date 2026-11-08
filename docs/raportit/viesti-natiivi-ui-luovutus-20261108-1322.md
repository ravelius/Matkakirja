# Natiivi-UI: luovutus 8.11.2026 klo 13.22 (napautus korjattu skenaariossa, kartta-lukittu-2 ja lippu katsottu; kolme JU-ajoa jonossa)

Korvaa luovutuksen -1235 (sama haara, ks. sen PÄIVITYKSET 12.4x–13.20): `git show fbe4e7964:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1235.md`.
Siinä yhä voimassa: EHDOTUS KORTILLE -luonnos, AUKI KIINTEÄSSÄ LADONNASSA -lista, Työkalut, Opit; -1120:n ☰-valikkoselvitys (PÄIVITYS 11.4x).
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
Proto-työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, nyt haaralla natiivi-ui/topoesittelyt-221 (puhdas, natiivi-backup).
Vertailutyökalut: proto-3d/_tyo/natiivi-ui/kartta-lukittu/{siirto,ero,pari}.py (aja zsh:ssä yksi pari per komento, ei "set --").

## JONO (JU:n iPad-järjestys: napautus-2 → kartta-lukittu-3)
1. NÄHTÄVYYSNAPAUTUS-2 c33b2ebd1 (natiivi-ui/nahtavyyden-napautus-222): sk-nahtavyysnapautus-2.txt (Concorden aukio 1,8 km, kyltit auki)
   → lokit/nui-nahtavyysnapautus-2-c33b2ebd1. Ajo 1 kelvoton: 4 km:stä kyltit kiinni (aukeavat kaari ≤ 0,02) → pallolle.
   KATSO 8 kuvaa (ennen, lento, keskitetty, kierto puoliväli, kierto myöhemmin, palkista auki, suljettu, sormi) + ui-loki
   ("ui lukija: aloita pala", "ui nähtävyysesittely:"-rivi). Jos ohi: rivi "merkki: …" kertoo syyn. → kuvasarja PT:lle → KK. Ei koeversioon ilman omistajaa.
   AVOIN PT:lle kuvien kanssa: 3D-mallin kyltti (Notre-Dame, Louvre) ei esittele (oma suunnitelma 11.53) — viedäänkö sekin esittelyyn?
2. KARTTA-LUKITTU-3 17addbe2d (5°-PORTAAT, PT 12.5x): sk-kartta-lukittu-3.txt, suunnat 0/2/3/7/12/0, kallistus 45 → lokit/nui-kartta-lukittu-3-17addbe2d.
   Porras = Math.Round(suunta/5): 0≈2 ja 3≈7 samat (ladontoja ei kasva, sama nimijoukko), 3 ja 12 uusia. KATSO: mitkä nimet sammuvat/syttyvät
   portaan vaihtuessa (ero.py samasta suunnasta ei käy: kuva kiertyy → vertaa silmällä/rajauksin), s0 vs s0-paluu md5/ero.
   Jos hyppii häiritsevästi: ehdota PT:lle porras 15° tai ladonta kaikkien suuntien yli (pariton pois, jos osuu jossain suunnassa).
3. KARTTA-LUKITTU-2 KATSOTTU 13.20 (tulos proto-3d/_tyo/natiivi-ui/kartta-lukittu-2/tulos-kartta-lukittu-2.md, 4 paria PT:lle → KK).
   Lukitus toimii. Odottaa PT/KK: harvennus (Musée de l'Armée putoaa oman mallinsa takia, Palais Bourbon, Petit Palais, Musée Rodin…).
   Mahdollinen korjaus sanalla: mallin oma nimi ei törmää omaan malliinsa (Nahtavyysalue.KiinteatEsteet ottaa kaikki nimetyt mallit; vanha
   ladonta ohitti OnKyltti-nimet). Kunnialegioonan museo: oma paikka ~85 pt rakennuksen oikealla.
4. TOPOESITTELYT (natiivi-ui/topoesittelyt-221 = 877f5d72d: kyltit SK:n mukaan dc3e11279 + NS:n Himalaja etelästä 877f5d72d).
   Mac-video JU:lta VASTA kun KS:n ruutukuvat ovat haarassa JA NS ilmoittaa tallenteen kellovian korjatuksi; sk-topoesittely-1-mac.txt
   (tallenne alkaa ruudukosta). Sitten katso → video PT:lle → KK.
5. LIPPU 4.42 1f26c51b4 KATSOTTU (kuvat _tyo/natiivi-ui/lippu-442-2/ PT:lle → KK); junaan PT:n sanalla.
6. ☰-valikkoselvitys (luovutus -1120 PÄIVITYS 11.4x AUKI).

## Opit (uudet)
- ui.fi.json-luvuissa sitova välilyönti (U+00A0): sed ei osu → muokkaa Pythonilla.
- Kallistetun kameran pieni panorointi: pikseliero ei kelpaa (perspektiivi), vertaa samaa karttarajausta silmällä (pari-pieni-panorointi).
- md5-ero samassa paikassa voi tulla lentävästä linnusta ja puiden pisteistä: ero.py:n ruudut kertovat.
