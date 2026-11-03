# Julkaisija: luovutus 3.11.2026 klo 13.15 (Macin kello) – konteksti 25 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261103-0720.md (+ LISÄYS 09.55).

## Käynnissä luovutushetkellä (linjat ja vuorot)
- **L1: NUI** kääntää pienen iPadin yhdistelmää **c660bbc50** (KÄÄNNÖS NYT 13.14) → simu → PT. VAPAA tulee NUI:lta.
- **L2: NS** simu c660bbc50 (paluu Pariisiin + kylmä Lontoo), KÄÄNNÖS NYT 13.15 → VALMIS NS:ltä.
- **Iso iPad: VS** k5 ed5dbfe9e -mittaus (ipad-lukko, alkoi ~13.11, palautus 1420265d7) → "iPad valmis" VS:ltä.
- **Jono:** 1) KS (local_740947d7) Pariisi + Big Ben -kuvat yhdistelmästä (c660bbc50 tai uudempi), 2) LAV editoripari, kun PK on kytkenyt
  osasarja-v11 + rakennukset-v119 + c2-v35. Ensimmäinen vapaa linja.
- **Odottaa viennille:** LAV osasarja-v11 -paketti (esto = esto-v38 tarkistettu 13.15). Tarkista ensin, ettei kielletty-osasarja-v11 ole
  ämpärissä (luettelo + curl 404) – v7:llä oli 13.11 nimitörmäys (vanha v7 ämpärissä, ei JU:n lokissa).

## Ison iPadin runko = 1420265d7 (PT 12.1x)
- Juna-218 runko 1420265d7 (NS lähtö/tulo) asennettu 12.16 PT:n ASENNA OK:lla. App: proto-3d/lokit/julkaisija-laite-218-1420265d7/Matkakirja3D.app
  = **palautusrunko kaikille rooleille** (ei enää 8d18d7047). Iso iPad vapaa roolien käyttöön (PT 11.1x), lopuksi aina 1420265d7 takaisin.
- Pieni iPad: 8d18d7047 (asennettu 10.11). **EI asennuksia** ennen PT:n lupaa (omistaja 10.38: yksi asennus, kun kaikki valmiina + KK katsonut).

## Pienen iPadin yhdistelmä (JU:n worktree /Users/Shared/Claude/wt/julkaisija-yhdistelma-218, T7-repo, commitit näkyvät linja2-kopiossa)
- **c660bbc50** = 1420265d7 + KS bigben-lahi-218 7eebf233c (Big Ben, Pariisi v5, sillat, kyltit) + NUI saapumiskuvat-nousu-218 54897ab16
  (+ terava-kytkenta c3f3e8ec8) + NS lahto-tulo-218 8e855c8d9 (883d4931e + z17). Kaikki mergeet ristiriidatta; testejä ei ajettu erikseen
  (proto-kaanna.sh ajaa tarkista.sh).
- **Puuttuu (PT 13.15):** NUI:n saapumisnäkymän rajaus kohteiden mukaan → `git -C <wt> fetch natiivi-backup <peili>` + `merge --no-edit <sha>`,
  uusi SHA NUI:lle/NS:lle/PT:lle. Pieni iPad sen jälkeen vasta PT:n luvalla: laite-sha.sh <sha> + devicectl pieni (00008142-0019686E02F3801C),
  malli julkaisija-tyokalut/laite-218-8d18d7047-pieni.zsh ja laite-218-1420265d7.zsh (ASENNA=1). Release (MATKAKIRJA_KEHITYS=0) → ei Development
  Consolea (KK havainto 7, PT 10.5x); tarkista boot.config ennen asennusta.

## Tehty 09.55 jälkeen
- L1 PK: 218z taso1b uusinta, 218aa koko sarja, 218ab (ty+xf, katkaistu PK:n pyynnöstä), 218ac koko sarja (valmis 13.11). taso1b-rivillä aina
  "VIKA kuvia ei syntynyt (exit 0)" mutta mp4 ~97 s on olemassa – PK:lle kerrottu. PT kuittasi 218ac (sivusuoja junaan).
- Viety: LAV tausta-v115, osasarja-v8 (v7 hylätty nimitörmäyksellä), -v9, -v10, rakennukset-v119, c2-v35; KS pariisi-tasot-isoisa-20261103 (45).
- 8d18d7047 pieneen iPadiin 10.11; 1420265d7 isoon iPadiin 12.16.
- NUI d7f906462 -laitekäännös peruttu jonosta (PT 10.5x) ennen käännöstä.

## OPIT
- Ketjun katkaisu kesken: odota "<koodi> valmis" -rivi lokista, tapa kääre + ketju, sitten aja-sk-puu (Unity mukana); orpo L1-lukko pois vain jos
  kuka = sama ajo ja pid kuollut (julkaisija-tyokalut/l1-218ab-katkaisu-ja-218ac.zsh).
- vie-paketti.sh "oli jo N" koko paketille = epäile nimitörmäystä: vertaa julkisen URL:n SHA paikalliseen, ei viedä → versio ylös.
- proto-kaanna.sh "VIKA levy < 25 Gt" voi johtua hetkellisestä swapista; df uudelleen ennen siivousta.
