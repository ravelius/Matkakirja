# Laitetestaajan tarkistuslista rutiinierän kuittaukseen (5.10.2026, Päätoimittajan/omistajan linja)

Käyttö: rooli pyytää kuittausta toiminnalliselle erälle → Laitetestaaja käy listan läpi → vastaus roolille + Päätoimittajalle
yhdellä rivillä: **OK** tai **PUUTE: <kohta>**. Päätoimittaja katsoo vain omistajalle näkyvät, makuasiat ja sisällön.

## Todisteet, jotka eräkuittauksessa pitää olla (rooli toimittaa; Pelikoodarin todistusajotyökalun tuotos)
1. **Build ja asennus:** SHA + `Data/Raw/kaannos.txt` = pyydetty SHA; ancestor-tarkistus (`git merge-base --is-ancestor`).
2. **Napautuspolku oikeilla sim-tapeilla** (`control tap/swipe/touch_path`, koordinaatit `ui puu`:sta), ei pelkkä `ui napauta`
   (ohittaa ohi-napautuksen). Jokaiselle uudelle napille/eleelle: napautus → odotettu tila lokissa + still.
3. **Poikkeukset:** konsoliloki (`simctl launch --console-pty`) → `grep -ci exception` = 0; ei uusia VIRHE-/error-rivejä
   (tunnetut: `ui kuva ei latautunut …varuste-poikkileikkaus.jpg`, ASTC-varalle JPEG simulaattorissa).
4. **Stillit kaikista tiloista:** jokaisesta uudesta tilasta/näkymästä (auki, kiinni, virhe, tyhjä, vaaka + pysty) oma kuva;
   vaakanäkymä simussa on kierretty pystyruudulla (tunnettu raja) → merkitään, ei FAIL-päätelmää ilman laitetta.
5. **Ääni, jos erä on äänellinen:**
   - ääniraita ffprobella (`ffprobe -show_streams` → audio-stream olemassa, kesto ≈ videon kesto), ei hiljainen raita;
   - RMS/dB mitattuna: `aani mittaa <s>` (Unityn mixer, toimii testimykistyksessä) → rms/huippu, tai ffmpeg `volumedetect`
     tallenteesta; hiljainen (rms 0) = PUUTE;
   - A/V-ajoitus vain kun kone on kuormaton (ei käännöstä käynnissä); muuten sanotaan "ei mitattu".
   - Ei Macin oletusulostuloon: testimykistys päällä (`ääni: testimykistys päällä` lokissa); ääni vain natiivikaappauksella.
6. **Aiemmat palautteet:** erän omat aiemmat löydökset (edelliset FAIL/PUUTE-rivit) käyty läpi yksitellen.
7. **Kone kuormassa:** jos käännös/poltto käynnissä → "toimintatesti, ei fps/laatu".
8. **Ei-testattu-lista:** kaikki testaamatta jääneet kohdat nimetään syineen; ei hiljaista OK:ta.

## Vastausmuoto
`<erä> <SHA>: OK` tai `<erä> <SHA>: PUUTE — <mikä todiste puuttuu / mikä rikki>` (+ polku raporttiin ja stilleihin).

## Vahvistetut menetelmät (simu 1572C658, iPhone 18 Pro, 402×874 pt)
- Peli ilman introa: `printf 'odota-tila Aloitus 40\nuusi-peli 5 marseille\nodota-tila Kartta 40' > peli-komento.txt`.
- Linna: `kehittaja 1`, `poikki orbit 0`, `linssi poikkileikkaus` (linssi-komento.txt); valikko ≡ (374,784) → Huoneet (317,650).
- Orbit-mittaus: `poikki mittaus` → kamera paikka; 200 pt veto ≈ 90°; kierros sulkeutuu 4 vedolla.
- Mylly: `ui mylly peli helppo`; Luovuta/Jatka/Poistu oikeilla tapeilla.
- Tiedostokanava: `Documents/{peli,ui,linssi}-komento.txt`; `ui puu` → `ui-puu.json` koordinaateille.

## Simuäänisääntö (Pelikoodari 5.10. ~13.30)
Testimykistys kattoi vain Unityn äänet: radiostriimi (AVPlayer), Cupola-silmukat, Pulun realtime-puhekanava ja ISS-striimilukija (Puhe.Lue) soivat Macin
kaiuttimiin. Kunnes korjaus (pelikoodari/testimykistys-natiivi 8ff03da0) on käännöksessä: **ei radio-, astronauttilinssiä eikä Pulun puhekanavaa simussa.**
Korjauksen jälkeen `aani mykistys` -vastauksessa pitää lukea "unity päällä, natiivi päällä" (todistusajo tarkistaa ja keskeyttää).
