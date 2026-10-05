# Natiivin työkalut

- `siivoa-levy.sh`: levyn siivous (ilman argumenttia listaa, `poista` poistaa ja kirjaa `proto-3d/lokit/siivous.log`).
  Ajastuksen asennus (omistaja, kerran): `cp tyokalut/fi.matkakirja.siivous.plist ~/Library/LaunchAgents/ && launchctl load ~/Library/LaunchAgents/fi.matkakirja.siivous.plist`
  (ajaa `poista` joka yö klo 03.00 käyttäjänä koodaus; poisto: `launchctl unload …` ja plistin poisto).
- `ipad.sh`: iPadin asennus, käynnistys, komennot ja tiedostojen haku (`hae <kansio> <tiedosto…>`).
- `todistusajo/todistusajo.sh`: merge-pyynnön todistusajo yhdellä komennolla (Laitetestaajan tarkistuslista 8 kohtaa):
  build-SHA + ancestor, napautuspolku OIKEILLA kosketuksilla, poikkeukset, merkityt stillit + kuva-arkki, äänikaappaus
  (ffprobe, mean/max dB) ja `aani mittaa`, aiemmat palautteet, kuormahuomio, ei-testattu-lista → `proto-3d/lokit/todistus-<erä>-<aika>/TODISTUS.md`.
  Vain Julkaisijan simuvuorolla (`--nyt`, kun vuoro on myönnetty toisen simun ollessa käynnissä). Skenaarion rivit ja esimerkki:
  skriptin otsake ja `todistusajo/esimerkki-nosto.txt`.
- `todistusajo/simkosketus.m`: oikeat sormikosketukset simulaattoriin komentoriviltä (SimulatorKitin IndigoHID, sama reitti kuin
  Simulator.appin hiiri ja idb): `simkosketus <UDID> tap x y [kesto] | veto x1 y1 x2 y2 [kesto] | polku x,y[,dt] … | koko`,
  pisteinä. Käännös `clang -fobjc-arc -framework Foundation -o simkosketus simkosketus.m` (todistusajo kääntää itse).
- `tarkista.sh`, `unity-vahti.sh`, `uss-tarkistus.py`, `simulaattorimerkinta.py`: käännösten tarkistukset.
- `laattapaketti.mjs`: buildin laattapaketti (pallon pohja ja maasto Z0–Z5, vektorit l0–l2, napakalotit, lennon Blue Marble Z0–Z4)
  ämpäristä yhdeksi tiedostoksi `Build/laattapaketti/laattapaketti.bin` (ei gitiin). Sama kuin editorin
  `-executeMethod Matkakirja.Editori.LaattapakettiRakennus.Luo`; `Rakennus.Kaanna` lataa sen tarvittaessa ja kopioi Xcode-projektin
  `Data/Raw/`:iin (`MATKAKIRJA_LAATTAPAKETTI=<polku>` jaettu paketti, `MATKAKIRJA_PAKETTI=0` ohittaa). Tarkistus:
  `LAATTAPAKETTI=<paketti> Kartta-testit/kaanna.sh Laattapaketti`.
