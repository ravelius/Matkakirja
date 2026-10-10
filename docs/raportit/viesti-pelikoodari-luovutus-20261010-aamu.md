# Pelikoodarin luovutus 10.10.2026 klo 08.2x (kontekstin nollaus, PT)

Ensimmäinen tehtävä: **jäätymiskoe A/B** (kohta 1), kun Julkaisija antaa SIMULAATTORI NYT (arvio ~09.05). Sen jälkeen Natiivisepän
BUILD-viestin jälkeen omien haarojen rebase 6.7-runkoon + tarkistukset 6.7:llä, sitten oma suositus PT:lle.

## 1. Jäätymiskoe A/B (PT: jäätyminen on äänialuetta = sinun)
- Havainto: Pariisi, kiinteä matala kamera (`linssi opas kamera 48.85355 2.34962 25|30 20|30 180 0`) → appi JÄÄTYY (ei kaatumista:
  ei .ips:ää, ei jetsamia; loki loppuu) ~13–14 s kameran asettamisesta: ajo 2 (06.37.39→52), ajo 3 (07.34.31→45) ja vertailu 174-rungolla
  ilman muutoksiani (07.40.31→45). Ajo 1 ilman kiinteää kameraa 124 m:ssä EI jäätynyt. `aani mittaa` (PeliKomennot.MittaaAani) ja
  `hiljaa`/`aanet` (AudioListener.volume) eivät lukitse; TestiMykistys-rengas lukoton.
- Ajo: 6.3-appi (oma kopio, EI jaettu käännöskopio) `/Users/Shared/Claude/proto-3d/lokit/pelikoodari-pisteet-175/app2/Matkakirja3D.app`
  (a83ce0b10 = d02226c68, Unity 6000.3.24f1), simu pelikoodari-iPad13 39644E75-8BDA-4ED8-98B1-3FC864B73697.
  Skenaariot `proto-3d/tyokalut/pelikoodari-ajot/sk-jaatyminen-a.txt` (kamera, ei pakotuksia, ei mittauksia) ja `-b.txt` (+ kello ja astia).
  Käynnistys irrotettuna: `perl /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/jaatyminen-a.pl` (ja -b.pl; loki lokit/pelikoodari-pisteet-175/jaatyminen-a.log); sisältö: todistusajo.sh
  `--era jaatyminen-a --udid 39644E75-… --app <app2> --sha a83ce0b1 --haara d02226c68 --skenaario <sk> --laite ipad` (cwd proto-git),
  perl fork+setsid, loki talteen. Ilmoita Julkaisijalle "simu vapaa".
- Päätöspuu: A jäätyy → kamera/laatat, ei ääni → rivi PT:lle + Natiivisepälle (koskee TF 174:ää). A ok, B jäätyy → ääni → korjaa itse.
  Molemmat ok → työkaluvika (aani mittaa / aanitaso) → korjaa komento (ei pääsäiettä odottamaan äänisäiettä).
- Aiemmat todistukset: `proto-3d/lokit/todistus-kaupunki-pisteet-175-20261010-{0550,0634,0731}`, vertailu `…-vertailu-20261010-0737`.

## 2. Junaan 175 kuitattu ja Natiivisepällä
- `pelikoodari/kaupunki-pisteet-175` d02226c68 (kahvilan astiat KaupunkiAanetiin maitovaahdottimen rinnalle, 3 pyörän kelloa
  IhmisAanet.PyoranKellot-sarjaan omilla tunnuksilla pisteet-pyoran-kello-0N, kuuntelu `opas kaupunkiaanet astia|pyora`; +0,3 Mt).
  Ajo 3: huippu 0,75 (ei leikkautumaa), astia 34 m 0,06, pyörä 156 m 0,21. Worktree `wt/proto-pelikoodari-pisteet` (poista mergen jälkeen).
- `pelikoodari/pulu-maat-25` c191dd31d (25 maata, sisältö v638) korvaa pulu-automaatin ja pulu-maat-23:n (NS:n luovutus 4416635e3).
  Uusi maa: `python3 -I Peli-testit/pulu-kultaiset.py --kirjoita --haarat --testaa` uudessa haarassa (worktree `wt/proto-pelikoodari-pulu`)
  → SHA Natiivisepälle; rivi PT:lle VAIN jos testi kaatuu.
- Aiemmin (174): muisti-174-ls1 8ac72eada, loppumusiikki-esilataus 1ffa074a1, pulu-valmiit-testi a4826d2fe.

## 3. Valmiit tänä yönä
- Kertoja 176: `seikkailu/olavinlinna/vaihe-esittely-v1/` ämpärissä (07.45), William eleven_v4_turbo, yksi pyyntö, 44 krediittiä;
  esi-saimaa 17,56 s, esi-1323 15,52 s, vaihe-1475 11,84 s, vaihe-nyky 6,36 s; polut Siirtosepälle. Työkalu
  `tyokalut/pelikoodari-ajot/vaihe-esittely-176.py` (atrim ennen adelay; kohdistuksen loppu voi ylittää äänen).
- Ääniportti `proto-3d/tyokalut/aaniportti.py` (sha 7756639ec8b4, POIKKEUKSET: Lyria nopea v1/v2 pysyvä, metsasade v2 määräaikainen)
  pakollinen vie-paketti.sh 4c:ssä. Muutos porttiin = uusi SHA Julkaisijalle.
- v2-pankit ämpärissä: olavinlinna-soundly-v2, ui-linssit-soundly-v2, silmukat-korjaukset-v2, repliikit-lapi-v2 (Siirtoseppä kytki),
  kaupunki-pisteet-v1 (+ pistelista-v2.json, ei käytössä). Puheputket alimiter 0,79. PR #4318 (OSM-rivi) MERGED d6fb75149.

## 4. Pidossa: kuratoitu live (omistaja "kuratoitu myöhemmin", toteutus junan 175 jälkeen)
Luonnos ja PT:n vastaukset: `proto-3d/_tyo/kuratoitu-live-luonnos-20261010.txt` (ikäkysely kerran vain aikuinen kyllä/ei; otsake
x-matkakirja-aikuinen 1|0; 0/puuttuu → kuratoitu live: oma kehote + kysymys- ja vastaussuodatus + seuranta ilman henkilötietoja;
/opas/seuraava alle 18:lle alaikäisprofiililla; merkintä "Vastaukset tuottaa tekoäly (Claude)"; web samoin). Kartoitus: worker
`tools/pollo/worker.js` (tehtava-kenttä, /opas/*), natiivi PuluChat.cs:1547 otsakkeet, ei versiota pyynnöissä, ei ikälogiikkaa.

## 5. Odottaa
- **Freesound**: lataaja (pid 1255, odottaa ~/.freesound-tokenia) aikakatkaisee ~09.4x → käynnistä uudelleen `_tyo/soundly-erat/aja-originaalit.zsh`
  perl setsid -kaavalla, jos OAuth odottaa yhä. Lista sisältää myös metsasade 673955 (v3 originaalista, sitten ääniportin poikkeusrivi pois).
- Siivous mergen jälkeen: `wt/proto-pelikoodari-pisteet`, `wt/proto-pelikoodari-pulu` (`git -C proto-3d/Matkakirja-proto worktree remove`).

## 6. Opit
- Todistusajon `aani` kaappaa vasta askeleen alussa → pakotetut lyhyet äänet ennen sitä eivät tallennu; mittaa `aanitaso` heti pakotuksen jälkeen.
- proto-kaanna.sh lukee haaran jonoon pantaessa → anna SHA, kun kärki muuttuu jonossa.
- Ennen uutta äänijärjestelmää grep koko Linssit/Unity + Ydin (ElavaKaupunki teki jo 3D-pisteet; muisti kaupunkien-3d-aanet-olemassa).
