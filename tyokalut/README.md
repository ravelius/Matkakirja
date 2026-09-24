# Natiivin työkalut

- `siivoa-levy.sh`: levyn siivous (ilman argumenttia listaa, `poista` poistaa ja kirjaa `proto-3d/lokit/siivous.log`).
  Ajastuksen asennus (omistaja, kerran): `cp tyokalut/fi.matkakirja.siivous.plist ~/Library/LaunchAgents/ && launchctl load ~/Library/LaunchAgents/fi.matkakirja.siivous.plist`
  (ajaa `poista` joka yö klo 03.00 käyttäjänä koodaus; poisto: `launchctl unload …` ja plistin poisto).
- `ipad.sh`: iPadin asennus, käynnistys, komennot ja tiedostojen haku (`hae <kansio> <tiedosto…>`).
- `tarkista.sh`, `unity-vahti.sh`, `uss-tarkistus.py`, `simulaattorimerkinta.py`: käännösten tarkistukset.
