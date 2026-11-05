# Natiivi-UI: luovutus 5.11.2026 klo 15.10 (konteksti 31 %)

Korvaa -1450:n. Työhaara: `natiivi-ui/kyltit-219`, kärki f3f259ad4, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (vie uudet commitit samoin). Pohja: KS:n karttaseppa/nahtavyydet-219 8d0cf457e + NS:n 3 poimittua committia.
Sääntö 2.214: näkyvä Pariisin askel → Macin kuva (polku + yksi rivi) KK:lle local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, kopio PT:lle. Ei selitekaistaa, ei iPadia, Mac-ajot JU:n vuorolla. Tunnettua vikaa ei leikata kuvasta.

## Ensin
1. Kuittaa JU:lle (local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd) "NUI valmis". Kyltti-ajo f3f259ad4 on JU:n jonossa (NS notredame85:n ja PK:n jälkeen, vuorotellen juoksupelin kanssa).
2. JU:n viestillä ESIKATSELU NYT: `PROTO_LINJA=<linja> zsh /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/kyltit-219/aja.zsh` (ajaa haaran kärjen, skenaario sk-kyltit samassa kansiossa). Kuittaa alku, rivi valmiista. Koodia EI OLE VIELÄ KÄÄNNETTY: kaikki kolme työtä ovat ajamatta.
3. Kääntäjän mahdolliset kohdat: `Nahtavyysalue.Kylttikohde` (julkinen sisäluokka, yksityiset kentät, julkinen konstruktori indekseillä), `MalliKyltit.cs` (uusi), `Nimikerros.cs`:n oman nimen poisto.

## Työt ja omistajan sanat (katso kuvat näitä vasten)
**1) Kyltit 3D-kohteille (14.44):** "Notre-Dame, Sainte-Chapelle, Louvre, sarja 24:n kahdeksan: sama vaalea kyltti kuin 2.212:ssa, samalla zoomtasolla; sinun pohjasi." PT: kyltti korvaa kursiivisen oman nimen. Toteutus: `UI/MalliKyltit.cs` + `Nahtavyysalue.Kylttikohteet` (datasta: jokainen Malli, jolla on Nimi; sarja 24 tulee mukaan itsestään). Kyltti on jalanjäljen alla tai sivuilla, törmäävä häipyy, kyltti korvaa myös saman kohteen noston (qid tai nimi). Napautus: `NostotKartalla.TietoNapautus` → nosto tai tietokortti. Oma nimi (OmaNimenPaikka, r.oma, OmaJono, "nimet oma") on poistettu. KS tietää.
- Katso: kuvat kyltti-1 … kyltti-6. Mac-kuva Notre-Damesta, Sainte-Chapellesta ja Louvresta KK:lle. Avoin riski: portilla z10,4 kyltti näkyy ennen mallia (z13–14), ja nosto kuvakkeineen on korvattu; arvioi kuvasta, näyttääkö tyhjältä. Tietokortin luokka "elava-kohde" on arvaus (`NostotKartalla`); tarkista Sainte-Chapellen napautus.

**2) Kadonneiden ★-kyltti (14.57, PT:n välitys):** "kadonneiden aarteiden leikatun kuvan viereen oma kyltti, josta pelaaja tunnistaa sen heti kadonneeksi: sama muoto kuin vaalea nähtävyyskyltti, mutta tähti ja eri taustaväri. Kohteet: Temple-torni, Grand Châtelet, Tuileries, Galerie des Machines, Bastilji; ★-kyltti myös Orsaylle, Palais de l'Industrielle, Trocadérolle ja Les Hallesille (vain kyltti)." KK vie omistajalle kortilla; kursiivinimi korvataan kuten nähtävyyksillä.
- Toteutus: `Kohdenostot.KadonnutKyltti` (Ratkaisu leike tai kyltti, KS:n ohje: Kadonnut ei tunnista Bastiljia eikä Tuileries'ta), `VainKyltti`, USS `.mk-nosto-merkki__nimio--ihme`: tumma pohja olemassa olevista tokeneista (--tk-kuulto-bg-85, --tk-tumma-muste, --tk-tumma-reunus). Väri on NUI:n valinta. Hyväksynnän jälkeen variantti tyylikirjaan (4.1).
- Katso: kyltti-7 (omistajan kulma), -8, -9. aja4:ssä (d5850ff4e, ei tässä haarassa) Orsay ja Tuileries olivat päällekkäin ja osa tähdistä ilman nimeä: tarkista, että viat ovat poissa. Kuva KK:lle, kopio PT:lle.

**3) Nimet häipyvät horisontissa (14.44):** "samaan tahtiin kuin kartta: nimi ei koskaan näy tyhjän tai taivaan päällä". Omistaja 14.55: kallistus 85° (ei 90°), horisontti lähelle, matalalta vain lähimmät kohteet. NS a88c8f846 antaa `Horisonttiusva.RuutuAlkuM/RuutuLoppuM`; arvo voi muuttua, ei kiinnitetä lukua.
- Toteutus f3f259ad4: `Horisonttiusva.SyvyysPeitto`, `PalloKierto.UsvaPeitto`; käytössä Nimikerros, KaupunkiMerkit, KaupunkiPallot, NostotKartalla, MalliKyltit. Kartta-testit PariisiKallistus 10/10. Oletus: maailmayksikkö = m (NS:lle kerrottu).
- Vertaa omistajan kuvaan /Users/Shared/Claude/Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261105/pieni-ipad-pienet-3d-kohteet-1452.png (PT: nimet näkyvät häivässä). Kuvat hor-1 … hor-3 ja kyltti-7 (kulma suunnilleen sama). Mac-kuva samalta kulmalta KK:lle, kopio PT:lle. Jos NS vaihtaa sha:n, poimi se.

## Tehty
- aja4 d5850ff4e (lokit/esikatselu-20261105-150014, exit 0): huiput poissa a14:ssä ja b11:ssä, kamera jää Pariisiin (b12, c01–c03), reunan kirkkaus 180,7–192,1, ei tummennusta. a14.png ja liike-sarja.png viety KK:lle ja PT:lle. Lokin ainoa poikkeus on Unity-editorin hakuindeksi, ei pelin.
- Vanha haara natiivi-ui/pariisi-lento-219 (d5850ff4e): huippusuodatus PariisinAlueella ei ole kylttihaarassa; KS:n pohja on eri. Yhdistämisestä päättää PT, kun Pariisi kootaan.

## Huomiot
- Älä yhdistä KS:n ja lento-haaraa suoraan (52 committia, ristiriita Laattapalvelin.Elava.cs:ssä). NS:n poiminnassa PalloKierto.cs:stä jätettiin `|| Kiertaa` pois, koska KS:n pohjassa sitä ei ole: kun lento-haara yhdistyy, ehto palautetaan.
- zsh: `"${K}:polku"`, ei `$K:polku`; rg:n olematon glob kaataa koko komennon.
- PT:lle ei ole vielä lähetetty rivejä f3f259ad4:stä; rivi kuvien kanssa.

## Lisäys, KK 15.09 (a14, ei vielä korjattu)
Päällekkäiset nimet: Metroasema ja Sacré-Cœur, Palais de Tokyo ja Trocadéron palatsi, Place de la République ja Temple-torni, Sorbonne ja Liiku-teksti, Orsay ja Tuileries. Tarkista kyltit-ajon kuvista: kiinteät kyltit eivät väistä, joten korjaus lienee nimien väistö kylttien tieltä ja Liiku-tekstin paikka. Rivi tuloksesta KK:lle. Hyatt: KS:n suodatin d4929e087 on jo kylttihaarassa (KK:lle kerrottu); tarkista kuvasta.
