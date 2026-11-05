# Natiivi-UI: luovutus 5.11.2026 klo 17.04 (konteksti 25 %)

Korvaa -1642:n. Työhaara `natiivi-ui/kyltit-219`, kärki 1c5c26667, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kyltit-219, ei committaamatonta. Peili: natiivi-backup, peili/proto/natiivi-ui/kyltit-219 (sama kärki). KS on palannut ja jatkaa haarassa karttaseppa/nahtavyydet-219: yhdistä sen kärki ennen jatkoa, ja kerroin KS:lle yhdistää 1c5c26667.

Omistaja 16.41 (PT): "keskitytään vain pariisin 3d rakennuksiin". Jatka vain kylttejä. Aloituslento odottaa uutta sanaa (työlistalla merkitty).

## Ensin
1. Kuittaa JU:lle (local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd) "NUI valmis". JU:lla ei ole NUI:n ajoja jonossa.
2. Auki-kohdat 1–3 odottavat KK:n sanaa (PT 17.0x). Älä korjaa niitä ennen sitä.

## Tehty
- Ajo 5263cacb5 ja ajo 1c5c26667 (lokit/julkaisija-pariisi-kyltit-1c5c26667, 22 kuvaa, PUUTE 0, 0 error CS). Molemmat viety KK:lle, kopio PT:lle.
- 770bcedfc: Tuileries'n kyltti ei katoa Louvren ääriviivan takia. NostotKartalla.KylttienTormays: PiirrosPeitot-kohteessa vain rakennuksesta kaukainen puolisko ratkaisee mallin törmäyksen. Todistettu kuvissa kyltit-louvre-ylhaalta ja kyltit-viisto. Syy on päätelty kuvista, ei mitattu.
- 1c5c26667: KS:n f8b35f66d yhdistetty (Eiffel 24c otto 2). Eiffel ja kyltti näkyvät kuvassa kyltit-galerie.
- Katsottu täysikoossa: ajosta 5263cacb5 21 kuvaa (louvre-malli-museo vain SHA:lla, eroaa kyltin museokuvasta), ajosta 1c5c26667 vain kolme kuvaa: louvre-ylhaalta, viisto, galerie.

## Selvitetty
- Katukuvan sumeus: SaapumisKuvat.cs:351 hakee kuvan koossa max(Screen.width, Screen.height), ja Macin ajossa Screen on 640×480. Pelin vika ei ole Mac-kuvan perusteella; laitteella todistamatta, luettu koodista.
- Louvren ja Notre-Damen kyltti samalla kameralla eri paikassa (keski vs. katukuva-ennen): MalliKyltit pitää edellisen sivun ensin, joten paikka riippuu reitistä. Tarkoituksellinen pito, ei muutettu.
- `ESIKATSELU POIKKEUS ArgumentOutOfRangeException` lokissa on Unityn editorin haun (SearchDatabase) virhe käynnistyksessä, ei pelin. Sama molemmissa ajoissa.

## Auki
1. Pyöreä kuva peittää Orsayn kyltin lopun (keski, katukuva-ennen). Kuvat jäävät kartalle omistajan sanalla, joten korjaus vaatii KK:n suunnan. Sama: Saint-Germain-des-Présin kuva nimen päällä, Metroaseman kuva Hôpital Lariboisière -nimen vieressä.
2. Hintakyltti peittää Pompidou-keskus-nimen (keski, katukuva-ennen, louvre-ennen). Nimi jää alle, koska hintakyltti väistää vain kylttejä.
3. Ilman kylttiä: Grand Châtelet (viisto), Temple-torni ja Bastilji (louvre-lansi). Kiinteä kyltti ei siirry (omistaja 2.11. 08.14).
4. Vrain-Lucas todistamatta: `ui kohdenostot napauta Vrain-Lucas` → "ei merkkiä", molemmissa ajoissa. KS:n osa; kuva kyltit-napautus ei näytä sitä.
5. tarkista.sh: exit 1 valovahdista (Komennot.cs vari 5 > 4, Nahtavyysalue.cs vari 2 > 0, NotreDameKirkko.shader varjostin 4 > 0). Ei NUI:n commiteista. PT 17.0x: ei poikkeusta nyt; tulee ND-kokeen muutoksista, jotka eivät ole junassa, ja PT ratkaisee sen, kun koe viedään junaan.
6. -1642:n Auki 2 ja 3: kaukaiset kyltit matalalta, Sacré-Cœur usvassa, leikkeet kaukaa, kylttien pysty- ja kursiivi-ero, `komento nimet etsi Pariisi`.

## Huomiot
- tarkista.sh on zsh-skripti: aja `zsh`:lla (sh antaa "print: command not found"). Se generoi Tyylikirja.uss, Tyylikirja.cs ja tyylikirja.json: palauta `git restore`:lla.
- Kartta-testit: `sh Kartta-testit/kaanna.sh <nimi>`. NostotKartalla ei käänny niissä; sen todistaa vain Unity-ajo.
- Viestit: mcp__ccd_session_mgmt__send_message session-id:llä.
- Älä yhdistä lento-haaraa suoraan; siitä päättää PT.
