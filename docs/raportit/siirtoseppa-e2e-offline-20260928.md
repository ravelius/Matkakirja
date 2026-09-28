# E2E-offline Tanska + Kroatia (Siirtoseppä 28.9.2026 klo 07.3x)

Build: BUILD 34 (proto 17c2928b = TF 1.0.34), paketti v257 (skeema 1.55), simulaattori F989814A, tuore asennus.
Ajo: `alue lataa DNK`, sitten `HRV` (maailma ladataan ensin automaattisesti). Sen jälkeen hakuloki päälle
(`verkko haut paalle`), ja kamera ajettiin Kööpenhaminaan, Kronborgiin, Zagrebiin ja Dubrovnikiin. Lopuksi
avattiin nostokortit Kronborg ja Split. Simulaattorin verkkoa ei voi katkaista Macin verkkoa katkaisematta,
joten offline-kattavuus mitattiin hakulokista: jokainen latauksen jälkeen verkosta haettu tiedosto on aukko.
Kuvat ja konsoli: `/Users/Shared/Claude/proto-3d/lokit/siirtoseppa-e2e-offline-20260928/`.

## Toimii

- Lataus: maailma 12 804/12 804 tiedostoa (15,6 Mt, 568 s), DNK 342/342 (44,8 Mt, 54 s), HRV 301/301 (51 s).
  Virheitä 0, poikkeuksia 0.
- Rasteri: kaikki verkosta haetut rasterilaatat (z6–z10) olivat DNK:n ja HRV:n latausvälien ulkopuolella
  (lentoreitti, naapurimaat). Ladattujen maiden rasteri tuli levyltä.
- Puheet: 3 + 3 mp3:a levyllä, `Mukana.Polku` käyttää niitä (ei toistettu: puhetta ei pyydetä workerilta).

## Löydökset

1. **Offline-maasto puuttui 127/138 maalta** (DNK, HRV, FIN…). Vienti laski välit sarjasta 2026-09-23b
   (z7+ vain Ranska), mutta natiivi lataa sarjasta 2026-09-24-maailma. Kirjanpidossa DNK maasto 0, HRV 0.
   **Korjattu: ravelius/Matkakirja#3523** (Natiiviseppä kuittasi, Julkaisijan junassa). Korjatulla viennillä ajon
   DNK/HRV-maastohaut (14 + 2) osuvat latausväleihin.
2. **Natiivi ei käytä offline-alueen JPG/WebP-kuvia.** `Kuvat.LataaVuorossa` lukee `Mukana.Polku`-tiedoston vain,
   kun se päättyy `.png`:hen. `LataaWebp` lukee vain välimuistin (`levy`). Nostokortit Kronborg
   (`karttanostot/…/dnk-nosto-kronborg-89161023.jpg`) ja Split (peristyle…51389330950.jpg) hakivat kuvan verkosta,
   vaikka pienennetty tiedosto oli levyllä offline-polussa. Ilman verkkoa kortin kuva jää tyhjäksi. Korjaus
   (Natiiviseppä): jos `mukana != null`, lue `file://mukana` myös jpg:lle, ja WebP-reitissä `levy ?? mukana`.
   (Pienennetty on JPEG myös .webp-polussa, eli ImageIO-purku käy.)
3. **Maakohtaiset sisältömoduulit haetaan laiskasti verkosta.** Nostokortin avaus haki
   `moduulit/js/packs/nakyvat-kaupungit-dnk.json`, `fokuskohteet-dnk.json` ja `nakyvat-kaupungit-hrv.json`.
   Offline-lataus ei sisällä niitä. Ehdotus: `maat.*.moduulit` (skeema 1.56), ja natiivin `Sisalto` katsoo
   offline-kansion kuten `Mukana.Offline`.
4. **Kermaväritaso, reliefipyramidi ja yövalot eivät ole offline-latauksessa.** Kerma p060 (pelaajan maa +
   naapurit, tässä GBR/FRA/IRL/NLD + _maailma): 534 hakua, noin 9,8 Mt. Reliefi `pallo` z7–8 ja `pallo-k08` z4–5:
   83 hakua, noin 1,2 Mt. Yövalot z5–6: 7 hakua. Pelaajan kotimaan kerma on offline-kartan ilmeen kannalta
   näkyvin.
5. **Kokoarvio ja levykoko.** DNK ladattiin 44,8 Mt, vaikka arvio `tavuja.offline` on 35,6 Mt: natiivi lataa
   rajauslaatikon, arvio laskee maan laatat. Maailman 12 804 pientä tiedostoa vievät siirtona 15,6 Mt mutta
   levyllä noin 48 Mt (4 kt:n lohkot). Pelaajalle näytetty koko on siis alakanttiin.
