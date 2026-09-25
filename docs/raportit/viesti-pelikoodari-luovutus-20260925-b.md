# Pelikoodarin luovutus 25.9.2026 klo 12.2x (b)

Jatkoa luovutukselle `viesti-pelikoodari-luovutus-20260925.md`. Omistaja pysäytti sessiot tilinvaihtoa varten klo 12.1x.
Merge-pyynnöt ja todennukset ovat tiedostossa `/Users/Shared/Claude/proto-3d/lokit/merge-pyynto-pelikoodari-maisemakompressori.md`
(loppupää: BUILD 13 -liikkuminen, PÄIVITYS 03218b4, TODENNUS 2, pulu-puhe).

## 1. Liikkumisen pariteettikierros (build 13): VALMIS Pelikoodarin osalta
- **pelikoodari/liikkuminen 03218b4 on junassa** (Natiiviseppä, juna/b13 cfdc127 →). Mukana D17 8e8862c (kaupunkikortti
  vasta 420 ms:n Panoroi-ajon jälkeen, varakutsu) ja b089ece (ei "Saavuit"-ilmoitusta pelinäkymässä, web ei näytä sitä).
- **Lista** `docs/raportit/liikkuminen-pariteetti-20260925.md` (luku 0 = todennustila). Pelikoodarilla ei ole avoimia
  rivejä: B21 korjattu (fb0a30e), D14 kuuluu B25-poikkeamaan, D12 on koodista SAMA (webin `saatto` on lippu, joten paluuajo
  1400 ms tehdään aina kaupunkiin päättyvällä maamatkalla).
- **Todennettu simulaattorissa** (iPhone A2FD9C9F; videot, arkit, konsolit ja ajat kansiossa
  `proto-3d/lokit/liikkuminen-pariteetti/{c535aea,cf195a1}/`):
  - 55 automaattiheitto OK: siemen 1, noppa 3, reitin varsi, `automaattiheitto reitin varrelta`, alle 1 s.
  - 56 kohdesovitus OK.
  - 57/60 reitit OK: liuska [3], kantama [1], siirto lähtöpaikasta [3], saapuessa [].
  - 53 vaiennus OK: heitto vie luentakortin ja Ohita-napin.
  - 58 Maailma-hyppy OK: `napauta lontoo` → maailmahyppy → traileri.
  - 59 OK cf195a1:ssä (Natiivi-UI a91cbfd): trailerin jälkeen Kartta, lehti kiinni.
  - Koreografia OK: askel 860 ms, tauko 190 ms, ennakkozoomi noin 850 ms.
  - Videopari web | natiivi: `liikkuminen-pariteetti/videopari-j3-j4-web-vasen-natiivi-oikea-iphone.mp4`.
- **54** (kuplat ja välirauha, C12/C13) ja **66** (pulun eleet chatissa) ovat Natiivi-UI:n rivejä, eikä tämä sessio todentanut niitä.
- **Muille:**
  - Natiiviseppä korjasi Sofian tuplanimen (natiiviseppa/sofia-kerran d34ba1f).
  - Natiivi-UI:lle on yhä auki, että Maailma-hypyssä Ateenan luentokortin kuva jää Lontoon trailerin viimeiseksi kuvaksi
    (`c535aea/j5-arkki.png`, kehys 11).
- **KESKEN:** löydöksen 61 ja D17:n todennus iPad11:llä (C1D5E34C, juna d76c9669 asennettu klo 11.23). Skripti on
  scratchpadissa, joten tee se uudelleen näin: `uusi-peli 12345 ateena`, odota noin 25 s, sitten `napauta thessaloniki`.
  Tallenna video ja tarkista, että kamera panoroi ensin ja kortti aukeaa vasta sen jälkeen, merkki x = w/4. Pyydä ensin
  vuoro Julkaisijalta.

## 2. Löydökset 66 ja 67
- **67 VALMIS:** #3139 on mainissa. Juurisyy oli, että Sonnet 5 ajattelee oletuksena ja ajattelu söi `max_tokens`-rajan.
  Korjaus: `ajatteluKentat(malli)` ja `katkaiseKokonaiseen` (tools/pollo). Varmista tuotannossa, että sama Schliemann-kysymys
  (`proto-3d/lokit/loydos66-67/sse-schliemann.txt`) tuottaa ensimmäisen palan selvästi alle 10 s:ssa ja ehjän lopun.
- **66:** Pelikoodarin osa on **pelikoodari/pulu-puhe b3e0b67** (pohja juna/b13 044a2fe): pollo-persoonan luku näytetään
  pululle puheena (Aanet.PuluPuhuu, ei KertojaPuhuu, nokka liikkuu). Merge-pyyntö on kirjattu. Haara mergeytyy puhtaasti
  juna/b13 cfdc127:ään, mutta se EI OLE JUNASSA. Todennus tehdään Natiivi-UI:n 66-erän kanssa (Pulu.cs/PuluChat.cs:
  chatOpen/Close, dashOut-dashBack-dustOff-bookStudy, mietintäeleet, pulun koko chatissa;
  `proto-3d/lokit/loydos66-67/pulu-chat-animaatio.md`).

## 3. Web
- #3139 (67) ja #3140 (70, Maakunnat-välilehden oletusmaa, savuke `savuke-maakunnat-oletusmaa.mjs` 4/4) ovat mainissa.
  #3140:n punainen liikevara-savuke oli infrasta: Playwrightin JSON.parse-virhe käynnistyksessä, paikallisesti 10/10.
- Worktreet `pelikoodari-pollo-katkeaa` ja `pelikoodari-maakunnat-oletus` on poistettu.

## 4. Pariteettiajon työkalu (haara origin/pelikoodari-pariteetti-ajo 4f5d1d6e9, worktree wt/pelikoodari-liiku-luenta)
- `PARITEETTI_IPHONE_UDID` (toisen roolin oma simulaattori) ja `PARITEETTI_SIMULAATTOREITA` (oletus 2, muistisääntö).
  Ryhmän jälkeen `simctl shutdown`, ja ajon lopuksi `siivoa-pariteettisimut.sh --aja` sekä sammutus.
- `tuomio(…, { sallitutPoikkeamat })`: iPhonen yläpalkin raha (/^\d+$/) ja päivä (keskipiste ≤ 64 px) ovat hyväksytty
  poikkeama (Raamattu NATIIVIN iPHONE-ASETTELU).
- Linssisepän korjaukset:
  - Rivi 13: `esitys alusta` ennen `esitys kaynnista`.
  - Rivit 12: `ui linssi selite auki`.
  - NATIIVI_SIIVOUS alkaa `ui linssi selite kiinni`.
  - Webin topografia odottaa, että `topografia-peite` on purettu (rivi 30).
  - Rivi 12b on poistettu (keksinnöillä ei ole webissä selitettä).
- Testit `tests/pariteetti-vertailu.test.mjs` 22/22. Haara ei ole PR:ssä, se on työkaluhaara.

## 5. Linjaukset ja opit (muistissa)
- **Muistisääntö** (Fable 25.9.): päivällä enintään kaksi simulaattoria, ei samaan aikaan Julkaisijan savukkeiden kanssa
  (vuoro sovitaan Julkaisijan kanssa), ja sammutus ajon jälkeen.
- **juna-ajo.sh** (fi.matkakirja.juna-vahti) asentaa jokaisen junan pariteetti-iPad11:een ja -vaakaan ja jättää ne päälle.
  Tästä on ilmoitettu Fablelle (ehdotus: sammutus asennuksen jälkeen tai simulaattorit pois SIMS-listalta).
- Simulaattorin kuvausopit: muisti `pelikoodari-tila-20260925-aamu2.md`.
  - Käynnistys: `simctl launch --console-pty`.
  - Liuska: `ui liiku` ennen `kulkutapa`.
  - Siemenet: 12345 → 4, 1 → 3, 6 → 6.
  - Kehittäjäliput: `defaults write`, sovellus kiinni.
- Varoitus: `git commit -a` roolikansiossa ottaa mukaan paikallisen `.claude/settings.local.json`:n. Lisää tiedostot nimeltä.
  Tämä sattui kerran (ed5e0ec96), ja muutos on peruttu.
