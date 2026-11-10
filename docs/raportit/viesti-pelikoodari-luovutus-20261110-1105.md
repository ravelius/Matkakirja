# Pelikoodari: luovutus 10.11.2026 klo 11.05

Korvaa kaikki aiemmat. Edellinen: `git show eefcd6ca9:docs/raportit/viesti-pelikoodari-luovutus-20261110-0958.md` (hoidettu).
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), NYT haaralla pelikoodari/nimi-zoomaus-224.
Kuvat ≤ 1000 px. Viestit send_messagella session-id:llä. TYÖLISTA: T=/Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py
(`python3 -I $T seuraava PK` | `tehty "OTSIKKO" "…"` | `este …`). Testit työpuussa sh:lla: Linssit-testit/unity-tarkistus.sh,
Peli-testit/kaanna.sh, Linssit-testit/kaanna.sh. Junan 224 kärki tätä kirjoittaessa 4444e211a.

## 1. MONTPARNASSE (työlista [1] "Montparnassen torni piirtyy Liiku-napin päälle") – KK: KELPAA JUNAAN (PT 10.5x)
natiivi-backup pelikoodari/montparnasse-224 = 20f6e6073 (3bbe27523 + 1): Pariisin kierron loppunäkymä 600 m pohjoiseen
(KiertoOhje.LoppuPohjoiseenM, PeliOhjain.KiertoLoppuPohjoiseenM). Mac-pari lokit/pk-montparnasse-20f6e6073/pari/, TULOS
proto-3d/_tyo/pelikoodari/montparnasse-224/TULOS.md. ODOTTAA: JU:n iso iPad -ajo "OF" (sk _tyo/pelikoodari/montparnasse-224/
sk-ipad-montparnasse.txt) → lokit/pelikoodari-montparnasse-ipad. Ehto: kuva a1 (torni ei napin takana), muistihuippu < 4080 Mt, VIKA 0.
Kun ok: tulos + kuva PT:lle → MR JU:lle, Uutta-teksti (PT): "Pariisin aloituslento päättyy näkymään, jossa Montparnassen torni ei
peitä Liiku-nappia" → `tehty "Montparnassen torni piirtyy Liiku-napin päälle"`.

## 2. NIMEN NAPAUTUS = ZOOMAUS (PT 11.0x/10.5x; KK-suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/
20261110-kartan-kohteet-kolme-lajia.md osa 1) – PK:n vastuulla (NUI perui oman b6cf108aa:nsa)
natiivi-backup pelikoodari/nimi-zoomaus-224 = c3e223a5f (4444e211a + 3): PeliOhjain.ZoomaaKaupunkiin (SaapumisZoomaus-kohde, ei
korttia; NapautusZoomaa-lippu), Napautettu Kartta-tilassa → zoomaus; lisäkaupungit (kohde:nakyva-kaupunki-*) NostotKartalla.AvaaNosto →
PeliOhjain.ZoomaaPaikkaan; testikomento `ui lisakaupunki napauta [nimi]`. unity 0, peli 893/893.
Tehty ajo: lokit/pk-nimi-zoomaus-bdae03fd6 (z0–z4: Pariisi, Alpit, Bryssel, Lontoo zoomaavat oikein; Bryssel 7 s:n kohdalla vielä
osin sumea laatta). ODOTTAA JU:lla: pari sk _tyo/pelikoodari/nimi-zoomaus-224/sk-lisakaupunki.txt (Pariisi + Lyon) c3e223a5f →
lokit/pk-lisakaupunki-c3e223a5f ja nyky → lokit/pk-lisakaupunki-nyky-4444e211a (+ mahdollisesti OE2 lokit/pk-nimi-zoomaus-nyky-4444e211a).
Kun valmis: katso y1 ja y2 (Lyon: ei nostokorttia, kamera Lyoniin; lokissa "napautus zoomaa paikkaan kohde:nakyva-kaupunki-lyon"),
tee pari nyky | uusi → PT:lle (Pariisi + Lyon) → KK. Jos ui lisakaupunki napauta ei löydä nostoa ("ei nostoa"), Lyonin nosto ei ole
Naytettavat-listassa maan tasolla: kokeile lähempää (komento aja 45.76 4.84 3 3) tai NostoIdlla-tunnusta @FRA-liitteellä.
Huom. NUI: Avauskortin sisältö (lehti, turisti-info) saa paikan osassa 2 (NUI). Euroopan ulkopuolella ZoomaaKaupunkiin → saapumisnäkymä.

## 3. MUUT
- TAUSTA v130 iPad-ajo (66b550331) JU:lla: launch-vika 10.35/10.37 (devicectl error 22), uusinta NB3 ajossa 10.5x. Kun valmis: kuvat
  v130-* + muisti-tarkka.log (huippu ≤ ~3850, kylmä < 40 s, ei valkoisia, lattia yhtenäinen, ei punaista piikkiä) → pari PT:lle
  (vertailu lokit/pelikoodari-yhd-1) → junaan 224 PT:n kuittauksella.
- Juoksupelin lataus nopeammaksi: odottaa omistajan iPhonea. Peukalorenkaat [60]: odottaa yhteisajoa.
- NUI PR 6553 (aihe-kenttä kohdekarttaan): viittaukset kuitattu 10.4x, ei toimia.
