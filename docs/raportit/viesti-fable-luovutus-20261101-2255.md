# PT:n luovutus 1.11.2026 klo 22.55

Edellinen: viesti-fable-luovutus-20261101-1909.md (säännöt voimassa). Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Viestit send_message id:llä (SendMessage-raja täyttyy ~10 viestissä → varakanava mcp__ccd_session_mgmt__send_message).
Syy: konteksti 26 %. `date` ennen aikaleimoja.

## OMISTAJAN PÄÄTÖKSET 19.09 JÄLKEEN (loki PR 5893, 5897, 5906)
- 20.31 piirros vain suorana ja pohjoiseen, muuten striimi + Suorista. PT:n TOTEUTUSTULKINTA: "suora" = Suorista-tila
  31,8° + pohjoinen (EI 0°): laatat on venytetty 31,8°:n katselua varten. Vääntymän syy oli kameran 50° kuvakulma →
  piirroksen näkyessä kuvakulma 9° (NUI). KK:lle kerrottu; omistaja hyväksyi kuvat.
- 21.1x piirroksen siniset/vihreät hillitymmiksi striimin sävyihin → KS G-tasot-66-hill.
- 21.18 PIIRTO-OHJE seuraaville kaupungeille: Codex piirtää vain tarkimman tason (keskusta/nähtävyydet) ja välitason (muu),
  muut tasot pienentämällä + pehmennys. Pariisiin sovellettu jo (KS:n MUISTIO 21.22).
- 21.35 "Hyvä" → TF 216 julkaistu 22.08 kaikille (iOS + Mac, 215 vanhennettu).
- 22.4x "Valo näyttää hyvälle" → juoksun valo hyväksytty nykyisellään (juna 217). Varjojen sävy = havainteen
  sinivioletti h 250–280° (korvaa PT:n 25.10. lämpimät varjot). VS ei muuta valon yleislinjaa ilman PT:n kuittausta.
- 22.46 "Näytä video alusta ja juoksusta ensin" → TF 217 odottaa omistajan katselua.

## JUNA 217 (runko 6ba27bf5b = b1909a35b + VS ilmakivi 096f5fd11 + varjosävy 1fe307e5a + rappaus feba388b9; testit 2223/787/585)
- LUKITTU omistajan videoon: PK (local_91a1bc27) tekee reaaliaikatallenteen 6ba27bf5b:stä (alku kujan perältä ovesta,
  keisari + eunukki; juoksu maaliin) → polku KK:lle + PT. TF 217 vasta omistajan pyynnöstä videon jälkeen.
- Kun lukitus aukeaa, ilmoita VS:lle ja LAV:lle, että kuittauspyynnöt NS:lle saa taas lähettää.
AVOIN, ei kiire (seuraavaan runkoon):
1. LAV (nollattu 288a979f6): 05 kujaportti avoimeksi. PT EI kuitannut ensimmäistä versiota (umpilaatta räystäiden yli).
   Vaatimus: katteet aukon reunaan, ohut palkki räystäslinjaan, ovet havainteen suhteessa. Uusi pari PT:lle.
   Lisäksi 07 ilmakuvan kirkkaanvihreä nurmi havainteen sävyyn.
2. VS: 07 taivas/kamerakulma -koe (k0–k3 havainnetta vasten), koonti KK + PT.

## MUUT
- KS ja NUI: jono tyhjä. Pariisi valmis (laatat ämpärissä versiokansiossa pariisi/hill-20261101/; runko lukee sieltä).
  "Metroasema" (Abbesses'n Guimard-metro) jää nimeksi. Muut kaupungit vasta omistajan aloituksella (piirto-ohje 21.18).
- Levy 72 Gi 22.54 (−15 Gi/1,5 h = käännökset + fablen git-pakkaus); Postivahti ilmoittaa alle 60 Gi.
- Postilaatikon monitori: scratchpad-skripti postilaatikko-vahti.sh (päivittää refs/remotes/origin/claude/postilaatikko,
  ei FETCH_HEAD); 30 min Monitor, viritä uudelleen. Codex-odottaa: mittapiirrokset 30.10. lisätty kuitatut.txt:hen.
- Asemataulu: Juna 216 Valmiina (22.08), Juna 217 Työn alla (runko 6ba27bf5b, video tekeillä).
- uusi-worktree.sh --poista ei toimi proto-worktreille (osoittaa fableen) → git -C <proto-repo> worktree remove; korjaus myöhemmin.

## Säännöt, jotka opin
- Tarkista toteutustulkinta omistajan sanasta ("suora") ennen tilausta: kysy roolilta, mitä nykyinen nappi/tila tekee.
- Rooli voi nollautua ennen kuittaustasi: lähetä kuittaus myös uudelle sessiolle, kun Postivahti ilmoittaa nollauksen.
- Laattojen vienti samoilla nimillä ei päivity laitteelle → versiokansio + versio välimuistinimessä (NS b1909a35b).
