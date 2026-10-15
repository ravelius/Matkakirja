# Pelikoodarin luovutus 16.10.2026 yö (KOVA RAJA, Postivahti + PT 00.4x, klo 01.0x)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261015-ilta5: kaikki kohdat hoidettu (alla).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md).
  PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03,
  Valoseppä local_c238f4af-ae73-44e7-81f1-92848acd9217, Äänittäjä local_16ee69c8-b917-4dcd-9060-3542c5e03e67, SK local_72d15713-eb20-402b-95f7-87bdaaf91b74.
- Testit: `sh Linssit-testit/kaanna.sh`, `sh Peli-testit/kaanna.sh`, `sh Linssit-testit/unity-tarkistus.sh` (worktreen juuressa).
- Ajotyökalut /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ (ajo-*.zsh + sk-*.txt; SHA=… [UDID=…] zsh ajo-….zsh).

## ENSIMMÄISENÄ: junan 196 ehdot (PT 00.4x) – omistajan pyynnöt 15.10. klo 23.56 (A–D)
Proto **pelikoodari/kohtaaminen-196 59b2068b5** (BUILD 195 64e1efcd1 päällä; Peli 586/586, unity 0), worktree wt/proto-pelikoodari-kohtaaminen-196:
- 4fc31c7b6 C+D kohtaamisen väärä vastaus: Pulun repliikki 1,3 s väärin-äänen jälkeen (PuluVastausAani.VaaraViiveMs), väärin-ääni 0,7
  (UiNakymat.VaarinVoima), punainen + "Väärin." → vihreä oikea vasta Pulun jälkeen (PeliOhjain VaaraOikeaMinS 1,6 / Max 8 s, KysymysNaytto.OikeaNakyy)
  → selitys 1,2 s tauon jälkeen. Lokirivi "peli: oikea vastaus näkyviin X s vastauksesta".
- 20dcad8bf A kartan tuplanapautus: vain maakunnan valinta lappuun (Maakunnat.ValitseKunValmis ilman AvaaKartalta).
- 59b2068b5 B Macin osoitinlevyn hipaisu: PalloKierto hiiri myös wasPressedThisFrame (saman ruudun painallus+vapautus).
- TEE: JU:n L2 (jonossa 00.2x) → KÄÄNNETTY + asennus iPhone 96044270 (app _tyo/pelikoodari/kohtaaminen-196-app/) →
  `SHA=<käännös> UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh .../pelikoodari-ajot/ajo-kohtaaminen-vaara-196.zsh` (video äänineen
  C+D + kuvat k0–k4, lopussa A-kuva a1-tupla; skenaario sk-kohtaaminen-vaara-196.txt, `peli tutki` → `peli aloita` → `peli vastaa vaara`;
  jos tutki ei avaa kohtaamista, vaihda kaupunkia). Ääni+kuva: aani-alku/video-alku tallenteet; tahdistus linssiseppa-ajot/tallenne-yhdista-raaka.py
  (välähdys = `linssi merkki`). Video + kuvat PT:lle → sha NS:lle junaan 196.
- B Mac: NS KÄÄNNETTY-MAC 59b2068b → _tyo/pelikoodari/kohtaaminen-196-mac/Matkakirja.app (00.31). Todiste: kartta auki, nopea synteettinen
  tuplaklikkaus (down+up samassa ruudussa) maakunnan kohtaan → loki "ui maakunta: tuplanapautus → …". Jos ei ehdi: B omistajan TF-testiin.

## TAIDEMUSEO (omistaja 16.10. 00.17 pyyntö + 00.18 kävelypäätös; loki f7e7dd4a6, 7c3641317) – junaan 196, video PT:lle
Proto **pelikoodari/taidemuseo-196 50ea40b6e** (64e1efcd1 päällä), worktree wt/proto-pelikoodari-taidemuseo-196, peilattu:
- e58fc9305 KOHTA 1 (valmis, Linssit 1880/1880): MuseoKierros.TaukoVapauttaa (päällä): tauolla ohjain / katseen veto / napautus →
  KatkaiseTauolla → vapaa kulku, kertoja pois ("museo: kierros katkesi tauolla (syy)"); ohjain näkyy jo tauolla. MuseoTaulu: vapaassa
  kulussa ⏸/▶ piiloon, Kuuntele (Ohjausnappi + Ikonit.Viiva["kaiutin"], "ui.museo.kuuntele") taulun kohdalla → MuseoSovitin.Kuuntele
  (kertojan äänite, sama teos → tauko/jatka; ilman äänitettä kortin luenta). Testi MuseoOsoitusTestit.TauollaNapautusKatkaiseeKierroksen.
  Kierrokselle takaisin: nimilistan valinta (☰) – kerro PT:lle, jos omistaja haluaa erillisen napin.
- 631e6290b KOHTA 2 (valmis): datamuoto + kamera olivat jo (kohtazoom.json x/y|bbox + alku_s/loppu_s, Auto Zoom -liuku). Mauritshuisin
  pääsali mallina SK:n viittauksista (tyokalut/museo_kohtazoom.py --sk, ajat _tyo/taidemuseo-kertoja-20261011/ajat + yovartio-kertoja-20261013/ajat;
  aja ERILLISEEN tiedostoon ja yhdistä vain muutetut teokset, muuten työkalu laskee kaikki uudelleen): 146 2→4, 670 2→3, 840 1→3, 92 2.
  HUOM: Auto Zoom on oletuksena POIS (MuseoSovitin.AutoZoom) – kysy PT:ltä, kytketäänkö oletukseksi; SK täyttää muut salit samalla työkalulla.
- 50ea40b6e KOHTA 3 KESKEN (kytkin MuseoKierros.KavelyV2 = false, QA `museo kavely2 0|1`): MuseoKierros.KavelyV2.cs – 0,9 m/s, keinunta
  1,2 cm + huojunta 0,6 cm askeltahdissa 0,7 s, katse kohteeseen 35–85 % matkasta + vilkaisu lähimpään tauluun ≤ 3,2 m, pysähdys silmän
  korkeudelta katse taulun keskelle, zoom liukuu kohtisuoraan (SilmaPaino); askeleet kierroksen kävelyyn (MuseoSovitin.Osoitus.cs
  KierrosKavelyt → MuseoAskeleet.Alku). unity 0, mutta Linssit-testejä EI ajettu V2:n jälkeen eikä V2-testiä ole (luonnos: salissa koko matkan,
  |Y−SilmaY| ≤ 1,1 cm, katse teokseen ennen perillä oloa, pysähdys SilmaY + katse keskelle; MuseoOsoitusTestit-apufunktiot).
  TEE: aja testit, lisää V2-testi, sitten Äänittäjän lattia-askeleet (alla), sitten simuvideo (`linssi taidemuseo`, `museo kavely2 1`,
  `museo seuraava` ×2, tauko + ohjain → Kuuntele) → PT:lle; kytkin päälle vasta omistajan videon jälkeen.
- ÄÄNITTÄJÄ 00.5x: aanet/taidemuseo-askeleet-v2/askel-{parketti,marmori}-NN.mp3 (kuiva) ja …-sali-NN.mp3 (salikaiku), NN 01–06, manifest.json
  (lattia → salien lattiat: parketti_* → parketti, kivi_marmori_ruutu → marmori; sora/kivi_hiekka: ei sarjaa). Satunnaisesti, ei samaa kahdesti,
  ~0,8–1 s välein. Sali-versiot vaativat Aalto OK5 -nimeämisrivin (LAHTEET.md / aanilahteet.json). SHA256SUMS 47042c8f54625306…
  Kytke MuseoAskeleet: lattia nykyisen osan materiaalista, yksittäiset näytteet (Soita-polku), V2-kävelyssä askeltahti 0,7 s.

## Muut tässä vuorossa valmiit
- Etsin 94627484b (KÄÄNNETTY 02c913ae0) NS:llä junassa 196; iPhone-kuvat _tyo/pelikoodari/iss-kamera-196/kuvat-iphone-94627484b.png (PT kuittasi).
  SIJAINTI-LCD = aseman alapiste (oikein, PT:lle selitetty). Tarkan kuvan kipinöinti = Valosepän Yokuori-valopisteet (PT välitti Valosepälle).
- Pulu d0164dd0d (KÄÄNNETTY d95e27383) NS:llä junassa 196; kuvat _tyo/pelikoodari/iss-pulu-vastaukset-196/kuvat-ipad-d0164dd0d-hurrikaani.png.
  Siirtosepälle tieto kohokohdat.json-muutoksesta. Cupolan kehys puuttuu vain kehittäjän `raketti kelaa` -komennossa (pelaajan polku ok).
- ISS-ukkoshaku (omistaja 23.12 kohta 1): proto pelikoodari/iss-ukkoset-196 3e4adfe3e yhdistetty Valosepän iss-efektit-196:een (2c8a87a41);
  Valoseppä vie efektien kanssa NS:lle. (6f899a2ad = sama bceff03aa:n päällä, Valoseppä ei ottanut – Simu.Live tarkoituksella.)
- Poistettu 9 masteriin mennyttä proto-worktreetä. Jäljellä poistettavaksi junan 196 jälkeen: -iss-kamera-195, -iss-pulu-vastaukset-196,
  -iss-ukkoset-196, -pulu-chat-aanet-196, -pulu-tekstit-196 (`git -C …/Matkakirja-proto worktree remove <polku>`).

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-luovutus-20261016-yo.md
(haara pelikoodari-luovutus-20261014-paiva). Ensin kohtaaminen-196 59b2068b5: odota JU:n KÄÄNNETTY, aja ajo-kohtaaminen-vaara-196.zsh,
video PT:lle ja sha NS:lle; sitten taidemuseo-196 (kävely V2 testit + Äänittäjän askeleet + video)."
