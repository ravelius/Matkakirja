# Natiivi-UI: luovutus 3.11.2026 klo 07.23 (zoomaus + nostot kaikkiin rungossa; uusi tehtävä: saapumisen ilmaisin NS:n toteutukseen)

Edellinen: viesti-natiivi-ui-luovutus-20261103-0115.md (kohdat 1 ja 3 tehty, ks. alla). Syy: kontekstivahti 25 % (pehmeä raja),
uusi tehtävä tuli juuri ennen rajaa eikä sitä aloitettu.

## Tehty 01.15 jälkeen
- **E-kuvien este selvitetty:** testikomento `uusi-peli` kutsuu vain `UusiPeli` → `Kartalle(true)`, ei saapumista (Perilla) eikä
  aloituslentoa → ei zoomausta. Lisäksi oikea Lontoo-lähtö (UusiMatka, `kohde == AloitusKaupunki`) ei lennä → sama puute (osa F).
- **82634eb4b** (natiivi-ui/zoomaus-kaikkiin-218): `PeliOhjain.AloituksenZoomaus` (PeliOhjain.Keskusta.cs), kutsu `UusiPeli`n
  lopussa: maan näkymä (Kartalle) → `Saapumisnakyma.AjoS + YleisnakymaS` → `SaavuKeskustaan`. Peruu: uusi matka, tila ≠ Kartta
  (aloituslento vaihtaa Matkalla), pelaaja pois kaupungista. tarkista.sh 0 virhettä.
- **E-kuvat** (82634eb4b, yhteinen-iPad13): `/Users/Shared/Claude/proto-3d/lokit/nui-e-kuvat-20261103/e3/` (pienet/ = esikatselu).
  Lontoo (uusi peli, korjattu polku), Rooma, Wien, Valletta (aloituslento) – kaikki keskustassa, nostot paikoillaan. PT kuittasi ja
  välitti KK:lle; KK hyväksyi omistajan puolesta 01.50 → **NS mergesi runkoon: natiiviseppa/juna-218 = 9a9515ea3** (testit läpi).
- Asemataulu: tyolista-rivi päivitetty. Junarivit vain `tools/asemataulu/juna.py`:llä (käsin muokattu rivi hylätään; PT kirjaa junat).

## Kuvausopit (simu)
- ui-komento.txt: rivit tarvitsevat `ui `-etuliitteen (`ui aloita rooma lento`); `kuva <nimi>` toimii ilman.
- `ui aloita <kaupunki> lento` = aloituslento Lontoosta mihin tahansa kaupunkiin (osa F:n oikea reitti). `ui aloita lontoo` = ei lentoa.
- "No such process" toistui uuden asennuksen jälkeen: .app talteen, `simctl uninstall` + `install` (ajo5.zsh). Data-kontti vaihtuu →
  Documents haetaan `simctl get_app_container … data`:lla (ajo5/ajo6.zsh). Sisältö latautuu ~55 s.
- Käännös: `PROTO_LINJA=2 proto-kaanna.sh <haara> <UDID>` vain JU:n KÄÄNNÖS NYT -vuorolla; JU voi perua simuvuoron → keskeytä heti.
- Runkomerget (natiiviseppa/juna-218) pyydetään suoraan NS:ltä, ei JU:lta.

## SEURAAJAN JONO
1. **UUSI (PT 07.2x, OMISTAJAN PÄÄTÖS 07.22):** saapuminen = esilataus siirron aikana, vain kohteen lähinäkymä, zoomaus päättyy
   valmiiseen kuvaan, "ei voi kestää 30 sek". Ilmaisinkytkentä `PeliOhjain.SaapumisKarttaOdottaa(k, alkaa)` sovitetaan NS:n uuteen
   toteutukseen: ilmaisin (OLEMASSA OLEVA latausilmaisin, ei uutta UI:ta) näkyy vain poikkeustilanteessa (hidas verkko), ei tavallisella
   matkalla. Sovi ensin NS:n kanssa rajapinta (NS:n haara/SHA, `Laattapalvelin.ValmiiksiKaupunki`; aiempi luonnos haarassa
   natiiviseppa/esilataus-218 2cf83b7c3). Pari/video PT:lle (KK:lle ei suoraan). Käännös ja simu JU:n vuorolla.
2. Video iPadilta (Lontoo, Bratislava, Pariisi; zoomaus, traileri, nostojen esiintulo), kun kohta 1 on rungossa → PT (ja KK PT:n kautta).
3. Veneet joen keskiviivaa pitkin: odottaa KS:n Seinen venereittiä uuden Pariisin koonnin jälkeen (KS:n luovutus 00.25; palat 1–15
   Codexilla). Vaihtuu vain `ReittiLat/Lon` (PiirrosKerros.Animaatiot.cs, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-animaatiot,
   haara natiivi-ui/pariisi-animaatiot-218 743728bd7) + Sillat-rivit/SiltaVersio, sitten kytkin pois → oletus PT:n luvalla.
   Thamesilla ei piirrosta eikä veneitä.
4. Vanha jono: animaatiokuvien ämpärivienti PT:n luvalla JU:n kautta; Codexin uusi vana-otto, jos tulee.
