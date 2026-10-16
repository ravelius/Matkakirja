# Karttasepän luovutus 17.10.2026 klo 00.4x (Postivahti: kova raja 35 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261016-ilta2.md` (fe17c5285).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261017-yo.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

PT jakoi yöllä NUI:n kuormaa Karttasepälle: natiivin proto-gitin haaroja (proto-3d/Matkakirja-proto, worktreet wt/proto-karttaseppa-*).
Käännökset ja simut VAIN Julkaisijan vuorolla (KÄÄNNÖS NYT / SIMU NYT, yöllä 1 simu kerrallaan); ilmoita KÄÄNNETTY ja SIMU VAPAA.
Junaan (Natiiviseppä local_674b9ec4-…) vasta omistajan ok:n jälkeen (PT ilmoittaa); NS tietää, että haarat odottavat.

## 1. AVOIN: pienoismallien maavarjo (omistajan bugi 16.10. 22.18; KK ei hyväksynyt 103105f6d:tä)

- Haara `karttaseppa/vihjeet-198` (wt/proto-karttaseppa-vihjeet-198, natiivi-backupissa), kärki **cbd0ad793** = NUI 21a0e6f6f
  (pienet kuin kuvamerkit, lähennys ≤ 1,45, kiinni kartassa KameranJalkeen + MaxSiirtoKartta 0) + oma varjokorjaus:
  KK: "suorakulmainen laikku kovilla reunoilla" (Bagdad, Teheran). Syy: gaussinen reuna laskettiin ellipsin lyhyemmän akselin
  mittakaavassa → vaakasuunnassa 3,6 × liian pitkä, leikkautui kuvan reunaan. Nyt gaussinen soikio (VihjeVarjo.Pehmeys 0,5,
  Ulottuma 1,6) + reunaikkuna nollaan (Aloitusvihjeet.cs Piirros). tarkista.sh 0 virhettä. EI VIELÄ KÄÄNNETTY.
- Julkaisija kääntää itse kääreellä `/Users/Shared/Claude/julkaisija-tyokalut/karttaseppa-yo-20261017.zsh` (älä jonota itse):
  raketin jälkeen ensin vihjeet-198 → app `proto-3d/_tyo/karttaseppa/vihjeet-198-v2-app`, sitten iss-rajat-197.
- Kun KÄÄNNETTY: pyydä Julkaisijan seuraajalta SIMU NYT F7513985 (~3 min) → aja
  `zsh proto-3d/_tyo/karttaseppa/vihjeet-198/ajo-vihjeet-paikoilla-198.zsh <app-kansio> F7513985-C8BC-4E97-8D29-9C9BD420E962 ipad karttaseppa/vihjeet-198 jalkeen`
  HUOM: skriptissä simuportti: luo ensin `_tyo/karttaseppa/vihjeet-198/simu-nyt-ipad` (on jo olemassa) ja `simu-nyt-iphone`
  (on jo olemassa; jälkeen-ajo odottaa sitä vain jos haara.txt:ssä on "lasi" — poistettu 00.4x, ei odota).
- Lähikuva SAMASTA rajauksesta kuin KK: V1-koko-alue (raaka 1668×2420), x 960–1260, y 1020–1220 (vrt. vanha
  `proto-3d/lokit/todistus-vihjeet-paikoilla-jalkeen-ipad-198-20261017-0019/kuvat/raaka/V1-koko-alue.png`) → SUORAAN KK:lle
  (local_dfa7296a-…) + PT:lle. Tavoite: pehmeä soikio, tummin juurella, ei suoria reunoja missään zoomissa.
- Jos ei ehdi ennen lukitusta (~01.45): pienoismallit vanhalla varjolla tai seuraavaan junaan, EI väliaikaista poikkeamaa (PT).
- Raportti ja videot: `proto-3d/_tyo/karttaseppa/vihjeet-198/RAPORTTI.md`. Koko pallossa Teheran ja Grönlanti piiloon (ei tilaa) —
  kerrottu PT:lle; vihjeet.json ei tarvinnut muutoksia.

## 2. AVOIN: ISS-pienoispallon rajat (omistaja 17.10. 00.12 PT:n kautta)

- Haara `karttaseppa/iss-rajat-197` (wt/proto-karttaseppa-iss-rajat-197, juna-197 e846cd1a6:n päällä), kärki **2d0957ef6**:
  Sijaintipallo.NaytaIssRajat (liikepohjan KatseenKaanto pystyyn päiväntasaajan suunnasta, rajat ±51,6°, läpikuultava ruskea
  verho, paluu pehmeästi, tartunta keskeyttää), varjostimen _IssRaja/_Raja/_Verho, KupoliAanet.JaksoNyt/JaksoAikaNyt/JaksoKerta,
  AstronautinNakyma.IssRajat: v1-lansi ≥ 17,5 s ("Napoihin asema ei yllä", Pelikoodarin sana-ajat) → pallo isoksi + rajat.
  Testi `linssi astro pallo issrajat [s]`. tarkista.sh + liikevahti 0. NUI: ei päällekkäisiä muutoksia (Ohita esittely -nappi tulossa, kertoo ensin).
- Julkaisija kääntää vihjeiden jälkeen → `proto-3d/_tyo/karttaseppa/iss-rajat-197-app`. Sitten SIMU NYT 123B4B25 →
  `zsh proto-3d/_tyo/karttaseppa/iss-rajat-197/ajo-iss-rajat-197.zsh` (skenaario sk-iss-rajat-197.txt: testikomento + kertoja,
  oleta 300 s). Video PT:lle; junaan 197 jos ehtii ja omistaja ok.

## 3. Valmiit tällä vuorolla

| Erä | Toimitus |
|---|---|
| Kiinan dynastiat: aukot (turkit 589, uiguurit+Nanzhao 790, Dali 950/1100/1142, 950:n pääkaupungit) | 718bca80b, #4720 MERGED 1bad6c16b; LS sai SHA:n |
| Saaret (Taiwan 1760/1873) | data oikein, PT perui (LS:n lähikuvat) |
| Lasipohja iPhone-pari 103105f6d | 4 havaintoa → PT antoi korjaukset NUI:lle (uusi pari NUI:lta) |
| Pienoismallit ennen/jälkeen-video 103105f6d | PT:lle; KK hylkäsi varjon → kohta 1 |

## Muistiinpanot

- Karttaseppä EI sammuta eikä boottaa simuja itse; todistusajo.sh sammuttaa omansa. Pitkät ajot setsid-kaavalla.
- Ketjun tappaminen, kun sen lapsi on SIGSTOPissa, tappaa lapsen (orpo prosessiryhmä saa SIGHUPin) → älä tapa; portita tiedostolla.
