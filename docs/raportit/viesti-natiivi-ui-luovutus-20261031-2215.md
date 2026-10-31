# Natiivi-UI: luovutus 31.10.2026 klo 22.15 (museoiden metrokartta junaan 216; Notre-Dame v6k29 simussa OK)

Edellinen: viesti-natiivi-ui-luovutus-20261031-2100.md. Syy: viikkokäyttö 90 % (PT, Raamattu 12.21).

## Valmiit tässä vuorossa (proto-3d, peilit natiivi-backup peili/proto/natiivi-ui/*)
- **Museoiden metrokartta kierroksen tapaan** (omistaja 21.07 KK:n kortilla "Kyllä, junaan 216"; PT) natiivi-ui/museo-metro-216
  kärki **fb8391171** (pohja juna-216 ec0554ca8) → **merge-pyyntö NS:lle lähetetty 22.1x**; video KK:lle
  lokit/todistus-museo-metro-216-20261031-2205/kk/museo-metro-216.mp4 (todistus OK).
  - OpasMetrolinja.Kierrostila taidemuseon/taidehallin listalle, `YksinNosto = false` (nimi pysyy nimikyltin kohdalla, muut kutistuvat
    siihen porrastettuna); nosto ylimmästä näkyvästä rivistä; NimiPeitto toimii myös ilman siirtotilaa.
  - Musta siirto: kartta alkaa nimeksi kutistuneena → nimikyltti ja kartan nimi ristiin 0,3 s → laajenee 0,45 s → vasta sitten merkki
    kulkee (MuseoTaulu.Siirto.cs). Teosluettelosta avautuessa laajenee nimestä, ohinapautuksella kutistuu nimeen (MuseoTaulu.Metro.cs).
  - **Napautukset ennallaan (PT 21.2x)**: teoksen nimi ja seinäkyltti avaavat teoskortin; ilman esillä olevaa teosta nimi avaa kartan.
  - fb8391171: suurennuksen päättyminen (Auto Zoom) toi nimikyltin kartan päälle koko siirron ajaksi (vanha vika, näkyi videossa 2155);
    PaivitaOtsikonRajaus ei aseta peittoa siirron tai avauksen aikana.
- **Notre-Dame v6k29** (JU: R2 + uusin-5 21.03) juna 216 ec0554ca8, K1 OK, omat mallit ladattu R2:sta; pari PT:lle ja LAV:lle:
  lokit/todistus-nd-v6k29-juna216-20261031-2124/pari-K1-notre-dame-v6k28-v6k29.png (ero v6k28:aan pieni).
- Suorista 5f5890e66 on KS:n haarassa karttaseppa/piirros-pariisi-216 (merge 4d36c1bb6); KS:n simupari → PT → NS (ei NUI:n työtä).

## KESKEN
- museo-metro-216: odottaa NS:n mergeä junaan 216 ja KK:n/omistajan katsetta videosta. Palautteen tullessa: worktree
  /Users/Shared/Claude/wt/proto-natiivi-ui-halli (haara natiivi-ui/museo-metro-216), skenaario ja ajoskripti
  proto-3d/_tyo/natiivi-ui/museo-metro/ (aja.zsh: käännös L1 ilman simua, sitten todistusajo; sk-museo-metro.txt).
- Avautuminen nimestä toimii vain, kun nimikyltti näkyy (suurennuksessa nimi on piilossa → lista laajenee paikallaan, sulkeutuu heti).

## Opit
- `proto-kaanna.sh` ilman UDID:tä kääntää vain (ei simua): haarakäännös rinnakkain simuvuoron kanssa, todistusajo asentaa --app:lla.
- "jonossa: …" kaannos.out-tiedostossa ei tarkoita, että käännös odottaa: ennen tappamista `pgrep -P <pid>` (minulla xcodebuild jäi
  orvoksi linjalle 2 ja piti tappaa erikseen).
- Museon näyttelyvalinta: ensimmäinen napautus avaa esikatselun, saman rivin toinen siirtyy ("Siirry näyttelyyn" -tekstiä ei ole).
- Videon tarkistus pienenä: `ffmpeg -ss <s> -t 4 -i v.mp4 -vf "fps=4,crop=iw*0.4:ih*0.35:0:0,scale=400:-1,tile=4x4" -frames:v 1 o.png`.
- Liikevahti hylkää Mathf.MoveTowards-edistymisen; `Clamp01(t ± dt / kesto)` + Liikepohja.Kayrat.Pehmea kuten OpasValikko.
