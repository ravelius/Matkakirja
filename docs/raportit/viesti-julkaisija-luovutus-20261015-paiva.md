# Julkaisijan luovutus 15.10.2026 klo 11.5x (TILINVAIHTO, omistaja 11.53)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150). Edellinen luovutus `viesti-julkaisija-luovutus-20261014-ilta.md`.

## 0. UUDET SÄÄNNÖT JA OPIT TÄNÄÄN

- **Ulkoisten nopeutus (omistaja 15.10. 00.01, PT kuittasi):** #4602 mergetty (`--vain-arvio`). Junasta 192 alkaen NS mergeää
  muutosloki-PR:n LUKITUKSESSA ennen käännöstä (M lähetetään heti), joten sisältövienti pyörii käännöksen rinnalla. `tf-ketju-pohja.sh`
  pyytää beta-arvion heti sisäisen jälkeen (`vain_arvio=true`) ja grep hyväksyy sekä vanhan (`Beta-arvio: …`) että uuden
  (`ARVIO JO/LÄHETETTY <tila>`) lokimuodon; alussa VIENTI-TILA-rivi. Varmuuskopio `tf-ketju-pohja.sh.ennen-vain-arvio-20261014`.
- **Valoseppä ja vahti käyttävät SAMAA iPad-simua A26BC7D0** → ei koskaan SIMU NYT molemmille yhtä aikaa (01.37 törmäys → vahdin VIKA).
  Muistio `valoseppa-ja-vahti-sama-simu`. Valosepän ketjuille tein apuskriptin (scratchpad `vahdin-jalkeen.zsh <vahdin ajon nimi>
  <lippupolku> <kuvaus>`), joka luo Valosepän simu-nyt-lipun heti vahdin SIMU VAPAA -rivistä; uudelleen kirjoitettava uudessa sessiossa.
- **Hidas viesti ≠ vapaa linja:** PK/NUI/LS1 saavat viestin jonossa → linja voi seistä vapaana. Tarkista lukko
  `/tmp/matkakirja-kaannospalvelu{,-2}.lukko/kuka` ennen kuin annat linjan muualle.
- **Monitorit:** `tail -F | grep` jätti TF 191:n SISÄINEN-rivin ilmoittamatta → käytä pollaavaa Monitoria (wc -l -vertailu).
  HUOM: `pgrep -f tf192.sh` osuu myös Monitorin omaan komentoriviin, joten "KETJU PÄÄTTYI" ei laukea — tarkista ketju käsin.
- **Levy:** 15.10. 00.5x levy 34 Gt → siivouspyyntö 7 roolille (PT:n luvalla) → 68 Gt. Tavoite > 60 Gt ennen junia.
- **Kirjoitusääni (iss-skanneri-kirjain.wav):** PT:n poikkeus peruttiin (KK: valittu ääni junaan 193 uudella nimellä). EI ylikirjoitettu.
  Huom: CDN palauttaa `cf-cache-status: DYNAMIC` (ei välimuistia), mutta otsake on `immutable, max-age=1 v` → laitteet pitävät
  vanhan; uusi ääni aina uudella nimellä.
- **Sisäiset näkevät buildin heti Applen käsittelyn jälkeen** (hasAccessToAllBuilds) → kaikki "ennen sisäistä jakelua" -portit pitää
  hoitaa ennen TF-latauksen valmistumista.

## 1. Juna 191 – VALMIS 5/5 (00.19)

iOS 38625842203 ✓ 22.50 → sisäinen 38627041309 ✓ 22.55 → vienti 38626058387 (0cbf8b688) ✓ 23.45 → ulkoinen 38634774149 ✓ 23.52 →
beta-arvio HYVÄKSYTTY 00.18 → vanhennus 38639236439 ✓ 00.19 (190 iOS + Mac pois). Tuplaketju (tf191.sh kahdesti) pysäytetty 22.5x;
#4602-merge vaati tf191b.sh-korvaajan (uusi lokimuoto). Vanha tf190.sh-kopio jumissa 11 h → pysäytetty 08.2x.

## 2. Juna 192 – KÄYNNISSÄ (OMISTAJA PYYSI JULKAISUA 01.11, "ei testejä junaan" 09.36)

Web #4607 (8 pysäkkiä) MERGETTY 3772cbeda 10.5x. Muutosloki #4610 M = e2040cf78bb8f1c9334f9a794394b332c0ce430e (mergetty ennen
lukitusta — uusi järjestys toimi). Runko 2ba2606bf → BUILD 192 = 117c2ae5b5307bb301182575b76cca38708cada0 (NS 10.42).
muistiajo-192.txt = OHITETTU (omistaja 09.36; viite: välikooste 12a9351f5 EI-MUISTILISAYSTA).
TF iOS 38700546595 ✓ 10.49 → **sisäinen 38701325104 ✓ 10.54** (rivi PT + KK lähetetty) → vain_arvio 10.54 (WAITING_FOR_REVIEW)
→ vienti 38699822650 ✓ 11.50 → ulkoinen-liitos käynnissä (ajo 38708540125) → beta-arvio 15 min välein → vanhennus 191.
Mac 1.1 (192) TF ✓ (NS, 38700692256). Ketju `tf192.sh` pid 24773 → `tf192-ketju.log`. Asemataulu v35: 5/5, "ulkoisille beta-arvion jälkeen".
**Seuraavalle:** seuraa tf192-ketju.log; BETA-ARVIO HYVÄKSYTTY → rivi PT:lle "TF 192 ulkoisilla klo HH.MM" + Asemataulu; VANHENNUS.

## 3. Asemataulu – Boost-nappi JULKAISTU (versio 4, 11.5x)

Nappi otsikkorivillä (.paivita-pohja) kirjoittaa `talo/boost {paalla, alkoi}`; palkit, mittarit ja kulutus näkyvät vain Boostin aikana;
sammuu itsestään 60 min (sivu kirjaa vanhentuneen paalla:false); viikkorivi selkokielellä. Lähde tallennettu:
`/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/asemataulu-julkaisu.html` (uuden tilin taulukopio rakennetaan siitä).

## 4. Linjat, simut, jono 11.55

Linjat 0/2, simut: vahti `vesi-v24-194` 5e699a463 ajossa (A26BC7D0). Jonot tyhjät. Valovahti EI tauolla.
Valoseppä: kuu-tele-194 ja vesi-v24-194 siirretty NS:lle (juna 193), Eiffel lopetettu (omistaja 23.59). NUI:n testi-192*-kierrokset
valmiit (192w viimeisin), LS1:n museo/Ranska/Andøya-ajot valmiit.

## 5. Viennit 15.10.

vesi-indeksi-v24-vienti-20261015 (KS; index-v24 + praha5-8m): 3 viety, 0 virhettä (09.00).
