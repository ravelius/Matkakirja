# Julkaisija: luovutus 3.11.2026 klo 19.25 (Macin kello) – konteksti 25 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261103-1735.md (d86c923d9).
Jonoloki: julkaisija-tyokalut/jono-20261103-ilta.txt (viimeiset rivit = nykytila). Vahdit: valoseppa-vahti (pid /tmp/matkakirja-valovahti.pid, taukolippu).

## !!! OPPI 18.50 (oma vahinko) – lue ensin
Tapoin vahingossa kaikki koodaus-käyttäjän launchd-lapset (Finder, Dock, Simulator, kaikkien roolien nohup-ketjut): puu()-tapon juuri oli
`ps -o ppid=` = 1. TAPPO VAIN OMILLA TALLENNETUILLA PID:ILLÄ (uudet ketjut kirjoittavat <nimi>.pid). Ei pgrep -P / ppid / pkill -f / -u.
Muisti: puu-kill-ei-koskaan-pid-1.md; raportti julkaisija-tyokalut/VAHINKO-20261103-1850.md; PT:lle ehdotettu Raamattu-rivi.

## Käynnissä (nohup, jatkuvat nollauksen yli)
- L1: PK palvelijat (pk-palvelijat-l1.zsh, pid-tiedosto; ae49d44de, aja.zsh 1, ~20 min, alkoi 19.16; loki proto-3d/lokit/julkaisija-pk-palvelijat-20261103.log)
  → kun "palvelijat VALMIS": rivi PK:lle (local_d3bb1f78), PK tekee kuvaparin PT:lle.
- Sen jälkeen automaattisesti paketti-ketju-7ac89ff33.zsh (pid-tiedosto): laite 7ac89ff33 L1 → keisari-kuva-iso2.zsh (ui suora pariisi-lahizoom,
  veneet- ja pallokuvat, `muistikoe karttaui porras`, ui tarina viimeinen-keisari → keisari-nosto-3s/10s.png; käynnistyksen uusinta 3×)
  → muistivahtiajo (mittaa.zsh iso 7ac89ff33-1 + muistivahti.zsh) → 693cf437f takaisin. Loki paketti-ketju-7ac89ff33.log.
  TULOS PT:lle yhdellä rivillä + polku: muistivahti (ei VIKAa), keisari fp ≤ ~2,8 Gt + 0 MemoryWarning, animaatiot näkyvät (PT 19.3x). Myös NUI:lle.
- L2: ketju-al VALMIS 19.18 → am-alin-jalkeen.zsh → PK am taso1b mp (julkaisija-am-20261103.log) → rivi PK:lle.

## ISO PAKETTI 7ac89ff33 (wt /Users/Shared/Claude/wt/julkaisija-koe-218)
= c5a120c78 + KS 04b14e82d + 7e640edc4 (isoisa4) + NUI kekomittari 453a76a42 (cherry-pick) + PK keisari 8cec09f05 + NUI koontitieto 81499acd6
+ VS vahtikorjaus 99ebdaf89 + PK tekstikorjaus 00686cbef + NUI nimi fd8fd6a76 + PK karkumatka-nimi 3c02f62fe (omistaja 19.02 vahvistettu)
+ NUI animaatiot 6b891fd1d (PT junalupa) + NUI karttaui-porras 200f73222 (keisari-VIKA-korjaus). Latauskuvan otsikko 4cb7815df EI (ristiriita, kulkee PK-linjassa).
Viimeisin todistettu a92302399: lokit/julkaisija-paketti-iso-a92302399-1856 (+ JU-lisays.md: saapuminen ~8,1 s; keisarin nosto → muistivahti VIKA 4146 Mt).

## PK QA-runko ae49d44de (wt /Users/Shared/Claude/wt/julkaisija-pk-218) = 5a8496836 arkihahmot + 3c02f62fe.

## Jonossa / odottaa
- LAV parit 07+06: kun PK on kytkenyt reittikerros.json:n → VUORO NYT ensimmäiselle vapaalle linjalle (LAV local_f12c9179).

## Viety tänään 18.15–19.25
isoisa3 (40), isoisa4 (18 + 22 jo), keisarin havainnekuvat (5), latauskuva-otsikko (2), arkiset-v1 (13), lahipuut-v16 (21).

## Muut OPIT
- `? options:` devicectl-asennuksen lopussa = onnistunut asennus (ei virhe).
- Käynnistys heti asennuksen jälkeen voi antaa CoreDeviceError 10002 → uusinta muutaman sekunnin päästä.
- Merge, joka tuo vieraan linjan (4cb7815df toi 102 committia) → kysy PT; cherry-pick-ristiriita → jätä pois (PT).
- SendMessage-raja 10 → varakanava mcp__ccd_session_mgmt__send_message (CLAUDE.md).
