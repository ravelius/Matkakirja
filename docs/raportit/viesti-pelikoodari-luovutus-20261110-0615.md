# Pelikoodari: luovutus 10.11.2026 klo 06.15

Korvaa kaikki aiemmat. Edellinen: `git show bc34e4a77:docs/raportit/viesti-pelikoodari-luovutus-20261110-0510.md` (hoidettu, ks. alla).
Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla. Viestit send_messagella session-id:llä. Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu
(NYT haaralla pelikoodari/juoksu-mac-kuvat = c98ad61e6, juna 224 acd29110e:n päällä; remote natiivi-backup). Python ilman -I:tä.

## TEHTY
- Juna 224 (JU): 28c92a109 (juoksu-kylma) = 3679d09ef; tahdistus a59334e25 = acd29110e (1e värinä: alkulento p50 tasan 25 ms,
  0b hyppii 16,7↔25; TULOS-tahdistus.md + kaavio-tahdistus-b.png, _tyo/pelikoodari/juoksu-tahdistus/).
- Kulkupari: ei leivontaeroa, keisari keltainen; piikki = rakennusmalli (TULOS-kulkupari.md, kulkukartta/).
- 1f lähtö heti: junassa 224 omistajan 9.11. 08.32 -muodossa (84521ba9b). 1d varjot: 5ed43b793 + d58806806 junissa 223/224.
- 1d-PARI omistajalle (PT 06.0x): Mac juna 224 + c98ad61e6, sama jäädytetty ruutu alkuvarjo 0 | 1 (sk-1d-pari-224.txt):
  _tyo/pelikoodari/juoksu-223/pari-1d-224-c98-ennen-nyt-a-{4..20}s.png (paras a-4s: muurien varjot pihalla vain uudessa). PT:lle 06.2x → KK.
- MAC-KUVAVIKA c98ad61e6 (natiivi-backup pelikoodari/juoksu-mac-kuvat): JuoksuLeivottu.Valimuisti kutsui Application.temporaryCachePath
  taustasäikeessä → editorissa poikkeus, Task nieli → "kuvia haettu verkosta 0", katot/puut valkoisia Mac-esikatselussa. Juuri pääsäikeessä
  (Valmistele), taustatarkistuksen virhe lokiin. Laitteella ei muutosta. unity 0, Juoksu 215/215. JUNAAN PT:n kuittauksella (pyydetty 06.2x).
- ISO-VIENTI (PT 06.1x KIIRE): VAHVISTETTU JU:lle 06.2x: _valmiit/iso-nahtavyydet-v1-vienti-20261110 36/36 sha = juna 224
  StreamingAssets/iso/nahtavyydet.json, hakemisto.json rivit samat; julkaistu TF 224 (db1dbdc9f) ilman IsoSisaltoa → ei muutu.
  Työkalu: _tyo/pelikoodari/tarkista_iso_vienti.py <manifest> <tiedostot-kansio>.

## JONO
1. PT:n kuittaus c98ad61e6 → JU merge junaan 224 (eri tiedostot kuin muut, ei ristiriitoja).
2. Paketti-v4 odottaa LAV:n lattiaa ämpäriin (LAV 04.06: lattia4 paras, lattia5 etsinnässä): juoksu-leivonta.py lista paketti-v4
   (+ juoksu-taivas-leivonta.py) → vienti → Palvelin. ÄLÄ muokkaa lattian geometriaa/valoa.
3. Kaupunki/maa-erä (Pulu) ei kärjessä (PT 06.0x), odottaa.
4. Jos muistihuippu > 3850: TULOS-muisti-3-valmistelu.md (osasarjan valoatlakset / ulkorengas ennen 1. kuvaa); ASTC 6x6 vain PT:n luvalla.
Jos jono tyhjä: rivi PT:lle "JONO TYHJÄ: Pelikoodari".

Testit: `sh Peli-testit/unity-tarkistus.sh` ja `sh Peli-testit/kaanna.sh Juoksu` (työpuussa, sh ei zsh).
Vahti: lokit/<nimi>.ajo.log tai kuvatiedosto (Monitor bash -c, ei zsh-globia: nomatch kaataa).
